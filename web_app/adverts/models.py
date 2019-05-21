from django.db import models
from django.utils import timezone


class Advert(models.Model):
    advert_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('users.Users', models.DO_NOTHING, null=True)
    band = models.ForeignKey('bands.Band', models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    posted_on = models.DateTimeField(default=timezone.now, null=False)
    profession = models.ForeignKey('muzi_muzi.Profession', models.DO_NOTHING, null=True)
    genre = models.ForeignKey('muzi_muzi.Genre', models.DO_NOTHING, blank=True, null=True)

    def __str__(self):
        return f"{self.title} from {self.user}"

    class Meta:
        db_table = 'advert'


#  --- Views ---

class AdvertListView(models.Model):
    advert_id = models.IntegerField(primary_key=True)
    advert_type = models.TextField()
    first_name = models.CharField(max_length=40)
    city = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    posted_on = models.DateTimeField()
    genre = models.CharField(max_length=50)
    profession = models.CharField(max_length=50)
    band_name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = "advert_list_view"


class AdvertView(models.Model):
    advert_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=40)
    city = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    description = models.TextField()
    genre = models.CharField(max_length=50)
    profession = models.CharField(max_length=50)
    band_name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = "advert_view"
