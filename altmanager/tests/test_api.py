import json
from unittest.mock import MagicMock, patch

from allianceauth.authentication.models import CharacterOwnership
from allianceauth.eveonline.models import EveAllianceInfo, EveCharacter, EveCorporationInfo
from allianceauth.tests.auth_utils import AuthUtils
from django.test import TestCase
from esi.models import Scope, Token

from altmanager.models import AltCorpHistory, AltCorpRecord
from .base import AltManagerTestBase

API_BASE = "/alts/api"


def _add_perm(user, perm):
    AuthUtils.add_permission_to_user_by_name(perm, user)
    return user.__class__.objects.get(pk=user.pk)


class UnauthenticatedApiTest(TestCase):
    """API endpoints reject unauthenticated requests."""

    def _assert_denied(self, url):
        resp = self.client.get(url)
        # AA wraps all URL hook views with main_character_required (which includes
        # login_required), so unauthenticated requests get 302 → login rather than 401.
        self.assertIn(resp.status_code, [302, 401, 403], msg=f"{url} should deny unauthenticated")

    def test_get_corps_denied(self):
        self._assert_denied(f"{API_BASE}/get_corps")

    def test_get_account_corps_denied(self):
        self._assert_denied(f"{API_BASE}/get_account_corps")

    def test_get_sanction_actions_denied(self):
        self._assert_denied(f"{API_BASE}/get_sanction_actions")

    def test_get_sanctionable_alliances_denied(self):
        self._assert_denied(f"{API_BASE}/get_sanctionable_alliances")

    def test_get_all_sanctionable_alliances_denied(self):
        self._assert_denied(f"{API_BASE}/get_all_sanctionable_alliances")

    def test_get_report_denied(self):
        self._assert_denied(f"{API_BASE}/get_report/0")

    def test_get_missing_denied(self):
        self._assert_denied(f"{API_BASE}/get_missing/0")


class GetCorpsApiTest(AltManagerTestBase):
    """get_corps and get_account_corps return lists for authenticated users."""

    def setUp(self):
        self.user = AuthUtils.create_user("api_user")
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    def test_get_corps_returns_200(self):
        resp = self.client.get(f"{API_BASE}/get_corps")
        self.assertEqual(resp.status_code, 200)
        self.assertIsInstance(resp.json(), list)

    def test_get_account_corps_returns_200(self):
        resp = self.client.get(f"{API_BASE}/get_account_corps")
        self.assertEqual(resp.status_code, 200)
        self.assertIsInstance(resp.json(), list)

    def test_get_sanctionable_alliances_returns_200(self):
        resp = self.client.get(f"{API_BASE}/get_sanctionable_alliances")
        self.assertEqual(resp.status_code, 200)
        self.assertIsInstance(resp.json(), list)

    def test_get_sanction_actions_returns_200(self):
        resp = self.client.get(f"{API_BASE}/get_sanction_actions")
        self.assertEqual(resp.status_code, 200)
        self.assertIsInstance(resp.json(), list)


class GetAccountCorpsApiTest(AltManagerTestBase):
    """get_account_corps inner loop when user has character ownerships outside member corps."""

    def setUp(self):
        self.user = AuthUtils.create_user("acct_corps_user")
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()

        # Give this user an owned character in alt_corp (not a member corp, id>2000000)
        self.user_char = EveCharacter.objects.create(
            character_id=5001,
            character_name="Account Corp Char",
            corporation_id=self.alt_corp.corporation_id,
            corporation_name=self.alt_corp.corporation_name,
            corporation_ticker=self.alt_corp.corporation_ticker,
        )
        CharacterOwnership.objects.create(
            user=self.user, character=self.user_char, owner_hash="acct5001"
        )
        self.client.force_login(self.user)

    def test_returns_alt_corp_in_list(self):
        resp = self.client.get(f"{API_BASE}/get_account_corps")
        self.assertEqual(resp.status_code, 200)
        corp_ids = [c["corporation_id"] for c in resp.json()]
        self.assertIn(self.alt_corp.corporation_id, corp_ids)

    def test_member_corp_and_npc_corp_skipped(self):
        # member_corp char → 364->362 (corp in members → skip)
        member_char = EveCharacter.objects.create(
            character_id=5010, character_name="Member Char",
            corporation_id=self.member_corp.corporation_id,
            corporation_name=self.member_corp.corporation_name,
            corporation_ticker=self.member_corp.corporation_ticker,
        )
        CharacterOwnership.objects.create(
            user=self.user, character=member_char, owner_hash="mc5010"
        )
        # NPC corp char → 365->362 (corp_id <= 2000000 → skip)
        npc_char = EveCharacter.objects.create(
            character_id=5011, character_name="NPC Char",
            corporation_id=1000001, corporation_name="NPC Corp", corporation_ticker="NPC",
        )
        CharacterOwnership.objects.create(
            user=self.user, character=npc_char, owner_hash="nc5011"
        )
        resp = self.client.get(f"{API_BASE}/get_account_corps")
        self.assertEqual(resp.status_code, 200)
        corp_ids = [c["corporation_id"] for c in resp.json()]
        self.assertNotIn(self.member_corp.corporation_id, corp_ids)
        self.assertNotIn(1000001, corp_ids)


