from django.shortcuts import render
from django.http import JsonResponse
from django.core.paginator import Paginator
import json
import os

products_data_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
products_data_path = f"{products_data_path}\\static\\data\\data.json"

# Mettre les categories correspondant a chaque numero
categories = {
    0 : "Tous les produits",
    1 : "Ordinateur et ordinateur portable",
    2 : "Accessoires informatiques",
    3 : "Téléphone intelligent",
    4 : "Casque d’écoute",
    5 : "Accessoires mobiles",
    6 : "Console de jeu",
    7 : "Appareil Photo et Photo",
    8 : "TV & électroménager",
    9 : "Montres & accessoires",
    10 : "GPS et Navigation",
    11 : "Technologie chauffable",
}


# Create your views here.

def home_views(request):

    with open(products_data_path,encoding="utf-8") as file:
        products = json.load(file)

    p = Paginator(products,15)
    products = p.page(1).object_list
    # permettra de creer le btn pour changer de page
    num_products_pages = [i for i in range(1,p.num_pages + 1)]

    return render(request,"index.html",context= {"categories" : categories,"products":products,"num_pages":num_products_pages})

def validation_views(request):
    return render(request,"validation.html")

def panier_views(request):
    return render(request,"panier.html")


def products_data(request,category,page):
    with open(products_data_path,encoding="utf-8") as file:
        products = json.load(file)
    
    if category == 0:
        p = Paginator(products,15)
        products = p.page(page).object_list
        products[0]["num_products_pages"] = p.num_pages
    else:
        products = [product for product in products if product["product_category"] == category]
        p = Paginator(products,15)
        products = p.page(page).object_list
        products[0]["num_products_pages"] = p.num_pages
        
    return JsonResponse(products,safe=False)