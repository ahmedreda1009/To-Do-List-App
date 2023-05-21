import Storage from "./Storage";
import TodoList from "./TodoList";

export default class Todo {
	constructor(id, body, isFavourite = false) {
		this.id = id;
		this.body = body;
		this.isFavourite = isFavourite;
		this.isDone = false;
		this.isDeleted = false;
	}

	check() {
		this.isDone = true;
		Storage.update();
		TodoList.updateCounts();
	}

	unCheck() {
		this.isDone = false;
		Storage.update();
		TodoList.updateCounts();
	}

	favourite() {
		this.isFavourite = true;
		Storage.update();
		TodoList.updateCounts();
	}

	unFavourite() {
		this.isFavourite = false;
		Storage.update();
		TodoList.updateCounts();
	}

	edit(newText) {
		this.body = newText;
		Storage.update();
		TodoList.updateCounts();
	}

	delete() {
		this.isDeleted = true;
		Storage.update();
		TodoList.updateCounts();
	}

	restore() {
		this.isDeleted = false;
		Storage.update();
		TodoList.updateCounts();
	}

	render() {
		let date = new Date(this.id);
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();
		let weekDay = date.getDay();
		let hour = date.getHours();
		let minite = date.getMinutes();
		let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		let AmPm = "";

		if (hour < 9) {
			hour = "0" + hour;
			AmPm = "AM";
		} else if (hour > 9 && hour < 12) {
			hour = hour;
			AmPm = "AM";
		} else if (hour === 12) {
			hour = hour;
			AmPm = "PM";
		} else if (hour > 12) {
			hour = hour - 12;
			AmPm = "PM";
		}

		let todo = document.createElement("div");
		todo.classList.add("task");
		todo.dataset.id = this.id;
		if (this.isDeleted) todo.classList.add("deleted");
		if (this.isFavourite) todo.classList.add("favourite");
		if (this.isDone) todo.classList.add("checked");

		let taskHtml = `
        <div class="content">
            <i class="fa-regular fa-circle ${this.isDone ? "checked" : ""}"></i>
            <p contenteditable="false">${`${this.body}`.trim()}</p>
            <button class="save" style="display: none;">Save</button>
            <i class="fa-solid fa-ellipsis-vertical"></i>

            <div class="options">
                <div class="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <p>edit</p>
                </div>
                <div class="favourite ${this.isDeleted ? "deleted" : ""}">
                    <i class="fa-solid ${this.isFavourite && !this.isDeleted
				? "fa-star-half-stroke"
				: "fa-star"
			}"></i>
                    <p>${this.isFavourite && !this.isDeleted
				? "Unfavorite"
				: "Favourite"
			}</p>
                </div>
                <div class="delete">
                    <i class="fa-thin fa-trash"></i>
                    <p>${this.isDeleted ? "Restore" : "Delete"}</p>
                </div>
            </div>
        </div>
        <div class="date ${this.isFavourite ? "favourite" : ""}">
            <time>${hour}:${minite > 9 ? minite : "0" + minite} ${AmPm} </time>
            -
            <time>${days[weekDay]}</time>&nbsp;&nbsp;&nbsp;
            <time>${day > 9 ? day : "0" + day}.${month > 9 ? month + 1 : "0" + (month + 1)
			}.${year}</time>&nbsp;&nbsp;&nbsp;
            <i class="fa-solid fa-star" style="color: #ffa42b"></i>
            <i class="fa-solid fa-circle" style="color: #af2626"></i>&nbsp;
        </div>`;

		todo.innerHTML = taskHtml;

		return todo;
	}
}
