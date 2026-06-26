from unittest.mock import patch, MagicMock

from allianceauth.tests.auth_utils import AuthUtils
from django.test import TestCase
from django.urls import reverse

from .base import AltManagerTestBase


LOGIN_REDIRECT = "/account/login/"


def _add_perm(user, perm):
    AuthUtils.add_permission_to_user_by_name(perm, user)
    return user.__class__.objects.get(pk=user.pk)


class UnauthenticatedViewTest(TestCase):
    """Every view redirects unauthenticated users to login."""

    def _assert_redirects_to_login(self, url):
        resp = self.client.get(url)
        self.assertIn(resp.status_code, [302, 301], msg=f"{url} should redirect")
        self.assertIn(LOGIN_REDIRECT, resp["Location"])

    def test_base_redirects(self):
        self._assert_redirects_to_login(reverse("altmanager:base"))

    def test_report_redirects(self):
        self._assert_redirects_to_login(reverse("altmanager:report", kwargs={"cid": 1}))

    def test_request_redirects(self):
        self._assert_redirects_to_login(reverse("altmanager:request"))

    def test_sanctions_redirects(self):
        self._assert_redirects_to_login(reverse("altmanager:sanctions"))

    def test_manage_redirects(self):
        self._assert_redirects_to_login(reverse("altmanager:manage"))

    def test_detail_redirects(self):
        self._assert_redirects_to_login(reverse("altmanager:detail", kwargs={"entity_id": 1}))

    def test_sanctions_approve_redirects(self):
        self._assert_redirects_to_login(
            reverse("altmanager:sanctions_approve", kwargs={"entity_id": 1})
        )

    def test_sanctions_revoke_redirects(self):
        self._assert_redirects_to_login(
            reverse("altmanager:sanctions_revoke", kwargs={"entity_id": 1})
        )

    def test_revoke_clear_redirects(self):
        self._assert_redirects_to_login(
            reverse("altmanager:revoke_clear", kwargs={"entity_id": 1})
        )

    def test_final_approve_redirects(self):
        self._assert_redirects_to_login(
            reverse("altmanager:final_approve", kwargs={"entity_id": 1})
        )

    def test_sanctions_delete_redirects(self):
        self._assert_redirects_to_login(
            reverse("altmanager:sanctions_delete", kwargs={"entity_id": 1})
        )


class NoPermViewTest(AltManagerTestBase):
    """Users without permissions are redirected away from protected views."""

    def setUp(self):
        self.user = AuthUtils.create_user("no_perm_user")
        self.client.force_login(self.user)

    def _assert_redirected(self, url):
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 302, msg=f"{url} should redirect without perm")

    def test_base_denied(self):
        self._assert_redirected(reverse("altmanager:base"))

    def test_report_denied(self):
        self._assert_redirected(reverse("altmanager:report", kwargs={"cid": 1}))

    def test_request_denied(self):
        self._assert_redirected(reverse("altmanager:request"))

    def test_sanctions_denied(self):
        self._assert_redirected(reverse("altmanager:sanctions"))

    def test_manage_denied(self):
        self._assert_redirected(reverse("altmanager:manage"))

    def test_detail_denied(self):
        self._assert_redirected(reverse("altmanager:detail", kwargs={"entity_id": 1}))


class BasicAccessViewTest(AltManagerTestBase):
    """Users with basic_access can reach the React shell views."""

    def setUp(self):
        self.user = _add_perm(AuthUtils.create_user("basic_user"), "altmanager.basic_access")
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    def test_react_redirect_redirects_to_corp(self):
        resp = self.client.get(reverse("altmanager:base"))
        self.assertEqual(resp.status_code, 302)

    def test_react_main_returns_200(self):
        resp = self.client.get(reverse("altmanager:report", kwargs={"cid": 1}))
        self.assertEqual(resp.status_code, 200)


class RequestViewTest(AltManagerTestBase):
    """Users with can_request_alt_corp can reach the request page."""

    def setUp(self):
        self.user = _add_perm(
            AuthUtils.create_user("request_user"), "altmanager.can_request_alt_corp"
        )
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    @patch("altmanager.views.get_sanctionable_corps")
    def test_request_main_returns_200(self, mock_corps):
        mock_corps.return_value = []
        resp = self.client.get(reverse("altmanager:request"))
        self.assertEqual(resp.status_code, 200)


