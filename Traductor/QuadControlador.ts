import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Quadrupla } from "./Quadrupla";

export class QuadControlador{
    quads: Quadrupla[]; // ARREGLO DE QUADRUPLAS
    labels: number;   //ARREGLO DE ETIQUETAS
    temps: number;    //ARREGLO DE TEMPORALES
    codigo3D: Array<string>;
	arbol: AST;
	actual: Entorno;

     constructor(arbol: AST) {

		this.quads = [];
		this.labels = 0;
		this.temps = 0;
		this.codigo3D = [];
        this.arbol = arbol;
		this.actual = new Entorno(null);
    }

	getTemp(): string{	//AUMENTAR LOS TEMPORALES EXISTENTES
		return `t${this.temps++}`;
	}

	getLabel(): string{	//AUMENTAR LOS LABELS EXISTENTES
		return `L${this.labels++}`;
	}

	addQuad(quad: Quadrupla): void {
		this.quads.push(quad);
	}
}