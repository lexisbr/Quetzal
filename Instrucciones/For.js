"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
class For {
    constructor(instrucciones, valorInicial, condicion, asignacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.condicion = condicion;
        this.asignacion = asignacion;
        this.valorInicial = valorInicial;
    }
    ejecutar(ent, arbol) {
        let value = this.valorInicial.ejecutar(ent, arbol);
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.For = For;
