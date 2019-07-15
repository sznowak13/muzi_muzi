from django.db import models


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


class Videos(models.Model):
    video_id = models.AutoField(primary_key=True)
    url = models.CharField(max_length=255)

    def __str__(self):
        return self.url

    class Meta:
        db_table = 'videos'
        verbose_name_plural = "Videos"



