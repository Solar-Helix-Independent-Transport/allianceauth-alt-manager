# Generated by Django 4.2.13 on 2024-09-06 04:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('altmanager', '0011_altcorptarget_altcorphistory_target'),
    ]

    operations = [
        migrations.AddField(
            model_name='altcorptarget',
            name='description',
            field=models.TextField(blank=True, default=None, null=True),
        ),
    ]
