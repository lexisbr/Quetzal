"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadControlador = void 0;
class QuadControlador {
    /*
        isTrue: Quadrupla[] //ARREGLO PARA IF/ELSE/SWITCH
        isFalse: Quadrupla[];
        breaks: Quadrupla[];
        continues: Quadrupla[];
    
        tables: SymbolTable[];
         stack: SymbolTable[];
    
        labelTrue: string | undefined;
        labelFalse: string | undefined;
    
         sm: SemanticHandler;
         blocks: CodeBlock[];
    
         quadReturn?: Quadrupla;
         returns: Quadrupla[];
    */
    constructor(arbol) {
        this.quads = [];
        this.labels = [];
        this.temps = [];
        this.arbol = arbol;
        /*
        this.isTrue = [];
        this.isFalse = [];
        this.breaks = [];
        this.continues = [];
        this.stack = [];
        this.returns = [];
        */
    }
}
exports.QuadControlador = QuadControlador;
