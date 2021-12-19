"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Tipo_1 = require("../AST/Tipo");
const Quadrupla_1 = require("../Traductor/Quadrupla");
class Primitivo {
    constructor(valor, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    traducir(controlador) {
        return new Quadrupla_1.Quadrupla("op", "arg1", "arg2", `${this.valor}`); //AL SER UN VALOR PRIMITIVO, NO NECESITAMOS GUARDAR TEMP, PORQUE SE RETORNA EL VALOR 
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (valor.length == 1) {
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
        this.valor = this.removeQuotes(this.valor, ent, arbol);
        return this.valor;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
    removeQuotes(valor, ent, arbol) {
        if (typeof (valor) === 'string' && (valor.charAt(0) == '"' || valor.charAt(0) == "'")) {
            valor = valor.substring(1, valor.length - 1);
        }
        return valor;
    }
}
exports.Primitivo = Primitivo;
