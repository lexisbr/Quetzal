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
        throw new Error("Method not implemented.");
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
                    if (this.tipo == Tipo.INT || this.tipo == Tipo.DOUBLE) {
                        if (this.expresion instanceof Operacion) {
                            let temp = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${this.expresion.etiqueta}`, `${arbol.posiciones}`, `STACK`));
                            arbol.controlador.codigo3D.push(`STACK[${temp}] = ${this.expresion.etiqueta} ;`);
                        } else if (this.expresion instanceof Primitivo) {
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${valor}`, `${arbol.posiciones}`, `STACK`));
                        }
                    } else if (this.tipo == Tipo.STRING){
                        if (this.expresion instanceof Operacion || this.expresion instanceof Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            for (let i = 0; i < valor.length; i++){
                                arbol.controlador.addQuad(new Quadrupla(`=`, `${valor.charCodeAt(i)}`, `H`, `heap`));
                                arbol.controlador.codigo3D.push(`heap[(int)H] = ${valor.charCodeAt(i)} ;`);
                                arbol.controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
                                arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            }
                            arbol.controlador.addQuad(new Quadrupla(`=`, `-1`, `H`, `heap`));
                            arbol.controlador.codigo3D.push(`heap[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${temp}`, `${temp2}`, `stack`));
                            arbol.controlador.codigo3D.push(`stack[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    } else if (this.tipo == Tipo.CHAR){
                        if (this.expresion instanceof Operacion) {
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${this.expresion.etiqueta}`, `${arbol.posiciones}`, `stack`));
                        } else if (this.expresion instanceof Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${valor.charCodeAt(0)}`, `H`, `heap`));
                            arbol.controlador.codigo3D.push(`heap[(int)H] = ${valor.charCodeAt(0)} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`=`, `-1`, `H`, `heap`));
                            arbol.controlador.codigo3D.push(`heap[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${temp}`, `${temp2}`, `stack`));
                            arbol.controlador.codigo3D.push(`stack[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }

                    simbolo.posicion = arbol.posiciones++;
                    ent.agregar(this.identificador, simbolo);
                    console.log(arbol.controlador);
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

