from unittest.mock import MagicMock, patch

from allianceauth.authentication.models import CharacterOwnership
from allianceauth.eveonline.models import EveCharacter
from allianceauth.tests.auth_utils import AuthUtils
from esi.errors import TokenError
from esi.models import Token

from altmanager.providers import get_corp_token

from .base import AltManagerTestBase


class GetCorpTokenTest(AltManagerTestBase):
    """Tests for providers.get_corp_token."""

    def test_no_tokens_returns_none(self):
        # No tokens in DB → tokens.first() is None
        result = get_corp_token(
            corp_id=self.alt_corp.corporation_id,
            scopes=["esi-corporations.read_corporation_membership.v1"],
        )
        self.assertIsNone(result)

    def test_no_tokens_with_req_roles_returns_false(self):
        result = get_corp_token(
            corp_id=self.alt_corp.corporation_id,
            scopes=["esi-corporations.read_corporation_membership.v1"],
            req_roles=["Director"],
        )
        self.assertFalse(result)

    @patch("altmanager.providers.esi")
    def test_with_req_roles_token_error_logs_and_continues(self, mock_esi):
        token = MagicMock(spec=Token)
        token.character_id = self.owner_char.character_id
        token.pk = 42

        mock_esi.client.Character.GetCharactersCharacterIdRoles.return_value.result.side_effect = (
            TokenError("expired")
        )

        with patch(
            "altmanager.providers.Token.objects.filter"
        ) as mock_filter:
            mock_qs = MagicMock()
            mock_qs.require_scopes.return_value = [token]
            mock_filter.return_value = mock_qs

            result = get_corp_token(
                corp_id=self.alt_corp.corporation_id,
                scopes=["esi-corporations.read_corporation_membership.v1"],
                req_roles=["Director"],
            )

        self.assertFalse(result)

    @patch("altmanager.providers.esi")
    def test_with_req_roles_matching_role_returns_token(self, mock_esi):
        token = MagicMock(spec=Token)
        token.character_id = self.owner_char.character_id

        roles_result = MagicMock()
        roles_result.roles = ["Director", "Personnel_Manager"]
        mock_esi.client.Character.GetCharactersCharacterIdRoles.return_value.result.return_value = (
            roles_result
        )

        with patch(
            "altmanager.providers.Token.objects.filter"
        ) as mock_filter:
            mock_qs = MagicMock()
            mock_qs.require_scopes.return_value = [token]
            mock_filter.return_value = mock_qs

            result = get_corp_token(
                corp_id=self.alt_corp.corporation_id,
                scopes=["esi-corporations.read_corporation_membership.v1"],
                req_roles=["Director"],
            )

        self.assertEqual(result, token)

    @patch("altmanager.providers.esi")
    def test_with_req_roles_no_matching_role_returns_false(self, mock_esi):
        token = MagicMock(spec=Token)
        token.character_id = self.owner_char.character_id

        roles_result = MagicMock()
        roles_result.roles = ["Accountant"]
        mock_esi.client.Character.GetCharactersCharacterIdRoles.return_value.result.return_value = (
            roles_result
        )

        with patch(
            "altmanager.providers.Token.objects.filter"
        ) as mock_filter:
            mock_qs = MagicMock()
            mock_qs.require_scopes.return_value = [token]
            mock_filter.return_value = mock_qs

            result = get_corp_token(
                corp_id=self.alt_corp.corporation_id,
                scopes=["esi-corporations.read_corporation_membership.v1"],
                req_roles=["Director"],
            )

        self.assertFalse(result)

    @patch("altmanager.providers.esi")
    def test_with_req_roles_empty_roles_skips_loop(self, mock_esi):
        # roles.roles is empty → line 52 condition False → 52->57 branch taken
        token = MagicMock(spec=Token)
        token.character_id = self.owner_char.character_id
        roles_result = MagicMock()
        roles_result.roles = []
        mock_esi.client.Character.GetCharactersCharacterIdRoles.return_value.result.return_value = (
            roles_result
        )
        with patch("altmanager.providers.Token.objects.filter") as mock_filter:
            mock_qs = MagicMock()
            mock_qs.require_scopes.return_value = [token]
            mock_filter.return_value = mock_qs
            result = get_corp_token(
                corp_id=self.alt_corp.corporation_id,
                scopes=["esi-corporations.read_corporation_membership.v1"],
                req_roles=["Director"],
            )
        self.assertFalse(result)

    @patch("altmanager.providers.esi")
    def test_req_roles_appends_roles_scope_if_missing(self, mock_esi):
        scopes = ["esi-corporations.read_corporation_membership.v1"]
        with patch(
            "altmanager.providers.Token.objects.filter"
        ) as mock_filter:
            mock_qs = MagicMock()
            mock_qs.require_scopes.return_value = []
            mock_filter.return_value = mock_qs

            get_corp_token(
                corp_id=self.alt_corp.corporation_id,
                scopes=scopes,
                req_roles=["Director"],
            )

        self.assertIn("esi-characters.read_corporation_roles.v1", scopes)
