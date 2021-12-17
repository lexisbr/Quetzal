import { Quadrupla } from "./Quadrupla";

export class QuadControlador{
    quads: Quadrupla[]; // ARREGLO DE QUADRUPLAS
    labels: number[];   //ARREGLO DE ETIQUETAS
    temps: number[];    //ARREGLO DE TEMPORALES
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
     constructor() {//sm: SemanticHandler, blocks: CodeBlock[]

		this.quads = [];
		this.labels = [];
		this.temps = [];
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