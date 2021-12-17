import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class Continue implements Instruccion {
    linea: number;
    columna: number;


    constructor(linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
    }
    

    ejecutar(ent: Entorno, arbol: AST) {
        

        return this;
    }
    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }



    
}