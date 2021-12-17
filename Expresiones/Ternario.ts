import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Operador } from "../AST/Operador";
import { Expresion } from "../Interfaces/Expresion";
import { Excepcion } from "../AST/Excepcion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";

export class Ternario implements Expresion {
    linea: number;
    columna: number;
    condicion: Expresion;
    op_Verdadera: Expresion;
    op_Falsa: Expresion;
    

    constructor(condicion: Expresion, op_Verdadera: Expresion, op_Falsa: Expresion, linea: number, columna: number){
        this.condicion = condicion;
        this.op_Verdadera = op_Verdadera;
        this.op_Falsa = op_Falsa;
        this.linea = linea;
        this.columna = columna;
    }
    
    traducir(controlador:QuadControlador):Quadrupla|undefined{
        return;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor_Condicional = this.condicion.getValorImplicito(ent, arbol);
        let type_Condicional = this.condicion.getTipo(ent,arbol);
        if(type_Condicional == Tipo.BOOL){
            return valor_Condicional ? this.op_Verdadera.getTipo(ent,arbol) : this.op_Falsa.getTipo(ent,arbol);
        } else {
            return Tipo.VOID;
        }

       
    }
    

    getValorImplicito(ent: Entorno, arbol: AST) {
        const valor_Condicional = this.condicion.getValorImplicito(ent, arbol);
        if(this.condicion.getTipo(ent,arbol)==Tipo.BOOL){
            return valor_Condicional ? this.op_Verdadera.getValorImplicito(ent,arbol) : this.op_Falsa.getValorImplicito(ent,arbol);
        } else {
            return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Operacion Condicional Erronea para Operacion Ternaria (?)");

        }
        return null;
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }

    isChar(cadena:string){
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length-1) === "'";
    }
}