from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=256, unique=True, null=False)
    email = models.EmailField(max_length=254, unique=True, null=False)
    is_banned = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True) 
    
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


class NewsArticle(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=256, null=False)
    description = models.TextField(null=False)
    content = models.TextField(null=False)
    published_at = models.DateTimeField(null=False)
    url = models.URLField(max_length=256, unique=True, null=False)
    news_article_cateogry = models.ForeignKey(Category, on_delete=models.CASCADE)
    news_article_source = models.ForeignKey(Source, on_delete=models.CASCADE)

    class Meta:
        db_table = "newsarticle"


class Newspaper(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=256, null=False)
    content = models.TextField(null=False)
    created_at = models.DateTimeField(null=False)
    generated_using = models.ForeignKey(Configuration, on_delete=models.CASCADE)
    user_newspaper = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = "newspaper"


class Newspaper_NewsArticle(models.Model):
    newspaper_id = models.ForeignKey(Newspaper, on_delete=models.CASCADE)
    newsarticle_id = models.ForeignKey(NewsArticle, on_delete=models.CASCADE)

    class Meta:
        db_table = "newspaper_newsarticle"
        constraints = [
            models.UniqueConstraint(
                fields=["newspaper_id", "newsarticle_id"],
                name="unique_newspaper_newsarticle",
            )
        ]
