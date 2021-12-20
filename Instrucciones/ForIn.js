"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForIn = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class ForIn {
    constructor(instrucciones, variable, expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.variable = variable;
        this.expresion = expresion;
    }
    ejecutar(ent, arbol) {
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        let valueExpresion = this.expresion.getValorImplicito(nuevoEntorno, arbol);
        if (valueExpresion instanceof Excepcion_1.Excepcion)
            return valueExpresion;
        else if (typeof (valueExpresion) === "string") {
            let simbolo = new Simbolo_1.Simbolo(Tipo_1.Tipo.STRING, this.variable, this.linea, this.columna, null);
            ;
            for (let i = 0; i < valueExpresion.length; i++) {
                if (!nuevoEntorno.existeEnActual(this.variable)) {
                    simbolo.setValor(valueExpresion[i]);
                    ent.agregar(this.variable, simbolo);
                }
                else {
                    simbolo.setValor(valueExpresion[i]);
                    ent.reemplazar(this.variable, simbolo);
                }
                for (let j in this.instrucciones) {
                    let result = this.instrucciones[j].ejecutar(nuevoEntorno, arbol);
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    else if (result instanceof Return_1.Return)
                        return result;
                    else if (result instanceof Break_1.Break)
                        return;
                    else if (result instanceof Continue_1.Continue)
                        break;
                }
            }
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "Valor en For in debe ser String");
        }
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.ForIn = ForIn;
