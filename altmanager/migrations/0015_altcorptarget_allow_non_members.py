# Generated by Django 4.2.13 on 2024-09-11 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('altmanager', '0014_maininmembercorpfilter'),
    ]

    operations = [
        migrations.AddField(
            model_name='altcorptarget',
            name='allow_non_members',
            field=models.BooleanField(default=False),
        ),
    ]
