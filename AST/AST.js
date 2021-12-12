"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = [];
        this.consola = [];
    }
    updateConsola(line) {
        this.consola.push(line);
    }
    getConsola() {
        return this.consola;
    }
}
exports.AST = AST;
