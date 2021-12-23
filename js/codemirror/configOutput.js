
let source2 = '';
let myCodeMirror2 = CodeMirror(document.querySelector("#codeConsole"), {
	lineNumbers: true,
	tabSize: 4,
	value: ``,
	readOnly: true,
	mode: '',
	//theme: "darcula",
	//theme: "ayu-dark",
	theme: "ayu-mirage",
	//theme: "tomorrow-night-bright",
	//specialChars: /[\(\)\|\+\*\-\/\%\&]/,
	specialCharPlaceholder: (character) => {
		const node = document.createElement("span");
		node.style.fontWeight = "bolder";
		node.classList.add("cm-invalidchar");
		node.innerHTML = `${character}`;
		return node;
	
	},
});

function addText(input){
	let text = "";
	for(let line of input){
		text += line;
	}
	myCodeMirror2.setValue(text);
}
