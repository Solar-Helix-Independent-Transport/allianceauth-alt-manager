from unittest.mock import MagicMock

from allianceauth.tests.auth_utils import AuthUtils
from django.test import TestCase, RequestFactory

from altmanager import auth_hooks

from .base import AltManagerTestBase


class MenuItemHookRenderTest(AltManagerTestBase):
    """AltManager and AltClaim menu hook render() methods."""

    def setUp(self):
        self.factory = RequestFactory()

    def _make_request(self, user):
        request = self.factory.get("/")
        request.user = user
        return request

    def test_alt_manager_render_with_permission_returns_html(self):
        user = AuthUtils.create_user("hook_basic_user")
        AuthUtils.add_permission_to_user_by_name("altmanager.basic_access", user)
        user = user.__class__.objects.get(pk=user.pk)
        hook = auth_hooks.AltManager()
        request = self._make_request(user)
        result = hook.render(request)
        self.assertIsInstance(result, str)

    def test_alt_manager_render_without_permission_returns_empty(self):
        user = AuthUtils.create_user("hook_noperm_user")
        hook = auth_hooks.AltManager()
        request = self._make_request(user)
        result = hook.render(request)
        self.assertEqual(result, "")

    def test_alt_claim_render_with_permission_returns_html(self):
        user = AuthUtils.create_user("hook_claim_user")
        AuthUtils.add_permission_to_user_by_name("altmanager.can_request_alt_corp", user)
        user = user.__class__.objects.get(pk=user.pk)
        hook = auth_hooks.AltClaim()
        request = self._make_request(user)
        result = hook.render(request)
        self.assertIsInstance(result, str)

    def test_alt_claim_render_without_permission_returns_empty(self):
        user = AuthUtils.create_user("hook_claim_noperm")
        hook = auth_hooks.AltClaim()
        request = self._make_request(user)
        result = hook.render(request)
        self.assertEqual(result, "")


class HookFunctionTest(TestCase):
    """Direct callable tests for the registered hook functions."""

    def test_register_url_returns_url_hook(self):
        result = auth_hooks.register_url()
        self.assertIsNotNone(result)

    def test_register_menu_2_returns_alt_claim(self):
        result = auth_hooks.register_menu_2()
        self.assertIsInstance(result, auth_hooks.AltClaim)

    def test_register_cogs_returns_cog_list(self):
        result = auth_hooks.register_cogs()
        self.assertIn("altmanager.cogs.alt_manager", result)

    def test_filters_returns_filter_list(self):
        from altmanager.models import MainInMemberCorpFilter
        result = auth_hooks.filters()
        self.assertIn(MainInMemberCorpFilter, result)
