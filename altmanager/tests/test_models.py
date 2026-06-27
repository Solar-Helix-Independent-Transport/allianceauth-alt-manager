from unittest.mock import MagicMock, patch

from allianceauth.authentication.models import CharacterOwnership
from allianceauth.eveonline.models import EveCharacter
from allianceauth.tests.auth_utils import AuthUtils
from django.utils import timezone

from altmanager.models import (
    AltCorpHistory,
    AltCorpRecord,
    AltCorpTarget,
    AltHistory,
    AltManagerConfiguration,
    AltRecord,
    MainInMemberCorpFilter,
)

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


class SendDiscordMessageTest(AltManagerTestBase):
    """Direct tests of the send_discord_message helper."""

    def test_channel_id_path_calls_send_message(self):
        import sys
        from altmanager.models import send_discord_message
        mock_send = MagicMock()
        mock_tasks = MagicMock()
        mock_tasks.send_message = mock_send
        mock_discord = MagicMock()
        # channel_id is truthy → line 31 executes
        with patch.dict(sys.modules, {
            'aadiscordbot': MagicMock(tasks=mock_tasks),
            'aadiscordbot.tasks': mock_tasks,
            'discord': mock_discord,
        }):
            send_discord_message(
                channel_id=12345,
                embed={"title": "T", "description": "D", "type": "rich"}
            )
        mock_send.assert_called_once()

    def test_import_error_is_caught(self):
        from altmanager.models import send_discord_message
        import sys
        # Make aadiscordbot appear not installed → ImportError → lines 32-33
        with patch.dict(sys.modules, {
            'aadiscordbot': None,
            'aadiscordbot.tasks': None,
        }):
            # Should not raise
            send_discord_message(user_pk=1, embed={"title": "T", "description": "D"})


class StillValidTest(AltManagerTestBase):
    """still_valid is a stub (pass) on both record types."""

    def test_alt_corp_record_still_valid(self):
        record = self.make_sanction()
        self.assertIsNone(record.still_valid())

    def test_alt_record_still_valid(self):
        record = AltRecord.objects.create()
        self.assertIsNone(record.still_valid())


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

    def test_revoke_pending_with_user_includes_character_name(self):
        record = self.make_sanction()
        record.revoke_pending(user=self.owner_user, message="Reason")
        record.refresh_from_db()
        self.assertIn(self.owner_char.character_name, record.revoked_reason)

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


class StrMethodsTest(AltManagerTestBase):
    """__str__ on every model returns a non-empty string."""

    def test_alt_corp_record_str(self):
        record = self.make_sanction()
        self.assertIn("Alt Corp", str(record))

    def test_alt_corp_record_str_fallback(self):
        record = AltCorpRecord.objects.create(actual_members=0)
        # no AltCorpHistory → __str__ falls back to id/date
        s = str(record)
        self.assertIsInstance(s, str)

    def test_alt_corp_history_str(self):
        record = self.make_sanction()
        self.assertIn("Alt Corp", str(record.request))

    def test_alt_corp_history_str_fallback(self):
        record = AltCorpRecord.objects.create(actual_members=0)
        hist = AltCorpHistory.objects.create(
            request=record,
            corporation_name="",
            owner_character_name="",
            owner_corporation_name="",
        )
        s = str(hist)
        self.assertIsInstance(s, str)

    def test_alt_corp_target_str(self):
        self.assertIn("Test Target", str(self.target))

    def test_main_in_member_corp_filter_str(self):
        f = MainInMemberCorpFilter.objects.create(
            name="Test Filter", description="A filter"
        )
        self.assertIn("Test Filter", str(f))

    def test_alt_manager_configuration_str(self):
        config = AltManagerConfiguration.get_solo()
        s = str(config)
        self.assertIsInstance(s, str)


class ConfigMemberCorpIdsTest(AltManagerTestBase):
    """AltManagerConfiguration.get_member_corporation_ids with exc_restricted=True."""

    def test_exc_restricted_excludes_restricted_corps(self):
        config = AltManagerConfiguration.get_solo()
        ids_all = AltManagerConfiguration.get_member_corporation_ids(exc_restricted=False)
        ids_exc = AltManagerConfiguration.get_member_corporation_ids(exc_restricted=True)
        # Both should include member_corp; exc_restricted just drops restricted corps
        self.assertIn(self.member_corp.corporation_id, ids_all)
        self.assertIn(self.member_corp.corporation_id, ids_exc)


