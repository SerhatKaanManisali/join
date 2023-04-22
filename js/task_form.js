let oldDropdown;
let category;
let allColors = ["assets/img/lightblue-circle.png", "assets/img/red-circle.png", "assets/img/green-circle.png", "assets/img/orange-circle.png", "assets/img/pink-circle.png", "assets/img/blue-circle.png"];
let currentColor;
let activeColor;
let defaultColor;
let prio;
let subtasks = [];


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
    categoryBox.classList.replace('dropdown', 'input-parent');
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
    validationMessage('category', '');
}


/**
 * Reverts the input for a new category back to a dropdown.
 */
function revertCategoryBox() {
    let categoryBox = document.getElementById(`category-box`);
    categoryBox.classList.replace('input-parent', 'dropdown');
    categoryBox.replaceChildren(oldDropdown);
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
    selectCategory(lowNewCategoryName, currentColor);
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
    toggleClass(color, 'active-color');
    let colorPalette = document.getElementById('colors');
    activeColor = colorPalette.querySelector('.active-color');
    defaultColor = colorPalette.querySelectorAll(`img:not(.active-color)`);
    disableRemainingColors(color, defaultColor);
}


/**
 * Makes only one color choosable when creating a new category.
 * 
 * @param {String} color 
 * @param {NodeList} defaultColor 
 */
function disableRemainingColors(color, defaultColor) {
    if (color == currentColor) {
        currentColor = undefined;
        defaultColor.forEach(defaultColor => defaultColor.classList.remove('disabled'));
    } else {
        currentColor = color;
        defaultColor.forEach(defaultColor => defaultColor.classList.add('disabled'));
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
    let subtask = document.getElementById(id);
    subtasks.splice(subtask.value, 1);
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


/**
 * Shows a message if a required field is empty.
 * 
 * @param {String} id 
 * @param {String} message 
 */
function validationMessage(id, message) {
    let validationMessage = document.getElementById(`${id}-validation`);
    validationMessage.innerHTML = message;
}