let allTasks = [];


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
 * Adds a task which is also visible to other users later on.
 */
function addTask() {
    taskElementsTemplate();
    let task = {
        'title': title,
        'description': description,
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
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let assignment = document.getElementById('assignment').value;
    let date = document.getElementById('date').value;
    let prio = document.getElementById('prio').value;
    let subtask = document.getElementById('subtask').value;
    return title, description, category, assignment, date, prio, subtask;
}