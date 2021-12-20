
export class Quadrupla {
    operacion : string;
    arg1: string;
    arg2: string;
    resultado: string;

    constructor(operacion:string, arg1:string, arg2:string, resultado: string){
        this.operacion = operacion;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.resultado = resultado;
    }

    toString(): string{
        return `operacion: ${this.operacion}, arg1: ${this.arg1}, arg2 ${this.arg2}, resultado: ${this.resultado}`;
    }

}