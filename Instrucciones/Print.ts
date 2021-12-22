import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";

// print("hola mundo");

export class Print implements Instruccion {
    linea: number;
    columna: number;
    expresiones: Array<Expresion>;
    salto: boolean;

    constructor(expresiones: Array<Expresion>, linea: number, columna: number, salto: boolean) {
        this.expresiones = expresiones;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }

    traducir(controlador: QuadControlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent: Entorno, arbol: AST) {
        for (let i in this.expresiones) {
            let valor = this.expresiones[i].getValorImplicito(ent, arbol);
            arbol.updateConsola(valor);
        }
        if (this.salto) {
            arbol.updateConsola('\n');
        }
    }

    addSalto(valor: any) {
        return this.salto ? valor + "\n" : valor;
    }

}