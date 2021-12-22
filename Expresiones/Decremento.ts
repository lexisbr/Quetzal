import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Operador } from "../AST/Operador";
import { Expresion } from "../Interfaces/Expresion";
import { Excepcion } from "../AST/Excepcion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Identificador } from "./Identificador";
import { Simbolo } from "../AST/Simbolo";
import { Quadrupla } from "../Traductor/Quadrupla";

export class Decremento implements Instruccion {
    linea: number;
    columna: number;
    operacion: Expresion;
 

    constructor(operacion:Expresion,linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.operacion = operacion;
    }
    ejecutar(ent: Entorno, arbol: AST) {
        let op1 = this.operacion.getValorImplicito(ent, arbol);
        if(op1 instanceof Excepcion){
            return op1;
        } else{
            return op1;        
        }
    }
    traducir(controlador:QuadControlador) {
		/*
			// this.operacion.traducir(controlador);
			t1 = P + pos;
			t2 = stack[t1];

			// decremento aca
			t3 = t2 + 1

			// obtener posicion
			t4 = P + pos;
			// asignar

			stack[t4] = t3

			return t2;
		*/

		if(this.operacion instanceof Identificador) {
			const variable: Simbolo = controlador.actual.getSimbolo(this.operacion.getId());
			const tmpQ: Quadrupla | undefined = this.operacion.traducir(controlador);
			if(tmpQ) {
				const tmp1 = controlador.getTemp();
				const tmp2 = controlador.getTemp();

				// decremento
				controlador.addQuad(new Quadrupla(Operador.RESTA.toString(), tmpQ.resultado, "1", tmp1));

				// obtener posicion
				controlador.addQuad(new Quadrupla(Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp2));

				// asignar decremento
				controlador.addQuad(new Quadrupla("ASSIGN", tmp1, "", `${controlador.arbol.stack}[${tmp2}]`));

				// retornar valor anterior a decremento
				return tmpQ;
			}
		}
		return;
	}
}