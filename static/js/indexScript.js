let productPageBtnList = document.querySelectorAll(".productPageBtn");
let currentProductPageBtn = document.querySelector(".productBtnContainer button:first-child");
let seePreviousProductPageBtn = document.querySelector("#navsButtons > button:first-child");
let seeNextProductPageBtn = document.querySelector("#navsButtons > button:last-child");
let productBtnContainer = document.querySelector(".productBtnContainer");
let productsCardContainer = document.getElementById("productsCardContainer");
let currentCategory = 0;
let categoriesCheckBoxs = document.querySelectorAll(".container");
let transformStep = 0; // le pas de translation de productBtnContainer
let i = 0 ; // Incremente ou decremente selon qu'on appuie sur previous ou next. Nous permet de controler quand est-ce qu'il faudra defiler les numeros ou bien non.
let searchInput = document.querySelector("input[type='search'");
let productsCard = productsCardContainer.children;

let productNotFoundSvgHtml = productsCardContainer.children.item(productsCard.length - 1).outerHTML;



/* FUNCTIONS FUNCTIONS */

// Attache des event click au btn permettant de changer de page de produits
function attachEventProductContainerChildren(){
    productPageBtnList.forEach(elt =>{
        elt.addEventListener("click", function(e){
            if (elt != currentProductPageBtn){
                elt.classList.add("currentProductPageBtn");
                currentProductPageBtn.classList.remove("currentProductPageBtn");
                currentProductPageBtn = elt;
                let page = Number(currentProductPageBtn.textContent);
                // Recuperation des donnees de la pages de maniere asynchrone
                fetch(`http://127.0.0.1:8000/shop/products/data/${currentCategory}/${page}`)
                .then(response => response.json())
                .then(response => {
                    productsCardContainer.innerHTML = `${generateHtml(response)} ${productNotFoundSvgHtml}`;
                })
                .catch(error => alert("Oups! une erreur est survenu, veuillez reessayer."));
    
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });
    });
}
attachEventProductContainerChildren();
// I recreate the "filter" star, i mean mimic this with the following js function
function create_stars(num_stars){
    result = [];
    while (result.length < 5){
        if( num_stars >= 1 || num_stars >= 0.8 ){
            result.push(`<i class="fa-solid fa-star"></i>`);
            num_stars -= 1;
        }else if( 0.3 <= num_stars && num_stars <= 0.8 ){
            result.push(`<i class="fa-solid fa-star-half-stroke"></i>`);
            num_stars -= 1;
        }else{
            result.push(`<i class="fa-regular fa-star"></i>`);
            num_stars -= 1;
        }
    }

    return result.join(" ");
}
// Function use to generate html to display product data into screen, it will be use when we get asynchrounsly the data 
// from the server
function generateHtml(data){
    resultHtml = "";
    for (product of data ){
        resultHtml += `
            <div class = "productCard">
                <img src=" ${product.images[0] }" alt="images du produit">
                <div class = "starts"> 
                    ${create_stars(product.average_rating)}  
                </div>
                <h4> ${product.title.slice(0,60)}...</h4>
                <span> ${product.list_price[0] } $</span>
            </div> 
              `;
    }

    return resultHtml;
}




categoriesCheckBoxs.forEach(elt =>{
    elt.addEventListener('click', function(e){
        e.preventDefault();
        let num_cat = Number(elt.children[0].value);
        if(currentCategory != num_cat){
            categoriesCheckBoxs[currentCategory].children[0].checked = false;
            elt.children[0].checked = true;
            currentCategory = num_cat;

            // generateHtml a ete defini un peu plus bas
            fetch(`http://127.0.0.1:8000/shop/products/data/${currentCategory}/${1}`)
            .then(response => response.json())
            .then(response => {
                productsCardContainer.innerHTML = `${generateHtml(response)} ${productNotFoundSvgHtml}`;
                while(productBtnContainer.firstChild){
                    productBtnContainer.removeChild(productBtnContainer.lastChild);
                }
                let num_pages = response[0]["num_products_pages"];
                let i = 1;
                while( i <= num_pages){
                    if(i == 1){
                        productBtnContainer.innerHTML += `<button class = "currentProductPageBtn productPageBtn" type="button">01</button>`;
                        i++;
                    }else{
                        productBtnContainer.innerHTML += `<button class = "productPageBtn" type="button">0${i}</button>`;
                        i++;
                    }  
                }
                transformStep = 0
                i = 0
                currentProductPageBtn = document.querySelector(".productBtnContainer button:first-child");
                productPageBtnList = document.querySelectorAll(".productPageBtn");
                attachEventProductContainerChildren();
                
            })
            .catch(error => alert("Oups! une erreur est survenu, veuillez reessayer." + error));

            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    });
});


seePreviousProductPageBtn.addEventListener("click", e =>{
    if( Math.abs(i) < (productBtnContainer.children.length / 2 ) && productBtnContainer.children.length > 3 ){
        console.log(i)
        transformStep -= 38;
        i -= 1;
        productBtnContainer.style.transform = `translateX(${transformStep}px)`;
    }
});

seeNextProductPageBtn.addEventListener("click", e =>{
    if( i < 0 && productBtnContainer.children.length > 3){
        i += 1;
        transformStep += 38;
        productBtnContainer.style.transform = `translateX(${transformStep}px)`;
    }
});


searchInput.addEventListener("input", e =>{
    const inputValue = e.target.value.toLowerCase();
    let count = 0; //Compte le nombre de carte produit avec la classe hide

    Array.from(productsCard).forEach(card =>{
        let productTitle = card.querySelector("h4");
        if(productTitle){
            productTitle = productTitle.textContent.toLowerCase();
            let isVisible = productTitle.includes(inputValue);
            card.classList.toggle("hide",!isVisible);
            if(card.classList.contains("hide")){
                count++;
            }else{
                count--;
            }
        }
    });

    if(count == (productsCard.length - 1))
        productsCard.item(productsCard.length - 1).classList.remove("hide");
    else 
        productsCard.item(productsCard.length - 1).classList.add("hide");

});


