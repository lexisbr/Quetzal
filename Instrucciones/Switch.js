"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Break_1 = require("./Break");
const Return_1 = require("./Return");
class Switch {
    constructor(expresion, cases, default_s, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.cases = cases;
        this.default_s = default_s;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        if (this.cases.length == 0) {
            if (this.default_s != null) {
                let result = this.default_s.ejecutar(ent, arbol);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
        }
        else {
            let match = false;
            let existingBreak = false;
            for (let i in this.cases) {
                let caseObj = this.cases[i];
                let expresionCase = this.cases[i].getExpresion().getValorImplicito(ent, arbol);
                if (expresionCase instanceof Excepcion_1.Excepcion)
                    return expresionCase;
                let expresionSwitch = this.expresion.getValorImplicito(ent, arbol);
                if (expresionSwitch == expresionCase || match) {
                    let result = caseObj.ejecutar(ent, arbol);
                    match = true;
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    else if (result instanceof Break_1.Break) {
                        existingBreak = true;
                        break;
                    }
                    else if (result instanceof Return_1.Return)
                        return result;
                }
            }
            if (!existingBreak && this.default_s != null) {
                let result = this.default_s.ejecutar(ent, arbol);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
                else if (result instanceof Return_1.Return)
                    return result;
            }
        }
    }
}
exports.Switch = Switch;
