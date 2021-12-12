
export class Excepcion {
    linea:number;
    columna:number;
    tipo:string;
    descripcion:string;

    constructor(linea:number, columna:number, tipo:string, descripcion:string){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }

    toString():string{
        return `${this.tipo} - ${this.descripcion} [${this.linea},${this.columna}]\n`
    }

}