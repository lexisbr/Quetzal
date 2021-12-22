import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";

// print("hola mundo");

export class Print implements Instruccion {
    linea: number;
    columna: number;
    public expresion: Array<Expresion>;
    salto: boolean;

    constructor(exp: Array<Expresion>, linea: number, columna: number, salto: boolean) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }

    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent: Entorno, arbol: AST) {
        
        this.expresion.forEach(element => {
            let valor = element.getValorImplicito(ent, arbol);
            valor = this.addSalto(valor);
            arbol.updateConsola(valor);
        });
        
    }

    addSalto(valor: any) {
        return this.salto ? valor + "\n" : valor;
    }

}