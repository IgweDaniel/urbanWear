
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from django.urls import path, re_path
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('store.api.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path('.*',
                        TemplateView.as_view(template_name='index.html')), ]
