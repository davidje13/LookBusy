'use strict';

function cancel(e) {
	e.preventDefault();
}

let lastContentIndex = -1;

function randInt(limit) {
	return (Math.random() * limit)|0;
}

function pickIndex(list, taken) {
	let takenCount = 0;
	for (const v of taken) {
		takenCount += v ? 1 : 0;
	}
	if (takenCount >= list.length) {
		return randInt(list.length);
	}
	let v = randInt(list.length - takenCount);
	for (let i = 0; i <= v; ++ i) {
		if (taken[i]) {
			++ v;
		}
	}
	return v;
}

function applyPrefix(prefix, v) {
	return prefix + v.replace(/\n/g, '\n' + prefix);
}

function populateVars(content, memory = null) {
	if (content.indexOf('{{') === -1) {
		return content;
	}
	if (!memory) {
		memory = new Map();
	}
	return content.replace(/\{\{([^{}:]*?):?([a-zA-Z]+)([0-9]*)\}\}/g, (m, prefix, type, ind) => {
		const canonicalType = type.toLowerCase();
		let typeMemory = memory.get(canonicalType);
		if (!typeMemory) {
			typeMemory = {choices: [], taken: []};
			memory.set(canonicalType, typeMemory);
		}
		let v = '';
		if (ind !== '' && typeMemory.choices[+ind]) {
			v = typeMemory.choices[+ind];
		} else {
			const list = rand[canonicalType];
			if (!list) {
				throw 'Unknown type: ' + canonicalType;
			}
			const i = pickIndex(list, typeMemory.taken);
			v = populateVars(list[i], memory);
			if (ind !== '') {
				typeMemory.choices[+ind] = v;
				typeMemory.taken[i] = true;
			}
		}
		if (prefix) {
			v = applyPrefix(prefix, v);
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
	let index = randInt(blocks.length - 1);
	if (index === lastContentIndex) {
		index = blocks.length - 1;
	}
	lastContentIndex = index;
	return populateVars(blocks[index]) + '\n\n';
}

window.addEventListener('load', () => {
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
			reps = randInt(maxReps - minReps) + minReps;
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
