from rest_framework import serializers
from NewsTailorDjangoApplication.models import Configuration, Category, Configuration_Category
from django.contrib.auth import get_user_model

User = get_user_model()

class ConfigurationSerializer(serializers.ModelSerializer):
    categories = serializers.ListField(child=serializers.DictField(), write_only=True)
    sources = serializers.ListField(child=serializers.CharField(), write_only=True)
    user_id = serializers.IntegerField(write_only=True)
    fetch_period = serializers.CharField()

    class Meta:
        model = Configuration
        fields = ['user_id','name', 'fetch_period', 'read_time', 'sources', 'categories']

    def create(self, validated_data):
        categories = validated_data.pop('categories', [])
        sources = validated_data.pop('sources', [])

        fetch_period = int(validated_data.pop('fetch_period')) * 60 #Convert to minutes
        user_id = validated_data.pop('user_id')

        user_instance = User.objects.get(id=user_id)

        configuration_instance = Configuration.objects.create(
            user_configuration=user_instance,
            fetch_period=fetch_period,
            sources=sources,
            **validated_data
        )

        for category_data in categories:
            category_value = category_data.get('value')
            percentage = category_data.get('percentage')

            category_instance = Category.objects.get(name=category_value)
            Configuration_Category.objects.create(
                configuration=configuration_instance,
                category=category_instance,
                percentage=percentage
            )

        return configuration_instance

    def update(self, instance, validated_data):
        categories = validated_data.pop('categories', [])
        sources = validated_data.pop('sources', [])
        fetch_period = int(validated_data.pop('fetch_period', instance.fetch_period)) * 60 #Convert to minutes
        read_time = validated_data.pop('read_time', instance.read_time)

        instance.name = validated_data.get('name', instance.name)
        instance.read_time = read_time
        instance.fetch_period = fetch_period
        instance.sources = sources if sources else instance.sources

        if categories:
            Configuration_Category.objects.filter(configuration=instance).delete()

            for category_data in categories:
                category_value = category_data.get('value')
                percentage = category_data.get('percentage')

                category_instance = Category.objects.get(name=category_value)
                Configuration_Category.objects.create(
                    configuration=instance,
                    category=category_instance,
                    percentage=percentage
                )

        instance.save()
        return instance

class ConfigurationListSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()

    class Meta:
        model = Configuration
        fields = ['id', 'name', 'read_time', 'fetch_period', 'sources', 'categories']

    def get_categories(self, obj):
        categories_data = Configuration_Category.objects.filter(configuration=obj).select_related('category')
        return [
            {
                "id": cc.category.id,
                "name": cc.category.name,
                "percentage": cc.percentage
            }
            for cc in categories_data
        ]

