from .models import Users
from .serializers import UsersSerializer, UsersRegisterSerializer
from rest_framework import generics, mixins, viewsets, filters
from rest_framework.permissions import AllowAny
from .permissions import IsUser


class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('username', 'email')
    permission_classes = (IsUser,)


class UserRegisterView(mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersRegisterSerializer
    permission_classes = (AllowAny,)
