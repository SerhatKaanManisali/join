let abbreviationColors = ['rgb(1, 144, 224)', 'rgb(238, 0, 214)', 'rgb(2, 207, 47)', 'rgb(255, 168, 0)', 'rgb(147, 39, 255)', 'rgb(255, 92, 0)', 'rgb(0, 124, 238)', 'rgb(78, 150, 61)', 'rgb(50, 218, 255)']
let currentStatus;
let currentId;
let currentlyDraggedElement;


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
    renderToDo();
    renderInProgress();
    renderAwaitingFeedback();
    renderDone();
}



function renderToDo() {
    let toDos = allTasks.filter(t => t['status'] == 'to do');
    let toDoList = document.getElementById('to-do-list');
    toDoList.innerHTML = '';
    for (let t = 0; t < toDos.length; t++) {
        let index = allTasks.indexOf(toDos[t]);
        taskCardElements(index);
        toDoList.innerHTML += taskCardTemplate(elements, index);
        subTaskProgress(elements[6], elements[8], index);
        renderAssignment(elements[0], index);
    }
}



function renderInProgress() {
    let inProgress = allTasks.filter(t => t['status'] == 'in progress');
    let inProgressList = document.getElementById('in-progress-list');
    inProgressList.innerHTML = '';
    for (let t = 0; t < inProgress.length; t++) {
        let index = allTasks.indexOf(inProgress[t]);
        taskCardElements(index);
        inProgressList.innerHTML += taskCardTemplate(elements, index);
        subTaskProgress(elements[6], elements[8], index);
        renderAssignment(elements[0], index);
    }
}



function renderAwaitingFeedback() {
    let awaitingFeedback = allTasks.filter(t => t['status'] == 'awaiting feedback');
    let awaitingFeedbackList = document.getElementById('awaiting-feedback-list');
    awaitingFeedbackList.innerHTML = '';
    for (let t = 0; t < awaitingFeedback.length; t++) {
        let index = allTasks.indexOf(awaitingFeedback[t]);
        taskCardElements(index);
        awaitingFeedbackList.innerHTML += taskCardTemplate(elements, index);
        subTaskProgress(elements[6], elements[8], index);
        renderAssignment(elements[0], index);
    }
}



function renderDone() {
    let done = allTasks.filter(t => t['status'] == 'done');
    let doneList = document.getElementById('done-list');
    doneList.innerHTML = '';
    for (let t = 0; t < done.length; t++) {
        let index = allTasks.indexOf(done[t]);
        taskCardElements(index);
        doneList.innerHTML += taskCardTemplate(elements, index);
        subTaskProgress(elements[6], elements[8], index);
        renderAssignment(elements[0], index);
    }
}


/**
 * Shows the progress bar of task on the board.
 * 
 * @param {Array} subtasks 
 */
function subTaskProgress(subtasks, completedSubtasks, t) {
    let filledBar = document.getElementById(`filled-bar-${t}`);
    let percent = completedSubtasks.length / subtasks.length * 100 + '%';
    if (subtasks) {
        filledBar.style.width = percent;
    } else {
        filledBar.style.width = 0 + '%'
    }
}


/**
 * Shows the detailed view of the task which has been clicked.
 * 
 * @param {Number} t 
 */
function showDetailedTask(t) {
    toggleClass('detailed-task-box', 'hide');
    taskCardElements(t);
    currentStatus = elements[9];
    currentId = elements[10];
    let detailedTask = document.getElementById('detailed-task-box');
    detailedTask.innerHTML = '';
    detailedTask.innerHTML += detailedTaskCardTemplate(elements, t);
    renderSubtasks(t);
    renderDetailedAssignment(t);
}


/**
 * Renders the list of assigned persons to a task in the detailed view of a task.
 * 
 * @param {Number} t 
 */
function renderDetailedAssignment(t) {
    let assignmentTitle = document.getElementById('assignment-title');
    for (let a = 0; a < allTasks[t]['assignment']['names'].length; a++) {
        const person = allTasks[t]['assignment']['names'][a];
        const backgroundColor = allTasks[t]['assignment']['colors'][a];
        assignmentTitle.insertAdjacentHTML('afterend', detailedAssignmentTemplate(person, createNameAbbreviation(person), backgroundColor));
    }
}


/**
 * @param {String} name 
 * @returns abbreviation of a given name/string.
 */
function createNameAbbreviation(name) {
    let abbreviation = '';
    if ((/[a-zA-Z]/).test(name) == true) {
        let splitName = name.split(/(\s+)/);
        for (let i = 0; i < splitName.length; i++) {
            const firstChar = splitName[i].charAt(0).trim();
            if (firstChar !== '') {
                abbreviation += firstChar;
            }
        };
        return abbreviation;
    } else {
        return '+' + name;
    }
}


/**
 * Picks random color out of a colors pool. Used for picking a color for profile icons on the board.
 * 
 * @param {Array} names 
 * @returns array called colors which contains rgbs as strings.
 */
function pickRandomColor(names) {
    let colors = [];
    for (let n = 0; n < names.length; n++) {
        let rgb = abbreviationColors[Math.floor(Math.random() * abbreviationColors.length)];
        colors.push(rgb);
    }
    return colors;
}



function renderSubtasks(t) {
    let subtaskList = document.getElementById('subtask-list');
    for (let s = 0; s < allTasks[t]['subtask'].length; s++) {
        const subtask = allTasks[t]['subtask'][s];
        if (allTasks[t]['completedSubtasks'].includes(subtask)) {
            subtaskList.innerHTML += detailedSubtaskTemplate(subtask);
            toggleStrikeThrough(subtask);
            toggleCheckbox(subtask, 'rectangle');
        } else {
            subtaskList.innerHTML += detailedSubtaskTemplate(subtask);
        }
    }
}



