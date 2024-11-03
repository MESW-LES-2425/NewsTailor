from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
import re

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")

class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password1", "password2")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        errors = {}
        if attrs['password1'] != attrs['password2']:
            errors['password'] = "Passwords do not match!"
        
        password = attrs.get("password1", "")
        if len(password) < 8:
            errors['password'] = "Passwords must be at least 8 characters!"
        
        if not re.search(r'[A-Z]', password):
            errors['password'] = "Passwords must contain at least one uppercase letter!"
        
        if not re.search(r'[0-9]', password):
            errors['password'] = "Passwords must contain at least one number!"
        
        if not re.search(r'[@$!%*?&#]', password):
            errors['password'] = "Passwords must contain at least one special character!"

        if errors:
            raise serializers.ValidationError(errors)
        
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")
        
        return User.objects.create_user(password=password, **validated_data)

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        errors = {}
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found!")
        
        if user.is_banned:
           raise serializers.ValidationError("User account is banned!")
        
        user = authenticate(**data)
        if user:
            return user
        raise serializers.ValidationError("Incorrect Credentials!")
