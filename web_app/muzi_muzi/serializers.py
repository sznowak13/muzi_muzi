from rest_framework import serializers
from .models import Profession


class ProfessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profession
        fields = ('name', 'prof_id')
