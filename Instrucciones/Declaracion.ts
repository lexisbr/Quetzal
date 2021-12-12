import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class Declaracion implements Instruccion {
    linea: number;
    columna: number;
    expresion: Expresion;
    tipo: Tipo;
    identificador: string;

    constructor(identificador: string, exp: Expresion, tipo: Tipo, linea: number, columna: number) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.tipo = tipo;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        const valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (valor !== null) {

            if (tipoValor == this.tipo) {
                if (!ent.existe(this.identificador)) {
                    let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                    ent.agregar(this.identificador, simbolo);
                }else{
                    console.log("Error Semantico: la variable ya existe ")
                }
            } else {
                console.log("Error Semantico: los tipos no coinciden")
            }

        } else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }

    getTipo(): string {
        if (this.tipo === Tipo.BOOL) {
            return 'boolean';
        }
        else if (this.tipo === Tipo.STRING) {
            return 'string';
        }
        else if (this.tipo === Tipo.INT) {
            return 'int';
        }
        else if (this.tipo === Tipo.DOUBLE) {
            return 'double';
        }
        else if (this.tipo === Tipo.CHAR) {
            return 'char';
        }

        return '';
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }
}