# Generated by Django 4.2.16 on 2024-11-14 14:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("NewsTailorDjangoApplication", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="newspaper_newsarticle",
            name="newsarticle_id",
        ),
        migrations.RemoveField(
            model_name="newspaper_newsarticle",
            name="newspaper_id",
        ),
        migrations.DeleteModel(
            name="NewsArticle",
        ),
        migrations.DeleteModel(
            name="Newspaper_NewsArticle",
        ),
    ]
