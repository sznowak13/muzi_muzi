from rest_framework import permissions


class IsMember(permissions.BasePermission):
    """
    Custom permission to only allow members of a band to edit it.
    """
    def has_object_permission(self, request, view, obj):
        return request.user in obj.members.all()
