from django.urls import path
from . import views

app_name = 'muzi_muzi'

urlpatterns = [
    path('get_adverts', views.adverts, name='adverts'),
]
