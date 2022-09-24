//////////////////////////////////////////////////////////////////////////
// open new task window
//////////////////////////////////////////////////////////////////////////
export function openNewTaskWindow(e) {

    let isAddBtn = e.target.matches("main button");
    
    if (!isAddBtn && e.target.closest(".new-task-window")) return;
    // document.querySelector('main .new-task-container .icons .fa-circle').classList.remove('active');

    const newTaskContainer = document.querySelector("main .new-task-container");

    if (!isAddBtn) {
        newTaskContainer.classList.remove("active");
        document.querySelector('main .new-task-container .icons .fa-circle').classList.remove('active');
    } else {
        newTaskContainer.classList.toggle("active");
        document.querySelector("main .new-task-container input").focus();
    }
}

//////////////////////////////////////////////////////////////////////////
// fav btn inside the new task window
//////////////////////////////////////////////////////////////////////////
export function favBtnEvent(favBtn) {
    favBtn.classList.toggle('active');
}

//////////////////////////////////////////////////////////////////////////
// nav bar list buttons
//////////////////////////////////////////////////////////////////////////
export function listsBtns() {

    this.classList.add("active");

    let navListBtns = document.querySelectorAll("nav .nav-block .lists > div");
    navListBtns.forEach(btn => {
        if (btn === this) return;
        btn.classList.remove("active");
    });
}
