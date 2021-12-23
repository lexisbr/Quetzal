import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

import { QuadControlador } from "../Traductor/QuadControlador";

import { Break } from "./Break";
import { Continue } from "./Continue";

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


    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent: Entorno, arbol: AST) {
        let condicion = this.condicion.getValorImplicito(ent, arbol);
        let nuevoEntorno = new Entorno(ent);
        nuevoEntorno.setEntorno("If");
        if (condicion instanceof Excepcion) return condicion;
        if (this.condicion.getTipo(ent, arbol) == Tipo.BOOL) {
            if (condicion) {  //SI EL VALOR DE LA CONDICION SE CUMPLE
                arbol.tablas.push(nuevoEntorno);    //GUARDANDO EL NUEVO ENTORNO PARA RECORRIDO EN 3D
                for (let i in this.instruccionesIf) {
                    let instruccion = this.instruccionesIf[i];
                    let result = instruccion.ejecutar(nuevoEntorno, arbol);

                    if (result instanceof Excepcion) return result;
                    else if (result instanceof Return) return result;
                    else if (result instanceof Break) return result;
                    else if (result instanceof Continue) return result;
                }

            } else {
                if (this.instruccionesElse != null) {
                    let nuevoEntorno = new Entorno(ent);
                    nuevoEntorno.setEntorno("Else");
                    arbol.tablas.push(nuevoEntorno);    //GUARDANDO EL NUEVO ENTORNO PARA RECORRIDO EN 3D
               
                    for (let i in this.instruccionesElse) {
                        let instruccion = this.instruccionesElse[i];
                        let result = instruccion.ejecutar(nuevoEntorno, arbol);
                        if (result instanceof Excepcion) return result;
                        else if (result instanceof Return) return result;
                        else if (result instanceof Break) return result;
                        else if (result instanceof Continue) return result;
                    }
                } else if (this.elseIf != null) {
                    let result = this.elseIf.ejecutar(ent, arbol);
                    if (result instanceof Excepcion) return result;
                    else if (result instanceof Return) return result;
                    else if (result instanceof Break) return result; 
                    else if (result instanceof Continue) return result;
                }
            }
        } else {
            return new Excepcion(this.linea, this.columna, "Error Semantico", "La condicion en If debe ser booleana",nuevoEntorno.getEntorno());
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