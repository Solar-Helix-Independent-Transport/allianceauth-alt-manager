from django.core.management.base import BaseCommand
from ...tasks import check_all_alt_corps

class Command(BaseCommand):
    help = 'Check all sancitons'

    def handle(self, *args, **options):
        check_all_alt_corps.delay()