class GetCorpsSuperuserApiTest(AltManagerTestBase):
    """get_corps uses Token.objects.all() for superusers (covers line 41)."""

    def setUp(self):
        self.user = AuthUtils.create_user("superuser_corps")
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.user.is_superuser = True
        self.user.save()
        self.client.force_login(self.user)

    def test_superuser_gets_corps_200(self):
        resp = self.client.get(f"{API_BASE}/get_corps")
        self.assertEqual(resp.status_code, 200)
        self.assertIsInstance(resp.json(), list)


class GetAllSanctionableAlliancesApiTest(AltManagerTestBase):
    """get_all_sanctionable_alliances requires su_access."""

    def test_no_perm_returns_403(self):
        user = AuthUtils.create_user("no_perm_user")
        user.profile.main_character = self.sanctioner_char
        user.profile.save()
        self.client.force_login(user)
        resp = self.client.get(f"{API_BASE}/get_all_sanctionable_alliances")
        self.assertEqual(resp.status_code, 403)

    def test_su_access_returns_200(self):
        user = _add_perm(AuthUtils.create_user("su_user"), "altmanager.su_access")
        user.profile.main_character = self.sanctioner_char
        user.profile.save()
        self.client.force_login(user)
        resp = self.client.get(f"{API_BASE}/get_all_sanctionable_alliances")
        self.assertEqual(resp.status_code, 200)
        self.assertIsInstance(resp.json(), list)


