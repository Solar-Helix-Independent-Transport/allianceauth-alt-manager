from __future__ import annotations

import logging
from typing import List

from allianceauth.eveonline.models import (EveAllianceInfo, EveCharacter,
                                           EveCorporationInfo)
from django.contrib.auth.models import User
from django.db.models import QuerySet
from esi.decorators import tokens_required
from esi.models import Token
from ninja import NinjaAPI
from ninja.security import django_auth

from . import providers, schema
from .helpers import (get_all_sanctionable_alliances,
                      get_known_corporation_members,
                      get_known_corporation_members_from_members,
                      get_user_sanctionable_alliances)
from .models import AltCorpRecord, AltManagerConfiguration

REQUIRED_SCOPES = ["esi-corporations.read_corporation_membership.v1"]

logger = logging.getLogger(__name__)

api = NinjaAPI(
    title="Alt Manager API",
    version="0.0.2",
    urls_namespace='altmanager:api',
    auth=django_auth,
    csrf=True
)
# openapi_url=settings.DEBUG and "/openapi.json" or "")


def get_corps_for_user(user: User):
    out = {}

    tokens = None
    if user.is_superuser or user.has_perm("altmanager.su_access"):
        tokens = Token.objects.all(
        ).require_scopes("esi-corporations.read_corporation_membership.v1")
    else:
        tokens = Token.objects \
            .filter(character_id__in=user.character_ownerships.all(
            ).values_list(
                "character__character_id"
            )).require_scopes("esi-corporations.read_corporation_membership.v1")

    for c in EveCharacter.objects.filter(
            character_id__in=tokens.values_list("character_id")):
        if not 1000000 <= c.corporation_id <= 2000000:
            if c.corporation_id not in out:
                out[c.corporation_id] = {
                    "corporation_id": c.corporation_id, "corporation_name": c.corporation_name}
    return out


@api.get(
    "/get_report/{corp_id}",
    response={200: dict, 500: str, 403: str},
    tags=["Corps"]
)
def get_stats_for_corp(request, corp_id: int):
    if not (
        request.user.has_perm(
            "altmanager.su_access"
        ) or request.user.has_perm(
            "altmanager.basic_access"
        )
    ):
        logger.warning(
            f"Access Denied to {request.user} for {corp_id} No Perms")
        return 403, "Access Denied No Perms"

    if not request.user.is_superuser:
        if corp_id not in get_corps_for_user(request.user):
            logger.warning(
                f"Access Denied to {request.user} for {corp_id} Not visible")
            return 403, "Access Denied Not Visible"

    if corp_id == 0:
        return 200, {"corporation": " ",
                     # "character":{character_char,
                     "data": False,
                     "unknowns": 0,
                     "knowns": 0}
    try:
        token = providers.get_corp_token(
            corp_id=corp_id,
            scopes=["esi-corporations.read_corporation_membership.v1"])
        char = EveCharacter.objects.get(character_id=token.character_id)
        data = providers.esi.client.Corporation.get_corporations_corporation_id_members(
            corporation_id=corp_id, token=token.valid_access_token()).result()
        member_count = len(data)
        _knowns = EveCharacter.objects.filter(character_id__in=data,
                                              character_ownership__isnull=False
                                              ).values_list("character_id", flat=True)
        known_ids = list(_knowns)

        out = list(set(data) - set(known_ids))
        new_names = []
        if len(out):
            new_names = providers.esi.client.Universe.post_universe_names(
                ids=out
            ).result()
        return 200, {"corporation": char.corporation_name,
                     # "character":{character_char,
                     "data": new_names,
                     "unknowns": member_count - len(known_ids),
                     "knowns": len(known_ids)}
    except Exception as e:
        logger.exception(e)
        return 500, "Error from ESI {e}"


