async function initSummary() {
    await init('summary');
    renderSummary();
}



function renderSummary() {
    renderTasksInBoard();
    renderTasksInProgress();
    renderTasksAwaitingFeedback();
    renderUpcomingDeadline();
    renderTasksInToDo();
    renderTasksDone();
    renderDailyMessage();
}



function renderTasksInBoard() {
    let tasksInBoard = document.getElementById('tasks-amount');
    let tasksAmount = allTasks.length;
    tasksInBoard.innerHTML = tasksAmount;
}



function renderTasksInProgress() {
    let tasksInProgress = document.getElementById('in-progress-amount');
    let tasksAmount = allTasks.filter(t => t['status'] == 'in progress').length;
    tasksInProgress.innerHTML = tasksAmount;
}



function renderTasksAwaitingFeedback() {
    let tasksAwaitingFeedback = document.getElementById('awaiting-feedback-amount');
    let tasksAmount = allTasks.filter(t => t['status'] == 'awaiting feedback').length;
    tasksAwaitingFeedback.innerHTML = tasksAmount;
}



function renderTasksInToDo() {
    let tasksToDo = document.getElementById('to-do-amount');
    let tasksAmount = allTasks.filter(t => t['status'] == 'to do').length;
    tasksToDo.innerHTML = tasksAmount;
}



function renderTasksDone() {
    let tasksDone = document.getElementById('done-amount');
    let tasksAmount = allTasks.filter(t => t['status'] == 'done').length;
    tasksDone.innerHTML = tasksAmount;
}



function renderUpcomingDeadline() {
    sortTasks();
    renderUpcomingPrio();
    renderUpcomingDate();
}



function sortTasks() {
    allTasks.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });
}



function renderUpcomingPrio() {
    let upcomingPrio = document.getElementById('upcoming-prio');
    let upcomingPrioImage = document.getElementById('upcoming-prio-image');
    let prio = allTasks[0]['prio'];
    let upcomingDate = allTasks[0]['date'];
    let upcomingTasksAmount = allTasks.filter(t => t['date'] == upcomingDate).length;
    let upcomingTasks = document.getElementById('upcoming-tasks-amount');
    upcomingPrio.innerHTML = prio;
    upcomingPrioImage.firstElementChild.src = `assets/img/active-${prio}.png`;
    upcomingPrioImage.classList.add(`active-${prio}`);
    upcomingTasks.innerHTML = upcomingTasksAmount
}



function renderUpcomingDate() {
    let date = new Date(allTasks[0]['date']);
    let formattedMonth = date.toLocaleString('default', {month: 'long'});
    let year = date.getFullYear();
    let day = date.getDay();
    let upcomingDate = document.getElementById('upcoming-deadline');
    upcomingDate.innerHTML = day + ' ' + formattedMonth + ',' + ' ' + year;
}



function renderDailyMessage() {
    let dailyMessage = document.getElementById('daily-message');
    let time = new Date().getHours()
    if (time < 10) {
        dailyMessage.innerHTML = 'Good morning';
    }

    if (time >= 10 && time < 14) {
        dailyMessage.innerHTML = 'Good day';
    }

    if (time >= 14 && time <18) {
        dailyMessage.innerHTML = 'Good afternoon'
    }

    if (time >= 18) {
        dailyMessage.innerHTML = 'Good evening'
    }
}