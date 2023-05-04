/**
 * Initializes certain function as soon as board.html loads.
 */
async function initBoard() {
    await init('board');
    renderTasks();
}


/**
 * Renders all tasks on the board.
 */
function renderTasks() {
    let toDoList = document.getElementById('to-do-list');
    toDoList.innerHTML = '';
    for (let t = 0; t < allTasks.length; t++) {
        const assignments = allTasks[t]['assignment'];
        const category = capitalizeFirstCharacter(allTasks[t]['category']['name']);
        const rgb = allTasks[t]['category']['rgb'];
        const description = capitalizeFirstCharacter(allTasks[t]['description']);
        const prio = allTasks[t]['prio'];
        const subtasks = allTasks[t]['subtask'];
        const title = capitalizeFirstCharacter(allTasks[t]['title']);
        toDoList.innerHTML += taskCardTemplate(category, rgb, description, prio, title);
    }
}