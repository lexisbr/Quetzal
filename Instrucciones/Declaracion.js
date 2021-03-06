"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Operador_1 = require("../AST/Operador");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Quadrupla_1 = require("../Traductor/Quadrupla");
const Llamada_1 = require("./Llamada");
class Declaracion {
    constructor(identificador, expresion, tipo, identificadores, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.tipo = tipo;
        this.identificadores = identificadores;
    }
    traducir(controlador) {
        if (this.expresion == null) {
            return;
        }
        const variable = controlador.actual.getSimbolo(this.identificador);
        let simboloValor = variable.getTipo(controlador.actual, controlador.arbol);
        let valor = this.expresion.getValorImplicito(controlador.actual, controlador.arbol);
        if (simboloValor == Tipo_1.Tipo.STRING) {
            const tmp = controlador.getTemp();
            const tmp2 = controlador.getTemp();
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `H`, ``, `${tmp}`));
            for (let i = 0; i < valor.length; i++) {
                controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[(int)H]`));
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA, `H`, `1`, `H`));
            }
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `-1`, ``, `${controlador.arbol.heap}[(int)H]`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `H`, `1`, `H`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${variable.posicion.toString()}`, `${tmp2}`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${tmp}`, ``, `${controlador.arbol.stack}[(int)${tmp2}]`));
            console.log(controlador);
        }
        else if (simboloValor == Tipo_1.Tipo.INT || simboloValor == Tipo_1.Tipo.DOUBLE || simboloValor == Tipo_1.Tipo.BOOL) {
            const tmp = controlador.getTemp();
            controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp));
            const quad_expr = this.expresion.traducir(controlador);
            const res = (quad_expr) ? quad_expr.resultado : "";
            controlador.addQuad(new Quadrupla_1.Quadrupla("ASSIGN", res, "", controlador.arbol.stack + "[(int)" + tmp + "]"));
        }
        return;
    }
    ejecutar(ent, arbol) {
        let valor;
        let tipoValor;
        if (this.expresion != null) { //INT A = suma(a,b);
            if (this.expresion instanceof Llamada_1.Llamada) {
                valor = this.expresion.ejecutar(ent, arbol);
                if (valor instanceof Excepcion_1.Excepcion)
                    return valor;
                tipoValor = this.expresion.getTipo(ent, arbol);
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
                    simbolo.posicion = arbol.posiciones++;
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
        else {
            if (this.identificadores.length > 0) {
                for (let i in this.identificadores) {
                    let identificador = this.identificadores[i];
                    if (!ent.existe(identificador)) {
                        let simbolo = new Simbolo_1.Simbolo(this.tipo, identificador, this.linea, this.columna, null);
                        simbolo.posicion = arbol.posiciones++;
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
