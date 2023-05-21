import TodoList from "./TodoList";

export default class Storage {
	static get() {
		if (window.localStorage.getItem("todos")) {
			return JSON.parse(window.localStorage.getItem("todos"));
		}
		return null;
	}

	static update() {
		window.localStorage.setItem("todos", JSON.stringify(TodoList.todos));
	}

	static clear() {
		window.localStorage.setItem("todos", "");
	}
}
