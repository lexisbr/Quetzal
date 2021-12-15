import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { Return } from "./Return";

export class DoWhile implements Instruccion {
    linea: number;
    columna: number;
    instrucciones: Array<Instruccion>;
    condicion: Expresion;

    constructor(instrucciones: Array<Instruccion>, condicion: Expresion, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let condicion = this.condicion.getValorImplicito(ent, arbol);
        if (condicion instanceof Excepcion) return condicion;
        if (this.condicion.getTipo(ent, arbol) == Tipo.BOOL) {
            do {
                condicion = this.condicion.getValorImplicito(ent, arbol);
                let nuevoEntorno: Entorno = new Entorno(ent);
                nuevoEntorno.setEntorno("DoWhile");
                for (let i in this.instrucciones) {
                    let instruccion = this.instrucciones[i];
                    let result = instruccion.ejecutar(nuevoEntorno, arbol);
                    if (result instanceof Excepcion) return result;
                    else if (result instanceof Return) return result;
                }
            } while (condicion);
        } else {
            return new Excepcion(this.linea, this.columna, "\nSemantico", "El tipo de dato en condicion debe ser booleano")
        }
    }
    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }




}