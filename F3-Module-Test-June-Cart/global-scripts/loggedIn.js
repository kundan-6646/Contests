const loginPage = document.getElementsByClassName('login-page')[0];
if(!localStorage.getItem("loggedInUser") || isEmpty(JSON.parse(localStorage.getItem("loggedInUser")))) {
    loginPage.click();
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
