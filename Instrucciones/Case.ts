import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class Case implements Instruccion {
    linea: number;
    columna: number;
    expresion: Expresion;
    instrucciones: Array<Instruccion>;

    constructor(expresion: Expresion, instrucciones: Array<Instruccion>,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let nuevoEntorno = new Entorno(ent);
        for(let i in this.instrucciones){
            let result = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
            if(result instanceof Excepcion || result instanceof Break || result instanceof Return)
            return result;
            else if(result instanceof Continue) 
            return new Excepcion(this.linea, this.columna, "\nSemantico", "Continue fuera de loop");
        }
    }
    
    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }

    getExpresion():Expresion {
        return this.expresion;
    }
    

}