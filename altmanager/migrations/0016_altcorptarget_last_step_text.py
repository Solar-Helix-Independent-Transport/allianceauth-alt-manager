# Generated by Django 4.2.13 on 2024-09-11 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('altmanager', '0015_altcorptarget_allow_non_members'),
    ]

    operations = [
        migrations.AddField(
            model_name='altcorptarget',
            name='last_step_text',
            field=models.TextField(blank=True, default='None', help_text='Discord Embed formatted text to send to member on approval', null=True),
        ),
    ]
