
let totalTasks = 0;
let completedTasks = 0;
const todoContainerEl = document.querySelector('.todo-container');
const totalTasksEl = document.getElementById('tasks-total');
totalTasksEl.innerText = "Total tasks: " + totalTasks;
const completedTasksEl = document.getElementById('tasks-completed');
completedTasksEl.innerText = "Completed tasks: " + completedTasks;
const emptyTaskEl = document.getElementById('emptyState');
const addTaskBtnEl = document.getElementById("add-task");
addTaskBtnEl.addEventListener('click', addTask);
const ulEl = document.getElementById('todo-list');
const inputEl = document.getElementById("task-input");
function addTask() {
    let taskText = inputEl.value;
    if (taskText != "") {
        //Add Task
        totalTasks++;
        totalTasksEl.innerText = "Total tasks: " + totalTasks;
        console.log("added task");
        createTaskElement(taskText);
        //update filter
        filter();
        emptyTaskEl.style.display = 'none';
    }
}

//Editing tasks
let currentEditingLi;
const popUpEl = document.getElementById("edit-pop-up");
const updateInputEl = document.getElementById('updateTask');
const updatePrioritySelectEl = document.getElementById('updatePrioritySelect');
const updateButtonEl = document.getElementById('updateEditButton');
updateButtonEl.addEventListener('click', () => {
    if (updateInputEl.value != "") {
        //updates Priority if changed
        if (updatePrioritySelectEl.value != currentEditingLi.children[1].children[0].classList[1]) {
            currentEditingLi.children[1].children[0].classList.remove('priority-high');
            currentEditingLi.children[1].children[0].classList.remove('priority-medium');
            currentEditingLi.children[1].children[0].classList.remove('priority-low');
            let placed = false;
            if (updatePrioritySelectEl.value == "priority-high") {
                currentEditingLi.children[1].children[0].classList.add('priority-high');
                //right before all mediums
                for (let i = 0; i < ulEl.children.length; i++) {
                    if (placed == false && ulEl.children[i].children[1].children[0].classList.contains("priority-medium")) {
                        ulEl.insertBefore(currentEditingLi, ulEl.children[i]);
                        placed = true;
                    }
                }
                //if no mediums place before all lows
                if (placed == false) {
                    for (let i = 0; i < ulEl.children.length; i++) {
                        if (placed == false && ulEl.children[i].children[1].children[0].classList.contains("priority-low")) {
                            ulEl.insertBefore(currentEditingLi, ulEl.children[i]);
                            placed = true;
                        }
                    }
                }
                if (!placed) { ulEl.appendChild(currentEditingLi); }
            }
            else if (updatePrioritySelectEl.value == "priority-medium") {
                currentEditingLi.children[1].children[0].classList.add('priority-medium');
                //***MAKE APPEND AFTERS*/
                //if no mediums place before all lows
                if (placed == false) {
                    for (let i = 0; i < ulEl.children.length; i++) {
                        if (placed == false && ulEl.children[i].children[1].children[0].classList.contains("priority-low")) {
                            ulEl.insertBefore(currentEditingLi, ulEl.children[i]);
                            placed = true;
                        }
                    }
                }
                if (!placed) { ulEl.appendChild(currentEditingLi); }
            }
            else {
                currentEditingLi.children[1].children[0].classList.add('priority-low');
                if (!placed) { ulEl.appendChild(currentEditingLi); }
            }
        }
        //updates task text
        currentEditingLi.children[0].innerHTML = updateInputEl.value;
        //hides menu
        hideEditMenu();
    }
});
const cancelButtonEl = document.getElementById('cancelEditButton');
cancelButtonEl.addEventListener('click', hideEditMenu);

function hideEditMenu() {
    //allows for scrolling
    todoContainerEl.style.overflow = 'auto';
    toggleVisibilityForAllTasks();
    //hides editing menu
    popUpEl.style.display = "none";
    //show the li
    currentEditingLi.style.visibility = 'visible';

    //resets the input field
    updateInputEl.value = "";
    //resets the selected priority
    updatePrioritySelectEl.children[0].removeAttribute('selected');
    updatePrioritySelectEl.children[1].removeAttribute('selected');
    updatePrioritySelectEl.children[2].removeAttribute('selected');

}

