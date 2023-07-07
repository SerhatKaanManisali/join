let allContacts = [];
let currentContact;
let oneItemArray = [1];


async function initContacts() {
    await init('contacts');
    renderContacts();
}



function renderContacts() {
    let currentChar;
    let contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    sortContacts();
    for (let c = 0; c < allContacts.length; c++) {
        const name = allContacts[c]['name'];
        const abbreviation = createNameAbbreviation(name);
        const backgroundColor = allContacts[c]['rgb'];
        const firstChar = allContacts[c]['name'][0].toUpperCase();
        if (currentChar !== firstChar) {
            currentChar = firstChar;
            contactsList.innerHTML += contactDividerTemplate(firstChar);
        }
        contactsList.innerHTML += contactCardTemplate(name, abbreviation, backgroundColor, c);
    }
}



async function addContact() {
    let cancelButton = document.getElementById('cancel-button');
    let validationNotes = document.getElementsByClassName('validation-note');
    let contact = contactTemplate();
    if (validateForm().length == validationNotes.length) {
        await saveContact(contact);
        cancelButton.click();
        toggleClass('contact-form-wrapper', 'hide');
        renderContacts();
        showContactConfirmation();
    }
}



async function saveContact(contact) {
    allContacts.push(contact);
    await setItem('allContacts', allContacts);
}



function showContactConfirmation() {
    toggleClass('new-contact-confirmation', 'confirmation-animation');
    setTimeout(() => {
        toggleClass('new-contact-confirmation', 'confirmation-animation');
    }, 1300);
}



function sortContacts() {
    allContacts = allContacts.sort((a, b) => {
        if (a.name[0].toUpperCase() < b.name[0].toUpperCase()) {
            return -1;
        }
    });
}



function showContactInfo(c, backgroundColor) {
    highlightContact(c);
    renderContactInfo(c, backgroundColor)
}



function highlightContact(c) {
    if (currentContact == undefined) {
        toggleClass(c, 'highlighted-contact');
        currentContact = c
    } else {
        toggleClass(currentContact, 'highlighted-contact');
        currentContact = c;
        toggleClass(currentContact, 'highlighted-contact');
    }
}



function renderContactInfo(c) {
    renderAbbreviation(c);
    renderName(c);
    renderEmail(c);
    renderPhone(c);
}



function renderAbbreviation(c) {
    let abbreviationBox = document.getElementById('abbreviation');
    let abbreviation = createNameAbbreviation(allContacts[c]['name']);
    let backgroundColor = allContacts[c]['rgb'];
    abbreviationBox.innerHTML = abbreviation;
    abbreviationBox.style.backgroundColor = backgroundColor;
    abbreviationBox.style.border = '3px solid white';
}



function renderName(c) {
    let nameBox = document.getElementById('contact-name');
    let name = allContacts[c]['name'];
    nameBox.innerHTML = name;
}



function renderEmail(c) {
    let emailBox = document.getElementById('contact-email');
    let email = allContacts[c]['email'];
    emailBox.href = `mailto:${email}`
    emailBox.innerHTML = email;
}



function renderPhone(c) {
    let phoneBox = document.getElementById('contact-phone');
    let phoneNumber = allContacts[c]['phone'];
    phoneBox.href = `tel:${phoneNumber}`;
    phoneBox.innerHTML = phoneNumber;
}