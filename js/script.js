import { Bonus } from "./bonus.js";
import { Score } from "./counter.js";


const INCOME_INTERVAL = 5000;

window.score = new Score('score');

// bonus
window.obBonus = {};

function setBonus() {
	window.obBonus.level_1 = new Bonus('level_1', 1, 10);
	window.obBonus.level_2 = new Bonus('level_2', 10, 100);
	window.obBonus.level_3 = new Bonus('level_3', 20, 200);
	window.obBonus.level_4 = new Bonus('level_4', 50, 500);
	window.obBonus.level_5 = new Bonus('level_5', 100, 1000);
	window.obBonus.level_6 = new Bonus('level_6', 200, 2000);
	window.obBonus.level_7 = new Bonus('level_7', 500, 5000);
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

const nodePrimaryButton = document.querySelector('#primary-button');
document.addEventListener('DOMContentLoaded', () => {
	(function start() {
		setBonus();
		eventLoop();
	})();

	nodePrimaryButton.addEventListener('click', () => {
		window.score.add();
	});
});