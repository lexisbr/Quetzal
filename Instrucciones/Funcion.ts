import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Instruccion } from "../Interfaces/Instruccion";

export class Funcion implements Instruccion {
    nombre: string;
    parametros: Array<string>;
    instrucciones: Array<Instruccion>;
    tipo: Tipo;
    linea: number;
    columna: number;

    constructor(nombre: string, parametros: Array<string>, instrucciones: Array<Instruccion>, tipo: Tipo, linea: number, columna: number) {
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;

    }

    ejecutar(ent: Entorno, arbol: AST) {
        let nuevoEntorno = new Entorno(ent);
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }



}