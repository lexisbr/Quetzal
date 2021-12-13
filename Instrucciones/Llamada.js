"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
class Llamada {
    constructor(nombre, parametros, linea, columna) {
        this.nombre = nombre;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, arbol) {
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.Llamada = Llamada;
