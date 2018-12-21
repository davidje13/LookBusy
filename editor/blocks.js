const rand = {
	'number': ['0', '1', '2', '5', '-1'],
	'local': [
		'a',
		'e',
		'i',
		'j',
		'p',
		't',
		'x',
		'y',
	],
	'var': [
		'Consumed',
		'Pos',
		'Limit',
		'Maximum',
		'Minimum',
		'Typical',
		'Range',
		'Repetitions',
		'Position',
		'Data',
		'Element',
		'Result',
		'Active',
	],
	'capturedfn': [
		'fn',
		'callback',
		'check',
		'comparator',
	],
	'verb': [
		'Combine',
		'Push',
		'Clear',
		'Add',
		'Remove',
		'Delete',
		'Get',
		'Set',
		'Pick',
		'Alloc',
		'Copy',
		'Slice',
		'Assign',
		'Join',
		'Prevent',
		'Stop',
		'Cancel',
		'Make',
		'Build',
		'Truncate',
		'Split',
		'Find',
		'Reverse',
		'Undo',
		'Save',
		'Load',
	],
	'adjective': [
		'Appendable',
		'Closable',
		'Transparent',
		'Inline',
		'Open',
		'Closed',
		'Abstract',
		'Fancy',
		'Lower',
		'Upper',
		'Inline',
		'Uninterruptible',
		'Clean',
		'Simple',
	],
	'noun': [
		'Collection',
		'Summary',
		'Aggregate',
		'Input',
		'Output',
		'String',
		'Integer',
		'Float',
		'Proxy',
		'Hardware',
		'Driver',
		'Emulator',
		'Material',
		'Renderer',
		'Parser',
		'Generator',
		'Builder',
		'Factory',
		'Buffer',
		'Emitter',
		'Error',
		'EventListener',
		'Broadcaster',
		'Document',
		'Content',
		'List',
		'Set',
		'Vector',
		'Region',
		'Source',
		'Consumer',
		'Window',
	],

	'expression': [
		`{{noun0}}.{{verb}}{{Noun}}({{var1}}, {{var2}})`,
		`{{noun0}}.{{verb}}({{local1}})`,
		`{{Noun1}}.{{verb}}{{Noun}}({{var0}}, {{local0}})`,
		`{{Noun1}}.{{verb}}{{Noun}}({{var0}}, {{var1}})`,
		`{{verb}}({{var0}}) + {{verb}}({{local0}})`,
		`{{noun0}} && {{var0}}`,
		`{{noun0}} || {{var0}}`,
	],
	'statement': [
		`{{Expression}};`,
		`let {{noun1}} = {{Expression}};`,
		`const {{noun1}} = {{Expression}};`,
		`const {{noun1}} = new {{Noun1}}({{local0}});`,
		`{{noun1}} = {{noun1}}Factory.{{verb}}{{Noun1}}({{var}});`,
		`{{noun1}}Factory = {{noun1}}FactoryFactory.{{verb}}{{Noun1}}Factory({{var}});`,
		`{{noun1}} = {{Expression}};`,
		`{{noun1}} += {{Expression}};`,
		`{{noun1}} -= {{Expression}};`,
		`{{noun1}} = {{number}};`,
		`{{noun1}} += {{number}};`,
		`{{noun1}} -= {{number}};`,
		`delete {{noun}}[{{number}}];`,
		`delete {{var0}}[{{number}}];`,
		`return {{Expression}};`,
		`return {{number}};`,
	],
	'block': [
`{{Statement}}`,
`{{Statement}}
{{Statement}}`,
`{{Statement}}
{{Statement}}
{{Statement}}`,
`{{Statement}}
{{Statement}}
return {{Expression}}`,
`if ({{Expression}}) {
{{	:Statement}}
}`,
`if ({{Expression0}}) {
{{	:Statement0}}
} else if ({{Expression1}}) {
{{	:Statement1}}
}
{{Statement}}`,
`if ({{Expression}}) {
{{	:Statement0}}
} else {
{{	:Statement1}}
}`,
`try {
{{	:Statement}}
} catch (const {{local2}}) {
{{	:Expression}};
}`,
`function {{verb}}{{Noun1}}({{local2}}) {
{{	:Statement}}
}`,
`function {{verb}}{{Noun1}}({{local2}}) {
{{	:Statement}}
{{	:Statement}}
}`,
`function {{verb}}() {
{{	:Statement}}
{{	:Statement}}
}`,
	],
};

