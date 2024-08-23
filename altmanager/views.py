import json
import xml.etree.ElementTree as ET

from allianceauth.eveonline.models import EveCharacter, EveCorporationInfo
from authstats.models import Report
from django.contrib import messages
from django.contrib.auth.decorators import (permission_required,
                                            user_passes_test)
from django.shortcuts import redirect, render
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django_celery_beat.models import CrontabSchedule, PeriodicTask
from esi.decorators import _check_callback, token_required
from esi.models import Token
from esi.views import sso_redirect

from . import __version__
from .api import get_sanction_actions, get_sanctionable_corps
from .models import AltCorpHistory, AltCorpRecord
from .providers import esi, get_corp_token

REQUIRED_SCOPES = ["esi-corporations.read_corporation_membership.v1"]


@token_required(scopes=REQUIRED_SCOPES)
def add_corp(request, token, corp_id=None):
    print(corp_id)
    char = EveCharacter.objects.get_character_by_id(token.character_id)
    # This is more accurate and tests teh token at the same time.
    # TODO try catch and test for errors
    members = esi.client.Corporation.get_corporations_corporation_id_members(
        corporation_id=char.corporation_id,
        token=token.valid_access_token()
    ).results()
    corp, created = EveCorporationInfo.objects.update_or_create(
        corporation_id=char.corporation_id,
        defaults={
            'member_count': len(members),
            'corporation_ticker': char.corporation_ticker,
            'corporation_name': char.corporation_name
        }
    )
    return redirect('altmanager:request')


@permission_required("altmanager.basic_access")
def react_main(request, cid):
    # get available models
    return render(
        request,
        'altmanager/react_base.html',
        context={
            "version": __version__,
            "app_name": "altmanager",
            "page_title": "Alt Manager"
        }
    )


@permission_required("altmanager.basic_access")
def react_redirect(request):
    # get available models
    cid = request.user.profile.main_character.corporation_id
    return redirect("altmanager:report", cid=cid)


@permission_required("altmanager.basic_access")
def request_main(request):
    data = get_sanctionable_corps(request)
    return render(
        request,
        'altmanager/requests.html',
        context={
            "version": __version__,
            "app_name": "altmanager",
            "page_title": "Alt Manager",
            "corporations": data
        }
    )


@permission_required(
    [
        "altmanager.can_sanction_own_corp",
        "altmanager.can_sanction_all"
    ]
)
def show_sanctions(request):
    data = get_sanction_actions(request)
    return render(
        request,
        'altmanager/sanctions.html',
        context={
            "version": __version__,
            "app_name": "altmanager",
            "page_title": "Alt Manager",
            "corporations": data
        }
    )


@permission_required("altmanager.can_request_alt_corp")
def claim_corp(request, corp_id=None):
    char_ids = EveCharacter.objects.filter(
        corporation_id=corp_id).values('character_id')

    existing = AltCorpRecord.objects.filter(
        request__corporation__corporation_id=corp_id
    ).exists()

    if existing:
        messages.error(request, "Unable to claim corp. corp already claimed")
        return redirect('altmanager:request')

    tokens = Token.objects.filter(
        character_id__in=char_ids,
        user=request.user).require_scopes(REQUIRED_SCOPES)

    if tokens.exists():
        token = tokens.first()

        char = EveCharacter.objects.get_character_by_id(
            token.character_id
        )

        members = esi.client.Corporation.get_corporations_corporation_id_members(
            corporation_id=corp_id,
            token=token.valid_access_token()
        ).results()

        corp, created = EveCorporationInfo.objects.update_or_create(
            corporation_id=corp_id,
            defaults={
                'member_count': len(members),
                'corporation_ticker': char.corporation_ticker,
                'corporation_name': char.corporation_name
            }
        )

        record = AltCorpRecord.objects.create(
            request_date=timezone.now(),
            actual_members=len(members),
        )

        AltCorpHistory.objects.create(
            request_date=timezone.now(),
            request=record,
            corporation=corp,
            corporation_name=corp.corporation_name,
            owner=request.user.profile.main_character,
            owner_corporation_name=request.user.profile.main_character.corporation_name,
            owner_character_name=request.user.profile.main_character.character_name,
        )

        messages.info(
            request,
            (
                f"New claim created for {corp.corporation_name} "
                f"for {request.user.profile.main_character}, sanction pending."
            )
        )
    else:
        messages.error(request, "No tokens found?")

    return redirect('altmanager:request')


@permission_required(["altmanager.can_sanction_own_corp", "altmanager.can_sanction_all"])
def sanction_approve_corp(request, corp_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=corp_id
    )

    if vis.count() != 1:
        messages.error(
            request,
            "Unable to approve corp. Do you have permission?"
        )
        return redirect('altmanager:sanctions')
    else:
        mc = request.user.profile.main_character
        req = vis.first()

        req.approve(sanctioner=mc)

        messages.info(
            request,
            (
                f"Sanction approved for {req.request.corporation.corporation_name}"
            )
        )

    return redirect('altmanager:sanctions')


@permission_required(["altmanager.can_sanction_own_corp", "altmanager.can_sanction_all"])
def sanction_revoke_corp(request, corp_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=corp_id
    )

    if vis.count() != 1:
        messages.error(
            request,
            "Unable to revoke corp. Do you have permission?"
        )
        return redirect('altmanager:sanctions')
    else:
        req = vis.first()
        req.revoke(request.user)

        messages.info(
            request,
            (
                f"Sanction revoked for {req.request.corporation.corporation_name}"
            )
        )

    return redirect('altmanager:sanctions')


@permission_required(["altmanager.can_sanction_all"])
def sanction_clear_revoke_corp(request, corp_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=corp_id
    )

    if vis.count() != 1:
        messages.error(
            request,
            "Unable to clear revoke for corp. Do you have permission?"
        )
        return redirect('altmanager:manage')
    else:
        req = vis.first()
        req.clear_revoke()
        messages.info(
            request,
            (
                f"Revoke cleared for {req.request.corporation.corporation_name}"
            )
        )

    return redirect('altmanager:manage')


@permission_required(["altmanager.can_sanction_all"])
def sanction_delete_corp(request, corp_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=corp_id
    )

    if vis.count() != 1:
        messages.error(
            request,
            "Unable to delete revoke for corp. Do you have permission?"
        )
        return redirect('altmanager:manage')
    else:
        req = vis.first()
        corp = req.request.corporation.corporation_name
        req.delete()
        messages.info(
            request,
            (
                f"Request Deleted for {corp}"
            )
        )

    return redirect('altmanager:manage')


@permission_required(["altmanager.can_sanction_all"])
def approve_corp(request, corp_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=corp_id
    )

    if vis.count() != 1:
        messages.error(
            request,
            "Unable to approve corp. Do you have permission?"
        )
        return redirect('altmanager:manage')
    else:
        mc = request.user.profile.main_character
        req = vis.first()

        req.approve(approver=mc)

        messages.info(
            request,
            (
                f"Sanction approved for {req.request.corporation.corporation_name}"
            )
        )

    return redirect('altmanager:manage')


@permission_required(
    [
        "altmanager.can_sanction_all"
    ]
)
def show_manage(request):
    data = get_sanction_actions(request)
    return render(
        request,
        'altmanager/manage.html',
        context={
            "version": __version__,
            "app_name": "altmanager",
            "page_title": "Alt Manager",
            "corporations": data
        }
    )
