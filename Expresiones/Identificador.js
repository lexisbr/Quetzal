"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Quadrupla_1 = require("../Traductor/Quadrupla");
const Operador_1 = require("../AST/Operador");
class Identificador {
    constructor(identificador, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = null;
        this.identificador = identificador;
    }
    getTipo(ent, arbol) {
        if (ent.existe(this.identificador)) {
            let simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getTipo(ent, arbol);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable no existe", ent.getEntorno());
        }
    }
    getId() {
        return this.identificador;
    }
    getValorImplicito(ent, arbol) {
        if (ent.existe(this.identificador)) {
            let simbolo = ent.getSimbolo(this.identificador);
            this.tipo = simbolo.getTipo(ent, arbol);
            return simbolo.getValorImplicito(ent, arbol);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable no existe", ent.getEntorno());
        }
    }
    traducir(controlador) {
        const variable = controlador.actual.getSimbolo(this.identificador);
        const tmp = controlador.getTemp();
        const tmp2 = controlador.getTemp();
        controlador.addQuad(new Quadrupla_1.Quadrupla(`${Operador_1.Operador.SUMA}`, "P", variable.posicion.toString(), tmp));
        const quad = new Quadrupla_1.Quadrupla("ASSIG", `${controlador.arbol.stack}[${tmp}]`, "", tmp2);
        controlador.addQuad(quad);
        return quad;
    }
}
exports.Identificador = Identificador;