@api.get(
    "/get_missing/{corp_id}",
    response={200: dict, 500: str, 403: str, 404: str},
    tags=["Corps"]
)
def get_missing(request, corp_id: int, check_members: bool = False):
    if not (
        request.user.has_perm(
            "altmanager.can_request_alt_corp"
        )
    ):
        logger.warning(
            f"Access Denied to {request.user} for c:{corp_id} No Perms")
        return 403, "Access Denied No Perms"

    if not request.user.is_superuser:
        mbr = corp_id not in AltManagerConfiguration.get_member_corporation_ids()
        usr = corp_id in get_corps_for_user(request.user)
        vis_to = AltCorpRecord.objects.visible_to(
            request.user
        ).filter(request__corporation__corporation_id=corp_id).exists()
        if not (mbr and (usr or vis_to)):
            logger.warning(
                f"Access Denied to {request.user} for c:{corp_id} Not visible")
            return 403, "Access Denied Not Visible"

    if corp_id == 0:
        return 200, {
            "corporation": " ",
            # "character":{character_char,
            "characters": False,
            "unknowns": -1,
            "knowns": 0
        }

    try:
        token = providers.get_corp_token(
            corp_id=corp_id,
            scopes=["esi-corporations.read_corporation_membership.v1"]
        )
        
        if not token:
            return 404, f"No Token found, please add a new corporate token for this corporation {corp_id}!"
        
        data = providers.esi.client.Corporation.get_corporations_corporation_id_members(
            corporation_id=corp_id, token=token.valid_access_token()
        ).result()

        member_count = len(data)

        _knowns = EveCharacter.objects.filter(character_id__in=data,
                                              character_ownership__isnull=False
                                              ).values_list("character_id", flat=True)

        known_ids = list(_knowns)

        out = list(set(data) - set(known_ids))

        new_names = []

        if len(out):
            new_names = providers.esi.client.Universe.post_universe_names(
                ids=out
            ).result()

        _c = EveCorporationInfo.objects.get(corporation_id=corp_id)
        _c.member_count = member_count
        _c.save()

        known_members_in_member_corps = get_known_corporation_members(
            corp_id
        ).exclude(
            character_ownership__user__profile__main_character__corporation_id__in=(
                AltManagerConfiguration.get_member_corporation_ids()
            )
        ).values_list(
            "character_name",
            "character_id",
            "character_ownership__user__profile__main_character__character_name",
            "character_ownership__user__profile__main_character__character_id",
            "character_ownership__user__profile__main_character__corporation_name",
            "character_ownership__user__profile__main_character__corporation_id",
            "character_ownership__user__profile__main_character__alliance_name",
            "character_ownership__user__profile__main_character__alliance_id",
            "character_ownership__user__username"
        )
        _know_unknowns = []
        if check_members:
            for _ch in known_members_in_member_corps:
                _know_unknowns.append(
                    {
                        "id": _ch[1],
                        "name": _ch[0],
                        "main_id": _ch[3],
                        "main_name": _ch[2],
                        "corp_id": _ch[5],
                        "corp_name": _ch[4],
                        "alliance_id": _ch[7],
                        "alliance_name": _ch[6],
                        "username": _ch[8]
                    }
                )

        return 200, {
            "corporation": _c,
            # "character":{character_char,
            "characters": new_names,
            "known_non_members": _know_unknowns,
            "unknowns": member_count - len(known_ids),
            "knowns": len(known_ids)
        }

    except Exception as e:
        logger.exception(e)
        return 500, f"Error from ESI {e}"


@api.get(
    "/get_missing_alliance/{alliance_id}",
    response={200: dict, 500: str, 403: str},
    tags=["Corps"]
)
def get_missing_alliance_members(request, alliance_id: int):
    if not (
        request.user.has_perm(
            "altmanager.su_access"
        )
    ):
        logger.warning(
            f"Access Denied to {request.user} for a:{alliance_id} No Perms")
        return 403, "Access Denied No Perms"

    output = {
        "corporations": [],
        "missing": []
    }

    corps = providers.esi.client.Alliance.get_alliances_alliance_id_corporations(
        alliance_id=alliance_id
    ).result()

    db_corps = EveCorporationInfo.objects.filter(
        alliance_id=alliance_id
    ).exclude(
        corporation_id__in=corps
    ).values_list("corporation_id")

    def process_corp(corp_id, esi=False):
        try:
            _code, corp_data = get_missing(request, corp_id=c)
            if _code == 200:
                _m = corp_data["characters"]
                for ch in _m:
                    output["missing"].append(
                        {
                            "id": ch['id'],
                            "name": ch['name'],
                            "corp_id": c,
                            "corp_name": corp_data["corporation"].corporation_name
                        }
                    )
                _m = corp_data["known_non_members"]
                for ch in _m:
                    output["known_non_members"].append(
                        {
                            "id": ch['id'],
                            "name": ch['name'],
                            "corp_id": c,
                            "corp_name": corp_data["corporation"].corporation_name,
                            "main_id": ch['main_id'],
                            "main_name": ch['main_name'],
                            "main_corp_id": ch['corp_id'],
                            "main_corp_name": ch['corp_name'],
                            "main_alliance_id": ch['alliance_id'],
                            "main_alliance_name": ch['alliance_name'],

                        }
                    )
                del corp_data["characters"]
                output["corporations"].append({
                    "corporation": {
                        "corporation_id": c,
                        "corporation_name": corp_data["corporation"].corporation_name
                    },
                    "unknowns": corp_data["unknowns"],
                    "knowns": corp_data["knowns"],
                    "esi_checked": True,
                    "esi_alliance": esi
                })
            else:
                _c = EveCorporationInfo.objects.get(corporation_id=c)
                output["corporations"].append({
                    "corporation": {
                        "corporation_id": _c.corporation_id,
                        "corporation_name": _c.corporation_name
                    },
                    "unknowns": -1,
                    "knowns": -1,
                    "esi_checked": False,
                    "esi_alliance": esi
                })
        except Exception as e:
            logger.exception(e)
            output["corporations"].append({
                "corporation": {
                    "corporation_id": corp_id,
                    "corporation_name": f"ERROR:{corp_id}"
                },
                "unknowns": -2,
                "knowns": -2,
                "esi_checked": False,
                "esi_alliance": esi
            })

    for c in corps:
        process_corp(c, esi=True)

    for c in db_corps:
        process_corp(c, esi=False)

    return output


