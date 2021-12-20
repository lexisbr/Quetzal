import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Operador } from "../AST/Operador";
import { Expresion } from "../Interfaces/Expresion";
import { Excepcion } from "../AST/Excepcion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";

export class Decremento implements Instruccion {
    linea: number;
    columna: number;
    operacion: Expresion;
 

    constructor(operacion:Expresion,linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.operacion = operacion;
    }
    ejecutar(ent: Entorno, arbol: AST) {
        let op1 = this.operacion.getValorImplicito(ent, arbol);
        if(op1 instanceof Excepcion){
            return op1;
        } else{
            return op1;        
        }
    }
    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }

}