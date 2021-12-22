import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Operador } from "../AST/Operador";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Identificador } from "../Expresiones/Identificador";
import { Operacion } from "../Expresiones/Operacion";
import { Primitivo } from "../Expresiones/Primitivo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";
import { Llamada } from "./Llamada";

export class Declaracion implements Instruccion {
    linea: number;
    columna: number;
    expresion: any;
    tipo: Tipo;
    identificador: any;
    identificadores: Array<string>;

    constructor(identificador: any, expresion: any, tipo: Tipo, identificadores: Array<string>, linea: number, columna: number) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.tipo = tipo;
        this.identificadores = identificadores;
    }

    traducir(controlador:QuadControlador) {
       if(this.expresion == null){

        return;
       }

        const variable: Simbolo = controlador.actual.getSimbolo(this.identificador);
        let simboloValor = variable.getTipo(controlador.actual, controlador.arbol);
        let valor = this.expresion.getValorImplicito(controlador.actual, controlador.arbol);
        if (simboloValor == Tipo.STRING) {
            const tmp = controlador.getTemp();
            const tmp2 = controlador.getTemp();
            controlador.addQuad(new Quadrupla(`ASSIGN`, `H`, ``, `${tmp}`));
            for (let i = 0; i < valor.length; i++) {
                controlador.addQuad(new Quadrupla(`=`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[H]`));
                controlador.addQuad(new Quadrupla(Operador.SUMA.toString(), `1`, `H`, `H`));
            }
            controlador.addQuad(new Quadrupla(`=`, `-1`, `H`, `${controlador.arbol.heap}`));
            controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
            controlador.addQuad(new Quadrupla(`+`, `P`, `${variable.posicion.toString()}`, `${tmp2}`));
            controlador.addQuad(new Quadrupla(`=`, `${tmp}`, ``, `${controlador.arbol.stack}[${tmp2}]`));
            console.log(controlador);
        } else if (simboloValor == Tipo.INT || simboloValor == Tipo.DOUBLE) {
            const tmp = controlador.getTemp();
            controlador.addQuad(new Quadrupla(Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp));
            const quad_expr = this.expresion.traducir(controlador);
            const res = (quad_expr) ? quad_expr.resultado : "";
            controlador.addQuad(new Quadrupla("ASSIGN", res, "", controlador.arbol.stack + "[" + tmp + "]"));
        }
        return;
    }


    

    ejecutar(ent: Entorno, arbol: AST) {
        let valor;
        let tipoValor;
        if (this.expresion != null) {   //INT A = suma(a,b);
            if (this.expresion instanceof Llamada) {
                valor = this.expresion.ejecutar(ent, arbol);
                if (valor instanceof Excepcion) return valor;
                tipoValor = this.expresion.getTipo(ent, arbol);
            } else {
                valor = this.expresion.getValorImplicito(ent, arbol);
                
                if (valor instanceof Excepcion) return valor;
                tipoValor = this.expresion.getTipo(ent, arbol);
            }   //ARREGLAR PARA UN STRING Y CHAR
            if (tipoValor == this.tipo || (tipoValor == Tipo.NULL && this.tipo == Tipo.STRING) || this.isDouble(tipoValor) || (tipoValor == Tipo.CHAR && this.tipo == Tipo.STRING)) {
                if (!ent.existeEnActual(this.identificador)) {
                    let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                    //if (this.tipo == Tipo.INT || this.tipo == Tipo.DOUBLE) {
                       /* if (this.expresion instanceof Operacion) {
                            let temp = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${this.expresion.etiqueta}`, `${arbol.posiciones}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[${temp}] = ${this.expresion.etiqueta} ;`);
                        } else if (this.expresion instanceof Primitivo) {
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${valor}`, `${arbol.posiciones}`, `${arbol.stack}`));
                        }
                    } else if (this.tipo == Tipo.STRING){
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
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    } else if (this.tipo == Tipo.CHAR){
                        if (this.expresion instanceof Operacion) {
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${this.expresion.etiqueta}`, `${arbol.posiciones}`, `${arbol.stack}`));
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
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }*/
                    //}

                    simbolo.posicion = arbol.posiciones++;
                    ent.agregar(this.identificador, simbolo);
                    //console.log(arbol.controlador);
                    return simbolo;
                } else {
                    return new Excepcion(this.linea, this.columna, "\nSemantico", "La variable ya existe");
                }
            } else {
                return new Excepcion(this.linea, this.columna, "\nSemantico", "El tipo asignado a la variable no es correcto");
            }
        } else {
            if (this.identificadores.length > 0) {
                for (let i in this.identificadores) {
                    let identificador = this.identificadores[i];
                    if (!ent.existe(identificador)) {
                        let simbolo: Simbolo = new Simbolo(this.tipo, identificador, this.linea, this.columna, null);
                        simbolo.posicion = arbol.posiciones++;
                        ent.agregar(identificador, simbolo);
                    } else {
                        return new Excepcion(this.linea, this.columna, "\nSemantico", "La variable ya existe");
                    }
                }
            }
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

    getTipoEnum(): number {
        return this.tipo;
    }

    getIdentificador(): string {
        return this.identificador;
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

    isDouble(tipoValor: any) {
        return tipoValor == Tipo.INT && this.tipo == Tipo.DOUBLE
    }
}

