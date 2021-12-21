"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class Case {
    constructor(expresion, instrucciones, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, arbol) {
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        for (let i in this.instrucciones) {
            let result = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
            if (result instanceof Excepcion_1.Excepcion || result instanceof Break_1.Break || result instanceof Return_1.Return)
                return result;
            else if (result instanceof Continue_1.Continue)
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "Continue fuera de loop");
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    getExpresion() {
        return this.expresion;
    }
}
exports.Case = Case;