//creating tasks
function createTaskElement(task) {
    //creates task li
    let newListItemEl = document.createElement('li');
    //creates the text
    let itemTextEl = document.createElement('p');
    itemTextEl.innerHTML = task;
    newListItemEl.appendChild(itemTextEl);
    //Adds the edit task event listener
    newListItemEl.addEventListener('dblclick', (e) => {
        //stops the buttons from triggering edit
        if (e.target.type != 'submit') {
            const editTextEl = document.getElementById('editText');
            //doesn't matter where the click on the li, it will update the text and priority without an error
            let found = false;
            for (let i = 0; i < ulEl.children.length; i++) {
                if (ulEl.children[i] == e.target) {
                    found = true;
                }
            }
            if (found) {
                //e.target is li
                currentEditingLi = e.target;
            }
            else {
                //e.target is p or div or priority box
                if (e.target.classList.contains('task-priority')) {
                    currentEditingLi = e.target.parentElement.parentElement;
                } else {
                    currentEditingLi = e.target.parentElement;
                }
            }
            //hide the li
            currentEditingLi.style.visibility = 'hidden';
            //update the edit task display
            editTextEl.innerHTML = "Editing task: " + currentEditingLi.children[0].innerHTML;
            //update text to be in the input field
            updateInputEl.value = currentEditingLi.children[0].innerHTML;
            //update the priority dropdown to be the current one
            if (currentEditingLi.children[1].children[0].classList.contains('priority-high')) {
                updatePrioritySelectEl.children[0].setAttribute('selected', "");
            }
            else if (currentEditingLi.children[1].children[0].classList.contains('priority-medium')) {
                updatePrioritySelectEl.children[1].setAttribute('selected', "");
            }
            else {
                updatePrioritySelectEl.children[2].setAttribute('selected', "");
            }
            //hides overflow
            todoContainerEl.style.overflow = 'hidden';
            toggleVisibilityForAllTasks();
            //shows the menu
            popUpEl.style.display = "flex";
        }
    });
    newListItemEl.classList.add("task-item");
    inputEl.value = "";

    //creates div for buttons and priority indicator
    let taskDivEl = document.createElement('div');
    taskDivEl.classList.add("task-actions");
    newListItemEl.appendChild(taskDivEl);

    let priorityEl = document.createElement('div');
    priorityEl.classList.add('task-priority');
    const priorityDropdownEl = document.getElementById('prioritySelect');
    console.log(priorityDropdownEl.value);
    //appends the list item based on its priority
    let placed = false;
    switch (priorityDropdownEl.value) {
        case "high":
            priorityEl.classList.add('priority-high');
            //right before all mediums
            for (let i = 0; i < ulEl.children.length; i++) {
                if (placed == false && ulEl.children[i].children[1].children[0].classList.contains("priority-medium")) {
                    ulEl.insertBefore(newListItemEl, ulEl.children[i]);
                    placed = true;
                }
            }
            //if no mediums place before all lows
            if (placed == false) {
                for (let i = 0; i < ulEl.children.length; i++) {
                    if (placed == false && ulEl.children[i].children[1].children[0].classList.contains("priority-low")) {
                        ulEl.insertBefore(newListItemEl, ulEl.children[i]);
                        placed = true;
                    }
                }
            }
            if (!placed) { ulEl.appendChild(newListItemEl); }
            break;
        case "medium":
            priorityEl.classList.add('priority-medium');
            //right before all lows
            for (let i = 0; i < ulEl.children.length; i++) {
                if (placed == false && ulEl.children[i].children[1].children[0].classList.contains("priority-low")) {
                    ulEl.insertBefore(newListItemEl, ulEl.children[i]);
                    placed = true;
                }
            }
            if (!placed) { ulEl.appendChild(newListItemEl); }
            break;
        case "low":
            priorityEl.classList.add('priority-low');
            //always at end
            ulEl.appendChild(newListItemEl);
            break;
    }

    taskDivEl.appendChild(priorityEl);

    //creates task buttons
    let toggleButtonEl = document.createElement('button');
    toggleButtonEl.innerHTML = "Complete";
    toggleButtonEl.addEventListener('click', toggleTaskCompletion);
    taskDivEl.appendChild(toggleButtonEl);

    let deleteButtonEl = document.createElement('button');
    deleteButtonEl.innerHTML = "Delete";
    deleteButtonEl.addEventListener('click', deleteTask);
    taskDivEl.appendChild(deleteButtonEl);


}

function toggleTaskCompletion(el) {
    el.target.parentElement.parentElement.classList.toggle("completed");
    if (el.target.parentElement.parentElement.classList.contains("completed")) {
        completedTasks++;
    }
    else {
        completedTasks--;
    }
    completedTasksEl.innerText = "Completed tasks: " + completedTasks;

    //update filter
    filter();
    console.log("toggled completion");
}

function deleteTask(e) {
    //update stats
    totalTasks--;
    if (e.target.parentElement.parentElement.classList.contains("completed")) {
        completedTasks--;
        completedTasksEl.innerText = "Completed tasks: " + completedTasks;
    }
    totalTasksEl.innerText = "Total tasks: " + totalTasks;
    //remove li
    e.target.parentElement.parentElement.remove();
    //display the empty list text
    if (ulEl.children.length == 0) {
        emptyTaskEl.style.display = 'block';
    }
    console.log("deleted task");
}

//FILTER OPTIONS
const filterButtonsEl = document.querySelector('.filter-buttons');
const allFilterEl = filterButtonsEl.children[0];
const pendingFilterEl = filterButtonsEl.children[1];
const completedFilterEl = filterButtonsEl.children[2];

