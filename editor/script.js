function cancel(e) {
	e.preventDefault();
}

let lastContentIndex = -1;

function pick(list) {
	return list[(Math.random() * list.length)|0];
}

function populateVars(content) {
	const choices = [];
	return content.replace(/\{\{([^\}0-9]+)([0-9]*)\}\}/g, (m, type, ind) => {
		let raw = '';
		if (ind !== '' && choices[+ind]) {
			v = choices[+ind];
		} else {
			v = pick(rand[type.toLowerCase()]);
			if (ind !== '') {
				choices[+ind] = v;
			}
		}
		if (type === type.toLowerCase()) {
			return v.toLowerCase();
		} else if (type === type.toUpperCase()) {
			return v.toUpperCase();
		} else {
			return v;
		}
	});
}

function pickContent() {
	let index = (Math.random() * (blocks.length - 1))|0;
	if (index === lastContentIndex) {
		index = blocks.length - 1;
	}
	lastContentIndex = index;
	return populateVars(blocks[index]) + '\n\n';
}

window.addEventListener('load', () => {
	'use strict';

	const hold = document.getElementById('hold');
	const output = document.getElementById('typed');
	const input = document.createElement('textarea');
	document.body.appendChild(input);
	const maxLines = 100;
	const maxReps = 3;
	const minReps = 1;
	let content = '';
	let lines = 0;
	let lastKeyPress = 0;

	let target = pickContent();
	let pos = 0;

	function write(c) {
		content += c;
		if (c === '\n') {
			++ lines;
			if (lines > maxLines) {
				content = content.substr(content.indexOf('\n') + 1);
				-- lines;
			}
		}
		output.textContent = content;
		hold.scrollTop = 9999999;
	}

	function writeNext() {
		write(target.charAt(pos));
		++ pos;
		if (pos >= target.length) {
			target = pickContent();
			pos = 0;
		}
	}

	function advance(e) {
		e.preventDefault();
		e.stopPropagation();

		const now = Date.now();
		const delay = now - lastKeyPress;
		let reps = 1;
		if (delay < 200) {
			reps = (Math.random() * (maxReps - minReps) + minReps)|0;
		}
		for (let i = 0; i < reps; ++ i) {
			writeNext();
		}
		lastKeyPress = now;
	}

	input.addEventListener('keydown', advance);
	input.addEventListener('keyup', cancel);
	input.addEventListener('keypress', cancel);

	window.addEventListener('keydown', advance);
	window.addEventListener('keyup', cancel);
	window.addEventListener('keypress', cancel);

	window.addEventListener('focus', () => input.focus());
	document.body.addEventListener('focus', () => input.focus());
	window.addEventListener('beforeunload', (e) => {
		e.preventDefault();
		e.returnValue = '';
	});
	input.focus();
}, {once: true});
