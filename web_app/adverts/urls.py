from django.urls import path
from . import views

app_name = 'adverts'
urlpatterns = [
    path('', views.adverts, name='adverts')
    ]
