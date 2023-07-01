const form = document.getElementsByClassName('signup-form')[0];
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const shopPage = document.getElementsByClassName('shop-page')[0];
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(password.value != confirmPassword.value) {
        alert("Passwords not matching, please enter correctly!");

        password.value = "";
        confirmPassword.value = "";
        password.focus();
        return;
    }
    const userArr = JSON.parse(localStorage.getItem("users")).userArr;

    const user = {
        id: userArr.length+1,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }

    userArr.push(user);
    localStorage.setItem("users", JSON.stringify({userArr}));
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    shopPage.click();
});
