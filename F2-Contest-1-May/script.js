/** @format */

let arr = [
    { id: 1, name: "john", age: "18", marks: 80 },
    { id: 2, name: "jack", age: "20", marks: 85 },
    { id: 3, name: "karen", age: "19", marks: 35 },
  ];

  let currId = 4;
  
  function PrintStudentswithMap() {
    console.log('Students with marks over 50 using the .map');
    arr.map(student => {
        return student.marks > 50 && console.log(student);
    });
  }
  
  function PrintStudentsbyForEach() {
    console.log('Students with marks over 50 using the .forEach');
    arr.forEach(student => {
        return student.marks > 50 && console.log(student);
    });
  }
  
  function addData() {
    console.log('Added New Student');
    const newStudent = {id: currId++, name: "susan", age: "20", marks: 45};
    arr.push(newStudent);
    console.log(arr);
  }
  
  function removeFailedStudent() {
    console.log('Removed the student who has failed, i.e. with less than 50 marks');
    arr = arr.filter(student => {
        return student.marks >= 50;
    });
    console.log(arr);
  }
  
  function concatenateArray() {
    console.log('Created another array with 3 students and concatenated them');
    let anotherArr = [
        { id: currId+1, name: "Rita", age: "16", marks: 65 },
        { id: currId+2, name: "Yash", age: "17", marks: 90 },
        { id: currId+3, name: "Renu", age: "17", marks: 41 }
    ];

    let tempArr = [...arr, ...anotherArr];
    console.log(tempArr);
  }