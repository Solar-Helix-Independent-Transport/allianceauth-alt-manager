from allianceauth.authentication.models import CharacterOwnership
from allianceauth.eveonline.models import EveCharacter, EveCorporationInfo
from allianceauth.tests.auth_utils import AuthUtils
from django.test import TestCase
from django.utils import timezone

from altmanager.models import (
    AltCorpHistory,
    AltCorpRecord,
    AltCorpTarget,
    AltManagerConfiguration,
)


class AltManagerTestBase(TestCase):
    """
    Common fixtures for alt manager tests.

    Creates:
      member_corp   — the main alliance corp (mains live here)
      alt_corp      — the corp being registered as an alt corp
      target        — an AltCorpTarget
      owner_char/owner_user — member who owns the alt corp
      sanctioner_char — corp officer who sanctions
      approver_char   — alliance officer who approves
    """

    @classmethod
    def setUpTestData(cls):
        cls.member_corp = EveCorporationInfo.objects.create(
            corporation_id=10000001,
            corporation_name="Member Corp",
            corporation_ticker="MBR",
            ceo_id=1,
            member_count=5,
        )
        cls.alt_corp = EveCorporationInfo.objects.create(
            corporation_id=20000001,
            corporation_name="Alt Corp",
            corporation_ticker="ALT",
            ceo_id=2,
            member_count=3,
        )

        config = AltManagerConfiguration.get_solo()
        config.member_corps.add(cls.member_corp)
        config.save()

        cls.target = AltCorpTarget.objects.create(
            name="Test Target",
            allow_non_members=False,
        )

        cls.owner_char = EveCharacter.objects.create(
            character_id=1001,
            character_name="Owner Char",
            corporation_id=cls.member_corp.corporation_id,
            corporation_name=cls.member_corp.corporation_name,
            corporation_ticker=cls.member_corp.corporation_ticker,
        )
        cls.owner_user = AuthUtils.create_user("owner_user")
        cls.owner_user.profile.main_character = cls.owner_char
        cls.owner_user.profile.save()
        CharacterOwnership.objects.create(
            user=cls.owner_user, character=cls.owner_char, owner_hash="owner_hash"
        )

        cls.sanctioner_char = EveCharacter.objects.create(
            character_id=1002,
            character_name="Sanctioner Char",
            corporation_id=cls.member_corp.corporation_id,
            corporation_name=cls.member_corp.corporation_name,
            corporation_ticker=cls.member_corp.corporation_ticker,
        )
        cls.approver_char = EveCharacter.objects.create(
            character_id=1003,
            character_name="Approver Char",
            corporation_id=cls.member_corp.corporation_id,
            corporation_name=cls.member_corp.corporation_name,
            corporation_ticker=cls.member_corp.corporation_ticker,
        )

    def make_sanction(self, approved=False, sanctioned=False, revoked=False):
        """Create a fresh AltCorpRecord + AltCorpHistory pair."""
        record = AltCorpRecord.objects.create(actual_members=3)
        AltCorpHistory.objects.create(
            request=record,
            corporation=self.alt_corp,
            corporation_name=self.alt_corp.corporation_name,
            target=self.target,
            owner=self.owner_char,
            owner_character_name=self.owner_char.character_name,
            owner_corporation_name=self.owner_char.corporation_name,
        )
        if approved:
            record.approved = True
            record.request.approver = self.approver_char
            record.request.save()
        if sanctioned:
            record.sanctioned = True
            record.request.sanctioner = self.sanctioner_char
            record.request.save()
        if revoked:
            record.revoked = True
        record.save()
        return record
