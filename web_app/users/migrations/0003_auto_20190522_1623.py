# Generated by Django 2.2.1 on 2019-05-22 16:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20190521_1408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='role',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='muzi_muzi.Role'),
            preserve_default=False,
        ),
    ]
