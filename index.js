const AST = require("./AST/AST.js");
const Entorno = require("./AST/Entorno.js");
const Instruccion = require("./Interfaces/Instruccion.js");
const Excepcion = require("./AST/Excepcion.js");
const Funcion = require("./Instrucciones/Funcion.js");
const Struct = require("./Instrucciones/Struct.js");
const Declaracion = require("./Instrucciones/Declaracion.js");
const Main = require("./Instrucciones/Main.js");
const Return = require("./Instrucciones/Return.js");

const grammar = require("./Gramatica/grammar.js");
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
                let value = ast.addFuncion(element);
                if (value instanceof Excepcion.Excepcion) ast.updateConsola(value);

            } else if (element instanceof Struct.Struct) {
                let value = ast.addStruct(element);
                if (value instanceof Excepcion.Excepcion) ast.updateConsola(value);
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
            if (!(element instanceof Main.Main || element instanceof Declaracion.Declaracion || element instanceof Funcion.Funcion || element instanceof Struct.Struct)) {
                let excepcion = new Excepcion.Excepcion(element.linea, element.columna, "\nSemantico", "Sentencias fuera de Main")
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
        if(ast.excepciones.length==0){
            const controlador = new QuadControlador(ast);
            controlador.actual = ast.tablas.shift();
            ast.instrucciones.forEach(instruccion=>{
                instruccion.traducir(controlador);  
            });
            //controlador.quads.forEach(console.log); //PASAR LA FIRMA DEL METODO CONSOLE.LOG
            console.log(controlador.quads);
            return "RETURN COMPLETED";  //luego vamos a devolver el codigo en 3d con sintaxis C
        }
       
        return ast.getConsola();
    }
}


