import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo.js";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";
import { Operacion } from "../Expresiones/Operacion";
import { Primitivo } from "../Expresiones/Primitivo";

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

    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (!(valor instanceof Excepcion)) {
            if (ent.existe(this.identificador)) {
                let simbolo:Simbolo = ent.getSimbolo(this.identificador);
                let simboloValor = simbolo.getTipo(ent,arbol);
                if( simboloValor == tipoValor || (tipoValor == Tipo.NULL && simboloValor == Tipo.STRING)|| (tipoValor == Tipo.INT && simboloValor == Tipo.DOUBLE) || (tipoValor == Tipo.CHAR && simboloValor == Tipo.STRING)) {
                    if(this.isDouble(tipoValor,simboloValor)){
                        valor = valor.toFixed(2);
                    }
                    simbolo.setValor(valor);
                    if (tipoValor == Tipo.INT || tipoValor == Tipo.DOUBLE) {
                        console.log("entra------");
                        if (this.expresion instanceof Operacion || this.expresion instanceof Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = P + ${simbolo.posicion} ;`);
                            let etiqueta = (this.expresion instanceof Operacion)?this.expresion.etiqueta:valor;
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${etiqueta}`, `${temp}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[${temp}] = ${etiqueta} ;`);
                        } 
                    } else if (tipoValor == Tipo.STRING){
                        if (this.expresion instanceof Operacion || this.expresion instanceof Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            for (let i = 0; i < valor.length; i++){
                                arbol.controlador.addQuad(new Quadrupla(`=`, `${valor.charCodeAt(i)}`, `H`, `${arbol.heap}`));
                                arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(i)} ;`);
                                arbol.controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
                                arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            }
                            arbol.controlador.addQuad(new Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${simbolo.posicion} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    } else if (tipoValor == Tipo.CHAR){
                        if (this.expresion instanceof Operacion) {
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${this.expresion.etiqueta}`, `${simbolo.posicion}`, `${arbol.stack}`));
                        } else if (this.expresion instanceof Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${valor.charCodeAt(0)}`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(0)} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${simbolo.posicion} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }

                    ent.reemplazar(this.identificador, simbolo);

                    return simbolo;
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