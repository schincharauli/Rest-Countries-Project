window.USER_TOKEN_KEY = "user_token";

class API {
    baseUrl = 'https://reqres.in/api';

    async fetchRequest(params, options = {}) {
      try {  
        const res = await fetch(`${this.baseUrl}${params.endpoint}`, options);
        const result = await res.json();

        return result;
        } catch(err) {
            console.error("[API.login]", err);
            return;
        }
        
    }

    async login(data){
        const request = this.buildRequest('login', data)
        
        try {
            const result = await this.fetchRequest(request.params, request.options);

        return result;
        } catch(err) {
            console.error("[API.login]", err);
        }
        
    }
    async register(){ }
 
    async listUSers() {
        const userToken = localStorage.getItem(window.USER_TOKEN_KEY);

        if(userToken){
            const params = {
                endpoint: '/users',
            };
    
            const options = {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                },
            };
        
            try {
                const result = await this.fetchRequest(params, options);
                return result;
            }  catch(err) {
                console.error("[API.login]", err);
            }

        }

        return;
    }

    buildRequest(action, data ){
        const params = {
        endpoint: "",
        };

        const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }, 
        body: null
        };

        if( action === 'login'){
            params.endpoint = '/login'
            options.body = this.stringify(data);
        }else if( action === 'listUsers' ) {
            options.headers['Authorization'] =
            `Bearer token`;
        }


        return {
            params,
            options,
        };
    }

    stringify(data){
        return JSON.stringify(data);
    }

    testAPI(){
        console.log("API Works");
    } 
}  

 class storage {
     constructor(){
         this.storage = localStorage;
     }
     store(key, value){
         this.storage.setItem(key, JSON.stringify(value));  
     }
     read(key){
         return JSON.parse(this.storage.getItem(key));
     }
     delete(key) {
         this.storage.removeItem(key);
     }
     clear(){
         this.storage.clear();
     }
 }

 function navigateToIndex() {
    location.replace("index.html");
}

function navgateToDashboard(token){
    storageService.store(window.USER_TOKEN_KEY, token);
    location.replace("dashboard.html");

}

window.Apiservice = new API(); 
window.storageService = new storage();

