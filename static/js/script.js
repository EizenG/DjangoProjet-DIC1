let selectContainer = document.getElementsByClassName("select-container");
let selectDropdowns = document.getElementsByClassName("select-dropdown");
let selectOptions = document.getElementsByClassName("option");
let selected = document.getElementsByClassName("selected");
let currentSelectIndex = null;
let footer = document.querySelector("footer");
let header = document.querySelector("header");
let main = document.querySelector("main");
main.style.minHeight = `${window.innerHeight - footer.offsetHeight - header.offsetHeight}px`;

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
    if(!e.target.closest(".select-container"))
        selectDropdowns[currentSelectIndex].classList.add("hidden");
});
