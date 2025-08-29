console.log("Hello, World!");

document.getElementById("output").innerHTML = "Hello, World!";

let studentName = "Alex";
const age = 19;
let isStudent = true;
let emptyValue = null;
let notAssigned;

console.log("student name: " + studentName + ". It is a variable type of " + typeof studentName);
console.log("student age: " + age + ". It is a variable type of " + typeof age);
console.log("student status: " + isStudent + ". It is a variable type of " + typeof isStudent);
console.log("empty value: " + emptyValue + ". It is a variable type of " + typeof emptyValue);
console.log("not assigned: " + notAssigned + ". It is a variable type of " + typeof notAssigned);

studentName = "Al";
console.log("updated student name: " + studentName);
//age = 20; can't reassign constant variables
