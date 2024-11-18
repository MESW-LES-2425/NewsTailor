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
            "is_currently_reading": True,
            "is_saved": False
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

    @classmethod
    def delete_news_paper_by_id(cls, id):
        """
        Deletes a Newspaper instance by its newspaper.
        Raises an error if the instance does not exist.
        """
        try:
            newspaper_instance = Newspaper.objects.get(id=id)
            newspaper_instance.delete()
            return {"message": f"Newspaper with id {id} has been deleted successfully."}
        except Newspaper.DoesNotExist:
            raise ValueError(f"Newspaper with id {id} does not exist.")
        
    @classmethod
    def delete_news_paper_if_not_saved(cls, id):
        """
        Deletes a Newspaper instance by its newspaper if is_saved is False.
        Otherwise, sets the "is_currently_reading" value to False.
        Raises an error if the instance does not exist.
        """
        try:
            newspaper_instance = Newspaper.objects.get(id=id)
        except Newspaper.DoesNotExist:
            raise ValueError(f"Newspaper with id {id} does not exist.")

        if newspaper_instance.is_saved:
            newspaper_instance.is_currently_reading = False
            newspaper_instance.save()  
        else:
            newspaper_instance.delete()  

        
    @classmethod
    def save_news_paper_by_id(cls, id):
        """
        Sets a Newspaper Instance's "is_saved" value to True.
        Raises an error if the instance does not exist.
        """
        try:
            newspaper_instance = Newspaper.objects.get(id=id)
        except Newspaper.DoesNotExist:
            raise ValueError(f"Newspaper with id {id} does not exist.")

        newspaper_instance.is_saved = True
        newspaper_instance.save()
