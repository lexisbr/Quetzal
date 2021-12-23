import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Simbolo } from "../AST/Simbolo";
import { Operador } from "../AST/Operador";
import { Expresion } from "../Interfaces/Expresion";
import { Excepcion } from "../AST/Excepcion";
import { Identificador } from "./Identificador";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";
import { Primitivo } from "./Primitivo";

export class Operacion implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;
    etiqueta: string;
    bandera: boolean;

    constructor(op_izquierda:Expresion,op_derecha:Expresion, operacion:Operador, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
        this.etiqueta = "";
        this.bandera = false;
    }
    

    traducir(controlador:QuadControlador): Quadrupla | undefined {
		switch(this.operador){
            case Operador.SUMA:
            case Operador.RESTA:
            case Operador.MULTIPLICACION:
            case Operador.DIVISION:
            case Operador.MODULO:
			case Operador.AND:
			case Operador.OR:
			case Operador.MAYOR_IGUAL_QUE:
			case Operador.MAYOR_QUE:
			case Operador.MENOR_IGUAL_QUE:
			case Operador.MENOR_QUE:
			case Operador.DIFERENTE_QUE:
			case Operador.POW:
			case Operador.CONCAT:
                const izq = this.op_izquierda.traducir(controlador);   //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const der = this.op_derecha.traducir(controlador);   //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const resultado = controlador.getTemp();
                if(izq && der){
                    const quad = new Quadrupla(this.operador.toString(),`${izq.resultado}`,`${der.resultado}`,`${resultado}`);
                    controlador.addQuad(quad);
                    return quad;
                }
				return;

			case Operador.MENOS_UNARIO:
			case Operador.SQRT:
			case Operador.SENO:
			case Operador.COSENO:
			case Operador.TAN:
				const left = this.op_izquierda.traducir(controlador);
				const tmp1 = controlador.getTemp();
				if(left) {
					const quad = new Quadrupla(this.operador.toString(), left.resultado, "", tmp1);
					controlador.addQuad(quad);
					return quad;
				}
				break;
		}
		return;
    }
    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'boolean')
        {
            return Tipo.BOOL;
        }
        else if (typeof(valor) === 'string')
        {
            if(this.isChar(valor)){
                return Tipo.CHAR;
            }
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
    generateQuad2(arbol:AST,quad:Quadrupla) {
        if(!this.bandera)
        {
        let temporal = "";
        temporal = arbol.controlador.getTemp();
        if (this.op_izquierda instanceof Operacion){
            quad.arg1 = this.op_izquierda.etiqueta;
        }
        if (this.op_derecha instanceof Operacion){
            quad.arg2 = this.op_derecha.etiqueta;
        }
        quad.resultado = temporal;
        arbol.controlador.addQuad(quad);
        arbol.controlador.codigo3D.push(temporal + " = " + " " + quad.arg1 + " "+ quad.operacion +" " + quad.arg2 + " ;");
        this.bandera = true;
        this.etiqueta = quad.resultado;
        }
    }


    getValorImplicito(ent: Entorno, arbol: AST) {
        if (this.operador !== Operador.MENOS_UNARIO){
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);
            let typeOp1 = this.op_izquierda.getTipo(ent,arbol);
            let typeOp2 = this.op_derecha.getTipo(ent,arbol);
            //suma
            if(op1 instanceof Excepcion) return op1;
            if(op2 instanceof Excepcion) return op2;
            if (this.operador == Operador.SUMA)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {  
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.SUMA}`,`${op1}`,`${op2}`,""));
                    return op1 + op2;
                } else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Suma (+)",ent.getEntorno());
                }
            }
            //resta
            else if (this.operador == Operador.RESTA)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                   //this.generateQuad2(arbol,new Quadrupla(`${Operador.RESTA}`,`${op1}`,`${op2}`,""));
                    return op1 - op2;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Resta (-)",ent.getEntorno());
                }
            }
            //multiplicación
            else if (this.operador == Operador.MULTIPLICACION)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                   //this.generateQuad2(arbol,new Quadrupla(`${Operador.MULTIPLICACION}`,`${op1}`,`${op2}`,""));
                    return op1 * op2;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Multiplicacion (*)",ent.getEntorno());
                }
            }
            //division
            else if (this.operador == Operador.DIVISION)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    if(op2===0){
                        return new Excepcion(this.linea,this.columna,"Error Semantico","No puede realizar una Operacion entre cero",ent.getEntorno());
                    }
                   //this.generateQuad2(arbol,new Quadrupla(`${Operador.DIVISION}`,`${op1}`,`${op2}`,""));
                    return op1 / op2;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Division (/)",ent.getEntorno());
                }
            }
            //modulo
            else if (this.operador == Operador.MODULO)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    if(op2===0){
                        return new Excepcion(this.linea,this.columna,"Error Semantico","No puede realizar una Operacion entre cero",ent.getEntorno());
                    }
                   //this.generateQuad2(arbol,new Quadrupla(`${Operador.MODULO}`,`${op1}`,`${op2}`,""));
                    return op1 % op2;
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Modular (%)",ent.getEntorno());
                }
            } else if (this.operador == Operador.POW)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {   
                   //this.generateQuad2(arbol,new Quadrupla(`${Operador.MODULO}`,`${op1}`,`${op2}`,""));
                    return Math.pow(op1,op2);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Pow (xⁿ)",ent.getEntorno());
                }
            } else if (this.operador == Operador.SQRT)
            {
                if (typeof(op1==="number"))
                {
                    return Math.sqrt(op1);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Sqrt (√)",ent.getEntorno());
                }
            } else if (this.operador == Operador.LOG)
            {
                if (typeof(op1==="number"))
                {
                    return Math.log10(op1);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Log (log(x))",ent.getEntorno());
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
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Sin (seno)",ent.getEntorno());
                }
            } else if (this.operador == Operador.COSENO)
            {
                if (typeof(op1==="number"))
                {
                    return Math.cos(op1);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Cos (coseno)",ent.getEntorno());
                }
            } else if (this.operador == Operador.TAN)
            {
                if (typeof(op1==="number"))
                {
                    return Math.tan(op1);
                }
                else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Tan (tangente)",ent.getEntorno());
                }
            } else if (this.operador == Operador.CONCAT)
            {
                if (typeof(op1==="string") && typeof(op2==="string"))
                {
                   //this.generateQuad2(arbol,new Quadrupla(`${Operador.CONCAT}`,`${op1}`,`${op2}`,""));
                    return op1 + op2;
                } else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Concatenacion (&)",ent.getEntorno());
                }
            }  else if (this.operador == Operador.REPEAT)
            {
                if (typeof(op1==="string") && (typeOp2 == Tipo.INT || typeOp2 == Tipo.DOUBLE))
                {
                   //this.generateQuad2(arbol,new Quadrupla(`${Operador.REPEAT}`,`${op1}`,`${op2}`,""));
                    return op1.repeat(op2);
                } else
                {
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Concatenacion (&)",ent.getEntorno());
                }
            } else if (this.operador == Operador.INCREMENTO)
            {
                if(!(this.op_izquierda instanceof Identificador)){
                    return new Excepcion(this.linea,this.columna,"Error Semantico","No es un Identificador",ent.getEntorno());
                } 
                if (typeOp1 == Tipo.INT || typeOp1 == Tipo.DOUBLE)
                {   
                    if(ent.existe(this.op_izquierda.getId())){
                        let simbolo = new Simbolo(typeOp1,this.op_izquierda.getId(),this.linea,this.columna,op1 + 1);
                        ent.reemplazar(this.op_izquierda.getId(),simbolo);
                        return op1;
                    }
                    else {
                        return new Excepcion(this.linea,this.columna,"Error Semantico","Variable no Definida",ent.getEntorno());
                    }
                    
                } else{
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Incremento (++)",ent.getEntorno());
                }
                
            } else if (this.operador == Operador.DECREMENTO)
            {
                if(!(this.op_izquierda instanceof Identificador)){
                    return new Excepcion(this.linea,this.columna,"Error Semantico","No es un Identificador",ent.getEntorno());
                } 
                
                if (typeOp1 == Tipo.INT || typeOp1 == Tipo.DOUBLE)
                {   
                    if(ent.existe(this.op_izquierda.getId())){
                        let simbolo = new Simbolo(typeOp1,this.op_izquierda.getId(),this.linea,this.columna,op1 - 1);
                        ent.reemplazar(this.op_izquierda.getId(),simbolo);
                        return op1;
                    }
                    else {
                        return new Excepcion(this.linea,this.columna,"Error Semantico","Variable no Definida",ent.getEntorno());
                    }
                    
                } else{
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Decremento (--)",ent.getEntorno());
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
                    return new Excepcion(this.linea,this.columna,"Error Semantico","Tipo de Dato Erroneo para Operacion Unaria (-)",ent.getEntorno());
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