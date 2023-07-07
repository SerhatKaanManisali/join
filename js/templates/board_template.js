

function currentTaskTemplate() {
    let task = {
        'assignment': getDetailedAssignment(),
        'category': getDetailedCategory(),
        'completedSubtasks': iterateNodeList(document.querySelectorAll('del')),
        'date': formatDate(document.getElementById('detailed-date').innerHTML),
        'description': document.getElementById('detailed-description').innerHTML,
        'id': currentId,
        'prio': getDetailedPrio(),
        'status': currentStatus,
        'subtask': iterateNodeList(document.querySelectorAll('div.detailed-subtask span')).reverse(),
        'title': document.getElementById('detailed-title').innerHTML
    }
    return task;
}


/**
 * Template with variables for each piece of a task.
 * 
 * @param {Number} t 
 * @returns array with variables
 */
function taskCardElements(t) {
    const assignments = allTasks[t]['assignment'];
    const category = capitalizeFirstCharacter(allTasks[t]['category']['name']);
    const date = allTasks[t]['date'];
    const rgb = allTasks[t]['category']['rgb'];
    const description = capitalizeFirstCharacter(allTasks[t]['description']);
    const prio = allTasks[t]['prio'];
    const subtasks = allTasks[t]['subtask'];
    const title = allTasks[t]['title'];
    const completedSubtasks = allTasks[t]['completedSubtasks'];
    const status = allTasks[t]['status'];
    const id = allTasks[t]['id'];
    return elements = [assignments, category, date, rgb, description, prio, subtasks, title, completedSubtasks, status, id];
}


/**
 * @param {Number} t
 * @param {Array} elements 
 * @returns Template of task on the board.
 */
function taskCardTemplate(elements, t) {
    return /*html*/`
        <div class="task-card" onclick="showDetailedTask(${t})" draggable="true" ondragstart="startDragging(${elements[10]})">
            <h3 style="background-color: ${elements[3]}">${elements[1]}</h3>
            <h4>${elements[7]}</h4>
            <p>${elements[4]}</p>
            <div class="progress">
                <div id="empty-bar">
                    <div id="filled-bar-${t}" style="background-color: ${elements[3]}; height: 100%"></div>
                </div>
                <span>${elements[8].length}/${elements[6].length} Done</span>
            </div>
            <div class="symbols">
                <div id="assignment-list-${t}" class="assignment">
                </div>
                <img src="assets/img/default-${elements[5]}.png">
            </div>
        </div>
    `;
}


/**
 * @param {Array} elements 
 * @returns HTML for detailed view of a task.
 */
