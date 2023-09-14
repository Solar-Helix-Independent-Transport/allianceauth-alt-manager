from django.contrib import admin
from django.utils.html import format_html
from solo.admin import SingletonModelAdmin

from .models import (AltManagerConfiguration)


admin.site.register(AltManagerConfiguration, SingletonModelAdmin)
