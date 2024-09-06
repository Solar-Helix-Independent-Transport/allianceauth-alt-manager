import logging

from allianceauth.eveonline.evelinks import dotlan, evewho, zkillboard
# from allianceauth.authentication.models import (CharacterOwnership, State,
#                                                 UserProfile)
# from allianceauth.eveonline.evelinks import dotlan, eveimageserver, zkillboard
from allianceauth.eveonline.models import EveCharacter, EveCorporationInfo
# from allianceauth.notifications import notify
# from django.contrib.auth.models import User
from django.db import models
# from django.utils import timezone
from solo.models import SingletonModel

from .managers import SanctionManager

logger = logging.getLogger(__name__)

RED = 16711680
GREEN = 1244928
BLUE = 41727


def send_discord_message(user_pk=None, channel_id=None, embed=None):
    try:
        from aadiscordbot.tasks import send_message
        from discord import Embed
        e = Embed.from_dict(embed)
        if user_pk:
            send_message(user_pk=user_pk, embed=e)
        if channel_id:
            send_message(channel_id=channel_id, embed=e)
    except ImportError:
        pass


class AltManagerConfiguration(SingletonModel):

    restricted_corps = models.ManyToManyField(
        EveCorporationInfo,
        blank=True,
    )

    member_corps = models.ManyToManyField(
        EveCorporationInfo,
        blank=True,
        related_name="member_corp"
    )

    days_before_revoke = models.IntegerField(
        default=5,
        help_text="How many days of grace to give before revoking approvals"
    )

    management_channel_id = models.BigIntegerField(
        default=0,
        help_text="Discord Channel ID to send manager notifications to."
    )

    class Meta:
        verbose_name = "Alt Manager Configuration"
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

    @classmethod
    def get_member_corporation_ids(cls):
        return set(
            list(
                cls.get_solo().member_corps.all(
                ).values_list(
                    "corporation_id",
                    flat=True
                )
            )
        )


class AltCorpTarget(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(default=None, null=True, blank=True)

    def __str__(self):
        return f"Target: {self.name}"

    class Meta:
        default_permissions = []


class AltCorpRecord(models.Model):

    objects = SanctionManager()

    request_date = models.DateTimeField(auto_created=True)

    actual_members = models.IntegerField(
        default=None,
        blank=True,
        null=True,
        help_text="Member count as detected via member endpoint."
    )

    sanctioned = models.BooleanField(default=False)

    approved = models.BooleanField(default=False)

    pending_revoke = models.DateTimeField(default=None, blank=True, null=True)

    revoked = models.BooleanField(default=False)

    revoked_reason = models.TextField(
        blank=True,
        null=True,
        default=None,
        help_text="The revoke/pending revoke reason"
    )

    def still_valid(self):
        pass

    def notify_owner(self, message):
        embed = {
            "title": f"Alt Manager Update - {self.request.corporation.corporation_name}",
            "description": (
                f"{message}\n\n**Corp:**\n"
                f"[DotLan]({dotlan.corporation_url(self.request.corporation.corporation_name)})\n"
                f"[zKill]({zkillboard.corporation_url(self.request.corporation.corporation_id)})\n"
                f"[EvE Who]({evewho.corporation_url(self.request.corporation.corporation_id)})\n\n"
            ),
            "color": RED,
            "thumbnail": {
                "url": (
                    "https://images.evetech.net/corporations/"
                    f"{self.request.corporation.corporation_id}/logo"
                )
            }
        }

        if not self.revoked:
            if self.approved:
                embed["color"] = GREEN
            else:
                embed["color"] = BLUE
        else:
            embed["color"] = RED

        send_discord_message(user_pk=self.request.owner.character_ownership.user_id, embed=embed)

    def notify_managers(self, message):

        embed = {
            "title": f"Alt Management Update - {self.request.corporation.corporation_name}",
            "description": (
                f"{message}\n\n**Corp:**\n"
                f"[DotLan]({dotlan.corporation_url(self.request.corporation_name)})\n"
                f"[zKill]({zkillboard.corporation_url(self.request.corporation.corporation_id)})\n"
                f"[EvE Who]({evewho.corporation_url(self.request.corporation.corporation_id)})\n\n"
                f"**Owner: {self.request.owner.character_name}**\n"
                f"[Zkill]({zkillboard.character_url(self.request.owner.character_id)})\n"
                f"[EvE Who]({evewho.character_url(self.request.owner.character_id)})\n"
            ),
            "color": RED,
            "thumbnail": {
                "url": (
                    "https://images.evetech.net/corporations/"
                    f"{self.request.corporation.corporation_id}/logo"
                )
            },
        }

        if not self.revoked:
            if self.approved:
                embed["color"] = GREEN
            else:
                embed["color"] = BLUE
        else:
            embed["color"] = RED

        chid = AltManagerConfiguration.get_solo().management_channel_id
        send_discord_message(channel_id=chid, embed=embed)

    def approve(self, approver=None, sanctioner=None):
        if not approver and not sanctioner:
            return False

        if approver:
            self.approved = True
            self.request.approver = approver
            self.request.approver_character_name = approver.character_name
            self.request.approver_corporation_name = approver.corporation_name
            self.request.save()
            self.save()

        if sanctioner:
            self.sanctioned = True
            self.request.sanctioner = sanctioner
            self.request.sanctioner_character_name = sanctioner.character_name
            self.request.sanctioner_corporation_name = sanctioner.corporation_name
            self.request.save()
            self.save()

    def revoke(self, user=None, message=""):
        usr = "Admin"
        if user:
            usr = user.profile.main_character.character_name

        self.revoked_reason = f"Revoked by {usr} {message}"
        self.revoked = True
        self.sanctioned = False
        self.save()

    def clear_revoke(self):
        self.revoked_reason = None
        self.revoked = False
        self.sanctioned = True
        self.save()

    def __str__(self):
        try:
            return (
                f"{self.request_date} - "
                f"{self.request.corporation_name} - "
                f"{self.request.owner_character_name}"
            )
        except Exception:
            return f"{self.id} - {self.request_date}"

    class Meta:
        default_permissions = []


class AltCorpHistory(models.Model):

    request = models.OneToOneField(
        AltCorpRecord,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        default=True,
        related_name="request"
    )

    target = models.ForeignKey(
        AltCorpTarget,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        default=None
    )

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
        blank=True,
        null=True,
        default=None,
        help_text="The owner character name at time of claim"
    )

    owner_corporation_name = models.CharField(
        max_length=250,
        blank=True,
        null=True,
        default=None,
        help_text="The owners corporation name at time of claim"
    )

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
        blank=True,
        null=True,
        default=None,
        help_text="The sanctioning character name at time of sanction"
    )

    sanctioner_corporation_name = models.CharField(
        max_length=250,
        blank=True,
        null=True,
        default=None,
        help_text="The sanctioning characters corporation name at time of sanction"
    )

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
        blank=True,
        null=True,
        default=None,
        help_text="The approving character name at time of sanction"
    )

    approver_corporation_name = models.CharField(
        max_length=250,
        blank=True,
        null=True,
        default=None,
        help_text="The approving characters corporation name at time of sanction"
    )

    def __str__(self):
        try:
            return f"{self.request_date} - {self.corporation_name} - {self.owner_character_name}"
        except Exception:
            return f"{self.id} - {self.request_date}"

    class Meta:
        default_permissions = []
