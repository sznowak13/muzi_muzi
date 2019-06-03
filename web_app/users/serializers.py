from .models import Users
from rest_framework import serializers
from adverts.models import Advert
from bands.models import Band
from rest_framework.serializers import ValidationError
from django.contrib.auth.hashers import make_password


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    adverts = serializers.HyperlinkedRelatedField(view_name='advert-detail', many=True, queryset=Advert.objects.all())
    bands = serializers.HyperlinkedRelatedField(view_name='band-detail', many=True, queryset=Band.objects.all())
    professions = serializers.StringRelatedField(many=True)
    genres = serializers.StringRelatedField(many=True)
    city = serializers.StringRelatedField()
    role = serializers.StringRelatedField()

    class Meta:
        model = Users
        fields = ('user_id', 'url', 'first_name', 'last_name', 'username', 'role', 'city', 'photo_url', 'video',
                  'description', 'genres', 'professions', 'bands', 'adverts')


class UsersRegisterSerializer(serializers.ModelSerializer):
    email2 = serializers.EmailField(label='Confirm Email', write_only=True)
    password2 = serializers.CharField(label='Confirm Password', write_only=True, required=True)

    class Meta:
        model = Users
        fields = ('username', 'password', 'password2', 'email', 'email2')

    def validate_email(self, value):
        data = self.get_initial()
        email1 = data.get("email2")
        email2 = value
        if email1 != email2:
            raise ValidationError("Emails must match")

        user_qs = Users.objects.filter(email=email2)
        if user_qs.exists():
            raise ValidationError("This user has already registered")
        return value

    def validate_password(self, value):
        data = self.get_initial()
        password1 = data.get("password2")
        password2 = value
        if password1 != password2:
            raise ValidationError("Password must match")

    def create(self, validated_data):
        validated_data.pop('password2')
        validated_data.pop('email2')
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UsersRegisterSerializer, self).create(validated_data)

