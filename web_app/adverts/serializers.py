from rest_framework import serializers
from .models import Advert
from bands.models import Band
from muzi_muzi.models import Profession, Genre


class PKFilteredRelatedFiled(serializers.PrimaryKeyRelatedField):

    def __init__(self, model, **kwargs):
        self.model = model
        super().__init__(**kwargs)

    def get_queryset(self):
        user = self.context['request'].user
        queryset = self.model.objects.filter(members=user)
        return queryset


class AdvertSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='users-detail', read_only=True)
    username = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.user_id')
    band_name = serializers.StringRelatedField(source='band.name', read_only=True)
    band = serializers.HyperlinkedRelatedField(view_name='band-detail', queryset=Band.objects.all())
    profession = serializers.SlugRelatedField(slug_field='name', queryset=Profession.objects.all())
    genre = serializers.SlugRelatedField(slug_field='name', queryset=Genre.objects.all())
    posted_on = serializers.DateTimeField(read_only=True)
    city = serializers.StringRelatedField(source='user.city', read_only=True)

    class Meta:
        model = Advert
        fields = (
            'advert_id', 'url', 'user', 'user_id', 'city', 'username', 'band',
            'band_name', 'title', 'description', 'posted_on',
            'profession', 'genre'
        )
