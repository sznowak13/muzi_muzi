from rest_framework import serializers
from .models import Band
from adverts.models import Advert


class BandsSerializer(serializers.ModelSerializer):
    # adverts = serializers.PrimaryKeyRelatedField(many=True, queryset=Advert.objects.all())
    members = serializers.StringRelatedField()
    genres = serializers.StringRelatedField()
    city = serializers.StringRelatedField()

    class Meta:
        model = Band
        fields = ('band_id', 'name', 'city', 'year_founded',
                  'photo', 'homepage', 'description', 'members', 'genres')