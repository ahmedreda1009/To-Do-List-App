////////// nav bar
document.addEventListener('click', e => {

    let isNavBtn = e.target.matches("main header > i");
    if (!isNavBtn && e.target.closest("nav")) return;
    
    const navbar = document.querySelector("nav");

    if (!isNavBtn) {
        navbar.classList.remove("active");
    } else {
        navbar.classList.toggle("active");
    }
});

////////// add new task window
document.addEventListener('click', e => {

    let isAddBtn = e.target.matches("main button");
    
    if (!isAddBtn && e.target.closest(".new-task-window")) return;

    const newTaskContainer = document.querySelector("main .new-task-container");

    if (!isAddBtn) {
        newTaskContainer.classList.remove("active");
    } else {
        newTaskContainer.classList.toggle("active");
        document.querySelector("main .new-task-container input").focus();
    }
});

////////// open options btn for every task
document.addEventListener('click', e => {
    
    let isOptBtn = e.target.matches(".tasks-block .task .content .fa-ellipsis-vertical");
    if (!isOptBtn && e.target.closest(".tasks-block .task .content .options") != null) return;
    // if (!isOptBtn && e.target.matches(".tasks-block .task .content .options")) return;
    
    let currrentMenu = e.target.nextElementSibling;
    if (isOptBtn) {
        currrentMenu.classList.toggle("active");
        currrentMenu.closest('.task').classList.toggle('active');

        // scroll to the beginning of the active task
        document.querySelector('main .tasks-block').scrollTo({
            top: (currrentMenu.closest('.task').offsetTop - 110),
            left: 0,
            behavior: 'smooth'
        });
    }
    
    const optionsMenus = document.querySelectorAll(".tasks-block .task .content .options");
    optionsMenus.forEach(menu => {
        if (menu === currrentMenu) return;
        menu.classList.remove("active");
        menu.closest('.task').classList.remove('active');
    });

    // if (!isOptBtn) {
    //     document.querySelectorAll('.tasks-block .task').forEach(task => {
    //         task.classList.remove('active');
    //     })
    // }
});

////////// check the task once clicked on it

document.addEventListener('click', e => {

    let isCheckBtn = e.target.matches(".tasks-block .task .content .fa-circle");

    if (isCheckBtn) {
        e.target.classList.toggle("checked");
    }
});

////////// nav bar list buttons
document.addEventListener('click', e => {
    let navListBtn = e.target.closest("nav .nav-block .lists > div");
    if (navListBtn == null) return;

    if (navListBtn != null) {
        navListBtn.classList.add("active");
    }

    let navListBtns = document.querySelectorAll("nav .nav-block .lists > div");
    navListBtns.forEach(btn => {
        if (btn === navListBtn) return;
        btn.classList.remove("active");
    });
});

////////// clear buttons
document.addEventListener('click', e => {
});