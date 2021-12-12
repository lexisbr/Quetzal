const AST  = require("./AST/AST.js");
const Entorno = require("./AST/Entorno.js"); 
const Instruccion =  require("./Interfaces/Instruccion.js");

const grammar = require("./Gramatica/grammar.js")


if (typeof window !== 'undefined'){
    window.parseExternal = function(input){ 
        const respuestas = [];
        const instrucciones = grammar.parse(input);
        const ast = new AST.AST(instrucciones);
        const entornoGlobal = new Entorno.Entorno(null);
        ast.instrucciones.forEach(function (element) {
            element.ejecutar(entornoGlobal, ast);
        });
        //console.log("Entorno ",entornoGlobal.getTabla());
        console.log("Consola ",ast.getConsola());
        return ast.getConsola();
    }
}

