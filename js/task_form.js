let allTasks = [];
let allSubtasks = [];
let allColors = [];
let pickableColors = ["#8AA4FF", "#FF0000", "#2AD300", "#FF8A00", "#E200BE", "#0038FF"];
let oldCategoryDropdown;
let activeColor;
let activePrio;
let category;
let allCompletedSubtasks = [];



/**
 * Initiates certain functions as soon as add_task.html loads.
 */
async function initTaskForm() {
    await init('add-task');
    renderCategories();
    setMinDate();
}


/**
 * Renders the available/previously saved categories
 */
function renderCategories() {
    let categoryDropdown = document.getElementById('category-options');
    for (let i = 0; i < allTasks.length; i++) {
        const categoryName = allTasks[i]['category']['name'];
        const highCategoryName = capitalizeFirstCharacter(categoryName);
        const rgb = allTasks[i]['category']['rgb'];
        categoryDropdown.innerHTML += categoryTemplate(categoryName, highCategoryName, rgb);
    }
}


/**
 * Adds a task to the board after validating.
 */
async function addTask() {
    let clearButton = document.getElementById('clear-button');
    let validationNotes = document.getElementsByClassName('validation-note');
    let task = taskTemplate();
    if (validateForm().length == validationNotes.length) {
        await saveTask(task);
        clearButton.click();
        if (window.location !== 'board.html') {
            toggleClass('new-task-confirmation', 'confirmation-animation');
            setTimeout(() => {
                window.location = 'board.html'
            }, 1300);
        } else {
            updateArray();
            renderTasks();
        }
    }
}


/**
 * Saves the recently added task.
 * 
 * @param {JSON} task 
 */
async function saveTask(task) {
    allTasks.push(task);
    await setItem('allTasks', allTasks);
}


/**
 * Selects category from dropdown.
 * 
 * @param {String} value 
 */
function selectCategory(value, rgb) {
    category = {
        'name': capitalizeFirstCharacter(value),
        'rgb': rgb
    };
    let selectedByDefault = document.getElementById('selected-by-default');
    let selectedCategory = document.getElementById(value);
    selectedByDefault.innerHTML = selectedCategory.innerHTML;
}


/**
 * Creates a new category.
 */
function createCategory() {
    oldCategoryDropdown = document.getElementById('category');
    let oldId = oldCategoryDropdown.getAttribute('id');
    let newInput = document.createElement('input');
    let categoryBox = document.getElementById('category-box');
    changeDropdownToInput(categoryBox, oldCategoryDropdown, newInput);
    setNewInputAttributes(newInput, oldId);
    categoryBox.innerHTML += createCategoryTemplate();
    createColors();
    activeColor = undefined;
}


/**
 * Replaces dropdown with an input.
 * 
 * @param {Element} parentElement 
 * @param {Element} oldDropdown 
 * @param {Element} newInput 
 */
function changeDropdownToInput(parentElement, oldDropdown, newInput) {
    parentElement.classList.replace('dropdown', 'input-parent');
    parentElement.onclick = null;
    oldDropdown.replaceWith(newInput);
}


/**
 * Transfers attributes of dropdown to new input which appears when you want to create a new category.
 * 
 * @param {Element} element
 * @param {String} idValue
 */
function setNewInputAttributes(element, idValue) {
    element.setAttribute('id', `input-${idValue}`);
    element.setAttribute('class', `input-next-to-button`);
    element.setAttribute('type', 'text');
    element.setAttribute('placeholder', 'New category name');
}


/**
 * Shows dropdown if you cancel the category cretion process.
 */
function cancelNewCategory() {
    revertCategoryBox();
    hideColorPalette();
    validationMessage('category');
}


/**
 * Reverts the input for a new category back to a dropdown.
 */
function revertCategoryBox() {
    let categoryBox = document.getElementById(`category-box`);
    categoryBox.classList.replace('input-parent', 'dropdown');
    categoryBox.replaceChildren(oldCategoryDropdown);
    categoryBox.setAttribute('onclick', 'toggleDropdown("category")');
}


/**
 * Hides the color palette.
 */
