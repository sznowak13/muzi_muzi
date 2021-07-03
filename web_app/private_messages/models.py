from django.db import models


class PrivateMessages(models.Model):
    msg_id = models.AutoField(primary_key=True)
    user_to = models.ForeignKey('users.Users', models.DO_NOTHING, db_column='user_to',
                                related_name='user_to', blank=True, null=True)
    user_from = models.ForeignKey('users.Users', models.DO_NOTHING, db_column='user_from',
                                  blank=True, related_name='user_from', null=True)
    sent_time = models.DateTimeField(blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    read = models.BooleanField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} to {self.user_to} from {self.user_from}"

    class Meta:
        db_table = 'messages'
        verbose_name_plural = "Private messages"


#  --- Views ---


class UserMessageView(models.Model):
    msg_id = models.IntegerField(primary_key=True)
    email_from = models.CharField(max_length=100)
    email_to = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    read = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'user_message_view'
