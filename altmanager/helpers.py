from allianceauth.authentication.models import CharacterOwnership
from allianceauth.eveonline.models import (EveAllianceInfo, EveCharacter,
                                           EveCorporationInfo)
from django.contrib.auth.models import User
from django.db.models import QuerySet
from esi.models import Token

from altmanager.models import AltManagerConfiguration

from .providers import esi

REQUIRED_SCOPES = ["esi-corporations.read_corporation_membership.v1"]


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


def get_known_corporation_members(corporation_id: int) -> QuerySet[EveCharacter]:
    return EveCharacter.objects.filter(
        corporation_id=corporation_id,
        character_ownership__isnull=False
    )


def get_known_corporation_members_from_members(corporation_id: int) -> QuerySet[EveCharacter]:
    return EveCharacter.objects.filter(
        corporation_id=corporation_id,
        character_ownership__user__profile__main_character__corporation_id__in=(
            AltManagerConfiguration.get_member_corporation_ids()
        )
    )


def get_and_update_member_list(entity_id, user=None):
    char_ids = EveCharacter.objects.filter(
        corporation_id=entity_id
    ).values('character_id')

    tokens = Token.objects.filter(
        character_id__in=char_ids,
    )

    if user:
        tokens = tokens.filter(user=user)

    tokens = tokens.require_scopes(REQUIRED_SCOPES)

    if tokens.exists():
        token = tokens.first()

        char = EveCharacter.objects.get_character_by_id(
            token.character_id
        )

        members = esi.client.Corporation.get_corporations_corporation_id_members(
            corporation_id=entity_id,
            token=token.valid_access_token()
        ).results()

        corp, created = EveCorporationInfo.objects.update_or_create(
            corporation_id=entity_id,
            defaults={
                'member_count': len(members),
                'corporation_ticker': char.corporation_ticker,
                'corporation_name': char.corporation_name
            }
        )

        return corp, members

    else:
        return False, False
