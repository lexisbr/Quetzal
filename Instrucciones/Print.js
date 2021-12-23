"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
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
            if (tmpQ) {
                controlador.addQuad(new Quadrupla_1.Quadrupla("PRINTF", tmpQ.resultado, "", ""));
            }
        });
        if (this.salto) {
            controlador.addQuad(new Quadrupla_1.Quadrupla("PRINTF", "\n", "", ""));
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
