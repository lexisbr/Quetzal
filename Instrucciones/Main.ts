import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { Return } from "./Return";

export class Main implements Instruccion {
    linea: number;
    columna: number;
    instrucciones: Array<Instruccion>

    constructor(instrucciones: Array<Instruccion>, linea: number, columna: number){
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let nuevoEntorno = new Entorno(ent);
        nuevoEntorno.setEntorno("Main");
        for(let i in this.instrucciones){
            let value = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
            if(value instanceof Excepcion){
                arbol.addExcepcion(value);
                arbol.updateConsola(value.toString());
            } else if(value instanceof Return){
                if(value.getTipo() == Tipo.VOID) return this;
                else return new Excepcion(this.linea,this.columna,"\nSemantico","Main no puede retornar un valor");
            } 
        }
    
    }
    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }


}