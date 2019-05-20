from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from .models import AdvertListView


def adverts(request):
    sample = AdvertListView.objects.all()

    data = serializers.serialize('json', sample)

    return HttpResponse(data, content_type='application/json')
