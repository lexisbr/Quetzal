import { Instruccion } from "../Interfaces/Instruccion";

export class AST{
    
    public instrucciones:Array<Instruccion>;
    public structs: Array<any>;
    public funciones: Array<any>;
    public consola: Array<any>;

    constructor(instrucciones:Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = [];
        this.consola = [];
    }

    updateConsola(line:string){
        this.consola.push(line);
    }

    getConsola(){
        return this.consola;
    }
}