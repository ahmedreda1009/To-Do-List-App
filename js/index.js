import Todo from "./Todo.js";
import LocalStorage from "./LocalStorage.js";
import { addNewTodo } from "./functions.js";
import Lists from "./Lists.js";

// get local storage todos.
let items = LocalStorage.get();
if (items) {
    Lists.renderAll();
    LocalStorage.calculateListsItems();
} else {
    let todo = { id: Date.now(), body: 'Be Productive, DO MORE.', favourite: true, deleted: false, status: false }
    LocalStorage.add(todo);
    todo.render = Todo.prototype.render;
    document.querySelector("body > div > div > main > div.tasks-block").append(todo.render());
}

// add new todo
const addBtn = document.querySelector("main .new-task-window .icons .fa-plus");
addBtn.addEventListener('click', addNewTodo);

const input = document.querySelector("main .new-task-container input");
input.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        addNewTodo();
    }
});