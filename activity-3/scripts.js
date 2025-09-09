//PART A
const greetingMessageEl = document.getElementById("greeting-message");
const querySelect = document.querySelector(".card-container");
const querySelectAll = document.querySelectorAll(".controls");
console.log("PART A");
console.log(greetingMessageEl);
console.log(querySelect);
console.log(querySelectAll);

//PART B
console.log("PART B");
console.log(querySelect.textContent);
console.log(querySelect.innerHTML);
greetingMessageEl.textContent = "Welcome!";
console.log(querySelect.textContent);
document.getElementById("output").textContent = "Open the console to view all the DOM Manipulations";

//PART C
console.log("PART C");
const greetingImageEl = document.getElementById("greeting-image");
console.log("alt: " + greetingImageEl.getAttribute("alt"));
greetingImageEl.removeAttribute("alt");
console.log("alt: " + greetingImageEl.getAttribute("alt"));
greetingImageEl.setAttribute("alt", "Welcome greeting");
console.log("alt: " + greetingImageEl.getAttribute("alt"));
greetingImageEl.setAttribute("src", "https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
console.log("id: " + greetingImageEl.getAttribute("id"));
greetingImageEl.setAttribute("id", "greeting-picture");
console.log("id: " + greetingImageEl.getAttribute("id"));
greetingImageEl.setAttribute("id", "greeting-image");
console.log("id: " + greetingImageEl.getAttribute("id"));

//PART D
const greetings = [
    {
        message: "Welcome!",
        image: "https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Welcome greeting"
    },
    {
        message: "Happy Birthday!",
        image: "https://cdn.pixabay.com/photo/2016/07/27/13/05/birthday-1545224_1280.jpg",
        alt: "Birthday greeting"
    },
    {
        message: "Happy Easter!",
        image: "https://cdn.pixabay.com/photo/2021/03/23/02/07/happy-easter-6116138_1280.jpg",
        alt: "Easter greeting"
    },
    {
        message: "Merry Christmas!",
        image: "https://cdn.pixabay.com/photo/2019/11/28/12/58/christmas-4659102_1280.jpg",
        alt: "Christmas greeting"
    }
];

let index = 0;

function changeGreeting(direction) {
    if (direction == "forward") {
        if (index == greetings.length - 1) {
            index = 0;
        } else {
            index++;
        }
    }
    else if (direction == "back") {
        if (index == 0) {
            index = greetings.length - 1;
        } else {
            index--;
        }
    }
    else {
        //random
        let randomNumber = Math.floor(Math.random() * greetings.length);
        while (index == randomNumber) {
            //reselect if it is the current greeting
            randomNumber = Math.floor(Math.random() * greetings.length);
        }
        index = randomNumber;
        console.log("Randomized Greeting");
    }
    //updates the message with the name if there is one
    addedName();
    console.log("The greeting has been updated to " + greetingMessageEl.textContent);

    greetingImageEl.setAttribute("src", greetings[index].image);
    greetingImageEl.setAttribute("alt", greetings[index].alt);
}

//PART E
const inputEl = document.querySelector("#personalizedName");

function addedName() {
    if (inputEl.value == "") {
        greetingMessageEl.textContent = greetings[index].message;
    }
    else {
        greetingMessageEl.textContent = greetings[index].message.substring(0, greetings[index].message.length - 1) + " " + inputEl.value + "!";
    }
    console.log(inputEl.value);
}