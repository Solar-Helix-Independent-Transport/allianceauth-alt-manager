import datetime
import json
import logging
import os
from collections import defaultdict

from allianceauth.authentication.models import (CharacterOwnership, State,
                                                UserProfile)
from allianceauth.eveonline.evelinks import dotlan, eveimageserver, zkillboard
from allianceauth.eveonline.models import (EveAllianceInfo, EveCharacter,
                                           EveCorporationInfo)
from allianceauth.notifications import notify
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils import timezone
from solo.models import SingletonModel

logger = logging.getLogger(__name__)


class AltManagerConfiguration(SingletonModel):

    restricted_corps = models.ManyToManyField(EveCorporationInfo)

    class Meta:
        verbose_name = "Auth Reports Configuration"
        permissions = (
            ('basic_access',
             'Can access alt manager module'),
            ('restricted_corps',
             'Can access restricted corps.'),
            ('su_access',
             'Can access ALL corps.'),
        )

        default_permissions = []
