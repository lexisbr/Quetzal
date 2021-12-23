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
                 controlador.addQuad(new Quadrupla(`ASSIGN`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[(int)H]`));
                 controlador.addQuad(new Quadrupla(Operador.SUMA, `H`, `1`, `H`));
             }
             controlador.addQuad(new Quadrupla(`ASSIGN`, `-1`, ``, `${controlador.arbol.heap}[(int)H]`));
             controlador.addQuad(new Quadrupla(`+`, `H`, `1`, `H`));
             controlador.addQuad(new Quadrupla(`+`, `P`, `${variable.posicion.toString()}`, `${tmp2}`));
             controlador.addQuad(new Quadrupla(`ASSIGN`, `${tmp}`, ``, `${controlador.arbol.stack}[(int)${tmp2}]`));
             console.log(controlador);
         } else if (simboloValor == Tipo.INT || simboloValor == Tipo.DOUBLE || simboloValor == Tipo.BOOL) {
             const tmp = controlador.getTemp();
             controlador.addQuad(new Quadrupla(Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp));
             const quad_expr = this.expresion.traducir(controlador);
             const res = (quad_expr) ? quad_expr.resultado : "";
             controlador.addQuad(new Quadrupla("ASSIGN", res, "", controlador.arbol.stack + "[(int)" + tmp + "]"));
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
                    simbolo.posicion = arbol.posiciones++;
                    ent.agregar(this.identificador, simbolo);
                    return simbolo;
                } else {
                    return new Excepcion(this.linea, this.columna, "Error Semantico", "La variable ya existe",ent.getEntorno());
                }
            } else {
                return new Excepcion(this.linea, this.columna, "Error Semantico", "El tipo asignado a la variable no es correcto",ent.getEntorno());
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
                        return new Excepcion(this.linea, this.columna, "Error Semantico", "La variable ya existe",ent.getEntorno());
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

