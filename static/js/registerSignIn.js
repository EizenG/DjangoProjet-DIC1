let registerH2 = document.querySelector("#formContainer > div h2:last-child");
let signInH2 = document.querySelector("#formContainer > div h2:first-child");
let registerForm = document.querySelector("#formContainer form:nth-child(2)");
let signInForm = document.querySelector("#formContainer form:last-child");
let passwordEyeIcons = document.querySelectorAll(".passwordInput img");
let passwordInputs = document.querySelectorAll(".passwordInput input");


registerH2.addEventListener( "click", (e) => {
    registerForm.classList.remove("hidden");
    signInForm.classList.add( "hidden" );
    registerH2.classList.add("currentForm");
    signInH2.classList.remove("currentForm");
    document.cookie = "type=register";
});


signInH2.addEventListener( "click", (e) => {
    registerForm.classList.add("hidden");
    signInForm.classList.remove( "hidden" );
    registerH2.classList.remove("currentForm");
    signInH2.classList.add("currentForm");
    document.cookie = "type=signIn";
});

passwordEyeIcons.forEach((elt,idx) => {
    elt.addEventListener("click", e =>{
        if (passwordInputs[idx].getAttribute("type") == "password"){
            elt.setAttribute("src","/static/img/eye-slash-regular.svg");
            passwordInputs[idx].setAttribute("type","text");
        }else{
            elt.setAttribute("src","/static/img/eye-regular.svg");
            passwordInputs[idx].setAttribute("type","password");
        }
    });
});