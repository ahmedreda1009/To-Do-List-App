//////////////////////////////////////////////////////////////////////////
// add new task
//////////////////////////////////////////////////////////////////////////

// class of task objects
class Task {
    constructor(text, id, completed = false, deleted = false, favourite = false, hour, minite, weekDay, day, month, year) {
        this.text = text,
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
        if (this.completed == true) {
            this.completed = false;
        } else {
            this.completed = true;
        }
    }
    updateFavourite() {
        if (this.favourite == true) {
            this.favourite = false;
        } else {
            this.favourite = true;
        }
    }
    updateDeleted() {
        if (this.deleted == true) {
            this.deleted = false;
        } else {
            this.deleted = true;
        }
    }
}


export function addNewTaskTo(allTasks, inProgressTasks, completedTasks, favouriteTasks, deletedTasks, notDel) {

    const input = document.querySelector("main .new-task-container input");
    if (input.value == "") return;

    
    let completed = false;
    let favourite = false;
    let deleted = false;

    if (document.querySelector('main .new-task-container .icons .fa-circle').classList.contains('active')) favourite = true;

    let date = new Date();
    const newTask = new Task(input.value, date.getTime(), completed, deleted, favourite, date.getHours(), date.getMinutes(), date.getDay(), date.getDate(), date.getMonth(), date.getFullYear());

    if (completed) completedTasks.push(newTask);
    if (!completed) inProgressTasks.push(newTask);
    if (favourite) favouriteTasks.push(newTask);
    if (deleted) deletedTasks.push(newTask);
    if (!deleted) notDel.push(newTask);

    console.log(newTask);
    allTasks.push(newTask);
    console.log(allTasks);
    input.value = "";
    input.focus();
    document.querySelector('main .new-task-container .icons .fa-circle').classList.remove('active');
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
            <p>${element.text}</p>
            <i class="fa-solid fa-ellipsis-vertical"></i>

            <div class="options">
                <div class="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <p>edit</p>
                </div>
                <div class="favourite">
                    <i class="fa-solid fa-circle"></i>
                    <p>${element.favourite  && !element.deleted? 'unfavorite' : 'favourite'}</p>
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
            <i class="fa-solid fa-circle" style="color:${element.favourite && !element.deleted ? '#ffa42b' : '#373748'};"></i>&nbsp;
            <i class="fa-solid fa-circle" style="color:${element.deleted ? '#af2626' : '#373748'};"></i>
        </div>`;
                    
        tasksBlock.append(task);
    });
}

