"""
Django settings for web_app project.
Generated by 'django-admin startproject' using Django 2.2.1.
For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
from .DBURI import DBURI

# Check for db credentials

if not (DBURI.host and DBURI.password and DBURI.username and DBURI.db_name):
    raise EnvironmentError(f"Environment variables are not set! Please configure your DB credentials")

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'r(f@(bbu$&q4(z*li2x-8q^4)t8g(q9srb!7n!ucikczio0i%w'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'muzi_muzi.apps.MuziMuziConfig',
    'adverts.apps.AdvertsConfig',
    'bands.apps.BandsConfig',
    'users.apps.UsersConfig',
    'private_messages.apps.PrivateMessagesConfig',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'django_sites'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'web_app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'web_app.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': DBURI.db_name,
        'USER': DBURI.username,
        'PASSWORD': DBURI.password,
        'HOST': DBURI.host,
        'PORT': '5432',
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'users.Users'

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

SITES = {
    "dev": {"domain": "localhost:8000", "scheme": "http", "name": "localhost"},
}

# settings_development.py
# defaut site id for development environment
SITE_ID = "dev"


REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

# testing backend
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# actual backend
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

email_password = os.environ.get('MUZI_MUZI_EMAIL_PASSWORD')
if not email_password:
    raise EnvironmentError("Password for email backend not provided. Check environment variables.")

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'muzi.muzi.django@gmail.com'
EMAIL_HOST_PASSWORD = 'pumpernikiel123'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)
#
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
# ACCOUNT_EMAIL_REQUIRED = True
