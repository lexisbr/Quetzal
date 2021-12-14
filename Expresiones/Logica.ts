import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Excepcion } from "../AST/Excepcion";
import { Operador } from "../AST/Operador";


export class Logica implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;

    constructor(op_izquierda: Expresion, op_derecha: Expresion, operador: Operador, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operador;
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
        if (this.operador !== Operador.NOT) {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);

            let op1Tipo = this.op_izquierda.getTipo(ent, arbol);
            let op2Tipo = this.op_derecha.getTipo(ent, arbol);
            //AND
            if (this.operador == Operador.AND) {
                if (op1Tipo === Tipo.BOOL && op2Tipo === Tipo.BOOL) {
                    return op1 && op2;
                }
                else {
                    return new Excepcion(this.linea, this.columna, "\nSemantico", "Tipo de Dato Erroneo para AND");

                }
            }
            //OR
            else if (this.operador == Operador.OR) {
                if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                    return op1 || op2;
                }
                else {
                    return new Excepcion(this.linea, this.columna, "\nSemantico", "Tipo de Dato Erroneo para OR");

                }
            }

        } else {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador.NOT) {
                if (typeof (op1 === "boolean")) {
                    return !op1;
                }
                else {
                    return new Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para NOT");

                }
            }
        }
        return null;
    }


    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

    isChar(cadena: string) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}