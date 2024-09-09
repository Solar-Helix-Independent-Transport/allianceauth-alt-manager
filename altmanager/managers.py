import logging

from allianceauth.eveonline.models import EveCorporationInfo
from django.core.exceptions import ObjectDoesNotExist
from django.db import models

logger = logging.getLogger(__name__)


class SanctionManager(models.Manager):
    def get_queryset(self):
        return SanctionQuerySet(self.model, using=self._db)

    def visible_to(self, user):
        return self.get_queryset().visible_to(user)


class SanctionQuerySet(models.QuerySet):

    def visible_to(self, user):
        # superusers get all visible
        if user.is_superuser:
            logger.debug('Returning all sanctions for superuser %s.' % user)
            return self

        if user.has_perm('altmanager.can_sanction_all'):
            logger.debug('Returning all sanctions for %s.' % user)
            return self

        try:
            char = user.profile.main_character
            assert char
            # build all accepted queries
            queries = []
            if user.has_perm('altmanager.can_sanction_own_corp'):
                queries.append(
                    models.Q(request__corporation__corporation_id=char.corporation_id))

            logger.debug('%s queries for user %s visible chracters.' %
                         (len(queries), user))
            # filter based on queries
            if len(queries) == 0:
                return self.none()

            query = queries.pop()
            for q in queries:
                query |= q
            return self.filter(query)
        except AssertionError:
            logger.debug(
                'User %s has no main character. No sanctions visible.' % user)
            return self.none()
