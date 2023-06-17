let employees = [];
let employeeId = 1;

const employeesContainer = document.getElementsByClassName('employee-data-container')[0];
const employeeCardsContainer = document.getElementsByClassName('employee-data')[0];

const errorMsg = 'Error : Please Make sure All the fields are filled before adding in an employee !';
const successMsg = 'Success : Employee Added!';
const zeroEmployeesMsg = 'You have 0 Employees.';


//Function that triggers when addButton is clicked i.e, form submitted
const employeeForm = document.getElementById('emp_form');
const nameInput = document.getElementById('empName');
const professionInput = document.getElementById('empProfession');
const ageInput = document.getElementById('empAge');
employeeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let name = nameInput.value.trim();
    let profession = professionInput.value.trim();
    let age = ageInput.value.trim();

    if(name == '' || age == '' || profession == '') {
        alertUser(true);
        return;
    }

    addEmployee(name, profession, age);
    alertUser(false);
});



//this function adds new card to ui and appends new employee data on UI
function addEmployee(name, profession, age) {
    let newEmployee = {
        id: employeeId++,
        name, profession, age
    }

    employees.push(newEmployee);
    console.log(employees);

    //creating UI-card
    let div = document.createElement('div');
    div.setAttribute('data-emp-id', newEmployee.id);
    div.classList.add('employee-card');
    div.innerHTML = `<div class="emp-card-main">
        <span>${newEmployee.id}</span>
        <span>Name: ${newEmployee.name}</span>
        <span>Profession: ${newEmployee.profession}</span>
        <span>Age: ${newEmployee.age}</span>
    </div>
    <button class="delete-employee" onclick="removeThisEmployee(this)">Delete User</button>`;

    employeeCardsContainer.append(div);
    displayNoEmployee();
}


//remove Employee Function
function removeThisEmployee(emp) {
    const empId = emp.parentElement.getAttribute('data-emp-id');

    employees = employees.filter((employee) => {
        return employee.id != empId;
    });
    console.log(employees);
    emp.parentElement.remove();

    displayNoEmployee();
}

//Alert Function to display success and error
const alertContainer = document.getElementsByClassName('alert-container')[0];
function alertUser(isError) {
    let msg = '';
    let classToBeAdded = '';
    alertContainer.classList[1] != undefined ? alertContainer.classList.remove(alertContainer.classList[1]) : console.log('no-class');; 
    if(isError) {
        msg = errorMsg;
        classToBeAdded = 'error';

        if(nameInput.value.trim() == '') nameInput.focus();
        else if(professionInput.value.trim() == '') professionInput.focus();
        else ageInput.focus();
    }else {
        msg = successMsg;
        classToBeAdded = 'success';
    }
    alertContainer.innerText = msg;
    alertContainer.classList.add(classToBeAdded);
}


//when zero employees, display no employees text
const p = document.querySelector('p');
function displayNoEmployee() {
    if(employees.length == 0) p.innerText = zeroEmployeesMsg;
    else p.innerText = '';
};
displayNoEmployee();