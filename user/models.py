from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,AbstractUser
from django.utils.translation import gettext_lazy as _

# Create your models here.

class CustomUserManager (BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_('Users must have an email address'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self,email,password,**extra_fields):
        user = self.create_user(email,password,**extra_fields)
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

class CustomUser (AbstractBaseUser):
    is_superuser = models.BooleanField(_("Is super user"),default=False)
    is_staff = models.BooleanField(_("Is staff"),default=False)
    email = models.EmailField(verbose_name=_("Email"),unique = True)
    secondEmail = models.EmailField(verbose_name=_("Secondary email"),null=True,blank=True)
    first_name = models.CharField(verbose_name=_("Fisrt name"),null= False,blank=False,max_length=50)
    last_name = models.CharField(verbose_name=_("Last name"),null= False,blank=False,max_length=50)
    birth_date = models.DateField(verbose_name=_("Birth date"))
    tel = models.CharField(verbose_name=_("Phone number"),max_length=9)
    country = models.CharField(verbose_name=_("Country"),max_length=20)
    region = models.CharField(verbose_name=_("Region"),max_length=20)
    city = models.CharField(verbose_name=_("City"),max_length=20)
    zipCode = models.IntegerField(verbose_name=_("Zip code"))
    username = models.CharField(verbose_name=_("User name"),max_length=10)
    profileImage = models.ImageField(null=True,blank=True,upload_to="user/profileImages")


    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name","last_name"]
