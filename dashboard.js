const signOutButton = document.getElementById('signOutButton');
const {storageService, Apiservice} = window;
const userToken = storageService.read(window.USER_TOKEN_KEY);

if(!userToken) {
    navigateToIndex();
}

signOutButton.addEventListener("click", () => {
    storageService.delete(window.USER_TOKEN_KEY);
    navigateToIndex(); 
});

