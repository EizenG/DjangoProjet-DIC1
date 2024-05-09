let plusIcon = document.querySelectorAll(".plus");
let moinsIcon = document.querySelectorAll(".moins");


plusIcon.forEach(elt =>{
    elt.addEventListener("click", e =>{
        num = Number(e.target.parentElement.children[1].textContent);
        if (num <= 1000){
            num++;
            if (num <= 9){
                e.target.parentElement.children[1].textContent = `0${num}`;
            }else{
                e.target.parentElement.children[1].textContent = `${num}`;
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