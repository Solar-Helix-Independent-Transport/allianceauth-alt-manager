from django.apps import AppConfig

from . import __version__, __branch__

class AltManagerConfig(AppConfig):
    name = 'altmanager'
    label = 'altmanager'

    verbose_name = f"Alt Manager v{__version__} ({__branch__})"