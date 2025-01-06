import logging
from datetime import timedelta

from django.contrib.auth.models import User
from allianceauth.services.tasks import QueueOnce
from altmanager import helpers, models
from celery import shared_task
from django.utils import timezone

TZ_STRING = "%Y-%m-%dT%H:%M:%SZ"

logger = logging.getLogger(__name__)

def check_owner_allowed(user: User, corporation_id):
    if isinstance(user, User):
        return user.has_perm(
            "altmanager.can_request_alt_corp"
        )
    else:
        return False

@shared_task(bind=True, base=QueueOnce, max_retries=None)
def check_all_alt_corps(self, for_real=False):
    """
        Check all alt corps and revoke if needed
    """
    all_sactions = helpers.get_sactionable_actions()
    overdue = timezone.now()

    for s in all_sactions:
        corp, members = helpers.get_and_update_member_list(s.get('corporation_id'))
        mc = s.get('member_count', 0)
        kmc = s.get('known_member_count', 0)
        kmci = s.get('known_members_in_member_corps', 0)
        approved = s.get('approved', False)
        sanctioned = s.get('sanctioned', False)
        revoked = s.get('revoked', False)

        if corp is None and members is None:
            # no token revoke!
            logging.warning(
                (
                    f"Failing {s.get('corporation_name')} Sanction:{s.get('model')} sanction no tokens for member count {s}"
                )
            )
            if not revoked:
                sanc = s.get('model')
                if not sanc.pending_revoke:
                    if for_real:
                        sanc.revoke_pending(message="No Token Avaialble for Sanctioning.")
                elif overdue >= sanc.pending_revoke:
                    if for_real:
                        sanc.revoke(message="No Token Avaialble for Sanctioning.")

        target = s.get("target", False)

        logging.info(f"* Checking {s.get('corporation_name')} sanction to {target.name if target else '*Unknown*'} {s}")
        
        anm = False

        if target:
            anm = target.allow_non_members


        if approved == True and sanctioned == True:
            logging.info(
                (
                    f"{s.get('corporation_name')} - approved:{approved} - "
                    f"sanctioned:{sanctioned} - revoked:{revoked}"
                )
            )
            success = False
            member_msg = ""
            if anm:
                # allow non members so just make sure all are registered
                if kmc >= mc:
                    success=True
                else:
                    member_msg = f"{kmc} / {mc} Members Known."
            else:
                if kmci >= mc:
                    success=True
                else:
                    member_msg = f"{kmci} / {mc} characters attached to Members."

            owner = None
            try:
                owner = s.get('owner').character_ownership.user
            except:
                pass

            user_can = check_owner_allowed(
                owner,
                s.get('corporation_id')
            )

            if success and user_can:
                logging.info(
                    (
                        f"{s.get('corporation_name')} permissions:{user_can}"
                    )
                )
                s.get('model').clear_revoke_pending()
            else:
                msg = []
                if not success:
                    msg.append(f"Fix Corporation Membership, {member_msg}")
                if not user_can:
                    msg.append(f"Owner missing permission to sanction.")
                msg = "\n".join(msg)

                logging.warning(
                    (
                        f"Failing {s.get('corporation_name')} permissions:{user_can} Sanction:{s.get('model')} "
                        f"to {target.name if target else '*Unknown*'}"
                        f" kmc={kmc} kmci={kmci} mc={mc} anm:{anm}"
                        f" owner={s.get('owner')} \n\n {msg}"
                    )
                )

                if not revoked:
                    sanc = s.get('model')
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
