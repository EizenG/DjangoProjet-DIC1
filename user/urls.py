from . import views
from django.urls import path

urlpatterns = [
    path("signInRegister/",views.signIn_view,name="user-signInRegister"),
    path("signInRegister/Next/",views.register_view,name="user-registerNext"),
    path("user/profile/",views.profile_views),
]
