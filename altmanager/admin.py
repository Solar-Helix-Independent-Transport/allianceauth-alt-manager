from django.contrib import admin
from solo.admin import SingletonModelAdmin

from .models import (AltCorpHistory, AltCorpRecord, AltCorpTarget,
                     AltManagerConfiguration, MainInMemberCorpFilter)


@admin.register(AltManagerConfiguration)
class ConfigAdmin(SingletonModelAdmin):
    filter_horizontal = ["restricted_corps", "member_corps"]


admin.site.register(AltCorpRecord)


@admin.register(AltCorpHistory)
class AltCorpHistoryAdmin(admin.ModelAdmin):
    list_display = ["corporation_name", "owner_character_name", "target"]
    search_fields = ["corporation_name", "owner_character_name", "target__name"]
    raw_id_fields = [
        "target",
        "corporation",
        "owner",
        "sanctioner",
        "approver",
    ]


admin.site.register(AltCorpTarget)

admin.site.register(MainInMemberCorpFilter)
