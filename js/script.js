const STORAGE_TOKEN = '74NQB1Z0LQUPK10P1TJBALFFX9SCZEXIKFMJ1TYW';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item'


/**
 * Initialize certain functions when page is loaded.
 * 
 * @param {String} id 
 */
async function init(id) {
    await loadTask();
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