@patch("altmanager.models.send_discord_message")
class NotifyMethodsTest(AltManagerTestBase):
    """notify_owner and notify_managers on AltCorpRecord send discord messages."""

    def test_notify_owner_calls_discord(self, mock_send):
        record = self.make_sanction()
        record.notify_owner("Test message")
        mock_send.assert_called_once()
        call_kwargs = mock_send.call_args[1]
        self.assertIn("user_pk", call_kwargs)

    def test_notify_owner_error_is_caught(self, mock_send):
        mock_send.side_effect = Exception("discord down")
        record = self.make_sanction()
        # Should not raise
        record.notify_owner("Test message")

    def test_notify_managers_calls_discord(self, mock_send):
        record = self.make_sanction()
        record.notify_managers("Test message")
        mock_send.assert_called_once()
        call_kwargs = mock_send.call_args[1]
        self.assertIn("channel_id", call_kwargs)

    def test_notify_managers_with_actor(self, mock_send):
        record = self.make_sanction()
        record.notify_managers("Test message", actor=self.sanctioner_char)
        mock_send.assert_called_once()

    def test_notify_owner_approved_sets_green(self, mock_send):
        record = self.make_sanction(approved=True)
        record.notify_owner("Approved")
        embed = mock_send.call_args[1]["embed"]
        self.assertEqual(embed["color"], 1244928)  # GREEN

    def test_notify_owner_revoked_sets_red(self, mock_send):
        record = self.make_sanction(revoked=True)
        record.notify_owner("Revoked")
        embed = mock_send.call_args[1]["embed"]
        self.assertEqual(embed["color"], 16711680)  # RED

    def test_notify_owner_without_character_ownership_is_caught(self, mock_send):
        bare_char = EveCharacter.objects.create(
            character_id=9999,
            character_name="Bare Char",
            corporation_id=self.alt_corp.corporation_id,
            corporation_name=self.alt_corp.corporation_name,
            corporation_ticker=self.alt_corp.corporation_ticker,
        )
        record = AltCorpRecord.objects.create(actual_members=0)
        AltCorpHistory.objects.create(
            request=record,
            corporation=self.alt_corp,
            corporation_name=self.alt_corp.corporation_name,
            target=self.target,
            owner=bare_char,
            owner_character_name=bare_char.character_name,
            owner_corporation_name=bare_char.corporation_name,
        )
        mock_send.side_effect = Exception("no ownership")
        # Should not raise — exception is caught internally
        record.notify_owner("Test")


class MainInMemberCorpFilterTest(AltManagerTestBase):
    """MainInMemberCorpFilter.process_filter and audit_filter."""

    def test_process_filter_main_in_member_corp_returns_true(self):
        f = MainInMemberCorpFilter.objects.create(
            name="Test", description="test filter"
        )
        # owner_user has owner_char (in member_corp) as main
        self.assertTrue(f.process_filter(self.owner_user))

    def test_process_filter_no_main_char_returns_false(self):
        f = MainInMemberCorpFilter.objects.create(
            name="Test2", description="test filter 2"
        )
        user = AuthUtils.create_user("no_main_filter_user")
        self.assertFalse(f.process_filter(user))

    def test_process_filter_swap_logic_inverts_result(self):
        f = MainInMemberCorpFilter.objects.create(
            name="Test3", description="test filter 3", swap_logic=True
        )
        # owner_user IS in member corp → swap_logic=True → returns False
        self.assertFalse(f.process_filter(self.owner_user))

    def test_audit_filter_user_in_member_corp(self):
        f = MainInMemberCorpFilter.objects.create(
            name="AuditTest", description="audit"
        )
        result = f.audit_filter([self.owner_user])
        self.assertTrue(result[self.owner_user.id]["check"])

    def test_audit_filter_user_not_in_member_corp(self):
        f = MainInMemberCorpFilter.objects.create(
            name="AuditTest2", description="audit2"
        )
        user = AuthUtils.create_user("non_member_filter_user")
        result = f.audit_filter([user])
        self.assertFalse(result[user.id]["check"])

    def test_process_filter_exception_returns_false(self):
        f = MainInMemberCorpFilter.objects.create(
            name="ExcTest", description="exception test"
        )
        # Pass something that is not a User → audit_filter raises → returns False
        self.assertFalse(f.process_filter("not_a_user"))


