from allianceauth.authentication.models import CharacterOwnership
from allianceauth.eveonline.models import EveAllianceInfo
from django.contrib.auth.models import User
from django.db.models import QuerySet

from altmanager.models import AltManagerConfiguration


def get_all_sanctionable_alliances() -> QuerySet[EveAllianceInfo]:
    members = AltManagerConfiguration.get_member_corporation_ids()
    _corps = CharacterOwnership.objects.filter(
        user__profile__main_character__corporation_id__in=members
    )
    _member_alli_ids = User.objects.filter(
        profile__main_character__corporation_id__in=members,
        profile__main_character__alliance_id__isnull=False
    ).values_list(
        "profile__main_character__alliance_id",
        flat=True
    )
    _alliances = EveAllianceInfo.objects.filter(
        alliance_id__in=_corps.values_list(
            "character__alliance_id",
            flat=True
        )
    ).exclude(
        alliance_id__in=_member_alli_ids
    )
    return _alliances


def get_user_sanctionable_alliances(user) -> QuerySet[EveAllianceInfo]:
    return get_all_sanctionable_alliances().filter(
        alliance_id__in=user.character_ownerships.all().values_list(
            "character__alliance_id",
            flat=True
        )
    )
