"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Operador_1 = require("../AST/Operador");
const Tipo_1 = require("../AST/Tipo");
const Identificador_1 = require("../Expresiones/Identificador");
const Primitivo_1 = require("../Expresiones/Primitivo");
const Excepcion_1 = require("../AST/Excepcion");
const Quadrupla_1 = require("../Traductor/Quadrupla");
// print("hola mundo");
class Print {
    constructor(expresiones, linea, columna, salto) {
        this.expresiones = expresiones;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }
    traducir(controlador) {
        this.expresiones.forEach(element => {
            const tmpQ = element.traducir(controlador);
            let valor = element.getValorImplicito(controlador.actual, controlador.arbol);
            let tipoValor = element.getTipo(controlador.actual, controlador.arbol);
            if (tmpQ) {
                if (tipoValor == Tipo_1.Tipo.INT || tipoValor == Tipo_1.Tipo.DOUBLE || tipoValor == Tipo_1.Tipo.BOOL) {
                    controlador.addQuad(new Quadrupla_1.Quadrupla("PRINTF", "%f", "(double)" + tmpQ.resultado, ""));
                }
                else if (tipoValor == Tipo_1.Tipo.STRING) {
                    if (element instanceof Primitivo_1.Primitivo) {
                        const tmp = controlador.getTemp();
                        const tmp2 = controlador.getTemp();
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `H`, ``, `${tmp}`));
                        for (let i = 0; i < valor.length; i++) {
                            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[(int)H]`));
                            controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA, `H`, `1`, `H`));
                        }
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `-1`, ``, `${controlador.arbol.heap}[(int)H]`));
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `H`, `1`, `H`));
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${controlador.arbol.posiciones}`, `${tmp2}`));
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${tmp}`, ``, `${controlador.arbol.stack}[(int)${tmp2}]`));
                        controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA, "P", `${controlador.arbol.posiciones}`, "P"));
                        let existe = false;
                        controlador.quads.forEach(element => {
                            if (element.arg1 == "imprimir_cadena") {
                                existe = true;
                            }
                        });
                        if (!existe) {
                            controlador.addQuad(new Quadrupla_1.Quadrupla("CALL", "imprimir_cadena", `${controlador.temps}`, ""));
                            controlador.temps += 2;
                        }
                        else {
                            controlador.addQuad(new Quadrupla_1.Quadrupla("CALL", "imprimir_cadena", `-`, ""));
                        }
                        controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.RESTA, "P", `${controlador.arbol.posiciones}`, "P"));
                    }
                    else if (element instanceof Identificador_1.Identificador) {
                        const simbolo = controlador.actual.getSimbolo(element.identificador);
                        controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA, "P", `${simbolo.posicion}`, "P"));
                        let existe = false;
                        controlador.quads.forEach(element => {
                            if (element.arg1 == "imprimir_cadena") {
                                existe = true;
                            }
                        });
                        controlador.addQuad(new Quadrupla_1.Quadrupla("CALL", "imprimir_cadena", `${controlador.temps}`, ""));
                        if (!existe) {
                            controlador.temps += 2;
                        }
                        controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.RESTA, "P", `${simbolo.posicion}`, "P"));
                    }
                }
            }
        });
        if (this.salto) {
            controlador.addQuad(new Quadrupla_1.Quadrupla("PRINTF", '%c', "((char)10)", ""));
        }
    }
    ejecutar(ent, arbol) {
        for (let i in this.expresiones) {
            let valor = this.expresiones[i].getValorImplicito(ent, arbol);
            if (valor instanceof Excepcion_1.Excepcion) {
                return valor;
            }
            arbol.updateConsola(valor);
        }
        if (this.salto) {
            arbol.updateConsola("\n");
        }
    }
    addSalto(valor) {
        return this.salto ? valor + "\n" : valor;
    }
}
exports.Print = Print;
