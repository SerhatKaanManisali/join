/**
 * Forces you to enter at least one character in the title field.
 * 
 * @returns the task's title.
 */
function validateTitle() {
    let title = document.getElementById('title');
    let validationNote = document.getElementById('title-validation');
    if (title.value == '') {
        validationNote.innerHTML = 'Please enter a title';
    } else {
        validationNote.innerHTML = '';
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
    let validationNote = document.getElementById('description-validation');
    if (description.value == '') {
        validationNote.innerHTML = 'Please enter a description';
    } else {
        validationNote.innerHTML = '';
        return description.value;
    }
}


/**
 * Forces you to pick a category.
 * 
 * @returns the task's category.
 */
function validateCategory() {
    let validationNote = document.getElementById('category-validation');
    if (category == undefined) {
        validationNote.innerHTML = 'Please select a category';
    } else {
        validationNote.innerHTML = '';
        return category;
    }
}


/**
 * @returns contacts that have been assigned to a task.
 */
function validateAssignment() {
    let assignment = [];
    let selectedContacts = document.getElementById('assignment-options').querySelectorAll('img[src*="filled"]');
    let validationNote = document.getElementById('assignment-validation');
    if (selectedContacts.length == 0) {
        validationNote.innerHTML = 'Please select at least one contact';
    } else {
        validationNote.innerHTML = '';
        selectedContacts.forEach(selectedContact => assignment.push(selectedContact.previousElementSibling.innerHTML));
        return assignment;
    }
}


/**
 * @returns value of the picked date.
 */
function validateDate() {
    let validationNote = document.getElementById('date-validation');
    let datePicker = document.getElementById('date');
    if (datePicker.value == '') {
        validationNote.innerHTML = 'Please pick a date';
    } else {
        validationNote.innerHTML = '';
        return datePicker.value;
    }
}


/**
 * @returns value of the prio.
 */
function validatePrio() {
    let validationNote = document.getElementById('prio-validation');
    if (prio == undefined) {
        validationNote.innerHTML = 'Please pick a prio';
    } else {
        validationNote.innerHTML = '';
        return prio;
    }
}


/**
 * Forces you to pick exactly one color.
 * 
 * @param {String} validationNote 
 * @param {String} newCategoryName 
 */
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
    let disabledButtons = document.getElementById('prio').querySelectorAll('button[class*="disabled"]');
    if (activeButton) {
        let activeButtonValue = activeButton.value;
        activeButton.setAttribute('class', 'prio-button');
        activeButton.firstElementChild.src = `assets/img/default-${activeButtonValue}.png`;
        disabledButtons.forEach(disabledButton => disabledButton.classList.remove('disabled'));
    }
}


/**
 * Clears all subtasks.
 */
function clearSubtasks() {
    let subtaskList = document.getElementById('subtask-list');
    subtaskList.innerHTML = '';
}