"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = void 0;
class Struct {
    constructor(identificador, atributos, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.atributos = atributos;
    }
    ejecutar(ent, arbol) {
        return;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    getIdentificador() {
        return this.identificador;
    }
}
exports.Struct = Struct;
