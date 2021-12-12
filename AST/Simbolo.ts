import { Expresion } from "../Interfaces/Expresion";
import { AST } from "./AST";
import { Entorno } from "./Entorno";
import { Tipo } from "./Tipo";

export class Simbolo implements Expresion {
    public identificador: string;
    public valor: any;
    private tipo: Tipo;
    linea: number;
    columna: number;

    constructor(tipo:Tipo, id:string, linea:number, columna:number, valor:any){
        this.identificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
    }
    
    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        return this.tipo;
    }
    
    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.valor;
    }

    setValor(valor: any){
        this.valor = valor;
    }
    
}