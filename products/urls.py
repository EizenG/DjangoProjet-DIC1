from . import views
from django.urls import path

urlpatterns = [
    path("",views.home_views,name="home"),
    path("user/validation/",views.validation_views),
    path("user/panier/",views.panier_views),
]