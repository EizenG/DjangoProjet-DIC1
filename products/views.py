from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.core.paginator import Paginator
import json
import os
from django.contrib.auth.decorators import login_required
from .models import Products,UserPanier
from django.contrib import messages

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

@login_required(login_url="/signInRegister/")
def user_profile_views(request):
    return render(request,"profilutil.html")

@login_required(login_url="/signInRegister/")
def panier_views(request):
    with open(products_data_path,encoding="utf-8") as file:
        products = json.load(file)
    panier = UserPanier.objects.filter(user = request.user).first()
    if panier:
        
        panier_products = Products.objects.filter(panier = panier)
        panier_products_asin = [product.asin for product in panier_products]
        product_inCart = [] # produit du panier avec les informations detaillees
        for asin in panier_products_asin:
            for product in products:
                if product["product_information"]["ASIN"] == asin:
                    product_inCart.append(product)
                    break
        final_output = []
        
        for product in product_inCart:
            asin = product["product_information"]["ASIN"]
            product_quantity = Products.objects.get(panier=panier,asin = asin).quantity
            product["pan_quantity"] = product_quantity
            final_output.append(product)
        
        return render(request,"panier.html",{"products":final_output})
    else:
        messages.error(request,"Vous n'avez pas encore de panier,ajoutez des produits...")
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


def product_detail(request,asin):
    with open(products_data_path,encoding="utf-8") as file:
        products = json.load(file)
    for product in products:
        if product["product_information"]["ASIN"] == asin:
            product = product
            break
    return render(request,"produit.html", context={"product" : product,"categories" : categories})

@login_required(login_url="/signInRegister/")
def addProductToCart(request,asin,quantity):
    
    if UserPanier.objects.filter(user = request.user).first():
        panier = UserPanier.objects.get(user = request.user)
        if Products.objects.filter(panier = panier,asin = asin).first():
            product = Products.objects.get(panier = panier,asin = asin)
            product.quantity = quantity
            product.save()
            return JsonResponse({"msg":"La quantite du produit dans le panier a ete modifiee."})
        else:
            product = Products(quantity=quantity,asin=asin,panier=panier)
            product.save()
            return JsonResponse({"msg":"Produit ajoute au panier"})
    else:
        panier = UserPanier(user = request.user)
        panier.save()
        product = Products(quantity=quantity,asin=asin,panier=panier)
        product.save()
        return JsonResponse({"msg":"Produit ajoute au panier"})
    

@login_required(login_url="/signInRegister/")
def deleteProductToCart(request,asin):
    panier = UserPanier.objects.get(user = request.user)
    if Products.objects.filter(panier = panier,asin = asin).first():
        product = Products.objects.get(panier = panier,asin = asin)
        product.delete()
        return JsonResponse({"success":"La suppression s'est bien passee..."})
    else:
        return JsonResponse({"error":"Une erreur s'est produite..."})
    
