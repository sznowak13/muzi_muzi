from .models import Band
from .serializers import BandsSerializer, MemberSerializer
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response
from .permissions import IsMemberOrReadOnly
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def generate_emails(subject, message, members):
    text_message = strip_tags(message)
    mails = [
        EmailMultiAlternatives(subject, text_message, from_email='noreply@muzi.muzi', to=[member.email])
        for member in members
    ]
    for msg in mails:
        msg.attach_alternative(message, 'text/html')
    return mails


def send_mails(mails):
    delivered = 0
    for message in mails:
        delivered += message.send()
    return delivered


class BandViewSet(viewsets.ModelViewSet):
    queryset = Band.objects.all()
    serializer_class = BandsSerializer

    @action(detail=True, permission_classes=[IsMemberOrReadOnly], methods=['post'])
    def notify_members(self, request, pk=None):
        band = self.get_object()
        user = request.user
        subject = f'Notification from {user}'
        message = render_to_string('email_template.html',
                                   {'band': band, 'user': user, 'message': request.data['message']})
        messages = generate_emails(subject, message, band.members.all())
        delivered = send_mails(messages)
        users = MemberSerializer(band.members.all(), context={'request': request}, many=True)
        return Response({'members_notified': users.data, 'message': request.data['message'], 'delivered': delivered})