allFilterEl.addEventListener('click', (e) => {
    changeFilterActive(e);
    filter();
});

pendingFilterEl.addEventListener('click', (e) => {
    changeFilterActive(e);
    filter();
});

completedFilterEl.addEventListener('click', (e) => {
    changeFilterActive(e);
    filter();
});

function changeFilterActive(e) {
    //change the class
    allFilterEl.classList.remove('active');
    pendingFilterEl.classList.remove('active');
    completedFilterEl.classList.remove('active');
    e.target.classList.add('active');
}

function filter() {
    let activeButtonEl;
    for (let i = 0; i < filterButtonsEl.children.length; i++) {
        if (filterButtonsEl.children[i].classList.contains('active')) {
            activeButtonEl = filterButtonsEl.children[i];
        }
    }
    console.log(activeButtonEl.getAttribute('data-filter'));
    for (let i = 0; i < ulEl.children.length; i++) {
        if (activeButtonEl.getAttribute('data-filter') == "all") {
            ulEl.children[i].style.display = "block";
        }
        else if (activeButtonEl.getAttribute('data-filter') == "pending") {
            if (ulEl.children[i].classList.contains('completed')) {
                ulEl.children[i].style.display = "none";
            }
            else {
                ulEl.children[i].style.display = "block";
            }
        }
        else {
            if (ulEl.children[i].classList.contains('completed')) {
                ulEl.children[i].style.display = "block";
            }
            else {
                ulEl.children[i].style.display = "none";
            }
        }
    }
}

//BULK ACTIONS
const bulkButtonsEl = document.querySelector('.bulk-actions');
const allDoneEl = bulkButtonsEl.children[1];
const deleteDoneEl = bulkButtonsEl.children[2];
const clearAllEl = bulkButtonsEl.children[3];

//menu items
const newDiv = document.createElement('div');
newDiv.classList.add('pop-up');
const confirmButton = document.createElement('button');
confirmButton.innerHTML = "Delete";
const backButton = document.createElement('button');
backButton.innerHTML = "Cancel";
const deleteText = document.createElement('p');
newDiv.appendChild(deleteText);
newDiv.appendChild(confirmButton);
newDiv.appendChild(backButton);
todoContainerEl.insertBefore(newDiv, todoContainerEl.children[0]);

backButton.addEventListener('click', () => {
    newDiv.style.display = "none";
    //show everything
    todoContainerEl.style.overflow = 'auto';
    toggleVisibilityForAllTasks();
});
confirmButton.addEventListener('click', () => {
    newDiv.style.display = "none";
    if (deleteText.innerHTML == "Are you sure that you want to delete the COMPLETED tasks?") {
        // delete completed
        console.log('deleted completed');
        for (let i = 0; i < ulEl.children.length; i++) {
            if (ulEl.children[i].classList.contains('completed')) {
                ulEl.children[i].remove();
                i--;
                completedTasks--;
                totalTasks--;
            }
        }
        completedTasksEl.innerText = "Completed tasks: " + completedTasks;
        totalTasksEl.innerText = "Total tasks: " + totalTasks;
        if (ulEl.children.length == 0) {
            emptyTaskEl.style.display = 'block';
        }
    }
    else {
        //delete all
        console.log('deleted all');
        for (let i = 0; i < ulEl.children.length; i++) {
            ulEl.children[i].remove();
            i--;
        }
        totalTasks = 0;
        totalTasksEl.innerText = "Total tasks: " + totalTasks;
        completedTasks = 0;
        completedTasksEl.innerText = "Completed tasks: " + completedTasks;
        emptyTaskEl.style.display = 'block';
    }
    //show everything
    todoContainerEl.style.overflow = 'auto';
    toggleVisibilityForAllTasks();
    filter();
});

//Bulk action events
deleteDoneEl.addEventListener('click', () => {
    deleteText.innerHTML = "Are you sure that you want to delete the COMPLETED tasks?";
    newDiv.style.display = 'flex';
    //hides overflow
    todoContainerEl.style.overflow = 'hidden';
    toggleVisibilityForAllTasks();
});

clearAllEl.addEventListener('click', () => {
    deleteText.innerHTML = "Are you sure that you want to delete ALL tasks?";
    newDiv.style.display = 'flex';
    //hides overflow
    todoContainerEl.style.overflow = 'hidden';
    toggleVisibilityForAllTasks();

});

allDoneEl.addEventListener('click', () => {
    for (let i = 0; i < ulEl.children.length; i++) {
        if (!ulEl.children[i].classList.contains('completed')) {
            ulEl.children[i].classList.add('completed');
            completedTasks++;
        }
    }
    completedTasksEl.innerText = "Completed tasks: " + completedTasks;
    filter();
});

function toggleVisibilityForAllTasks() {
    for (let i = 0; i < ulEl.children.length; i++) {
        ulEl.children[i].classList.toggle('hidden');
    }
}