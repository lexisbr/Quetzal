import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";

export class Atributo implements Expresion {
    linea: number;
    columna: number;
    identificador: string;
    valor: any;
    tipo: any;

    constructor(identificador: string, tipo: any, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.valor = null;
        this.tipo = tipo;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        throw new Error("Method not implemented.");
    }

    getValorImplicito(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }
    
    traducir(controlador: QuadControlador): Quadrupla | undefined {
        throw new Error("Method not implemented.");
    }
    
    
}
