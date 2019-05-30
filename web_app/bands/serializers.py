from rest_framework import serializers
from .models import Band
from muzi_muzi.models import Genre, City
from users.models import Users


class BandsSerializer(serializers.HyperlinkedModelSerializer):
    # adverts = serializers.PrimaryKeyRelatedField(many=True, queryset=Advert.objects.all())
    members = serializers.HyperlinkedRelatedField(view_name='users-detail', many=True, queryset=Users.objects.all())
    genres = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Genre.objects.all())
    city = serializers.SlugRelatedField(slug_field='name', queryset=City.objects.all())

    class Meta:
        model = Band
        fields = ('band_id', 'url', 'name', 'city', 'year_founded',
                  'photo', 'homepage', 'description', 'members', 'genres')


class MemberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ('url', 'user_id', 'username', 'email')
