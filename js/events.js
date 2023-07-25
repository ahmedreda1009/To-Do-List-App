import TodoList, { ListsNames } from "./classes/TodoList";
import { SearchSpecification, TodosFilter } from "./classes/TodoSpecification";
import { setCaret, renderTodos } from "./helperFunctions.js";

let tasksBlock = document.querySelector("main .tasks-block");

// open new task window.
let newTodoBtn = document.querySelector("main button.new-task");
newTodoBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	const newTaskContainer = document.querySelector("main .new-task-container");
	newTaskContainer.classList.add("active");
	newTodoBtn.classList.add("active");
	document.querySelector("main .new-task-container input").focus();
});
document.addEventListener("click", (e) => {
	if (e.target.closest(".new-task-window")) return;

	const newTaskContainer = document.querySelector("main .new-task-container");
	newTaskContainer.classList.remove("active");
	newTodoBtn.classList.remove("active");

	const favIcon = document.querySelector(
		"main .new-task-container .icons .fa-star"
	);
	favIcon.classList.remove("active");

	const newTaskInput = document.querySelector(
		"main .new-task-container input"
	);
	newTaskInput.value = "";
});

// nav list buttons.
let navListBtns = document.querySelectorAll("nav .nav-block .lists > div");
navListBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		navListBtns.forEach((btn) => {
			btn.classList.remove("active");
		});
		btn.classList.add("active");
	});
});

// reset button and clear trash
let resetBtn = document.querySelector("nav .actions .clear .reset-all");
let clearTrashBtn = document.querySelector("nav .actions .clear .clear-trash");
// reset button
resetBtn.addEventListener("click", function (e) {
	e.stopPropagation();

	let closeBtn = resetBtn.querySelector(".close");
	let noBtn = resetBtn.querySelector(".no");
	if (e.target == closeBtn || e.target == noBtn) {
		resetBtn.classList.remove("active");
		return;
	}

	resetBtn.classList.add("active");
	clearTrashBtn.classList.remove("active");
});
document.addEventListener("click", function () {
	resetBtn.classList.remove("active");
});

// clear trash button
clearTrashBtn.addEventListener("click", function (e) {
	e.stopPropagation();

	let closeBtn = clearTrashBtn.querySelector(".close");
	let noBtn = clearTrashBtn.querySelector(".no");
	if (e.target == closeBtn || e.target == noBtn) {
		clearTrashBtn.classList.remove("active");
		return;
	}

	clearTrashBtn.classList.add("active");
	resetBtn.classList.remove("active");
});
document.addEventListener("click", function () {
	clearTrashBtn.classList.remove("active");
});

// .todo option button
document.addEventListener("click", (e) => {
	let isOptBtn = e.target.matches(".task .content .fa-ellipsis-vertical");
	if (e.target.closest(".tasks-block .task .content .options")) return;

	let currrentMenu = e.target.nextElementSibling;
	if (isOptBtn) {
		currrentMenu.classList.toggle("active");
		currrentMenu.closest(".task").classList.toggle("active");
	}

	// close all other option lists.
	const optionsMenus = document.querySelectorAll(".task .content .options");
	optionsMenus.forEach((menu) => {
		if (menu === currrentMenu) return;
		menu.classList.remove("active");
		menu.closest(".task").classList.remove("active");
	});
});

// favourite button inside new task window
let favBtn = document.querySelector("main .new-task-container .icons .fa-star");
favBtn.addEventListener("click", () => favBtn.classList.toggle("active"));

// favourite button inside todo options window
document.addEventListener("click", (e) => {
	let favOpt = e.target.closest(".tasks-block .content .options .favourite");
	if (!favOpt) return;

	let todo = favOpt.closest(".task");
	const todoObj = TodoList.find(todo.dataset.id);

	if (todo.classList.contains("deleted")) return;

	let fav = todo.querySelector(".content .options .favourite p");

	let options = favOpt.closest(".options");

	if (todo.classList.contains("favourite")) {
		todoObj.unFavourite();

		fav.innerHTML = "Favourite";
		todo.classList.remove("favourite");
		fav.previousElementSibling.classList.remove("fa-star-half-stroke");
		fav.previousElementSibling.classList.add("fa-star");

		if (TodoList.activeList === 'list-favourite') {
			todo.remove();
		}
	} else {
		todoObj.favourite();

		fav.innerHTML = "Unfavourite";
		todo.classList.add("favourite");
		fav.previousElementSibling.classList.add("fa-star-half-stroke");
	}
	// renderTodos(TodoList.activeList);
	options.classList.remove("active");
	options.closest(".task").classList.remove("active");
});

