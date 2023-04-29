import LocalStorage from "./LocalStorage.js";
import Todo from "./Todo.js";

let tasksBlock = document.querySelector('main .tasks-block');

function addToPage(todos) {
    tasksBlock.innerHTML = "";
    todos.forEach(todo => {
        todo.render = Todo.prototype.render;
        let todoHtml = todo.render();
        tasksBlock.append(todoHtml);
    });
}

export default class Lists {
    static getActiveList() {
        return window.localStorage.getItem('active-list');
    }

    static renderAll() {
        let todos = LocalStorage.get();
        if (todos) {
            todos = todos.filter(todo => {
                return !todo.deleted;
            });
            addToPage(todos);
        }
        window.localStorage.setItem('active-list', 'renderAll');
    }

    static renderInProgress() {
        let todos = LocalStorage.get();
        if (todos) {
            todos = todos.filter(todo => {
                return !todo.status && !todo.deleted;
            });
            addToPage(todos);
        }
        window.localStorage.setItem('active-list', 'renderInProgress');
    }

    static renderCompleted() {
        let todos = LocalStorage.get();
        if (todos) {
            todos = todos.filter(todo => {
                return todo.status && !todo.deleted;
            });
            addToPage(todos);
        }
        window.localStorage.setItem('active-list', 'renderCompleted');
    }

    static renderFavourite() {
        let todos = LocalStorage.get();
        if (todos) {
            todos = todos.filter(todo => {
                return todo.favourite && !todo.deleted;
            });
            addToPage(todos);
        }
        window.localStorage.setItem('active-list', 'renderFavourite');
    }

    static renderTrash() {
        let todos = LocalStorage.get();
        if (todos) {
            todos = todos.filter(todo => {
                return todo.deleted;
            });
            addToPage(todos);
        }
        window.localStorage.setItem('active-list', 'renderTrash');
    }

    static renderFiltered(str) {
        let todos = LocalStorage.get();
        if (todos) {
            todos = todos.filter(todo => {
                return todo.body.toLowerCase().includes(str.toLowerCase());
            });
            addToPage(todos);
        }
    }
}