"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Entorno_1 = require("../AST/Entorno");
const Tipo_1 = require("../AST/Tipo");
class If {
    constructor(condicion, instrucciones_If, instrucciones_Else, linea, columna) {
        this.condicion = condicion;
        this.instrucciones_If = instrucciones_If;
        this.instrucciones_Else = instrucciones_Else;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let entorno_Instrucciones = new Entorno_1.Entorno(ent);
        let valor_Condicional = this.condicion.getValorImplicito(ent, arbol);
        if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
            if (valor_Condicional) { //SI EL VALOR DE LA CONDICION SE CUMPLE
                for (let instrucciones of this.instrucciones_If) {
                    let salidaInstrucciones = instrucciones.ejecutar(entorno_Instrucciones, arbol);
                    //BREAK
                }
            }
        }
        /*
                if (this.expresion != null) {
                    let valor = this.expresion.getValorImplicito(ent, arbol);
                    const tipoValor = this.expresion.getTipo(ent, arbol);
                    if (tipoValor == this.tipo || (tipoValor == Tipo.NULL && this.tipo == Tipo.STRING) || this.isDouble(tipoValor)) {
                        if (!ent.existe(this.identificador)) {
                            let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                            ent.agregar(this.identificador, simbolo);
                        } else {
                            return new Excepcion(this.linea, this.columna, "Semantico", "La variable ya existe");
                        }
                    } else {
                        return new Excepcion(this.linea, this.columna, "Semantico", "El tipo asignado a la variable no es correcto");
                    }
                } else {
                    if (!ent.existe(this.identificador)) {
                        let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, null);
                        ent.agregar(this.identificador, simbolo);
                    } else {
                        return new Excepcion(this.linea, this.columna, "Semantico", "La variable ya existe");
                    }
                }
            }
        */
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
