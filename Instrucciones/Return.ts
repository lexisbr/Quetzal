import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class Return implements Instruccion {
    linea: number;
    columna: number;
    expresion: Expresion;
    tipo: any;
    value: any;

    constructor(expresion: Expresion, linea: number, columna: number,) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = null;
        this.value = null;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        console.log("Expresion",this.expresion);
        let value = this.expresion.getValorImplicito(ent,arbol);
        
        if(value instanceof Excepcion) return value;

        this.tipo = this.expresion.getTipo(ent,arbol);
        this.value = value;

        return this;
    }
    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    getTipo(){
        return this.tipo;
    }

    getValue(){
        return this.value;
    }


    
}