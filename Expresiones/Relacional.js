"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Tipo_1 = require("../AST/Tipo");
const Excepcion_1 = require("../AST/Excepcion");
const Operador_1 = require("../AST/Operador");
class Relacional {
    constructor(op_izquierda, op_derecha, relacional, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = relacional;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
        let op2 = this.op_derecha.getValorImplicito(ent, arbol);
        //MENOR QUE
        if (this.operador == Operador_1.Operador.MENOR_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 < op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos para operador <");
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Menor Que (<)");
            }
        }
        //MAYOR QUE
        else if (this.operador == Operador_1.Operador.MAYOR_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 > op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos para operador >");
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Mayor Que (>)");
            }
        }
        //IGUAL IGUAL
        else if (this.operador == Operador_1.Operador.IGUAL_IGUAL) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 == op2;
            }
            else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                return op1 == op2;
            }
            else if (typeof (op1 === "string") && typeof (op2 === "string")) {
                return op1 == op2;
            }
            else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 == op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos para operador ==");
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Igual Igual (==)");
            }
        } //MENOR IGUAL
        else if (this.operador == Operador_1.Operador.MENOR_IGUAL_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 == op2;
            }
            else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                return op1 == op2;
            }
            else if (typeof (op1 === "string") && typeof (op2 === "string")) {
                return op1 == op2;
            }
            else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 == op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos para operador ==");
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Igual Igual (==)");
            }
        }
        else if (this.operador == Operador_1.Operador.RESTA) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 - op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        //multiplicación
        else if (this.operador == Operador_1.Operador.MULTIPLICACION) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 * op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        //division
        else if (this.operador == Operador_1.Operador.DIVISION) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                if (op2 === 0) {
                    console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                    return null;
                }
                return op1 / op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        //modulo
        else if (this.operador == Operador_1.Operador.MODULO) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                if (op2 === 0) {
                    console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                    return null;
                }
                return op1 % op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        return null;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.Relacional = Relacional;
