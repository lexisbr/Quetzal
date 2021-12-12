import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Excepcion } from "../AST/Excepcion";
import { Operador } from "../AST/Operador";

export class Relacional implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;

    constructor(
        op_izquierda: Expresion,
        op_derecha: Expresion,
        relacional: Operador,
        linea: number,
        columna: number
    ) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = relacional;
    }
    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof valor === "boolean") {
            return Tipo.BOOL;
        } else if (typeof valor === "string") {
            if (this.isChar(valor)) {
                return Tipo.CHAR;
            }
            return Tipo.STRING;
        } else if (typeof valor === "number") {
            if (this.isInt(Number(valor))) {
                return Tipo.INT;
            }
            return Tipo.DOUBLE;
        } else if (valor === null) {
            return Tipo.NULL;
        }

        return Tipo.VOID;
    }

    getValorImplicito(ent: Entorno, arbol: AST) {
        let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
        let op2 = this.op_derecha.getValorImplicito(ent, arbol);

        let typeOp1 = this.op_izquierda.getTipo(ent, arbol);
        let typeOp2 = this.op_derecha.getTipo(ent, arbol);
        //MENOR QUE
        if (this.operador == Operador.MENOR_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 < op2;
            } else {
                return new Excepcion(
                    this.linea,
                    this.columna,
                    "Semantico",
                    "Tipo de Dato Erroneo para Operador Menor Que (<)"
                );
            }
        }
        //MAYOR QUE
        else if (this.operador == Operador.MAYOR_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 > op2;
            } else {
                return new Excepcion(
                    this.linea,
                    this.columna,
                    "Semantico",
                    "Tipo de Dato Erroneo para Operador Mayor Que (>)"
                );
            }
        }
        //IGUAL IGUAL
        else if (this.operador == Operador.IGUAL_IGUAL) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 == op2;
            } else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                return op1 == op2;
            } else if (typeOp1 === Tipo.STRING && typeOp2 === Tipo.STRING) {
                return op1 == op2;
            } else if (typeOp1 === Tipo.CHAR && typeOp2 === Tipo.CHAR) {
                return op1 == op2;
            } else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 == op2;
            } else {
                return new Excepcion(
                    this.linea,
                    this.columna,
                    "Semantico",
                    "Tipo de Dato Erroneo para Operador Igual Igual (==)"
                );
            }
        } //MENOR IGUAL
        else if (this.operador == Operador.MENOR_IGUAL_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 <= op2;
            } else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 <= op2;
            } else {
                return new Excepcion(
                    this.linea,
                    this.columna,
                    "Semantico",
                    "Tipo de Dato Erroneo para Operador Menor Igual (<=)"
                );
            } //MAYOR IGUAL
        } else if (this.operador == Operador.MAYOR_IGUAL_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 >= op2;
            } else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 >= op2;
            } else {
                return new Excepcion(
                    this.linea,
                    this.columna,
                    "Semantico",
                    "Tipo de Dato Erroneo para Operador Mayor Igual (>=)"
                );
            } //DIFERENTE QUE
        } else if (this.operador == Operador.DIFERENTE_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 != op2;
            } else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                return op1 != op2;
            } else if (typeOp1 === Tipo.STRING && typeOp2 === Tipo.STRING) {
                return op1 != op2;
            } else if (typeOp1 === Tipo.CHAR && typeOp2 === Tipo.CHAR) {
                return op1 != op2;
            } else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 != op2;
            } else {
                return new Excepcion(
                    this.linea,
                    this.columna,
                    "Semantico",
                    "Tipo de Dato Erroneo para Operador Diferente Que (!=)"
                );
            }
        }

        return null;
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

    isChar(cadena: string) {
        return (
            cadena.length == 3 &&
            cadena.charAt(0) === "'" &&
            cadena.charAt(cadena.length - 1) === "'"
        );
    }
}
