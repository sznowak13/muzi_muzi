from django.contrib import admin
from .models import Users, VerificationToken


admin.site.register(Users)
admin.site.register(VerificationToken)