function toggleCheckStatus(id, type) {
    toggleCheckbox(id, type);
    updateArray(id);
    renderTasks();
}



function toggleStrikeThrough(id) {
    let subtask = document.getElementById(id);
    if (subtask.nextElementSibling.innerHTML == `<del>${id}</del>`) {
        subtask.nextElementSibling.innerHTML = id;
    } else {
        subtask.nextElementSibling.innerHTML = `<del>${id}</del>`;
    }
}



function toggleSubtaskCompletion(subtask) {
    if (allCompletedSubtasks.includes(subtask) == false) {
        allCompletedSubtasks.push(subtask);
    } else {
        allCompletedSubtasks.splice(allCompletedSubtasks.indexOf(subtask), 1);
    }
}



async function updateArray(id) {
    let index = allTasks.findIndex(task => task.title === document.getElementById('detailed-title').innerHTML);
    toggleStrikeThrough(id);
    toggleSubtaskCompletion(id);
    if (index > -1) {
        allTasks[index] = currentTaskTemplate();
        await setItem('allTasks', allTasks);
    }
}



function iterateNodeList(nodeList) {
    let array = []
    for (let n = 0; n < nodeList.length; n++) {
        const element = nodeList[n].innerHTML;
        if (element.includes('<del>')) {
            let withoutTag = element.replace('<del>', '').replace('</del>', '');
            array.push(withoutTag);
        } else {
            array.push(element);
        }
    }
    return array;
}



function getDetailedPrio() {
    let detailedPrio = document.getElementById('detailed-prio').src;
    let prioPiece = detailedPrio.split('-');
    return prioPiece[1].replace('.png', '');
}



function getDetailedAssignment() {
    let names = iterateNodeList(document.querySelectorAll('span.detailed-assignment h5'));
    let colorsAsNodes = document.querySelectorAll('span.detailed-assignment p');
    let colors = []
    for (let i = 0; i < colorsAsNodes.length; i++) {
        const color = colorsAsNodes[i].style.backgroundColor;
        colors.push(color);
    }
    let detailedAssignment = {
        'colors': colors.reverse(),
        'names': names.reverse()
    }
    return detailedAssignment;
}



function getDetailedCategory() {
    let detailedCategory = {
        'name': document.getElementById('detailed-category').innerHTML,
        'rgb': document.getElementById('detailed-category').style.backgroundColor
    }
    return detailedCategory;
}



function renderAssignment(assignment, t) {
    let assignmentList = document.getElementById(`assignment-list-${t}`);
    let additionalAssignment = +assignment['names'].length - 2;
    let space = 0;
    if (assignment['names'].length > 3) {
        for (let i = 0; i < 2; i++) {
            const name = assignment['names'][i];
            const color = assignment['colors'][i];
            assignmentList.innerHTML += assignmentTemplate(name, color, space);
            space += 28;
        }
        assignmentList.innerHTML += assignmentTemplate(additionalAssignment, 'rgb(42, 54, 71)', space);
    } else {
        for (let i = 0; i < assignment['names'].length; i++) {
            const name = assignment['names'][i];
            const color = assignment['colors'][i];
            assignmentList.innerHTML += assignmentTemplate(name, color, space);
            space += 28;
        }
    }
}



async function deleteTask(t) {
    allTasks.splice(t, 1);
    await setItem('allTasks', allTasks);
    renderTasks();
    toggleClass('detailed-task-box', 'hide');
}



function editTask(t) {
    taskCardElements(t);
    let detailedTaskBox = document.getElementById('detailed-task-box');
    detailedTaskBox.innerHTML = '';
    detailedTaskBox.innerHTML = editTaskTemplate(elements, t);
    choosePrio(elements[5]);
    for (let i = 0; i < allTasks[t]['assignment']['names'].length; i++) {
        const name = allTasks[t]['assignment']['names'][i];
        toggleCheckbox(name, 'checkbox', 'true');
    }
}


async function confirmTask(t) {
    allTasks[t] = editedTaskTemplate(t);
    await setItem('allTasks', allTasks);
    renderTasks();
    toggleClass('detailed-task-box', 'hide');
}



function findTask() {
    let input = document.getElementById('search-field').value.toLowerCase();
    let toDoList = document.getElementById('to-do-list');
    toDoList.innerHTML = '';
    for (let t = 0; t < allTasks.length; t++) {
        taskCardElements(t);
        if (elements[7].toLowerCase().includes(input) || elements[4].toLowerCase().includes(input)) {
            toDoList.innerHTML += taskCardTemplate(elements, t);
            subTaskProgress(elements[6], elements[8], t);
            renderAssignment(elements[0], t);
        }
    }
}



function showTaskForm() {
    let taskFormOverlay = document.getElementById('detailed-task-box');
    taskFormOverlay.innerHTML = taskFormTemplate();
    toggleClass('detailed-task-box', 'hide');
}



function startDragging(id) {
    currentlyDraggedElement = id;
}



function allowDrop(ev) {
    ev.preventDefault();
}



async function moveTo(status) {
    allTasks[currentlyDraggedElement]['status'] = status;
    await setItem('allTasks', allTasks);
    renderTasks();
}



function highlight(id) {
    document.getElementById(id).classList.add('highlighted-dragged-area');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('highlighted-dragged-area');
}