class GetReportApiTest(AltManagerTestBase):
    """get_report requires basic_access and delegates to ESI."""

    def setUp(self):
        self.user = _add_perm(
            AuthUtils.create_user("report_user"), "altmanager.basic_access"
        )
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    def test_no_perm_returns_403(self):
        user = AuthUtils.create_user("no_perm_user")
        user.profile.main_character = self.approver_char
        user.profile.save()
        self.client.force_login(user)
        resp = self.client.get(f"{API_BASE}/get_report/1")
        self.assertEqual(resp.status_code, 403)

    def test_corp_id_zero_returns_200(self):
        resp = self.client.get(f"{API_BASE}/get_report/0")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertFalse(data["data"])

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_valid_corp_returns_200(self, mock_esi, mock_token):
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = [1001, 1002]
        mock_esi.client.Universe.PostUniverseNames.return_value.result.return_value = []

        # superuser so visibility check passes
        self.user.is_superuser = True
        self.user.save()

        resp = self.client.get(f"{API_BASE}/get_report/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 200)


class GetMissingApiTest(AltManagerTestBase):
    """get_missing requires can_request_alt_corp."""

    def setUp(self):
        self.user = _add_perm(
            AuthUtils.create_user("missing_user"), "altmanager.can_request_alt_corp"
        )
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    def test_no_perm_returns_403(self):
        user = AuthUtils.create_user("no_perm_user")
        user.profile.main_character = self.approver_char
        user.profile.save()
        self.client.force_login(user)
        resp = self.client.get(f"{API_BASE}/get_missing/1")
        self.assertEqual(resp.status_code, 403)

    def test_corp_id_zero_returns_200(self):
        resp = self.client.get(f"{API_BASE}/get_missing/0")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["characters"], [])

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_no_token_returns_404(self, mock_esi, mock_token):
        mock_token.return_value = None
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(f"{API_BASE}/get_missing/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 404)

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_valid_corp_returns_200(self, mock_esi, mock_token):
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = []
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(f"{API_BASE}/get_missing/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 200)


class GetMissingAllianceApiTest(AltManagerTestBase):
    """get_missing_alliance_members endpoint (lines 242-340)."""

    def setUp(self):
        # su_access + can_request_alt_corp + superuser so process_corp can call get_missing
        self.su_user = _add_perm(
            _add_perm(
                AuthUtils.create_user("alliance_su_user"), "altmanager.su_access"
            ),
            "altmanager.can_request_alt_corp",
        )
        self.su_user.is_superuser = True
        self.su_user.save()
        self.su_user.profile.main_character = self.sanctioner_char
        self.su_user.profile.save()

    def test_no_perm_returns_403(self):
        user = AuthUtils.create_user("no_perm_alliance")
        user.profile.main_character = self.approver_char
        user.profile.save()
        self.client.force_login(user)
        resp = self.client.get(f"{API_BASE}/get_missing_alliance/99000001")
        self.assertEqual(resp.status_code, 403)

    @patch("altmanager.api.providers.esi")
    def test_su_access_empty_alliance_returns_200(self, mock_esi):
        mock_esi.client.Alliance.GetAlliancesAllianceIdCorporations.return_value.result.return_value = (
            []
        )
        self.client.force_login(self.su_user)
        resp = self.client.get(f"{API_BASE}/get_missing_alliance/99000001")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["corporations"], [])

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_su_access_with_corp_in_alliance(self, mock_esi, mock_token):
        # Alliance returns one corp → process_corp called → get_missing returns 200 path
        mock_esi.client.Alliance.GetAlliancesAllianceIdCorporations.return_value.result.return_value = [
            self.alt_corp.corporation_id
        ]
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = (
            []
        )
        self.client.force_login(self.su_user)
        resp = self.client.get(f"{API_BASE}/get_missing_alliance/99000001")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        corp_ids = [c["corporation"]["corporation_id"] for c in data["corporations"]]
        self.assertIn(self.alt_corp.corporation_id, corp_ids)

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_unknown_members_in_process_corp(self, mock_esi, mock_token):
        # process_corp with unknown members → hits lines 273 (missing.append)
        mock_esi.client.Alliance.GetAlliancesAllianceIdCorporations.return_value.result.return_value = [
            self.alt_corp.corporation_id
        ]
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = [
            9991
        ]
        mock_esi.client.Universe.PostUniverseNames.return_value.result.return_value = [
            {"id": 9991, "name": "Unknown Corp Member"}
        ]
        self.client.force_login(self.su_user)
        resp = self.client.get(f"{API_BASE}/get_missing_alliance/99000001")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(len(data["missing"]), 1)

    @patch("altmanager.api.get_missing")
    @patch("altmanager.api.providers.esi")
    def test_exception_in_process_corp_appends_error_entry(self, mock_esi, mock_get_missing):
        # process_corp catches exceptions and adds unknowns=-2 (lines 321-323)
        mock_esi.client.Alliance.GetAlliancesAllianceIdCorporations.return_value.result.return_value = [
            self.alt_corp.corporation_id
        ]
        # Make get_missing raise directly so process_corp's except block fires
        mock_get_missing.side_effect = Exception("kaboom")
        self.client.force_login(self.su_user)
        resp = self.client.get(f"{API_BASE}/get_missing_alliance/99000001")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertTrue(any(c["unknowns"] == -2 for c in data["corporations"]))

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_no_token_hits_else_branch_in_process_corp(self, mock_esi, mock_token):
        # get_missing returns 404 (no token) → else branch (lines 310-311)
        mock_esi.client.Alliance.GetAlliancesAllianceIdCorporations.return_value.result.return_value = [
            self.alt_corp.corporation_id
        ]
        mock_token.return_value = None
        self.client.force_login(self.su_user)
        resp = self.client.get(f"{API_BASE}/get_missing_alliance/99000001")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        # else branch: unknowns=-1
        self.assertTrue(any(c["unknowns"] == -1 for c in data["corporations"]))
        self.assertIn(self.alt_corp.corporation_id,
                      [c["corporation"]["corporation_id"] for c in data["corporations"]])

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_db_corps_loop_processes_corp_not_in_esi(self, mock_esi, mock_token):
        # Corp in DB with alliance FK set, NOT returned by ESI → db_corps loop (line 338)
        # Note: EveCorporationInfo.filter(alliance_id=X) uses EveAllianceInfo.pk (not alliance_id field)
        test_alliance = EveAllianceInfo.objects.create(
            alliance_id=99000002,
            alliance_name="Test Alliance",
            alliance_ticker="TST",
        )
        db_corp = EveCorporationInfo.objects.create(
            corporation_id=30000001, corporation_name="DB Only Corp",
            corporation_ticker="DBO", ceo_id=4, member_count=1,
            alliance=test_alliance,
        )
        # ESI returns empty → corps=[], db_corps=[db_corp] → line 338 loop executes
        mock_esi.client.Alliance.GetAlliancesAllianceIdCorporations.return_value.result.return_value = []
        mock_token.return_value = None  # no token → get_missing returns 404 → else branch
        self.client.force_login(self.su_user)
        # Use the EveAllianceInfo pk as the URL alliance_id so the DB filter matches
        resp = self.client.get(f"{API_BASE}/get_missing_alliance/{test_alliance.pk}")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        corp_ids = [c["corporation"]["corporation_id"] for c in data["corporations"]]
        self.assertIn(db_corp.corporation_id, corp_ids)

    @patch("altmanager.api.get_missing")
    @patch("altmanager.api.providers.esi")
    def test_known_non_members_appended_in_process_corp(self, mock_esi, mock_get_missing):
        # get_missing returns known_non_members → process_corp loop body line 283
        mock_esi.client.Alliance.GetAlliancesAllianceIdCorporations.return_value.result.return_value = [
            self.alt_corp.corporation_id
        ]
        mock_get_missing.return_value = (200, {
            "corporation": {
                "corporation_id": self.alt_corp.corporation_id,
                "corporation_name": self.alt_corp.corporation_name,
                "corporation_ticker": self.alt_corp.corporation_ticker,
                "member_count": 1,
            },
            "characters": [],
            "known_non_members": [{
                "id": 5030, "name": "Known Non Member",
                "main_id": 1001, "main_name": "Owner Char",
                "corp_id": 10000001, "corp_name": "Member Corp",
                "alliance_id": None, "alliance_name": None,
                "username": "owner_user",
            }],
            "unknowns": 0,
            "knowns": 1,
        })
        self.client.force_login(self.su_user)
        resp = self.client.get(f"{API_BASE}/get_missing_alliance/99000001")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(len(data["known_non_members"]), 1)
        self.assertEqual(data["known_non_members"][0]["name"], "Known Non Member")


class GetReportBranchesApiTest(AltManagerTestBase):
    """Cover the visibility, exception, and all-known-members branches in get_report."""

    def setUp(self):
        self.user = _add_perm(
            AuthUtils.create_user("report_branch_user"), "altmanager.basic_access"
        )
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    def test_not_visible_corp_returns_403(self):
        # non-superuser with basic_access but corp not in get_corps_for_user → 403
        resp = self.client.get(f"{API_BASE}/get_report/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 403)

    @patch("altmanager.api.providers.get_corp_token")
    def test_esi_exception_returns_500(self, mock_token):
        mock_token.side_effect = Exception("ESI error")
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(f"{API_BASE}/get_report/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 500)

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_unknown_members_triggers_name_lookup(self, mock_esi, mock_token):
        mock_token.return_value = MagicMock(character_id=1001)
        # Return character IDs not in DB → all unknown → PostUniverseNames called
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = [
            9991, 9992
        ]
        mock_esi.client.Universe.PostUniverseNames.return_value.result.return_value = [
            {"id": 9991, "name": "Unknown A"},
            {"id": 9992, "name": "Unknown B"},
        ]
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(f"{API_BASE}/get_report/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json()["unknowns"], 2)

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_all_members_known_skips_name_lookup(self, mock_esi, mock_token):
        # Only return character 1001 (owner_char, has CharacterOwnership) → out=[] → skip PostUniverseNames
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = [
            1001
        ]
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(f"{API_BASE}/get_report/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json()["knowns"], 1)
        self.assertEqual(resp.json()["unknowns"], 0)

    @patch("altmanager.api.get_corps_for_user")
    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_non_superuser_visible_corp_reaches_esi(self, mock_esi, mock_token, mock_gcfu):
        # Corp is visible to non-superuser → line 83 condition False → 83->87 branch taken
        mock_gcfu.return_value = {self.alt_corp.corporation_id: {
            "corporation_id": self.alt_corp.corporation_id,
            "corporation_name": self.alt_corp.corporation_name,
        }}
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = []
        resp = self.client.get(f"{API_BASE}/get_report/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 200)


class GetMissingBranchesApiTest(AltManagerTestBase):
    """Cover the visibility, unknown-member, and error branches in get_missing."""

    def setUp(self):
        self.user = _add_perm(
            AuthUtils.create_user("missing_branch_user"), "altmanager.can_request_alt_corp"
        )
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    def test_non_visible_corp_returns_403(self):
        # non-superuser, no tokens, corp not visible → 403
        resp = self.client.get(f"{API_BASE}/get_missing/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 403)

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_esi_exception_returns_500(self, mock_esi, mock_token):
        mock_token.side_effect = Exception("ESI error")
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(f"{API_BASE}/get_missing/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 500)

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_unknown_members_triggers_name_lookup(self, mock_esi, mock_token):
        # Return character IDs not in DB → PostUniverseNames called (line 176)
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = [
            9991, 9992
        ]
        mock_esi.client.Universe.PostUniverseNames.return_value.result.return_value = [
            {"id": 9991, "name": "Unknown X"},
        ]
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(f"{API_BASE}/get_missing/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.json()["characters"]), 1)

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_check_members_true_populates_known_non_members(self, mock_esi, mock_token):
        # check_members=True triggers the known_non_members loop (line 204)
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = []
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(
            f"{API_BASE}/get_missing/{self.alt_corp.corporation_id}?check_members=true"
        )
        self.assertEqual(resp.status_code, 200)

    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_check_members_with_known_non_member_hits_loop_body(self, mock_esi, mock_token):
        # Create a char in alt_corp whose main is NOT in member corps → loop body line 204 executes
        outside_main = EveCharacter.objects.create(
            character_id=5020, character_name="Outside Main",
            corporation_id=99999999, corporation_name="Outside Corp", corporation_ticker="OUT",
        )
        alt_member = EveCharacter.objects.create(
            character_id=5021, character_name="Alt Member",
            corporation_id=self.alt_corp.corporation_id,
            corporation_name=self.alt_corp.corporation_name,
            corporation_ticker=self.alt_corp.corporation_ticker,
        )
        member_user = AuthUtils.create_user("alt_member_user5021")
        member_user.profile.main_character = outside_main
        member_user.profile.save()
        CharacterOwnership.objects.create(
            user=member_user, character=alt_member, owner_hash="am5021"
        )
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = []
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(
            f"{API_BASE}/get_missing/{self.alt_corp.corporation_id}?check_members=true"
        )
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(len(data["known_non_members"]), 1)
        self.assertEqual(data["known_non_members"][0]["name"], "Alt Member")

    @patch("altmanager.api.get_corps_for_user")
    @patch("altmanager.api.providers.get_corp_token")
    @patch("altmanager.api.providers.esi")
    def test_non_superuser_visible_corp_passes_visibility_check(self, mock_esi, mock_token, mock_gcfu):
        # Corp visible to non-superuser via get_corps_for_user → line 145->150 branch taken
        mock_gcfu.return_value = {self.alt_corp.corporation_id: {
            "corporation_id": self.alt_corp.corporation_id,
            "corporation_name": self.alt_corp.corporation_name,
        }}
        mock_token.return_value = MagicMock(character_id=1001)
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = []
        resp = self.client.get(f"{API_BASE}/get_missing/{self.alt_corp.corporation_id}")
        self.assertEqual(resp.status_code, 200)


class GetCorpsForUserInnerLoopTest(AltManagerTestBase):
    """get_corps_for_user inner loop (lines 52-54) via a real Token in DB."""

    SCOPE_NAME = "esi-corporations.read_corporation_membership.v1"

    def setUp(self):
        self.user = AuthUtils.create_user("gcfu_loop_user")
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.user.is_superuser = True
        self.user.save()
        self.scope, _ = Scope.objects.get_or_create(name=self.SCOPE_NAME)
        token = Token.objects.create(
            character_id=self.owner_char.character_id,
            character_name=self.owner_char.character_name,
            character_owner_hash="gcfu_loop_hash",
            access_token="fake_access",
        )
        token.scopes.add(self.scope)
        self.client.force_login(self.user)

    def test_non_npc_corp_added_to_output(self):
        # owner_char is in member_corp (id=10000001, not in NPC range) → lines 52-54 executed
        resp = self.client.get(f"{API_BASE}/get_corps")
        self.assertEqual(resp.status_code, 200)
        corp_ids = [c["corporation_id"] for c in resp.json()]
        self.assertIn(self.member_corp.corporation_id, corp_ids)

    def test_npc_corp_and_duplicate_corp_are_skipped(self):
        # NPC corp char → 52->50 branch (corp_id in NPC range → skip)
        npc_char = EveCharacter.objects.create(
            character_id=5040, character_name="NPC Char",
            corporation_id=1000001, corporation_name="NPC Corp", corporation_ticker="NPC",
        )
        npc_token = Token.objects.create(
            character_id=5040, character_name="NPC Char",
            character_owner_hash="npc5040hash", access_token="fake_npc",
        )
        npc_token.scopes.add(self.scope)
        # Dup char in same corp as owner_char → 53->50 branch (corp already in out → skip)
        dup_char = EveCharacter.objects.create(
            character_id=5041, character_name="Dup Corp Char",
            corporation_id=self.member_corp.corporation_id,
            corporation_name=self.member_corp.corporation_name,
            corporation_ticker=self.member_corp.corporation_ticker,
        )
        dup_token = Token.objects.create(
            character_id=5041, character_name="Dup Corp Char",
            character_owner_hash="dup5041hash", access_token="fake_dup",
        )
        dup_token.scopes.add(self.scope)
        resp = self.client.get(f"{API_BASE}/get_corps")
        self.assertEqual(resp.status_code, 200)
        corp_ids = [c["corporation_id"] for c in resp.json()]
        # member_corp appears exactly once (dup skipped)
        self.assertEqual(corp_ids.count(self.member_corp.corporation_id), 1)
        # NPC corp not in output
        self.assertNotIn(1000001, corp_ids)


class GetSanctionActionsApiTest(AltManagerTestBase):
    """get_sanction_actions returns the current user's visible sanctions."""

    def setUp(self):
        self.user = AuthUtils.create_user("action_user")
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    def test_returns_empty_list_with_no_sanctions(self):
        resp = self.client.get(f"{API_BASE}/get_sanction_actions")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json(), [])

    def test_superuser_sees_all_sanctions(self):
        # create a second corporation so we get 2 distinct per-corp entries
        alt_corp_2 = EveCorporationInfo.objects.create(
            corporation_id=20000002,
            corporation_name="Alt Corp 2",
            corporation_ticker="ALT2",
            ceo_id=3,
            member_count=2,
        )
        self.make_sanction()
        record2 = AltCorpRecord.objects.create(actual_members=2)
        AltCorpHistory.objects.create(
            request=record2,
            corporation=alt_corp_2,
            corporation_name=alt_corp_2.corporation_name,
            target=self.target,
            owner=self.owner_char,
            owner_character_name=self.owner_char.character_name,
            owner_corporation_name=self.owner_char.corporation_name,
        )
        self.user.is_superuser = True
        self.user.save()
        resp = self.client.get(f"{API_BASE}/get_sanction_actions")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.json()), 2)
