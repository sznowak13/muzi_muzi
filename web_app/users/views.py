from .models import Users
from .serializers import UsersSerializer, UsersRegisterSerializer
from rest_framework import generics, mixins, viewsets


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class UserRegisterView(mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersRegisterSerializer


