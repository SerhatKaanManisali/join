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
        'subtask': subtasks
    }
    return task;
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
        <img id="${color}" onclick="pickColor('${color}')" src="${color}">
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
        ${newCategoryName} <img src="${activeColor.src}">
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