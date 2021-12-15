import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo.js";

export class Asignacion implements Instruccion {
    linea: number;
    columna: number;
    expresion: Expresion;
    identificador: string;

    constructor(identificador: string, exp: Expresion, linea: number, columna: number) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (!(valor instanceof Excepcion)) {
            if (ent.existe(this.identificador)) {
                let simbolo:Simbolo = ent.getSimbolo(this.identificador);
                let simboloValor = simbolo.getTipo(ent,arbol);
                if( simboloValor == tipoValor || (tipoValor == Tipo.NULL && simboloValor == Tipo.STRING)|| (tipoValor == Tipo.INT && simboloValor == Tipo.DOUBLE)) {
                    if(this.isDouble(tipoValor,simboloValor)){
                        valor = valor.toFixed(2);
                    }
                    simbolo.setValor(valor);
                    ent.reemplazar(this.identificador, simbolo);
                }else{
                    return new Excepcion(this.linea, this.columna, "Semantico", "Los tipos no coinciden");
                }
            } else {
                return new Excepcion(this.linea, this.columna, "Semantico", "La variable no esta definida");
            }

        } else {
            return valor;
        }
    }

    isDouble(tipoValor:any, simboloValor:any){
        return tipoValor == Tipo.INT && simboloValor == Tipo.DOUBLE;
    }

}