from rest_framework import serializers
from .models import Band


class BandsSerializer(serializers.HyperlinkedModelSerializer):
    # adverts = serializers.PrimaryKeyRelatedField(many=True, queryset=Advert.objects.all())
    members = serializers.HyperlinkedIdentityField(view_name='users-detail', many=True)
    genres = serializers.StringRelatedField(many=True)
    city = serializers.StringRelatedField()

    class Meta:
        model = Band
        fields = ('band_id', 'url', 'name', 'city', 'year_founded',
                  'photo', 'homepage', 'description', 'members', 'genres')