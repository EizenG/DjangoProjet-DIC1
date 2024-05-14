let plusIcon = document.querySelectorAll(".plus");
let moinsIcon = document.querySelectorAll(".moins");
let fraisSpan = document.getElementById("frais");
let taxeSpan = document.getElementById("taxe");
let totalSpan = document.getElementById("total");
let totalSpans = document.querySelectorAll(".total");
let finalPrice = document.getElementById("priceWithAllcharge");
let suppressBtns = document.querySelectorAll(".croix");
let userMessage = document.getElementById("userMessage");

let sum = 0;

totalSpans.forEach(item => {
    let price = item.firstChild.textContent;
    sum += Number(price);
});

let a = 0;
sum = Number(sum.toFixed(2));
totalSpan.innerHTML = `${sum} <span>$</span>`;
fraisSpan.innerHTML = `${Number((sum * 0.05).toFixed(2))} <span>$</span>`;
taxeSpan.innerHTML = `${Number((sum * 0.07).toFixed(2))} <span>$</span>`;
finalPrice.innerHTML = `${Number((sum *0.05 + sum * 0.07 + sum).toFixed(2))} <span>$</span>`;



plusIcon.forEach(elt =>{

    elt.addEventListener("click", e =>{
        num = Number(e.target.parentElement.children[1].textContent);
        let prixElt = elt.parentElement.previousElementSibling.firstChild;
        let totalElt = elt.parentElement.nextElementSibling;
        
        if (num <= 1000){
            num++;
            if (num <= 9){
                e.target.parentElement.children[1].innerText = `0${num}`;
            }else{
                e.target.parentElement.children[1].innerText = `${num}`;
            }
            totalElt.innerHTML = `${(Number(prixElt.textContent) * num).toFixed(2)} <span>$</span>`;
            let sum = 0;
            totalSpans.forEach(item => {
                let price = item.firstChild.textContent;
                sum += Number(price);
            });
            let a = 0;
            sum = Number(sum.toFixed(2));
            totalSpan.innerHTML = `${sum} <span>$</span>`;
            a = sum * 0.05;
            a = Number(a.toFixed(2));
            fraisSpan.innerHTML = `${a} <span>$</span>`;
            a = sum * 0.07;
            a = Number(a.toFixed(2));
            taxeSpan.innerHTML = `${a} <span>$</span>`;
            a = sum *0.05 + sum * 0.07 + sum;
            a = Number(a.toFixed(2));
            finalPrice.innerHTML = `${a} <span>$</span>`;
        }
    });
});

moinsIcon.forEach(elt =>{
    elt.addEventListener("click", e =>{
        num = Number(e.target.parentElement.children[1].textContent);
        let prixElt = elt.parentElement.previousElementSibling.firstChild;
        let totalElt = elt.parentElement.nextElementSibling;
        if (num >= 2){
            num--;
            if (num <= 9){
                e.target.parentElement.children[1].textContent = `0${num}`;
            }else{
                e.target.parentElement.children[1].textContent = `${num}`;
            }
            totalElt.innerHTML = `${(Number(prixElt.textContent) * num).toFixed(2)} <span>$</span>`;
            let sum = 0;
            totalSpans.forEach(item => {
                let price = item.firstChild.textContent;
                sum += Number(price);
            });
            let a = 0;
            sum = Number(sum.toFixed(2));
            totalSpan.innerHTML = `${sum} <span>$</span>`;
            a = sum * 0.05;
            a = Number(a.toFixed(2));
            fraisSpan.innerHTML = `${a} <span>$</span>`;
            a = sum * 0.07;
            a = Number(a.toFixed(2));
            taxeSpan.innerHTML = `${a} <span>$</span>`;
            a = sum *0.05 + sum * 0.07 + sum;
            a = Number(a.toFixed(2));
            finalPrice.innerHTML = `${a} <span>$</span>`;
        }
    });
});

suppressBtns.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        // Get element to suppress
        let produit = btn.parentElement;
        let asin = produit.classList[1];
        let prixSpan = produit.nextElementSibling;
        let compteur = prixSpan.nextElementSibling;
        let total = compteur.nextElementSibling;
        // Remove the product from DOM
        prixSpan.remove()
        compteur.remove();
        total.remove();
        produit.remove();

        let sum = 0;
        totalSpans.forEach(item => {
            let price = item.firstChild.textContent;
            sum += Number(price);
        });
        let a = 0;
        sum = Number(sum.toFixed(2));
        totalSpan.innerHTML = `${sum} <span>$</span>`;
        fraisSpan.innerHTML = `${Number((sum * 0.05).toFixed(2))} <span>$</span>`;
        taxeSpan.innerHTML = `${Number((sum * 0.07).toFixed(2))} <span>$</span>`;
        finalPrice.innerHTML = `${Number((sum *0.05 + sum * 0.07 + sum).toFixed(2))} <span>$</span>`;

        fetch(`http://127.0.0.1:8000/produit/deleteToCart/${asin}/`)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                userMessage.innerHTML = `
                <div class="alert alert-${Object.keys(response)[0]} alert-dismissible fade show" role="alert">
                <strong>${response.success}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            }else{
                userMessage.innerHTML = `
                <div class="alert alert-${Object.keys(response)[0]} alert-dismissible fade show" role="alert">
                <strong>${response.error}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            }
        })
        .catch(error => alert("Oups! une erreur est survenu, veuillez reessayer."));
        });
});