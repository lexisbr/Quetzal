import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class If implements Instruccion {
    linea: number;
    columna: number;
    condicion: Expresion;
    instrucciones_If: Array<Instruccion>;
    instrucciones_Else: Array<Instruccion>;

    constructor(condicion: Expresion, instrucciones_If: Array<Instruccion>, instrucciones_Else: Array<Instruccion>, linea: number, columna: number) {
        this.condicion = condicion;
        this.instrucciones_If = instrucciones_If;
        this.instrucciones_Else = instrucciones_Else;
        this.linea = linea;
        this.columna = columna;
    }


    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let entorno_Instrucciones = new Entorno(ent);
        let valor_Condicional = this.condicion.getValorImplicito(ent,arbol);
        if(this.condicion.getTipo(ent,arbol) == Tipo.BOOL){
            if(valor_Condicional){  //SI EL VALOR DE LA CONDICION SE CUMPLE
                for(let instrucciones of this.instrucciones_If){
                    let salidaInstrucciones = instrucciones.ejecutar(entorno_Instrucciones,arbol);
                    //BREAK

                }
            }
        }
/*
        if (this.expresion != null) {
            let valor = this.expresion.getValorImplicito(ent, arbol);
            const tipoValor = this.expresion.getTipo(ent, arbol);
            if (tipoValor == this.tipo || (tipoValor == Tipo.NULL && this.tipo == Tipo.STRING) || this.isDouble(tipoValor)) {
                if (!ent.existe(this.identificador)) {
                    let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                    ent.agregar(this.identificador, simbolo);
                } else {
                    return new Excepcion(this.linea, this.columna, "Semantico", "La variable ya existe");
                }
            } else {
                return new Excepcion(this.linea, this.columna, "Semantico", "El tipo asignado a la variable no es correcto");
            }
        } else {
            if (!ent.existe(this.identificador)) {
                let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, null);
                ent.agregar(this.identificador, simbolo);
            } else {
                return new Excepcion(this.linea, this.columna, "Semantico", "La variable ya existe");
            }
        }
    }
*/
    }
    getTipo(ent: Entorno, arbol: AST): Tipo {
        let type_Condicional = this.condicion.getTipo(ent,arbol);
        if(type_Condicional == Tipo.BOOL){
            return type_Condicional;
        } else {
            return Tipo.VOID;
        }
    }


}