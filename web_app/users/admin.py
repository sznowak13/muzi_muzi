from django.contrib import admin
from .models import Users, VerificationToken
from bands.models import Band


class BandInline(admin.StackedInline):
    model = Band.members.through
    extra = 1


class UserAdmin(admin.ModelAdmin):
    date_hierarchy = 'date_joined'
    fieldsets = (
        ('General Info', {
            'fields': ('first_name', 'last_name', 'username', 'email', 'city', 'description', 'genres', 'professions')
        }),
        ('User state', {
            'fields': ('last_login', 'is_superuser', 'is_staff', 'is_active', 'role', ),
            'classes': ('collapse',)
        })
    )
    inlines = [
        BandInline
    ]

    list_display = ('username', 'first_name', 'last_name', 'date_joined', 'role')

admin.site.register(Users, UserAdmin)
admin.site.register(VerificationToken)
