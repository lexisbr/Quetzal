/**else if(typeof(op1 === "string") && typeof(op2==="string")){
    return op1 + op2;
}else
{
    if(typeof(op1!=="number") || typeof(op2!=="number")){
        return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Operacion Suma (+)");
    } else if(typeof(op1!=="string") || typeof(op2!=="string")){
        return new Excepcion(this.linea,this.columna,"Semantico","Tipo de Dato Erroneo para Concatenacion (&)");  
    } 
}
*/