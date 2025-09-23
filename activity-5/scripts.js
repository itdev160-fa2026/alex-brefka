//PART A
let testButton = document.createElement('button');
testButton.style.backgroundColor = 'rgb(113, 113, 255)';
testButton.textContent = 'events';
document.getElementById('output').append(testButton);
testButton.addEventListener("click", displayEventTargets);
testButton.addEventListener("mouseover", displayEventTargets);
testButton.addEventListener("mouseout", displayEventTargets);


let testButton2 = document.createElement('button');
testButton2.style.backgroundColor = 'rgb(113, 113, 255)';
testButton2.textContent = 'onclicks';
document.getElementById('output').append(testButton2);
testButton2.setAttribute("onclick", "displayEventTargets(event)");
testButton2.setAttribute("onmouseover", "displayEventTargets(event)");
testButton2.setAttribute("onmouseout", "displayEventTargets(event)");

function displayEvents(event) {
    if (event.type == "mouseover") {
        console.log("mouseover event!");
    } else if (event.type == "mouseout") {
        console.log("mouserout event!");
    } else if (event.type == "click") {
        console.log("click event!");
    }
    console.log(event);
}

//PART B
function displayEventTargets(event) {
    displayEvents(event);
    console.log(event.type);
    console.log(event.target);
    console.log(event.currentTarget);
}

//PART C AND D
const inputEl = document.getElementById('number1');
const inputEl2 = document.getElementById('number2');
const resultEl = document.getElementById('result');

document.getElementById('add-button').addEventListener("click", add);
function add() {
    console.log("Add button clicked!");
    let num1 = inputEl.value;
    let num2 = inputEl2.value;
    if (num1 != "" && num2 != "") {
        let answer = parseInt(num1) + parseInt(num2);
        resultEl.innerText = "Result: " + answer;
    }
    else {
        resultEl.innerText = "Enter a number in both inputs";
    }
    resultEl.style.color = 'rgb(113, 113, 255)';
    setTimeout(function () {
        resultEl.style.color = 'white';
    }, 200);
}

document.getElementById('subtract-button').addEventListener("click", subtract);
function subtract() {
    console.log("Subtract button clicked!");
    let num1 = inputEl.value;
    let num2 = inputEl2.value;
    if (num1 != "" && num2 != "") {
        let answer = parseInt(num1) - parseInt(num2);
        resultEl.innerText = "Result: " + answer;
    }
    else {
        resultEl.innerText = "Enter a number in both inputs";
    }
    resultEl.style.color = 'rgb(113, 113, 255)';
    setTimeout(function () {
        resultEl.style.color = 'white';
    }, 200);
}

document.getElementById('multiply-button').addEventListener("click", multiply);
function multiply() {
    console.log("Multiply button clicked!");
    let num1 = inputEl.value;
    let num2 = inputEl2.value;
    if (num1 != "" && num2 != "") {
        let answer = parseInt(num1) * parseInt(num2);
        resultEl.innerText = "Result: " + answer;
    }
    else {
        resultEl.innerText = "Enter a number in both inputs";
    }
    resultEl.style.color = 'rgb(113, 113, 255)';
    setTimeout(function () {
        resultEl.style.color = 'white';
    }, 200);
}

document.getElementById('divide-button').addEventListener("click", divide);
function divide() {
    console.log("Divide button clicked!");
    let num1 = inputEl.value;
    let num2 = inputEl2.value;
    if (num1 != "" && num2 != "") {
        if (num2 != 0) {
            let answer = parseInt(num1) / parseInt(num2);
            resultEl.innerText = "Result: " + answer;
        } else {
            resultEl.innerText = "Can't divide by 0";
        }
    }
    else {
        resultEl.innerText = "Enter a number in both inputs";
    }
    resultEl.style.color = 'rgb(113, 113, 255)';
    setTimeout(function () {
        resultEl.style.color = 'white';
    }, 200);
}