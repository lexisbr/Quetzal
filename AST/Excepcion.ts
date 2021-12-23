import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { AST } from "./AST";
import { Entorno } from "./Entorno";

export class Excepcion implements Instruccion {
    linea: number;
    columna: number;
    tipo: string;
    descripcion: string;

    constructor(linea: number, columna: number, tipo: string, descripcion: string) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
    ejecutar(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }
    traducir(controlador: QuadControlador) {
        throw new Error("Method not implemented.");
    }

    toString(): string {
        return `${this.tipo} - ${this.descripcion} [${this.linea},${this.columna}]\n`
    }

}