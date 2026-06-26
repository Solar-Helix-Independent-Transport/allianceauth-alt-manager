from unittest.mock import MagicMock, patch

from allianceauth.tests.auth_utils import AuthUtils
from django.utils import timezone

from altmanager.tasks import check_alt_corp, check_owner_allowed

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
