import { Simbolo } from "./Simbolo";


export class Entorno{
    private anterior:Entorno;
    private tabla:{[id:string] : Simbolo};
    private entorno:string;

    constructor(anterior:any){
        this.tabla = {};
        this.anterior = anterior;
        this.entorno = '';
    }

    agregar(id:string, simbolo:Simbolo){


        simbolo.identificador = simbolo.identificador;

        this.tabla[id] = simbolo;
    }

    eliminar(id:string):boolean{

        for (let e:Entorno = this; e != null; e = e.anterior)
        {   
            const value = e.tabla[id]
            if (value!==undefined)
            {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }

    existe(id:string):boolean{

        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                return true;
            }
        }
        return false;
    }

    existeEnActual(id:string):boolean{

        if (this.tabla[id]!==undefined)
        {
            return true;
        }
        return false;
    }

    getSimbolo(id:string):any{

        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            if (e.tabla[id]!==undefined)
            {
                return e.tabla[id];
            }
        }
        return null;
    }

    reemplazar(id:string, nuevoValor:Simbolo){
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                e.tabla[id] = nuevoValor;
            }
        }
    }

    getTabla(){
        return this.tabla;
    }

    setEntorno(id:string){
        this.entorno = id;
    }

    getEntorno(){
        return this.entorno;
    }
}