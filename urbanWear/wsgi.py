"""
WSGI config for urbanWearWear project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from whitenoise import WhiteNoise
from django.conf import settings
# from my_project import MyWSGIApp

# application = MyWSGIApp()
# application = WhiteNoise(application, root='/path/to/static/files')
# application.add_files('/path/to/more/static/files', prefix='more-files/')

BASE_DIR = settings.BASE_DIR
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'urbanWear.settings')

application = get_wsgi_application()

application = WhiteNoise(
    application, root=os.path.join(BASE_DIR, 'staticfiles'))
# application = WhiteNoise(application, root='/static/staticfiles')
