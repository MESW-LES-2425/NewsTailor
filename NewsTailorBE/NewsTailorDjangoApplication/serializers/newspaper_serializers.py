from datetime import datetime
from rest_framework import serializers

from NewsTailorDjangoApplication.models import Newspaper, User


class NewsPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newspaper
        fields = '__all__'

    @staticmethod
    def create_news_paper(content, userid):
        # Fetch user instance
        try:
            user_instance = User.objects.get(id=userid)
        except User.DoesNotExist:
            raise ValueError(f"User with id {userid} does not exist.")

        # Use serializer to validate and save the instance
        serializer = NewsPaperSerializer(data={
            "title": "Sample Title",
            "content": content["dev_to"],
            "created_at": datetime.now(),
            "user_newspaper": user_instance.id
        })

        if serializer.is_valid():
            serializer.save()
            return serializer.instance
        else:
            raise ValueError("Invalid data for Newspaper creation.")

    @classmethod
    def get_news_paper_by_user(cls, user_id):
        """
        Verifies if a newspaper exists for a given user ID.
        If found, returns the newspaper data; if not, returns None.
        """
        try:
            newspaper_instance = Newspaper.objects.get(user_newspaper_id=user_id)
            return cls(newspaper_instance).data
        except Newspaper.DoesNotExist:
            return None
