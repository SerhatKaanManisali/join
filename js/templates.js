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



function taskCardTemplate(category, rgb, description, prio, title) {
    return /*html*/`
        <div class="task-card">
            <h3 style="background-color: ${rgb}">${category}</h3>
            <h4>${title}</h4>
            <p>${description}</p>
            <div class="progress">
                <div id="empty-bar">
                    <div id="filled-bar"></div>
                </div>
                <span>1/2 Done</span>
            </div>
            <div class="symbols">
                <div class="assignment">
                    <p style="background-color: #0190E0; top: -18px;">SM</p>
                    <p style="background-color: #EE00D6; top: -18px; left: 31px;">MV</p>
                    <p style="background-color: #02CF2F; top: -18px; left: 62px;">EF</p>
                </div>
                <img src="assets/img/default-low.png">
            </div>
        </div>
    `;
}