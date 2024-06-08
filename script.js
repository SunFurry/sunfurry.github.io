document.addEventListener('DOMContentLoaded', () => {
	const nodeBonus = document.getElementById('bonus');
	const nodeCounter = document.getElementById('counter');
	const nodePassive = document.getElementById('passive');
	const nodeMultiplyer = document.getElementById('multiplyer');
	const nodePrimaryButton = document.querySelector('#primary-button');

	let multiplyer, passive, counter;

	(function start() {
		multiplyer = parseInt(localStorage.getItem('clickMultiplyer'));
		if (!multiplyer) {
			multiplyer = 1;
			localStorage.setItem('clickMultiplyer', multiplyer);
		}
		nodeMultiplyer.dataset.counter = multiplyer;

		passive = parseInt(localStorage.getItem('passive'));
		if (!passive) {
			passive = 0;
		}
		nodePassive.dataset.counter = passive;

		counter = parseInt(localStorage.getItem('counter'));
		if (!counter) {
			counter = 0;
		}
		nodeCounter.dataset.counter = counter;

		eventLoop();
	})();

	function eventLoop() {
		window.gameInstance = setInterval(() => {
			checkBonus();
		}, 1000);
	}
	
	function addCounter() {
		counter += multiplyer;
		nodeCounter.dataset.counter = counter;
		localStorage.setItem('counter', counter);
	}

	function checkBonus() {
		console.log('test');
	}

	function addItem(name){
		const item = document.createElement('button');
		item.innerText = name;
		item.classList.add('box', 'border', 'h-1/6', 'w-2/6', 'flex', 'items-center', 'justify-center');
		nodeBonus.appendChild(item);

		return item;
	}

	nodePrimaryButton.addEventListener('click', () => {
		addCounter();
	});
})