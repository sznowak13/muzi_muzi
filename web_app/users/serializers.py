from .models import Users
from rest_framework import serializers
from adverts.models import Advert
from bands.models import Band


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    adverts = serializers.HyperlinkedRelatedField(view_name='advert-detail', many=True, queryset=Advert.objects.all())
    bands = serializers.HyperlinkedRelatedField(view_name='band-detail', many=True, queryset=Band.objects.all())
    professions = serializers.StringRelatedField(many=True)
    genres = serializers.StringRelatedField(many=True)
    city = serializers.StringRelatedField()
    role = serializers.StringRelatedField()

    class Meta:
        model = Users
        fields = (
            'user_id', 'url', 'first_name', 'last_name', 'username', 'role', 'city', 'photo_url', 'video',
            'description',
            'genres', 'professions', 'bands', 'adverts')
