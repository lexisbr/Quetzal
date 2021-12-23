import { AST } from "../../AST/AST";
import { Entorno } from "../../AST/Entorno";
import { Tipo } from "../../AST/Tipo";
import { Operador } from "../../AST/Operador";
import { Expresion } from "../../Interfaces/Expresion";
import { Excepcion } from "../../AST/Excepcion";
import { QuadControlador } from "../../Traductor/QuadControlador";
import { Quadrupla } from "../../Traductor/Quadrupla";

export class ToLower implements Expresion {
    linea: number;
    columna: number;
    expresion: Expresion;

    constructor(expresion: Expresion, linea: number, columna: number){
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;   
    }
    traducir(controlador:QuadControlador):Quadrupla|undefined{
        return;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'boolean')
        {
            return Tipo.BOOL;
        }
        else if (typeof(valor) === 'string')
        {
            if(this.isChar(valor)){
                return Tipo.CHAR;
            }
            return Tipo.STRING;
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return Tipo.INT;
            }
           return Tipo.DOUBLE;
        }
        else if(valor === null){
            return Tipo.NULL;
        }
            
        return Tipo.VOID;
    }
    

    getValorImplicito(ent: Entorno, arbol: AST) {
        let value = this.expresion.getValorImplicito(ent,arbol);
        let typeValue = this.expresion.getTipo(ent,arbol);

        if (typeValue == Tipo.STRING)
        {
            return value.toLowerCase();
            
        } else
        {
            return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Funcion toLowerCase",ent.getEntorno());
        }
           
    } 
       
    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }

    isChar(cadena:string){
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length-1) === "'";
    }
}