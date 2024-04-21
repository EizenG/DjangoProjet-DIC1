from django.shortcuts import render
from .forms import CustomUserCreationForm

# Create your views here.

def register_view(request):

    if request.method == "POST":
        form  = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
    else:
        form =  CustomUserCreationForm()

    return render(request,"register.html",{"form":form})
