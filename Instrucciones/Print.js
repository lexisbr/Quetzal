"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
// print("hola mundo");
class Print {
    constructor(exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        const valor = this.expresion.getValorImplicito(ent, arbol);
        if (valor !== null) {
            if (typeof valor === "string") {
                console.log('>', valor.substring(1, valor.length - 1));
            }
            else {
                console.log('>', valor);
            }
        }
        else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }
}
exports.Print = Print;
