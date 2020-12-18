"""
WSGI config for urbanWearWear project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os
from pathlib import Path

from django.core.wsgi import get_wsgi_application

from whitenoise import WhiteNoise


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'urbanWear.settings')

BASE_DIR = Path(__file__).resolve().parent.parent

application = get_wsgi_application()

# application = WhiteNoise(
#     application, root=os.path.join(BASE_DIR, 'staticfiles'))

# application.add_files(os.path.join(BASE_DIR, 'media'), prefix='media/')
