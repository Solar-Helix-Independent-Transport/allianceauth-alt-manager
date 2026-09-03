from unittest.mock import MagicMock, patch

from allianceauth.authentication.models import State
from allianceauth.eveonline.models import EveAllianceInfo, EveCharacter, EveCorporationInfo
from esi.models import Token

from altmanager.helpers import (
    VIP_STATE_NAME,
    get_and_update_member_list,
    get_known_corporation_members,
    get_known_corporation_members_from_members,
)

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


class VipExemptFromAuthCheckTest(AltManagerTestBase):
    """
    Characters holding the VIP state should count as "known"/compliant in
    corp membership checks even when they have no CharacterOwnership.
    """

    def setUp(self):
        next_priority = (
            State.objects.order_by("-priority").values_list(
                "priority", flat=True
            ).first() or 0
        ) + 1
        self.vip_state = State.objects.create(
            name=VIP_STATE_NAME, priority=next_priority
        )

        self.unauthed_char = EveCharacter.objects.create(
            character_id=5001,
            character_name="Unauthed VIP",
            corporation_id=self.alt_corp.corporation_id,
            corporation_name=self.alt_corp.corporation_name,
            corporation_ticker=self.alt_corp.corporation_ticker,
        )

        self.plain_unauthed_char = EveCharacter.objects.create(
            character_id=5002,
            character_name="Plain Unauthed",
            corporation_id=self.alt_corp.corporation_id,
            corporation_name=self.alt_corp.corporation_name,
            corporation_ticker=self.alt_corp.corporation_ticker,
        )

    def test_unauthed_non_vip_character_not_known(self):
        members = get_known_corporation_members(self.alt_corp.corporation_id)
        self.assertNotIn(self.plain_unauthed_char, members)

    def test_unauthed_vip_character_counts_as_known(self):
        self.vip_state.member_characters.add(self.unauthed_char)

        members = get_known_corporation_members(self.alt_corp.corporation_id)
        self.assertIn(self.unauthed_char, members)

        members_from_members = get_known_corporation_members_from_members(
            self.alt_corp.corporation_id
        )
        self.assertIn(self.unauthed_char, members_from_members)

    def test_removing_vip_state_drops_exemption(self):
        self.vip_state.member_characters.add(self.unauthed_char)
        self.vip_state.member_characters.remove(self.unauthed_char)

        members = get_known_corporation_members(self.alt_corp.corporation_id)
        self.assertNotIn(self.unauthed_char, members)
