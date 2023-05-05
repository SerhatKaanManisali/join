/**
 * @returns JSON of a task.
 */
function taskTemplate() {
    let task = {
        'title': validateTitle(),
        'description': validateDescription(),
        'category': validateCategory(),
        'assignment': validateAssignment(),
        'date': validateDate(),
        'prio': validatePrio(),
        'subtask': allSubtasks
    }
    return task;
}


/**
 * Template for a category in the dropdown.
 * 
 * @param {String} categoryName 
 * @param {String} highCategoryName 
 * @param {String} rgb 
 * @returns 
 */
function categoryTemplate(categoryName, highCategoryName, rgb) {
    return /*html*/`
        <div id="${categoryName}" onclick="selectCategory('${categoryName}', '${rgb}">
            ${highCategoryName}
            <span class="default-color" style="background-color: ${rgb}"></span>
        </div>
    `;
}


/**
 * 
 * @returns innerHTML of new input field which appears when creating a new category.
 */
function createCategoryTemplate() {
    return /*html*/`
        <div class="create-buttons">
            <img class="cursor-pointer scale-on-hover" src="assets/img/black-cross.png" onclick="cancelNewCategory()">
            <img src="assets/img/vertical-line.png">
            <img class="cursor-pointer scale-on-hover" src="assets/img/black-check.png" onclick="addNewCategory()">
        </div>
    `;
}


/**
 * @returns HTML for a color when rendering the color palette. 
 */
function colorTemplate(color) {
    return /*html*/`
        <span id="${color}" class="default-color" onclick="pickColor('${color}')" style="background-color: ${color}"></span>
    `;
}


/**
 * @param {String} newCategoryName 
 * @param {String} lowNewCategoryName 
 * @returns HTML template of newly created category.
 */
function newCategoryTemplate(newCategoryName, lowNewCategoryName) {
    return /*html*/`
        <div id="${lowNewCategoryName}" onclick="selectCategory('${lowNewCategoryName}')">
        ${newCategoryName} <span class="default-color" style="background-color: ${activeColor.style.backgroundColor}"></span>
        </div>
    `;
}


/**
 * @returns subtask's HTML.
 */
function subtaskTemplate(subtaskInput) {
    return /*html*/`
        <div id="${subtaskInput}">
            <img onclick="deleteSubtask('${subtaskInput}')" src="assets/img/unchecked-checkbox.png">
            ${subtaskInput}
        </div>
    `;
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
    const title = capitalizeFirstCharacter(allTasks[t]['title']);
    return elements = [assignments, category, date, rgb, description, prio, subtasks, title];
}


/**
 * @param {Number} t
 * @param {Array} elements 
 * @returns Template of task on the board.
 */
function taskCardTemplate(elements, t) {
    return /*html*/`
        <div class="task-card" onclick="showDetailedTask(${t})">
            <h3 style="background-color: ${elements[3]}">${elements[1]}</h3>
            <h4>${elements[7]}</h4>
            <p>${elements[4]}</p>
            <div class="progress">
                <div id="empty-bar">
                    <div id="filled-bar" style="background-color: ${elements[3]}"></div>
                </div>
                <span>1/${elements[6].length} Done</span>
            </div>
            <div class="symbols">
                <div class="assignment">
                    <p style="background-color: #0190E0; top: -18px;">SM</p>
                    <p style="background-color: #EE00D6; top: -18px; left: 28px;">MV</p>
                    <p style="background-color: #02CF2F; top: -18px; left: 56px;">EF</p>
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
function detailedTaskCardTemplate(elements) {
    return /*html*/`
        <div class="detailed-task">
        <div class="detailed-task-content">
            <h3 style="background-color: ${elements[3]}">${elements[1]}</h3>
            <h2>${elements[7]}</h2>
            <h5>${elements[4]}</h5>
            <span>
                <h4>Due date:</h4>
                <h5>${formatDate(elements[2])}</h5>
            </span>
            <span>
                <h4>Priority:</h4>
                <img src="assets/img/detailed-${elements[5]}.png">
            </span>
            <h4 id="assignment-title">Assigned to:</h4>
            <span>
                <p style="background-color: #0190E0;">SM</p>
                <h5>Sabrina Müller</h5>
            </span>
            <span>
                <p style="background-color: #EE00D6;">MV</p>
                <h5>Maximilian Vogel</h5>
            </span>
            <span>
                <p style="background-color: #02CF2F;">EF</p>
                <h5>Erik Fänger</h5>
            </span>
        </div>
        <div class="detailed-task-buttons">
            <img class="close-button" onclick="toggleClass('detailed-task-box', 'hide')" src="assets/img/default-cross.png">
                <div class="modify-buttons">
                    <div class="delete-button"
                        onmouseenter="changeImageOnHover('delete-button', 'assets/img/hover-delete.png')"
                        onmouseleave="changeImageOnHover('delete-button', 'assets/img/delete-icon.png')">
                        <img id="delete-button" src="assets/img/delete-icon.png">
                    </div>
                    <div class="edit-button">
                        <img src="assets/img/edit-icon.png">
                    </div>
                </div>
            </div>
        </div>
    `;
}


/**
 * Template only for detailed view of a task.
 * 
 * @param {String} person 
 * @returns HTML of a person which has been assigned to a task.
 */
function detailedAssignmentTemplate(person) {
    return /*html*/`
        <span>
            <p style="background-color: #02CF2F;">Y</p>
            <h5>${person}</h5>
        </span>
    `;
}