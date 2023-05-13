/*  @printInConsole is a function Inside Assests/script.js, which prints res in UI console  */

let arr = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];


// console.log all the employees which have the profession of developer using the map function.
function PrintDeveloperbyMap() {
  let temp = arr.map((obj) => {
    return obj.profession === 'developer' && console.log(obj);
  });
}


//console.log all the employees which have the profession of developer using the for each function.
function PrintDeveloperbyForEach() {
  let temp = arr.forEach(obj => {
    return obj.profession === 'developer' && console.log(obj);
  });
}


//In this function make another such employee object and append that in this array. 
function addData() {
  const newObj =  {id: 4, name: "susan", age: "20", profession: "intern"};
  arr.push(newObj);

  console.log(arr);
}


//In this function remove the object where the profession is admin. console.log the changed array.
function removeAdmin() {
  arr = arr.filter(obj => {
    return obj.profession != 'admin';
  });

  console.log(arr);
}


//Make another array with 3 objects just like the one in the above given array.
let mergedArr = [];
function concatenateArray() {
  //Write your code here, just console.log
  let anotherArr = [
    { id: 6, name: "Rosie", age: "21", profession: "tester" },
    { id: 7, name: "Ryan", age: "20", profession: "developer" },
    { id: 8, name: "Andy", age: "28", profession: "admin" }
  ];

  mergedArr = [...arr, ... anotherArr];
  console.log(mergedArr);
}
