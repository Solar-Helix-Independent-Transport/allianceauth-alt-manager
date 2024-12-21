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
from .helpers import (REQUIRED_SCOPES, get_and_update_member_list,
                      get_known_corporation_members,
                      get_known_corporation_members_from_members)
from .models import AltCorpHistory, AltCorpRecord, AltCorpTarget
from .providers import esi


@token_required(scopes=REQUIRED_SCOPES)
def add_corp(request, token, corp_id=None):
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
            "page_title": "Alt Sanctioning"
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
            "page_title": "Alt Sanctioning",
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
            "page_title": "Alt Sanctioning",
            "corporations": data
        }
    )


@permission_required("altmanager.can_request_alt_corp")
def alt_check(request, entity_id: int):
    _status, data = get_missing(request, entity_id, check_members=True)
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
            "page_title": "Alt Sanctioning",
            "corporation": data['corporation'],
            "characters": data['characters'],
            "known_non_members": data['known_non_members'],
            "unknowns": data['unknowns'],
        }
    )


@permission_required("altmanager.can_request_alt_corp")
def claim_corp(request, entity_id=None, entity_type="corporation", req_target_id=None):
    if entity_type == "corporation":
        existing = AltCorpRecord.objects.filter(
            request__corporation__corporation_id=entity_id
        ).exists()

        if existing:
            messages.error(request, "Unable to claim corp. corp already claimed")
            return redirect('altmanager:request')

        corp, members = get_and_update_member_list(entity_id)

        if members:
            if req_target_id is not None:
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
                    f"New `{record.request.target.name}` request created for "
                    f"`{corp.corporation_name}` "
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

                known_members = get_known_corporation_members(entity_id).count()

                known_members_in_member_corps = get_known_corporation_members_from_members(
                    entity_id
                ).count()

                return render(
                    request,
                    'altmanager/targets.html',
                    context={
                        "version": __version__,
                        "app_name": "altmanager",
                        "page_title": "Alt Sanctioning",
                        'corporation_name': corp.corporation_name,
                        'corporation_id': corp.corporation_id,
                        "targets": targets,
                        'corporation_ticker': corp.corporation_ticker,
                        "known_members": known_members,
                        "known_members_in_member_corps": known_members_in_member_corps
                    }
                )
    elif entity_type == "alliance":
        pass  # TODO other type of request.

    else:
        messages.error(
            request, "No Tokens found. Please add membership tokens."
        )

    return redirect('altmanager:request')


@permission_required("altmanager.can_sanction_own_corp")
def sanction_approve_corp(request, entity_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=entity_id
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
            _msg,
            actor=request.user.profile.main_character
        )

    return redirect('altmanager:sanctions')


@permission_required("altmanager.can_sanction_own_corp")
def sanction_revoke_corp(request, entity_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=entity_id
    )

    if vis.count() != 1:
        messages.error(
            request,
            "Unable to revoke corp. Do you have permission?"
        )
        return redirect('altmanager:sanctions')
    else:
        req = vis.first()
        if not req.revoked:
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
                _msg,
                actor=request.user.profile.main_character
            )
        else:
            req.remove_sanction(request.user)
            _msg = (
                f"`{req.request.target.name}` sanctioning deleted for "
                f"`{req.request.corporation.corporation_name}`"
            )

            req.notify_managers(
                _msg,
                actor=request.user.profile.main_character
            )

    return redirect('altmanager:sanctions')


@permission_required("altmanager.can_sanction_all")
def sanction_clear_revoke_corp(request, entity_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=entity_id
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
            _msg,
            actor=request.user.profile.main_character
        )

    return redirect('altmanager:manage')


@permission_required("altmanager.can_sanction_all")
def sanction_delete_corp(request, entity_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=entity_id
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
            _msg,
            actor=request.user.profile.main_character
        )
        req.delete()

    return redirect('altmanager:manage')


@permission_required("altmanager.can_sanction_all")
def approve_corp(request, entity_id=None):
    vis = AltCorpRecord.objects.visible_to(
        request.user
    ).filter(
        request__corporation__corporation_id=entity_id
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

        _msg_owner = _msg
        _msg_manager = _msg

        if req.request.target.last_step_text:
            _msg_owner = f"{_msg}\n\n{req.request.target.last_step_text}"
            _msg_manager = f"{_msg}\n\n**Message to owner:**\n{req.request.target.last_step_text}"

        messages.info(
            request,
            _msg
        )

        req.notify_owner(
            _msg_owner
        )

        req.notify_managers(
            _msg_manager,
            actor=request.user.profile.main_character
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
            "page_title": "Alt Sanctioning",
            "corporations": data
        }
    )
