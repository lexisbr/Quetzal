"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanciarStruct = void 0;
class InstanciarStruct {
    constructor(identificador, atributos, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.atributos = atributos;
    }
    ejecutar(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.InstanciarStruct = InstanciarStruct;
