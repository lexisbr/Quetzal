import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

// print("hola mundo");

export class Print implements Instruccion {
    linea: number;
    columna: number;
    public expresion: Expresion;
    salto: boolean;

    constructor(exp: Expresion, linea: number, columna: number, salto: boolean) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        valor = this.addSalto(valor);
        arbol.updateConsola(valor);
    }

    addSalto(valor: any) {
        return this.salto ? valor + "\n" : valor;
    }

}