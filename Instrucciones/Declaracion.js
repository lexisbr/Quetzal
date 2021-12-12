"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class Declaracion {
    constructor(identificador, exp, tipo, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.tipo = tipo;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        const valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (valor !== null) {
            if (tipoValor == this.tipo) {
                if (!ent.existe(this.identificador)) {
                    let simbolo = new Simbolo_1.Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                    ent.agregar(this.identificador, simbolo);
                }
                else {
                    console.log("Error Semantico: la variable ya existe ");
                }
            }
            else {
                console.log("Error Semantico: los tipos no coinciden");
            }
        }
        else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }
    getTipo() {
        if (this.tipo === Tipo_1.Tipo.BOOL) {
            return 'boolean';
        }
        else if (this.tipo === Tipo_1.Tipo.STRING) {
            return 'string';
        }
        else if (this.tipo === Tipo_1.Tipo.INT) {
            return 'int';
        }
        else if (this.tipo === Tipo_1.Tipo.DOUBLE) {
            return 'double';
        }
        else if (this.tipo === Tipo_1.Tipo.CHAR) {
            return 'char';
        }
        return '';
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
}
exports.Declaracion = Declaracion;
