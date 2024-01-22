let contacts = [
  {
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "+49 123 456789",
    color: "#3498db",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+49 234 567890",
    color: "#2ecc71",
  },
  {
    name: "Brad Williams",
    email: "brad@example.com",
    phone: "+49 345 678901",
    color: "#e74c3c",
  },
  {
    name: "Michael Davis",
    email: "michael@example.com",
    phone: "+49 456 789012",
    color: "#f39c12",
  },
  {
    name: "David Clark",
    email: "david@example.com",
    phone: "+49 567 890123",
    color: "#9b59b6",
  },
  {
    name: "Diana Martinez",
    email: "diana@example.com",
    phone: "+49 678 901234",
    color: "#1abc9c",
  },
  {
    name: "Eva Miller",
    email: "eva@example.com",
    phone: "+49 789 012345",
    color: "#3498db",
  },
  {
    name: "Sam Taylor",
    email: "sam@example.com",
    phone: "+49 890 123456",
    color: "#2ecc71",
  },
  {
    name: "Sara Brown",
    email: "sara@example.com",
    phone: "+49 901 234567",
    color: "#e74c3c",
  },
  {
    name: "Ross Wilson",
    email: "ross@example.com",
    phone: "+49 012 345678",
    color: "#f39c12",
  },
  {
    name: "Kate Moore",
    email: "kate@example.com",
    phone: "+49 345 678901",
    color: "#9b59b6",
  },
  {
    name: "Karl Lee",
    email: "karl@example.com",
    phone: "+49 567 890123",
    color: "#1abc9c",
  },
  {
    name: "John Turner",
    email: "john@example.com",
    phone: "+49 789 012345",
    color: "#3498db",
  },
];


/**
 * Initializes certain functions once the body of the page has fully loaded.
 */
async function initContacts() {
  checkLogInStatus();
  await init('contacts');
//   await loadContactsFromServer();
  renderContactBook();
}


/**
 * Renders contact overview section
 */
function renderContactBook() {
    const contactOverview = document.getElementById("contactOverviewContent");
    let currentAlphabetLetter = null;

    contactOverview.innerHTML = "";
    contactOverview.innerHTML = renderAddContactButton();

    sortContactsAlphabetically();

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const contactFirstLetter = contact.name.charAt(0).toUpperCase();
        handleLetterChange(currentAlphabetLetter, contactFirstLetter, contactOverview);
        currentAlphabetLetter = contactFirstLetter;

        const circleStyle = `background-color: ${contact.color};`;
        const circleClass = `circle-${contact.name.charAt(0).toUpperCase()}`;
        const nameParts = contact.name.split(" ");
        const contactInitials = calculateContactInitials(nameParts);

        renderContactItem(contactOverview, circleStyle, circleClass, contactInitials, contact, i);
    }

    handleLastLetter(currentAlphabetLetter, contactOverview);
}

  /**
   * Generates HTML for the "Add new contact" button.
   */
function renderAddContactButton() {
    const addContactButtonHTML = `
      <button id="addContactButton" onclick="addContact()">
        Add new contact <img src="/assets/img/add-contact.png" alt="add contact image">
      </button>
    `;
    return addContactButtonHTML;
  }


/**
 * Sorts the contacts alphabetically based on the name.
 *
 * @returns {Array} - The sorted contacts.
 */
function sortContactsAlphabetically() {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}


/**
 * Handles changes in the current group and renders the new group header if needed.
 *
 * @param {string} currentAlphabetLetter - The current letter group.
 * @param {string} newLetter - The new letter group.
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function handleLetterChange(currentAlphabetLetter, newLetter, contactOverview) {
  if (newLetter !== currentAlphabetLetter) {
    openLetterGroup(newLetter, contactOverview);
  } else {
    closeLetterGroup(contactOverview);
  }
}


/**
 * Renders a contact item with circle and details.
 *
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 * @param {string} circleStyle - The CSS style for the circle.
 * @param {string} circleClass - The class for the circle.
 * @param {string} contactInitials - The contact's initials.
 * @param {Object} contact - The contact information.
 * @param {number} index - The index of the contact.
 */
function renderContactItem(contactOverview, circleStyle, circleClass, contactInitials, contact, index) {
  const contactItemId = `contactItem_${index}`;
  const contactItemHTML = `
        <div id="${contactItemId}" class="contactItem" onclick="showContactDetails('${contactItemId}', true)">
            <div class="circle ${circleClass}" style="${circleStyle}">${contactInitials}</div>
            <div class="contactDetails">
                <div class="contactNameInOverview">${contact.name}</div>
                <div class="emailInOverview">${contact.email}</div>
            </div>
        </div>
    `;
  contactOverview.innerHTML += contactItemHTML;
}


