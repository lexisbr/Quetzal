//import regular from './parser/regular.js';
//import regular from './parser/regular.js';

// console.log(regular);

const info = document.querySelector('#infoEditor');
let source = '';
let myCodeMirror = CodeMirror(document.querySelector("#codeEditor"), {
	lineNumbers: true,
	tabSize: 4,
	value: "\n(aa|b+)|(a|c)+\n",
	mode: 'text/x-java',
	theme: "monokai",
	specialChars: /[\(\)\|\+\*&]/,
	specialCharPlaceholder: (character) => {
		const node = document.createElement("span");
		if (character === "&") {
			node.style.color = "#C0392B";
		} else {
			node.style.color = "#0E6251";
		}
		node.style.fontWeight = "bolder";
		node.classList.add("cm-invalidchar");
		node.innerHTML = `${character}`;
		return node;
	},
});

let button = document.querySelector("button");
button.addEventListener("click", () => {
	source = myCodeMirror.getValue();
	//regular.parse(source);
	console.log(source);
});

myCodeMirror.on("cursorActivity", () => {
	const result = myCodeMirror.getCursor();
	info.textContent = `Linea: ${result.line + 1}, Columna: ${result.ch}`;
});