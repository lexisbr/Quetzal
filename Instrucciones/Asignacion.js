"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_js_1 = require("../AST/Tipo.js");
const Quadrupla_1 = require("../Traductor/Quadrupla");
const Operacion_1 = require("../Expresiones/Operacion");
const Primitivo_1 = require("../Expresiones/Primitivo");
const Operador_1 = require("../AST/Operador");
class Asignacion {
    constructor(identificador, exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
    }
    traducir(controlador) {
        const variable = controlador.actual.getSimbolo(this.identificador);
        let simboloValor = variable.getTipo(controlador.actual, controlador.arbol);
        let valor = this.expresion.getValorImplicito(controlador.actual, controlador.arbol);
        if (simboloValor == Tipo_js_1.Tipo.STRING) {
            const tmp = controlador.getTemp();
            const tmp2 = controlador.getTemp();
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `H`, ``, `${tmp}`));
            for (let i = 0; i < valor.length; i++) {
                controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[H]`));
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA.toString(), `1`, `H`, `H`));
            }
            controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `-1`, `H`, `${controlador.arbol.heap}`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${variable.posicion.toString()}`, `${tmp2}`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${tmp}`, ``, `${controlador.arbol.stack}[${tmp2}]`));
            console.log(controlador);
        }
        else if (simboloValor == Tipo_js_1.Tipo.INT || simboloValor == Tipo_js_1.Tipo.DOUBLE) {
            const tmp = controlador.getTemp();
            controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp));
            const quad_expr = this.expresion.traducir(controlador);
            const res = (quad_expr) ? quad_expr.resultado : "";
            controlador.addQuad(new Quadrupla_1.Quadrupla("ASSIGN", res, "", controlador.arbol.stack + "[" + tmp + "]"));
        }
        return;
    }
    ejecutar(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (!(valor instanceof Excepcion_1.Excepcion)) {
            if (ent.existe(this.identificador)) {
                let simbolo = ent.getSimbolo(this.identificador);
                let simboloValor = simbolo.getTipo(ent, arbol);
                if (simboloValor == tipoValor || (tipoValor == Tipo_js_1.Tipo.NULL && simboloValor == Tipo_js_1.Tipo.STRING) || (tipoValor == Tipo_js_1.Tipo.INT && simboloValor == Tipo_js_1.Tipo.DOUBLE) || (tipoValor == Tipo_js_1.Tipo.CHAR && simboloValor == Tipo_js_1.Tipo.STRING)) {
                    if (this.isDouble(tipoValor, simboloValor)) {
                        valor = valor.toFixed(2);
                    }
                    simbolo.setValor(valor);
                    if (tipoValor == Tipo_js_1.Tipo.INT || tipoValor == Tipo_js_1.Tipo.DOUBLE) {
                        console.log("entra------");
                        if (this.expresion instanceof Operacion_1.Operacion || this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = P + ${simbolo.posicion} ;`);
                            let etiqueta = (this.expresion instanceof Operacion_1.Operacion) ? this.expresion.etiqueta : valor;
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${etiqueta}`, `${temp}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[${temp}] = ${etiqueta} ;`);
                        }
                    }
                    else if (tipoValor == Tipo_js_1.Tipo.STRING) {
                        if (this.expresion instanceof Operacion_1.Operacion || this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            for (let i = 0; i < valor.length; i++) {
                                arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor.charCodeAt(i)}`, `H`, `${arbol.heap}`));
                                arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(i)} ;`);
                                arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                                arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            }
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${simbolo.posicion} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }
                    else if (tipoValor == Tipo_js_1.Tipo.CHAR) {
                        if (this.expresion instanceof Operacion_1.Operacion) {
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${this.expresion.etiqueta}`, `${simbolo.posicion}`, `${arbol.stack}`));
                        }
                        else if (this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor.charCodeAt(0)}`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(0)} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${simbolo.posicion} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }
                    ent.reemplazar(this.identificador, simbolo);
                    return simbolo;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Los tipos no coinciden");
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La variable no esta definida");
            }
        }
        else {
            return valor;
        }
    }
    isDouble(tipoValor, simboloValor) {
        return tipoValor == Tipo_js_1.Tipo.INT && simboloValor == Tipo_js_1.Tipo.DOUBLE;
    }
}
exports.Asignacion = Asignacion;
