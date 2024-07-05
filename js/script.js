import { Bonus } from "./bonus.js";
import { Score } from "./counter.js";


const INCOME_INTERVAL = 1000;

window.score = new Score('score');

// bonus
window.obBonus = {};

function setBonus() {
	window.obBonus.wooden = new Bonus('wooden', 1, 10);
	window.obBonus.copper = new Bonus('copper', 10, 100);
	window.obBonus.tin = new Bonus('tin', 20, 200);
	window.obBonus.iron = new Bonus('iron', 50, 500);
	window.obBonus.bronze = new Bonus('bronze', 100, 1000);
	window.obBonus.silver = new Bonus('silver', 200, 2000);
	window.obBonus.gold = new Bonus('gold', 500, 5000);
	window.obBonus.platinum = new Bonus('platinum', 1000, 10000);
	window.obBonus.orichalcum = new Bonus('orichalcum', 2000, 20000);
	window.obBonus.adamantium = new Bonus('adamantium', 5000, 50000);
}

function checkBonus() {
	for (let i in window.obBonus) {
		window.obBonus[i].checkActive();
	}
}

function checkIncome() {
	let income = 0;
	for (let i in window.obBonus) {
		income += window.obBonus[i].getIncome();
		window.obBonus[i].checkActive();
	}

	window.score.change(income);
}

function eventLoop() {
	window.gameInstance = setInterval(() => {
		checkBonus();
	}, 1000);

	window.incomeInterval = setInterval(() => {
		checkIncome();
	}, INCOME_INTERVAL);
}

const nodePrimaryButton = document.getElementById('primary-button');
const nodeResetButton = document.getElementById('reset');
document.addEventListener('DOMContentLoaded', () => {
	(function start() {
		setBonus();
		eventLoop();
	})();

	nodePrimaryButton.addEventListener('click', () => {
		window.score.add();
	});

	nodeResetButton.addEventListener('click', () => {
		for (let i in window.obBonus) {
			window.obBonus[i].reset();
		}

		window.score.set(0);
		window.score.multiplier.set(1);
		window.score.income.set(0);
	});
});