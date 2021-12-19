"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Llamada_1 = require("./Llamada");
class Declaracion {
    constructor(identificador, expresion, tipo, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.tipo = tipo;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let valor;
        let tipoValor;
        if (this.expresion != null) { //INT A = suma(a,b);
            if (this.expresion instanceof Llamada_1.Llamada) {
                valor = this.expresion.ejecutar(ent, arbol);
                if (valor instanceof Excepcion_1.Excepcion)
                    return valor;
                tipoValor = this.expresion.getTipo(arbol);
            }
            else {
                valor = this.expresion.getValorImplicito(ent, arbol);
                if (valor instanceof Excepcion_1.Excepcion)
                    return valor;
                tipoValor = this.expresion.getTipo(ent, arbol);
            } //ARREGLAR PARA UN STRING Y CHAR
            if (tipoValor == this.tipo || (tipoValor == Tipo_1.Tipo.NULL && this.tipo == Tipo_1.Tipo.STRING) || this.isDouble(tipoValor) || (tipoValor == Tipo_1.Tipo.CHAR && this.tipo == Tipo_1.Tipo.STRING)) {
                if (!ent.existeEnActual(this.identificador)) {
                    let simbolo = new Simbolo_1.Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                    ent.agregar(this.identificador, simbolo);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La variable ya existe");
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "El tipo asignado a la variable no es correcto");
            }
        }
        else {
            if (!ent.existe(this.identificador)) {
                let simbolo = new Simbolo_1.Simbolo(this.tipo, this.identificador, this.linea, this.columna, null);
                ent.agregar(this.identificador, simbolo);
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La variable ya existe");
            }
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
    getTipoEnum() {
        return this.tipo;
    }
    getIdentificador() {
        return this.identificador;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isDouble(tipoValor) {
        return tipoValor == Tipo_1.Tipo.INT && this.tipo == Tipo_1.Tipo.DOUBLE;
    }
}
exports.Declaracion = Declaracion;
