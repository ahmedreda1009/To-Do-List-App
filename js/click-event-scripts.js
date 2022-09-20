////////// nav bar
const navbar = document.querySelector("nav");
const navToggleBtn = document.querySelector("main header > i");

document.addEventListener('click', (e) => {
    if (e.target.closest("nav")) return;
    if (e.target !== navToggleBtn) {
        navbar.classList.remove("active");
    } else {
        navbar.classList.toggle("active");
    }
})

////////// add new task window
const newTaskContainer = document.querySelector("main .new-task-container");
const newTaskWindow = document.querySelector("main .new-task-window");
const newTaskBtn = document.querySelector("main button");

document.addEventListener('click', (e) => {
    if (e.target.closest(".new-task-window")) return;
    if (e.target !== newTaskBtn) {
        newTaskContainer.classList.remove("active");
    } else {
        newTaskContainer.classList.toggle("active");
    }
});

////////// open options btn for every task
const optionsMenus = document.querySelectorAll(".tasks-block .task .content .options");
const optionsBtns = document.querySelectorAll(".tasks-block .task .content .fa-ellipsis-vertical");


document.addEventListener('click', (e) => {

    let isOptBtn = e.target.matches(".tasks-block .task .content .fa-ellipsis-vertical");
    if (!isOptBtn && e.target.closest(".tasks-block .task .content .options") != null) return;
    // if (!isOptBtn && e.target.matches(".tasks-block .task .content .options")) return;
    
    let currrentMenu = e.target.nextElementSibling;
    currrentMenu.classList.toggle("active");
    // if (isOptBtn) {
    // }

    optionsMenus.forEach(menu => {
        if (menu === currrentMenu) return;
        menu.classList.remove("active");
    });
});

////////// check the task once clicked on it
const checkBtns = document.querySelectorAll(".tasks-block .task .content .fa-circle");

checkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle("checked");
    })
});
