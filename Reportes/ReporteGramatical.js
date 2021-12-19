"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReporteGramatical = void 0;
class ReporteGramatical {
    /* constructor(listaGramatica: Array<string>){
         this.listaGramatica = listaGramatica;
     }
     */
    constructor() {
        this.listaGramatica = [];
    }
    getGramatica() {
        return this.listaGramatica;
    }
    setGramatica(gramatica) {
        this.listaGramatica.push(gramatica);
    }
}
exports.ReporteGramatical = ReporteGramatical;
