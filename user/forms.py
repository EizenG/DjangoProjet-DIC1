from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import CustomUser
from django.utils.translation import gettext_lazy as _


class CustomUserCreationForm (UserCreationForm):
    password1 = forms.CharField(label=_("Mot de passe"), widget=forms.PasswordInput(attrs={'type': 'password'}),max_length=30)
    password2 = forms.CharField(label=_("Confirmer le mot de passe"), widget=forms.PasswordInput(attrs={'type': 'password'}),max_length=30)

    class Meta:
        model = CustomUser
        fields = ['birth_date','first_name','last_name','email','password1','password2']
        widgets = {
            'birth_date': forms.DateInput(attrs= {'type':'date'}),
            'first_name': forms.TextInput(attrs={'autofocus': True}),
        }

class CustomAuthenticationForm (forms.Form):

    email = forms.EmailField(max_length=100,required=True,label=_("Email"),widget=forms.EmailInput(attrs={"type":"email","id":"id_email2","autocomplete":"email"}))
    password = forms.CharField(max_length=30,required=True,label=_("Mot de passe"),widget=forms.PasswordInput(attrs={"type":"password"}))