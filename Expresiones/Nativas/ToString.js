"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToString = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class ToString {
    constructor(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
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
        else if (Array.isArray(valor)) {
            return Tipo_1.Tipo.ARRAY;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        let tipoValor = this.expresion.getTipo(ent, arbol);
        console.log(valor);
        //TOINT
        if (tipoValor != Tipo_1.Tipo.NULL && tipoValor != Tipo_1.Tipo.VOID) {
            return valor.toString();
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La Funcion toString No Puede Convertir un tipo de Dato Null o Vacio a una Cadena");
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.ToString = ToString;
