const rand = {
	'local': [
		'a',
		'e',
		'i', 'i', 'i', 'i',
		'j',
		'p',
		't',
		'x', 'x',
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
};

const blocks = [
`function {{verb}}({{local0}}, {{local1}}) {
	{{local0}}.{{verb}}({{local1}});
}`,
`function {{verb}}{{Noun}}({{var0}}, {{local1}}) {
	return {{verb}}({{var0}}) + {{verb}}({{local1}});
}`,
`function {{verb}}({{var0}}) {
	{{var0}}.{{verb}}Default();
}`,
`let {{noun}} = {{Noun}}.{{verb}}{{Noun}}({{var}}, {{local}});`,
`const {{noun}} = {{Noun}}.{{verb}}{{Noun}}({{var}}, {{var}});`,
`import {{noun0}} from './{{Noun0}}.js';`,
`export {{noun}};`,
`export default {{noun}};`,
`delete {{noun}};`,
`{{noun}}.{{verb}}{{Noun}}({{var}}, {{var}});`,
`{{noun0}} = {{noun0}}Factory.{{verb}}{{Noun0}}({{var}});`,
`{{noun0}}Factory = {{noun0}}FactoryFactory.{{verb}}{{Noun0}}Factory({{var}});`,
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
	let x0 = s[0];
	let x1 = s[1];
	const y0 = s[2];
	const y1 = s[3];
	s[0] = y0;
	s[1] = y1;
	x0 ^= (x0 << 23) | (x1 >>> 9);
	x1 ^= (x1 << 23);
	s[2] = x0 ^ y0 ^ (x0 >>> 17) ^ (y0 >>> 26);
	s[3] = (
		x1 ^ y1 ^
		((x0 << 15) | (x1 >>> 17)) ^
		((y0 << 6) | (y1 >>> 26))
	);
	return (((s[3] + y1) >>> 0) % {{var0}}) / {{var0}};
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
