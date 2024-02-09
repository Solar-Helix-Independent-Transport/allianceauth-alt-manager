from __future__ import annotations

import json
import logging
from datetime import timedelta
from typing import List

from allianceauth.eveonline.models import EveCharacter, EveCorporationInfo
from authstats import providers, schema
from authstats.tasks import run_report_for_corp
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models import QuerySet
from django.utils import timezone
from esi.errors import TokenExpiredError
from esi.models import Token
from ninja import Field, NinjaAPI, Schema
from ninja.pagination import LimitOffsetPagination, paginate
from ninja.security import django_auth
from ninja.types import DictStrAny

from . import providers
from .models import AltManagerConfiguration

logger = logging.getLogger(__name__)


api = NinjaAPI(title="Alt Manager API", version="0.0.1",
               urls_namespace='altmanager:api', auth=django_auth, csrf=True)  # ,
# openapi_url=settings.DEBUG and "/openapi.json" or "")


def get_corps_for_user(user: User):
    out = {}

    tokens = None
    if user.is_superuser or user.has_perm("altmanager.su_access"):
        tokens = Token.objects.all(
        ).values_list(
            "character__character_id", flat=True
        ).require_scopes("esi-corporations.read_corporation_membership.v1")
    else:
        tokens = Token.objects \
            .filter(character_id__in=user.character_ownerships.all(
            ).values_list(
                "character__character_id", flat=True)
            ).require_scopes("esi-corporations.read_corporation_membership.v1")

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
    if not (request.user.has_perm("altmanager.su_access") or
            request.user.has_perm("altmanager.basic_access")):
        return 403, "Access Denied"

    if not request.user.is_superuser:
        if corp_id not in get_corps_for_user(request.user):
            return 403, "Access Denied"

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
                     "unknowns": member_count-len(known_ids),
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
