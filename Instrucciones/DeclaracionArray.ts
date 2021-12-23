import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Identificador } from "../Expresiones/Identificador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Llamada } from "./Llamada";

export class DeclaracionArray implements Instruccion {
    linea: number;
    columna: number;
    expresiones: Array<Expresion>;
    tipo: Tipo;
    identificador: string;
    identificadores: Array<string>;

    constructor(tipo: Tipo,identificador:string, identificadores: Array<string>, expresiones: Array<Expresion>, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.identificador = identificador;
        this.identificadores = identificadores;
        this.expresiones = expresiones;
    }

    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let valor;
        let tipoValor;
        if (this.expresiones != null) {   
            for(let expresion of this.expresiones) {
                if (expresion instanceof Llamada) {//INT A = suma(a,b);
                    valor = expresion.ejecutar(ent, arbol);
                    if (valor instanceof Excepcion) return valor;
                    tipoValor = expresion.getTipo(ent, arbol);
                } else {
                    valor = expresion.getValorImplicito(ent, arbol);
                    if (valor instanceof Excepcion) return valor;
                    tipoValor = expresion.getTipo(ent, arbol);
                }   //ARREGLAR PARA UN STRING Y CHAR
                if (tipoValor == this.tipo || (tipoValor == Tipo.NULL && this.tipo == Tipo.STRING) || this.isDouble(tipoValor) || (tipoValor == Tipo.CHAR && this.tipo == Tipo.STRING)) {
                    if (!ent.existeEnActual(this.identificador)) {
                        let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                        ent.agregar(this.identificador, simbolo);
                        return simbolo;
                    } else {
                        return new Excepcion(this.linea, this.columna, "Error Semantico", "La variable ya existe",ent.getEntorno());
                    }
                } else {
                    return new Excepcion(this.linea, this.columna, "Error Semantico", "El tipo asignado a la variable no es correcto",ent.getEntorno());
                }
            }
        } else {
            if (this.identificadores.length > 0) {
                for (let i in this.identificadores) {
                    let identificador = this.identificadores[i];
                    console.log(identificador);
                    if (!ent.existe(identificador)) {
                        let simbolo: Simbolo = new Simbolo(this.tipo, identificador, this.linea, this.columna, null);
                        ent.agregar(identificador, simbolo);
                    } else {
                        return new Excepcion(this.linea, this.columna, "Error Semantico", "La variable ya existe",ent.getEntorno());
                    }
                }
            }
        }
    }

    getTipo(): string {
        if (this.tipo === Tipo.BOOL) {
            return 'boolean';
        }
        else if (this.tipo === Tipo.STRING) {
            return 'string';
        }
        else if (this.tipo === Tipo.INT) {
            return 'int';
        }
        else if (this.tipo === Tipo.DOUBLE) {
            return 'double';
        }
        else if (this.tipo === Tipo.CHAR) {
            return 'char';
        }

        return '';
    }

    getTipoEnum(): number {
        return this.tipo;
    }


    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

    isDouble(tipoValor: any) {
        return tipoValor == Tipo.INT && this.tipo == Tipo.DOUBLE
    }
}