function hideColorPalette() {
    let colorPalette = document.getElementById('colors');
    colorPalette.classList.remove('colors');
    colorPalette.innerHTML = '';
}


/**
 * Adds a new category after validation.
 */
function addNewCategory() {
    let validationNote = document.getElementById('category-validation');
    let newCategoryName = document.getElementById('input-category').value;
    if (newCategoryName == '') {
        validationNote.innerHTML = 'Please choose a category name';
    } else {
        validateColor(validationNote, newCategoryName);
    }
}


/**
 * Inserts the newly added category to it's dropdown.
 * 
 * @param {String} newCategoryName 
 */
function insertCategoryToDropdown(newCategoryName) {
    let addCategoryButton = document.getElementById('new-category');
    let lowNewCategoryName = newCategoryName.toLowerCase();
    addCategoryButton.insertAdjacentHTML('afterend', newCategoryTemplate(newCategoryName, lowNewCategoryName));
    selectCategory(lowNewCategoryName, activeColor.style.backgroundColor);
}


/**
 * Renders the color palatte to choose from when creating a new category.
 */
function createColors() {
    let colorPalette = document.getElementById('colors');
    colorPalette.classList.add('colors');
    for (let c = 0; c < pickableColors.length; c++) {
        const color = pickableColors[c];
        colorPalette.innerHTML += colorTemplate(color);
    }

}


/**
 * Picks a color and highlights picked color when creating a new category.
 * 
 * @param {String} color 
 */
function pickColor(color) {
    let colorPalette = document.getElementById('colors');
    if (activeColor == undefined) {
        toggleClass(color, 'active-color');
        activeColor = colorPalette.querySelector('.active-color');
    } else {
        toggleClass(activeColor.id, 'active-color');
        toggleClass(color, 'active-color');
        activeColor = colorPalette.querySelector('.active-color');
    }
}


/**
 * Prevents picking a date which lies in the past.
 */
function setMinDate() {
    let datePicker = document.getElementById('date');
    let currentDate = new Date().toISOString().split('T')[0];
    datePicker.setAttribute('min', currentDate);
}


/**
 * Chooses prio in the task form.
 * 
 * @param {String} urgency 
 */
function choosePrio(urgency) {
    let prioBox = document.getElementById('prio');
    if (activePrio == undefined) {
        toggleClass(`${urgency}-button`, `active-${urgency}`);
        activePrio = prioBox.querySelector(`.active-${urgency}`);
        changePrioImage(urgency);
    } else {
        toggleClass(activePrio.id, activePrio.classList[1]);
        changePrioImage(activePrio.value);
        toggleClass(`${urgency}-button`, `active-${urgency}`);
        activePrio = prioBox.querySelector(`.active-${urgency}`);
        changePrioImage(urgency);
    }
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
 * Adds a subtask below it's input field.
 */
function addSubtask() {
    let subtaskInput = document.getElementById('subtask-input');
    let subtaskList = document.getElementById('subtask-list');
    if (!subtaskInput.value == '') {
        subtaskList.innerHTML += subtaskTemplate(subtaskInput.value);
        allSubtasks.push(subtaskInput.value);
        subtaskInput.value = '';
    }
}


/**
 * Deletes a subtask.
 * 
 * @param {String} id 
 */
function deleteSubtask(id) {
    let subtask = document.getElementById(id)
    let index = allSubtasks.indexOf(id);
    allSubtasks.splice(index, 1);
    subtask.remove();
}


/**
 * Either shows or hides selectable categories/contacts to assign to in the task form.
 * 
 * @param {String} id 
 */
function toggleDropdown(id) {
    let dropdownOptions = document.getElementById(`${id}-options`);
    if (dropdownOptions.classList.contains('collapse')) {
        dropdownOptions.classList.replace('collapse', 'expand');
        dropdownOptions.previousElementSibling.classList.add('rotate-arrow');
    } else {
        dropdownOptions.classList.replace('expand', 'collapse');
        dropdownOptions.previousElementSibling.classList.remove('rotate-arrow');
    }
    toggleClass(id, 'dropdown-active');
}