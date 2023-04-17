let allTasks = [];
let prio;


/**
 * Adds a task which is also visible to other users later on.
 */
function addTask() {
    taskElementsTemplate();
    let task = {
        'title': title.value,
        'description': description.value,
        'category': category,
        'assignment': assignment,
        'date': date,
        'prio': prio,
        'subtask': subtask
    }
    saveTask(task);
}


/**
 * Saves the task which has been recently added on the server.
 * 
 * @param {JSON} task 
 */
async function saveTask(task) {
    allTasks.push(task);
    let allTasksAsText = JSON.stringify(allTasks);
    await backend.setItem('allTasks', allTasksAsText);
}


/**
 * Loads all Tasks which are stored from the server.
 */
async function loadTask() {
    await downloadFromServer();
    let loadedTasks = JSON.parse(backend.getItem('allTasks'));
    allTasks = loadedTasks || [];
}


/**
 * Improves the function's clarity.
 * 
 * @returns single elements of a task.
 */
function taskElementsTemplate() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let assignment = document.getElementById('assignment');
    let date = document.getElementById('date');
    let subtask = document.getElementById('subtask');

    return title, description, category, assignment, date, subtask;
}


/**
 * Chooses prio in the task form.
 * 
 * @param {String} urgency 
 */
function choosePrio(urgency) {
    toggleClass(`${urgency}-button`, `active-${urgency}`);
    changePrioImage(urgency);
    let prioBox = document.getElementById('prio');
    let activePrio = prioBox.querySelector(`.active-${urgency}`);
    let defaultPrio = prioBox.querySelectorAll(`button:not(.active-${urgency})`);
    setUrgencyValue(urgency, activePrio);
    disableRemainingPrio(defaultPrio, activePrio);
}


/**
 * Toggles the image of the prio buttons so it differs from the background.
 * 
 * @param {String} urgency 
 */
function changePrioImage(urgency) {
    let button = document.getElementById(`${urgency}-button`);
    let protocol = window.location.protocol;
    let host = window.location.host;
    if (button.firstElementChild.src == `${protocol}//${host}/assets/img/active-${urgency}.png`) {
        button.firstElementChild.src = `assets/img/default-${urgency}.png`
    } else {
        button.firstElementChild.src = `assets/img/active-${urgency}.png`
    }
}


/**
 * Gives the globally defined variable prio a value.
 * e.g. urgent.
 * 
 * @param {String} urgency 
 * @param {Element} activePrio 
 */
function setUrgencyValue(urgency, activePrio) {
    if (prio !== urgency) {
        prio = activePrio.value
    } else {
        prio = undefined;
    }
}


/**
 * Disables remaining prio buttons which have been not selected.
 * 
 * @param {Element} defaultPrio
 * @param {Element} activePrio
 */
function disableRemainingPrio(defaultPrio, activePrio) {
    if (activePrio) {
        defaultPrio.forEach(defaultPrio => defaultPrio.classList.add('disabled'));
    } else {
        defaultPrio.forEach(defaultPrio => defaultPrio.classList.remove('disabled'));
    }
}


/**
 * Changes image on hover so the color of the image matches it's parent element's hover effects.
 * 
 * @param {String} id 
 * @param {String} url 
 */
function changeImageOnHover(id, url) {
    let button = document.getElementById(id);
    button.firstElementChild.src = url;
}


/**
 * Either shows or hides selectable categories/contacts to assign to in the task form.
 * 
 * @param {String} id 
 */
function toggleDropdown(id) {
    let dropdown = document.getElementById(`${id}-options`);

    if (dropdown.classList.contains('collapse')) {
        dropdown.classList.replace('collapse', 'expand');
    } else {
        dropdown.classList.replace('expand', 'collapse');
    }

    toggleClass(id, 'dropdown-active');
}