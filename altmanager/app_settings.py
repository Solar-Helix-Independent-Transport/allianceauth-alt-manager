from django.conf import settings

ALT_MANAGER_APP_NAME = getattr(settings, "ALT_MANAGER_APP_NAME", "Alt Manager")
ALT_MANAGER_BASIC = getattr(settings, "ALT_MANAGER_BASIC", False)
