from django.apps import AppConfig
from django.contrib.auth import get_user_model


class NewstailordjangoapplicationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "NewsTailorDjangoApplication"


class MyAppConfig(AppConfig):
    name = 'myapp'

    def ready(self):
        """
        This method is called when the app is loaded.
        It ensures a default superuser is created when the app starts.
        """
        user = get_user_model()

        user.objects.create_superuser(
            username='user',
            email='user@gmail.com',
            password='12345Aa!'
        )
