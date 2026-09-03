from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('altmanager', '0018_alter_altcorphistory_request_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='altmanagerconfiguration',
            options={'default_permissions': [], 'permissions': (('basic_access', 'Can access alt manager module'), ('restricted_corps', 'Can access restricted corps.'), ('su_access', 'Can access ALL corps.'), ('can_request_alt_corp', 'Can send alt corp requests'), ('can_sanction_own_corp', 'Can sanction requests from members in own corp'), ('can_sanction_all', 'Can sanction all requests'), ('can_manage_alt_corp', 'Can manage alt corp requests'), ('can_view_active_requests', 'Can view all active/current alt corp owners'), ('can_view_all_requests', 'Can view all alt corp owners'), ('manage_vip', 'Can manage VIP characters')), 'verbose_name': 'Alt Manager Configuration'},
        ),
    ]
