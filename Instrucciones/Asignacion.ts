import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

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
        const valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (!(valor instanceof Excepcion)) {
            if (ent.existeEnActual(this.identificador)) {
                let simbolo:Simbolo = ent.getSimbolo(this.identificador);
                console.log("tipoValor",tipoValor);
                if(simbolo.getTipo(ent,arbol) == tipoValor) {
                    simbolo.setValor(valor);
                    ent.reemplazar(this.identificador, simbolo);
                }else{
                    return new Excepcion(this.linea, this.columna, "Semantico", "Los tipos no coinciden");
                }
            } else {
                return new Excepcion(this.linea, this.columna, "Semantico", "La variable no esta definida");
            }

        } else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }

}