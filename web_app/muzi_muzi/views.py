from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import Profession
from .serializers import ProfessionSerializer


@api_view(['GET'])
def api_root(request, format=None):

    return Response({
        'users': reverse('users:users', request=request, format=format),
        'adverts': reverse('adverts:adverts', request=request, format=format)
    })


class ProfessionList(generics.ListAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
