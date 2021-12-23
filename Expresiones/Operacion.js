"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operacion = void 0;
const Tipo_1 = require("../AST/Tipo");
const Simbolo_1 = require("../AST/Simbolo");
const Operador_1 = require("../AST/Operador");
const Excepcion_1 = require("../AST/Excepcion");
const Identificador_1 = require("./Identificador");
const Quadrupla_1 = require("../Traductor/Quadrupla");
class Operacion {
    constructor(op_izquierda, op_derecha, operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
        this.etiqueta = "";
        this.bandera = false;
    }
    traducir(controlador) {
        switch (this.operador) {
            case Operador_1.Operador.SUMA:
            case Operador_1.Operador.RESTA:
            case Operador_1.Operador.MULTIPLICACION:
            case Operador_1.Operador.DIVISION:
            case Operador_1.Operador.MODULO:
            case Operador_1.Operador.AND:
            case Operador_1.Operador.OR:
            case Operador_1.Operador.MAYOR_IGUAL_QUE:
            case Operador_1.Operador.MAYOR_QUE:
            case Operador_1.Operador.MENOR_IGUAL_QUE:
            case Operador_1.Operador.MENOR_QUE:
            case Operador_1.Operador.DIFERENTE_QUE:
            case Operador_1.Operador.POW:
            case Operador_1.Operador.CONCAT:
                const izq = this.op_izquierda.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const der = this.op_derecha.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const resultado = controlador.getTemp();
                if (izq && der) {
                    const quad = new Quadrupla_1.Quadrupla(this.operador.toString(), `${izq.resultado}`, `${der.resultado}`, `${resultado}`);
                    controlador.addQuad(quad);
                    return quad;
                }
                return;
            case Operador_1.Operador.MENOS_UNARIO:
            case Operador_1.Operador.SQRT:
            case Operador_1.Operador.SENO:
            case Operador_1.Operador.COSENO:
            case Operador_1.Operador.TAN:
                const left = this.op_izquierda.traducir(controlador);
                const tmp1 = controlador.getTemp();
                if (left) {
                    const quad = new Quadrupla_1.Quadrupla(this.operador.toString(), left.resultado, "", tmp1);
                    controlador.addQuad(quad);
                    return quad;
                }
                break;
        }
        return;
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
    generateQuad2(arbol, quad) {
        if (!this.bandera) {
            let temporal = "";
            temporal = arbol.controlador.getTemp();
            if (this.op_izquierda instanceof Operacion) {
                quad.arg1 = this.op_izquierda.etiqueta;
            }
            if (this.op_derecha instanceof Operacion) {
                quad.arg2 = this.op_derecha.etiqueta;
            }
            quad.resultado = temporal;
            arbol.controlador.addQuad(quad);
            arbol.controlador.codigo3D.push(temporal + " = " + " " + quad.arg1 + " " + quad.operacion + " " + quad.arg2 + " ;");
            this.bandera = true;
            this.etiqueta = quad.resultado;
        }
    }
    getValorImplicito(ent, arbol) {
        if (this.operador !== Operador_1.Operador.MENOS_UNARIO) {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);
            let typeOp1 = this.op_izquierda.getTipo(ent, arbol);
            let typeOp2 = this.op_derecha.getTipo(ent, arbol);
            //suma
            if (this.operador == Operador_1.Operador.SUMA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.SUMA}`,`${op1}`,`${op2}`,""));
                    return op1 + op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Suma (+)");
                }
            }
            //resta
            else if (this.operador == Operador_1.Operador.RESTA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.RESTA}`,`${op1}`,`${op2}`,""));
                    return op1 - op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Resta (-)");
                }
            }
            //multiplicación
            else if (this.operador == Operador_1.Operador.MULTIPLICACION) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.MULTIPLICACION}`,`${op1}`,`${op2}`,""));
                    return op1 * op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Multiplicacion (*)");
                }
            }
            //division
            else if (this.operador == Operador_1.Operador.DIVISION) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    if (op2 === 0) {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No puede realizar una Operacion entre cero");
                    }
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.DIVISION}`,`${op1}`,`${op2}`,""));
                    return op1 / op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Division (/)");
                }
            }
            //modulo
            else if (this.operador == Operador_1.Operador.MODULO) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    if (op2 === 0) {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No puede realizar una Operacion entre cero");
                    }
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.MODULO}`,`${op1}`,`${op2}`,""));
                    return op1 % op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Modular (%)");
                }
            }
            else if (this.operador == Operador_1.Operador.POW) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.MODULO}`,`${op1}`,`${op2}`,""));
                    return Math.pow(op1, op2);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Pow (xⁿ)");
                }
            }
            else if (this.operador == Operador_1.Operador.SQRT) {
                if (typeof (op1 === "number")) {
                    return Math.sqrt(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Sqrt (√)");
                }
            }
            else if (this.operador == Operador_1.Operador.LOG) {
                if (typeof (op1 === "number")) {
                    return Math.log10(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Log (log(x))");
                }
            }
            else if (this.operador == Operador_1.Operador.SENO) {
                if (typeof (op1 === "number")) {
                    return Math.sin(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Sin (seno)");
                }
            }
            else if (this.operador == Operador_1.Operador.COSENO) {
                if (typeof (op1 === "number")) {
                    return Math.cos(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Cos (coseno)");
                }
            }
            else if (this.operador == Operador_1.Operador.TAN) {
                if (typeof (op1 === "number")) {
                    return Math.tan(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Tan (tangente)");
                }
            }
            else if (this.operador == Operador_1.Operador.CONCAT) {
                if (typeof (op1 === "string") && typeof (op2 === "string")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.CONCAT}`,`${op1}`,`${op2}`,""));
                    return op1 + op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Concatenacion (&)");
                }
            }
            else if (this.operador == Operador_1.Operador.REPEAT) {
                if (typeof (op1 === "string") && (typeOp2 == Tipo_1.Tipo.INT || typeOp2 == Tipo_1.Tipo.DOUBLE)) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.REPEAT}`,`${op1}`,`${op2}`,""));
                    return op1.repeat(op2);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Concatenacion (&)");
                }
            }
            else if (this.operador == Operador_1.Operador.INCREMENTO) {
                if (!(this.op_izquierda instanceof Identificador_1.Identificador)) {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No es un Identificador");
                }
                if (typeOp1 == Tipo_1.Tipo.INT || typeOp1 == Tipo_1.Tipo.DOUBLE) {
                    if (ent.existe(this.op_izquierda.getId())) {
                        let simbolo = new Simbolo_1.Simbolo(typeOp1, this.op_izquierda.getId(), this.linea, this.columna, op1 + 1);
                        ent.reemplazar(this.op_izquierda.getId(), simbolo);
                        return op1;
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Variable no Definida");
                    }
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Incremento (++)");
                }
            }
            else if (this.operador == Operador_1.Operador.DECREMENTO) {
                if (!(this.op_izquierda instanceof Identificador_1.Identificador)) {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No es un Identificador");
                }
                if (typeOp1 == Tipo_1.Tipo.INT || typeOp1 == Tipo_1.Tipo.DOUBLE) {
                    if (ent.existe(this.op_izquierda.getId())) {
                        let simbolo = new Simbolo_1.Simbolo(typeOp1, this.op_izquierda.getId(), this.linea, this.columna, op1 - 1);
                        ent.reemplazar(this.op_izquierda.getId(), simbolo);
                        return op1;
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Variable no Definida");
                    }
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Decremento (--)");
                }
            }
        }
        else {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador_1.Operador.MENOS_UNARIO) {
                if (typeof (op1 === "number")) {
                    return -1 * op1;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Unaria (-)");
                }
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
exports.Operacion = Operacion;
