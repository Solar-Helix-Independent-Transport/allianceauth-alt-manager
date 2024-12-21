import logging

from aadiscordbot import app_settings
from aadiscordbot.app_settings import get_all_servers
from aadiscordbot.cogs.utils.decorators import has_any_perm
from aadiscordbot.utils.auth import get_auth_user
from allianceauth.eveonline.models import EveCharacter, EveCorporationInfo
from discord import AutocompleteContext, SlashCommandGroup, option
from discord.embeds import Embed
from discord.ext import commands
from discord.ext.commands import Paginator

from django.db.models import Q
from django.db.models.functions import Length

from allianceauth.services.modules.discord.models import DiscordUser

from altmanager.models import AltManagerConfiguration
from altmanager import helpers

logger = logging.getLogger(__name__)


class AltMan(commands.Cog):
    """
    Alt Manager Toolbox commads to help the diplos.
    """

    def __init__(self, bot):
        self.bot = bot


    alt_commands = SlashCommandGroup(
        "alt_manager",
        "Alt Manager Commands",
        guild_ids=app_settings.get_all_servers()
    )


    @alt_commands.command(name='members', guild_ids=app_settings.get_all_servers())
    async def list_member_corps(self, ctx):
        out_text = Paginator()
        await ctx.defer(ephemeral=False)
        for c in AltManagerConfiguration.get_solo().member_corps.all().order_by("corporation_name"):
            out_text.add_line(c.corporation_name)
        
        for _str in out_text.pages:
            await ctx.send(_str)
        
        await ctx.respond("Current Corporation Listed as Member!", ephemeral=False)

    async def search_corps_on_characters(ctx: AutocompleteContext):
        """Returns a list of corporations that begin with the characters entered so far."""
        return list(EveCorporationInfo.objects.filter(corporation_name__icontains=ctx.value).values_list('corporation_name', flat=True).distinct()[:10])


    @alt_commands.command(name='explain_corp', guild_ids=app_settings.get_all_servers())
    @option("corporation",
            description="Search for a Corporation!",
            autocomplete=search_corps_on_characters)
    async def list_data_in_corp(self, ctx, corporation: str):
        out_text = Paginator()
        await ctx.defer(ephemeral=False)

        corp = EveCorporationInfo.objects.get(corporation_name=corporation)
        entity_id = corp.corporation_id

        out_text.add_line(f"Corporation: {corp.corporation_name} ({entity_id})")
        corp, members = helpers.get_and_update_member_list(entity_id)
        if members:
            out_text.add_line(f"Members (ESI Lookup - get_corporations_corporation_id_members): {len(members)}")
        else:
            out_text.add_line("Members (ESI Lookup - get_corporations_corporation_id_members): No Tokens")
        
        out_text.add_line("") 
        out_text.add_line(f"*************************************************************************") 
        out_text.add_line("") 

        members = helpers.get_known_corporation_members(
            entity_id
        ).select_related(
            "character_ownership__user__profile__main_character"
        )
        out_text.add_line(f"Known members (ALL): (Total {members.count()})")
        out_text.add_line(f"{members}")
        for m in members:
            out_text.add_line(f" - [{m.alliance_ticker}] ({m.corporation_ticker}) {m.character_name}")
            out_text.add_line(
                f"   Main - [{m.character_ownership.user.profile.main_character.alliance_ticker}]"
                f" ({m.character_ownership.user.profile.main_character.corporation_ticker})"
                f" {m.character_ownership.user.profile.main_character.character_name}"
            )
        
        out_text.add_line("") 
        out_text.add_line(f"*************************************************************************") 
        out_text.add_line("")

        members = helpers.get_known_corporation_members_from_members(
            entity_id
        ).select_related(
            "character_ownership__user__profile__main_character"
        )
        out_text.add_line(f"Known members (Member Corps Only): (Total {members.count()})")
        for m in members:
            out_text.add_line(f" - [{m.alliance_ticker}] ({m.corporation_ticker}) {m.character_name}")
            try:
                out_text.add_line(
                    f"   Main - [{m.character_ownership.user.profile.main_character.alliance_ticker}]"
                    f" ({m.character_ownership.user.profile.main_character.corporation_ticker})"
                    f" {m.character_ownership.user.profile.main_character.character_name}"
                )
            except Exception:
                pass
        out_text.add_line("") 
        out_text.add_line(f"*************************************************************************") 

        for _str in out_text.pages:
            await ctx.send(_str)

        await ctx.respond("Done!", ephemeral=False)


def setup(bot):
    bot.add_cog(AltMan(bot))
