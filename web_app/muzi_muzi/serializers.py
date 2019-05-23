from rest_framework import serializers
from .models import Profession, Genre, City


class ProfessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profession
        fields = ('name', 'prof_id')


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('name', 'genre_id')


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ('name', 'city_id')