"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
class Atributo {
    constructor(identificador, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.valor = null;
        this.tipo = tipo;
    }
    getTipo(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    getValorImplicito(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.Atributo = Atributo;
