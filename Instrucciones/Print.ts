import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Operador } from "../AST/Operador";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Identificador } from "../Expresiones/Identificador";
import { Primitivo } from "../Expresiones/Primitivo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";

// print("hola mundo");

export class Print implements Instruccion {
    linea: number;
    columna: number;
    public expresion: Array<Expresion>;
    salto: boolean;

    constructor(exp: Array<Expresion>, linea: number, columna: number, salto: boolean) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }

    traducir(controlador: QuadControlador) {
        this.expresion.forEach(element => {
            const tmpQ: Quadrupla | undefined = element.traducir(controlador);
            let valor = element.getValorImplicito(controlador.actual, controlador.arbol);
            let tipoValor = element.getTipo(controlador.actual, controlador.arbol);
            if (tmpQ) {
                if (tipoValor == Tipo.INT || tipoValor == Tipo.DOUBLE || tipoValor == Tipo.BOOL) {
                    controlador.addQuad(new Quadrupla("PRINTF", "%f", "(double)" + tmpQ.resultado, ""));
                } else if (tipoValor == Tipo.STRING) {
                    if (element instanceof Primitivo) {
                        const tmp = controlador.getTemp();
                        const tmp2 = controlador.getTemp();
                        controlador.addQuad(new Quadrupla(`ASSIGN`, `H`, ``, `${tmp}`));
                        for (let i = 0; i < valor.length; i++) {
                            controlador.addQuad(new Quadrupla(`ASSIGN`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[(int)H]`));
                            controlador.addQuad(new Quadrupla(Operador.SUMA, `H`, `1`, `H`));
                        }
                        controlador.addQuad(new Quadrupla(`ASSIGN`, `-1`, ``, `${controlador.arbol.heap}[(int)H]`));
                        controlador.addQuad(new Quadrupla(`+`, `H`, `1`, `H`));
                        controlador.addQuad(new Quadrupla(`+`, `P`, `${controlador.arbol.posiciones}`, `${tmp2}`));
                        controlador.addQuad(new Quadrupla(`ASSIGN`, `${tmp}`, ``, `${controlador.arbol.stack}[(int)${tmp2}]`));
                        controlador.addQuad(new Quadrupla(Operador.SUMA, "P", `${controlador.arbol.posiciones}`, "P"));
                        let existe = false;
                        controlador.quads.forEach(element => {
                            if (element.arg1 == "imprimir_cadena") {
                                existe = true;
                            }
                        });
                        if (!existe) {
                            controlador.addQuad(new Quadrupla("CALL", "imprimir_cadena", `${controlador.temps}`, ""));
                            controlador.temps += 2;
                        } else {
                            controlador.addQuad(new Quadrupla("CALL", "imprimir_cadena", `-`, ""));
                        }
                        controlador.addQuad(new Quadrupla(Operador.RESTA, "P", `${controlador.arbol.posiciones}`, "P"));
                    } else if (element instanceof Identificador) {
                        const simbolo: Simbolo = controlador.actual.getSimbolo(element.identificador);
                        controlador.addQuad(new Quadrupla(Operador.SUMA, "P", `${simbolo.posicion}`, "P"));
                        let existe = false;
                        controlador.quads.forEach(element => {
                            if (element.arg1 == "imprimir_cadena") {
                                existe = true;
                            }
                        });
                        controlador.addQuad(new Quadrupla("CALL", "imprimir_cadena", `${controlador.temps}`, ""));
                        if (!existe) {
                            controlador.temps += 2;
                        }
                        controlador.addQuad(new Quadrupla(Operador.RESTA, "P", `${simbolo.posicion}`, "P"));
                    }
                }
            }
        });

        if (this.salto) {
            controlador.addQuad(new Quadrupla("PRINTF", '%c', "((char)10)", ""));
        }
    }
    
    ejecutar(ent: Entorno, arbol: AST) {
        
        this.expresion.forEach(element => {
            let valor = element.getValorImplicito(ent, arbol);
            //valor = this.addSalto(valor);
            arbol.updateConsola(valor);
        });
        if(this.salto){
        arbol.updateConsola("\n");
        }
    }

    addSalto(valor: any) {
        return this.salto ? valor + "\n" : valor;
    }

}