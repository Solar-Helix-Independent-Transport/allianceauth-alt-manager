import logging

# from allianceauth.authentication.models import (CharacterOwnership, State,
#                                                 UserProfile)
# from allianceauth.eveonline.evelinks import dotlan, eveimageserver, zkillboard
from allianceauth.eveonline.models import EveCharacter, EveCorporationInfo
# from allianceauth.notifications import notify
# from django.contrib.auth.models import User
from django.db import models
# from django.utils import timezone
from solo.models import SingletonModel

logger = logging.getLogger(__name__)


class AltManagerConfiguration(SingletonModel):

    restricted_corps = models.ManyToManyField(EveCorporationInfo)

    member_corps = models.ManyToManyField(EveCorporationInfo, related_name="member_corp")

    days_before_revoke = models.IntegerField(
        default=5,
        help_text="How many days of grace to give before revoking approvals"
    )

    class Meta:
        verbose_name = "Auth Reports Configuration"
        permissions = (
            # Basic Alt Manager
            ('basic_access', 'Can access alt manager module'),
            ('restricted_corps', 'Can access restricted corps.'),
            ('su_access', 'Can access ALL corps.'),

            # Alt corp requests
            # can requests
            ('can_request_alt_corp', 'Can send alt corp requests'),

            # Can sanction the request
            ('can_sanction_own_corp', 'Can sanction requests from members in own corp'),
            ('can_sanction_all', 'Can sanction all requests'),

            # Can action requests
            ('can_manage_alt_corp', 'Can manage alt corp requests'),

            # can see the current requests
            ('can_view_active_requests', 'Can view all active/current alt corp owners'),
            # can see all requests
            ('can_view_all_requests', 'Can view all alt corp owners'),
        )

        default_permissions = []


class AltCorpRecord(models.Model):

    request_date = models.DateTimeField(auto_created=True)

    corporation = models.ForeignKey(
        EveCorporationInfo,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        default=None,
    )

    corporation_name = models.CharField(
        max_length=250
    )

    owner = models.ForeignKey(
        EveCharacter,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        default=None,
        help_text="The owner character model",
        related_name="alt_owner"
    )

    owner_character_name = models.CharField(
        max_length=250,
        help_text="The owner character name at time of claim"
    )

    owner_corporation_name = models.CharField(
        max_length=250,
        help_text="The owners corporation name at time of claim"
    )

    sanctioned = models.BooleanField(default=False)

    sanctioner = models.ForeignKey(
        EveCharacter,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        default=None,
        help_text="The owner character model",
        related_name="alt_sanctioner"

    )

    sanctioner_character_name = models.CharField(
        max_length=250,
        help_text="The sanctioning character name at time of sanction"
    )

    sanctioner_corporation_name = models.CharField(
        max_length=250,
        help_text="The sanctioning characters corporation name at time of sanction"
    )

    approved = models.BooleanField(default=False)

    approver = models.ForeignKey(
        EveCharacter,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        default=None,
        help_text="The approver model",
        related_name="alt_approver"
    )

    approver_character_name = models.CharField(
        max_length=250,
        help_text="The approving character name at time of sanction"
    )

    approver_corporation_name = models.CharField(
        max_length=250,
        help_text="The approving characters corporation name at time of sanction"
    )

    pending_revoke = models.DateTimeField(default=None, blank=True, null=True)

    revoked = models.BooleanField(default=False)

    revoked_reason = models.TextField(
        help_text="The revoke/pending revoke reason"
    )

    class Meta:
        default_permissions = []
