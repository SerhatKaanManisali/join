/**
 * @returns arry including all empty validation notes.
 */
function validateForm() {
    let validationNotes = document.getElementsByClassName('validation-note');
    let result = [];
    for (let i = 0; i < validationNotes.length; i++) {
        if (validationNotes[i].innerHTML == '') {
            result.push(validationNotes[i]);
        }
    }
    return result;
}


/**
 * Forces you to enter at least one character in the title field.
 * 
 * @returns the task's title.
 */
function validateTitle() {
    let title = document.getElementById('title');
    if (title.value == '') {
        validationMessage('title', 'Please enter a title');
    } else {
        validationMessage('title');
        return title.value;
    }
}


/**
 * Forces you to enter at least one character in the description field.
 * 
 * @returns the task's description.
 */
function validateDescription() {
    let description = document.getElementById('description');
    if (description.value == '') {
        validationMessage('description', 'Please enter a description');
    } else {
        validationMessage('description');
        return description.value;
    }
}


/**
 * Forces you to pick a category.
 * 
 * @returns the task's category.
 */
function validateCategory() {
    if (category == undefined) {
        validationMessage('category', 'Please select a category');
    } else {
        validationMessage('category');
        return category;
    }
}


/**
 * @returns contacts that have been assigned to a task.
 */
function validateAssignment() {
    let assignment = [];
    let selectedContacts = document.getElementById('assignment-options').querySelectorAll('img[src*="filled"]');
    if (selectedContacts.length == 0) {
        validationMessage('assignment', 'Please select at least one contact');
    } else {
        validationMessage('assignment');
        selectedContacts.forEach(selectedContact => assignment.push(selectedContact.previousElementSibling.innerHTML));
        return assignment;
    }
}


/**
 * @returns value of the picked date.
 */
function validateDate() {
    let datePicker = document.getElementById('date');
    if (datePicker.value == '') {
        validationMessage('date', 'Please pick a date');
    } else {
        validationMessage('date');
        return datePicker.value;
    }
}


/**
 * @returns value of the active prio.
 */
function validatePrio() {
    if (activePrio == undefined) {
        validationMessage('prio', 'Please pick a prio');
    } else {
        validationMessage('prio');
        return activePrio.value;
    }
}


/**
 * Forces you to pick exactly one color.
 * 
 * @param {String} validationNote 
 * @param {String} newCategoryName 
 */
function validateColor(validationNote, newCategoryName) {
    if (activeColor == undefined) {
        validationNote.innerHTML = 'Please pick a color';
    } else {
        cancelNewCategory();
        insertCategoryToDropdown(newCategoryName);
        activeColor = undefined;
        validationNote.innerHTML = '';
    }
}


/**
 * Clears the task form.
 */
function clearForm() {
    clearCategory();
    clearAssignment();
    clearDate();
    clearPrio();
    clearSubtasks();
}


/**
 * Resets the category.
 */
function clearCategory() {
    let selectedByDefault = document.getElementById('selected-by-default');
    selectedByDefault.innerHTML = 'Select task category';
}


/**
 * Resets the assigned contacts.
 */
function clearAssignment() {
    let assignedContacts = document.getElementById('assignment-options').querySelectorAll('img[src*="filled"]');
    assignedContacts.forEach(assignedContact => assignedContact.src = 'assets/img/unchecked-checkbox.png');
    let assignment = document.getElementById('assignment');
    if (assignment.classList.contains('dropdown-active')) {
        toggleDropdown('assignment');
    }
}


/**
 * Resets the date.
 */
function clearDate() {
    let datePicker = document.getElementById('date');
    datePicker.value = '';
}


/**
 * Resets the prio.
 */
function clearPrio() {
    let activeButton = document.getElementById('prio').querySelector('button[class*="active-"]');
    if (activeButton) {
        let activeButtonValue = activeButton.value;
        activeButton.setAttribute('class', 'prio-button');
        activeButton.firstElementChild.src = `assets/img/default-${activeButtonValue}.png`;
    }
}


/**
 * Clears all subtasks.
 */
function clearSubtasks() {
    let subtaskList = document.getElementById('subtask-list');
    subtaskList.innerHTML = '';
    subtasks = [];
}


/**
 * Shows a message if a required field is empty.
 * 
 * @param {String} id 
 * @param {String} message 
 */
function validationMessage(id, message) {
    let validationMessage = document.getElementById(`${id}-validation`);
    if (!message) {
        message = '';
    }
    validationMessage.innerHTML = message;
}