import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Return } from "./Return";
import { QuadControlador } from "../Traductor/QuadControlador";

export class Main implements Instruccion {
    linea: number;
    columna: number;
    instrucciones: Array<Instruccion>

    constructor(instrucciones: Array<Instruccion>, linea: number, columna: number) {
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let nuevoEntorno = new Entorno(ent);
        nuevoEntorno.setEntorno("Main");
        arbol.tablas.push(nuevoEntorno);    //GUARDANDO LAS TS PARA EL RECORRIDO EN 3D
        for (let i in this.instrucciones) {
            if (!(this.instrucciones[i] instanceof Excepcion)) {
                let value = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
                console.log(nuevoEntorno.getTabla());
                if (value instanceof Excepcion) {
                    arbol.addExcepcion(value);
                    arbol.updateConsola("\n" + value.toString());
                } else if (value instanceof Return) {
                    if (value.getTipo() == Tipo.VOID) return this;
                    else return new Excepcion(this.linea, this.columna, "Error Semantico", "Main no puede retornar un valor",nuevoEntorno.getEntorno());
                }
            } else {
                arbol.addExcepcion(this.instrucciones[i] as Excepcion);
                arbol.updateConsola("\n" + this.instrucciones[i].toString());
            }
        }

    }

    traducir(controlador: QuadControlador) {

        controlador.actual = controlador.arbol.tablas.shift() ?? new Entorno(null);  //VERIFICA QUE EL ENTORNO NO SE UNDEFINED
        this.instrucciones.forEach(instruccion => {
            instruccion.traducir(controlador);
        });
    }

}