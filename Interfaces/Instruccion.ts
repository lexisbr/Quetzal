import { AST } from "../AST/AST.js";
import { Entorno } from "../AST/Entorno.js";

export interface Instruccion{
     linea:number;
     columna: number;
    
     ejecutar(ent:Entorno, arbol:AST):any ;
     traducir(ent:Entorno, arbol:AST):any ;
}