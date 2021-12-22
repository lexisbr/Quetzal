"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Operacion_1 = require("../Expresiones/Operacion");
const Primitivo_1 = require("../Expresiones/Primitivo");
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
                    if (this.tipo == Tipo_1.Tipo.INT || this.tipo == Tipo_1.Tipo.DOUBLE) {
                        if (this.expresion instanceof Operacion_1.Operacion) {
                            let temp = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${this.expresion.etiqueta}`, `${arbol.posiciones}`, `STACK`));
                            arbol.controlador.codigo3D.push(`STACK[${temp}] = ${this.expresion.etiqueta} ;`);
                        }
                        else if (this.expresion instanceof Primitivo_1.Primitivo) {
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor}`, `${arbol.posiciones}`, `STACK`));
                        }
                    }
                    else if (this.tipo == Tipo_1.Tipo.STRING) {
                        if (this.expresion instanceof Operacion_1.Operacion || this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            for (let i = 0; i < valor.length; i++) {
                                arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor.charCodeAt(i)}`, `H`, `heap`));
                                arbol.controlador.codigo3D.push(`heap[(int)H] = ${valor.charCodeAt(i)} ;`);
                                arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                                arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            }
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `-1`, `H`, `heap`));
                            arbol.controlador.codigo3D.push(`heap[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${temp}`, `${temp2}`, `stack`));
                            arbol.controlador.codigo3D.push(`stack[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }
                    else if (this.tipo == Tipo_1.Tipo.CHAR) {
                        if (this.expresion instanceof Operacion_1.Operacion) {
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${this.expresion.etiqueta}`, `${arbol.posiciones}`, `stack`));
                        }
                        else if (this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor.charCodeAt(0)}`, `H`, `heap`));
                            arbol.controlador.codigo3D.push(`heap[(int)H] = ${valor.charCodeAt(0)} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `-1`, `H`, `heap`));
                            arbol.controlador.codigo3D.push(`heap[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${temp}`, `${temp2}`, `stack`));
                            arbol.controlador.codigo3D.push(`stack[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }
                    simbolo.posicion = arbol.posiciones++;
                    ent.agregar(this.identificador, simbolo);
                    console.log(arbol.controlador);
                    return simbolo;
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
            if (this.identificadores.length > 0) {
                for (let i in this.identificadores) {
                    let identificador = this.identificadores[i];
                    if (!ent.existe(identificador)) {
                        let simbolo = new Simbolo_1.Simbolo(this.tipo, identificador, this.linea, this.columna, null);
                        simbolo.posicion = arbol.posiciones++;
                        ent.agregar(identificador, simbolo);
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La variable ya existe");
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
