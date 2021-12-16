import { AST } from "../../AST/AST";
import { Entorno } from "../../AST/Entorno";
import { Tipo } from "../../AST/Tipo";
import { Expresion } from "../../Interfaces/Expresion";
import { Excepcion } from "../../AST/Excepcion";



export class Typeof implements Expresion {
    linea: number;
    columna: number;
    expresion: Expresion;



    constructor(expresion: Expresion, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }
    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo.CHAR;
            }
            return Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo.INT;
            }
            return Tipo.DOUBLE;
        } 
        else if (valor === null) {
            return Tipo.NULL;
        }

        return Tipo.VOID;
    }


    getValorImplicito(ent: Entorno, arbol: AST) {

            let valor = this.expresion.getValorImplicito(ent, arbol);
            let tipoValor = this.expresion.getTipo(ent, arbol);
            console.log(valor);
            
            //TOINT
            if (tipoValor == Tipo.INT) {
                return "int";
            } else if (tipoValor == Tipo.DOUBLE) {
                return "double";
            } else if (tipoValor == Tipo.BOOL) {
                return "boolean";
            }else if (tipoValor == Tipo.CHAR) {
                return "char";
            } else if (tipoValor == Tipo.STRING) {
                return "String";
            } else
            {
                return new Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Funcion Typeof");
            }

    }


    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

    isChar(cadena: string) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}