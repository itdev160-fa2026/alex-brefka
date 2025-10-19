console.log('Part A');
logText("This is a function declaration. I am calling it before the function code.");

function logText(text) {
    console.log(text);
}


const logText2 = function (text) {
    console.log(text);
}

logText2("This is a function expression. Cannot access this before initialization.");

console.log("Arguments are what you pass into a function, like 'argument'");
const returnedValue = getFirstThree('argument');
console.log("The function returned: " + returnedValue);

function getFirstThree(param) {
    console.log("In my function I can add a parameter to store that argument so I can do stuff with it like print it out.");
    console.log("The functions parameter is: " + param);
    let firstThreeLetters = param.substring(0, 3);
    console.log("my function will return only the first three letters of the argument because I made a substring of the parameter.");
    return firstThreeLetters;
}


let global = "global";

function globalAndLocal() {
    let local = "local";
    console.log("This function can access both variables. " + global + " " + local);
}
globalAndLocal();
console.log("outside the function can only reference the global one because the local variable is out of scope.  " + global);

const arrowText = () => console.log("Arrow functions are an alternate way of making functions.");
arrowText();