/**
 * Calculates the contact initials based on name parts.
 *
 * @param {Array} nameParts - The parts of the contact's name.
 * @returns {string} - The calculated initials.
 */
function calculateContactInitials(nameParts) {
  return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`;
}


/**
 * Opens a new contact group.
 *
 * @param {string} newLetter - The new letter group.
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function openLetterGroup(newLetter, contactOverview) {
  contactOverview.innerHTML += `<div class="contact-group">
                                    <div class="groupHeader">${newLetter}</div>
                                    <hr class="groupDivider">`;
}


/**
 * Closes the current contact group.
 *
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function closeLetterGroup(contactOverview) {
  contactOverview.innerHTML += `</div>`;
}


/**
 * Handles the last group and closes it if needed.
 *
 * @param {string} currentAlphabetLetter - The current name group.
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function handleLastLetter(currentAlphabetLetter, contactOverview) {
  if (currentAlphabetLetter !== null) {
    closeLetterGroup(contactOverview);
  }
}


/**
 * Shows contact details and renders them in the 'contactDetailsView' div.
 *
 * @param {string} contactItemId - The ID of the contact item.
 * @param {boolean} toEdit - True, wenn der Bearbeitungsmodus aktiviert ist.
 */
function showContactDetails(contactItemId, toEdit) {
    toggleSelectedClass(contactItemId);
  
    let sortedIndex = parseInt(contactItemId.split('_')[1]);
    let selectedContact = sortContactsAlphabetically()[sortedIndex];
  
    renderContactDetails(selectedContact, toEdit);

    const screenWidth = window.innerWidth;

    if (screenWidth <= 665){
      document.getElementById("contactOverview").style.display = "none";
      document.getElementById("contactPageRightHeader").style.display = "none";
      document.getElementById("contactPageRightHeaderResponsive").style.display = "flex";
      document.getElementById("contactDetailsView").style.display = "flex !important";
      document.getElementById("responsiveAddContactButton").setAttribute('style', 'display:none !important');
      document.getElementById("responsiveEditContactButton").setAttribute('style', 'display:flex !important');
      document.querySelector(".contactEditButton").setAttribute('style', 'display:none !important');
      document.querySelector(".contactDeleteButton").setAttribute('style', 'display:none !important');
    }
  }


/**
 * Toggles the 'selectedContact' class for the clicked contact item and
 * handles the corresponding actions like displaying or hiding contact details.
 *
 * @param {string} contactItemId - The ID of the contact item.
 */
function toggleSelectedClass(contactItemId) {
    const clickedItem = document.getElementById(contactItemId);
    const contactDetailsView = document.getElementById("contactDetailsView");
    const isSelected = clickedItem.classList.toggle("selectedContact");

    if (isSelected) {
        showSelectedContactDetails(clickedItem);
    } else {
        hideContactDetails(contactDetailsView);
    }

    unselectOtherContactItems(clickedItem);
}

/**
 * Shows details of the selected contact.
 *
 * @param {HTMLElement} clickedItem - The clicked contact item.
 */
function showSelectedContactDetails(clickedItem) {
    const sortedIndex = parseInt(clickedItem.id.split('_')[1]);
    const selectedContact = sortContactsAlphabetically()[sortedIndex];
    renderContactDetails(selectedContact);
    document.getElementById("contactDetailsView").style.display = "flex";
}

/**
 * Hides the contact details view.
 *
 * @param {HTMLElement} contactDetailsView - The contact details view element.
 */
function hideContactDetails(contactDetailsView) {
    contactDetailsView.style.display = "none";
}

/**
 * Unselects the 'selectedContact' class from other contact items.
 *
 * @param {HTMLElement} clickedItem - The clicked contact item.
 */
function unselectOtherContactItems(clickedItem) {
    const contactItems = document.querySelectorAll(".contactItem");
    contactItems.forEach(item => {
        if (item !== clickedItem) {
            item.classList.remove("selectedContact");
        }
    });
}


/**
 * closes contact detail view and returns to contact book when viewed on mobile device
 * 
 */
function returnToContactBook(){
  document.getElementById("contactOverview").style.display = "flex";
  document.getElementById("contactPageRightHeaderResponsive").style.display = "none";
  document.getElementById("contactDetailsView").style.display = "none";
  document.getElementById("responsiveContactDetailBack").style.display = "none";
  document.getElementById("responsiveAddContactButton").setAttribute('style', 'display:flex !important');
  document.getElementById("responsiveEditContactButton").setAttribute('style', 'display:none !important');

  renderContactBook();
}
  

/**
 * Renders the detailed view of a contact, including name, buttons, and contact information.
 *
 * @param {Object} contact - The contact information.
 * @param {boolean} toEdit - True if in edit mode.
 */
function renderContactDetails(contact, toEdit) {
    const contactDetailsView = document.getElementById("contactDetailsView");
    contactDetailsView.innerHTML = "";

    const contactDetailsHTML = `
        <div class="contactDetailsName">
            <div class="circle circleInDetailView" style="background-color: ${contact.color};">
                ${calculateContactInitials(contact.name.split(" "))}
            </div>
            <div class="contactDetailsNameAndButtons">
                <div class="contactDetailsNameFull">${contact.name}</div>
                <div class="contactNameIcons">
                    ${renderEditDeleteButtons()}
                </div>
            </div>
        </div>
        <p class="contactInformation">Contact Information</p>
        <div class="emailAndPhoneDetails">
            <p id="emailDetails"><b>Email</b></p>
            <div class="emailDetails"><a href="mailto:${contact.email}">${contact.email}</a></div>
            <p><b>Phone</b></p>
            <div class="phoneDetails"><a href="tel:${contact.phone}">${contact.phone}</a></div>
        </div>
    `;

    contactDetailsView.innerHTML = contactDetailsHTML;

    if (toEdit) {
        renderEditFields(contact);
    }

    document.getElementById("responsiveContactDetailBack").style.display = "flex";

}


/**
 * Renders the edit fields with the contact's information for editing.
 *
 * @param {Object} contact - The contact information.
 */
function renderEditFields(contact) {
    const editNameField = document.getElementById("editName");
    const editEmailField = document.getElementById("editEmail");
    const editPhoneField = document.getElementById("editPhone");

    editNameField.value = contact.name;
    editEmailField.value = contact.email;
    editPhoneField.value = contact.phone;

    const initialIcon = document.getElementById("iconInEditContact");
    initialIcon.innerHTML = `
        <div class="circle circleInDetailView responsiveCircle" style="background-color: ${contact.color};">
            ${calculateContactInitials(contact.name.split(" "))}
        </div>
    `;
}


/**
 * Renders the buttons for editing and deleting a contact.
 *
 * @returns {string} - HTML for the edit and delete buttons.
 */
function renderEditDeleteButtons() {
    return `
        <div class="contactEditButton" onclick="editContact()">
            <img class="contactDetailsNameIcons" src="/assets/img/edit-contact.png" alt="edit contact">
            <p>Edit</p>
        </div>
        <div class="contactDeleteButton" onclick="deleteContact()">
            <img class="contactDetailsNameIcons" src="/assets/img/delete-contact.png" alt="delete contact">
            <p>Delete</p>
        </div>
    `;
}



/**
 * Opens the pop-up for adding a new contact.
 * 
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 */
function addContact() {
    const addContactOverlay = document.getElementById("addContactOverlay");

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let responsiveButton = document.getElementById("responsiveAddContactButton");

    name.value = "";
    email.value = "";
    phone.value = "";

    responsiveButton.style.zIndex = "-200";
    addContactOverlay.style.display = "flex";

    addContactOverlay.addEventListener("click", function(event) {
        if (event.target === addContactOverlay) {
            closePopUp();
        }
    });
}


/**
 * Closes the pop-up.
 */
function closePopUp() {
    document.getElementById("addContactOverlay").style.display = "none";
    document.getElementById("editContactOverlay").style.display = "none";
    document.getElementById("responsiveAddContactButton").style.zIndex = "1200";

    let responsiveAddContactButton = document.getElementById("responsiveAddContactButton");
    responsiveAddContactButton.setAttribute('style', 'display:flex !important');
}


/**
 * Function for adding new contact
 */
function createContact() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const saveButton = document.getElementById("saveButton");
  
    createLoadingAnimation(saveButton);
  
    setTimeout(async function () {
      const newContact = {
        name: name,
        email: email,
        phone: phone,
        color: generateRandomColor(),
      };
  
      await addContactAndRender(newContact);
      closePopUpWithConfirmation();
      resetSaveButton(saveButton);
  
      const newIndex = findContactIndex(newContact);
      const contactItemId = `contactItem_${newIndex}`;
      showContactDetails(contactItemId);
    }, 1000);
  }
/**
 * Creates a loading animation for the save button, disabling it and displaying a loader.
 *
 * @param {HTMLElement} saveButton - The save button element.
 */
function createLoadingAnimation(saveButton) {
    saveButton.disabled = true;
    saveButton.style.justifyContent = 'center';
    saveButton.innerHTML = '<div class="loader"></div>';
}

/**
 * Resets the save button after loading animation, enabling it and setting the default content.
 *
 * @param {HTMLElement} saveButton - The save button element.
 */
function resetSaveButton(saveButton) {
    saveButton.disabled = false;
    saveButton.innerHTML = 'Create Contact <img src="/assets/img/check.png" alt="confirm icon">';
    saveButton.style.justifyContent = 'space-between';
}

/**
 * Adds a new contact to the contacts array and renders the contact book.
 *
 * @param {Object} newContact - The new contact to be added.
 */
async function addContactAndRender(newContact) {
    contacts.push(newContact);
    await setItemContacts("contacts", JSON.stringify(contacts));
    renderContactBook();
}

/**
 * Finds the index of a contact in the sorted contacts array.
 *
 * @param {Object} contactToFind - The contact to find in the array.
 * @returns {number} - The index of the contact in the sorted array.
 */
function findContactIndex(contactToFind) {
    const sortedContacts = sortContactsAlphabetically();
    return sortedContacts.findIndex(contact =>
        contact.name === contactToFind.name && contact.email === contactToFind.email && contact.phone === contactToFind.phone
    );
}
  


/**
 * Generates a random hex color.
 * @returns {string} - Random hex color.
 */
function generateRandomColor() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}


/**
 * Displays a confirmation message and hides it.
 */
function showConfirmationMessage() {
    const confirmationMessage = document.getElementById("confirmationMessage");
    confirmationMessage.style.display = "flex";
    
    setTimeout(function () {
        confirmationMessage.style.display = "none";
    }, 1500);
}


/**
 * Closes the pop-up and shows the confirmation message.
 */
function closePopUpWithConfirmation() {
    showConfirmationMessage();
    closePopUp();
}


/**
 * Opens the pop-up for editing a contact.
 * 
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 */
function editContact() {
    let editContactOverlay = document.getElementById("editContactOverlay");
    let responsiveAddContactButton = document.getElementById("responsiveAddContactButton");

    responsiveAddContactButton.setAttribute('style', 'display:none !important');
    editContactOverlay.style.display = "flex";
}


/**
 * Saves the edited contact information, updates the contact book, and shows the edited contact details.
 */
async function saveEditedContact() {
    const editedName = document.getElementById("editName").value;
    const editedEmail = document.getElementById("editEmail").value;
    const editedPhone = document.getElementById("editPhone").value;

    const selectedContactItem = document.querySelector(".selectedContact");
    const index = parseInt(selectedContactItem.id.split('_')[1]);

    contacts[index].name = editedName;
    contacts[index].email = editedEmail;
    contacts[index].phone = editedPhone;

    await setItemContacts("contacts", JSON.stringify(contacts));

    closePopUp();

    renderContactBook();

    showContactDetails(selectedContactItem.id);
}


/**
 * Deletes the selected contact, updates the contacts array, and re-renders the contact book.
 */
async function deleteContact() {
    const selectedContactItem = document.querySelector(".selectedContact");
    const detailView = document.getElementById("contactDetailsView");

    if (selectedContactItem) {
        const contactItemId = selectedContactItem.id;
        const index = parseInt(contactItemId.split('_')[1]);

        contacts.splice(index, 1);

        await setItemContacts("contacts", JSON.stringify(contacts));

        closePopUp();
        renderContactBook();
        
        detailView.style.display = "none";
    }
}

/**
 * shows edit and delete contact button in responsive mode and hides it
 * 
 */
function toggleEditDeleteButtonPopUp() {
  let popUp = document.getElementById('editDeleteButtonPopUp');
  popUp.style.display = (popUp.style.display === 'block') ? 'none' : 'block';
}

/*

/**
 * Stores data on the server using the specified key.
 *
 * @param {string} key - The key under which the data will be stored.
 * @param {string} value - The data to be stored.
 * @returns {Promise} - A promise that resolves to the server response in JSON format.
 */
async function setItemContacts(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

// /**
//  * Retrieves data from the server using the specified key.
//  *
//  * @param {string} key - The key for which data is to be retrieved.
//  * @returns {Promise} - A promise that resolves to the retrieved data value from the server.
//  */
// async function getItemContacts(key) {
//     const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
//     return fetch(url).then((res) => res.json()).then((res) => res.data.value);
// }

// /**
//  * Loads contacts from the server and updates the local 'contacts' array.
//  */
// async function loadContactsFromServer() {
//     try {
//         contacts = JSON.parse(await getItemContacts("contacts"));
//     } catch (e) {
//       console.error("Loading error:", e);
//     }
// }

// /**
//  * Saves a new contact to the server and updates the local 'contacts' array.
//  *
//  * @param {Object} newContact - The contact object to be saved.
//  */
// async function saveContactsToServer(newContact) {
//     contacts.push(newContact);
//     await setItemContacts("contacts", JSON.stringify(contacts));
// }