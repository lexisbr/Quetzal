import { Instruccion } from "../Interfaces/Instruccion";
import { Funcion } from "../Instrucciones/Funcion";
import { Excepcion } from "./Excepcion";

export class AST{
    
    public instrucciones:Array<Instruccion>;
    public structs: Array<any>;
    public funciones: Array<Funcion>;
    public excepciones: Array<Excepcion>;
    public consola: Array<any>;

    constructor(instrucciones:Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = [];
        this.consola = [];
        this.excepciones = [];
    }

    updateConsola(line:string){
        this.consola.push(line);
    }

    getConsola(){
        return this.consola;
    }

    addFuncion(funcion:Funcion){
        this.funciones.push(funcion);
    }

    getFuncion(name:string){
        for(let i in this.funciones) {
            let funcion:Funcion = this.funciones[i];
            if(funcion.getNombre() === name){
                return funcion;
            }
        }
        return null;
    }

    addExcepcion(excepcion:Excepcion){
        this.excepciones.push(excepcion);
    }

}