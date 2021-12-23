"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclaracionArray = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Llamada_1 = require("./Llamada");
class DeclaracionArray {
    constructor(tipo, identificador, identificadores, expresiones, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.identificador = identificador;
        this.identificadores = identificadores;
        this.expresiones = expresiones;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let valor;
        let tipoValor;
        if (this.expresiones != null) {
            for (let expresion of this.expresiones) {
                if (expresion instanceof Llamada_1.Llamada) { //INT A = suma(a,b);
                    valor = expresion.ejecutar(ent, arbol);
                    if (valor instanceof Excepcion_1.Excepcion)
                        return valor;
                    tipoValor = expresion.getTipo(ent, arbol);
                }
                else {
                    valor = expresion.getValorImplicito(ent, arbol);
                    if (valor instanceof Excepcion_1.Excepcion)
                        return valor;
                    tipoValor = expresion.getTipo(ent, arbol);
                } //ARREGLAR PARA UN STRING Y CHAR
                if (tipoValor == this.tipo || (tipoValor == Tipo_1.Tipo.NULL && this.tipo == Tipo_1.Tipo.STRING) || this.isDouble(tipoValor) || (tipoValor == Tipo_1.Tipo.CHAR && this.tipo == Tipo_1.Tipo.STRING)) {
                    if (!ent.existeEnActual(this.identificador)) {
                        let simbolo = new Simbolo_1.Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                        ent.agregar(this.identificador, simbolo);
                        return simbolo;
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable ya existe", ent.getEntorno());
                    }
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "El tipo asignado a la variable no es correcto", ent.getEntorno());
                }
            }
        }
        else {
            if (this.identificadores.length > 0) {
                for (let i in this.identificadores) {
                    let identificador = this.identificadores[i];
                    console.log(identificador);
                    if (!ent.existe(identificador)) {
                        let simbolo = new Simbolo_1.Simbolo(this.tipo, identificador, this.linea, this.columna, null);
                        ent.agregar(identificador, simbolo);
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable ya existe", ent.getEntorno());
                    }
                }
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
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isDouble(tipoValor) {
        return tipoValor == Tipo_1.Tipo.INT && this.tipo == Tipo_1.Tipo.DOUBLE;
    }
}
exports.DeclaracionArray = DeclaracionArray;
