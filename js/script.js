setURL('http://developerakademie.com/smallest_backend_ever');


/**
 * Initialize certain funtions on page load
 */
async function init() {
    includeHTML();
}


/**
 * Load/Include HTML templates
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