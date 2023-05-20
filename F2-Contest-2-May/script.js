let users = [
    {id: 1, name: "john", age: "18", profession: "developer"},
    {id: 2, name: "jack", age: "20", profession: "developer"},
    {id: 3, name: "karen", age: "19", profession: "admin"}
];

let currProfession = ['developer', 'admin'];

//adding all users data in UI when web loads
let dataContainer = document.getElementById('data');
users.forEach(user => {
    adduserToUI(user);
});

function adduserToUI(user) {
    let div = document.createElement('div');
    div.setAttribute('data-profession', user.profession);
    div.classList.add('card');

    div.innerHTML = `<span>${user.id}.</span>
    <span><span class="highlight">Name:</span> ${user.name}</span>
    <span><span class="highlight">Profession:</span> ${user.profession}</span>
    <span><span class="highlight">Age:</span> ${user.age}</span>`;

    dataContainer.appendChild(div);
}



//adding eventlistener on filter btn click
let filterBtn = document.getElementById('filter');
filterBtn.addEventListener('click', () => {
    let filter = document.getElementById('profession').value;

    if(filter === 'none') {
        alert('Please select a profession');
        return;
    }
    applyFilter(filter);
});

//filter function (param: filterValue)
function applyFilter(filterValue) {
    //removing hide class from all cards
    let allUsercards = document.querySelectorAll('.card');
    allUsercards.forEach(c => {
        c.classList.remove('hide');
    });

    //hiding cards which don't have same profession as filter profession value
    if(filterValue != null) {
        let usersToHide = [...allUsercards].filter(c => {
            return c.getAttribute('data-profession') != filterValue; //filter function use
        });

       
        usersToHide.forEach(u => {
            u.classList.add('hide');
        });
    }
}


//add new user logic
let addUserBtn = document.getElementById('add');
add.addEventListener('click', function(e) {
    let name = document.getElementById('name_input').value;
    let profession = document.getElementById('profession_input').value;
    let age = document.getElementById('age_input').value;

    name = name.trim();
    name = name.toLowerCase();
    profession = profession.trim();
    profession = profession.toLowerCase();

    if(name == undefined || name == null || profession == undefined || profession == null || age <= 0 || age >= 100 || age == null || age == undefined) {
        alert('please enter valid data');
        return;
    }

    //adding new userto UI
    adduserToUI({id: users.length+1, name: name, age: age, profession: profession})

    //checking profession value is new or not
    if(isNew(profession)) {
        currProfession.push(profession);
        //adding new proffesion in UI dropdown
        let newOption = document.createElement('option');
        newOption.value = profession;
        newOption.innerText = profession.charAt(0).toUpperCase() + profession.substring(1);

        document.getElementById('profession').appendChild(newOption);
    }

    //displaying all users when new user is added
    applyFilter(null);
    document.getElementById('profession').value = 'none';
});

//function to check profession is new or existing
function isNew(profession) {
    for (let i = 0; i < currProfession.length; i++) {
        if(currProfession[i] === profession) return false;
    }

    return true;
}
