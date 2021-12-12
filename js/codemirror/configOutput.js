
let source2 = '';
let myCodeMirror2 = CodeMirror(document.querySelector("#codeConsole"), {
	lineNumbers: true,
	tabSize: 4,
	value: ``,
	mode: 'text/x-java',
	//theme: "darcula",
	//theme: "ayu-dark",
	theme: "ayu-mirage",
	//theme: "tomorrow-night-bright",
	specialChars: /[\(\)\|\+\*\-\/\%\&]/,
	specialCharPlaceholder: (character) => {
		const node = document.createElement("span");
		if (character === "&" || character === "|") {
			node.style.color = "#fc5a44";
		} else if(character === "+" || character === "*" || character === "-" || character === "/" || character === "%"){
			node.style.color = "#8ac2e0";
		}
		else {
			//node.style.color = "#0E6251" #e6b450;
			node.style.color = "#f29e74";
		}
		node.style.fontWeight = "bolder";
		node.classList.add("cm-invalidchar");
		node.innerHTML = `${character}`;
		return node;
	
	},
});

function addText(input){
	let text = "";
	console.log("addtext ",input);
	for(let line of input){
		text += line;
	}
	myCodeMirror2.setValue(text);
}
