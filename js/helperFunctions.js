import Todo from "./classes/Todo.js";
import TodoList, { ListsNames } from "./classes/TodoList.js";
import {
	CompletedSpecification,
	FavouriteSpecification,
	DeletedSpecification,
	AndSpecification,
	TodosFilter,
} from "./classes/TodoSpecification.js";

let tasksBlock = document.querySelector("main .tasks-block");
let favBtn = document.querySelector("main .new-task-container .icons .fa-star");

export function addNewTodo() {
	const input = document.querySelector("main .new-task-container input");
	if (input.value === "") return;
	// create todo
	let isFav = favBtn.classList.contains("active");
	const todo = new Todo(Date.now(), input.value, isFav);
	TodoList.add(todo);
	TodoList.updateCounts();

	// add todo to html
	let activeList = TodoList.activeList;
	let inProgList = ListsNames.inprogress;
	let allList = ListsNames.all;
	let favList = ListsNames.favourite;
	if (activeList === allList || activeList == inProgList || (activeList == favList && isFav)) {
		tasksBlock.append(todo.render());
	}

	// render todos from active list.
	// renderTodos(TodoList.activeList);

	// clear input field
	input.value = "";
	input.focus();
}

function getSpecs(listName) {
	let specs = [];

	switch (listName) {
		case ListsNames.all:
			specs.push(new DeletedSpecification(false));
			break;
		case ListsNames.inprogress:
			specs.push(
				new CompletedSpecification(false),
				new DeletedSpecification(false)
			);
			break;
		case ListsNames.completed:
			specs.push(
				new CompletedSpecification(true),
				new DeletedSpecification(false)
			);
			break;
		case ListsNames.favourite:
			specs.push(
				new FavouriteSpecification(true),
				new DeletedSpecification(false)
			);
			break;
		case ListsNames.trash:
			specs.push(new DeletedSpecification(true));
			break;
		default:
			break;
	}

	return specs;
}

export function getTodos(listName) {
	let specs = getSpecs(listName);
	// if specs are an array of specs.
	if (specs.length > 1) specs = new AndSpecification(specs);
	else specs = specs[0]; // if there is only one spec.

	let filter = new TodosFilter();

	let todos = filter.filter(TodoList.todos, specs);
	return todos;
}

export function renderTodos(listName) {
	let todos = getTodos(listName);
	tasksBlock.innerHTML = "";
	todos.forEach((todo) => tasksBlock.append(todo.render()));
	TodoList.updateCounts();
}

export function setCaret(element) {
	// Place cursor at the end of a content editable div
	if (
		element.type !== "textarea" &&
		element.getAttribute("contenteditable") === "true"
	) {
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
