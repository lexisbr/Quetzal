"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("./AST/AST.js");
const Entorno_1 = require("./AST/Entorno.js");
const gramatica = require('./Gramatica/grammar.js');
function ejecutarCodigo(entrada) {
    //traigo todas las raices
    const instrucciones = gramatica.parse(entrada);
    const ast = new AST_1.AST(instrucciones);
    const entornoGlobal = new Entorno_1.Entorno(null);
    //recorro todas las raices  RECURSIVA
    instrucciones.forEach((element) => {
        element.ejecutar(entornoGlobal, ast);
    });
}
ejecutarCodigo(`
    print(1);
    print(true);
    print("hola mundo");
`);
