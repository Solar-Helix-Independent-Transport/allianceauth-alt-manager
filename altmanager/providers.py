import logging

from allianceauth.eveonline.models import EveCharacter
from esi.clients import EsiClientProvider
from esi.errors import TokenError
from esi.models import Token

logger = logging.getLogger(__name__)


esi = EsiClientProvider()


def get_corp_token(corp_id, scopes, req_roles=None):
    """
    Helper method to get a token for a specific character from a specific corp with specific scopes
    :param corp_id: Corp to filter on.
    :param scopes: array of ESI scope strings to search for.
    :param req_roles: roles required on the character.
    :return: :class:esi.models.Token or False
    """
    if 'esi-characters.read_corporation_roles.v1' not in scopes and req_roles:
        scopes.append("esi-characters.read_corporation_roles.v1")

    char_ids = EveCharacter.objects.filter(
        corporation_id=corp_id).values('character_id')
    tokens = Token.objects \
        .filter(character_id__in=char_ids) \
        .require_scopes(scopes)
    if req_roles:
        for token in tokens:
            try:
                roles = esi.client.Character.get_characters_character_id_roles(
                    character_id=token.character_id,
                    token=token.valid_access_token()
                ).result()
                has_roles = False
                for role in roles.get('roles', []):
                    if role in req_roles:
                        has_roles = True

                if has_roles:
                    return token
                else:
                    pass  # TODO Maybe remove token?
            except TokenError as e:
                logger.error(f"Token ID: {token.pk} ({e})")
    else:
        return tokens.first()
    return False
