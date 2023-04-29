import Lists from "./Lists.js";
import LocalStorage from "./LocalStorage.js";
import { setCarat } from "./functions.js";

// open new task window.
document.addEventListener('click', e => {
    let isAddBtn = e.target.matches("main button.new-task");

    if (!isAddBtn && e.target.closest(".new-task-window")) return;

    const newTaskContainer = document.querySelector("main .new-task-container");

    if (!isAddBtn) {
        newTaskContainer.classList.remove("active");
        document.querySelector("main button.new-task").classList.remove("active");
        document.querySelector("main .new-task-container input").value = "";
        document.querySelector("main .new-task-container .icons .fa-star").classList.remove("active");
    } else {
        newTaskContainer.classList.toggle("active");
        document.querySelector("main button.new-task").classList.toggle("active");
        document.querySelector("main .new-task-container input").focus();
    }
});

// nav list buttons.
let navListBtns = document.querySelectorAll("nav .nav-block .lists > div");
navListBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        navListBtns.forEach((btn) => {
            if (btn === this) return;
            btn.classList.remove("active");
        });

        btn.classList.add("active");
    });
});

// clear and reset buttons
document.addEventListener('click', e => {

    let currentBtn = e.target.closest('nav .nav-block .actions .clear > div');
    let close = e.target.matches('nav .nav-block .actions .clear > div .close');
    let no = e.target.matches('nav .nav-block .actions .clear > div .no');

    let closeAndClearBtns = document.querySelectorAll('nav .nav-block .actions .clear > div');

    if (currentBtn == null || close || no) {
        closeAndClearBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        return;
    } else {
        currentBtn.classList.add('active');
    }

    closeAndClearBtns.forEach(btn => {
        if (currentBtn == btn) return;
        btn.classList.remove('active');
    });
});

// todo option button
document.addEventListener('click', (e) => {
    let isOptBtn = e.target.matches(".tasks-block .task .content .fa-ellipsis-vertical");
    if (!isOptBtn && e.target.closest(".tasks-block .task .content .options") != null) return;

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
});

// favourite button inside new task window
let favBtn = document.querySelector('main .new-task-container .icons .fa-star');
favBtn.addEventListener('click', () => favBtn.classList.toggle("active"));

// favourite button inside todo options window
document.addEventListener('click', e => {
    let favOpt = e.target.closest(".tasks-block .content .options .favourite");
    if (!favOpt) return;

    let todo = favOpt.closest(".task");
    if (todo.classList.contains('deleted')) return;

    let fav = todo.querySelector(".content .options .favourite p");

    if (todo.classList.contains('favourite')) {
        fav.innerHTML = 'Favourite';
        LocalStorage.unFav(todo.dataset.id);
        todo.classList.remove('favourite');
        fav.previousElementSibling.classList.remove('fa-star-half-stroke');
        fav.previousElementSibling.classList.add('fa-star');
    } else {
        LocalStorage.fav(todo.dataset.id);
        fav.innerHTML = 'Unfavourite';
        todo.classList.add('favourite');
        fav.previousElementSibling.classList.add('fa-star-half-stroke');
    }
    if (navListBtns[3].classList.contains('active')) Lists.renderFavourite();

    LocalStorage.calculateListsItems();
});

// delete button inside todo options window
document.addEventListener('click', e => {
    let delOpt = e.target.closest(".tasks-block .content .options .delete");
    if (!delOpt) return;

    let todo = delOpt.closest(".task");

    let del = todo.querySelector(".content .options .delete p");

    if (todo.classList.contains('deleted')) {
        LocalStorage.restore(todo.dataset.id);
        todo.classList.remove('deleted');
        del.innerHTML = 'Restore';
    } else {
        LocalStorage.delete(todo.dataset.id);
        todo.classList.add('deleted');
        del.innerHTML = 'Delete';
    }
    if (todo.classList.contains('favourite') && todo.classList.contains('deleted')) todo.classList.remove('favourite');
    if (navListBtns[4].classList.contains('active')) Lists.renderTrash();
    if (navListBtns[0].classList.contains('active')) Lists.renderAll();

    LocalStorage.calculateListsItems();
});

// edit button inside todo options window
document.addEventListener('click', (e) => {
    let editOpt = e.target.closest('.task .content .options .edit');
    let currentParagraph = document.querySelector('.task.active .content p');
    let currentSaveBtn = document.querySelector(".tasks-block > .task.active > .content > button.save");
    let options = document.querySelector('.task.active .content .options');

    if (editOpt == null) return;

    currentParagraph.setAttribute('contenteditable', 'true');
    currentSaveBtn.style.display = "block";
    options.classList.remove('active');
    currentParagraph.focus();
    // set the caret cursor to the end of the line
    setCarat(currentParagraph);

    function edit() {
        LocalStorage.get().forEach((todo) => {
            if (todo.id == editOpt.closest(".task").dataset.id) {
                LocalStorage.editTodo(todo.id, currentParagraph.textContent.trim());
            }
        });
        currentSaveBtn.style.display = "none";
        currentParagraph.setAttribute('contenteditable', 'false');
    }

    currentSaveBtn.addEventListener('click', edit);
    currentParagraph.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            edit();
        }
    });
});

// check todo button
document.addEventListener("click", (e) => {
    if (!e.target.matches(".tasks-block .task .content > .fa-circle")) return;

    let checkBtn = e.target;
    let todo = checkBtn.closest('.task');

    if (todo.classList.contains('checked')) {
        checkBtn.classList.remove("checked");
        todo.classList.remove('checked');
    } else {
        checkBtn.classList.add("checked");
        todo.classList.add('checked');
    }

    LocalStorage.get().forEach((obj) => {
        if (obj.id == checkBtn.closest(".task").dataset.id) {
            if (checkBtn.classList.contains("checked")) {
                LocalStorage.check(obj.id);
            } else {
                LocalStorage.unCheck(obj.id);
            }
        }
    });

    if (navListBtns[1].classList.contains('active')) Lists.renderInProgress();
    if (navListBtns[2].classList.contains('active')) Lists.renderCompleted();

    LocalStorage.calculateListsItems();
});

// lists
navListBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        switch (btn.id) {
            case 'list-all':
                Lists.renderAll();
                break;
            case 'list-progress':
                Lists.renderInProgress();
                break;
            case 'list-completed':
                Lists.renderCompleted();
                break;
            case 'list-favourite':
                Lists.renderFavourite();
                break;
            case 'list-trash':
                Lists.renderTrash();
                break;
            default:
                Lists.renderAll();
                break;
        }
    });
});

// clear trash button
document.querySelector(".nav-block .clear .clear-trash .yes").addEventListener("click", (e) => {
    e.stopPropagation();

    LocalStorage.clearTrash();

    document.querySelector("nav .nav-block .actions .clear .clear-trash").classList.remove("active");
    document.querySelector("#list-trash > span").innerHTML = '0';
});

// reset button
document.querySelector(".nav-block .clear .reset-all .yes").addEventListener("click", (e) => {
    e.stopPropagation();

    LocalStorage.reset();
    document.querySelector("nav .nav-block .actions .clear .reset-all").classList.remove("active");
    document.querySelectorAll('.lists .list').forEach(list => {
        list.querySelector('span').innerHTML = '0';
    });
    document.querySelector("body > div > div > main > div.tasks-block").innerHTML = '';
});

// search button
document.querySelector("nav .nav-block .actions .search input").addEventListener('input', (e) => {
    Lists.renderFiltered(e.target.value);
    if (e.target.value === '') {
        Lists[Lists.getActiveList()]();
    }
});

// mobile nav button
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