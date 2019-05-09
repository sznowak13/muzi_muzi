from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.


class Advert(models.Model):
    advert_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, null=True)
    band = models.ForeignKey('Band', models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    posted_on = models.DateTimeField(default=timezone.now, null=False)
    profession = models.ForeignKey('Profession', models.DO_NOTHING, null=True)
    genre = models.ForeignKey('Genre', models.DO_NOTHING, blank=True, null=True)

    def __str__(self):
        return f"{self.title} from {self.user}"

    class Meta:
        db_table = 'advert'


class City(models.Model):
    city_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'city'


class Genre(models.Model):
    genre_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'genre'


class PrivateMessages(models.Model):
    msg_id = models.AutoField(primary_key=True)
    user_to = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_to', related_name='user_to', blank=True, null=True)
    user_from = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_from', blank=True, related_name='user_from', null=True)
    sent_time = models.DateTimeField(blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    read = models.BooleanField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} to {self.user_to} from {self.user_from}"

    class Meta:
        db_table = 'private_messages'


class Profession(models.Model):
    prof_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'profession'


class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'role'


class Users(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    role = models.ForeignKey(Role, models.DO_NOTHING, blank=True, null=True)
    city = models.ForeignKey(City, models.DO_NOTHING, blank=True, null=True)
    photo_url = models.CharField(max_length=255, blank=True, null=True)
    video = models.ForeignKey('Videos', models.DO_NOTHING, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    genres = models.ManyToManyField(Genre)
    professions = models.ManyToManyField(Profession)

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'users'


class Band(models.Model):
    band_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    city = models.ForeignKey('City', models.DO_NOTHING, blank=True, null=True)
    year_founded = models.DateField(blank=True, null=True)
    photo = models.CharField(max_length=255, blank=True, null=True)
    homepage = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    members = models.ManyToManyField(Users, db_table='user_band')
    genres = models.ManyToManyField(Genre, db_table='band_genre')

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'band'


class Videos(models.Model):
    video_id = models.AutoField(primary_key=True)
    url = models.CharField(max_length=255)

    def __str__(self):
        return self.url

    class Meta:
        db_table = 'videos'


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


class BandMemberView(models.Model):
    band_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    members = models.TextField()

    class Meta:
        managed = False
        db_table = "band_members_view"


class UserListView(models.Model):
    user_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=40)
    email = models.CharField(max_length=100)
    photo_url = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    prof = models.TextField()
    genre = models.TextField()

    class Meta:
        managed = False
        db_table = "user_list_view"


class UserMessageView(models.Model):
    msg_id = models.IntegerField(primary_key=True)
    email_from = models.CharField(max_length=100)
    email_to = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    read = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'user_message_view'


class UserProfileView(models.Model):
    user_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=50)
    nickname = models.CharField(max_length=30)
    email = models.CharField(max_length=100)
    description = models.TextField()
    photo = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    video = models.CharField(max_length=255)
    prof = models.TextField()
    genre = models.TextField()
    bands = models.TextField()

    class Meta:
        managed = False
        db_table = 'user_profile_view'
