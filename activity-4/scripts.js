//PART A
console.log("Part A");
let divEl = document.createElement('div');
let pEl = document.createElement('p');
const outputEl = document.getElementById("output");
console.log(divEl);
console.log(pEl);
divEl.style.width = '100px';
divEl.style.height = '30px';
divEl.style.backgroundColor = 'pink';
divEl.style.margin = '0 auto';
pEl.innerText = "This p tag is created in js.";
pEl.style.color = 'Orange';
outputEl.appendChild(pEl);
console.log(divEl);
console.log(pEl);
console.log("both elements are created but only the p element is appended");

//PART B
console.log("Part B");
pEl.style.color = 'Red';
console.log("changed the color of the p element to red.");
pEl.style.fontSize = '30px';
console.log("changed the font size of the p element to 30px.");
pEl.classList.add('redText');
console.log("added class redText to the p element");
pEl.classList.add('jsElement');
console.log("added class jsElement to the p element");
pEl.classList.remove('redText');
console.log("removed class redText to the p element");
console.log('p element contains redText class:' + pEl.classList.contains('redText'));
pEl.classList.toggle('redText');
console.log("toggled class redText to the p element");
console.log('p element contains redText class:' + pEl.classList.contains('redText'));
pEl.classList.toggle('redText');
console.log("toggled class redText to the p element");
console.log('p element contains redText class:' + pEl.classList.contains('redText'));
pEl.classList.toggle('redText');
console.log("toggled class redText to the p element");
console.log('p element contains redText class:' + pEl.classList.contains('redText'));
console.log(pEl);

//PART C
console.log("Part C");
let pEl2 = document.createElement('p');
pEl2.innerText = "Inserted before the div";
pEl2.style.color = 'lime';
outputEl.removeChild(pEl);
console.log(outputEl);
outputEl.appendChild(divEl);
outputEl.prepend(pEl);
outputEl.insertBefore(pEl2, divEl);
console.log(outputEl);


let totalTasks = 0;
let completedTasks = 0;
const totalTasksEl = document.getElementById('tasks-total');
totalTasksEl.innerText = "Total tasks: " + totalTasks;
const completedTasksEl = document.getElementById('tasks-completed');
completedTasksEl.innerText = "Completed tasks: " + completedTasks;


//PART D
console.log("Part D");
const ulEl = document.getElementById('todo-list');
const inputEl = document.getElementById("task-input");
function addTask() {
    let taskText = inputEl.value;
    console.log(taskText);
    if (taskText != "") {
        totalTasks++;
        totalTasksEl.innerText = "Total tasks: " + totalTasks;
        console.log("added task");
        let newListItemEl = document.createElement('li');
        newListItemEl.classList.add('pending');
        newListItemEl.setAttribute('onclick', "toggleTaskCompletion(this)");
        newListItemEl.innerText = taskText;
        ulEl.appendChild(newListItemEl);
        inputEl.value = "";
    }
}


//PART E
function toggleTaskCompletion(el) {
    console.log(el.classList);
    el.classList.toggle('done');
    el.classList.toggle('pending');
    if (el.classList.contains('done')) {
        completedTasks++;
    }
    else {
        completedTasks--;
    }
    completedTasksEl.innerText = "Completed tasks: " + completedTasks;
}