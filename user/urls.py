from . import views
from django.urls import path

urlpatterns = [
    path("signInRegister/",views.signIn_view),
    path("signInRegister/Next/",views.register_view,name="user-registerNext"),
]
