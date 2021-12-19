import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";

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
        if (this.expresion == null) {
            this.tipo = Tipo.VOID;
            return this;
        }

        let value = this.expresion.getValorImplicito(ent, arbol);

        if (value instanceof Excepcion) return value;

        this.tipo = this.expresion.getTipo(ent, arbol);
        this.value = value;

        return this;
    }
    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }

    getTipo() {
        return this.tipo;
    }

    getValue() {
        return this.value;
    }



}