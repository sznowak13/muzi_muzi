from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from web_app.utils import reverse
from users.models import VerificationToken
from django.template.loader import render_to_string
from muzi_muzi.utils.email import generate_mail


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        token = VerificationToken.objects.create(user=instance)
        activation_url = reverse('register-verify-email', query_params={"key": token.key}, absolute=True)
        message = render_to_string('users/email_confirmation.html', {'url': activation_url})
        generate_mail("Activate your Muzi Muzi account", message, instance.email).send()
