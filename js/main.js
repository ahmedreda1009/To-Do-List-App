import {addNewTaskTo, createTasksFrom} from './main-functions.js';
// import {checkBtns} from './btns-functionality.js';


// main array of tasks
let allTasks = [];


// all tasks without deleted
let notDel = [];
// favourite tasks
let favouriteTasks = [];
// in progress tasks
let inProgressTasks = [];
// in completed tasks
let completedTasks = [];
// in deleted tasks
let deletedTasks = [];



// add task to the allTasks array when click on add button
const addBtn = document.querySelector('main .new-task-window .icons .fa-plus');
addBtn.addEventListener('click', () => {
    addNewTaskTo(allTasks, inProgressTasks, completedTasks, favouriteTasks, deletedTasks, notDel);
    createTasksFrom(notDel);
});

// add task to the allTasks array when click enter
const input = document.querySelector("main .new-task-container input");
input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        addNewTaskTo(allTasks, inProgressTasks, completedTasks, favouriteTasks, deletedTasks , notDel);
        createTasksFrom(notDel);
    }
});

// show all tasks
let allBtn = document.querySelector('nav .lists .all');
allBtn.addEventListener('click', () => {
    // allTasks = allTasks.filter(element => {
    //     return !element.deleted;
    // });
    
    notDel = allTasks.filter(task => {
        return !task.deleted;
    });
    createTasksFrom(notDel);
});

// show in progress tasks
let inProgressBtn = document.querySelector('nav .lists .in-progress');
inProgressBtn.addEventListener('click', () => {

    inProgressTasks = allTasks.filter(element => {
        return !element.completed && !element.deleted;
    });
    createTasksFrom(inProgressTasks);
});

// show completed tasks
let completedBtn = document.querySelector('nav .lists .completed');
completedBtn.addEventListener('click', () => {

    completedTasks = allTasks.filter(element => {
        return element.completed && !element.deleted;
    });
    createTasksFrom(completedTasks);
});

// show the favourite tasks
let favouriteBtn = document.querySelector('nav .lists .favourite');
favouriteBtn.addEventListener('click', () => {

    favouriteTasks = allTasks.filter(element => {
        return element.favourite && !element.deleted;
    });
    createTasksFrom(favouriteTasks);
});

// show the deleted tasks
let deletedBtn = document.querySelector('nav .lists .trash');
deletedBtn.addEventListener('click', () => {

    deletedTasks = allTasks.filter(element => {
        return element.deleted;
    });
    createTasksFrom(deletedTasks);
});


function addFromActiveList() {
    let navListBtns = document.querySelectorAll("nav .nav-block .lists > div");
    navListBtns.forEach(btn => {
        if (btn.classList.contains("active")) {
            if (btn.classList.contains('favourite')) {
                createTasksFrom(favouriteTasks);
            } else if (btn.classList.contains('in-progress')) {
                createTasksFrom(inProgressTasks);
            } else if (btn.classList.contains('completed')) {
                createTasksFrom(completedTasks);
            } else if (btn.classList.contains('trash')) {
                createTasksFrom(deletedTasks);
            } else if (btn.classList.contains('all')) {
                createTasksFrom(notDel);
            }
        }
    });
}


//////////////////////////////////////////////////////////////////////////
// check the task once clicked on it
//////////////////////////////////////////////////////////////////////////
document.addEventListener('click', e => {


    if (e.target.matches(".tasks-block .task .content > .fa-circle")) {
        e.target.classList.toggle("checked");

        allTasks.forEach(obj => {
            if (obj.id == e.target.closest(".task").dataset.id) {
                obj.updateCompleted();
            }
        });

        notDel = allTasks.filter(task => {
            return !task.deleted;
        });

        completedTasks = allTasks.filter(element => {
            return element.completed && !element.deleted;
        });

        inProgressTasks = allTasks.filter(element => {
            return !element.completed && !element.deleted;
        });

        addFromActiveList();
        
        console.log(allTasks);
        console.log(completedTasks);
    }
});

// fav button in options 
document.addEventListener('click', (e) => {

    let favOpt = e.target.closest(".tasks-block .content .options .favourite");

    if (favOpt != null) {
        favOpt.classList.remove("active");
        // console.log(favOpt.closest('.task').dataset.id);

        allTasks.forEach(obj => {
            if (obj.id == favOpt.closest('.task').dataset.id) {
                if (!obj.deleted) {
                    obj.updateFavourite();
                    // document.querySelector('main .new-task-container .icons .fa-circle').classList.toggle('active');
                } else {
                    favOpt.classList.remove("active");
                }
            }
        });

        notDel = allTasks.filter(task => {
            return !task.deleted;
        });

        favouriteTasks = allTasks.filter(element => {
            return element.favourite && !element.deleted;
        });

        addFromActiveList();

        console.log(allTasks);
    }
});

// delete button in options 
document.addEventListener('click', (e) => {
    let delOpt = e.target.closest('.task .options .delete');

    if (delOpt != null) {

        allTasks.forEach(obj => {
            if (obj.id == e.target.closest('.task').dataset.id) {
                obj.updateDeleted();
                obj.favourite = false;
            }
        });

        notDel = allTasks.filter(task => {
            return !task.deleted;
        });

        deletedTasks = allTasks.filter(task => {
            return task.deleted && !notDel;
        });

        favouriteTasks = favouriteTasks.filter(task => {
            return !task.deleted && task.favourite;
        });

        inProgressTasks = inProgressTasks.filter(task => {
            return !task.deleted && !task.completed;
        });

        completedTasks = completedTasks.filter(task => {
            return !task.deleted && task.completed;
        });

        addFromActiveList();
    }
})