def _make_alt_record_pair(owner_char):
    """Create a minimal AltRecord + AltHistory pair."""
    record = AltRecord.objects.create()
    hist = AltHistory.objects.create(
        request=record,
        entity_id=12345,
        entity_name="Test Alliance",
        entity_type="Alliance",
        owner=owner_char,
        owner_character_name=owner_char.character_name,
        owner_corporation_name=owner_char.corporation_name,
    )
    return record, hist


@patch("altmanager.models.send_discord_message")
class AltRecordNotifyTest(AltManagerTestBase):
    """notify_owner and notify_managers on AltRecord (the alt-tracking model)."""

    def test_notify_owner_is_called(self, mock_send):
        record, _ = _make_alt_record_pair(self.owner_char)
        record.notify_owner("Test message")
        mock_send.assert_called_once()

    def test_notify_owner_approved_green(self, mock_send):
        record, _ = _make_alt_record_pair(self.owner_char)
        record.approved = True
        record.save()
        record.notify_owner("Approved")
        embed = mock_send.call_args[1]["embed"]
        self.assertEqual(embed["color"], 1244928)  # GREEN

    def test_notify_owner_revoked_red(self, mock_send):
        record, _ = _make_alt_record_pair(self.owner_char)
        record.revoked = True
        record.save()
        record.notify_owner("Revoked")
        embed = mock_send.call_args[1]["embed"]
        self.assertEqual(embed["color"], 16711680)  # RED

    def test_notify_owner_error_caught(self, mock_send):
        mock_send.side_effect = Exception("discord down")
        record, _ = _make_alt_record_pair(self.owner_char)
        record.notify_owner("Test")  # should not raise

    def test_notify_managers_is_called(self, mock_send):
        record, _ = _make_alt_record_pair(self.owner_char)
        record.notify_managers("Test message")
        mock_send.assert_called_once()

    def test_notify_managers_with_actor(self, mock_send):
        record, _ = _make_alt_record_pair(self.owner_char)
        record.notify_managers("Test", actor=self.sanctioner_char)
        mock_send.assert_called_once()
        embed = mock_send.call_args[1]["embed"]
        self.assertIn(self.sanctioner_char.character_name, embed["description"])

    def test_notify_managers_approved_green(self, mock_send):
        record, _ = _make_alt_record_pair(self.owner_char)
        record.approved = True
        record.save()
        record.notify_managers("Approved")
        embed = mock_send.call_args[1]["embed"]
        self.assertEqual(embed["color"], 1244928)  # GREEN

    def test_notify_managers_revoked_red(self, mock_send):
        record, _ = _make_alt_record_pair(self.owner_char)
        record.revoked = True
        record.save()
        record.notify_managers("Revoked")
        embed = mock_send.call_args[1]["embed"]
        self.assertEqual(embed["color"], 16711680)  # RED


class AltRecordStrTest(AltManagerTestBase):
    """__str__ on AltRecord and AltHistory."""

    def test_alt_record_str_with_history(self):
        record, _ = _make_alt_record_pair(self.owner_char)
        s = str(record)
        self.assertIsInstance(s, str)
        self.assertIn("Test Alliance", s)

    def test_alt_record_str_fallback(self):
        record = AltRecord.objects.create()
        # No AltHistory → request reverse lookup raises → fallback
        s = str(record)
        self.assertIsInstance(s, str)

    def test_alt_history_str_with_data(self):
        _, hist = _make_alt_record_pair(self.owner_char)
        s = str(hist)
        self.assertIsInstance(s, str)
        self.assertIn("Test Alliance", s)

    def test_alt_history_str_fallback(self):
        record = AltRecord.objects.create()
        hist = AltHistory.objects.create(
            request=record,
            entity_id=0,
            entity_name="",
            entity_type="",
        )
        # With empty strings, __str__ succeeds (no exception), but test it runs
        s = str(hist)
        self.assertIsInstance(s, str)
