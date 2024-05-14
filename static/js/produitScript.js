let addToCartBtn = document.querySelector(".ajout-panier button");
let productAsin = document.querySelector("#productAsin").textContent;
let userMessage = document.getElementById("userMessage");
let plusIcon = document.querySelectorAll(".plus");
let moinsIcon = document.querySelectorAll(".moins");



addToCartBtn.addEventListener("click", e =>{
    let quantity = Number(document.querySelector("#quantity").textContent);
    
    fetch(`http://127.0.0.1:8000/produit/addToCart/${productAsin}/${quantity}`)
    .then(response => response.json())
    .then(response => {
        userMessage.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${response.msg}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    })
    .catch(error => alert("Oups! une erreur est survenu, veuillez reessayer."));
    
});

plusIcon.forEach(elt =>{

    elt.addEventListener("click", e =>{
        num = Number(e.target.parentElement.children[1].textContent);
        
        if (num <= 1000){
            num++;
            if (num <= 9){
                e.target.parentElement.children[1].innerText = `0${num}`;
            }else{
                e.target.parentElement.children[1].innerText = `${num}`;
            }
        }
    });
});

moinsIcon.forEach(elt =>{
    elt.addEventListener("click", e =>{
        num = Number(e.target.parentElement.children[1].textContent);
        
        if (num >= 2){
            num--;
            if (num <= 9){
                e.target.parentElement.children[1].textContent = `0${num}`;
            }else{
                e.target.parentElement.children[1].textContent = `${num}`;
            }
        }
    });
});
