//PART A
const formEl = document.getElementById("contactForm");
console.log(document.forms);
console.log(formEl.elements);

console.log(formEl.elements[0]);
console.log(formEl.elements["email"]);

console.log("The name property of the name input is: " + formEl.elements[0].name);
console.log("The type property of the email input is: " + formEl.elements["email"].type);

//PART B
const outputEl = document.getElementById("output");
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Must be at least 3 characters';
const button = document.createElement('button');
button.innerHTML = 'Submit';
const p = document.createElement('p');
outputEl.appendChild(input);
outputEl.appendChild(button);
outputEl.appendChild(p);

input.addEventListener('input', (e) => {
    console.log('Input event fired:', e);
    console.log('Current value:', e.target.value);
    if (e.target.value.trim().length >= 3) {
        e.target.style.borderColor = 'green';
    } else {
        e.target.style.borderColor = 'red';
    }
});
input.addEventListener('blur', (e) => {
    console.log('Blur event fired:', e);
    if (e.target.value.trim().length < 3) {
        p.innerHTML = 'Field is invalid!';
    }
    else {
        p.innerHTML = '';
    }
});
button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Button clicked event:', e);

    if (input.value.trim().length >= 3) {
        p.innerHTML = 'Good result!';
    } else {
        p.innerHTML = 'Please enter at least 3 characters.';
    }
});

//PART C
const errorEls = document.querySelectorAll(".error-message");
console.log(errorEls);
function validateFields(e) {
    if (e.target == formEl.elements["name"]) {
        if (formEl.elements["name"].value.trim() == "") {
            //name not entered
            formEl.elements["name"].classList.add("invalid");
            formEl.elements["name"].classList.remove("valid");
            errorEls[0].innerHTML = 'Name is required.';
            errorEls[0].classList.add('show');
        } else {
            //name is valid
            formEl.elements["name"].classList.remove("invalid");
            formEl.elements["name"].classList.add("valid");
            errorEls[0].innerHTML = '';
            errorEls[0].classList.remove('show');
        }
    } else if (e.target == formEl.elements["email"]) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formEl.elements["email"].value.trim() == "") {
            //email not entered
            formEl.elements["email"].classList.add("invalid");
            formEl.elements["email"].classList.remove("valid");
            errorEls[1].innerHTML = 'Email is required.';
            errorEls[1].classList.add('show');
        } else if (!emailPattern.test(formEl.elements["email"].value.trim())) {
            //email not valid format
            formEl.elements["email"].classList.add("invalid");
            formEl.elements["email"].classList.remove("valid");
            errorEls[1].innerHTML = 'Email is not valid.';
            errorEls[1].classList.add('show');
        } else {
            formEl.elements["email"].classList.remove("invalid");
            formEl.elements["email"].classList.add("valid");

            errorEls[1].innerHTML = '';
            errorEls[1].classList.remove('show');
        }
    } else if (e.target == formEl.elements["subject"]) {
        if (formEl.elements["subject"].value == "") {
            //subject not selected
            formEl.elements["subject"].classList.add("invalid");
            formEl.elements["subject"].classList.remove("valid");
            errorEls[2].innerHTML = 'Subject is required.';
            errorEls[2].classList.add('show');
        } else {
            formEl.elements["subject"].classList.remove("invalid");
            formEl.elements["subject"].classList.add("valid");
            errorEls[2].innerHTML = '';
            errorEls[2].classList.remove('show');

        }
    } else if (e.target == formEl.elements["message"]) {
        if (formEl.elements["message"].value.trim() == "") {
            //message not entered
            formEl.elements["message"].classList.add("invalid");
            formEl.elements["message"].classList.remove("valid");

            errorEls[3].innerHTML = 'Message is required.';
            errorEls[3].classList.add('show');
        } else if (formEl.elements["message"].value.trim().length < 10) {
            //message not long enough
            formEl.elements["message"].classList.add("invalid");
            formEl.elements["message"].classList.remove("valid");

            errorEls[3].innerHTML = 'Message is a minimum of 10 characters.';
            errorEls[3].classList.add('show');
        } else {
            formEl.elements["message"].classList.remove("invalid");
            formEl.elements["message"].classList.add("valid");

            errorEls[3].innerHTML = '';
            errorEls[3].classList.remove('show');
        }
    }

    //Update Submit button
    let count = 0;
    for (let i = 0; i < 4; i++) {
        if (formEl.elements[i].classList.contains("valid")) {
            count++;
        }
    }
    if (count == 4) {
        //All are validated
        formEl.elements[4].removeAttribute('disabled');
    } else {
        formEl.elements[4].setAttribute('disabled', true);
    }
}


formEl.elements["name"].addEventListener('input', validateFields);
formEl.elements["email"].addEventListener('input', validateFields);
formEl.elements["subject"].addEventListener('input', validateFields);
formEl.elements["message"].addEventListener('input', validateFields);
formEl.elements[4].addEventListener('click', submitForm);
formEl.elements[5].addEventListener('click', clearForm);

function submitForm(e) {
    e.preventDefault();
    const successEl = document.getElementById("formSuccess");
    successEl.classList.toggle("hidden");
    setTimeout(() => {
        successEl.classList.toggle("hidden");
    }, 5000);

    for (let i = 0; i < 4; i++) {
        console.log(formEl.elements[i].name + " = " + formEl.elements[i].value);
    }

    clearForm();
}

function clearForm() {
    formEl.elements[4].setAttribute('disabled', true);
    for (let i = 0; i < 4; i++) {
        formEl.elements[i].value = "";
        formEl.elements[i].classList.remove("valid");
        formEl.elements[i].classList.remove("invalid");
        errorEls[i].innerHTML = '';
        errorEls[i].classList.remove('show');
    }
}
