"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadControlador = void 0;
const Entorno_1 = require("../AST/Entorno");
class QuadControlador {
    constructor(arbol) {
        this.quads = [];
        this.labels = 0;
        this.temps = 0;
        this.codigo3D = [];
        this.arbol = arbol;
        this.actual = new Entorno_1.Entorno(null);
    }
    getTemp() {
        return `t${this.temps++}`;
    }
    getLabel() {
        return `L${this.labels++}`;
    }
    addQuad(quad) {
        this.quads.push(quad);
    }
}
exports.QuadControlador = QuadControlador;
