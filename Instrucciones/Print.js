"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
// print("hola mundo");
class Print {
    constructor(exp, linea, columna, salto) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        if (typeof valor === "string" && (valor.charAt(0) == '"' || valor.charAt(0) == "'")) {
            valor = valor.substring(1, valor.length - 1);
        }
        valor = this.addSalto(valor);
        arbol.updateConsola(valor);
    }
    addSalto(valor) {
        return this.salto ? valor + "\n" : valor;
    }
}
exports.Print = Print;
