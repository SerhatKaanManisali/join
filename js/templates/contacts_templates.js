


function contactTemplate() {
    let contact = {
        'name': validateName(),
        'email': validateEmail(),
        'phone': validatePhone(),
        'rgb': pickRandomColor(oneItemArray)
    }
    return contact;
}



function contactCardTemplate(name, abbreviation, backgroundColor, c) {
    return /*html*/`
        <div id="${c}" class="contact-card" onclick="showContactInfo(${c})">
            <h5 style="background-color: ${backgroundColor}">${abbreviation}</h5>
            <h4>${name}</h4>
        </div>
    `;
}



function contactDividerTemplate(char) {
    return /*html*/`
        <p class="divider-char">${char}</p>
        <div class="divider"></div>
    `;
}