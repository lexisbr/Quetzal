import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Operador } from "../AST/Operador";
import { Expresion } from "../Interfaces/Expresion";
import { Excepcion } from "../AST/Excepcion";

export class Operacion implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;

    constructor(op_izquierda:Expresion,op_derecha:Expresion, operacion:Operador, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'boolean')
        {
            return Tipo.BOOL;
        }
        else if (typeof(valor) === 'string')
        {
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
        if (this.operador !== Operador.MENOS_UNARIO){
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);
            
            //suma
            if (this.operador == Operador.SUMA)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {

                    return op1 + op2;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Suma (+)");
                }
            }
            //resta
            else if (this.operador == Operador.RESTA)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 - op2;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Resta (-)");
                }
            }
            //multiplicación
            else if (this.operador == Operador.MULTIPLICACION)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 * op2;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Multiplicacion (*)");
                }
            }
            //division
            else if (this.operador == Operador.DIVISION)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    if(op2===0){
                        return new Excepcion(this.linea,this.columna,"Semantico","No puede realizar una Operacion entre cero");
                    }
                    return op1 / op2;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Division (/)");
                }
            }
            //modulo
            else if (this.operador == Operador.MODULO)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    if(op2===0){
                        return new Excepcion(this.linea,this.columna,"Semantico","No puede realizar una Operacion entre cero");
                    }
                    return op1 % op2;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Modular (%)");
                }
            } else if (this.operador == Operador.POW)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return Math.pow(op1,op2);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Pow (xⁿ)");
                }
            } else if (this.operador == Operador.SQRT)
            {
                if (typeof(op1==="number"))
                {
                    return Math.sqrt(op1);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Sqrt (√)");
                }
            } else if (this.operador == Operador.LOG)
            {
                if (typeof(op1==="number"))
                {
                    return Math.log10(op1);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Log (log(x))");
                }
            }
 
             else if (this.operador == Operador.SENO)
            {
                if (typeof(op1==="number"))
                {
                    return Math.sin(op1);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Sin (seno)");
                }
            } else if (this.operador == Operador.COSENO)
            {
                if (typeof(op1==="number"))
                {
                    return Math.cos(op1);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Cos (coseno)");
                }
            } else if (this.operador == Operador.TAN)
            {
                if (typeof(op1==="number"))
                {
                    return Math.tan(op1);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Tan (tangente)");
                }
            } 
        }else{
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador.MENOS_UNARIO)
            {
                if (typeof(op1==="number"))
                {
                    return -1* op1;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Unaria (-)");
                }
            }
        }
        return null;
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }

    isChar(cadena:string){
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length-1) === "'";
    }
}