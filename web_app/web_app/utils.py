from django.urls import reverse as django_reverse
from django_sites import reverse as sites_reverse
from django.utils.http import urlencode
from web_app.settings import SITE_ID


def reverse(viewname, query_params=None, urlconf=None, args=None, kwargs=None, current_app=None, absolute=None):
    """
    Custom wrapper for django reverse accepting query_params and adding it to the link.
    """
    if absolute:
        url = sites_reverse(viewname, args=args, kwargs=kwargs, site_id=SITE_ID)
    else:
        url = django_reverse(viewname, args=args, kwargs=kwargs, urlconf=urlconf, current_app=current_app)
    if query_params:
        return "{}?{}".format(url, urlencode(query_params))

    return url
