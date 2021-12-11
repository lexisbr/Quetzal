import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

// print("hola mundo");

export class Print implements Instruccion {
    linea: number;
    columna: number;
    public expresion: Expresion;

    constructor(exp: Expresion, linea: number, columna: number) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        const valor = this.expresion.getValorImplicito(ent, arbol);
        if (valor !== null) {
            if (typeof valor === "string") {
                console.log('>', valor.substring(1, valor.length - 1));
            } else {
                console.log('>', valor);
            }
        } else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }

}