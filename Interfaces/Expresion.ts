import { AST } from "../AST/AST.js";
import { Entorno } from "../AST/Entorno.js";
import { Tipo } from "../AST/Tipo.js";

export interface Expresion{
     linea:number;
     columna: number;
    
     getTipo(ent:Entorno, arbol:AST):Tipo ;
     getValorImplicito(ent:Entorno, arbol:AST):any;
     traducir(ent:Entorno, arbol:AST):any ;
     
}