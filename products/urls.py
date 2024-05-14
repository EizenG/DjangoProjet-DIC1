from . import views
from django.urls import path

urlpatterns = [
    path("",views.home_views,name="home"),
    path("user/validation/",views.validation_views,name = "valider"),
    path("user/panier/",views.panier_views,name="panier"),
    path("shop/products/data/<int:category>/<int:page>",views.products_data),
    path("produit/detail/<str:asin>",views.product_detail),
    path("produit/addToCart/<str:asin>/<int:quantity>",views.addProductToCart),
    path("produit/deleteToCart/<str:asin>/",views.deleteProductToCart),
    path("user/profile/",views.user_profile_views,name="profile"),
]