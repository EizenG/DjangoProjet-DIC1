from django.db import models
from user.models import CustomUser
# Create your models here.

class UserPanier(models.Model):
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE,unique=True)

class Products (models.Model):
    asin = models.CharField(max_length=100,)
    quantity = models.IntegerField()
    panier = models.ForeignKey(UserPanier,on_delete=models.CASCADE)


