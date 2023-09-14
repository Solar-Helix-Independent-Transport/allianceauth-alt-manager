from allianceauth import hooks
from allianceauth.services.hooks import MenuItemHook, UrlHook
from django.utils.translation import gettext_lazy as _

from . import app_settings, models, urls


class AltManager(MenuItemHook):
    def __init__(self):

        MenuItemHook.__init__(self,
                              app_settings.ALT_MANAGER_APP_NAME,
                              'fas fa-book-open fa-fw',
                              'altmanager:base',
                              navactive=['altmanager:base'])

    def render(self, request):
        if request.user.has_perm('altmanager.basic_access'):
            return MenuItemHook.render(self, request)
        return ''


@hooks.register('menu_item_hook')
def register_menu():
    return AltManager()


@hooks.register('url_hook')
def register_url():
    return UrlHook(urls, 'altmanager', r'^alts/')


@hooks.register('discord_cogs_hook')
def register_cogs():
    return []
