from django.contrib import admin
from solo.admin import SingletonModelAdmin

from .models import AltCorpHistory, AltCorpRecord, AltManagerConfiguration

admin.site.register(AltManagerConfiguration, SingletonModelAdmin)

admin.site.register(AltCorpRecord)
admin.site.register(AltCorpHistory)
