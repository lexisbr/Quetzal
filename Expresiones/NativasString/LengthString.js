"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LengthString = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class LengthString {
    constructor(identificador, linea, columna) {
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        if (ent.existeEnActual(this.identificador)) {
            let simbolo = ent.getSimbolo(this.identificador);
            let typeSimbolo = simbolo.getTipo(ent, arbol);
            let valueSimbolo = simbolo.getValorImplicito(ent, arbol);
            if (typeSimbolo == Tipo_1.Tipo.STRING) {
                if (valueSimbolo != Tipo_1.Tipo.NULL) {
                    return valueSimbolo.length;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No puede obtener el tamaño de una cadena con un valor Null");
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Funcion length()");
            }
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable no esta definida");
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.LengthString = LengthString;
