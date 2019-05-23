from rest_framework import viewsets
from .models import Profession, Genre, City
from .serializers import ProfessionSerializer, GenreSerializer, CitySerializer


class ProfessionList(viewsets.ModelViewSet):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer


class GenreList(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class CityList(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer