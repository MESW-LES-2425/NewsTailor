# Generated by Django 4.2.16 on 2024-12-02 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('NewsTailorDjangoApplication', '0012_alter_configuration_user_newspaper_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='configuration_user_newspaper',
            name='font_family',
            field=models.CharField(default='ABeeZee', max_length=256),
        ),
    ]
