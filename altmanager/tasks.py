import logging

from django.contrib.auth.models import User
from allianceauth.authentication.models import State
from allianceauth.eveonline.models import EveCharacter
from allianceauth.services.tasks import QueueOnce
from altmanager import helpers, models
from celery import shared_task
from django.utils import timezone

logger = logging.getLogger(__name__)

VIP_STATE_NAME = helpers.VIP_STATE_NAME


def check_owner_allowed(user: User, corporation_id):
    if isinstance(user, User):
        return user.has_perm("altmanager.can_request_alt_corp")
    return False


@shared_task(bind=True, base=QueueOnce)
def add_vip(self, character_name):
    """Add a character to the VIP state."""
    c = EveCharacter.objects.get(character_name=character_name)
    s = State.objects.get(name=VIP_STATE_NAME)
    s.member_characters.add(c)


@shared_task(bind=True, base=QueueOnce)
def rem_vip(self, character_name):
    """Remove a character from the VIP state."""
    c = EveCharacter.objects.get(character_name=character_name)
    s = State.objects.get(name=VIP_STATE_NAME)
    s.member_characters.remove(c)


@shared_task(bind=True, base=QueueOnce, max_retries=None)
def check_all_alt_corps(self, for_real=False):
    """Dispatch a per-corp compliance check for every active sanction."""
    for s in helpers.get_sactionable_actions():
        check_alt_corp.delay(s['model'].pk, for_real=for_real)


@shared_task(bind=True, base=QueueOnce, max_retries=None)
def check_alt_corp(self, sanction_pk, for_real=False):
    """Check one alt corp sanction and revoke if it is no longer compliant."""
    try:
        sanc = models.AltCorpRecord.objects.select_related(
            "request",
            "request__corporation",
            "request__corporation__alliance",
            "request__owner",
            "request__owner__character_ownership__user",
            "request__target",
        ).get(pk=sanction_pk)
    except models.AltCorpRecord.DoesNotExist:
        return

    overdue = timezone.now()
    corp = sanc.request.corporation
    corp_id = corp.corporation_id
    corp_name = corp.corporation_name
    target = sanc.request.target

    fresh_corp, members = helpers.get_and_update_member_list(corp_id)

    if fresh_corp is None and members is None:
        logger.warning(f"Failing {corp_name}: no token available for member check")
        if not sanc.revoked:
            if not sanc.pending_revoke:
                if for_real:
                    sanc.revoke_pending(message="No Token Available for Sanctioning.")
            elif overdue >= sanc.pending_revoke:
                if for_real:
                    sanc.revoke(message="No Token Available for Sanctioning.")
        return

    logger.info(
        f"* Checking {corp_name} sanction to {target.name if target else '*Unknown*'}"
    )

    if not (sanc.approved and sanc.sanctioned):
        return

    mc = fresh_corp.member_count or 0
    kmc = helpers.get_known_corporation_members(corp_id).count()
    kmci = helpers.get_known_corporation_members_from_members(corp_id).count()
    anm = target.allow_non_members if target else False

    logger.info(
        f"{corp_name} - approved:{sanc.approved} sanctioned:{sanc.sanctioned} revoked:{sanc.revoked}"
    )

    if anm:
        success = kmc >= mc
        member_msg = "" if success else f"{kmc} / {mc} Members Known."
    else:
        success = kmci >= mc
        member_msg = "" if success else f"{kmci} / {mc} characters attached to Members."

    owner = None
    try:
        owner = sanc.request.owner.character_ownership.user
    except Exception:
        pass

    user_can = check_owner_allowed(owner, corp_id)

    if success and user_can:
        logger.info(f"{corp_name} all checks passed")
        sanc.clear_revoke_pending()
        return

    msg = []
    if not success:
        msg.append(f"Fix Corporation Membership, {member_msg}")
    if not user_can:
        msg.append("Owner missing permission to sanction.")
    msg = "\n".join(msg)

    logger.warning(
        f"Failing {corp_name} to {target.name if target else '*Unknown*'}"
        f" kmc={kmc} kmci={kmci} mc={mc} anm:{anm}"
        f" owner={sanc.request.owner}\n\n{msg}"
    )

    if not sanc.revoked:
        if not sanc.pending_revoke:
            if for_real:
                sanc.revoke_pending(message=msg)
                sanc.notify_owner(f"Actions:\n{msg}")
                sanc.notify_managers(f"Issues:\n{msg}")
        elif overdue >= sanc.pending_revoke:
            if for_real:
                sanc.clear_revoke_pending()
                sanc.revoke(message=msg)
                sanc.notify_owner(f"Actions:\n{msg}")
                sanc.notify_managers(f"Issues:\n{msg}")
