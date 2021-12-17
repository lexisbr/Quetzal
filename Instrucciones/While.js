"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Return_1 = require("./Return");
class While {
    constructor(instrucciones, condicion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }
    ejecutar(ent, arbol) {
        while (true) {
            let condicion = this.condicion.getValorImplicito(ent, arbol);
            if (condicion instanceof Excepcion_1.Excepcion)
                return condicion;
            if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
                if (condicion) {
                    let nuevoEntorno = new Entorno_1.Entorno(ent);
                    nuevoEntorno.setEntorno("While");
                    arbol.tablas.push(nuevoEntorno);
                    for (let i in this.instrucciones) {
                        let instruccion = this.instrucciones[i];
                        let result = instruccion.ejecutar(nuevoEntorno, arbol);
                        if (result instanceof Excepcion_1.Excepcion)
                            return result;
                        else if (result instanceof Return_1.Return)
                            return result;
                    }
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "El tipo de dato en condicion debe ser booleano");
            }
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.While = While;
