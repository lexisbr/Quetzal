import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Return } from "./Return";

export class For implements Instruccion {
    linea: number;
    columna: number;
    instrucciones: Array<Instruccion>;
    valorInicial: any;
    condicion: Expresion;
    asignacion: any;

    constructor(instrucciones: Array<Instruccion>, valorInicial: any, condicion:Expresion, asignacion: any, linea: number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.condicion = condicion;
        this.asignacion = asignacion;
        this.valorInicial = valorInicial;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let value = this.valorInicial.ejecutar(ent, arbol);
    }
    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }


}