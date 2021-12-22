"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Excepcion_1 = require("./Excepcion");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = [];
        this.consola = [];
        this.excepciones = [];
        this.tablas = [];
    }
    updateConsola(line) {
        this.consola.push(line);
    }
    getConsola() {
        return this.consola;
    }
    addFuncion(funcion) {
        if (this.getFuncion(funcion.getNombre()) == null) {
            this.funciones.push(funcion);
        }
        else {
            return new Excepcion_1.Excepcion(funcion.linea, funcion.columna, "Semantico", "La funcion ya existe");
        }
    }
    getFuncion(name) {
        for (let i in this.funciones) {
            let funcion = this.funciones[i];
            if (funcion.getNombre() === name) {
                return funcion;
            }
        }
        return null;
    }
    getStruct(identificador) {
        for (let i in this.structs) {
            let struct = this.structs[i];
            if (struct.getIdentificador() === identificador) {
                return struct;
            }
        }
        return null;
    }
    addStruct(struct) {
        if (this.getStruct(struct.getIdentificador()) == null) {
            this.structs.push(struct);
        }
        else {
            return new Excepcion_1.Excepcion(struct.linea, struct.columna, "Semantico", "El struct ya existe");
        }
    }
    addExcepcion(excepcion) {
        this.excepciones.push(excepcion);
    }
}
exports.AST = AST;
