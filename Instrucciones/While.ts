import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class While implements Instruccion {
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
        while(true){
            let condicion = this.condicion.getValorImplicito(ent, arbol);
            if(condicion instanceof Excepcion) return condicion;
            let nuevoEntorno:Entorno = new Entorno(ent);
            nuevoEntorno.setEntorno("While");
            if (this.condicion.getTipo(ent,arbol) == Tipo.BOOL){
                if(condicion){
                    arbol.tablas.push(nuevoEntorno);
                    for(let i in this.instrucciones){
                        let instruccion = this.instrucciones[i];
                        let result = instruccion.ejecutar(nuevoEntorno, arbol);
                        if(result instanceof Excepcion) return result;
                        else if (result instanceof Return) return result;
                        else if (result instanceof Break) return;
                        else if (result instanceof Continue) break;
                    }
                }else{
                    break;
                }
            }else{
                return new Excepcion(this.linea, this.columna, "Error Semantico","El tipo de dato en condicion debe ser booleano",nuevoEntorno.getEntorno())
            }
        }
    }
    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }

    


}