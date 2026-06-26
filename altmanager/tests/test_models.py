from django.utils import timezone

from altmanager.models import AltManagerConfiguration

from .base import AltManagerTestBase


class ApproveTest(AltManagerTestBase):
    def test_approve_sets_approved_flag(self):
        record = self.make_sanction()
        record.approve(approver=self.approver_char)
        record.refresh_from_db()
        self.assertTrue(record.approved)

    def test_approve_stores_approver_on_history(self):
        record = self.make_sanction()
        record.approve(approver=self.approver_char)
        record.request.refresh_from_db()
        self.assertEqual(record.request.approver, self.approver_char)

    def test_sanction_sets_sanctioned_flag(self):
        record = self.make_sanction()
        record.approve(sanctioner=self.sanctioner_char)
        record.refresh_from_db()
        self.assertTrue(record.sanctioned)

    def test_sanction_stores_sanctioner_on_history(self):
        record = self.make_sanction()
        record.approve(sanctioner=self.sanctioner_char)
        record.request.refresh_from_db()
        self.assertEqual(record.request.sanctioner, self.sanctioner_char)

    def test_approve_with_neither_returns_false(self):
        record = self.make_sanction()
        result = record.approve()
        self.assertFalse(result)
        record.refresh_from_db()
        self.assertFalse(record.approved)
        self.assertFalse(record.sanctioned)

    def test_approve_and_sanction_in_one_call(self):
        record = self.make_sanction()
        record.approve(approver=self.approver_char, sanctioner=self.sanctioner_char)
        record.refresh_from_db()
        self.assertTrue(record.approved)
        self.assertTrue(record.sanctioned)


class RevokeTest(AltManagerTestBase):
    def test_revoke_sets_revoked_true(self):
        record = self.make_sanction(approved=True, sanctioned=True)
        record.revoke()
        record.refresh_from_db()
        self.assertTrue(record.revoked)

    def test_revoke_clears_approved_and_sanctioned(self):
        record = self.make_sanction(approved=True, sanctioned=True)
        record.revoke()
        record.refresh_from_db()
        self.assertFalse(record.approved)
        self.assertFalse(record.sanctioned)

    def test_revoke_sets_reason(self):
        record = self.make_sanction()
        record.revoke(message="Bad actor")
        record.refresh_from_db()
        self.assertIn("Bad actor", record.revoked_reason)

    def test_revoke_includes_user_name(self):
        record = self.make_sanction()
        record.revoke(user=self.owner_user)
        record.refresh_from_db()
        self.assertIn(self.owner_char.character_name, record.revoked_reason)

    def test_revoke_without_user_uses_auth_label(self):
        record = self.make_sanction()
        record.revoke()
        record.refresh_from_db()
        self.assertIn("Auth", record.revoked_reason)

    def test_revoke_reason_is_not_boolean(self):
        record = self.make_sanction()
        record.revoke(message="some reason")
        record.refresh_from_db()
        self.assertIsInstance(record.revoked_reason, str)
        self.assertIsInstance(record.revoked, bool)


class RevokePendingTest(AltManagerTestBase):
    def test_sets_pending_revoke_date(self):
        record = self.make_sanction()
        record.revoke_pending()
        record.refresh_from_db()
        self.assertIsNotNone(record.pending_revoke)

    def test_pending_date_respects_days_config(self):
        config = AltManagerConfiguration.get_solo()
        config.days_before_revoke = 7
        config.save()

        record = self.make_sanction()
        before = timezone.now()
        record.revoke_pending()
        record.refresh_from_db()

        delta = record.pending_revoke - before
        self.assertAlmostEqual(delta.days, 7, delta=1)

    def test_clear_revoke_pending_removes_date_and_reason(self):
        record = self.make_sanction()
        record.revoke_pending(message="Test")
        record.clear_revoke_pending()
        record.refresh_from_db()
        self.assertIsNone(record.pending_revoke)
        self.assertEqual(record.revoked_reason, "")


class ClearRevokeTest(AltManagerTestBase):
    def test_clears_revoked_flag(self):
        record = self.make_sanction(revoked=True)
        record.clear_revoke()
        record.refresh_from_db()
        self.assertFalse(record.revoked)

    def test_restores_approved_when_approver_present(self):
        record = self.make_sanction(revoked=True)
        record.request.approver = self.approver_char
        record.request.save()
        record.clear_revoke()
        record.refresh_from_db()
        self.assertTrue(record.approved)

    def test_does_not_restore_approved_without_approver(self):
        record = self.make_sanction(revoked=True)
        record.clear_revoke()
        record.refresh_from_db()
        self.assertFalse(record.approved)

    def test_restores_sanctioned_when_sanctioner_present(self):
        record = self.make_sanction(revoked=True)
        record.request.sanctioner = self.sanctioner_char
        record.request.save()
        record.clear_revoke()
        record.refresh_from_db()
        self.assertTrue(record.sanctioned)


class RemoveSanctionTest(AltManagerTestBase):
    def test_clears_sanctioned_and_approved_flags(self):
        record = self.make_sanction(approved=True, sanctioned=True)
        record.remove_sanction()
        record.refresh_from_db()
        self.assertFalse(record.sanctioned)
        self.assertFalse(record.approved)

    def test_clears_approver_and_sanctioner_on_history(self):
        record = self.make_sanction(approved=True, sanctioned=True)
        record.remove_sanction()
        record.request.refresh_from_db()
        self.assertIsNone(record.request.approver)
        self.assertIsNone(record.request.sanctioner)
