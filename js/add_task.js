let allTasks = [];
let allColors = ["assets/img/lightblue-circle.png", "assets/img/red-circle.png", "assets/img/green-circle.png", "assets/img/orange-circle.png", "assets/img/pink-circle.png", "assets/img/blue-circle.png"];
let currentColor;
let activeColor;
let defaultColor;
let prio;
let category;
let oldDropdown;


/**
 * Adds a task which is also visible to other users later on.
 */
function addTask() {
    taskElementsTemplate();
    let task = {
        'title': title.value,
        'description': description.value,
        'category': category,
        'assignment': assignment,
        'date': date,
        'prio': prio,
        'subtask': subtask
    }
    saveTask(task);
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
 * Improves the function's clarity.
 * 
 * @returns single elements of a task.
 */
function taskElementsTemplate() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assignment = document.getElementById('assignment');
    let date = document.getElementById('date');
    let subtask = document.getElementById('subtask');

    return title, description, category, assignment, date, subtask;
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
 * Creates a new category
 */
function createCategory() {
    oldDropdown = document.getElementById('category');
    let oldId = oldDropdown.getAttribute('id');
    let newInput = document.createElement('input');
    let categoryBox = document.getElementById(`category-box`);
    changeDropdownToInput(categoryBox, oldDropdown, newInput);
    setCategoryAttributes(newInput, oldId);
    categoryBox.innerHTML += createCategoryTemplate();
    createColors();
    currentColor = undefined;
}


/**
 * Subfunction of createCategory() for changing the dropdown ot an input so you can type the new category's name.
 * 
 * @param {Element} categoryBox 
 * @param {Element} oldDropdown 
 * @param {Element} newInput 
 */
function changeDropdownToInput(categoryBox, oldDropdown, newInput) {
    categoryBox.classList.replace('dropdown', 'input-category-parent');
    categoryBox.onclick = null;
    oldDropdown.replaceWith(newInput);
}


/**
 * Transfers attribute of old category button to new input which appears when you want to create a new category.
 * 
 * @param {Element} element
 * @param {String} idValue
 */
function setCategoryAttributes(element, idValue) {
    element.setAttribute('id', `input-${idValue}`);
    element.setAttribute('class', `input-${idValue}`);
    element.setAttribute('type', 'text');
    element.setAttribute('placeholder', 'New category name');
}


function cancelNewCategory() {
    let categoryBox = document.getElementById(`category-box`);
    let colors = document.getElementById('colors');
    let validationNote = document.getElementById('category-validation');
    categoryBox.classList.replace('input-category-parent', 'dropdown');
    categoryBox.replaceChildren(oldDropdown);
    categoryBox.setAttribute('onclick', 'toggleDropdown("category")');
    colors.innerHTML = '';
    validationNote.innerHTML = '';
}


function addNewCategory() {
    let validationNote = document.getElementById('category-validation');
    let newCategoryName = document.getElementById('input-category').value;
    if (newCategoryName == '') {
        validationNote.innerHTML = 'Please choose a category name';
    } else {
        validateColor(validationNote, newCategoryName);
    }
}


function validateColor(validationNote, newCategoryName) {
    if (currentColor == undefined) {
        validationNote.innerHTML = 'Please pick a color';
    } else {
        cancelNewCategory();
        insertCategoryToDropdown(newCategoryName);
        currentColor = undefined;
        validationNote.innerHTML = '';
    }
}


function insertCategoryToDropdown(newCategoryName) {
    let addCategoryButton = document.getElementById('new-category');
    let lowNewCategoryName = newCategoryName.toLowerCase();
    addCategoryButton.insertAdjacentHTML('afterend', newCategoryTemplate(newCategoryName, lowNewCategoryName));
    selectCategory(lowNewCategoryName, currentColor);
}


/**
 * This template improves clarity.
 * 
 * @returns innerHTML of new input field
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


function createColors() {
    let colorPalette = document.getElementById('colors');
    for (let c = 0; c < allColors.length; c++) {
        const color = allColors[c];
        colorPalette.innerHTML += /*html*/`
            <img id="${color}" onclick="pickColor('${color}')" src="${color}">
        `;
    }
}


function pickColor(color) {
    toggleClass(color, 'active-color');
    let colorPalette = document.getElementById('colors');
    activeColor = colorPalette.querySelector('.active-color');
    defaultColor = colorPalette.querySelectorAll(`img:not(.active-color)`);
    disableRemainingColors(color, defaultColor);
}


function disableRemainingColors(color, defaultColor) {
    if (color == currentColor) {
        currentColor = undefined;
        defaultColor.forEach(defaultColor => defaultColor.classList.remove('disabled'));
    } else {
        currentColor = color;
        defaultColor.forEach(defaultColor => defaultColor.classList.add('disabled'));
    }
}


function newCategoryTemplate(newCategoryName, lowNewCategoryName) {
    return /*html*/`
        <div id="${lowNewCategoryName}" onclick="selectCategory('${lowNewCategoryName}')">
        ${newCategoryName} <img src="${currentColor}">
        </div>
    `;
}


/**
 * Chooses prio in the task form.
 * 
 * @param {String} urgency 
 */
function choosePrio(urgency) {
    toggleClass(`${urgency}-button`, `active-${urgency}`);
    changePrioImage(urgency);
    let prioBox = document.getElementById('prio');
    let activePrio = prioBox.querySelector(`.active-${urgency}`);
    let defaultPrio = prioBox.querySelectorAll(`button:not(.active-${urgency})`);
    setUrgencyValue(urgency, activePrio);
    disableRemainingPrio(defaultPrio, activePrio);
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
 * Gives the globally defined variable prio a value.
 * e.g. urgent.
 * 
 * @param {String} urgency 
 * @param {Element} activePrio 
 */
function setUrgencyValue(urgency, activePrio) {
    if (prio !== urgency) {
        prio = activePrio.value
    } else {
        prio = undefined;
    }
}


/**
 * Disables remaining prio buttons which have been not selected.
 * 
 * @param {Element} defaultPrio
 * @param {Element} activePrio
 */
function disableRemainingPrio(defaultPrio, activePrio) {
    if (activePrio) {
        defaultPrio.forEach(defaultPrio => defaultPrio.classList.add('disabled'));
    } else {
        defaultPrio.forEach(defaultPrio => defaultPrio.classList.remove('disabled'));
    }
}


/**
 * Changes image on hover so the color of the image matches it's parent element's hover effects.
 * 
 * @param {String} id 
 * @param {String} url 
 */
function changeImageOnHover(id, url) {
    let button = document.getElementById(id);
    button.firstElementChild.src = url;
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