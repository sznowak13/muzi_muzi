# Generated by Django 2.2.1 on 2019-06-05 11:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authtoken', '0002_auto_20160226_1747'),
        ('users', '0005_auto_20190605_1131'),
    ]

    operations = [
        migrations.CreateModel(
            name='VerificationToken',
            fields=[
                ('token_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authtoken.Token')),
            ],
            options={
                'db_table': 'verification_token',
                'abstract': False,
            },
            bases=('authtoken.token',),
        ),
    ]