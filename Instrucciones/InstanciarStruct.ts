import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";
import { Atributo } from "./Atributo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Excepcion } from "../AST/Excepcion";

export class InstanciarStruct implements Instruccion {
    linea: number;
    columna: number;
    identificador: string;
    atributos: Array<Atributo>;

    constructor(identificador: string, atributos: Array<Atributo>, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.atributos = atributos;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }
    traducir(controlador: QuadControlador) {
        throw new Error("Method not implemented.");
    }
}