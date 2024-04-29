from django.shortcuts import render

# Create your views here.

def home_views(request):
    return render(request,"index.html")

def validation_views(request):
    return render(request,"validation.html")

def panier_views(request):
    return render(request,"panier.html")