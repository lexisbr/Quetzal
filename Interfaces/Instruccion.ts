import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { QuadControlador } from "../Traductor/QuadControlador";

export interface Instruccion{
     linea:number;
     columna: number;
    
     ejecutar(ent:Entorno, arbol:AST):any ;  //INTERPRETE
     traducir(controlador: QuadControlador):any ;  //CODIGO EN 3D
}