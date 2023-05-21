class Specification {
	isSatisfied(todo) {
		return todo;
	}
}

export class CompletedSpecification extends Specification {
	constructor(isCompleted) {
		super();
		this.isCompleted = isCompleted;
	}

	isSatisfied(todo) {
		return todo.isDone === this.isCompleted;
	}
}

export class FavouriteSpecification extends Specification {
	constructor(isFavourite) {
		super();
		this.isFavourite = isFavourite;
	}

	isSatisfied(todo) {
		return todo.isFavourite === this.isFavourite;
	}
}

export class DeletedSpecification extends Specification {
	constructor(isDeleted) {
		super();
		this.isDeleted = isDeleted;
	}

	isSatisfied(todo) {
		return todo.isDeleted === this.isDeleted;
	}
}

export class SearchSpecification extends Specification {
	constructor(newText) {
		super();
		this.body = newText;
	}

	isSatisfied(todo) {
		return todo.body.toLowerCase().includes(this.body.toLowerCase());
	}
}

export class AndSpecification extends Specification {
	constructor(spec) {
		super();
		this.spec = [...spec];
	}

	isSatisfied(todo) {
		return this.spec.every((spec) => spec.isSatisfied(todo));
	}
}

export class TodosFilter {
	filter(todos, spec) {
		return todos.filter((todo) => spec.isSatisfied(todo));
	}
}
