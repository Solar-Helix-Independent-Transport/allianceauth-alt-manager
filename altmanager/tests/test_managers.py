from allianceauth.authentication.models import CharacterOwnership
from allianceauth.eveonline.models import EveCharacter
from allianceauth.tests.auth_utils import AuthUtils

from altmanager.models import AltCorpRecord

from .base import AltManagerTestBase


class SanctionManagerVisibilityTest(AltManagerTestBase):
    def test_superuser_sees_all(self):
        self.make_sanction()
        self.make_sanction()
        superuser = AuthUtils.create_user("superuser")
        superuser.is_superuser = True
        superuser.save()

        qs = AltCorpRecord.objects.visible_to(superuser)
        self.assertEqual(qs.count(), 2)

    def test_can_sanction_all_sees_all(self):
        self.make_sanction()
        self.make_sanction()
        user = AuthUtils.create_user("sanction_all_user")
        AuthUtils.add_permission_to_user_by_name("altmanager.can_sanction_all", user)
        user = user.__class__.objects.get(pk=user.pk)

        qs = AltCorpRecord.objects.visible_to(user)
        self.assertEqual(qs.count(), 2)

    def test_can_sanction_own_corp_sees_own_corp_only(self):
        self.make_sanction()
        self.make_sanction()

        # Create a separate character in member_corp for this user
        char = EveCharacter.objects.create(
            character_id=9001,
            character_name="Sanction Own Corp Char",
            corporation_id=self.member_corp.corporation_id,
            corporation_name=self.member_corp.corporation_name,
            corporation_ticker=self.member_corp.corporation_ticker,
        )
        user = AuthUtils.create_user("own_corp_user")
        CharacterOwnership.objects.create(user=user, character=char, owner_hash="oc9001")
        user.profile.main_character = char
        user.profile.save()
        AuthUtils.add_permission_to_user_by_name(
            "altmanager.can_sanction_own_corp", user
        )
        user = user.__class__.objects.get(pk=user.pk)

        qs = AltCorpRecord.objects.visible_to(user)
        # sanctions are owned by owner_char who is also in member_corp
        self.assertEqual(qs.count(), 2)

    def test_user_without_perms_sees_nothing(self):
        self.make_sanction()
        user = AuthUtils.create_user("no_perm_user")

        qs = AltCorpRecord.objects.visible_to(user)
        self.assertEqual(qs.count(), 0)

    def test_user_without_main_char_sees_nothing(self):
        self.make_sanction()
        user = AuthUtils.create_user("no_main_user")
        AuthUtils.add_permission_to_user_by_name(
            "altmanager.can_sanction_own_corp", user
        )

        qs = AltCorpRecord.objects.visible_to(user)
        self.assertEqual(qs.count(), 0)
