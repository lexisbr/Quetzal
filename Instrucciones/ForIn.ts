import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Identificador } from "../Expresiones/Identificador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Declaracion } from "./Declaracion";
import { Return } from "./Return";

export class ForIn implements Instruccion {
    linea: number;
    columna: number;
    instrucciones: Array<Instruccion>;
    variable: string;
    expresion: Expresion;

    constructor(instrucciones: Array<Instruccion>, variable: string, expresion: Expresion, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.variable = variable;
        this.expresion = expresion;
    }

    ejecutar(ent: Entorno, arbol: AST) {

        let nuevoEntorno = new Entorno(ent);
        let valueExpresion = this.expresion.getValorImplicito(nuevoEntorno, arbol);
        if (valueExpresion instanceof Excepcion) return valueExpresion;
        else if (typeof (valueExpresion) === "string") {
            let simbolo: Simbolo = new Simbolo(Tipo.STRING, this.variable, this.linea, this.columna, null);;
            for (let i = 0; i < valueExpresion.length; i++) {
                if (!nuevoEntorno.existeEnActual(this.variable)) {
                    simbolo.setValor(valueExpresion[i]);
                    ent.agregar(this.variable, simbolo);
                } else {
                    simbolo.setValor(valueExpresion[i]);
                    ent.reemplazar(this.variable, simbolo);
                }

                for (let j in this.instrucciones) {
                    let result = this.instrucciones[j].ejecutar(nuevoEntorno, arbol);
                    if (result instanceof Excepcion) return result;
                    else if (result instanceof Return) return result;
                    else if (result instanceof Break) return;
                    else if (result instanceof Continue) break;
                }
            }
        } else {
            return new Excepcion(this.linea, this.columna, "Error Semantico", "Valor en For in debe ser String")
        }

    }
    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }
}