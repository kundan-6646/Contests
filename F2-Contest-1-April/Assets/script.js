const consoleBody = document.getElementById('console');
const allBtns = document.querySelectorAll('button');

allBtns.forEach(button => {
    button.addEventListener('click', () => {
        let id = button.getAttribute('id');
        
        if(id == 1 || id == 2) {
            let temp = arr.filter(obj => {
                return obj.profession === 'developer';
            });
            printInConsole(temp);
        }else if(id == 5) {
            printInConsole(mergedArr);
        }else {
            printInConsole(arr); 
        }
    })
});

function printInConsole(arr) {
    consoleBody.innerHTML = '';
    arr.forEach(element => {
        let div = document.createElement('div');
        div.innerText = JSON.stringify(element);
        consoleBody.appendChild(div);
    });
}


function viewAllEmployees() {
    printInConsole(arr);
    console.log(arr);
}