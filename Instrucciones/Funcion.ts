import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Excepcion } from "../AST/Excepcion";
import { Expresion } from "../Interfaces/Expresion";
import { Declaracion } from "./Declaracion";

export class Funcion implements Instruccion {
    nombre: string;
    parametros: Array<Declaracion>;
    instrucciones: Array<Instruccion>;
    tipo: Tipo;
    linea: number;
    columna: number;

    constructor(nombre: string, parametros: Array<Declaracion>, instrucciones: Array<Instruccion>, tipo: Tipo, linea: number, columna: number) {
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;

    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let nuevoEntorno = new Entorno(ent);
        nuevoEntorno.setEntorno("Funcion " + this.nombre);
        console.log("Instruccion " + this.instrucciones);

        for(let i in this.instrucciones) {
            let value = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
            if (value instanceof Excepcion) {
                arbol.updateConsola(value.toString());
            }
        }

    }
}



