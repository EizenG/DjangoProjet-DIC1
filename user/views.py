from django.shortcuts import render,redirect
from .forms import CustomUserCreationForm,CustomAuthenticationForm
# Create your views here.

def signIn_view(request):

    if request.method == "POST" and request.COOKIES["type"] == "register":
        form = CustomUserCreationForm()
        form2 = CustomAuthenticationForm()
        response = redirect("user-registerNext")
        response.set_cookie("first_name",request.POST["first_name"])
        response.set_cookie("last_name",request.POST["last_name"])
        response.set_cookie("birth_date",request.POST["birth_date"])
        response.set_cookie("email",request.POST["email"])
        return response
    else:
        form = CustomUserCreationForm()
        form2 = CustomAuthenticationForm()
    

    return render(request,"registerSignIn.html",{"form":form,"form2":form2})

def register_view(request):

    form2 = CustomAuthenticationForm()
    
    if request.method == "POST":
        userInfs = {
            "first_name" : request.COOKIES["first_name"],
            "last_name"  : request.COOKIES["last_name"],
            "email": request.COOKIES["email"],
            "birth_date" : request.COOKIES["birth_date"],
            'password1': request.POST['password1'],
            'password2': request.POST['password2']
        }
        form = CustomUserCreationForm(userInfs)
        if form.is_valid():
            form.save()
            response = redirect("home")
            response.delete_cookie("first_name")
            response.delete_cookie("last_name")
            response.delete_cookie("birth_date")
            response.delete_cookie("email")
            return response
    else:
        form = CustomUserCreationForm()
    
    return render(request,"registerNext.html",{"form":form,"form2":form2})
    
    