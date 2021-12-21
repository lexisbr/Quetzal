import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Break } from "./Break";
import { Case } from "./Case";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class Switch implements Instruccion {
    linea: number;
    columna: number;
    expresion: Expresion;
    cases: Array<Case>;
    default_s: any;

    constructor(expresion: Expresion, cases: Array<Case>, default_s: any, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.cases = cases;
        this.default_s = default_s;

    }
    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        if (this.cases.length == 0) {
            if (this.default_s != null) {
                let result = this.default_s.ejecutar(ent, arbol);
                if (result instanceof Excepcion) return result;
            }
        } else {
            let match = false;
            let existingBreak = false;
            for (let i in this.cases) {
                let caseObj = this.cases[i];
                let expresionCase = this.cases[i].getExpresion().getValorImplicito(ent, arbol);
                if (expresionCase instanceof Excepcion) return expresionCase;

                let expresionSwitch = this.expresion.getValorImplicito(ent, arbol);

                if (expresionSwitch == expresionCase || match) {
                    let result = caseObj.ejecutar(ent, arbol);
                    match = true;
                    if (result instanceof Excepcion) return result;
                    else if (result instanceof Break) {
                        existingBreak = true;
                        break;
                    }
                    else if (result instanceof Return) return result;
                }
            }
            if (!existingBreak && this.default_s != null) {
                let result = this.default_s.ejecutar(ent, arbol);
                if (result instanceof Excepcion) return result;
                else if (result instanceof Return) return result;
            }
        }
    }



}