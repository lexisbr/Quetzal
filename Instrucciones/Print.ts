import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";

// print("hola mundo");

export class Print implements Instruccion {
    linea: number;
    columna: number;
    expresiones: Array<Expresion>;
    salto: boolean;

    constructor(expresiones: Array<Expresion>, linea: number, columna: number, salto: boolean) {
        this.expresiones = expresiones;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }

    traducir(controlador:QuadControlador) {
		this.expresion.forEach(element => {
			const tmpQ: Quadrupla | undefined = element.traducir(controlador);
			if(tmpQ) {
				controlador.addQuad(new Quadrupla("PRINTF", tmpQ.resultado, "", ""));
			}
		});

		if(this.salto) {
			controlador.addQuad(new Quadrupla("PRINTF", "\n", "", ""));
		}
	}

    ejecutar(ent: Entorno, arbol: AST) {
        
        this.expresion.forEach(element => {
            let valor = element.getValorImplicito(ent, arbol);
            arbol.updateConsola(valor);
        });
        if(this.salto){
        arbol.updateConsola("\n");
        }
    }

    addSalto(valor: any) {
        return this.salto ? valor + "\n" : valor;
    }

}
