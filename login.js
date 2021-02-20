
const loginForm = document.getElementById('loginForm');
const {storageService, Apiservice} = window;
const userToken = storageService.read(window.USER_TOKEN_KEY); 


if(userToken) {
    navgateToDashboard(userToken);
}
      

const onSubmit = async (event) => {
    event.preventDefault();
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');
    const rememberMe = document.getElementById('remember-me');

    const errors = [];

    if(inputEmail.value === ''){
        errors.push("email is missing");
    }
    if(inputPassword.value === ''){
        errors.push("password is missing");
    }
    if(errors.length){
        console.log(errors);
        return;  
    }

    const loginData = {
       email: inputEmail.value, 
       password: inputPassword.value
    };

    const result = await Apiservice.login(loginData);
    if (result && result.token) {
        navgateToDashboard(result.token);
    }
    };

    function navgateToDashboard(token){
        storageService.store(window.USER_TOKEN_KEY, token);
        location.replace("dashboard.html");
    
    }


loginForm.addEventListener("submit", onSubmit);