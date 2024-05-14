from . import views
from django.urls import path

urlpatterns = [
    path("signInRegister/",views.signIn_view,name="user-signInRegister"),
    path("signInRegister/Next/",views.register_view,name="user-registerNext"),
    path("user/profile/",views.profile_views),
    path("user/parameter/",views.user_parameter,name='params'),
    path("user/logout/",views.logout_view,name='logout'),
    path("user/changePassword/",views.change_password,name='changePassword'),
]
