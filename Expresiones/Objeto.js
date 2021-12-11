"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = void 0;
const Entorno_1 = require("../AST/Entorno");
class Objeto {
    constructor(id, texto, linea, columna, listaAtributos, listaO) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.entorno = new Entorno_1.Entorno(null);
    }
}
exports.Objeto = Objeto;
