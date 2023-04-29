export default class LocalStorage {
    static add(obj) {
        let todos = LocalStorage.get();
        if (todos) {
            todos.push(obj);
            window.localStorage.setItem('todos', JSON.stringify(todos));
        } else {
            window.localStorage.setItem('todos', JSON.stringify([obj]));
        }
    }

    static get() {
        if (window.localStorage.getItem('todos')) {
            return JSON.parse(window.localStorage.getItem('todos'));
        }
    }

    static delete(id) {
        LocalStorage.unFav(id);
        let todos = LocalStorage.get();
        todos = todos.map(todo => {
            if (todo.id == id) {
                todo.deleted = true;
            }
            return todo;
        });
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    static restore(id) {
        let todos = LocalStorage.get();
        todos = todos.map(todo => {
            if (todo.id == id) {
                todo.deleted = false;
            }
            return todo;
        });
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    static fav(id) {
        let todos = LocalStorage.get();
        todos = todos.map(todo => {
            if (todo.id == id) {
                todo.favourite = true;
            }
            return todo;
        });
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    static unFav(id) {
        let todos = LocalStorage.get();
        todos = todos.map(todo => {
            if (todo.id == id) {
                todo.favourite = false;
            }
            return todo;
        });
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    static editTodo(id, newBody) {
        let todos = LocalStorage.get();
        todos = todos.map(todo => {
            if (todo.id == id) {
                todo.body = newBody;
            }
            return todo;
        });
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    static check(id) {
        let todos = LocalStorage.get();
        todos = todos.map(todo => {
            if (todo.id == id) {
                todo.status = true;
            }
            return todo;
        });
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    static unCheck(id) {
        let todos = LocalStorage.get();
        todos = todos.map(todo => {
            if (todo.id == id) {
                todo.status = false;
            }
            return todo;
        });
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    static clearTrash() {
        let todos = LocalStorage.get();
        todos = todos.filter(todo => {
            return !todo.deleted;
        });
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    static reset() {
        window.localStorage.removeItem('todos');
    }

    static calculateListsItems() {
        let todos = LocalStorage.get();

        let freqCounter = {
            all: 0,
            inProgress: 0,
            completed: 0,
            favourite: 0,
            trash: 0
        };

        todos.forEach(todo => {
            if (!todo.deleted) freqCounter.all++;
            if (todo.status && !todo.deleted) freqCounter.completed++;
            if (!todo.status && !todo.deleted) freqCounter.inProgress++;
            if (todo.favourite && !todo.deleted) freqCounter.favourite++;
            if (todo.deleted) freqCounter.trash++;
        });

        document.querySelector("#list-all > span").innerHTML = freqCounter.all;
        document.querySelector("#list-progress > span").innerHTML = freqCounter.inProgress;
        document.querySelector("#list-completed > span").innerHTML = freqCounter.completed;
        document.querySelector("#list-favourite > span").innerHTML = freqCounter.favourite;
        document.querySelector("#list-trash > span").innerHTML = freqCounter.trash;
    }
}