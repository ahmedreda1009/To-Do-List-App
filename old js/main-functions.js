//////////////////////////////////////////////////////////////////////////
// add new task
//////////////////////////////////////////////////////////////////////////

// class of task objects
class Task {
    constructor(text, id, completed = false, deleted = false, favourite = false, hour, minite, weekDay, day, month, year) {
        this.text = text.trim(),
            this.id = id,
            this.completed = completed,
            this.deleted = deleted,
            this.favourite = favourite,
            this.hour = hour,
            this.minite = minite,
            this.weekDay = weekDay,
            this.day = day,
            this.month = month,
            this.year = year
    }
    updateCompleted() {
        if (this.completed) {
            this.completed = false;
        } else {
            this.completed = true;
        }
    }
    updateFavourite() {
        if (this.favourite) {
            this.favourite = false;
        } else {
            this.favourite = true;
        }
    }
    updateDeleted() {
        if (this.deleted) {
            this.deleted = false;
        } else {
            this.deleted = true;
        }
    }
    updateText(newText) {
        this.text = newText.trim();
    }
}


export function addNewTaskTo(allTasks, favouriteTasks) {

    const input = document.querySelector("main .new-task-container input");
    if (input.value == "") return;


    let favourite = false;
    let completed = false;
    let deleted = false;

    if (document.querySelector('main .new-task-container .icons .fa-star').classList.contains('active')) favourite = true;

    let date = new Date();
    const newTask = new Task(input.value, date.getTime(), completed, deleted, favourite, date.getHours(), date.getMinutes(), date.getDay(), date.getDate(), date.getMonth(), date.getFullYear());

    if (favourite) favouriteTasks.push(newTask);

    allTasks.push(newTask);
    input.value = "";
    input.focus();
    document.querySelector('main .new-task-container .icons .fa-star').classList.remove('active');
}

export function createTasksFrom(arr) {

    let tasksBlock = document.querySelector('main .tasks-block');

    tasksBlock.innerHTML = '';

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    arr.forEach(element => {

        let task = document.createElement('div');
        task.classList.add('task');
        task.dataset.id = element.id;
        task.innerHTML =
            `<div class="content">
            <i class="fa-regular fa-circle ${element.completed ? 'checked' : ''}"></i>
            <p contenteditable="false">${element.text}</p>
            <button class="save" style="display: none;">Save</button>
            <i class="fa-solid fa-ellipsis-vertical"></i>

            <div class="options">
                <div class="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <p>edit</p>
                </div>
                <div class="favourite">
                    <i class="fa-solid ${element.favourite && !element.deleted ? 'fa-star-half-stroke' : 'fa-star'}"></i>
                    <p>${element.favourite && !element.deleted ? 'unfavorite' : 'favourite'}</p>
                </div>
                <div class="delete">
                    <i class="fa-thin fa-trash"></i>
                    <p>${element.deleted ? 'undelete' : 'delete'}</p>
                </div>
            </div>
        </div>
        <div class="date">
            <time>${element.hour > 9 ? element.hour : '0' + element.hour}:${element.minite > 9 ? element.minite : '0' + element.minite}</time>
            -
            <time>${days[element.weekDay]}</time>&nbsp;&nbsp;&nbsp;
            <time>${element.day > 9 ? element.day : '0' + element.day}.${element.month > 9 ? element.month + 1 : '0' + (element.month + 1)}.${element.year}</time>&nbsp;&nbsp;&nbsp;
            <i class="fa-solid ${element.favourite && !element.deleted ? 'fa-star' : 'fa-circle'}" style="color:${element.favourite && !element.deleted ? '#ffa42b' : !element.favourite && element.deleted ? '#af2626' : '#373748'}; display: ${element.favourite || element.deleted ? 'inline' : 'none'};"></i>&nbsp;
            <i class="fa-solid fa-check"></i>
        </div>`;

        tasksBlock.append(task);
    });
}

// move the caret cursor to the end of the contenteditale div or the inputs
export function setCarat(element) {
    // Place cursor at the end of a content editable div
    if (element.type !== "textarea" && element.getAttribute("contenteditable") === "true") {
        element.focus();
        window.getSelection().selectAllChildren(element);
        window.getSelection().collapseToEnd();
    } else {
        // Place cursor at the end of text areas and input elements
        element.focus();
        element.select();
        window.getSelection().collapseToEnd();
    }
}

// alocal storage functions
export function addToLocalStorage(allTasks) {
    window.localStorage.setItem('toDoTasks', JSON.stringify(allTasks));
}
export function getFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem('toDoTasks'));
}
export function clearAllTasksFromLocalStorage() {
    window.localStorage.removeItem('toDoTasks');
}