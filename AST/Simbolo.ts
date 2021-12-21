import { Expresion } from "../Interfaces/Expresion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";
import { AST } from "./AST";
import { Entorno } from "./Entorno";
import { Tipo } from "./Tipo";

export class Simbolo implements Expresion {
    public identificador: string;
    public valor: any;
    private tipo: Tipo;
    linea: number;
    columna: number;
    posicion: number;

    constructor(tipo:Tipo, id:string, linea:number, columna:number, valor:any){
        this.identificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.posicion = 0;
    }
    traducir(controlador:QuadControlador):Quadrupla|undefined{
        return;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        return this.tipo;
    }
    
    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.valor;
    }

    getIdentificador(){
        return this.identificador;
    }
    setValor(valor: any){
        this.valor = valor;
    }
    
}