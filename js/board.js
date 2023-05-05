/**
 * Initializes certain function as soon as board.html loads.
 */
async function initBoard() {
    await init('board');
    renderTasks();
}


/**
 * Renders all tasks on the board.
 */
function renderTasks() {
    let toDoList = document.getElementById('to-do-list');
    toDoList.innerHTML = '';
    for (let t = 0; t < allTasks.length; t++) {
        taskCardElements(t);
        toDoList.innerHTML += taskCardTemplate(elements, t);
        subTaskProgress(elements[5]);
    }
}


/**
 * Shows the progress bar of task on the board.
 * 
 * @param {Array} subtasks 
 */
function subTaskProgress(subtasks) {
    let filledBar = document.getElementById('filled-bar');
    let percent = /*amount of completed subtasks*/ subtasks.length * 100
    filledBar.style.width = percent;
}


/**
 * Shows the detailed view of the task which has been clicked.
 * 
 * @param {Number} t 
 */
function showDetailedTask(t) {
    toggleClass('detailed-task-box', 'hide');
    taskCardElements(t);
    let detailedTask = document.getElementById('detailed-task-box');
    detailedTask.innerHTML = '';
    detailedTask.innerHTML += detailedTaskCardTemplate(elements);
    renderAssignment(t);
    renderSubtasks(t);
}


/**
 * Renders the list of assigned persons to a task in the detailed view of a task.
 * 
 * @param {Number} t 
 */
function renderAssignment(t) {
    let assignmentTitle = document.getElementById('assignment-title');;
    for (let a = 0; a < allTasks[t]['assignment'].length; a++) {
        const person = allTasks[t]['assignment'][a];
        assignmentTitle.insertAdjacentHTML('afterend', detailedAssignmentTemplate(person));
    }
}



function renderSubtasks(t) {

}