from allianceauth.eveonline.models import EveCharacter, EveCorporationInfo
from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from django.shortcuts import redirect, render
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from esi.decorators import token_required
from esi.models import Token

from . import __version__
from .api import get_missing, get_sanction_actions, get_sanctionable_corps
from .models import AltCorpHistory, AltCorpRecord, AltCorpTarget
from .providers import esi

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


@permission_required("altmanager.can_request_alt_corp")
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


@permission_required("altmanager.can_sanction_own_corp")
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
def alt_check(request, corp_id):
    _status, data = get_missing(request, corp_id)
    if _status != 200:
        messages.warning(
            request,
            f"Unable to lookup missing alts {_status} {data}"
        )
        return redirect('altmanager:request')
    return render(
        request,
        'altmanager/missing.html',
        context={
            "version": __version__,
            "app_name": "altmanager",
            "page_title": "Alt Manager",
            "corporation": data['corporation'],
            "characters": data['characters'],
            "unknowns": data['unknowns'],
        }
    )


@permission_required("altmanager.can_request_alt_corp")
def claim_corp(request, corp_id=None, req_target_id=None):
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

        if req_target_id is not None:
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
                target_id=req_target_id,
                corporation_name=corp.corporation_name,
                owner=request.user.profile.main_character,
                owner_corporation_name=request.user.profile.main_character.corporation_name,
                owner_character_name=request.user.profile.main_character.character_name,
            )

            _msg = (
                f"New `{record.request.target.name}` request created for `{corp.corporation_name}` "
                f"by `{request.user.profile.main_character}`, sanctioning pending."
            )
            messages.info(
                request,
                _msg
            )
            record.notify_managers(
                _msg
            )

            return redirect('altmanager:request')
        else:
            targets = AltCorpTarget.objects.all()
            return render(
                request,
                'altmanager/targets.html',
                context={
                    "version": __version__,
                    "app_name": "altmanager",
                    "page_title": "Alt Manager",
                    'member_count': len(members),
                    'corporation_ticker': char.corporation_ticker,
                    'corporation_name': char.corporation_name,
                    'corporation_id': char.corporation_id,
                    "targets": targets
                }
            )

    else:
        messages.error(request, "No Tokens found. Please add a membership token.")

    return redirect('altmanager:request')


@permission_required("altmanager.can_sanction_own_corp")
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

        _msg = (
            f"`{req.request.target.name}` sanctioning approved for "
            f"`{req.request.corporation.corporation_name}`"
        )
        messages.info(
            request,
            _msg
        )
        req.notify_owner(
            _msg
        )
        req.notify_managers(
            _msg
        )

    return redirect('altmanager:sanctions')


@permission_required("altmanager.can_sanction_own_corp")
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

        _msg = (
            f"`{req.request.target.name}` sanctioning revoked for "
            f"`{req.request.corporation.corporation_name}`"
        )
        messages.info(
            request,
            _msg
        )
        req.notify_owner(
            _msg
        )
        req.notify_managers(
            _msg
        )

    return redirect('altmanager:sanctions')


@permission_required("altmanager.can_sanction_all")
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
        _msg = (
            f"Revoke flag cleared for `{req.request.corporation.corporation_name}`"
        )
        messages.info(
            request,
            _msg
        )
        req.notify_owner(
            _msg
        )
        req.notify_managers(
            _msg
        )

    return redirect('altmanager:manage')


@permission_required("altmanager.can_sanction_all")
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
        req.revoked = True
        _msg = (
            f"`{req.request.target.name}` request deleted for `{corp}`."
        )
        messages.info(
            request,
            _msg
        )
        req.notify_owner(
            _msg
        )
        req.notify_managers(
            _msg
        )
        req.delete()

    return redirect('altmanager:manage')


@permission_required("altmanager.can_sanction_all")
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

        _msg = (
            f"`{req.request.target.name}` request fully approved for "
            f"`{req.request.corporation.corporation_name}`"
        )

        messages.info(
            request,
            _msg
        )
        req.notify_owner(
            _msg
        )
        req.notify_managers(
            _msg
        )

    return redirect('altmanager:manage')


@permission_required("altmanager.can_sanction_all")
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