const blocks = [
`{{Block}}`, `{{Block}}`, `{{Block}}`, `{{Block}}`,
`import {{noun0}} from './{{Noun0}}.js';`,
`export {{noun}};`,
`export default {{noun}};`,
`function {{verb}}({{local0}}, {{local1}}) {
	{{local0}}.{{verb}}({{local1}});
}`,
`function {{verb}}{{Noun0}}({{var0}}, {{local0}}) {
	return {{verb}}({{var0}}) + {{verb}}({{local0}});
}`,
`function {{verb}}({{var0}}) {
	{{var0}}.{{verb}}Default();
}`,
`function {{verb}}{{Noun0}}() {
	let new{{Noun0}} = {{noun0}}[(Math.random() * ({{noun0}}.length))|0];
	if (new{{Noun0}} === old{{Noun0}}) {
		return new{{Noun0}} + ' again';
	}
	return new{{Noun0}};
}`,
`function pad2(v) {
	v = String(v);
	return '00'.substr(v.length) + v;
}`,
`class {{Adjective}}{{Noun0}} {
	constructor({{var0}}, {{var1}}, {{var2}}) {
		this.{{noun1}} = {{Expression}};
		this.{{var3}} = {{Expression}};
		this.{{var4}} = {{number}};
	}

	{{verb}}({{var5}}) {
{{		:Block}}
	}

	{{verb}}() {
{{		:Block}}
	}

	{{verb}}() {
{{		:Block}}
	}
}`,
`class {{Adjective}}{{Noun0}} {
	constructor({{var2}}) {
		this.{{noun1}} = {{Noun1}}.{{verb}}({{var2}});
		this.{{var3}} = 0;
	}

	{{verb}}({{var5}}) {
		const {{var4}} = {{var5}}.{{verb}}(this.{{noun1}}, this.{{var3}}, 0);
		this.{{var3}} += {{var4}};
		return {{var4}};
	}

	{{verb}}() {
		return this.{{noun1}}.{{verb}}(0, this.{{var3}});
	}

	{{verb}}() {
		this.{{var3}} = 0;
	}
}`,
`function indexOf({{noun0}}, {{var1}}, {{capturedfn3}} = null) {
	if({{capturedfn3}} === null) {
		return {{noun0}}.indexOf({{var1}});
	}
	for(let {{local2}} = 0; {{local2}} < {{noun0}}.length; ++ {{local2}}) {
		if({{capturedfn3}}({{noun0}}[{{local2}}], {{var1}})) {
			return {{local2}};
		}
	}
	return -1;
}`,
`function hasIntersection({{local0}}, {{local1}}, {{capturedfn3}} = null) {
	for(let {{local2}} = 0; {{local2}} < {{local1}}.length; ++ {{local2}}) {
		if(indexOf({{local0}}, {{local1}}[{{local2}}], {{capturedfn3}}) !== -1) {
			return true;
		}
	}
	return false;
}`,
`function flatMap({{noun0}}, {{capturedfn3}}) {
	const {{var1}} = [];
	{{noun0}}.forEach(({{var2}}) => {
		{{var1}}.{{verb}}(...{{capturedfn3}}({{var2}}));
	});
	return {{var1}};
}`,
`next{{Noun}}() {
	const {{var0}} = 0x100000000;
	let {{local0}}0 = s[0];
	let {{local0}}1 = s[1];
	const {{local1}}0 = s[2];
	const {{local1}}1 = s[3];
	s[0] = {{local1}}0;
	s[1] = {{local1}}1;
	{{local0}}0 ^= ({{local0}}0 << 23) | ({{local0}}1 >>> 9);
	{{local0}}1 ^= ({{local0}}1 << 23);
	s[2] = {{local0}}0 ^ {{local1}}0 ^ ({{local0}}0 >>> 17) ^ ({{local1}}0 >>> 26);
	s[3] = (
		{{local0}}1 ^ {{local1}}1 ^
		(({{local0}}0 << 15) | ({{local0}}1 >>> 17)) ^
		(({{local1}}0 << 6) | ({{local1}}1 >>> 26))
	);
	return (((s[3] + {{local1}}1) >>> 0) % {{var0}}) / {{var0}};
}`,
`function {{verb0}}Attrs({{var1}}) {
	const attrs = {};
	const decorations = [];
	let any = false;
	{{var1}}.forEach(({{var1}}Attrs) => {
		if(!{{var1}}Attrs) {
			return;
		}
		const decoration = {{var1}}Attrs['text-decoration'];
		if(decoration && !decorations.includes(decoration)) {
			decorations.{{verb}}(decoration);
		}
		Object.{{verb}}(attrs, {{var1}}Attrs);
		any = true;
	});
	if(decorations.length > 1) {
		attrs['text-decoration'] = decorations.{{verb}}(' ');
	}
	return any ? attrs : null;
}`,
];
