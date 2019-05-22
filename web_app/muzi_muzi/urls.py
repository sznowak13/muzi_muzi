from django.urls import path
from . import views

app_name = 'muzi_muzi'

urlpatterns = [
    path('get_adverts', views.adverts, name='adverts'),
    path('get_users', views.users, name='users'),
    path('get_bands', views.bands, name='bands'),
]
