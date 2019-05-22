from django.urls import path
from . import views

app_name = 'bands'
urlpatterns = [
    path('', views.bands, name='bands')
    ]