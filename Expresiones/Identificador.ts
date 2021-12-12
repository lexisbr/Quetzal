import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";

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
        if (ent.existeEnActual(this.identificador)) {
            let simbolo: Simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getTipo(ent, arbol);
        }
        else {
            return new Excepcion(this.linea, this.columna, "Error Semantico", "La variable no existe");
        }
    }

    getValorImplicito(ent: Entorno, arbol: AST) {
        if (ent.existeEnActual(this.identificador)) {
            let simbolo: Simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getValorImplicito(ent, arbol);
        }

        else{ 
            return new Excepcion(this.linea,this.columna,"Semantico","La variable no existe");
        }
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }


}