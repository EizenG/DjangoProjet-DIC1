let selectContainer = document.getElementsByClassName("select-container");
let selectDropdowns = document.getElementsByClassName("select-dropdown");
let selectOptions = document.getElementsByClassName("option");
let selected = document.getElementsByClassName("selected");
let currentSelectIndex = null;
let footer = document.querySelector("footer");
let logoProfile = document.querySelector("[data-user-profileIcon]");
let userNavCard = document.getElementsByClassName("userNavigationCard")[0];
let header = document.querySelector("header");
let main = document.querySelector("main");
main.style.minHeight = `${window.innerHeight - footer.offsetHeight - header.offsetHeight}px`;

document.cookie = "type=signIn;path=/"; // cookie servant dans les fonctionnalite d'authentification

logoProfile.addEventListener("click", e =>{
    if(userNavCard.classList.contains("hideUserNavCard")){
        userNavCard.classList.remove("hideUserNavCard");
    }else{
        userNavCard.classList.add("hideUserNavCard");
    }
});

for(let option of selectOptions){
    option.addEventListener("click",e =>{
        selected[currentSelectIndex].textContent = option.textContent;
    });
}
for(let i = 0 ; i < selectDropdowns.length; i++){
    selectDropdowns[i].style.width = selectContainer[i].offsetWidth + "px";
}

for(let i = 0; i < selectContainer.length ; i++ ){
    selectContainer[i].addEventListener("click", e =>{
        if(currentSelectIndex != null && currentSelectIndex != i)
            selectDropdowns[currentSelectIndex].classList.add("hidden");
        currentSelectIndex = i;
        selectDropdowns[i].classList.toggle("hidden");
    });
}

document.addEventListener("click",e =>{

    // Associer au custom select que l'on a cree pour la selection de langue et la devise 
    if(!e.target.closest(".select-container") && selectDropdowns[currentSelectIndex])
        selectDropdowns[currentSelectIndex].classList.add("hidden");
    
    
    if (!e.target.closest("#profileDiv") && e.target != logoProfile)
        userNavCard.classList.add("hideUserNavCard");
});
