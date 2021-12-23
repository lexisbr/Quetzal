import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo.js";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";
import { Operacion } from "../Expresiones/Operacion";
import { Primitivo } from "../Expresiones/Primitivo";
import { Operador } from "../AST/Operador";

export class Asignacion implements Instruccion {
    linea: number;
    columna: number;
    expresion: Expresion;
    identificador: string;

    constructor(identificador: string, exp: Expresion, linea: number, columna: number) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
    }

  
    traducir(controlador: QuadControlador) {
        const variable: Simbolo = controlador.actual.getSimbolo(this.identificador);
        let simboloValor = variable.getTipo(controlador.actual, controlador.arbol);
        let valor = this.expresion.getValorImplicito(controlador.actual, controlador.arbol);
        if (simboloValor == Tipo.STRING) {
            const tmp = controlador.getTemp();
            const tmp2 = controlador.getTemp();
            controlador.addQuad(new Quadrupla(`ASSIGN`, `H`, ``, `${tmp}`));
            for (let i = 0; i < valor.length; i++) {
                controlador.addQuad(new Quadrupla(`=`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[H]`));
                controlador.addQuad(new Quadrupla(Operador.SUMA.toString(), `1`, `H`, `H`));
            }
            controlador.addQuad(new Quadrupla(`=`, `-1`, `H`, `${controlador.arbol.heap}`));
            controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
            controlador.addQuad(new Quadrupla(`+`, `P`, `${variable.posicion.toString()}`, `${tmp2}`));
            controlador.addQuad(new Quadrupla(`=`, `${tmp}`, ``, `${controlador.arbol.stack}[${tmp2}]`));
            console.log(controlador);
        } else if (simboloValor == Tipo.INT || simboloValor == Tipo.DOUBLE) {
            const tmp = controlador.getTemp();
            controlador.addQuad(new Quadrupla(Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp));
            const quad_expr = this.expresion.traducir(controlador);
            const res = (quad_expr) ? quad_expr.resultado : "";
            controlador.addQuad(new Quadrupla("ASSIGN", res, "", controlador.arbol.stack + "[" + tmp + "]"));
        }
        return;
    }


    ejecutar(ent: Entorno, arbol: AST) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (!(valor instanceof Excepcion)) {
            if (ent.existe(this.identificador)) {
                let simbolo:Simbolo = ent.getSimbolo(this.identificador);
                let simboloValor = simbolo.getTipo(ent,arbol);
                if( simboloValor == tipoValor || (tipoValor == Tipo.NULL && simboloValor == Tipo.STRING)|| (tipoValor == Tipo.INT && simboloValor == Tipo.DOUBLE) || (tipoValor == Tipo.CHAR && simboloValor == Tipo.STRING)) {
                    simbolo.setValor(valor);
                    ent.reemplazar(this.identificador, simbolo);
                    return simbolo;
                }else{
                    return new Excepcion(this.linea, this.columna, "Error Semantico", "Los tipos no coinciden",ent.getEntorno());
                }
            } else {
                return new Excepcion(this.linea, this.columna, "Error Semantico", "La variable no esta definida",ent.getEntorno());
            }

        } else {
            return valor;
        }
    }

    isDouble(tipoValor:any, simboloValor:any){
        return tipoValor == Tipo.INT && simboloValor == Tipo.DOUBLE;
    }


}