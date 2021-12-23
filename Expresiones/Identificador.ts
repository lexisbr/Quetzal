import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";
import { Operador } from "../AST/Operador";

export class Identificador implements Expresion {
    linea: number;
    columna: number;
    tipo: any;
    identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = null;
        this.identificador = identificador;
    }

    getTipo(ent: Entorno, arbol: AST): any {
        if (ent.existe(this.identificador)) {
            let simbolo: Simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getTipo(ent, arbol);
        }
        else {
            return new Excepcion(this.linea, this.columna, "Error Semantico", "La variable no existe",ent.getEntorno());
        }
    }
    getId(){
        return this.identificador;
    }
    getValorImplicito(ent: Entorno, arbol: AST) {
        if (ent.existe(this.identificador)) {
            let simbolo: Simbolo = ent.getSimbolo(this.identificador);
            this.tipo = simbolo.getTipo(ent, arbol);
            return simbolo.getValorImplicito(ent, arbol);
        }
        else{ 
            return new Excepcion(this.linea,this.columna,"Error Semantico","La variable no existe",ent.getEntorno());
        }
    }

    traducir(controlador:QuadControlador):Quadrupla|undefined{
        const variable: Simbolo = controlador.actual.getSimbolo(this.identificador);
		const tmp = controlador.getTemp();
		const tmp2 = controlador.getTemp();
		controlador.addQuad(new Quadrupla(`${Operador.SUMA}`, "P", variable.posicion.toString(), tmp));
		const quad = new Quadrupla("ASSIGN", `${controlador.arbol.stack}[(int)${tmp}]`, "", tmp2);
        controlador.addQuad(quad);
		return quad;
    }

    
}