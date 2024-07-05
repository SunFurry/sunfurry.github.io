export class Bonus {
	obBase = {
		income: 0,
		cost: 0,
	};
	node;
	level = 0;
	income = 0;
	cost = 0;

	constructor(name, income, cost) {
		this.obBase.income = income;
		this.obBase.cost = cost;

		let item = localStorage.getItem(`bonus_${name}`);
		item = item ? JSON.parse(item) : {};

		this.name = name;
		this.level = parseInt(item.level) || 0;
		this.cost = parseInt(item.cost) || cost;
		this.income = parseInt(item.income) || income;
		this._addItem(name);
	}

	_addItem(name) {
		this.node = document.createElement('button');
		this.node.title = name;
		this.node.classList.add('bonus', 'text-sm', 'box', 'border', 'py-5', 'flex', 'items-center', 'justify-center', 'rounded');
		this.node.disabled = true;
		this.node.innerText = "₽ " + new Intl.NumberFormat("ru-RU").format(this.income);
		this.node.dataset.cost = new Intl.NumberFormat("ru-RU").format(this.cost);
		this.node.dataset.level = this.level;
		
		this.node.addEventListener('click', () => {
			this._upgrade();
		});

		document.getElementById('bonus').appendChild(this.node);
	}

	_upgrade() {
		if (window.score.value < this.cost) return;

		window.score.change(this.cost * -1);

		this.setLevel(this.level+1);
		this.setCostValue(this.cost * 1.4);
		if (this.level > 1) {
			this.setIncomeValue(this.income * 1.3);
		}

		if (this.level%5 === 0) {
			new Noty({
				type: 'info',
				layout: 'topRight',
				text: `Bonus ${this.name} upgraded to level ${this.level}`,
				timeout: 3000,
			}).show(); 
		}

		this.checkActiveAll();
		this.setIncomeValues();
		this.setMultiplierValues();

		localStorage.setItem(
			`bonus_${this.name}`, 
			JSON.stringify({
				level: this.level,
				cost: this.cost,
				income: this.income,
			})
		);
	}

	checkActive() {
		this.node.disabled = this.level < 50 && window.score.value < this.cost;
	}

	getIncome() {
		if (this.level) {
			return this.income;
		}

		return 0;
	}

	checkActiveAll() {
		for (let i in window.obBonus) {
			window.obBonus[i].checkActive();
		}
	}

	setIncomeValues() {
		let income = 0;
		for (let i in window.obBonus) {
			if (window.obBonus[i].level) {
				income += window.obBonus[i].income;
			}
		}

		window.score.income.set(income);
	}

	setMultiplierValues() {
		let multiplier = 1;
		for (let i in window.obBonus) {
			if (window.obBonus[i].level) {
				multiplier += Math.floor(window.obBonus[i].level / 5) + 1;
			}
		}

		window.score.multiplier.set(multiplier);
	}

	setIncomeValue(value) {
		this.income = value;
		this.node.innerText = "₽ " + new Intl.NumberFormat("ru-RU").format(value);
	}

	setCostValue(value) {
		this.cost = value;
		this.node.dataset.cost = new Intl.NumberFormat("ru-RU").format(value);
	}

	setLevel(value) {
		this.level = value;
		this.node.dataset.level = value < 50 ? value : 'max';
	}

	reset() {
		this.setLevel(0);
		this.setIncomeValue(this.obBase.income);
		this.setCostValue(this.obBase.cost);
		localStorage.removeItem(`bonus_${this.name}`);
	}
}