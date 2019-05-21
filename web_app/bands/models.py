from django.db import models


class Band(models.Model):
    band_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    city = models.ForeignKey('muzi_muzi.City', models.DO_NOTHING, blank=True, null=True)
    year_founded = models.DateField(blank=True, null=True)
    photo = models.CharField(max_length=255, blank=True, null=True)
    homepage = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    members = models.ManyToManyField('users.Users', db_table='user_band')
    genres = models.ManyToManyField('muzi_muzi.Genre', db_table='band_genre')

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'band'


#  --- Views ---


class BandMemberView(models.Model):
    band_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    members = models.TextField()

    class Meta:
        managed = False
        db_table = "band_members_view"
