from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
import re

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")

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

        password = attrs.get("password1")
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
            errors['email'] = "User not found!"
            raise serializers.ValidationError(errors)

        if user.is_banned:
            errors['non_field_error'] = "User account is banned!"
            raise serializers.ValidationError(errors)

        user = authenticate(**data)
        if user:
            return user
        errors['non_field_error'] = "Incorrect Credentials!"
        raise serializers.ValidationError(errors)


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'wpm')

    def get(self, instance):
        return instance

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def validate_email(self, value):
        if '@' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value

class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value
