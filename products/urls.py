from . import views
from django.urls import path

urlpatterns = [
    path("",views.home_views,name="home")
]