import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Excepcion } from "../AST/Excepcion";
import { Funcion } from "./Funcion";
import { Expresion } from "../Interfaces/Expresion";
import { Simbolo } from "../AST/Simbolo";
import { QuadControlador } from "../Traductor/QuadControlador";

export class Llamada implements Instruccion {
    nombre: string;
    parametros: Array<Expresion>;
    linea: number;
    columna: number;

    constructor(nombre: string, parametros: Array<Expresion>, linea: number, columna: number){
        this.nombre = nombre;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let funcion:any = arbol.getFuncion(this.nombre);
        if(funcion === null){
            return new Excepcion (this.linea,this.columna,"Error Semantico","La funcion llamada no existe",ent.getEntorno());
        }
        
        let nuevoEntorno = new Entorno(ent);
        arbol.tablas.push(nuevoEntorno);    //REVISAR POR QUE SE CREA UN NUEVO ENTORNO
        let parametrosFuncion = funcion.getParametros();
        if(this.parametros.length == parametrosFuncion.length){
            for(let i in this.parametros){
                let expresion = this.parametros[i];
                let expresionValue:any = expresion.getValorImplicito(ent, arbol);
                if(expresionValue instanceof Excepcion){
                    return expresionValue;
                }
                let expresionTipo = expresion.getTipo(ent, arbol);
                let parametroTipo = parametrosFuncion[i].getTipoEnum();

                if(expresionTipo == parametroTipo || (expresionTipo == Tipo.INT && parametroTipo == Tipo.DOUBLE)){
                    let simbolo:Simbolo = new Simbolo(parametroTipo,parametrosFuncion[i].getIdentificador(),this.linea,this.columna,expresionValue);
                    nuevoEntorno.agregar(simbolo.getIdentificador(),simbolo);
                }else{
                    return new Excepcion (this.linea,this.columna,"Error Semantico","La tipos en la llamada no coinciden",nuevoEntorno.getEntorno());
                }
            }

        }else{
            return new Excepcion (this.linea,this.columna,"Error Semantico","La cantidad de parametros no es correcta",nuevoEntorno.getEntorno());
        }

        let result = funcion.ejecutar(nuevoEntorno, arbol);

        if(result instanceof Excepcion) return result;

        return result;
       
    }
    
    traducir(controlador:QuadControlador) {
        throw new Error("Method not implemented.");
    }
    
    getTipo(ent: Entorno, arbol: AST) {
        let funcion:any = arbol.getFuncion(this.nombre);
        return funcion.getTipo();
    }

    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.ejecutar(ent, arbol);
    }


}