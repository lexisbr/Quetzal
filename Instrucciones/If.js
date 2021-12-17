"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Return_1 = require("./Return");
class If {
    constructor(condicion, instruccionesIf, instruccionesElse, elseIf, linea, columna) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.instruccionesElse = instruccionesElse;
        this.elseIf = elseIf;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let condicion = this.condicion.getValorImplicito(ent, arbol);
        if (condicion instanceof Excepcion_1.Excepcion)
            return condicion;
        if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
            if (condicion) { //SI EL VALOR DE LA CONDICION SE CUMPLE
                let nuevoEntorno = new Entorno_1.Entorno(ent);
                nuevoEntorno.setEntorno("If");
                for (let i in this.instruccionesIf) {
                    let instruccion = this.instruccionesIf[i];
                    let result = instruccion.ejecutar(nuevoEntorno, arbol);
                    console.log(result);
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    else if (result instanceof Return_1.Return)
                        return result;
                }
            }
            else {
                if (this.instruccionesElse != null) {
                    let nuevoEntorno = new Entorno_1.Entorno(ent);
                    nuevoEntorno.setEntorno("Else");
                    for (let i in this.instruccionesElse) {
                        let instruccion = this.instruccionesElse[i];
                        let result = instruccion.ejecutar(nuevoEntorno, arbol);
                        console.log("Else", result);
                        if (result instanceof Excepcion_1.Excepcion)
                            return result;
                        else if (result instanceof Return_1.Return)
                            return result;
                    }
                }
                else if (this.elseIf != null) {
                    let result = this.elseIf.ejecutar(ent, arbol);
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    else if (result instanceof Return_1.Return)
                        return result;
                }
            }
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La condicion en If debe ser booleana");
        }
    }
    getTipo(ent, arbol) {
        let type_Condicional = this.condicion.getTipo(ent, arbol);
        if (type_Condicional == Tipo_1.Tipo.BOOL) {
            return type_Condicional;
        }
        else {
            return Tipo_1.Tipo.VOID;
        }
    }
}
exports.If = If;
