import { AST } from "../../AST/AST";
import { Entorno } from "../../AST/Entorno";
import { Tipo } from "../../AST/Tipo";
import { Expresion } from "../../Interfaces/Expresion";
import { Excepcion } from "../../AST/Excepcion";
import { QuadControlador } from "../../Traductor/QuadControlador";
import { Quadrupla } from "../../Traductor/Quadrupla";



export class TipoParse implements Expresion {
    linea: number;
    columna: number;
    expresion: Expresion;
    tipoParse: Tipo;


    constructor(tipoParse: Tipo, expresion: Expresion, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.tipoParse = tipoParse;
        this.expresion = expresion;
    }
    traducir(controlador:QuadControlador):Quadrupla|undefined{
        return;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo.CHAR;
            }
            return Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo.INT;
            }
            return Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo.NULL;
        }

        return Tipo.VOID;
    }


    getValorImplicito(ent: Entorno, arbol: AST) {

            let valor = this.expresion.getValorImplicito(ent, arbol);
            let tipoValor = this.expresion.getTipo(ent, arbol);
            console.log(valor);
            
            //PARSE INT
            if (tipoValor == Tipo.STRING) 
            {
                if(Number(valor) != NaN)
                {
                    if (this.tipoParse === Tipo.INT) {
                        return parseInt(valor);
                    } else if (this.tipoParse === Tipo.DOUBLE) {
                        return parseFloat(valor);
                    } else if (this.tipoParse === Tipo.BOOL) {
                        if(valor == "1"){
                            return true;
                        } else if (valor == "0"){
                            return false;
                        } else
                        {
                            return new Excepcion(this.linea, this.columna, "Semantico", "No es posible convertir a Boolean la cadena ingresada");
                        }
                    } else {
                        return new Excepcion(this.linea, this.columna, "Semantico", "La Funcion Parse no existe para este tipo de dato");
                    }
                } else {
                        return new Excepcion(this.linea, this.columna, "Semantico", "Cadena Erronea para Funcion Parse, solo permite numeros");

                }
            } else {
                
                return new Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Funcion Parse, la Expresion no es de Tipo String");

                
            }

    }


    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

    isChar(cadena: string) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}