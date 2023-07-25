import { getTodos } from "../helperFunctions";
import Storage from "./Storage";

export const ListsNames = Object.freeze({
	all: "list-all",
	inprogress: "list-progress",
	completed: "list-completed",
	favourite: "list-favourite",
	trash: "list-trash",
});

export default class TodoList {
	static todos = [];
	static counts = {
		all: 1,
		inprogress: 1,
		completed: 0,
		favourite: 0,
		trash: 0,
	};
	static activeList = ListsNames.all;

	static find(todoId) {
		return TodoList.todos.find((todo) => todo.id == todoId);
	}

	static add(todo) {
		TodoList.todos.push(todo);
		Storage.update();
		this.updateCounts();
	}

	static clear() {
		this.todos = [];

		Storage.clear();
		location.reload();
	}

	static deleteTrash() {
		this.todos = this.todos.filter((todo) => {
			if (todo.isDeleted) TodoList.count--;
			return !todo.isDeleted;
		});

		Storage.update();
	}

	static updateActiveList(listName) {
		TodoList.activeList = listName;
	}

	static updateCounts() {
		// TodoList.counts.all = getTodos(ListsNames.all).length;
		// TodoList.counts.inprogress = getTodos(ListsNames.inprogress).length;
		// TodoList.counts.completed = getTodos(ListsNames.completed).length;
		// TodoList.counts.favourite = getTodos(ListsNames.favourite).length;
		// TodoList.counts.trash = getTodos(ListsNames.trash).length;

		for (let list in TodoList.counts) {
			if (TodoList.counts[list] < 0) TodoList.counts[list] = 0;
		}

		document.querySelector("#list-all > span").innerHTML =
			TodoList.counts.all;
		document.querySelector("#list-progress > span").innerHTML =
			TodoList.counts.inprogress;
		document.querySelector("#list-completed > span").innerHTML =
			TodoList.counts.completed;
		document.querySelector("#list-favourite > span").innerHTML =
			TodoList.counts.favourite;
		document.querySelector("#list-trash > span").innerHTML =
			TodoList.counts.trash;
		let headerLabel = document.querySelector("main header h1 > div");
		headerLabel.innerHTML = TodoList.counts.inprogress;

		if (headerLabel.innerHTML <= 0) headerLabel.classList.add("hidden");
		else if (headerLabel.innerHTML >= 0)
			headerLabel.classList.remove("hidden");
		if (headerLabel.innerHTML > 99) headerLabel.innerHTML = "99+";
	}
}
