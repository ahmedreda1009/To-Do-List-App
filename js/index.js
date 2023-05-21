import "./events";

import Todo from "./classes/Todo";
import Storage from "./classes/Storage";
import TodoList, { ListsNames } from "./classes/TodoList";
import { addNewTodo, renderTodos } from "./helperFunctions";

let todosBlock = document.querySelector("body main > div.tasks-block");

// get local storage todos.
let todos = Storage.get();
if (todos) {
	todos.forEach((todo) => {
		let TodoProtoObj = Object.create(Todo.prototype);
		todo = Object.assign(TodoProtoObj, todo);

		TodoList.add(todo);
	});
	renderTodos(ListsNames.all);
} else {
	let todo = new Todo(Date.now(), "Be Productive, DO MORE.", true);
	TodoList.add(todo);
	todosBlock.append(todo.render());
	TodoList.updateCounts();
}

// add new todo
const addBtn = document.querySelector("main .new-task-window .icons .fa-plus");
addBtn.addEventListener("click", addNewTodo);

const input = document.querySelector("main .new-task-container input");
input.addEventListener("keypress", (e) => {
	if (e.keyCode === 13) {
		addNewTodo();
	}
});
