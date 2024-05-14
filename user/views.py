from django.shortcuts import render,redirect
from .forms import CustomUserCreationForm,CustomAuthenticationForm
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.password_validation import validate_password
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
    elif request.method == "POST" and request.COOKIES["type"] == "signIn":
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(username= email, password=password)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            messages.error(request,"Mot de passe ou Email invalides!!!")
            form = CustomUserCreationForm()
            form2 = CustomAuthenticationForm(request.POST)
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
            user = authenticate(username= userInfs["email"], password=userInfs["password1"])
            login(request,user)
            response.delete_cookie("first_name")
            response.delete_cookie("last_name")
            response.delete_cookie("birth_date")
            response.delete_cookie("email")
            return response
    else:
        form = CustomUserCreationForm()
    
    return render(request,"registerNext.html",{"form":form,"form2":form2})

def logout_view(request):
    logout(request)
    return redirect('home')  

@login_required(login_url='/signInRegister/')
def profile_views(request):
    return render(request,"profilutil.html")


@login_required(login_url='/signInRegister/')
def user_parameter(request):

    if request.method == "POST":
        if request.POST.get("username",False):
            request.user.username = request.POST["username"]
        if request.POST.get("email",False):
            request.user.email = request.POST["email"]
        if request.FILES.get("profileImage",False):
            request.user.profileImage = request.FILES["profileImage"]
        if request.POST.get("secondEmail",False):
            request.user.secondEmail = request.POST["secondEmail"]
        if request.POST.get("num",False):
            request.user.tel = request.POST["num"]
        if request.POST.get("address",False):
            request.user.address = request.POST["address"]
        if request.POST.get("pays",False):
            request.user.country = request.POST["pays"]
        if request.POST.get("region",False):
            request.user.region = request.POST["region"]
        if request.POST.get("zipCode",False):
            request.user.zipCode = request.POST["zipCode"]
        request.user.save()
        return redirect("params")

    return render(request,"parametre.html")


@login_required(login_url='/signInRegister/')
def change_password(request):
    
    if request.user.check_password(request.POST["mdp-actuel"]):
        if request.POST["mdp-new"] != request.POST["mdp-new-confirm"]:
            messages.error(request, 'Veuillez rentrer le meme mot de passe, pour confirmer!')
            return redirect("params")
        else :
            try:
                validate_password(password =request.POST["mdp-new"],user= request.user)
            except Exception as e:
                Errormessages = list(e.messages)
                for msg in Errormessages:
                    messages.error(request, msg)
                return redirect("params")
            request.user.set_password(request.POST["mdp-new"])
            request.user.save()
            user = authenticate(username= request.user.email, password=request.POST["mdp-new"])
            login(request,user)
            messages.success(request,"Votre mot de passe a ete change...")
            return redirect("params")

    else:
        messages.error(request, 'Le mot de passe fourni ne correspond pas a votre mot de passe actuel!')
        return redirect("params")



    