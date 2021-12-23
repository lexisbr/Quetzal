const AST = require("./AST/AST.js");
const Entorno = require("./AST/Entorno.js");
const Instruccion = require("./Interfaces/Instruccion.js");
const Excepcion = require("./AST/Excepcion.js");
const Funcion = require("./Instrucciones/Funcion.js");
const Declaracion = require("./Instrucciones/Declaracion.js");
const Main = require("./Instrucciones/Main.js");
const Return = require("./Instrucciones/Return.js");

const grammar = require("./Gramatica/grammar.js");
const { Operador } = require("./AST/Operador.js");

const { QuadControlador } = require("./Traductor/QuadControlador.js");


if (typeof window !== 'undefined') {
    window.parseExternal = function (input) {
        const instrucciones = grammar.parse(input);
        const ast = new AST.AST(instrucciones);
        const entornoGlobal = new Entorno.Entorno(null);
        const controlador = new QuadControlador(ast);
        ast.tablas.push(entornoGlobal); //GUARDO EL ENTORNO/TABLA PARA EL CODIGO EN 3D
        //console.log(ast.tablas);
        ast.instrucciones.forEach(function (element) {
            let value;
            if (element instanceof Funcion.Funcion) {
                ast.addFuncion(element);

            } else if (element instanceof Declaracion.Declaracion) {

                value = element.ejecutar(entornoGlobal, ast);
            }

            if (value instanceof Excepcion.Excepcion) {
                ast.updateConsola(value);
            }
        });

        let main = false;
        let main1;
        ast.instrucciones.forEach(function (element) {
            let value;
            if (element instanceof Main.Main) {
                if (main == false) {
                    value = element.ejecutar(entornoGlobal, ast);
                    main = true;
                    if (value instanceof Excepcion.Excepcion) {
                        ast.addExcepcion(value);
                        ast.updateConsola(value);
                    } 
                    main1 = element;
                }else{
                    let excepcion = new Excepcion.Excepcion(value.linea,value.columna,"\nSemantico","Existe mas de una funcion Main")
                    ast.addExcepcion(excepcion);
                    ast.updateConsola(excepcion);
                    return;
                }
            } 
            
        });

        ast.instrucciones.forEach(function (element) {
            if (!(element instanceof Main.Main || element instanceof Declaracion.Declaracion || element instanceof Funcion.Funcion)) {
                let excepcion = new Excepcion.Excepcion(element.linea,element.columna,"\nSemantico","Sentencias fuera de Main")
                ast.addExcepcion(excepcion);
                ast.updateConsola(excepcion)
            } 
            
        });

       
        return ast.getConsola();
    }
}
if (typeof window !== 'undefined') {
    window.traducirExternal = function (input) {
        const instrucciones = grammar.parse(input);
        const ast = new AST.AST(instrucciones);
        const entornoGlobal = new Entorno.Entorno(null);
        const controlador = new QuadControlador(ast);
        ast.tablas.push(entornoGlobal); //GUARDO EL ENTORNO/TABLA PARA EL CODIGO EN 3D
        //console.log(ast.tablas);
        ast.instrucciones.forEach(function (element) {
            let value;
            if (element instanceof Funcion.Funcion) {
                ast.addFuncion(element);

            } else if (element instanceof Declaracion.Declaracion) {

                value = element.ejecutar(entornoGlobal, ast);
            }

            if (value instanceof Excepcion.Excepcion) {
                ast.updateConsola(value);
            }

        });

        let main = false;

        ast.instrucciones.forEach(function (element) {
            let value;
            if (element instanceof Main.Main) {
                if (main == false) {
                    value = element.ejecutar(entornoGlobal, ast);
                    main = true;
                    if (value instanceof Excepcion.Excepcion) {
                        ast.addExcepcion(value);
                        ast.updateConsola(value);
                    }

                } else {
                    let excepcion = new Excepcion.Excepcion(value.linea, value.columna, "\nSemantico", "Existe mas de una funcion Main")
                    ast.addExcepcion(excepcion);
                    ast.updateConsola(excepcion);
                    return;
                }
            }

        });

        ast.instrucciones.forEach(function (element) {
            if (!(element instanceof Main.Main || element instanceof Declaracion.Declaracion || element instanceof Funcion.Funcion)) {
                let excepcion = new Excepcion.Excepcion(element.linea, element.columna, "\nSemantico", "Sentencias fuera de Main")
                ast.addExcepcion(excepcion);
                ast.updateConsola(excepcion)
            }

        });
        if (ast.excepciones.length == 0) {
            const controlador = new QuadControlador(ast);
            controlador.actual = ast.tablas.shift();
            ast.instrucciones.forEach(instruccion => {
                instruccion.traducir(controlador);
            });
            //controlador.quads.forEach(console.log); //PASAR LA FIRMA DEL METODO CONSOLE.LOG
            console.log(controlador.quads);
            let traducido = "#include <stdio.h>\n#include <math.h>\ndouble " + controlador.arbol.heap + "[30101999];\ndouble " + controlador.arbol.stack + "[30101999];\ndouble P;\ndouble H;\ndouble ";
            for (let i = 0; i < (controlador.temps); i++) {
                if (i == controlador.temps - 1) {
                    traducido += "t" + i + ";\n";
                } else {
                    traducido += "t" + i + ",";
                }
            }
            let main = "void main(){\n";
            let funciones_nativas = "";
            controlador.quads.forEach(quad => {
                main += "\t";
                if (operadores_expresiones(quad.operacion)) {
                    main += `${quad.resultado} = ${quad.arg1} ${quad.operacion} ${quad.arg2} ;\n`;
                } else if (quad.operacion == "ASSIGN") {
                    main += `${quad.resultado} = ${quad.arg1} ;\n`;
                } else if (quad.operacion == "CALL") {
                    if (quad.arg1 == "imprimir_cadena") {
                        main += "imprimir_cadena();\n";
                        if (quad.arg2 != "-") {
                            let t_inicial = parseInt(quad.arg2);
                            let t1 = "t" + t_inicial;
                            let t2 = "t" + (t_inicial + 1);
                            funciones_nativas = `void imprimir_cadena(){\n${t1} = ${controlador.arbol.stack}[(int)P];\nL1:\n\t${t2} = ${controlador.arbol.heap}[(int)${t1}];\n\tif (${t2}!=-1) goto L2; goto L3;\n\tL2:\n\tprintf("%c",(char)${t2});\n\t${t1} = ${t1} + 1;\n\tgoto L1;\nL3:\nreturn;\n}\n`
                        }
                    }
                } else if (quad.operacion == "PRINTF") {
                    main += `printf("${quad.arg1}",${quad.arg2});\n`;
                } else if (operadores_expresiones_unarias(quad.operacion)){
                    switch (quad.operacion) {
                        case Operador.NOT:
                            main += `${quad.resultado} = ${quad.operacion}${quad.arg1} ;\n`;
                            break;
                        case Operador.MENOS_UNARIO:
                            main += `${quad.resultado} = -${quad.arg1} ;\n`;
                            break;
                        default:
                            console.log("No manejada");
                    }
                }
            });
            
            main += "return; \n }\n";
            traducido += funciones_nativas + main;
            return traducido;  //luego vamos a devolver el codigo en 3d con sintaxis C
        }

        return ast.getConsola();
    }
}

function operadores_expresiones(opera) {
    switch (opera) {
        case Operador.SUMA:
        case Operador.RESTA:
        case Operador.AND:
        case Operador.OR:
        case Operador.MENOR_IGUAL_QUE:
        case Operador.MAYOR_IGUAL_QUE:
        case Operador.MAYOR_QUE:
        case Operador.MENOR_QUE:
        case Operador.DIVISION:
        case Operador.MULTIPLICACION:
        case Operador.POW:
        case Operador.SQRT:
        case Operador.CONCAT:
        case Operador.REPEAT:
        case Operador.MODULO:
        case Operador.IGUAL_IGUAL:
        case Operador.DIFERENTE_QUE:
            return true;
        default:
            return false;
    }
}

function operadores_expresiones_unarias(opera) {
    switch (opera) {
        case Operador.NOT:
        case Operador.MENOS_UNARIO:
        case Operador.SQRT:
        case Operador.SENO:
        case Operador.COSENO:
        case Operador.TAN:
        case Operador.LOG:
            return true;
        default:
            return false;
    }
}


