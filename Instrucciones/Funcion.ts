import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Excepcion } from "../AST/Excepcion";
import { Expresion } from "../Interfaces/Expresion";
import { Declaracion } from "./Declaracion";
import { Return } from "./Return";
import { QuadControlador } from "../Traductor/QuadControlador";

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

    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }
    
    ejecutar(ent: Entorno, arbol: AST) {

        ent.setEntorno("Funcion " + this.nombre);
        
        for (let i in this.instrucciones) {
            let value = this.instrucciones[i].ejecutar(ent, arbol);
            if (value instanceof Excepcion) {
                return value;
            } else if (value instanceof Return) {
                if (this.tipo == value.getTipo()) {
                    if(this.tipo != Tipo.VOID) return value.getValue();
                    else return this;
                }
                else return new Excepcion(this.linea, this.columna, "Error Semantico", "El valor de retorno no coincide con el tipo de la funcion.",ent.getEntorno())
            }
        }
        
        if(this.tipo != Tipo.VOID){
            return new Excepcion(this.linea, this.columna, "Error Semantico", "La funcion debe retornar un valor",ent.getEntorno())
        }
    }

    getNombre(): string {
        return this.nombre;
    }

    getParametros(): Array<Declaracion> {
        return this.parametros;
    }

    getTipo(): Tipo {
        return this.tipo;
    }
}