class SanctionViewTest(AltManagerTestBase):
    """Users with can_sanction_own_corp can reach the sanctions page."""

    def setUp(self):
        self.user = _add_perm(
            AuthUtils.create_user("sanction_user"), "altmanager.can_sanction_own_corp"
        )
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    def test_sanctions_page_returns_200(self):
        resp = self.client.get(reverse("altmanager:sanctions"))
        self.assertEqual(resp.status_code, 200)

    def test_sanction_approve_unknown_corp_redirects(self):
        resp = self.client.get(
            reverse("altmanager:sanctions_approve", kwargs={"entity_id": 99999})
        )
        self.assertRedirects(resp, reverse("altmanager:sanctions"))

    def test_sanction_revoke_unknown_corp_redirects(self):
        resp = self.client.get(
            reverse("altmanager:sanctions_revoke", kwargs={"entity_id": 99999})
        )
        self.assertRedirects(resp, reverse("altmanager:sanctions"))

    def test_sanction_approve_valid_corp_redirects(self):
        record = self.make_sanction()
        resp = self.client.get(
            reverse(
                "altmanager:sanctions_approve",
                kwargs={"entity_id": self.alt_corp.corporation_id},
            )
        )
        self.assertRedirects(resp, reverse("altmanager:sanctions"))

    def test_sanction_revoke_valid_corp_redirects(self):
        record = self.make_sanction(approved=True, sanctioned=True)
        resp = self.client.get(
            reverse(
                "altmanager:sanctions_revoke",
                kwargs={"entity_id": self.alt_corp.corporation_id},
            )
        )
        self.assertRedirects(resp, reverse("altmanager:sanctions"))


class ManageViewTest(AltManagerTestBase):
    """Users with can_sanction_all can reach the manage page and use admin actions."""

    def setUp(self):
        self.user = _add_perm(
            AuthUtils.create_user("manage_user"), "altmanager.can_sanction_all"
        )
        self.user.profile.main_character = self.sanctioner_char
        self.user.profile.save()
        self.client.force_login(self.user)

    def test_manage_page_returns_200(self):
        resp = self.client.get(reverse("altmanager:manage"))
        self.assertEqual(resp.status_code, 200)

    def test_final_approve_unknown_corp_redirects(self):
        resp = self.client.get(
            reverse("altmanager:final_approve", kwargs={"entity_id": 99999})
        )
        self.assertRedirects(resp, reverse("altmanager:manage"))

    def test_revoke_clear_unknown_corp_redirects(self):
        resp = self.client.get(
            reverse("altmanager:revoke_clear", kwargs={"entity_id": 99999})
        )
        self.assertRedirects(resp, reverse("altmanager:manage"))

    def test_sanctions_delete_unknown_corp_redirects(self):
        resp = self.client.get(
            reverse("altmanager:sanctions_delete", kwargs={"entity_id": 99999})
        )
        self.assertRedirects(resp, reverse("altmanager:manage"))

    def test_final_approve_valid_corp_redirects(self):
        self.make_sanction()
        resp = self.client.get(
            reverse(
                "altmanager:final_approve",
                kwargs={"entity_id": self.alt_corp.corporation_id},
            )
        )
        self.assertRedirects(resp, reverse("altmanager:manage"))

    def test_sanctions_delete_valid_corp_redirects(self):
        self.make_sanction()
        resp = self.client.get(
            reverse(
                "altmanager:sanctions_delete",
                kwargs={"entity_id": self.alt_corp.corporation_id},
            )
        )
        self.assertRedirects(resp, reverse("altmanager:manage"))

    def test_revoke_clear_valid_corp_redirects(self):
        record = self.make_sanction(revoked=True)
        resp = self.client.get(
            reverse(
                "altmanager:revoke_clear",
                kwargs={"entity_id": self.alt_corp.corporation_id},
            )
        )
        self.assertRedirects(resp, reverse("altmanager:manage"))
