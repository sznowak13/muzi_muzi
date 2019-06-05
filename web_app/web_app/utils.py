from django.urls import reverse as django_reverse
from django.utils.http import urlencode


def reverse(viewname, query_params=None, urlconf=None, args=None, kwargs=None, current_app=None):
    """
    Custom wrapper for django reverse accepting query_params and adding it to the link.
    """
    url = django_reverse(viewname, urlconf=urlconf, args=args, kwargs=kwargs, current_app=current_app)
    if query_params:
        return "{}?{}".format(url, urlencode(query_params))

    return url
