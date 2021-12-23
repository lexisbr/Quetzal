"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Return_1 = require("./Return");
class Main {
    constructor(instrucciones, linea, columna) {
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, arbol) {
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        nuevoEntorno.setEntorno("Main");
        arbol.tablas.push(nuevoEntorno); //GUARDANDO LAS TS PARA EL RECORRIDO EN 3D
        for (let i in this.instrucciones) {
            if (!(this.instrucciones[i] instanceof Excepcion_1.Excepcion)) {
                let value = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
                console.log(nuevoEntorno.getTabla());
                if (value instanceof Excepcion_1.Excepcion) {
                    arbol.addExcepcion(value);
                    arbol.updateConsola("\n" + value.toString());
                }
                else if (value instanceof Return_1.Return) {
                    if (value.getTipo() == Tipo_1.Tipo.VOID)
                        return this;
                    else
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Main no puede retornar un valor", nuevoEntorno.getEntorno());
                }
            }
            else {
                arbol.addExcepcion(this.instrucciones[i]);
                arbol.updateConsola("\n" + this.instrucciones[i].toString());
            }
        }
    }
    traducir(controlador) {
        var _a;
        controlador.actual = (_a = controlador.arbol.tablas.shift()) !== null && _a !== void 0 ? _a : new Entorno_1.Entorno(null); //VERIFICA QUE EL ENTORNO NO SE UNDEFINED
        this.instrucciones.forEach(instruccion => {
            instruccion.traducir(controlador);
        });
    }
}
exports.Main = Main;
