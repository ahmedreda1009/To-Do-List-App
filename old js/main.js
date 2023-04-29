import { addNewTaskTo, createTasksFrom, setCarat, addToLocalStorage, getFromLocalStorage, clearAllTasksFromLocalStorage } from "./main-functions.js";

////////////////////////
// main array of tasks
///////////////////////
let allTasks = [];

// all tasks without deleted
let notDel = [{ text: 'Be Productive, DO MORE.', id: 1212, completed: false, deleted: false, favourite: true, hour: 0, minite: 0, weekDay: 0, day: 1, month: 0, year: 2022 }];
// favourite tasks
let favouriteTasks = [];
// in progress tasks
let inProgressTasks = [];
// completed tasks
let completedTasks = [];
// deleted tasks
let deletedTasks = [];
// searched tasks
let searchResult = [];

//////////////////////////////////////////////////////////////////////////
// update arrays
//////////////////////////////////////////////////////////////////////////
function updateArrays(allTasks) {
	notDel = allTasks.filter((task) => {
		return !task.deleted;
	});

	inProgressTasks = allTasks.filter((element) => {
		return !element.completed && !element.deleted;
	});

	completedTasks = allTasks.filter((element) => {
		return element.completed && !element.deleted;
	});

	favouriteTasks = allTasks.filter((element) => {
		return element.favourite && !element.deleted;
	});

	deletedTasks = allTasks.filter((element) => {
		return element.deleted;
	});
}

//////////////////////////////////////////////////////////////////////////
// get the length of each array and put it besides its name
//////////////////////////////////////////////////////////////////////////
function getArraysLength() {
	document.querySelector('nav .nav-block .lists .all span').innerHTML = notDel.length;
	document.querySelector('nav .nav-block .lists .in-progress span').innerHTML = inProgressTasks.length;
	document.querySelector('nav .nav-block .lists .completed span').innerHTML = completedTasks.length;
	document.querySelector('nav .nav-block .lists .favourite span').innerHTML = favouriteTasks.length;
	document.querySelector('nav .nav-block .lists .trash span').innerHTML = deletedTasks.length;
}

//////////////////////////////////////////////////////////////////////////
// get tasks from local storage
//////////////////////////////////////////////////////////////////////////
if (getFromLocalStorage()) {
	allTasks = getFromLocalStorage();
	updateArrays(allTasks);
	addFromActiveList();
	getArraysLength();
}

//////////////////////////////////////////////////////////////////////////
// the default task
//////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
	addFromActiveList();
});

//////////////////////////////////////////////////////////////////////////
// function to be called when clicking on the add task btn
//////////////////////////////////////////////////////////////////////////
function addBtnClick() {
	addNewTaskTo(allTasks, favouriteTasks);
	updateArrays(allTasks);
	addFromActiveList();
	addToLocalStorage(allTasks);
	getArraysLength();
}

//////////////////////////////////////////////////////////////////////////
// add task to the allTasks array when click on add button
//////////////////////////////////////////////////////////////////////////
const addBtn = document.querySelector("main .new-task-window .icons .fa-plus");
addBtn.addEventListener("click", addBtnClick);

//////////////////////////////////////////////////////////////////////////
// add task to the allTasks array when click enter
//////////////////////////////////////////////////////////////////////////
const input = document.querySelector("main .new-task-container input");
input.addEventListener("keypress", (e) => {
	if (e.keyCode === 13) {
		addBtnClick();
	}
});

//////////////////////////////////////////////////////////////////////////
// all tasks btn
//////////////////////////////////////////////////////////////////////////
let allBtn = document.querySelector("nav .lists .all");
allBtn.addEventListener("click", () => {
	updateArrays(allTasks);
	createTasksFrom(notDel);
});

//////////////////////////////////////////////////////////////////////////
// in progress tasks btn
//////////////////////////////////////////////////////////////////////////
let inProgressBtn = document.querySelector("nav .lists .in-progress");
inProgressBtn.addEventListener("click", () => {
	updateArrays(allTasks);
	createTasksFrom(inProgressTasks);
});

//////////////////////////////////////////////////////////////////////////
// completed tasks btn
//////////////////////////////////////////////////////////////////////////
let completedBtn = document.querySelector("nav .lists .completed");
completedBtn.addEventListener("click", () => {
	updateArrays(allTasks);
	createTasksFrom(completedTasks);
});

//////////////////////////////////////////////////////////////////////////
// the favourite tasks btn
//////////////////////////////////////////////////////////////////////////
let favouriteBtn = document.querySelector("nav .lists .favourite");
favouriteBtn.addEventListener("click", () => {
	updateArrays(allTasks);
	createTasksFrom(favouriteTasks);
});

//////////////////////////////////////////////////////////////////////////
// the deleted tasks btn
//////////////////////////////////////////////////////////////////////////
let deletedBtn = document.querySelector("nav .lists .trash");
deletedBtn.addEventListener("click", () => {
	updateArrays(allTasks);
	createTasksFrom(deletedTasks);
});

