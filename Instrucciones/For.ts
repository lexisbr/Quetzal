import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

import { QuadControlador } from "../Traductor/QuadControlador";

import { Break } from "./Break";
import { Continue } from "./Continue";
import { Declaracion } from "./Declaracion";

import { Return } from "./Return";

export class For implements Instruccion {
    linea: number;
    columna: number;
    instrucciones: Array<Instruccion>;
    valorInicial: any;
    condicion: Expresion;
    asignacion: any;

    constructor(instrucciones: Array<Instruccion>, valorInicial: any, condicion:Expresion, asignacion: any, linea: number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.condicion = condicion;
        this.asignacion = asignacion;
        this.valorInicial = valorInicial;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let valorInicial;
        let isDeclaracion:boolean = false;
        let nuevoEntorno = new Entorno(ent);
        if(this.valorInicial instanceof Declaracion){
            nuevoEntorno.setEntorno("For");
            valorInicial = this.valorInicial.ejecutar(nuevoEntorno, arbol);
            isDeclaracion = true;
        }else{
            valorInicial = this.valorInicial.ejecutar(ent, arbol);
        }

        if(valorInicial instanceof Excepcion) return valorInicial;
        console.log(valorInicial);
        while (true){
            let condicion;
            if(isDeclaracion){
                condicion = this.condicion.getValorImplicito(nuevoEntorno, arbol);
            }else{
                condicion = this.condicion.getValorImplicito(ent, arbol);
            }
            console.log("condicion",condicion);

            if(condicion instanceof Excepcion) return condicion;

            if(condicion == true || condicion == false){
                if(condicion){
                    let nuevoEntornoAux;
                    if(isDeclaracion){
                        nuevoEntornoAux = new Entorno(nuevoEntorno);
                    }else{
                        nuevoEntornoAux = new Entorno(ent);
                    }

                    console.log(this.instrucciones);
                    for(let i in this.instrucciones){
                        let result = this.instrucciones[i].ejecutar(nuevoEntornoAux, arbol);
                        if(result instanceof Excepcion) return result;
                        else if (result instanceof Return) return result;
                        else if (result instanceof Break) return;
                        else if (result instanceof Continue) break;

                    }
                    console.log(this.asignacion);
                    this.asignacion.ejecutar(nuevoEntornoAux, arbol);
                }else{
                    break;
                }
            }else{
                return new Excepcion(this.linea, this.columna, "\nSemantico","La condicion del For no es de tipo Booleano");
            }

 
        }
    }
    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }


}