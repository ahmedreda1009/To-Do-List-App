import { addNewTaskTo, createTasksFrom, setCarat, addToLocalStorage, getFromLocalStorage, clearAllTasksFromLocalStorage} from "./main-functions.js";
// import {checkBtns} from './btns-functionality.js';

// {text: 'Be Productive, DO MORE.', id: 1212, completed: false, deleted: false, favourite: true, hour: 0, minite: 0, weekDay: 0, day: 1, month: 0, year: 2022}

////////////////////////
// main array of tasks
///////////////////////
let allTasks = [];

// all tasks without deleted
let notDel = [{text: 'Be Productive, DO MORE.', id: 1212, completed: false, deleted: false, favourite: true, hour: 0, minite: 0, weekDay: 0, day: 1, month: 0, year: 2022}];
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

// get tasks from local storage
if (getFromLocalStorage()) {
	allTasks = getFromLocalStorage();
	notDel = allTasks.filter((task) => {
		return !task.deleted;
	});
	addFromActiveList();
}
// the very first task
document.addEventListener('DOMContentLoaded', () => {
	addFromActiveList();
})

console.log(allTasks);
console.log(notDel);

// function to be called when clicking on the add task btn
function addBtnClick() {
	addNewTaskTo(allTasks, inProgressTasks, completedTasks, favouriteTasks, deletedTasks, notDel);
	addFromActiveList();
	addToLocalStorage(allTasks);
}

// add task to the allTasks array when click on add button
const addBtn = document.querySelector("main .new-task-window .icons .fa-plus");
addBtn.addEventListener("click", addBtnClick);

// add task to the allTasks array when click enter
const input = document.querySelector("main .new-task-container input");
input.addEventListener("keypress", (e) => {
	if (e.keyCode === 13) {
		addBtnClick();
	}
});

// show all tasks
let allBtn = document.querySelector("nav .lists .all");
allBtn.addEventListener("click", () => {

	notDel = allTasks.filter((task) => {
		return !task.deleted;
	});
	createTasksFrom(notDel);
});

// show in progress tasks
let inProgressBtn = document.querySelector("nav .lists .in-progress");
inProgressBtn.addEventListener("click", () => {
	inProgressTasks = allTasks.filter((element) => {
		return !element.completed && !element.deleted;
	});
	createTasksFrom(inProgressTasks);
});

// show completed tasks
let completedBtn = document.querySelector("nav .lists .completed");
completedBtn.addEventListener("click", () => {
	completedTasks = allTasks.filter((element) => {
		return element.completed && !element.deleted;
	});
	createTasksFrom(completedTasks);
});

// show the favourite tasks
let favouriteBtn = document.querySelector("nav .lists .favourite");
favouriteBtn.addEventListener("click", () => {
	favouriteTasks = allTasks.filter((element) => {
		return element.favourite && !element.deleted;
	});
	createTasksFrom(favouriteTasks);
});

// show the deleted tasks
let deletedBtn = document.querySelector("nav .lists .trash");
deletedBtn.addEventListener("click", () => {
	deletedTasks = allTasks.filter((element) => {
		return element.deleted;
	});
	createTasksFrom(deletedTasks);
});

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

// search input
document.querySelector("nav .nav-block .actions .search input").addEventListener('input', (e) => {

	// document.querySelector("nav .nav-block .actions .search").classList.add('active');

	searchResult = notDel.filter((task) => {
		return task.text.toLowerCase().includes(e.target.value.toLowerCase());
	});
	createTasksFrom(searchResult);
});

// document.querySelector("nav .nav-block .actions .search input").addEventListener('focus', (e) => {
// 	if (e.target.value != '') {
// 		document.querySelector('main .tasks-block') = '';
// 	}
// })



//////////////////////////////////////////////////////////////////////////
// check the task once clicked on it
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

		notDel = allTasks.filter((task) => {
			return !task.deleted;
		});

		completedTasks = allTasks.filter((element) => {
			return element.completed && !element.deleted;
		});

		inProgressTasks = allTasks.filter((element) => {
			return !element.completed && !element.deleted;
		});

		addFromActiveList();
		addToLocalStorage(allTasks);

		console.log(allTasks);
		console.log(completedTasks);
	}
});

// fav button in options
document.addEventListener("click", (e) => {
	let favOpt = e.target.closest(".tasks-block .content .options .favourite");

	if (favOpt != null) {
		// favOpt.classList.remove("active");
		// console.log(favOpt.closest('.task').dataset.id);

		allTasks.forEach((obj) => {
			if (obj.id == favOpt.closest(".task").dataset.id) {
				if (!obj.deleted) {
					// obj.updateFavourite();
					if (obj.favourite === true) {
						obj.favourite = false;
					} else {
						obj.favourite = true;
					}
				}
				// else {
				// 	favOpt.classList.remove("active");
				// }
			}
		});

		notDel = allTasks.filter((task) => {
			return !task.deleted;
		});

		favouriteTasks = allTasks.filter((element) => {
			return element.favourite && !element.deleted;
		});

		addFromActiveList();
		addToLocalStorage(allTasks);

		console.log(allTasks);
	}
});

// delete button in options
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

		notDel = allTasks.filter((task) => {
			return !task.deleted;
		});

		deletedTasks = allTasks.filter((task) => {
			return task.deleted && !notDel;
		});

		favouriteTasks = favouriteTasks.filter((task) => {
			return !task.deleted && task.favourite;
		});

		inProgressTasks = inProgressTasks.filter((task) => {
			return !task.deleted && !task.completed;
		});

		completedTasks = completedTasks.filter((task) => {
			return !task.deleted && task.completed;
		});

		addFromActiveList();
		addToLocalStorage(allTasks);
	}
});



// edit button in options
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
					// obj.updateText(currentParagraph.textContent);

					obj.text = currentParagraph.textContent;
					// console.log(allTasks);
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

// reset button in options
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
	document.querySelector("nav .nav-block .actions .clear .reset-all").classList.remove("active");
});

// clear trash button in options
document.querySelector(".nav-block .clear .clear-trash .yes").addEventListener("click", (e) => {
	e.stopPropagation();

	deletedTasks = [];
	allTasks = allTasks.filter((task) => {
		return !task.deleted;
	});

	addFromActiveList();
	addToLocalStorage(allTasks);
	document.querySelector("nav .nav-block .actions .clear .clear-trash").classList.remove("active");
});