export default class Todo {
    constructor(id, body, favourite = false) {
        this.id = id;
        this.body = body;
        this.status = false;
        this.favourite = favourite;
        this.deleted = false;
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
        let AmPm = '';

        if (hour < 9) {
            hour = '0' + hour;
            AmPm = 'AM';
        }
        else if (hour === 12) {
            hour = hour;
            AmPm = 'PM';
        }
        else if (hour > 12) {
            hour = (hour - 12);
            AmPm = 'PM';
        }

        let task = document.createElement('div');
        task.classList.add('task');
        task.dataset.id = this.id;
        if (this.deleted) task.classList.add('deleted');
        if (this.favourite) task.classList.add('favourite');
        if (this.status) task.classList.add('checked');

        let taskHtml = `
        <div class="content">
            <i class="fa-regular fa-circle ${this.status ? 'checked' : ''}"></i>
            <p contenteditable="false">${`${this.body}`.trim()}</p>
            <button class="save" style="display: none;">Save</button>
            <i class="fa-solid fa-ellipsis-vertical"></i>

            <div class="options">
                <div class="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <p>edit</p>
                </div>
                <div class="favourite ${this.deleted ? 'deleted' : ''}">
                    <i class="fa-solid ${this.favourite && !this.deleted ? 'fa-star-half-stroke' : 'fa-star'}"></i>
                    <p>${this.favourite && !this.deleted ? 'Unfavorite' : 'Favourite'}</p>
                </div>
                <div class="delete">
                    <i class="fa-thin fa-trash"></i>
                    <p>${this.deleted ? 'Restore' : 'Delete'}</p>
                </div>
            </div>
        </div>
        <div class="date ${this.favourite ? 'favourite' : ''}">
            <time>${hour}:${minite > 9 ? minite : '0' + minite} ${AmPm} </time>
            -
            <time>${days[weekDay]}</time>&nbsp;&nbsp;&nbsp;
            <time>${day > 9 ? day : '0' + day}.${month > 9 ? month + 1 : '0' + (month + 1)}.${year}</time>&nbsp;&nbsp;&nbsp;
            <i class="fa-solid fa-star" style="color: #ffa42b"></i>
            <i class="fa-solid fa-circle" style="color: #af2626"></i>&nbsp;
        </div>`;

        task.innerHTML = taskHtml;

        return task;
    }
}