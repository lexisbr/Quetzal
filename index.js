const AST = require("./AST/AST.js");
const Entorno = require("./AST/Entorno.js");
const Instruccion = require("./Interfaces/Instruccion.js");
const Excepcion = require("./AST/Excepcion.js");
const Funcion = require("./Instrucciones/Funcion.js");

const grammar = require("./Gramatica/grammar.js")


if (typeof window !== 'undefined') {
    window.parseExternal = function (input) {
        const instrucciones = grammar.parse(input);
        const ast = new AST.AST(instrucciones);
        const entornoGlobal = new Entorno.Entorno(null);
        ast.instrucciones.forEach(function (element) {
            let value;
            if (element instanceof Funcion.Funcion) {
                ast.addFuncion(element);
            } else {
                console.log(element);
                value = element.ejecutar(entornoGlobal, ast);
            }
            if (value instanceof Excepcion.Excepcion) {
                ast.updateConsola(value);
            }
        });
        //console.log("Entorno ",entornoGlobal.getTabla());
        console.log(ast);
        return ast.getConsola();
    }
}

