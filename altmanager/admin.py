from django.contrib import admin
from solo.admin import SingletonModelAdmin

from .models import (AltCorpHistory, AltCorpRecord, AltCorpTarget,
                     AltManagerConfiguration, MainInMemberCorpFilter)


@admin.register(AltManagerConfiguration)
class ConfigAdmin(SingletonModelAdmin):
    filter_horizontal = ["restricted_corps", "member_corps"]


admin.site.register(AltCorpRecord)
admin.site.register(AltCorpHistory)
admin.site.register(AltCorpTarget)

admin.site.register(MainInMemberCorpFilter)
