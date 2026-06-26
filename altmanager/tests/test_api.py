import json
from unittest.mock import MagicMock, patch

from allianceauth.eveonline.models import EveCorporationInfo
from allianceauth.tests.auth_utils import AuthUtils
from django.test import TestCase

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
