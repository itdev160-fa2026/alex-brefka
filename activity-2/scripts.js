console.log("PART A");
let adding = 8 + 4;
console.log("Add: 8 + 4 = " + adding);
let subtracting = 9 - 5;
console.log("Subtract: 9 - 5 = " + subtracting);
let multiplying = 6 * 6;
console.log("Multiply: 6 * 6 = " + multiplying);
let dividing = 18 / 3;
console.log("Divide: 18 / 3 = " + dividing);
let modulus = 10 % 3;
console.log("Modulus: 10 % 3 = " + modulus);
let precedence1 = 72 / 9 - 3 * 2; //2
console.log("Will divide first, then multiply, then subtract: 72 / 9 - 3 * 2 = " + precedence1);
let precedence2 = 72 / (9 - 3) * 2; //24
console.log("Will subtract first because it's in parenthesis, then divide, then multiply: 72 / 9 - 3 * 2 = " + precedence2);

console.log("PART B");
let equalsEquals = 3 == "3";
console.log("double equals: 3 == \"3\" = " + equalsEquals);
let equalsEqualsEquals = 5 === 5;
console.log("triple equals: 5 === 5 = " + equalsEqualsEquals);
let notEquals = 4 != 2;
console.log("not equals: 4 != 2 = " + notEquals);
let notEqualsEquals = 9 !== 8; //not equal or not equal type
console.log("not double equals: 9 !== 8 = " + notEqualsEquals);
let greater = 8 > 7;
console.log("greater than: 8 > 7 = " + greater);
let less = 2 < 6;
console.log("less than: 2 < 6 = " + less);
let greaterEqual = 4 >= 4;
console.log("greater than or equal to: 4 >= 4 = " + greaterEqual);
let lessEqual = 9 <= 11;
console.log("less than or equal to: 9 <= 11 = " + lessEqual);
let equalsEquals1 = 7 == "7";
console.log("== they have the same values not dependent on data type: 7 == \"7\" = " + equalsEquals1);
let equalsEqualsEquals1 = 7 === "7";
console.log("=== needs to be the same data type: 7 === \"7\" = " + equalsEqualsEquals1);

console.log("PART C");
let and = 33 > 8 && 2 != 2;
console.log("AND: 33 > 8 && 2 != 2 = " + and);
let or = 21 < 19 || 2 === 2;
console.log("OR: 21 < 19 || 2 == 2 = " + or);
let not = !(4 == 6);
console.log("NOT: !(4 == 6) = " + not);
console.log("AND");
console.log("comparison 1 comparison 2 output");
console.log("    true        false     false");
console.log("    false       true      false");
console.log("    false       false     false");
console.log("    true        true      true");
console.log("OR");
console.log("comparison 1 comparison 2 output");
console.log("    true        false     true");
console.log("    false       true      true");
console.log("    false       false     false");
console.log("    true        true      true");
console.log("NOT");
console.log("comparison output");
console.log("  true     false");
console.log("  false     true");

console.log("PART D");
let number = 67;
let outputMessage;
if (number < 0) {
    outputMessage = "number is negative";
}
else if (number <= 9) {
    outputMessage = "number is 1 digit long";
}
else if (number <= 99) {
    outputMessage = "number is 2 digits long";
}
else {
    outputMessage = "number is 3 or more digits long";
}
console.log("number: " + number + "\n" + outputMessage);
document.getElementById("output").innerText += `\n\nPart D\nnumber: ${number} and ${outputMessage}`;

console.log("PART E");
let day = "Friday";
console.log("Day: " + day);
switch (day) {
    case "Sunday":
        console.log("It is Sunday");
        break;
    case "Monday":
        console.log("It is Monday");
        break;
    case "Tuesday":
        console.log("It is Tuesday");
        break;
    case "Wednesday":
        console.log("It is Wednesday");
        break;
    case "Thursday":
        console.log("It is Thursday");
        break;
    case "Friday":
        console.log("It is Friday");
        break;
    case "Saturday":
        console.log("It is Saturday");
        break;
    default:
        console.log("No day found");
}

//PART F
function checkAge() {
    let age = document.getElementById("ageInput").value;
    if (document.getElementById("result").classList.length > 0) {
        document.getElementById("result").classList.remove(document.getElementById("result").classList[0]);
    }
    if (age == "") {
        document.getElementById("result").classList.add("invalid");
        document.getElementById("result").innerText = "Invalid age - please enter a number";
    }
    else if (age < 0 || age > 150) {
        document.getElementById("result").classList.add("invalid");
        document.getElementById("result").innerText = "Invalid age - please enter a realistic age";
    }
    else if (age < 18) {
        document.getElementById("result").classList.add("minor");
        document.getElementById("result").innerText = "You are a minor";
    }
    else if (age >= 18) {
        document.getElementById("result").classList.add("adult");
        document.getElementById("result").innerText = "You are an adult";
    }
}