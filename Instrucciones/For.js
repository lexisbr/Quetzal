"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Declaracion_1 = require("./Declaracion");
const Return_1 = require("./Return");
class For {
    constructor(instrucciones, valorInicial, condicion, asignacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.condicion = condicion;
        this.asignacion = asignacion;
        this.valorInicial = valorInicial;
    }
    ejecutar(ent, arbol) {
        let valorInicial;
        let isDeclaracion = false;
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        if (this.valorInicial instanceof Declaracion_1.Declaracion) {
            nuevoEntorno.setEntorno("For");
            valorInicial = this.valorInicial.ejecutar(nuevoEntorno, arbol);
            isDeclaracion = true;
        }
        else {
            valorInicial = this.valorInicial.ejecutar(ent, arbol);
        }
        if (valorInicial instanceof Excepcion_1.Excepcion)
            return valorInicial;
        console.log(valorInicial);
        while (true) {
            let condicion;
            if (isDeclaracion) {
                condicion = this.condicion.getValorImplicito(nuevoEntorno, arbol);
            }
            else {
                condicion = this.condicion.getValorImplicito(ent, arbol);
            }
            console.log("condicion", condicion);
            if (condicion instanceof Excepcion_1.Excepcion)
                return condicion;
            if (condicion == true || condicion == false) {
                if (condicion) {
                    let nuevoEntornoAux;
                    if (isDeclaracion) {
                        nuevoEntornoAux = new Entorno_1.Entorno(nuevoEntorno);
                    }
                    else {
                        nuevoEntornoAux = new Entorno_1.Entorno(ent);
                    }
                    console.log(this.instrucciones);
                    for (let i in this.instrucciones) {
                        let result = this.instrucciones[i].ejecutar(nuevoEntornoAux, arbol);
                        if (result instanceof Excepcion_1.Excepcion)
                            return result;
                        else if (result instanceof Return_1.Return)
                            return result;
                        else if (result instanceof Break_1.Break)
                            return;
                        else if (result instanceof Continue_1.Continue)
                            break;
                    }
                    console.log(this.asignacion);
                    this.asignacion.ejecutar(nuevoEntornoAux, arbol);
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La condicion del For no es de tipo Booleano");
            }
        }
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.For = For;
