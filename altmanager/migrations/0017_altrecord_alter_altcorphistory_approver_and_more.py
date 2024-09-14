# Generated by Django 4.2.13 on 2024-09-13 09:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eveonline', '0017_alliance_and_corp_names_are_not_unique'),
        ('altmanager', '0016_altcorptarget_last_step_text'),
    ]

    operations = [
        migrations.CreateModel(
            name='AltRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_date', models.DateTimeField(auto_created=True)),
                ('sanctioned', models.BooleanField(default=False)),
                ('approved', models.BooleanField(default=False)),
                ('pending_revoke', models.DateTimeField(blank=True, default=None, null=True)),
                ('revoked', models.BooleanField(default=False)),
                ('revoked_reason', models.TextField(blank=True, default=None, help_text='The revoke/pending revoke reason', null=True)),
            ],
            options={
                'default_permissions': [],
            },
        ),
        migrations.AlterField(
            model_name='altcorphistory',
            name='approver',
            field=models.ForeignKey(blank=True, default=None, help_text='The approver model', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='eveonline.evecharacter'),
        ),
        migrations.AlterField(
            model_name='altcorphistory',
            name='owner',
            field=models.ForeignKey(blank=True, default=None, help_text='The owner character model', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='eveonline.evecharacter'),
        ),
        migrations.AlterField(
            model_name='altcorphistory',
            name='sanctioner',
            field=models.ForeignKey(blank=True, default=None, help_text='The owner character model', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='eveonline.evecharacter'),
        ),
        migrations.CreateModel(
            name='AltHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_date', models.DateTimeField(auto_created=True)),
                ('owner_character_name', models.CharField(blank=True, default=None, help_text='The owner character name at time of claim', max_length=250, null=True)),
                ('owner_corporation_name', models.CharField(blank=True, default=None, help_text='The owners corporation name at time of claim', max_length=250, null=True)),
                ('sanctioner_character_name', models.CharField(blank=True, default=None, help_text='The sanctioning character name at time of sanction', max_length=250, null=True)),
                ('sanctioner_corporation_name', models.CharField(blank=True, default=None, help_text='The sanctioning characters corporation name at time of sanction', max_length=250, null=True)),
                ('approver_character_name', models.CharField(blank=True, default=None, help_text='The approving character name at time of sanction', max_length=250, null=True)),
                ('approver_corporation_name', models.CharField(blank=True, default=None, help_text='The approving characters corporation name at time of sanction', max_length=250, null=True)),
                ('entity_id', models.BigIntegerField()),
                ('entity_name', models.CharField(choices=[(0, 'Alliance'), (1, 'Character')], max_length=100)),
                ('entity_type', models.CharField(max_length=250)),
                ('approver', models.ForeignKey(blank=True, default=None, help_text='The approver model', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='eveonline.evecharacter')),
                ('owner', models.ForeignKey(blank=True, default=None, help_text='The owner character model', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='eveonline.evecharacter')),
                ('request', models.OneToOneField(blank=True, default=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='request', to='altmanager.altrecord')),
                ('sanctioner', models.ForeignKey(blank=True, default=None, help_text='The owner character model', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='eveonline.evecharacter')),
            ],
            options={
                'default_permissions': [],
            },
        ),
    ]