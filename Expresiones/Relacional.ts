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

    constructor(op_izquierda: Expresion, op_derecha: Expresion, relacional: Operador, linea: number, columna: number) {
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
        if (typeof (valor) === 'boolean') {
            return Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if(this.isChar(valor)){
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

        let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
        let op2 = this.op_derecha.getValorImplicito(ent, arbol);

        //MENOR QUE
        if (this.operador == Operador.MENOR_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 < op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos para operador <");
                return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operador Menor Que (<)");
            }
        }
        //MAYOR QUE
        else if (this.operador == Operador.MAYOR_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 > op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos para operador >");
                return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operador Mayor Que (>)");
            }
        }
        //IGUAL IGUAL
        else if (this.operador == Operador.IGUAL_IGUAL) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 == op2;
            } else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                return op1 == op2;
            } else if (typeof (op1 === "string") && typeof (op2 === "string")) {
                return op1 == op2;
            } else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 == op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos para operador ==");
                return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operador Igual Igual (==)");
            }
        } //MENOR IGUAL
        else if (this.operador == Operador.MENOR_IGUAL_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 == op2;
            } else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                return op1 == op2;
            } else if (typeof (op1 === "string") && typeof (op2 === "string")) {
                return op1 == op2;
            } else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 == op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos para operador ==");
                return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operador Igual Igual (==)");
            }
        }
        else if (this.operador == Operador.RESTA) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 - op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        //multiplicación
        else if (this.operador == Operador.MULTIPLICACION) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 * op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        //division
        else if (this.operador == Operador.DIVISION) {
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
        else if (this.operador == Operador.MODULO) {
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

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

    isChar(cadena:string){
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length-1) === "'";
    }
}