# Generated by Django 4.2.13 on 2024-09-06 04:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('altmanager', '0010_alter_altmanagerconfiguration_member_corps_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AltCorpTarget',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'default_permissions': [],
            },
        ),
        migrations.AddField(
            model_name='altcorphistory',
            name='target',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='altmanager.altcorptarget'),
        ),
    ]
