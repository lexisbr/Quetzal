//import regular from './parser/regular.js';
//import regular from './parser/regular.js';

// console.log(regular);

const info = document.querySelector('#infoEditor');
let source = '';
let myCodeMirror = CodeMirror(document.querySelector("#codeEditor"), {
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

function getText(){
	source = myCodeMirror.getValue();
	return source;
}

myCodeMirror.on("cursorActivity", () => {
	const result = myCodeMirror.getCursor();
	info.textContent = `Linea: ${result.line + 1}, Columna: ${result.ch}`;
});

let openFile = document.getElementById('openFile');

document.getElementById('uploadButton').addEventListener('click',function(e){
	if(openFile.style.visibility === 'hidden' && openFile.style.display ==='none'){
		openFile.style.visibility = 'visible';
		openFile.style.display = 'block';
	} else {
		openFile.style.visibility = 'hidden';
		openFile.style.display = 'none';
	}
});
/**
 * Cargar Archivos a la Entrada
 */
document.getElementById('openFile').addEventListener('change',function(){
	let file = new FileReader();
	file.onload =()=>{
		myCodeMirror.setValue(file.result);
	}
file.readAsText(this.files[0]);
});
/**
 * Funcion para descargar archivos de la entrada
 * @param {*} filename 
 * @param {*} textDownload
 */
function download (filename,textDownload){
	let element = document.createElement('a');
	element.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(textDownload));
	element.setAttribute('download',filename);

	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
/**
 * EventListener on DownloadButton
 */
document.getElementById('downloadButton').addEventListener("click",function(){
	let textDownload = myCodeMirror.getValue();
	let filename = 'example.txt';
	download(filename,textDownload);
},false);