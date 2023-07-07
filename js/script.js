const STORAGE_TOKEN = '74NQB1Z0LQUPK10P1TJBALFFX9SCZEXIKFMJ1TYW';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item'
let abbreviationColors = ['rgb(1, 144, 224)', 'rgb(238, 0, 214)', 'rgb(2, 207, 47)', 'rgb(255, 168, 0)', 'rgb(147, 39, 255)', 'rgb(255, 92, 0)', 'rgb(0, 124, 238)', 'rgb(78, 150, 61)', 'rgb(50, 218, 255)', 'rgb(255, 0, 0)', 'rgb(25, 0, 115)', 'rgb(230, 0, 255)', 'rgb(93, 0, 155)', 'rgb(0, 255, 255)', 'rgb(0, 255, 106)']


/**
 * Initialize certain functions when page is loaded.
 * 
 * @param {String} id 
 */
async function init(id) {
    await loadTask();
    await loadContacts();
    await includeHTML();
    changeHighlight(id);
}


/**
 * Load/Include HTML templates.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * Sets an item in backend.
 * 
 * @param {String} key 
 * @param {Value} value 
 * @returns Item to be set in backend.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
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
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find date with key "${key}".`;
    });
}


/**
 * Loads all Tasks which are stored from the server.
 */
async function loadTask() {
    try {
        tasks = await getItem('allTasks');
        formattedTasks = tasks.replace(/'/g, '"');
        allTasks = JSON.parse(formattedTasks);
    } catch(error) {
        console.error('Loading error:', error);
    }
}


async function loadContacts() {
    try {
        contacts = await getItem('allContacts');
        formattedContacts = contacts.replace(/'/g, '"');
        allContacts = JSON.parse(formattedContacts);
    } catch(error) {
        console.error('Loading error:', error);
    }
}


/**
 * Toggle class of an element. 
 * e.g. Let log out button appear and disappear by clicking on the profile icon.
 * id = log-out-button; className = hide;
 * 
 * @param {String} id 
 * @param {String} className 
 */
function toggleClass(id, className) {
    document.getElementById(id).classList.toggle(className);
}


/**
 * Highlights navigation item depending on whether the corresponding page is displayed.
 * 
 * @param {String} id 
 */
function changeHighlight(id) {
    let currentlyActive = document.querySelector('.active');
    currentlyActive.classList.remove('active');

    let newActive = document.getElementById(id);
    newActive.classList.add('active');
    newActive.firstElementChild.src = `assets/img/${id}-icon-white.png`;
}


/**
 * Prevents an event from happening.
 * 
 * @param {Event} event 
 */
function doNotClose(event) {
    event.stopPropagation()
}


/**
 * Toggles checkbox when clicking on an Element.
 * 
 * @param {String} id 
 */
function toggleCheckbox(id, type, child) {
    let selectedItem = document.getElementById(id);
    let protocol = window.location.protocol;
    let host = window.location.host;
    if (child == 'true') {
        childCheckbox(selectedItem, type, protocol, host);
    } else {
        noChildCheckbox(selectedItem, type, protocol, host);
    }
}



function childCheckbox(selectedItem, type, protocol, host) {
    if (selectedItem.lastElementChild.src == `${protocol}//${host}/assets/img/unchecked-${type}.png`) {
        selectedItem.lastElementChild.src = `assets/img/filled-${type}.png`;
    } else {
        selectedItem.lastElementChild.src = `assets/img/unchecked-${type}.png`;
    }
}



function noChildCheckbox(selectedItem, type, protocol, host) {
    if (selectedItem.src == `${protocol}//${host}/assets/img/unchecked-${type}.png`) {
        selectedItem.src = `assets/img/filled-${type}.png`;
    } else {
        selectedItem.src = `assets/img/unchecked-${type}.png`;
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
    button.src = url;
}


/**
 * Capitalizes first character of a String.
 * 
 * @param {String} name 
 * @returns capitalized string
 */
function capitalizeFirstCharacter(name) {
    let result = name.charAt(0).toUpperCase() + name.slice(1);
    return result;
}


/**
 * Formats the default way of javascript's date system from yyyy/mm/dd to dd/mm/yyyy.
 * 
 * @param {String} date 
 * @returns formatted date
 */
function formatDate(date) {
    if (date.includes("-")) {
        let datePieces = date.split("-");
        return datePieces[2] + "/" + datePieces[1] + "/" + datePieces[0];
    } else {
        let dataPieces = date.split("/")
        return dataPieces[2] + "-" + dataPieces[1] + "-" + dataPieces[0];
    }
}


/**
 * @param {String} name 
 * @returns abbreviation of a given name/string.
 */
function createNameAbbreviation(name) {
    let abbreviation = '';
    if ((/[a-zA-Z]/).test(name) == true) {
        let splitName = name.split(/(\s+)/);
        for (let i = 0; i < splitName.length; i++) {
            const firstChar = splitName[i].charAt(0).trim();
            if (firstChar !== '') {
                abbreviation += firstChar;
            }
        };
        return abbreviation;
    } else {
        return '+' + name;
    }
}



/**
 * Picks random color out of a colors pool. Used for picking a color for profile icons on the board.
 * 
 * @param {Array} names 
 * @returns array called colors which contains rgbs as strings.
 */
function pickRandomColor(names) {
    let colors = [];
    for (let n = 0; n < names.length; n++) {
        let rgb = abbreviationColors[Math.floor(Math.random() * abbreviationColors.length)];
        colors.push(rgb);
    }
    return colors;
}