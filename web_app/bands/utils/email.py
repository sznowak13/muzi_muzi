from django.core.mail import EmailMultiAlternatives, get_connection
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
    with get_connection() as conn:
        delivered = conn.send_messages(mails)
    return delivered
