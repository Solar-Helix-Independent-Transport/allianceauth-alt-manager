from __future__ import annotations

import json
import logging
from datetime import timedelta
from typing import List

from allianceauth.eveonline.models import EveCharacter, EveCorporationInfo
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models import QuerySet
from django.utils import timezone
from esi.decorators import tokens_required
from esi.errors import TokenExpiredError
from esi.models import Token
from ninja import Field, NinjaAPI, Schema
from ninja.pagination import LimitOffsetPagination, paginate
from ninja.security import django_auth
from ninja.types import DictStrAny

from . import providers, schema
from .models import AltCorpRecord, AltManagerConfiguration

REQUIRED_SCOPES = ["esi-corporations.read_corporation_membership.v1"]

logger = logging.getLogger(__name__)


api = NinjaAPI(title="Alt Manager API", version="0.0.1",
               urls_namespace='altmanager:api', auth=django_auth, csrf=True)  # ,
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

    characters = EveCharacter.objects.filter(
        character_id__in=tokens.values_list("character_id")
    )

    sanctions = AltCorpRecord.objects.filter(
        request__owner__in=characters
    )

    for _s in sanctions:
        _c = _s.request.corporation

        known_members = EveCharacter.objects.filter(
            corporation_id=_c.corporation_id,
            character_ownership__isnull=False
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
            "known_member_count": known_members
        }

    logger.warning(output)

    corporations = EveCorporationInfo.objects.filter(
        corporation_id__in=characters.values_list("corporation_id")
    )

    for _c in corporations:
        if _c.corporation_id > 2000000:
            if _c.corporation_id not in members:
                if _c.corporation_id not in output:
                    _a = _c.alliance
                    known_members = EveCharacter.objects.filter(
                        corporation_id=_c.corporation_id,
                        character_ownership__isnull=False
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
                        "known_member_count": known_members
                    }
    logger.warning(output)

    return list(output.values())


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
    )

    for _s in sanctions:
        _c = _s.request.corporation

        known_members = EveCharacter.objects.filter(
            corporation_id=_c.corporation_id,
            character_ownership__isnull=False
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
            "known_member_count": known_members
        }

    return list(output.values())
