/**
 * @returns JSON of a task.
 */
function taskTemplate() {
    let task = {
        'title': validateTitle(),
        'description': validateDescription(),
        'category': validateCategory(),
        'assignment': validateAssignment(),
        'date': date,
        'prio': validatePrio(),
        'subtask': subtask
    }
    return task;
}


/**
 * 
 * @returns innerHTML of new input field which appears when creating a new category.
 */
function createCategoryTemplate() {
    return /*html*/`
        <div class="create-category-buttons">
            <img class="cursor-pointer" src="assets/img/black-cross.png" onclick="cancelNewCategory()">
            <img src="assets/img/vertical-line.png">
            <img class="cursor-pointer" src="assets/img/black-check.png" onclick="addNewCategory()">
        </div>
    `;
}


/**
 * @returns HTML for a color when rendering the color palette. 
 */
function colorTemplate() {
    return /*html*/`
        <img id="${color}" onclick="pickColor('${color}')" src="${color}">
    `;
}