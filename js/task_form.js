const STORAGE_TOKEN = 'TCAWZIOJMRESTMBP7O1RSEW3GLLEFAJIXAFI0XQP';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item'
let allTasks = [];
let oldCategoryDropdown;
let category;
let allColors = ["assets/img/lightblue-circle.png", "assets/img/red-circle.png", "assets/img/green-circle.png", "assets/img/orange-circle.png", "assets/img/pink-circle.png", "assets/img/blue-circle.png"];
let activeColor;
let activePrio;
let subtasks = [];


/**
 * Adds a task to the board after validating.
 */
function addTask() {
    let clearButton = document.getElementById('clear-button');
    let validationNotes = document.getElementsByClassName('validation-note');
    let task = taskTemplate();
    if (validateForm().length == validationNotes.length) {
        saveTask(task);
        clearButton.click();
        toggleClass('new-task-confirmation', 'confirmation-animation');
        setTimeout(() => {
            window.location = 'board.html'
        }, 1250);
    }
}


/**
 * Saves the recently added task.
 * 
 * @param {JSON} task 
 */
async function saveTask(task) {
    allTasks.push(task);
    setItem('allTasks', allTasks);
}


/**
 * Loads all Tasks which are stored from the server.
 */
async function loadTask() {
    allTasks = getItem('allTasks') || [];
}


/**
 * Sets an item in backend.
 * 
 * @param {String} key 
 * @param {Value} value 
 * @returns Item to be set in backend.
 */
async function setItem(key, value) {
    const payload = {key, value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}


/**
 * Requests an item from backend.
 * 
 * @param {String} key 
 * @returns response from backend as JSON.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}


/**
 * Selects category from dropdown.
 * 
 * @param {String} value 
 */
function selectCategory(value, src) {
    category = {
        'name': value,
        'image': src
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
    selectCategory(lowNewCategoryName, activeColor);
}


/**
 * Renders the color palatte to choose from when creating a new category.
 */
function createColors() {
    let colorPalette = document.getElementById('colors');
    colorPalette.classList.add('colors');
    for (let c = 0; c < allColors.length; c++) {
        const color = allColors[c];
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
 * Toggles checkbox when clicking on an Element.
 * 
 * @param {String} id 
 */
function toggleCheckbox(id) {
    let selectedItem = document.getElementById(id);
    let protocol = window.location.protocol;
    let host = window.location.host;
    if (selectedItem.lastElementChild.src == `${protocol}//${host}/assets/img/unchecked-checkbox.png`) {
        selectedItem.lastElementChild.src = `assets/img/filled-checkbox.png`;
    } else {
        selectedItem.lastElementChild.src = `assets/img/unchecked-checkbox.png`;
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
        subtasks.push(subtaskInput.value);
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
    let index = subtasks.indexOf(id);
    subtasks.splice(index, 1);
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