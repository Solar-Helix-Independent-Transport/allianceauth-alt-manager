from unittest.mock import MagicMock, patch

from allianceauth.eveonline.models import EveAllianceInfo, EveCharacter, EveCorporationInfo
from esi.models import Token

from altmanager.helpers import get_and_update_member_list

from .base import AltManagerTestBase


class GetAndUpdateMemberListTest(AltManagerTestBase):

    @patch("altmanager.helpers.esi")
    def test_no_tokens_returns_none_pair(self, mock_esi):
        corp_detail = MagicMock()
        corp_detail.alliance_id = None
        mock_esi.client.Corporation.GetCorporationsCorporationId.return_value.result.return_value = (
            corp_detail
        )
        corp, members = get_and_update_member_list(self.alt_corp.corporation_id)
        self.assertIsNone(corp)
        self.assertIsNone(members)

    @patch("altmanager.helpers.esi")
    def test_with_valid_token_returns_corp_and_members(self, mock_esi):
        corp_detail = MagicMock()
        corp_detail.alliance_id = None
        mock_esi.client.Corporation.GetCorporationsCorporationId.return_value.result.return_value = (
            corp_detail
        )
        mock_esi.client.Corporation.GetCorporationsCorporationIdMembers.return_value.result.return_value = [
            1001, 1002
        ]

        token = MagicMock(spec=Token)
        token.character_id = self.owner_char.character_id

        with patch(
            "altmanager.helpers.Token.objects.filter"
        ) as mock_filter, patch(
            "altmanager.helpers.EveCharacter.objects.get_character_by_id",
            return_value=self.owner_char,
        ):
            mock_qs = MagicMock()
            mock_qs.filter.return_value = mock_qs
            mock_qs.require_scopes.return_value = mock_qs
            mock_qs.exists.return_value = True
            mock_qs.first.return_value = token
            mock_filter.return_value = mock_qs

            corp, members = get_and_update_member_list(self.alt_corp.corporation_id)

        self.assertIsNotNone(corp)
        self.assertEqual(members, [1001, 1002])

    @patch("altmanager.helpers.esi")
    def test_user_filter_narrows_tokens(self, mock_esi):
        # When user is passed, tokens.filter(user=user) is called (line 98)
        corp_detail = MagicMock()
        corp_detail.alliance_id = None
        mock_esi.client.Corporation.GetCorporationsCorporationId.return_value.result.return_value = (
            corp_detail
        )

        with patch(
            "altmanager.helpers.Token.objects.filter"
        ) as mock_filter:
            mock_qs = MagicMock()
            # The chained .filter(user=user) returns the same mock
            mock_qs.filter.return_value = mock_qs
            mock_qs.require_scopes.return_value = mock_qs
            mock_qs.exists.return_value = False
            mock_filter.return_value = mock_qs

            get_and_update_member_list(
                self.alt_corp.corporation_id, user=self.owner_user
            )

        # The second .filter(user=...) call should have happened
        mock_qs.filter.assert_called_with(user=self.owner_user)

    @patch("altmanager.helpers.esi")
    def test_alliance_id_triggers_alliance_update(self, mock_esi):
        corp_detail = MagicMock()
        corp_detail.alliance_id = 99000001
        mock_esi.client.Corporation.GetCorporationsCorporationId.return_value.result.return_value = (
            corp_detail
        )

        with patch(
            "altmanager.helpers.EveAllianceInfo.objects.get",
            side_effect=EveAllianceInfo.DoesNotExist,
        ), patch(
            "altmanager.helpers.EveAllianceInfo.objects.create_alliance"
        ) as mock_create_alliance, patch(
            "altmanager.helpers.EveCorporationInfo.objects.get"
        ), patch(
            "altmanager.helpers.Token.objects.filter"
        ) as mock_filter:
            mock_qs = MagicMock()
            mock_qs.filter.return_value = mock_qs
            mock_qs.require_scopes.return_value = mock_qs
            mock_qs.exists.return_value = False
            mock_filter.return_value = mock_qs

            get_and_update_member_list(self.alt_corp.corporation_id)

        mock_create_alliance.assert_called_once_with(99000001)
