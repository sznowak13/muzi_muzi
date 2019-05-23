from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import Profession, Genre, City
from .serializers import ProfessionSerializer, GenreSerializer, CitySerializer


@api_view(['GET'])
def api_root(request, format=None):

    return Response({
        'users': reverse('users:users', request=request, format=format),
        'adverts': reverse('adverts:adverts', request=request, format=format),
        'bands': reverse('bands:bands', request=request, format=format)
    })


class ProfessionList(generics.ListAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer


class GenreList(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class CityList(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer