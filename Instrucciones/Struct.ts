import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";
import { Atributo } from "./Atributo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Excepcion } from "../AST/Excepcion";

export class Struct implements Instruccion {
    linea: number;
    columna: number;
    identificador: string;
    atributos: Array<Atributo>;

    constructor(identificador: string, atributos: Array<Atributo>, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.atributos = atributos;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        return;
    }

    traducir(controlador: QuadControlador): Quadrupla | undefined {
        throw new Error("Method not implemented.");
    }

    getIdentificador():string {
        return this.identificador;
    }

}