// delete button inside todo options window
document.addEventListener("click", (e) => {
	let delOpt = e.target.closest(".tasks-block .content .options .delete");
	if (!delOpt) return;

	let todo = delOpt.closest(".task");
	const todoObj = TodoList.find(todo.dataset.id);

	let del = todo.querySelector(".content .options .delete p");

	if (todo.classList.contains("deleted")) {
		todoObj.restore();

		todo.classList.remove("deleted");
		del.innerHTML = "Restore";
	} else {
		todoObj.delete();

		todo.classList.add("deleted");
		del.innerHTML = "Delete";
	}

	if (
		todo.classList.contains("favourite") &&
		todo.classList.contains("deleted")
	)
		todo.classList.remove("favourite");
	// renderTodos(TodoList.activeList);
	todo.remove();
});

// edit button inside todo options window
document.addEventListener("click", (e) => {
	let editOpt = e.target.closest(".task .content .options .edit");
	if (!editOpt) return;

	let currentParagraph = document.querySelector(".task.active .content p");
	let currentSaveBtn = document.querySelector(
		".tasks-block > .task.active > .content > button.save"
	);
	let options = document.querySelector(".task.active .content .options");

	if (editOpt == null) return;

	currentParagraph.setAttribute("contenteditable", "true");
	currentSaveBtn.style.display = "block";
	options.classList.remove("active");
	currentParagraph.focus();
	// set the caret cursor to the end of the line
	setCaret(currentParagraph);

	function edit() {
		let todo = editOpt.closest(".task");
		const todoObj = TodoList.find(todo.dataset.id);

		todoObj.edit(currentParagraph.textContent.trim());

		currentSaveBtn.style.display = "none";
		currentParagraph.setAttribute("contenteditable", "false");
	}

	currentSaveBtn.addEventListener("click", edit);
	currentParagraph.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			edit();
		}
	});
});

// check todo button
document.addEventListener("click", (e) => {
	if (!e.target.matches(".tasks-block .task .content > .fa-circle")) return;

	let checkBtn = e.target;
	let todo = checkBtn.closest(".task");
	const todoObj = TodoList.find(todo.dataset.id);

	if (todo.classList.contains("checked")) {
		todoObj.unCheck();

		checkBtn.classList.remove("checked");
		todo.classList.remove("checked");

		if (TodoList.activeList === 'list-completed') {
			todo.remove();
		}
	} else {
		todoObj.check();

		checkBtn.classList.add("checked");
		todo.classList.add("checked");

		if (TodoList.activeList === 'list-progress') {
			todo.remove();
		}
	}
	// renderTodos(TodoList.activeList);
});

// lists
navListBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		TodoList.updateActiveList(btn.id);
		renderTodos(btn.id);
	});
});

// clear trash button
document
	.querySelector(".nav-block .clear .clear-trash .yes")
	.addEventListener("click", (e) => {
		e.stopPropagation();

		TodoList.deleteTrash();
		// renderTodos(TodoList.activeList);

		if (TodoList.activeList === ListsNames.trash) tasksBlock.innerHTML = "";

		document
			.querySelector("nav .nav-block .actions .clear .clear-trash")
			.classList.remove("active");
		document.querySelector("#list-trash > span").innerHTML = "0";
	});

// reset button
document
	.querySelector(".nav-block .clear .reset-all .yes")
	.addEventListener("click", (e) => {
		e.stopPropagation();

		TodoList.clear();

		document
			.querySelector("nav .nav-block .actions .clear .reset-all")
			.classList.remove("active");
		document.querySelectorAll(".lists .list").forEach((list) => {
			list.querySelector("span").innerHTML = "0";
		});

		// renderTodos(TodoList.activeList);
		tasksBlock.innerHTML = "";
	});

// search button
document
	.querySelector("nav .nav-block .actions .search input")
	.addEventListener("input", (e) => {
		let filter = new TodosFilter();

		let todos = filter.filter(
			TodoList.todos,
			new SearchSpecification(e.target.value)
		);

		tasksBlock.innerHTML = "";
		todos.forEach((todo) => tasksBlock.append(todo.render()));

		if (e.target.value === "") {
			renderTodos(TodoList.activeList);
		}
	});

// mobile nav button
document.addEventListener("click", (e) => {
	let isNavBtn = e.target.matches("main header > i");
	if (!isNavBtn && e.target.closest("nav")) return;

	const navbar = document.querySelector("nav");

	if (!isNavBtn) {
		navbar.classList.remove("active");
	} else {
		navbar.classList.toggle("active");
	}
});
