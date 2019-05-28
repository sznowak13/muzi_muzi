from django.urls import path, include
from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('users', views.UserViewSet, 'users')
router.register('register', views.UserRegisterView, 'register')

app_name = 'users'
urlpatterns = [
    path('', include(router.urls))
]
