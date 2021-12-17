import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { QuadControlador } from "../Traductor/QuadControlador";
import { Quadrupla } from "../Traductor/Quadrupla";

export interface Expresion{
     linea:number;
     columna: number;
    
     getTipo(ent:Entorno, arbol:AST):Tipo ;
     getValorImplicito(ent:Entorno, arbol:AST):any;
     traducir(controlador: QuadControlador):Quadrupla | undefined;  //CODIGO EN 3D
     
}