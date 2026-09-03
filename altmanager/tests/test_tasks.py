from unittest.mock import MagicMock, patch

from allianceauth.authentication.models import State
from allianceauth.tests.auth_utils import AuthUtils
from django.utils import timezone

from altmanager.tasks import (
    add_vip,
    check_all_alt_corps,
    check_alt_corp,
    check_owner_allowed,
    rem_vip,
)

from .base import AltManagerTestBase


class CheckOwnerAllowedTest(AltManagerTestBase):
    def test_returns_false_for_none(self):
        self.assertFalse(check_owner_allowed(None, 12345))

    def test_returns_false_for_non_user(self):
        self.assertFalse(check_owner_allowed("not a user", 12345))

    def test_returns_true_with_permission(self):
        user = AuthUtils.create_user("perm_user")
        AuthUtils.add_permission_to_user_by_name(
            "altmanager.can_request_alt_corp", user
        )
        user = user.__class__.objects.get(pk=user.pk)
        self.assertTrue(check_owner_allowed(user, 12345))

    def test_returns_false_without_permission(self):
        user = AuthUtils.create_user("no_perm_user")
        self.assertFalse(check_owner_allowed(user, 12345))


@patch("altmanager.models.send_discord_message")
@patch("altmanager.helpers.esi")
class CheckAltCorpTaskTest(AltManagerTestBase):
    """
    Tests for the check_alt_corp Celery task.
    ESI and Discord are always mocked — we test the revoke/approve logic only.
    """

    def _make_fresh_esi_mock(self, member_count=3):
        """Return a mock corp object as get_and_update_member_list would."""
        corp = MagicMock()
        corp.member_count = member_count
        members = list(range(member_count))
        return corp, members

    def test_nonexistent_sanction_exits_cleanly(self, mock_esi, mock_discord):
        check_alt_corp(99999)  # no such pk

    def test_no_token_queues_revoke_pending(self, mock_esi, mock_discord):
        record = self.make_sanction(approved=True, sanctioned=True)

        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(None, None),
        ):
            check_alt_corp(record.pk, for_real=True)

        record.refresh_from_db()
        self.assertIsNotNone(record.pending_revoke)

    def test_no_token_revokes_when_overdue(self, mock_esi, mock_discord):
        record = self.make_sanction(approved=True, sanctioned=True)
        record.pending_revoke = timezone.now() - timezone.timedelta(days=1)
        record.save()

        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(None, None),
        ):
            check_alt_corp(record.pk, for_real=True)

        record.refresh_from_db()
        self.assertTrue(record.revoked)

    def test_no_token_skips_without_for_real(self, mock_esi, mock_discord):
        record = self.make_sanction(approved=True, sanctioned=True)

        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(None, None),
        ):
            check_alt_corp(record.pk, for_real=False)

        record.refresh_from_db()
        self.assertIsNone(record.pending_revoke)
        self.assertFalse(record.revoked)

    def test_not_approved_and_sanctioned_does_nothing(self, mock_esi, mock_discord):
        record = self.make_sanction(approved=False, sanctioned=False)
        corp_mock, members = self._make_fresh_esi_mock()

        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ):
            check_alt_corp(record.pk, for_real=True)

        record.refresh_from_db()
        self.assertFalse(record.revoked)
        self.assertIsNone(record.pending_revoke)

    def test_all_members_known_clears_pending_revoke(self, mock_esi, mock_discord):
        record = self.make_sanction(approved=True, sanctioned=True)
        record.pending_revoke = timezone.now() + timezone.timedelta(days=3)
        record.save()

        # Give owner the required permission
        AuthUtils.add_permission_to_user_by_name(
            "altmanager.can_request_alt_corp", self.owner_user
        )
        self.owner_user = self.owner_user.__class__.objects.get(pk=self.owner_user.pk)

        corp_mock, members = self._make_fresh_esi_mock(member_count=1)

        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 1
            check_alt_corp(record.pk, for_real=True)

        record.refresh_from_db()
        self.assertIsNone(record.pending_revoke)

    def test_members_missing_queues_revoke_pending(self, mock_esi, mock_discord):
        record = self.make_sanction(approved=True, sanctioned=True)

        corp_mock, members = self._make_fresh_esi_mock(member_count=5)

        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 2  # 2 of 5 known
            check_alt_corp(record.pk, for_real=True)

        record.refresh_from_db()
        self.assertIsNotNone(record.pending_revoke)

    def test_members_missing_revokes_when_overdue(self, mock_esi, mock_discord):
        record = self.make_sanction(approved=True, sanctioned=True)
        record.pending_revoke = timezone.now() - timezone.timedelta(days=1)
        record.save()

        corp_mock, members = self._make_fresh_esi_mock(member_count=5)

        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 2
            check_alt_corp(record.pk, for_real=True)

        record.refresh_from_db()
        self.assertTrue(record.revoked)

    def test_owner_missing_permission_queues_revoke_pending(
        self, mock_esi, mock_discord
    ):
        record = self.make_sanction(approved=True, sanctioned=True)

        corp_mock, members = self._make_fresh_esi_mock(member_count=1)

        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 1  # members fine
            check_alt_corp(record.pk, for_real=True)  # owner lacks perm

        record.refresh_from_db()
        self.assertIsNotNone(record.pending_revoke)

    def test_allow_non_members_uses_kmc_not_kmci(self, mock_esi, mock_discord):
        self.target.allow_non_members = True
        self.target.save()

        record = self.make_sanction(approved=True, sanctioned=True)
        AuthUtils.add_permission_to_user_by_name(
            "altmanager.can_request_alt_corp", self.owner_user
        )
        self.owner_user = self.owner_user.__class__.objects.get(pk=self.owner_user.pk)

        corp_mock, members = self._make_fresh_esi_mock(member_count=2)

        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members"
        ) as mock_kmc, patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmc.return_value.count.return_value = 2   # all known
            mock_kmci.return_value.count.return_value = 0  # none in member corps
            check_alt_corp(record.pk, for_real=True)

        record.refresh_from_db()
        # should pass because anm=True uses kmc (2>=2), not kmci (0<2)
        self.assertIsNone(record.pending_revoke)

        # cleanup
        self.target.allow_non_members = False
        self.target.save()

    # --- No-token early-return branches (lines 50-57) ---

    def test_no_token_already_revoked_returns_immediately(self, mock_esi, mock_discord):
        # sanc.revoked=True → line 50 condition False → 50->57 branch (skip straight to return)
        record = self.make_sanction(approved=True, sanctioned=True, revoked=True)
        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(None, None),
        ):
            check_alt_corp(record.pk, for_real=True)
        record.refresh_from_db()
        # revoked stays True, pending_revoke unchanged (None)
        self.assertTrue(record.revoked)
        self.assertIsNone(record.pending_revoke)

    def test_no_token_pending_revoke_not_overdue_skips(self, mock_esi, mock_discord):
        # pending_revoke is in the future → line 54 condition False → 54->57 branch
        record = self.make_sanction(approved=True, sanctioned=True)
        record.pending_revoke = timezone.now() + timezone.timedelta(days=7)
        record.save()
        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(None, None),
        ):
            check_alt_corp(record.pk, for_real=True)
        record.refresh_from_db()
        # pending_revoke is still in future, not revoked
        self.assertFalse(record.revoked)

    def test_no_token_overdue_but_not_for_real_skips(self, mock_esi, mock_discord):
        # pending_revoke overdue but for_real=False → line 55 condition False → 55->57 branch
        record = self.make_sanction(approved=True, sanctioned=True)
        record.pending_revoke = timezone.now() - timezone.timedelta(days=1)
        record.save()
        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(None, None),
        ):
            check_alt_corp(record.pk, for_real=False)
        record.refresh_from_db()
        self.assertFalse(record.revoked)

    # --- Failure path branches (lines 95-119) ---

    def test_success_false_user_can_true_skips_user_can_message(self, mock_esi, mock_discord):
        # success=False, user_can=True → line 98 condition False → 98->100 branch
        AuthUtils.add_permission_to_user_by_name("altmanager.can_request_alt_corp", self.owner_user)
        self.owner_user = self.owner_user.__class__.objects.get(pk=self.owner_user.pk)
        record = self.make_sanction(approved=True, sanctioned=True)
        corp_mock, members = self._make_fresh_esi_mock(member_count=5)
        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 2  # 2<5 → success=False
            check_alt_corp(record.pk, for_real=True)
        record.refresh_from_db()
        self.assertIsNotNone(record.pending_revoke)  # revoke_pending was called

    def test_already_revoked_sanction_exits_at_108(self, mock_esi, mock_discord):
        # sanc.approved+sanctioned+revoked=True, members fail → line 108 False → 108->exit
        record = self.make_sanction(approved=True, sanctioned=True, revoked=True)
        corp_mock, members = self._make_fresh_esi_mock(member_count=5)
        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 2
            check_alt_corp(record.pk, for_real=True)
        record.refresh_from_db()
        # revoked still True, pending_revoke still None (108 block was skipped)
        self.assertTrue(record.revoked)
        self.assertIsNone(record.pending_revoke)

    def test_failure_without_for_real_exits_at_110(self, mock_esi, mock_discord):
        # fails, not revoked, no pending_revoke, for_real=False → line 110 False → 110->exit
        record = self.make_sanction(approved=True, sanctioned=True)
        corp_mock, members = self._make_fresh_esi_mock(member_count=5)
        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 2
            check_alt_corp(record.pk, for_real=False)
        record.refresh_from_db()
        self.assertIsNone(record.pending_revoke)
        self.assertFalse(record.revoked)

    def test_pending_revoke_not_overdue_exits_at_114(self, mock_esi, mock_discord):
        # pending_revoke in future, fails → line 114 False → 114->exit
        record = self.make_sanction(approved=True, sanctioned=True)
        record.pending_revoke = timezone.now() + timezone.timedelta(days=7)
        record.save()
        corp_mock, members = self._make_fresh_esi_mock(member_count=5)
        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 2
            check_alt_corp(record.pk, for_real=True)
        record.refresh_from_db()
        # pending_revoke not triggered (not overdue), revoke not triggered
        self.assertFalse(record.revoked)

    def test_pending_revoke_overdue_without_for_real_exits_at_115(self, mock_esi, mock_discord):
        # pending_revoke overdue, fails, for_real=False → line 115 False → 115->exit
        record = self.make_sanction(approved=True, sanctioned=True)
        record.pending_revoke = timezone.now() - timezone.timedelta(days=1)
        record.save()
        corp_mock, members = self._make_fresh_esi_mock(member_count=5)
        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 2
            check_alt_corp(record.pk, for_real=False)
        record.refresh_from_db()
        self.assertFalse(record.revoked)

    def test_owner_without_character_ownership_is_caught(self, mock_esi, mock_discord):
        # Trigger the except block in the try: owner = sanc.request.owner.character_ownership.user
        from allianceauth.eveonline.models import EveCharacter
        from altmanager.models import AltCorpHistory, AltCorpRecord

        bare_char = EveCharacter.objects.create(
            character_id=9998,
            character_name="No Ownership Char",
            corporation_id=self.alt_corp.corporation_id,
            corporation_name=self.alt_corp.corporation_name,
            corporation_ticker=self.alt_corp.corporation_ticker,
        )
        record = AltCorpRecord.objects.create(actual_members=1, approved=True, sanctioned=True)
        AltCorpHistory.objects.create(
            request=record,
            corporation=self.alt_corp,
            corporation_name=self.alt_corp.corporation_name,
            target=self.target,
            owner=bare_char,
            owner_character_name=bare_char.character_name,
            owner_corporation_name=bare_char.corporation_name,
        )

        corp_mock, members = self._make_fresh_esi_mock(member_count=1)
        with patch(
            "altmanager.tasks.helpers.get_and_update_member_list",
            return_value=(corp_mock, members),
        ), patch(
            "altmanager.tasks.helpers.get_known_corporation_members_from_members"
        ) as mock_kmci:
            mock_kmci.return_value.count.return_value = 1
            check_alt_corp(record.pk, for_real=True)

        record.refresh_from_db()
        # Owner has no CharacterOwnership → check_owner_allowed returns False → pending_revoke set
        self.assertIsNotNone(record.pending_revoke)


