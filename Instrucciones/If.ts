import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { Return } from "./Return";

export class If implements Instruccion {
    linea: number;
    columna: number;
    condicion: Expresion;
    instruccionesIf: Array<Instruccion>;
    instruccionesElse: Array<Instruccion>;
    elseIf: any;


    constructor(condicion: Expresion, instruccionesIf: Array<Instruccion>, instruccionesElse: Array<Instruccion>, elseIf: any, linea: number, columna: number) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.instruccionesElse = instruccionesElse;
        this.elseIf = elseIf;
        this.linea = linea;
        this.columna = columna;
    }


    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let condicion = this.condicion.getValorImplicito(ent, arbol);

        if (condicion instanceof Excepcion) return condicion;

        if (this.condicion.getTipo(ent, arbol) == Tipo.BOOL) {
            if (condicion) {  //SI EL VALOR DE LA CONDICION SE CUMPLE
                let nuevoEntorno = new Entorno(ent);
                nuevoEntorno.setEntorno("If");
                for (let i in this.instruccionesIf) {
                    let instruccion = this.instruccionesIf[i];
                    let result = instruccion.ejecutar(nuevoEntorno, arbol);
                    console.log(result);

                    if (result instanceof Excepcion) return result;
                    else if (result instanceof Return) return result;
                }

            } else {
                if (this.instruccionesElse != null) {
                    let nuevoEntorno = new Entorno(ent);
                    nuevoEntorno.setEntorno("Else");
                    for (let i in this.instruccionesElse) {
                        let instruccion = this.instruccionesElse[i];
                        let result = instruccion.ejecutar(nuevoEntorno, arbol);
                        console.log("Else", result);
                        if (result instanceof Excepcion) return result;
                        else if (result instanceof Return) return result;
                    }
                } else if (this.elseIf != null) {
                    let result = this.elseIf.ejecutar(ent, arbol);
                    if (result instanceof Excepcion) return result;
                    else if (result instanceof Return) return result;
                }
            }
        } else {
            return new Excepcion(this.linea, this.columna, "\nSemantico", "La condicion en If debe ser booleana");
        }

    }
    getTipo(ent: Entorno, arbol: AST): Tipo {
        let type_Condicional = this.condicion.getTipo(ent, arbol);
        if (type_Condicional == Tipo.BOOL) {
            return type_Condicional;
        } else {
            return Tipo.VOID;
        }
    }


}