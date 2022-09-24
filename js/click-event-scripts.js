import {openNewTaskWindow, favBtnEvent, listsBtns} from './btns-functionality.js';

//////////////////////////////////////////////////////////////////////////
// add new task window
//////////////////////////////////////////////////////////////////////////
document.addEventListener('click', openNewTaskWindow);

//////////////////////////////////////////////////////////////////////////
// fav btn inside the new task window
//////////////////////////////////////////////////////////////////////////
let favBtn = document.querySelector('main .new-task-container .icons .fa-circle');
favBtn.addEventListener('click', () => {favBtnEvent(favBtn)});

//////////////////////////////////////////////////////////////////////////
// nav bar list buttons
//////////////////////////////////////////////////////////////////////////
let navListBtns = document.querySelectorAll("nav .nav-block .lists > div");
navListBtns.forEach(btn => {
    btn.addEventListener('click', listsBtns);
});

//////////////////////////////////////////////////////////////////////////
// open options btn for every task
//////////////////////////////////////////////////////////////////////////
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

// //////////////////////////////////////////////////////////////////////////
// // check the task once clicked on it
// //////////////////////////////////////////////////////////////////////////
// let checkButtons = document.querySelectorAll(".task .content .fa-circle");
// checkButtons.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         checkBtns(e)
//     });
// });

// //////////////////////////////////////////////////////////////////////////
// // nav bar
// //////////////////////////////////////////////////////////////////////////
// document.addEventListener('click', e => {

//     let isNavBtn = e.target.matches("main header > i");
//     if (!isNavBtn && e.target.closest("nav")) return;
    
//     const navbar = document.querySelector("nav");

//     if (!isNavBtn) {
//         navbar.classList.remove("active");
//     } else {
//         navbar.classList.toggle("active");
//     }
// });








// //////////////////////////////////////////////////////////////////////////
// // clear buttons
// //////////////////////////////////////////////////////////////////////////
// document.addEventListener('click', e => {

//     let currentBtn = e.target.closest('nav .nav-block .actions .clear > div');

//     if (currentBtn == null || e.target.matches('nav .nav-block .actions .clear > div .close') || e.target.matches('nav .nav-block .actions .clear > div .no')) {
//         document.querySelectorAll('nav .nav-block .actions .clear > div').forEach(btn => {
//             btn.classList.remove('active');
//         })
//         return;
//     } else {
//         currentBtn.classList.add('active');

//     }

//     document.querySelectorAll('nav .nav-block .actions .clear > div').forEach(btn => {
//         if (currentBtn == btn) return;
//         btn.classList.remove('active');
//     });
// });










// //////////////////////////////////////////////////////////////////////////
// // nav bar list buttons
// //////////////////////////////////////////////////////////////////////////
// document.addEventListener('click', e => {
//     let navListBtn = e.target.closest("nav .nav-block .lists > div");
//     if (navListBtn == null) return;

//     if (navListBtn != null) {
//         navListBtn.classList.add("active");
//     }

//     let navListBtns = document.querySelectorAll("nav .nav-block .lists > div");
//     navListBtns.forEach(btn => {
//         if (btn === navListBtn) return;
//         btn.classList.remove("active");
//     });
// });

// //////////////////////////////////////////////////////////////////////////
// // check the task once clicked on it
// //////////////////////////////////////////////////////////////////////////
// document.addEventListener('click', e => {

//     let isCheckBtn = e.target.matches(".tasks-block .task .content .fa-circle");

//     if (isCheckBtn) {
//         e.target.classList.toggle("checked");
//     }
// });