
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginForm = document.querySelector('.login-form');
const shopPage = document.getElementsByClassName('shop-page')[0];

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //checking email and password
    const userArr = JSON.parse(localStorage.getItem("users")).userArr;
    for (let i = 0; i < userArr.length; i++) {
        const user = userArr[i];
        if(user.email == email.value) {
            //user found
            if(user.password != password.value) {
                alert('Wrong password!');
                return;
            }else {
                //correct password
                localStorage.setItem("loggedInUser", JSON.stringify({...user}));
                shopPage.click();

                return;
            }
        }
    }


    alert('Email not found!');
});