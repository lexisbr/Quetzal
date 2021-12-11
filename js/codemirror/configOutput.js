
let source2 = '';
let myCodeMirror2 = CodeMirror(document.querySelector("#codeConsole"), {
	lineNumbers: true,
	tabSize: 4,
	value: ` 	HELLO WORLD
	int a + b
	() ||	`,
	mode: '',
	readOnly: true,
	//theme: "darcula",
	//theme: "ayu-dark",
	theme: "ayu-mirage",
	//theme: "tomorrow-night-bright",
	//specialChars: /[\(\)\|\+\*\-\/\%\&]/,
	specialCharPlaceholder: (character) => {
	
		node.style.fontWeight = "bolder";
		node.classList.add("cm-invalidchar");
		node.innerHTML = `${character}`;
		return node;
	
	},
});
/*
let button = document.querySelector("button");
button.addEventListener("click", () => {
	source = myCodeMirror.getValue();
	//regular.parse(source);
	console.log(source);
});
*/

function setConsoleText(source){
	return myCodeMirror2.value = source;
	
}