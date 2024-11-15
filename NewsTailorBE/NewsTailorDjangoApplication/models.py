from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=256, unique=True, null=False)
    email = models.EmailField(max_length=254, unique=True, null=False)
    is_banned = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    wpm = models.IntegerField(null=False, default=238)
    
    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["username"]
    
    class Meta:
        db_table = "user"

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, unique=True, null=False)

    class Meta:
        db_table = "category"


class Source(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, null=False)
    url = models.URLField(max_length=256, unique=True, null=False)

    class Meta:
        db_table = "source"


class Configuration(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, null=False)
    read_time = models.IntegerField(null=False)
    fetch_period = models.IntegerField(null=False)
    user_configuration = models.ForeignKey(User, on_delete=models.CASCADE)


class Configuration_Category(models.Model):
    configuration_id = models.ForeignKey(Configuration, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    percentage = models.IntegerField(null=False)

    class Meta:
        db_table = "configuration_category"
        constraints = [
            models.UniqueConstraint(
                fields=["configuration_id", "category_id"],
                name="unique_configuration_category",
            )
        ]


class Configuration_Source(models.Model):
    configuration_id = models.ForeignKey(Configuration, on_delete=models.CASCADE)
    source_id = models.ForeignKey(Source, on_delete=models.CASCADE)

    class Meta:
        db_table = "configuration_source"
        constraints = [
            models.UniqueConstraint(
                fields=["configuration_id", "source_id"],
                name="unique_configuration_source",
            )
        ]

class Newspaper(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=256)
    content = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    user_newspaper = models.ForeignKey(User, on_delete=models.CASCADE)
    is_currently_reading = models.BooleanField(default=False)

    class Meta:
        db_table = "newspaper"