"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
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
        this.expresion.forEach(element => {
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
<<<<<<< HEAD
        this.expresion.forEach(element => {
            let valor = element.getValorImplicito(ent, arbol);
            //valor = this.addSalto(valor);
            arbol.updateConsola(valor);
        });
        if (this.salto) {
            arbol.updateConsola("\n");
=======
        for (let i in this.expresiones) {
            let valor = this.expresiones[i].getValorImplicito(ent, arbol);
            arbol.updateConsola(valor);
        }
        if (this.salto) {
            arbol.updateConsola('\n');
>>>>>>> Lexis
        }
    }
    addSalto(valor) {
        return this.salto ? valor + "\n" : valor;
    }
}
exports.Print = Print;
