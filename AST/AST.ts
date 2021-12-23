import { Instruccion } from "../Interfaces/Instruccion";
import { Funcion } from "../Instrucciones/Funcion";
import { Excepcion } from "./Excepcion";
import { Entorno } from "./Entorno";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Struct } from "../Instrucciones/Struct";

export class AST {

    public instrucciones: Array<Instruccion>;
    public structs: Array<Struct>;
    public funciones: Array<Funcion>;
    public excepciones: Array<Excepcion>;
    public consola: Array<any>;
    public tablas: Entorno[];
    public controlador: QuadControlador;
    public posiciones: number;
    public stack = "STACK";
    public heap = "HEAP";

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = [];
        this.consola = [];
        this.excepciones = [];
        this.tablas = [];
        this.controlador = new QuadControlador(this);
        this.posiciones = 0;
    }

    updateConsola(line: string) {
        this.consola.push(line);
    }

    getConsola() {
        return this.consola;
    }

    addFuncion(funcion: Funcion) {
        if (this.getFuncion(funcion.getNombre()) == null) {
            this.funciones.push(funcion);
        }else{
            return new Excepcion(funcion.linea,funcion.columna,"Error Semantico","La funcion ya existe","Global");
        }
    }

    getFuncion(name: string) {
        for (let i in this.funciones) {
            let funcion: Funcion = this.funciones[i];
            if (funcion.getNombre() === name) {
                return funcion;
            }
        }
        return null;
    }

    getStruct(identificador: string) {
        for (let i in this.structs) {
            let struct: Struct = this.structs[i];
            if (struct.getIdentificador() === identificador) {
                return struct;
            }
        }
        return null;
    }

    addStruct(struct: Struct) {
        if (this.getStruct(struct.getIdentificador()) == null) {
            this.structs.push(struct);
        }else{
            return new Excepcion(struct.linea,struct.columna,"Error Semantico","El struct ya existe","Global");
        }
    }

    addExcepcion(excepcion: Excepcion) {
        this.excepciones.push(excepcion);
    }

    getExcepciones(){
        return this.excepciones;
    }

}