//////////////////////////////////////////////////////////////////////////
// determine the active array and show its tasks
//////////////////////////////////////////////////////////////////////////
function addFromActiveList() {
	let navListBtns = document.querySelectorAll("nav .nav-block .lists > div");
	navListBtns.forEach((btn) => {
		if (btn.classList.contains("active") && document.querySelector("nav .nav-block .actions .search input").value == '') {
			if (btn.classList.contains("favourite")) {
				createTasksFrom(favouriteTasks);
			} else if (btn.classList.contains("in-progress")) {
				createTasksFrom(inProgressTasks);
			} else if (btn.classList.contains("completed")) {
				createTasksFrom(completedTasks);
			} else if (btn.classList.contains("trash")) {
				createTasksFrom(deletedTasks);
			} else if (btn.classList.contains("all")) {
				createTasksFrom(notDel);
			}
		} else if (document.querySelector("nav .nav-block .actions .search input").value != '') {
			createTasksFrom(searchResult);
		}
	});
}

//////////////////////////////////////////////////////////////////////////
// search input
//////////////////////////////////////////////////////////////////////////
document.querySelector("nav .nav-block .actions .search input").addEventListener('input', (e) => {
	searchResult = notDel.filter((task) => {
		return task.text.toLowerCase().includes(e.target.value.toLowerCase());
	});
	createTasksFrom(searchResult);
});

//////////////////////////////////////////////////////////////////////////
// check btn
//////////////////////////////////////////////////////////////////////////
document.addEventListener("click", (e) => {
	if (e.target.matches(".tasks-block .task .content > .fa-circle")) {
		e.target.classList.toggle("checked");

		allTasks.forEach((obj) => {
			if (obj.id == e.target.closest(".task").dataset.id) {
				// obj.updateCompleted();
				if (obj.completed === true) {
					obj.completed = false;
				} else {
					obj.completed = true;
				}
			}
		});
		updateArrays(allTasks);

		addFromActiveList();
		addToLocalStorage(allTasks);
		getArraysLength();
	}
});

//////////////////////////////////////////////////////////////////////////
// fav button in options
//////////////////////////////////////////////////////////////////////////
document.addEventListener("click", (e) => {
	let favOpt = e.target.closest(".tasks-block .content .options .favourite");

	if (favOpt != null) {
		allTasks.forEach((obj) => {
			if (obj.id == favOpt.closest(".task").dataset.id) {
				if (!obj.deleted) {
					if (obj.favourite === true) {
						obj.favourite = false;
					} else {
						obj.favourite = true;
					}
				}
			}
		});
		updateArrays(allTasks);

		addFromActiveList();
		addToLocalStorage(allTasks);
		getArraysLength();
	}
});


//////////////////////////////////////////////////////////////////////////
// delete button in options
//////////////////////////////////////////////////////////////////////////
document.addEventListener("click", (e) => {
	let delOpt = e.target.closest(".task .options .delete");

	if (delOpt != null) {
		allTasks.forEach((obj) => {
			if (obj.id == e.target.closest(".task").dataset.id) {
				// obj.updateDeleted();
				if (obj.deleted === true) {
					obj.deleted = false;
				} else {
					obj.deleted = true;
				}

				obj.favourite = false;
				obj.completed = false;
			}
		});
		updateArrays(allTasks);

		addFromActiveList();
		addToLocalStorage(allTasks);
		getArraysLength();
	}
});

//////////////////////////////////////////////////////////////////////////
// edit button in options
//////////////////////////////////////////////////////////////////////////
document.addEventListener('click', (e) => {
	let editOpt = e.target.closest('.task .content .options .edit');
	let currentParagraph = document.querySelector('.task.active .content p');
	let currentSaveBtn = document.querySelector(".tasks-block > .task.active > .content > button.save");
	let options = document.querySelector('.task.active .content .options');

	if (editOpt != null) {
		currentParagraph.setAttribute('contenteditable', 'true');
		currentSaveBtn.style.display = "block";
		options.classList.remove('active');
		currentParagraph.focus();
		// set the caret cursor to the end of the line
		setCarat(currentParagraph);

		function edit() {
			allTasks.forEach((obj) => {
				if (obj.id == editOpt.closest(".task").dataset.id) {
					obj.text = currentParagraph.textContent.trim();
				}
			});
			currentSaveBtn.style.display = "none";
			addFromActiveList();
			addToLocalStorage(allTasks);
		}

		currentSaveBtn.addEventListener('click', edit);
		currentParagraph.addEventListener('keypress', (e) => {
			if (e.key === "Enter") {
				edit();
			}
		});

	}
});

//////////////////////////////////////////////////////////////////////////
// reset button
//////////////////////////////////////////////////////////////////////////
document.querySelector(".nav-block .clear .reset-all .yes").addEventListener("click", (e) => {
	e.stopPropagation();

	allTasks = [];
	notDel = [];
	favouriteTasks = [];
	inProgressTasks = [];
	completedTasks = [];
	deletedTasks = [];
	addFromActiveList();
	clearAllTasksFromLocalStorage();
	getArraysLength();
	document.querySelector("nav .nav-block .actions .clear .reset-all").classList.remove("active");
});

//////////////////////////////////////////////////////////////////////////
// clear trash button
//////////////////////////////////////////////////////////////////////////
document.querySelector(".nav-block .clear .clear-trash .yes").addEventListener("click", (e) => {
	e.stopPropagation();

	deletedTasks = [];
	allTasks = allTasks.filter((task) => {
		return !task.deleted;
	});

	addFromActiveList();
	addToLocalStorage(allTasks);
	getArraysLength();
	document.querySelector("nav .nav-block .actions .clear .clear-trash").classList.remove("active");
});

//////////////////////////////////////////////////////////////////////////
// viewport problem when using the app on mobile
//////////////////////////////////////////////////////////////////////////
const documentHeight = () => {
	const doc = document.documentElement
	doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', documentHeight)
documentHeight()