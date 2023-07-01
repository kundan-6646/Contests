
const updateNameForm = document.getElementById('updateNameForm');
const updatePasswordForm = document.getElementById('updatePasswordForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const oldPassword = document.getElementById('old-password');
const newPassword = document.getElementById('new-password');
const confirmNewPassword = document.getElementById('confirm-new-password');
const logOutBtn = document.getElementById('logout');

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

//setting logged in user data on profile
firstName.value = loggedInUser.firstName;
lastName.value = loggedInUser.lastName;

//update Name event
updateNameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    loggedInUser.firstName = firstName.value;
    loggedInUser.lastName = lastName.value;

    updateDataInLocal(loggedInUser)

});


//update password event
updatePasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if(oldPassword.value != loggedInUser.password) {
        alert('old password is wrong!');
        clearInput();
        return;
    }

    if(newPassword.value != confirmNewPassword.value) {
        alert('passwords are not matching!');
        clearInput();
        return;
    }

    loggedInUser.password = newPassword.value;

    clearInput();
    updateDataInLocal(loggedInUser)
});

//logout event
logOutBtn.addEventListener('click', () => {
    localStorage.setItem("loggedInUser", JSON.stringify({}));
    loginPage.click();
});


function updateDataInLocal(user) {
    const userArr = JSON.parse(localStorage.getItem("users")).userArr;
    for (let i = 0; i < userArr.length; i++) {
        const currUser = userArr[i];
        if(currUser.id == user.id) {
            userArr[i] = {...user};
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify({userArr}));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Profile Updated");
}

function clearInput() {
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
    oldPassword.focus();
}