export class Counter {
	multiplier = 1;
	value = 0;
	name;
	node;

	constructor(name) {
		this.name = name;
		this.node = document.getElementById(name);
		this.sync();
	}

	sync() {
		this.value = parseInt(localStorage.getItem(this.name)) || 0;
		localStorage.setItem(this.name, this.value);

		this.node.dataset.counter = new Intl.NumberFormat("ru-RU").format(this.value);
	}

	add() {
		this.change(this.multiplier);
	}

	set(value) {
		this.value = value;
		this.node.dataset.counter = new Intl.NumberFormat("ru-RU").format(this.value);
		localStorage.setItem(this.name, this.value);
	}

	change(value) {
		this.value += value;
		this.node.dataset.counter = new Intl.NumberFormat("ru-RU").format(this.value);
		localStorage.setItem(this.name, this.value);
	}
}

export class Score extends Counter {
	multiplier = {};
	income = {}
	
	constructor(name) {
		super(name);

		this.multiplier = new Counter('multiplier');
		if (!this.multiplier.value) {
			this.multiplier.add();
		}
		
		this.income = new Counter('income');
	}

	add() {
		this.change(this.multiplier.value);
	}
}