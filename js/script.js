let allTasks = [];


/**
 * Initialize certain functions when page is loaded.
 * 
 * @param {String} id 
 */
async function init(id) {
    setURL('https://gruppe-525.developerakademie.net/smallest_backend_ever');
    await loadTask();
    await includeHTML();
    changeHighlight(id);
    setMinDate();
}


/**
 * Load/Include HTML templates.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * Adds a task to the board after validating.
 */
function addTask() {
    let validationNotes = document.getElementsByClassName('validation-note');
    validateForm();
    if (validateForm().length == validationNotes.length) {
        saveTask(taskTemplate());
    }
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
 * @returns arry including all empty validation notes.
 */
function validateForm() {
    let validationNotes = document.getElementsByClassName('validation-note');
    let result = [];
    for (let i = 0; i < validationNotes.length; i++) {
        if (validationNotes[i].innerHTML == '') {
            result.push(validationNotes[i]);
        }
    }
    return result;
}


/**
 * Toggle class of an element. 
 * e.g. Let log out button appear and disappear by clicking on the profile icon.
 * id = log-out-button; className = hide;
 * 
 * @param {String} id 
 * @param {String} className 
 */
function toggleClass(id, className) {
    document.getElementById(id).classList.toggle(className);
}


/**
 * Highlights navigation item depending on whether the corresponding page is displayed.
 * 
 * @param {String} id 
 */
function changeHighlight(id) {
    let currentlyActive = document.querySelector('.active');
    currentlyActive.classList.remove('active');

    let newActive = document.getElementById(id);
    newActive.classList.add('active');
    newActive.firstElementChild.src = `assets/img/${id}-icon-white.png`;
}


/**
 * Prevents an event from happening.
 * 
 * @param {Event} event 
 */
function doNotClose(event) {
    event.stopPropagation()
}