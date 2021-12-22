"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decremento = void 0;
const Operador_1 = require("../AST/Operador");
const Excepcion_1 = require("../AST/Excepcion");
const Identificador_1 = require("./Identificador");
const Quadrupla_1 = require("../Traductor/Quadrupla");
class Decremento {
    constructor(operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.operacion = operacion;
    }
    ejecutar(ent, arbol) {
        let op1 = this.operacion.getValorImplicito(ent, arbol);
        if (op1 instanceof Excepcion_1.Excepcion) {
            return op1;
        }
        else {
            return op1;
        }
    }
    traducir(controlador) {
        /*
            // this.operacion.traducir(controlador);
            t1 = P + pos;
            t2 = stack[t1];

            // decremento aca
            t3 = t2 + 1

            // obtener posicion
            t4 = P + pos;
            // asignar

            stack[t4] = t3

            return t2;
        */
        if (this.operacion instanceof Identificador_1.Identificador) {
            const variable = controlador.actual.getSimbolo(this.operacion.getId());
            const tmpQ = this.operacion.traducir(controlador);
            if (tmpQ) {
                const tmp1 = controlador.getTemp();
                const tmp2 = controlador.getTemp();
                // decremento
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.RESTA.toString(), tmpQ.resultado, "1", tmp1));
                // obtener posicion
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp2));
                // asignar decremento
                controlador.addQuad(new Quadrupla_1.Quadrupla("ASSIGN", tmp1, "", `${controlador.arbol.stack}[${tmp2}]`));
                // retornar valor anterior a decremento
                return tmpQ;
            }
        }
        return;
    }
}
exports.Decremento = Decremento;
