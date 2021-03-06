# Generated by Django 2.2.1 on 2019-05-21 14:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('private_messages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='privatemessages',
            name='user_from',
            field=models.ForeignKey(blank=True, db_column='user_from', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_from', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='privatemessages',
            name='user_to',
            field=models.ForeignKey(blank=True, db_column='user_to', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_to', to=settings.AUTH_USER_MODEL),
        ),
    ]