function detailedTaskCardTemplate(elements, t) {
    return /*html*/`
        <div class="detailed-task">
            <div class="detailed-task-content">
                <h3 id="detailed-category" style="background-color: ${elements[3]}">${elements[1]}</h3>
                <h2 id="detailed-title">${elements[7]}</h2>
                <h5 id="detailed-description">${elements[4]}</h5>
                <span>
                    <h4>Due date:</h4>
                    <h5 id="detailed-date">${formatDate(elements[2])}</h5>
                </span>
                <span>
                    <h4>Priority:</h4>
                    <img id="detailed-prio" src="assets/img/detailed-${elements[5]}.png">
                </span>
                <h4 id="assignment-title">Assigned to:</h4>
                <div id="subtask-list"></div>
            </div>
            <div class="detailed-task-buttons">
                <img class="close-button" onclick="toggleClass('detailed-task-box', 'hide')" src="assets/img/default-cross.png">
                    <div class="modify-buttons">
                        <div class="delete-button"
                            onmouseenter="changeImageOnHover('delete-button', 'assets/img/hover-delete.png')"
                            onmouseleave="changeImageOnHover('delete-button', 'assets/img/delete-icon.png')"
                            onclick="deleteTask(${t})">
                            <img id="delete-button" src="assets/img/delete-icon.png">
                        </div>
                        <div class="edit-button" onclick="editTask(${t})">
                            <img src="assets/img/edit-icon.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}



function assignmentTemplate(name, color, space) {
    return /*html*/`
        <p style="background-color: ${color}; top: -18px; left: ${space}px">${createNameAbbreviation(name)}</p>
    `;
}


/**
 * Template only for detailed view of a task.
 * 
 * @param {String} person 
 * @returns HTML of a person which has been assigned to a task.
 */
function detailedAssignmentTemplate(person, abbreviation, rgb) {
    return /*html*/`
        <span class="detailed-assignment">
            <p style="background-color: ${rgb};">${abbreviation}</p>
            <h5>${person}</h5>
        </span>
    `;
}



function detailedSubtaskTemplate(name) {
    return /*html*/`
        <div class="detailed-subtask">
            <img id="${name}" onclick="toggleCheckStatus('${name}', 'rectangle')" src="assets/img/unchecked-rectangle.png">
            <span>${name}</span>
        </div>
    `;
}



function editTaskTemplate(elements, t) {
    return /*html*/`
        <div class="detailed-task">
            <div>
                <form class="editable-task">
                    <div>
                        <p>Title</p>
                        <input class="form-element" type="text" id="edited-title" value="${elements[7]}">
                    </div>
                    <div>
                        <p>Description</p>
                        <input class="form-element" type="text" id="edited-description" value="${elements[4]}">
                    </div>
                    <div>
                        <p>Due date</p>
                        <input id="edited-date" class="date-input" type="date" value="${elements[2]}">
                    </div>
                    <div>
                        <p>Prio</p>
                        <div id="prio" class="prio">
                            <button id="urgent-button" class="prio-button" type="button" onclick="choosePrio('urgent')" value="urgent">
                                Urgent
                                <img src="assets/img/default-urgent.png">
                            </button>
                            <button id="medium-button" class="prio-button" type="button" onclick="choosePrio('medium')" value="medium">
                                Medium
                                <img src="assets/img/default-medium.png">
                            </button>
                            <button id="low-button" class="prio-button" type="button" onclick="choosePrio('low')" value="low">
                                Low
                                <img src="assets/img/default-low.png">
                            </button>
                        </div>
                    </div>
                    <div>
                        <p>Assigned to</p>
                        <div id="assignment-box" class="dropdown" onclick="toggleDropdown('assignment')">
                            <button id="assignment" class="form-element dropdown-button" type="button">
                                <span>Select contacts to assign</span>
                                <img src="assets/img/dropdow-arrow.png">
                                <div id="assignment-options" class="dropdown-content collapse">
                                    <div id="You" onclick="toggleCheckbox('You', 'checkbox', 'true'); doNotClose(event)">
                                        <span>You</span>
                                        <img src="assets/img/unchecked-checkbox.png">
                                    </div>
                                    <div id="Maximilian Vogel" onclick="toggleCheckbox('Maximilian Vogel', 'checkbox', 'true'); doNotClose(event)">
                                        <span>Maximilian Vogel</span>
                                        <img src="assets/img/unchecked-checkbox.png">
                                    </div>
                                    <div id="Lena Maier" onclick="toggleCheckbox('Lena Maier', 'checkbox', 'true'); doNotClose(event)">
                                        <span>Lena Maier</span>
                                        <img src="assets/img/unchecked-checkbox.png">
                                    </div>
                                    <div id="Sarah Müller" onclick="toggleCheckbox('Sarah Müller', 'checkbox', 'true'); doNotClose(event)">
                                        <span>Sarah Müller</span>
                                        <img src="assets/img/unchecked-checkbox.png">
                                    </div>
                                    <div>
                                        <span>Add new contact</span>
                                        <img src="assets/img/contacts-icon-black.png">
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="detailed-task-buttons">
                    <img class="close-button" onclick="toggleClass('detailed-task-box', 'hide')" src="assets/img/default-cross.png">
                        <div class="confirm-button" onclick="confirmTask(${t})">
                            Ok
                            <img src="assets/img/check-icon.png">
                        </div>
                    </div>
                </div>
        </div>
    `;
}



function editedTaskTemplate(t) {
    let task = {
        'assignment': allTasks[t]['assignment'],
        'category': allTasks[t]['category'],
        'completedSubtasks': allTasks[t]['completedSubtasks'],
        'date': document.getElementById('edited-date').value,
        'description': document.getElementById('edited-description').value,
        'prio': document.querySelector('button[class*="active-"').value,
        'status': currentStatus,
        'subtask': allTasks[t]['subtask'],
        'title': document.getElementById('edited-title').value
    }
    return task
}



function taskFormTemplate() {
    return /*html*/`
        <form class="task-form-overlay" onsubmit="addTask(); return false;">
            <div class="task-form">
                <div class="column-left">
                    <div class="form-item">
                        <label for="title">Title</label>
                        <input id="title" class="form-element" type="text" placeholder="Enter a title">
                        <span id="title-validation" class="validation-note"></span>
                    </div>
                    <div class="form-item">
                        <label for="description">Description</label>
                        <textarea id="description" class="form-element" cols="60" rows="3"
                            placeholder="Enter a description"></textarea>
                        <span id="description-validation" class="validation-note"></span>
                    </div>
                    <div class="form-item">
                        <label for="category">Category</label>
                        <div id="category-box" class="dropdown" onclick="toggleDropdown('category')">
                            <button id="category" class="form-element dropdown-button" type="button">
                                <span id="selected-by-default">Select task category</span>
                                <img src="assets/img/dropdow-arrow.png">
                                <div id="category-options" class="dropdown-content collapse">
                                    <div id="new-category" onclick="createCategory()">New category</div>
                                </div>
                            </button>
                        </div>
                        <div id="colors"></div>
                        <span id="category-validation" class="validation-note"></span>
                    </div>
                    <div class="form-item">
                        <label for="assignment">Assign to</label>
                        <div id="assignment-box" class="dropdown" onclick="toggleDropdown('assignment')">
                            <button id="assignment" class="form-element dropdown-button" type="button">
                                <span>Select contacts to assign</span>
                                <img src="assets/img/dropdow-arrow.png">
                                <div id="assignment-options" class="dropdown-content collapse">
                                    <div id="you" onclick="toggleCheckbox('you', 'checkbox', 'true'); doNotClose(event)">
                                        <span>You</span>
                                        <img src="assets/img/unchecked-checkbox.png">
                                    </div>
                                    <div id="maximilian-vogel" onclick="toggleCheckbox('maximilian-vogel', 'checkbox', 'true'); doNotClose(event)">
                                        <span>Maximilian Vogel</span>
                                        <img src="assets/img/unchecked-checkbox.png">
                                    </div>
                                    <div id="lena-maier" onclick="toggleCheckbox('lena-maier', 'checkbox', 'true'); doNotClose(event)">
                                        <span>Lena Maier</span>
                                        <img src="assets/img/unchecked-checkbox.png">
                                    </div>
                                    <div id="sarah-müller" onclick="toggleCheckbox('sarah-müller', 'checkbox', 'true'); doNotClose(event)">
                                        <span>Sarah Müller</span>
                                        <img src="assets/img/unchecked-checkbox.png">
                                    </div>
                                    <div>
                                        <span>Add new contact</span>
                                        <img src="assets/img/contacts-icon-black.png">
                                    </div>
                                </div>
                            </button>
                        </div>
                        <span id="assignment-validation" class="validation-note"></span>
                    </div>
                </div>
                <div class="column-right">
                    <div>
                        <div class="form-item">
                            <span>Due date</span>
                            <input id="date" class="date-input" type="date">
                            <span id="date-validation" class="validation-note"></span>
                        </div>
                        <div class="form-item">
                            <span>Prio</span>
                            <div id="prio" class="prio">
                                <button id="urgent-button" class="prio-button" type="button" onclick="choosePrio('urgent')" value="urgent">
                                    Urgent
                                    <img src="assets/img/default-urgent.png">
                                </button>
                                <button id="medium-button" class="prio-button" type="button" onclick="choosePrio('medium')" value="medium">
                                    Medium
                                    <img src="assets/img/default-medium.png">
                                </button>
                                <button id="low-button" class="prio-button" type="button" onclick="choosePrio('low')" value="low">
                                    Low
                                    <img src="assets/img/default-low.png">
                                </button>
                            </div>
                            <span id="prio-validation" class="validation-note"></span>
                        </div>
                        <div class="form-item">
                            <span>Subtasks</span>
                            <div class="input-parent">
                                <input id="subtask-input" class="input-next-to-button" type="text" placeholder="Add new subtask">
                                <img class="cursor-pointer scale-on-hover" onclick="addSubtask()" src="assets/img/plus-icon.png">
                            </div>
                            <div id="subtask-list" class="subtask-list"></div>
                        </div>
                    </div>
                    <div class="form-buttons">
                        <button id="clear-button" class="clear-button" type="reset"
                        onclick="toggleClass('detailed-task-box', 'hide')"
                        onmouseenter="changeImageOnHover('clear-button-img', 'assets/img/hover-cross.png')"
                        onmouseleave="changeImageOnHover('clear-button-img', 'assets/img/default-cross.png')">
                            Cancel
                            <img id="clear-button-img" src="assets/img/default-cross.png">
                        </button>
                        <button class="create-button" type="submit">Create Task
                            <img id="create-button" src="assets/img/check-icon.png">
                        </button>
                    </div>
                </div>
            </div>
        </form>
    `;
}