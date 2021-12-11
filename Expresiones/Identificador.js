"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
class Identificador {
    constructor(expresion, tipo, identificador, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = tipo;
        this.identificador = identificador;
    }
    getTipo(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    getValorImplicito(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.Identificador = Identificador;
