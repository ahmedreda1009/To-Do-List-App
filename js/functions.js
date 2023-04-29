import LocalStorage from "./LocalStorage.js";
import Todo from "./Todo.js";


let favBtn = document.querySelector('main .new-task-container .icons .fa-star');

export function addNewTodo() {
    const input = document.querySelector("main .new-task-container input");
    if (input.value === '') return;
    // create todo
    let isFav = favBtn.classList.contains('active');
    const todo = new Todo(Date.now(), input.value, isFav);

    // add todo to html
    let tasksBlock = document.querySelector('main .tasks-block');
    tasksBlock.append(todo.render());

    // clear input field
    input.value = '';
    input.focus();

    // add todo to local storage.
    LocalStorage.add(todo);

    // refresh lists counter
    LocalStorage.calculateListsItems();
}

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