@api.get(
    "/get_corps",
    response={200: List[schema.Corporation]},
    tags=["Corps"]
)
def get_corps(request):
    return list(get_corps_for_user(request.user).values())


@api.get(
    "/get_account_corps",
    response={200: List[schema.Corporation]},
    tags=["Corps"]
)
def get_account_corps(request):
    corporations = {}

    members = AltManagerConfiguration.get_member_corporation_ids()

    for _co in request.user.character_ownerships.all():
        _c = _co.character
        if _c.corporation_id not in members:
            if _c.corporation_id not in corporations and _c.corporation_id > 2000000:
                corporations[_c.corporation_id] = {
                    "corporation_name": _c.corporation_name,
                    "corporation_id": _c.corporation_id,
                }

    return list(corporations.values())


@api.get(
    "/get_sanctionable_corps",
    response={200: List[schema.Sanction]},
    tags=["Corps"]
)
@tokens_required(scopes=REQUIRED_SCOPES)
def get_sanctionable_corps(request, *args):
    output = {}

    try:
        tokens = args[0] if isinstance(
            args[0], QuerySet[Token]) else Token.objects.none()
    except IndexError:
        tokens = Token.objects.none()

    logger.warning(tokens)

    members = AltManagerConfiguration.get_member_corporation_ids()

    _chars = list(
        tokens.values_list("character_id", flat=True)
    )

    mc_id = request.user.profile.main_character.character_id

    if mc_id not in _chars:
        _chars.append(mc_id)

    characters = EveCharacter.objects.filter(
        character_id__in=_chars
    )

    logger.warning(f"char {characters}")

    sanctions = AltCorpRecord.objects.filter(
        request__owner__in=characters
    )

    logger.warning(f"alts {sanctions}")

    for _s in sanctions:
        _c = _s.request.corporation

        logger.warning(sanctions)

        known_members = get_known_corporation_members(
            _c.corporation_id
        ).count()

        known_members_in_member_corps = get_known_corporation_members_from_members(
            _c.corporation_id
        ).count()

        output[_c.corporation_id] = {
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
            "date": _s.request_date,
            "member_count": _c.member_count,
            "known_member_count": known_members,
            "known_members_in_member_corps": known_members_in_member_corps,
        }

    #  logger.warning(f"req {output}")

    corporations = EveCorporationInfo.objects.filter(
        corporation_id__in=characters.values_list("corporation_id")
    )

    for _c in corporations:
        if _c.corporation_id > 2000000:
            if _c.corporation_id not in members:
                if _c.corporation_id not in output:
                    logger.warning(_c)
                    _a = _c.alliance
                    known_members = get_known_corporation_members(
                        _c.corporation_id
                    ).count()

                    known_members_in_member_corps = get_known_corporation_members_from_members(
                        _c.corporation_id
                    ).count()

                    output[_c.corporation_id] = {
                        "corporation_name": _c.corporation_name,
                        "corporation_id": _c.corporation_id,
                        "alliance_name": (
                            _a.alliance_name if _a else None
                        ),
                        "alliance_id": (
                            _a.alliance_id if _a else None
                        ),
                        "member_count": _c.member_count,
                        "known_member_count": known_members,
                        "known_members_in_member_corps": known_members_in_member_corps,
                    }

    return list(output.values())


@api.get(
    "/get_sanctionable_alliances",
    response={200: List[schema.Alliance]},
    tags=["alliances"]
)
def get_sanctionable_alliances(request):
    return get_user_sanctionable_alliances(request.user)


@api.get(
    "/get_all_sanctionable_alliances",
    response={200: List[schema.Alliance], 403: str},
    tags=["alliances"]
)
def get_avail_sanctionable_alliances(request):
    if not (
        request.user.has_perm(
            "altmanager.su_access"
        )
    ):
        logger.warning(
            f"Access Denied to {request.user} for get_all_sanctionable_alliances No Perms")
        return 403, "Access Denied No Perms"

    return 200, get_all_sanctionable_alliances()


@api.get(
    "/get_sanction_actions",
    response={200: List[schema.Sanction]},
    tags=["Corps"]
)
def get_sanction_actions(request):
    output = {}

    sanctions = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__owner__isnull=False,
    ).select_related(
        "request",
        "request__corporation",
        "request__corporation__alliance",
        "request__owner",
        "request__approver",
        "request__target",
    )

    for _s in sanctions:
        _c = _s.request.corporation

        known_members = get_known_corporation_members(
            _c.corporation_id
        ).count()

        known_members_in_member_corps = get_known_corporation_members_from_members(
            _c.corporation_id
        ).count()

        output[_c.corporation_id] = {
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
            "date": _s.request_date,
            "member_count": _c.member_count,
            "known_member_count": known_members,
            "known_members_in_member_corps": known_members_in_member_corps,
            "target": _s.request.target
        }

    return list(output.values())