@patch("altmanager.tasks.check_alt_corp")
class CheckAllAltCorpsTest(AltManagerTestBase):
    """check_all_alt_corps dispatches per-sanction tasks."""

    def test_dispatches_task_for_each_sanction(self, mock_task):
        self.make_sanction()
        check_all_alt_corps()
        mock_task.delay.assert_called_once()

    def test_no_sanctions_dispatches_nothing(self, mock_task):
        check_all_alt_corps()
        mock_task.delay.assert_not_called()

    def test_passes_for_real_flag(self, mock_task):
        self.make_sanction()
        check_all_alt_corps(for_real=True)
        args, kwargs = mock_task.delay.call_args
        self.assertTrue(kwargs.get("for_real", args[1] if len(args) > 1 else False))


class VipTasksTest(AltManagerTestBase):
    """add_vip / rem_vip manage membership of the s_vip State."""

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.vip_state = State.objects.create(name="s_vip", priority=250)

    def test_add_vip_adds_character_to_state(self):
        add_vip(self.owner_char.character_name)
        self.assertIn(self.owner_char, self.vip_state.member_characters.all())

    def test_rem_vip_removes_character_from_state(self):
        self.vip_state.member_characters.add(self.owner_char)
        rem_vip(self.owner_char.character_name)
        self.assertNotIn(self.owner_char, self.vip_state.member_characters.all())
