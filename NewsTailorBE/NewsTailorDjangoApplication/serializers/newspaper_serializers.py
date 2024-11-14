from datetime import datetime
from rest_framework import serializers

from NewsTailorDjangoApplication.models import Newspaper, User


class NewsPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newspaper
        fields = '__all__'

    @classmethod
    def create_news_paper(cls, content, userid):
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
            "user_newspaper": user_instance.id,
            "is_currently_reading": True
        })

        if serializer.is_valid():
            serializer.save()
            return serializer.instance
        else:
            raise ValueError("Invalid data for Newspaper creation.")

    @classmethod
    def get_news_paper_by_user(cls, user_id):
        """
        Verifies if a newspaper exists for a given user ID with is_currently_reading=True.
        If found, returns the newspaper data; if not, returns None.
        """
        try:
            # Modify the query to check for `is_currently_reading=True`
            newspaper_instance = Newspaper.objects.get(user_newspaper_id=user_id, is_currently_reading=True)
            return cls(newspaper_instance).data
        except Newspaper.DoesNotExist:
            return None
