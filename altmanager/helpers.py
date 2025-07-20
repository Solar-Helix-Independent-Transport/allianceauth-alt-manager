import logging

from allianceauth.authentication.models import CharacterOwnership
from allianceauth.eveonline.models import (EveAllianceInfo, EveCharacter,
                                           EveCorporationInfo)
from django.contrib.auth.models import User
from django.db.models import QuerySet
from esi.models import Token

from altmanager.models import AltCorpRecord, AltManagerConfiguration

from .providers import esi

REQUIRED_SCOPES = ["esi-corporations.read_corporation_membership.v1"]

logger = logging.getLogger(__name__)


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
    characters = EveCharacter.objects.filter(
        corporation_id=corporation_id,
        character_ownership__isnull=False
    )
    # logger.warning(corporation_id)
    # logger.warning(characters)
    # logger.warning(characters.count())
    return characters


def get_known_corporation_members_from_members(corporation_id: int) -> QuerySet[EveCharacter]:
    characters = EveCharacter.objects.filter(
        corporation_id=corporation_id,
        character_ownership__user__profile__main_character__corporation_id__in=(
            AltManagerConfiguration.get_member_corporation_ids()
        )
    )
    # logger.warning(corporation_id)
    # logger.warning(characters)
    # logger.warning(characters.count())
    return characters


def get_and_update_member_list(entity_id, user=None):
    corporation_detail = esi.client.Corporation.get_corporations_corporation_id(
        corporation_id=entity_id
    ).results()

    if corporation_detail.get("alliance_id"):
        try:
            EveAllianceInfo.objects.get(alliance_id=corporation_detail.get("alliance_id"))
        except EveAllianceInfo.DoesNotExist:
            EveAllianceInfo.objects.create_alliance(corporation_detail.get("alliance_id"))
            EveCorporationInfo.objects.get(corporation_id=entity_id).update_corporation()

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


def get_sactionable_actions(user:User = False):
    sanctions = None

    if user:
        sanctions = AltCorpRecord.objects.visible_to(
            user
        )
    else:
        sanctions = AltCorpRecord.objects.all()
    
    sanctions = sanctions.filter(
        request__owner__isnull=False,
    ).select_related(
        "request",
        "request__corporation",
        "request__corporation__alliance",
        "request__owner",
        "request__owner__character_ownership__user",
        "request__sanctioner",
        "request__approver",
        "request__target",
    )

    output = {}

    for _s in sanctions:
        _c = _s.request.corporation

        known_members = get_known_corporation_members(
            _c.corporation_id
        ).count()

        known_members_in_member_corps = get_known_corporation_members_from_members(
            _c.corporation_id
        ).count()

        output[_c.corporation_id] = {
            "model": _s,
            "corporation_name": _c.corporation_name,
            "corporation_id": _c.corporation_id,
            "alliance_name": (
                _c.alliance.alliance_name if _c.alliance else None
            ),
            "alliance_id": _c.alliance.alliance_id if _c.alliance else None,
            "owner": _s.request.owner,
            "approver": _s.request.approver,
            "sanctioner": _s.request.sanctioner,
            "approved": _s.approved,
            "sanctioned": _s.sanctioned,
            "revoked": _s.revoked,
            "revoked_reason": _s.revoked_reason,
            "revoked_pending": _s.pending_revoke,
            "date": _s.request_date,
            "member_count": _c.member_count,
            "known_member_count": known_members,
            "known_members_in_member_corps": known_members_in_member_corps,
            "target": _s.request.target
        }

    return list(output.values())
