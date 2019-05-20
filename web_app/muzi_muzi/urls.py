from django.urls import path
from . import views

urlpatterns = [
    path('get_adverts', views.adverts, name='adverts'),
]
