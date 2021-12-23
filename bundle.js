(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Excepcion_1 = require("./Excepcion");
const QuadControlador_1 = require("../Traductor/QuadControlador");
class AST {
    constructor(instrucciones) {
        this.stack = "STACK";
        this.heap = "HEAP";
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = [];
        this.consola = [];
        this.excepciones = [];
        this.tablas = [];
        this.controlador = new QuadControlador_1.QuadControlador(this);
        this.posiciones = 0;
    }
    updateConsola(line) {
        this.consola.push(line);
    }
    getConsola() {
        return this.consola;
    }
    addFuncion(funcion) {
        if (this.getFuncion(funcion.getNombre()) == null) {
            this.funciones.push(funcion);
        }
        else {
            return new Excepcion_1.Excepcion(funcion.linea, funcion.columna, "Error Semantico", "La funcion ya existe", "Global");
        }
    }
    getFuncion(name) {
        for (let i in this.funciones) {
            let funcion = this.funciones[i];
            if (funcion.getNombre() === name) {
                return funcion;
            }
        }
        return null;
    }
    getStruct(identificador) {
        for (let i in this.structs) {
            let struct = this.structs[i];
            if (struct.getIdentificador() === identificador) {
                return struct;
            }
        }
        return null;
    }
    addStruct(struct) {
        if (this.getStruct(struct.getIdentificador()) == null) {
            this.structs.push(struct);
        }
        else {
            return new Excepcion_1.Excepcion(struct.linea, struct.columna, "Error Semantico", "El struct ya existe", "Global");
        }
    }
    addExcepcion(excepcion) {
        this.excepciones.push(excepcion);
    }
    getExcepciones() {
        return this.excepciones;
    }
}
exports.AST = AST;

},{"../Traductor/QuadControlador":45,"./Excepcion":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
class Entorno {
    constructor(anterior) {
        this.tabla = {};
        this.anterior = anterior;
        this.entorno = '';
    }
    agregar(id, simbolo) {
        simbolo.identificador = simbolo.identificador;
        this.tabla[id] = simbolo;
    }
    eliminar(id) {
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }
    existe(id) {
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                return true;
            }
        }
        return false;
    }
    existeEnActual(id) {
        if (this.tabla[id] !== undefined) {
            return true;
        }
        return false;
    }
    getSimbolo(id) {
        for (let e = this; e != null; e = e.anterior) {
            if (e.tabla[id] !== undefined) {
                return e.tabla[id];
            }
        }
        return null;
    }
    reemplazar(id, nuevoValor) {
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                e.tabla[id] = nuevoValor;
            }
        }
    }
    getTabla() {
        return this.tabla;
    }
    setEntorno(id) {
        this.entorno = id;
    }
    getEntorno() {
        return this.entorno;
    }
}
exports.Entorno = Entorno;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excepcion = void 0;
class Excepcion {
    constructor(linea, columna, tipo, descripcion, ambito) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.ambito = ambito;
    }
    ejecutar(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    toString() {
        return `${this.tipo} - ${this.descripcion} [${this.linea},${this.columna}]\n`;
    }
}
exports.Excepcion = Excepcion;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operador = void 0;
var Operador;
(function (Operador) {
    Operador["SUMA"] = "+";
    Operador["RESTA"] = "-";
    Operador["MULTIPLICACION"] = "*";
    Operador["DIVISION"] = "/";
    Operador["MODULO"] = "%";
    Operador["MENOS_UNARIO"] = "UMENOS";
    Operador["MAYOR_QUE"] = ">";
    Operador["MENOR_QUE"] = "<";
    Operador["IGUAL_IGUAL"] = "==";
    Operador["DIFERENTE_QUE"] = "!=";
    Operador["INCREMENTO"] = "INCREMENTO";
    Operador["DECREMENTO"] = "DECREMENTO";
    Operador["AND"] = "&&";
    Operador["OR"] = "||";
    Operador["NOT"] = "!";
    Operador["MAYOR_IGUAL_QUE"] = ">=";
    Operador["MENOR_IGUAL_QUE"] = "<=";
    Operador["POW"] = "POW";
    Operador["SQRT"] = "SQRT";
    Operador["LOG"] = "LOG";
    Operador["SENO"] = "SENO";
    Operador["COSENO"] = "COSENO";
    Operador["TAN"] = "TAN";
    Operador["CONCAT"] = "CONCAT";
    Operador["REPEAT"] = "REPEAT";
})(Operador = exports.Operador || (exports.Operador = {}));

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(tipo, id, linea, columna, valor) {
        this.identificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.posicion = 0;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        return this.tipo;
    }
    getValorImplicito(ent, arbol) {
        return this.valor;
    }
    getIdentificador() {
        return this.identificador;
    }
    setValor(valor) {
        this.valor = valor;
    }
}
exports.Simbolo = Simbolo;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipo = void 0;
var Tipo;
(function (Tipo) {
    Tipo[Tipo["STRING"] = 0] = "STRING";
    Tipo[Tipo["INT"] = 1] = "INT";
    Tipo[Tipo["DOUBLE"] = 2] = "DOUBLE";
    Tipo[Tipo["BOOL"] = 3] = "BOOL";
    Tipo[Tipo["CHAR"] = 4] = "CHAR";
    Tipo[Tipo["VOID"] = 5] = "VOID";
    Tipo[Tipo["STRUCT"] = 6] = "STRUCT";
    Tipo[Tipo["NULL"] = 7] = "NULL";
    Tipo[Tipo["ATRIBUTO"] = 8] = "ATRIBUTO";
    Tipo[Tipo["ARRAY"] = 9] = "ARRAY";
})(Tipo = exports.Tipo || (exports.Tipo = {}));

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decremento = void 0;
const Operador_1 = require("../AST/Operador");
const Excepcion_1 = require("../AST/Excepcion");
const Identificador_1 = require("./Identificador");
const Quadrupla_1 = require("../Traductor/Quadrupla");
class Decremento {
    constructor(operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.operacion = operacion;
    }
    ejecutar(ent, arbol) {
        let op1 = this.operacion.getValorImplicito(ent, arbol);
        if (op1 instanceof Excepcion_1.Excepcion) {
            return op1;
        }
        else {
            return op1;
        }
    }
    traducir(controlador) {
        /*
            // this.operacion.traducir(controlador);
            t1 = P + pos;
            t2 = stack[t1];

            // decremento aca
            t3 = t2 + 1

            // obtener posicion
            t4 = P + pos;
            // asignar

            stack[t4] = t3

            return t2;
        */
        if (this.operacion instanceof Identificador_1.Identificador) {
            const variable = controlador.actual.getSimbolo(this.operacion.getId());
            const tmpQ = this.operacion.traducir(controlador);
            if (tmpQ) {
                const tmp1 = controlador.getTemp();
                const tmp2 = controlador.getTemp();
                // decremento
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.RESTA.toString(), tmpQ.resultado, "1", tmp1));
                // obtener posicion
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp2));
                // asignar decremento
                controlador.addQuad(new Quadrupla_1.Quadrupla("ASSIGN", tmp1, "", `${controlador.arbol.stack}[${tmp2}]`));
                // retornar valor anterior a decremento
                return tmpQ;
            }
        }
        return;
    }
}
exports.Decremento = Decremento;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../Traductor/Quadrupla":46,"./Identificador":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Quadrupla_1 = require("../Traductor/Quadrupla");
const Operador_1 = require("../AST/Operador");
class Identificador {
    constructor(identificador, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = null;
        this.identificador = identificador;
    }
    getTipo(ent, arbol) {
        if (ent.existe(this.identificador)) {
            let simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getTipo(ent, arbol);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable no existe", ent.getEntorno());
        }
    }
    getId() {
        return this.identificador;
    }
    getValorImplicito(ent, arbol) {
        if (ent.existe(this.identificador)) {
            let simbolo = ent.getSimbolo(this.identificador);
            this.tipo = simbolo.getTipo(ent, arbol);
            return simbolo.getValorImplicito(ent, arbol);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable no existe", ent.getEntorno());
        }
    }
    traducir(controlador) {
        const variable = controlador.actual.getSimbolo(this.identificador);
        const tmp = controlador.getTemp();
        const tmp2 = controlador.getTemp();
        controlador.addQuad(new Quadrupla_1.Quadrupla(`${Operador_1.Operador.SUMA}`, "P", variable.posicion.toString(), tmp));
        const quad = new Quadrupla_1.Quadrupla("ASSIGN", `${controlador.arbol.stack}[(int)${tmp}]`, "", tmp2);
        controlador.addQuad(quad);
        return quad;
    }
}
exports.Identificador = Identificador;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../Traductor/Quadrupla":46}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incremento = void 0;
const Operador_1 = require("../AST/Operador");
const Excepcion_1 = require("../AST/Excepcion");
const Identificador_1 = require("./Identificador");
const Quadrupla_1 = require("../Traductor/Quadrupla");
class Incremento {
    constructor(operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.operacion = operacion;
    }
    ejecutar(ent, arbol) {
        let op1 = this.operacion.getValorImplicito(ent, arbol);
        if (op1 instanceof Excepcion_1.Excepcion) {
            return op1;
        }
        else {
            return op1;
        }
    }
    traducir(controlador) {
        /*
            // this.operacion.traducir(controlador);
            t1 = P + pos;
            t2 = stack[t1];

            // incremento aca
            t3 = t2 + 1

            // obtener posicion
            t4 = P + pos;
            // asignar

            stack[t4] = t3

            return t2;
        */
        if (this.operacion instanceof Identificador_1.Identificador) {
            const variable = controlador.actual.getSimbolo(this.operacion.getId());
            const tmpQ = this.operacion.traducir(controlador);
            if (tmpQ) {
                const tmp1 = controlador.getTemp();
                const tmp2 = controlador.getTemp();
                // incremento
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA.toString(), tmpQ.resultado, "1", tmp1));
                // obtener posicion
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp2));
                // Asignar incremento
                controlador.addQuad(new Quadrupla_1.Quadrupla("ASSIGN", tmp1, "", `${controlador.arbol.stack}[${tmp2}]`));
                // Retornar valor anterior a incremento
                return tmpQ;
            }
        }
        return;
    }
}
exports.Incremento = Incremento;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../Traductor/Quadrupla":46,"./Identificador":8}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logica = void 0;
const Tipo_1 = require("../AST/Tipo");
const Excepcion_1 = require("../AST/Excepcion");
const Operador_1 = require("../AST/Operador");
const Quadrupla_1 = require("../Traductor/Quadrupla");
class Logica {
    constructor(op_izquierda, op_derecha, operador, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operador;
    }
    traducir(controlador) {
        switch (this.operador) {
            case Operador_1.Operador.SUMA:
            case Operador_1.Operador.RESTA:
            case Operador_1.Operador.MULTIPLICACION:
            case Operador_1.Operador.DIVISION:
            case Operador_1.Operador.MODULO:
            case Operador_1.Operador.AND:
            case Operador_1.Operador.OR:
            case Operador_1.Operador.MAYOR_IGUAL_QUE:
            case Operador_1.Operador.MAYOR_QUE:
            case Operador_1.Operador.MENOR_IGUAL_QUE:
            case Operador_1.Operador.MENOR_QUE:
            case Operador_1.Operador.DIFERENTE_QUE:
            case Operador_1.Operador.POW:
            case Operador_1.Operador.CONCAT:
            case Operador_1.Operador.REPEAT:
            case Operador_1.Operador.IGUAL_IGUAL:
                const izq = this.op_izquierda.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const der = this.op_derecha.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const resultado = controlador.getTemp();
                if (izq && der) {
                    const quad = new Quadrupla_1.Quadrupla(this.operador.toString(), `${izq.resultado}`, `${der.resultado}`, `${resultado}`);
                    controlador.addQuad(quad);
                    return quad;
                }
                return;
            case Operador_1.Operador.NOT:
            case Operador_1.Operador.MENOS_UNARIO:
            case Operador_1.Operador.SQRT:
            case Operador_1.Operador.SENO:
            case Operador_1.Operador.COSENO:
            case Operador_1.Operador.TAN:
            case Operador_1.Operador.LOG:
                const left = this.op_izquierda.traducir(controlador);
                const tmp1 = controlador.getTemp();
                if (left) {
                    const quad = new Quadrupla_1.Quadrupla(this.operador.toString(), left.resultado, "", tmp1);
                    controlador.addQuad(quad);
                    return quad;
                }
                break;
        }
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        if (this.operador !== Operador_1.Operador.NOT) {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);
            let op1Tipo = this.op_izquierda.getTipo(ent, arbol);
            let op2Tipo = this.op_derecha.getTipo(ent, arbol);
            //AND
            if (this.operador == Operador_1.Operador.AND) {
                if (op1Tipo === Tipo_1.Tipo.BOOL && op2Tipo === Tipo_1.Tipo.BOOL) {
                    return op1 && op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para AND", ent.getEntorno());
                }
            }
            //OR
            else if (this.operador == Operador_1.Operador.OR) {
                if (op1Tipo === Tipo_1.Tipo.BOOL && op2Tipo === Tipo_1.Tipo.BOOL) {
                    return op1 || op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para OR", ent.getEntorno());
                }
            }
        }
        else {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op1Tipo = this.op_izquierda.getTipo(ent, arbol);
            if (this.operador == Operador_1.Operador.NOT) {
                if (op1Tipo === Tipo_1.Tipo.BOOL) {
                    return !op1;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para NOT", ent.getEntorno());
                }
            }
        }
        return null;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.Logica = Logica;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Tipo":6,"../Traductor/Quadrupla":46}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoParse = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class TipoParse {
    constructor(tipoParse, expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.tipoParse = tipoParse;
        this.expresion = expresion;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        let tipoValor = this.expresion.getTipo(ent, arbol);
        console.log(valor);
        //PARSE INT
        if (tipoValor == Tipo_1.Tipo.STRING) {
            if (Number(valor) != NaN) {
                if (this.tipoParse === Tipo_1.Tipo.INT) {
                    return parseInt(valor);
                }
                else if (this.tipoParse === Tipo_1.Tipo.DOUBLE) {
                    return parseFloat(valor);
                }
                else if (this.tipoParse === Tipo_1.Tipo.BOOL) {
                    if (valor == "1") {
                        return true;
                    }
                    else if (valor == "0") {
                        return false;
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No es posible convertir a Boolean la cadena ingresada", ent.getEntorno());
                    }
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La Funcion Parse no existe para este tipo de dato", ent.getEntorno());
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Cadena Erronea para Funcion Parse, solo permite numeros", ent.getEntorno());
            }
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Funcion Parse, la Expresion no es de Tipo String", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.TipoParse = TipoParse;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDouble = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class ToDouble {
    constructor(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        let tipoValor = this.expresion.getTipo(ent, arbol);
        console.log(valor);
        //TODOUBLE
        if (tipoValor == Tipo_1.Tipo.INT) {
            return valor.toFixed(2);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La Funcion toDouble solo permite Numeros Enteros para convertirlos a Decimales", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.ToDouble = ToDouble;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToInt = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class ToInt {
    constructor(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        let tipoValor = this.expresion.getTipo(ent, arbol);
        console.log(valor);
        //TOINT
        if (tipoValor == Tipo_1.Tipo.DOUBLE) {
            return Math.trunc(valor);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La Funcion toInt solo permite Numeros Decimales para convertirlos a Enteros", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.ToInt = ToInt;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToString = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class ToString {
    constructor(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (Array.isArray(valor)) {
            return Tipo_1.Tipo.ARRAY;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        let tipoValor = this.expresion.getTipo(ent, arbol);
        console.log(valor);
        //TOINT
        if (tipoValor != Tipo_1.Tipo.NULL && tipoValor != Tipo_1.Tipo.VOID) {
            return valor.toString();
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La Funcion toString No Puede Convertir un tipo de Dato Null o Vacio a una Cadena", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.ToString = ToString;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typeof = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class Typeof {
    constructor(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        let tipoValor = this.expresion.getTipo(ent, arbol);
        console.log(valor);
        //TOINT
        if (tipoValor == Tipo_1.Tipo.INT) {
            return "int";
        }
        else if (tipoValor == Tipo_1.Tipo.DOUBLE) {
            return "double";
        }
        else if (tipoValor == Tipo_1.Tipo.BOOL) {
            return "boolean";
        }
        else if (tipoValor == Tipo_1.Tipo.CHAR) {
            return "char";
        }
        else if (tipoValor == Tipo_1.Tipo.STRING) {
            return "String";
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Funcion Typeof", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.Typeof = Typeof;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharOfPosition = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class CharOfPosition {
    constructor(expresion, posicion, linea, columna) {
        this.expresion = expresion;
        this.posicion = posicion;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let value = this.expresion.getValorImplicito(ent, arbol);
        let position = this.posicion.getValorImplicito(ent, arbol);
        let typeValue = this.expresion.getTipo(ent, arbol);
        let typePosition = this.posicion.getTipo(ent, arbol);
        if (typeValue == Tipo_1.Tipo.STRING && (typePosition == Tipo_1.Tipo.INT || typePosition == Tipo_1.Tipo.DOUBLE)) {
            return value.charAt(position);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Funcion CaracterOfPosition", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.CharOfPosition = CharOfPosition;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class Length {
    constructor(expresion, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let value = this.expresion.getValorImplicito(ent, arbol);
        let typeValue = this.expresion.getTipo(ent, arbol);
        if (typeValue == Tipo_1.Tipo.STRING) {
            return value.length;
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Funcion length", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.Length = Length;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubString = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class SubString {
    constructor(expresion, posicionInicial, posicionFinal, linea, columna) {
        this.expresion = expresion;
        this.posicionInicial = posicionInicial;
        this.posicionFinal = posicionFinal;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let value = this.expresion.getValorImplicito(ent, arbol);
        let positionInitial = this.posicionInicial.getValorImplicito(ent, arbol);
        let positionFinal = this.posicionFinal.getValorImplicito(ent, arbol);
        let typeValue = this.expresion.getTipo(ent, arbol);
        let typePosInitial = this.posicionInicial.getTipo(ent, arbol);
        let typePosFinal = this.posicionFinal.getTipo(ent, arbol);
        if (typeValue == Tipo_1.Tipo.STRING && typePosInitial == Tipo_1.Tipo.INT && typePosFinal == Tipo_1.Tipo.INT) {
            return value.substring(positionInitial, positionFinal + 1);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Funcion SubString", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.SubString = SubString;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLower = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class ToLower {
    constructor(expresion, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let value = this.expresion.getValorImplicito(ent, arbol);
        let typeValue = this.expresion.getTipo(ent, arbol);
        if (typeValue == Tipo_1.Tipo.STRING) {
            return value.toLowerCase();
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Funcion toLowerCase", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.ToLower = ToLower;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUpper = void 0;
const Tipo_1 = require("../../AST/Tipo");
const Excepcion_1 = require("../../AST/Excepcion");
class ToUpper {
    constructor(expresion, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let value = this.expresion.getValorImplicito(ent, arbol);
        let typeValue = this.expresion.getTipo(ent, arbol);
        if (typeValue == Tipo_1.Tipo.STRING) {
            return value.toUpperCase();
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Funcion toUpperCase", ent.getEntorno());
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.ToUpper = ToUpper;

},{"../../AST/Excepcion":3,"../../AST/Tipo":6}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operacion = void 0;
const Tipo_1 = require("../AST/Tipo");
const Simbolo_1 = require("../AST/Simbolo");
const Operador_1 = require("../AST/Operador");
const Excepcion_1 = require("../AST/Excepcion");
const Identificador_1 = require("./Identificador");
const Quadrupla_1 = require("../Traductor/Quadrupla");
class Operacion {
    constructor(op_izquierda, op_derecha, operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
        this.etiqueta = "";
        this.bandera = false;
    }
    traducir(controlador) {
        switch (this.operador) {
            case Operador_1.Operador.SUMA:
            case Operador_1.Operador.RESTA:
            case Operador_1.Operador.MULTIPLICACION:
            case Operador_1.Operador.DIVISION:
            case Operador_1.Operador.MODULO:
            case Operador_1.Operador.AND:
            case Operador_1.Operador.OR:
            case Operador_1.Operador.MAYOR_IGUAL_QUE:
            case Operador_1.Operador.MAYOR_QUE:
            case Operador_1.Operador.MENOR_IGUAL_QUE:
            case Operador_1.Operador.MENOR_QUE:
            case Operador_1.Operador.DIFERENTE_QUE:
            case Operador_1.Operador.POW:
            case Operador_1.Operador.CONCAT:
            case Operador_1.Operador.REPEAT:
            case Operador_1.Operador.IGUAL_IGUAL:
                const izq = this.op_izquierda.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const der = this.op_derecha.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const resultado = controlador.getTemp();
                if (izq && der) {
                    const quad = new Quadrupla_1.Quadrupla(this.operador.toString(), `${izq.resultado}`, `${der.resultado}`, `${resultado}`);
                    controlador.addQuad(quad);
                    return quad;
                }
                return;
            case Operador_1.Operador.NOT:
            case Operador_1.Operador.MENOS_UNARIO:
            case Operador_1.Operador.SQRT:
            case Operador_1.Operador.SENO:
            case Operador_1.Operador.COSENO:
            case Operador_1.Operador.TAN:
            case Operador_1.Operador.LOG:
                const left = this.op_izquierda.traducir(controlador);
                const tmp1 = controlador.getTemp();
                if (left) {
                    const quad = new Quadrupla_1.Quadrupla(this.operador.toString(), left.resultado, "", tmp1);
                    controlador.addQuad(quad);
                    return quad;
                }
                break;
        }
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    generateQuad2(arbol, quad) {
        if (!this.bandera) {
            let temporal = "";
            temporal = arbol.controlador.getTemp();
            if (this.op_izquierda instanceof Operacion) {
                quad.arg1 = this.op_izquierda.etiqueta;
            }
            if (this.op_derecha instanceof Operacion) {
                quad.arg2 = this.op_derecha.etiqueta;
            }
            quad.resultado = temporal;
            arbol.controlador.addQuad(quad);
            arbol.controlador.codigo3D.push(temporal + " = " + " " + quad.arg1 + " " + quad.operacion + " " + quad.arg2 + " ;");
            this.bandera = true;
            this.etiqueta = quad.resultado;
        }
    }
    getValorImplicito(ent, arbol) {
        if (this.operador !== Operador_1.Operador.MENOS_UNARIO) {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);
            let typeOp1 = this.op_izquierda.getTipo(ent, arbol);
            let typeOp2 = this.op_derecha.getTipo(ent, arbol);
            //suma
            if (op1 instanceof Excepcion_1.Excepcion)
                return op1;
            if (op2 instanceof Excepcion_1.Excepcion)
                return op2;
            if (this.operador == Operador_1.Operador.SUMA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.SUMA}`,`${op1}`,`${op2}`,""));
                    return op1 + op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Suma (+)", ent.getEntorno());
                }
            }
            //resta
            else if (this.operador == Operador_1.Operador.RESTA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.RESTA}`,`${op1}`,`${op2}`,""));
                    return op1 - op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Resta (-)", ent.getEntorno());
                }
            }
            //multiplicación
            else if (this.operador == Operador_1.Operador.MULTIPLICACION) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.MULTIPLICACION}`,`${op1}`,`${op2}`,""));
                    return op1 * op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Multiplicacion (*)", ent.getEntorno());
                }
            }
            //division
            else if (this.operador == Operador_1.Operador.DIVISION) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    if (op2 === 0) {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No puede realizar una Operacion entre cero", ent.getEntorno());
                    }
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.DIVISION}`,`${op1}`,`${op2}`,""));
                    return op1 / op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Division (/)", ent.getEntorno());
                }
            }
            //modulo
            else if (this.operador == Operador_1.Operador.MODULO) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    if (op2 === 0) {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No puede realizar una Operacion entre cero", ent.getEntorno());
                    }
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.MODULO}`,`${op1}`,`${op2}`,""));
                    return op1 % op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Modular (%)", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.POW) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.MODULO}`,`${op1}`,`${op2}`,""));
                    return Math.pow(op1, op2);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Pow (xⁿ)", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.SQRT) {
                if (typeof (op1 === "number")) {
                    return Math.sqrt(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Sqrt (√)", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.LOG) {
                if (typeof (op1 === "number")) {
                    return Math.log10(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Log (log(x))", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.SENO) {
                if (typeof (op1 === "number")) {
                    return Math.sin(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Sin (seno)", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.COSENO) {
                if (typeof (op1 === "number")) {
                    return Math.cos(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Cos (coseno)", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.TAN) {
                if (typeof (op1 === "number")) {
                    return Math.tan(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Tan (tangente)", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.CONCAT) {
                if (typeof (op1 === "string") && typeof (op2 === "string")) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.CONCAT}`,`${op1}`,`${op2}`,""));
                    return op1 + op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Concatenacion (&)", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.REPEAT) {
                if (typeof (op1 === "string") && (typeOp2 == Tipo_1.Tipo.INT || typeOp2 == Tipo_1.Tipo.DOUBLE)) {
                    //this.generateQuad2(arbol,new Quadrupla(`${Operador.REPEAT}`,`${op1}`,`${op2}`,""));
                    return op1.repeat(op2);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Concatenacion (&)", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.INCREMENTO) {
                if (!(this.op_izquierda instanceof Identificador_1.Identificador)) {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No es un Identificador", ent.getEntorno());
                }
                if (typeOp1 == Tipo_1.Tipo.INT || typeOp1 == Tipo_1.Tipo.DOUBLE) {
                    if (ent.existe(this.op_izquierda.getId())) {
                        let simbolo = new Simbolo_1.Simbolo(typeOp1, this.op_izquierda.getId(), this.linea, this.columna, op1 + 1);
                        ent.reemplazar(this.op_izquierda.getId(), simbolo);
                        return op1;
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Variable no Definida", ent.getEntorno());
                    }
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Incremento (++)", ent.getEntorno());
                }
            }
            else if (this.operador == Operador_1.Operador.DECREMENTO) {
                if (!(this.op_izquierda instanceof Identificador_1.Identificador)) {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "No es un Identificador", ent.getEntorno());
                }
                if (typeOp1 == Tipo_1.Tipo.INT || typeOp1 == Tipo_1.Tipo.DOUBLE) {
                    if (ent.existe(this.op_izquierda.getId())) {
                        let simbolo = new Simbolo_1.Simbolo(typeOp1, this.op_izquierda.getId(), this.linea, this.columna, op1 - 1);
                        ent.reemplazar(this.op_izquierda.getId(), simbolo);
                        return op1;
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Variable no Definida", ent.getEntorno());
                    }
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Decremento (--)", ent.getEntorno());
                }
            }
        }
        else {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador_1.Operador.MENOS_UNARIO) {
                if (typeof (op1 === "number")) {
                    return -1 * op1;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operacion Unaria (-)", ent.getEntorno());
                }
            }
        }
        return null;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.Operacion = Operacion;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../Traductor/Quadrupla":46,"./Identificador":8}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Tipo_1 = require("../AST/Tipo");
const Quadrupla_1 = require("../Traductor/Quadrupla");
class Primitivo {
    constructor(valor, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    traducir(controlador) {
        //const value = `${this.valor}` == `true`? 1: `${this.valor}` == `false` ? 0: `${this.valor}`;
        const value = `${this.valor}` === "true" ? "1" : `${this.valor}` === "false" ? "0" : `${this.valor}`;
        return new Quadrupla_1.Quadrupla("op", "arg1", "arg2", `${value}`); //AL SER UN VALOR PRIMITIVO, NO NECESITAMOS GUARDAR TEMP, PORQUE SE RETORNA EL VALOR 
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            if (valor.length == 1) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        this.valor = this.removeQuotes(this.valor, ent, arbol);
        return this.valor;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
    removeQuotes(valor, ent, arbol) {
        if (typeof (valor) === 'string' && (valor.charAt(0) == '"' || valor.charAt(0) == "'")) {
            valor = valor.substring(1, valor.length - 1);
        }
        return valor;
    }
}
exports.Primitivo = Primitivo;

},{"../AST/Tipo":6,"../Traductor/Quadrupla":46}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Tipo_1 = require("../AST/Tipo");
const Excepcion_1 = require("../AST/Excepcion");
const Operador_1 = require("../AST/Operador");
const Quadrupla_1 = require("../Traductor/Quadrupla");
class Relacional {
    constructor(op_izquierda, op_derecha, relacional, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = relacional;
    }
    traducir(controlador) {
        switch (this.operador) {
            case Operador_1.Operador.SUMA:
            case Operador_1.Operador.RESTA:
            case Operador_1.Operador.MULTIPLICACION:
            case Operador_1.Operador.DIVISION:
            case Operador_1.Operador.MODULO:
            case Operador_1.Operador.AND:
            case Operador_1.Operador.OR:
            case Operador_1.Operador.MAYOR_IGUAL_QUE:
            case Operador_1.Operador.MAYOR_QUE:
            case Operador_1.Operador.MENOR_IGUAL_QUE:
            case Operador_1.Operador.MENOR_QUE:
            case Operador_1.Operador.DIFERENTE_QUE:
            case Operador_1.Operador.POW:
            case Operador_1.Operador.CONCAT:
            case Operador_1.Operador.REPEAT:
            case Operador_1.Operador.IGUAL_IGUAL:
                const izq = this.op_izquierda.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const der = this.op_derecha.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const resultado = controlador.getTemp();
                if (izq && der) {
                    const quad = new Quadrupla_1.Quadrupla(this.operador.toString(), `${izq.resultado}`, `${der.resultado}`, `${resultado}`);
                    controlador.addQuad(quad);
                    return quad;
                }
                return;
            case Operador_1.Operador.NOT:
            case Operador_1.Operador.MENOS_UNARIO:
            case Operador_1.Operador.SQRT:
            case Operador_1.Operador.SENO:
            case Operador_1.Operador.COSENO:
            case Operador_1.Operador.TAN:
            case Operador_1.Operador.LOG:
                const left = this.op_izquierda.traducir(controlador);
                const tmp1 = controlador.getTemp();
                if (left) {
                    const quad = new Quadrupla_1.Quadrupla(this.operador.toString(), left.resultado, "", tmp1);
                    controlador.addQuad(quad);
                    return quad;
                }
                break;
        }
        return;
    }
    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof valor === "boolean") {
            return Tipo_1.Tipo.BOOL;
        }
        else if (typeof valor === "string") {
            if (this.isChar(valor)) {
                return Tipo_1.Tipo.CHAR;
            }
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof valor === "number") {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    }
    getValorImplicito(ent, arbol) {
        let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
        let op2 = this.op_derecha.getValorImplicito(ent, arbol);
        let typeOp1 = this.op_izquierda.getTipo(ent, arbol);
        let typeOp2 = this.op_derecha.getTipo(ent, arbol);
        //MENOR QUE
        if (this.operador == Operador_1.Operador.MENOR_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 < op2;
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operador Menor Que (<)", ent.getEntorno());
            }
        }
        //MAYOR QUE
        else if (this.operador == Operador_1.Operador.MAYOR_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 > op2;
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operador Mayor Que (>)", ent.getEntorno());
            }
        }
        //IGUAL IGUAL
        else if (this.operador == Operador_1.Operador.IGUAL_IGUAL) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 == op2;
            }
            else if (typeOp1 === Tipo_1.Tipo.BOOL && typeOp2 === Tipo_1.Tipo.BOOL) {
                return op1 == op2;
            }
            else if (typeOp1 === Tipo_1.Tipo.STRING && typeOp2 === Tipo_1.Tipo.STRING) {
                return op1 == op2;
            }
            else if (typeOp1 === Tipo_1.Tipo.CHAR && typeOp2 === Tipo_1.Tipo.CHAR) {
                return op1 == op2;
            }
            else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 == op2;
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operador Igual Igual (==)", ent.getEntorno());
            }
        } //MENOR IGUAL
        else if (this.operador == Operador_1.Operador.MENOR_IGUAL_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 <= op2;
            }
            else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 <= op2;
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operador Menor Igual (<=)", ent.getEntorno());
            } //MAYOR IGUAL
        }
        else if (this.operador == Operador_1.Operador.MAYOR_IGUAL_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 >= op2;
            }
            else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 >= op2;
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operador Mayor Igual (>=)", ent.getEntorno());
            } //DIFERENTE QUE
        }
        else if (this.operador == Operador_1.Operador.DIFERENTE_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 != op2;
            }
            else if (typeOp1 === Tipo_1.Tipo.BOOL && typeOp2 === Tipo_1.Tipo.BOOL) {
                return op1 != op2;
            }
            else if (typeOp1 === Tipo_1.Tipo.STRING && typeOp2 === Tipo_1.Tipo.STRING) {
                return op1 != op2;
            }
            else if (typeOp1 === Tipo_1.Tipo.CHAR && typeOp2 === Tipo_1.Tipo.CHAR) {
                return op1 != op2;
            }
            else if (typeof (op1 === null) && typeof (op2 === null)) {
                return op1 != op2;
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Operador Diferente Que (!=)", ent.getEntorno());
            }
        }
        return null;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return (cadena.length == 3 &&
            cadena.charAt(0) === "'" &&
            cadena.charAt(cadena.length - 1) === "'");
    }
}
exports.Relacional = Relacional;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Tipo":6,"../Traductor/Quadrupla":46}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Tipo_1 = require("../AST/Tipo");
const Excepcion_1 = require("../AST/Excepcion");
class Ternario {
    constructor(condicion, op_Verdadera, op_Falsa, linea, columna) {
        this.condicion = condicion;
        this.op_Verdadera = op_Verdadera;
        this.op_Falsa = op_Falsa;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(controlador) {
        return;
    }
    getTipo(ent, arbol) {
        const valor_Condicional = this.condicion.getValorImplicito(ent, arbol);
        let type_Condicional = this.condicion.getTipo(ent, arbol);
        if (type_Condicional == Tipo_1.Tipo.BOOL) {
            return valor_Condicional ? this.op_Verdadera.getTipo(ent, arbol) : this.op_Falsa.getTipo(ent, arbol);
        }
        else {
            return Tipo_1.Tipo.VOID;
        }
    }
    getValorImplicito(ent, arbol) {
        const valor_Condicional = this.condicion.getValorImplicito(ent, arbol);
        if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
            return valor_Condicional ? this.op_Verdadera.getValorImplicito(ent, arbol) : this.op_Falsa.getValorImplicito(ent, arbol);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Operacion Condicional Erronea para Operacion Ternaria (?)", ent.getEntorno());
        }
        return null;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.Ternario = Ternario;

},{"../AST/Excepcion":3,"../AST/Tipo":6}],25:[function(require,module,exports){
(function (process){(function (){
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var grammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,37],$V1=[1,17],$V2=[1,35],$V3=[1,27],$V4=[1,28],$V5=[1,29],$V6=[1,30],$V7=[1,31],$V8=[1,32],$V9=[1,33],$Va=[1,34],$Vb=[1,23],$Vc=[1,24],$Vd=[1,26],$Ve=[1,42],$Vf=[1,38],$Vg=[1,39],$Vh=[1,41],$Vi=[1,40],$Vj=[1,36],$Vk=[2,5,21,29,34,45,46,47,51,53,54,58,60,64,66,67,69,70,112,117,119,120,126,127],$Vl=[1,56],$Vm=[1,57],$Vn=[1,78],$Vo=[1,87],$Vp=[1,96],$Vq=[1,89],$Vr=[1,90],$Vs=[1,91],$Vt=[1,92],$Vu=[1,93],$Vv=[1,94],$Vw=[1,95],$Vx=[1,80],$Vy=[1,81],$Vz=[1,82],$VA=[1,83],$VB=[1,84],$VC=[1,85],$VD=[1,86],$VE=[1,88],$VF=[1,97],$VG=[1,98],$VH=[1,99],$VI=[1,100],$VJ=[1,101],$VK=[1,102],$VL=[1,103],$VM=[1,104],$VN=[2,137],$VO=[8,38],$VP=[2,55],$VQ=[1,119],$VR=[1,129],$VS=[1,136],$VT=[1,137],$VU=[1,147],$VV=[1,148],$VW=[1,149],$VX=[1,144],$VY=[1,145],$VZ=[1,138],$V_=[1,139],$V$=[1,140],$V01=[1,141],$V11=[1,142],$V21=[1,143],$V31=[1,131],$V41=[1,132],$V51=[1,133],$V61=[1,134],$V71=[1,135],$V81=[1,146],$V91=[8,22,23,32,33,38,65,80,81,82,89,90,91,92,93,94,95,96,97,98,99,100,101,108],$Va1=[32,38],$Vb1=[1,174],$Vc1=[8,32,33,38,65,80,81,82,89,90,91,92,93,94,95,96,97,98,99,100,101,108],$Vd1=[34,38],$Ve1=[8,32,33,38,65,80,81,82,89,90,91,92,93,94,95,96,97,98,108],$Vf1=[8,32,33,38,65,80,81,82,89,90,91,92,93,94,95,96,108],$Vg1=[8,32,33,38,65,80,81,82,89,90,108],$Vh1=[1,288],$Vi1=[1,287],$Vj1=[34,64,66];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"RAICES":4,"EOF":5,"RAIZ":6,"PRINT":7,"semicolon":8,"DECLARACION_NULA":9,"DECLARACION":10,"STRUCT":11,"FUNCION":12,"WHILE":13,"DO_WHILE":14,"FOR":15,"FOR_IN":16,"RETURN":17,"BREAK":18,"CONTINUE":19,"LLAMADA":20,"identifier":21,"incremento":22,"decremento":23,"ASIGNACION":24,"IF":25,"SWITCH":26,"MAIN":27,"INVALID":28,"void":29,"main":30,"lparen":31,"rparen":32,"allave":33,"cllave":34,"TIPO":35,"LIST_PARAMETROS":36,"PARAMETROS":37,"coma":38,"PARAMETRO":39,"DECLARACION_PARAMETROS":40,"LIST_ARGUMENTOS":41,"ARGUMENTOS":42,"ARGUMENTO":43,"EXPR":44,"while":45,"do":46,"for":47,"FOR_VARIABLE":48,"FOR_INSTRUCCION":49,"in":50,"return":51,"RETURN_OP":52,"break":53,"continue":54,"asig":55,"LIST_IDENTIFIERS":56,"IDENTIFIER":57,"if":58,"else":59,"switch":60,"CASES":61,"DEFAULT":62,"CASE":63,"case":64,"colon":65,"default":66,"print":67,"PRINT_EXPR":68,"println":69,"struct":70,"STRUCT_ATRIBUTOS":71,"STRUCT_ATRIBUTO":72,"PRIMITIVA":73,"OP_ARITMETICAS":74,"OP_RELACIONALES":75,"OP_LOGICAS":76,"OP_TERNARIA":77,"NATIVAS_STRING":78,"NATIVA":79,"concat":80,"repeat":81,"dot":82,"charOfPos":83,"subString":84,"length":85,"toUpper":86,"toLower":87,"not":88,"and":89,"or":90,"equal":91,"lte":92,"gte":93,"nequal":94,"lt":95,"gt":96,"plus":97,"minus":98,"times":99,"div":100,"mod":101,"pow":102,"sqrt":103,"log":104,"sin":105,"cos":106,"tan":107,"question":108,"integer":109,"decimal":110,"string":111,"char":112,"null":113,"true":114,"false":115,"dollar":116,"int":117,"parse":118,"double":119,"boolean":120,"toInt":121,"toDouble":122,"toSTRING":123,"stringNative":124,"typeof":125,"String":126,"error_lexico":127,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"semicolon",21:"identifier",22:"incremento",23:"decremento",29:"void",30:"main",31:"lparen",32:"rparen",33:"allave",34:"cllave",38:"coma",45:"while",46:"do",47:"for",50:"in",51:"return",53:"break",54:"continue",55:"asig",58:"if",59:"else",60:"switch",64:"case",65:"colon",66:"default",67:"print",69:"println",70:"struct",80:"concat",81:"repeat",82:"dot",83:"charOfPos",84:"subString",85:"length",86:"toUpper",87:"toLower",88:"not",89:"and",90:"or",91:"equal",92:"lte",93:"gte",94:"nequal",95:"lt",96:"gt",97:"plus",98:"minus",99:"times",100:"div",101:"mod",102:"pow",103:"sqrt",104:"log",105:"sin",106:"cos",107:"tan",108:"question",109:"integer",110:"decimal",111:"string",112:"char",113:"null",114:"true",115:"false",116:"dollar",117:"int",118:"parse",119:"double",120:"boolean",121:"toInt",122:"toDouble",123:"toSTRING",124:"stringNative",125:"typeof",126:"String",127:"error_lexico"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[6,2],[6,1],[6,1],[6,2],[6,1],[6,1],[6,2],[6,2],[6,2],[6,2],[6,3],[6,3],[6,2],[6,1],[6,1],[6,1],[6,1],[27,7],[12,8],[36,1],[36,0],[37,3],[37,1],[39,1],[40,2],[20,4],[41,1],[41,0],[42,3],[42,1],[43,1],[13,7],[14,8],[15,11],[48,1],[48,1],[49,2],[49,2],[16,7],[17,2],[18,1],[19,1],[52,1],[52,0],[10,4],[9,2],[56,3],[56,1],[57,1],[24,3],[25,7],[25,11],[25,9],[26,7],[26,8],[26,7],[61,2],[61,1],[63,4],[62,3],[7,4],[7,4],[68,3],[68,1],[11,5],[71,3],[71,1],[72,2],[44,1],[44,1],[44,1],[44,1],[44,1],[44,1],[44,1],[44,1],[44,1],[78,3],[78,3],[78,6],[78,8],[78,5],[78,5],[78,5],[76,2],[76,3],[76,3],[75,3],[75,3],[75,3],[75,3],[75,3],[75,3],[74,3],[74,3],[74,3],[74,3],[74,3],[74,2],[74,2],[74,2],[74,6],[74,4],[74,4],[74,4],[74,4],[74,4],[77,5],[73,1],[73,1],[73,1],[73,1],[73,1],[73,1],[73,1],[73,3],[73,2],[79,6],[79,6],[79,6],[79,4],[79,4],[79,4],[79,4],[79,4],[35,1],[35,1],[35,1],[35,1],[35,1],[35,1],[28,1],[28,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; return this.$; 
                            producciones.push(`<INICIO> ::= <INSTRUCCIONES> EOF`);
                            gramaticaDDS.push(`Inicio.val := Instrucciones.val EOF`);
break;
case 2:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
                            producciones.push(`<INSTRUCCIONES> ::= <INSTRUCCIONES> <INSTRUCCION>`);
                            gramaticaDDS.push(`Instrucciones.val := Instrucciones.val Instruccion.val`);
break;
case 3:
 this.$ = [$$[$0]]; 
                            producciones.push(`<INSTRUCCIONES> ::= <INSTRUCCION>`);
                            gramaticaDDS.push(`Instrucciones.val := Instruccion.val`);
break;
case 4:
 this.$ = $$[$0-1];  producciones.push(`<INSTRUCCION> ::= <PRINT> ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Print.val ';'`);
break;
case 5:
 this.$ = $$[$0-1];  producciones.push(`<INSTRUCCION> ::= <DECLARACION_NULA> ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Declaracion_Nula.val ';'`);
break;
case 6:
 this.$ = $$[$0-1];  producciones.push(`<INSTRUCCION> ::= <DECLARACION> ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Declaracion.val ';'`);
break;
case 7:
 this.$ = $$[$0-1]; 
break;
case 8:
 this.$ = $$[$0];  producciones.push(`<INSTRUCCION> ::= <FUNCION>`);
                                                        gramaticaDDS.push(`Instruccion.val := Funcion.val`);
break;
case 9:
 this.$ = $$[$0];  producciones.push(`<INSTRUCCION> ::= <WHILE>`);
                                                        gramaticaDDS.push(`Instruccion.val := While.val`);
break;
case 10:
 this.$ = $$[$0-1];  producciones.push(`<INSTRUCCION> ::= <DO_WHILE> ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Do_While.val ';'`);
break;
case 11:
 this.$ = $$[$0];  producciones.push(`<INSTRUCCION> ::= <FOR>`);
                                                        gramaticaDDS.push(`Instruccion.val := For.val`);
break;
case 12:
 this.$ = $$[$0];  producciones.push(`<INSTRUCCION> ::= <FOR_IN>`);
                                                        gramaticaDDS.push(`Instruccion.val := For_In.val`); 
break;
case 13:
 this.$ = $$[$0-1];  producciones.push(`<INSTRUCCION> ::= <RETURN> ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Return.val ';'`);
break;
case 14:
 this.$ = $$[$0-1];  producciones.push(`<INSTRUCCION> ::= <BREAK> ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Break.val ';'`);
break;
case 15:
 this.$ = $$[$0-1];  producciones.push(`<INSTRUCCION> ::= <CONTINUE> ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Continue.val ';'`);
break;
case 16:
 this.$ = $$[$0-1];  producciones.push(`<INSTRUCCION> ::= <LLAMADA> ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Llamada.val ';'`);
break;
case 17:
 this.$ = new Incremento(new Operacion(new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),Operador.INCREMENTO, _$[$0-2].first_line, _$[$0-2].first_column),_$[$0-2].first_line, _$[$0-2].first_column); 
                                                        producciones.push(`<INSTRUCCION> ::= <Identificador> '++' ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Identificador.val '++' ';'`);
break;
case 18:
 this.$ = new Decremento(new Operacion(new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),Operador.DECREMENTO, _$[$0-2].first_line, _$[$0-2].first_column),_$[$0-2].first_line, _$[$0-2].first_column); 
                                                        producciones.push(`<INSTRUCCION> ::= <Identificador> '--' ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Identificador.val '--' ';'`);
break;
case 19:
 this.$ = $$[$0-1];  producciones.push(`<INSTRUCCION> ::= <ASIGNACION> ';'`);
                                                        gramaticaDDS.push(`Instruccion.val := Asignacion.val ';'`);
break;
case 20:
 this.$ = $$[$0];  producciones.push(`<INSTRUCCION> ::= <IF>`);
                                                        gramaticaDDS.push(`Instruccion.val := If.val`);
break;
case 21:
 this.$ = $$[$0];  producciones.push(`<INSTRUCCION> ::= <SWITCH>`);
                                                        gramaticaDDS.push(`Instruccion.val := Switch.val`);
break;
case 22:
 this.$ = $$[$0];  producciones.push(`<INSTRUCCION> ::= <MAIN>`);
                                                        gramaticaDDS.push(`Instruccion.val := Main.val`);
break;
case 23: case 55:
 this.$ = $$[$0]; 
break;
case 24:
this.$ = new Main($$[$0-1],_$[$0-6].first_line, _$[$0-6].first_column); 
                                                        producciones.push(`<MAIN> ::= 'void' 'main' '(' ')' '{' <INSTRUCCIONES> '}'`);
                                                        gramaticaDDS.push(`Main.val := 'void' 'main' '(' ')' '{' Instrucciones.val '}'`);
break;
case 25:
 this.$ = new Funcion($$[$0-6],$$[$0-4],$$[$0-1],$$[$0-7],_$[$0-7].first_line, _$[$0-7].first_column);
                                                        producciones.push(`<FUNCION> ::= <Identificador> '(' <LISTA_PARAMETROS> ')' '{' <INSTRUCCIONES> '}'`);
                                                        gramaticaDDS.push(`Funcion.val := Identificador.val '(' Lista_Parametros.val ')' '{' Instrucciones.val '}'`);
                                                         
break;
case 26:
 this.$ = $$[$0];                               producciones.push(`<LISTA_PARAMETROS> ::= <PARAMETRO>`);
                                                        gramaticaDDS.push(`Lista_Parametros.val := Parametro.val`);
break;
case 27:
 this.$ = [];                                        producciones.push(`<LISTA_PARAMETROS> ::= `);
                                                        gramaticaDDS.push(`Lista_Parametros.val := `);
break;
case 28:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2];  producciones.push(`<PARAMETROS> ::= <PARAMETROS> ',' <PARAMETRO>`);
                                                        gramaticaDDS.push(`Parametros.val := Parametros.val ',' Parametro.val`);
break;
case 29:
 this.$ = [$$[$0]];                            producciones.push(`<PARAMETROS> ::= <PARAMETRO>`);
                                                        gramaticaDDS.push(`Parametros.val := Parametro.val`);
break;
case 30:
 this.$ = $$[$0];                  producciones.push(`<PARAMETRO> ::= <DECLARACION_PARAMETROS>`);
                                                        gramaticaDDS.push(`Parametro.val := Declaracion_Parametros.val`);
break;
case 31:
 this.$ = new Declaracion($$[$0],null,$$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column); 
                                                        producciones.push(`<DECLARACION_PARAMETROS> ::= <TIPO> <Identificador>`);
                                                        gramaticaDDS.push(`Declaracion_Parametros.val := Declaracion_Parametros.val`);
break;
case 32:
 this.$ = new Llamada($$[$0-3],$$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
                                                        producciones.push(`<LLAMADA> ::= <Identificador>  '(' <LISTA_ARGUMENTOS> ')'`);
                                                        gramaticaDDS.push(`Main.val := Identificador.val '(' Lista_Argumentos.val ')'`);
break;
case 33:
 this.$ = $$[$0];                               producciones.push(`<LISTA_ARGUMENTOS> ::= <ARGUMENTOS>`);
                                                        gramaticaDDS.push(`Lista_Argumentos.val := Argumentos.val`);
break;
case 34:
 this.$ = [];                                        
                                                        producciones.push(`<LISTA_ARGUMENTOS> ::= `);
                                                        gramaticaDDS.push(`Lista_Argumentos.val := `);
break;
case 35:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; producciones.push(`<ARGUMENTOS> ::= <ARGUMENTOS> ',' <ARGUMENTO>`);
                                                        gramaticaDDS.push(`Argumentos.val := Argumentos.val ',' Argumento.val`);
break;
case 36:
 this.$ = [$$[$0]];                        producciones.push(`<ARGUMENTOS> ::= <ARGUMENTO>`);
                                                        gramaticaDDS.push(`Argumentos.val := Argumento.val`);
break;
case 37:
 this.$ = $$[$0];                                    producciones.push(`<ARGUMENTO> ::= <EXPRESION>`);
                                                        gramaticaDDS.push(`Argumento.val := Expresion.val`);
break;
case 38:
 this.$ = new While($$[$0-1],$$[$0-4],_$[$0-6].first_line,_$[$0-6].first_column); 
                                                        producciones.push(`<WHILE> ::= 'while' '(' <EXPRESION> ')' '{' <INSTRUCCIONES> '}'`);
                                                        gramaticaDDS.push(`While.val := 'while' '(' Expresion.val ')' '{' Instrucciones.val '}'`);
break;
case 39:
 this.$ = new DoWhile($$[$0-5],$$[$0-1],_$[$0-7].first_line,_$[$0-7].first_column); 
break;
case 40:
this.$ = new For($$[$0-1],$$[$0-8],$$[$0-6],$$[$0-4],_$[$0-10].first_line,_$[$0-10]); 
break;
case 41: case 42:
this.$ = $$[$0]
break;
case 43:
 this.$ = new Incremento(new Operacion(new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),Operador.INCREMENTO, _$[$0-1].first_line, _$[$0-1].first_column),_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 44:
 this.$ = new Decremento(new Operacion(new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),Operador.DECREMENTO, _$[$0-1].first_line, _$[$0-1].first_column),_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 45:
this.$ = new ForIn($$[$0-1],$$[$0-5],$$[$0-3],_$[$0-6].first_line,_$[$0-6].first_column); 
break;
case 46:
 this.$ = new Return($$[$0],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 47:
this.$ = new Break(_$[$0].first_line, _$[$0].first_column); 
break;
case 48:
this.$ = new Continue(_$[$0].first_line, _$[$0].first_column);
break;
case 49:
this.$ = $$[$0]; 
break;
case 50:
this.$ = null; 
break;
case 51:
 this.$ = new Declaracion($$[$0-2],$$[$0],$$[$0-3],[],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 52:
 this.$ = new Declaracion(null,null,$$[$0-1],$$[$0],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 53: case 69: case 72:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2];
break;
case 54: case 70: case 73:
 this.$ = [$$[$0]]; 
break;
case 56:
 this.$ =  new Asignacion($$[$0-2],$$[$0],_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 57:
 this.$ = new If($$[$0-4],$$[$0-1],null,null,_$[$0-6].first_line, _$[$0-6].first_column);
break;
case 58:
 this.$ = new If($$[$0-8],$$[$0-5],$$[$0-1],null,_$[$0-10].first_line, _$[$0-10].first_column);
break;
case 59:
 this.$ = new If($$[$0-6],$$[$0-3],null,$$[$0],_$[$0-8].first_line, _$[$0-8].first_column);
break;
case 60:
 this.$ = new Switch($$[$0-4],$$[$0-1],null,_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 61:
 this.$ = new Switch($$[$0-5],$$[$0-2],$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 62:
 this.$ = new Switch($$[$0-4],null,$$[$0],_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 63:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 64:
this.$ = [$$[$0]]; 
break;
case 65:
 this.$ = new Case($$[$0-2],$$[$0],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 66:
 this.$ = new Case($$[$0-2],$$[$0],_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 67:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,false); 
break;
case 68:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,true); 
break;
case 71:
 this.$ = new Struct($$[$0-3],$$[$0-1],_$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 74:
 this.$ = new Atributo($$[$0],$$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 75: case 76: case 77: case 78: case 79: case 80: case 81: case 83: case 123:
 this.$ = $$[$0] 
break;
case 82:
 this.$ = new Identificador($$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 84:
this.$ = new Operacion($$[$0-2],$$[$0],Operador.CONCAT, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 85:
this.$ = new Operacion($$[$0-2],$$[$0],Operador.REPEAT, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 86:
this.$ = new CharOfPosition($$[$0-5],$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 87:
this.$ = new SubString($$[$0-7],$$[$0-3],$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column);
break;
case 88:
this.$ = new Length($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 89:
this.$ = new ToUpper($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 90:
this.$ = new ToLower($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 91:
 this.$ = new Logica($$[$0],$$[$0],Operador.NOT, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 92:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.AND, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 93:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.OR, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 94:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.IGUAL_IGUAL, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 95:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 96:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 97:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.DIFERENTE_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 98:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 99:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 100:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.SUMA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 101:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.RESTA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 102:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MULTIPLICACION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 103:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.DIVISION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 104:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MODULO, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 105:
 this.$ = new Operacion($$[$0],$$[$0],Operador.MENOS_UNARIO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 106:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.INCREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 107:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.DECREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 108:
 this.$ = new Operacion($$[$0-3],$$[$0-1],Operador.POW, _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 109:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.SQRT, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 110:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.LOG, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 111:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.SENO, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 112:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.COSENO, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 113:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.TAN, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 114:
 this.$ = new Ternario($$[$0-4],$$[$0-2],$$[$0],_$[$0-4].first_line,_$[$0-4].first_column); 
break;
case 115: case 116:
 this.$ = new Primitivo(Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 117: case 118:
 this.$ = new Primitivo($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 119:
 this.$ = new Primitivo(null, _$[$0].first_line, _$[$0].first_column); 
break;
case 120:
 this.$ = new Primitivo(true, _$[$0].first_line, _$[$0].first_column); 
break;
case 121:
 this.$ = new Primitivo(false, _$[$0].first_line, _$[$0].first_column); 
break;
case 122:
 this.$ = $$[$0-1] 
break;
case 124:
this.$ = new TipoParse(Tipo.INT,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 125:
this.$ = new TipoParse(Tipo.DOUBLE,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 126:
this.$ = new TipoParse(Tipo.BOOL,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 127:
this.$ = new ToInt($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 128:
this.$ = new ToDouble($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 129: case 130:
this.$ = new ToString($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 131:
this.$ = new Typeof($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 132:
this.$ = Tipo.INT; 
break;
case 133:
this.$ = Tipo.DOUBLE; 
break;
case 134:
this.$ = Tipo.STRING; 
break;
case 135:
this.$ = Tipo.BOOL; 
break;
case 136:
this.$ = Tipo.CHAR; 
break;
case 137:
this.$ = Tipo.VOID; 
break;
case 138:
this.$ = new Excepcion(_$[$0].first_line, _$[$0].first_column,"Error Lexico","El token de entrada no es valido","Global"); 
break;
case 139:
this.$ = new Excepcion(_$[$0].first_line, _$[$0].first_column,"Error Sintactico","Token no esperado","Global"); 
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{1:[3]},{2:$V0,5:[1,43],6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},o($Vk,[2,3]),{8:[1,45]},{8:[1,46]},{8:[1,47]},{8:[1,48]},o($Vk,[2,8]),o($Vk,[2,9]),{8:[1,49]},o($Vk,[2,11]),o($Vk,[2,12]),{8:[1,50]},{8:[1,51]},{8:[1,52]},{8:[1,53]},{22:[1,54],23:[1,55],31:$Vl,55:$Vm},{8:[1,58]},o($Vk,[2,20]),o($Vk,[2,21]),o($Vk,[2,22]),o($Vk,[2,23]),{31:[1,59]},{31:[1,60]},{21:[1,62],56:61,57:63},{21:[1,64]},{31:[1,65]},{33:[1,66]},{21:[1,68],31:[1,67]},{8:[2,50],20:79,21:$Vn,31:$Vo,44:70,52:69,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{8:[2,47]},{8:[2,48]},{31:[1,105]},{31:[1,106]},{21:$VN,30:[1,107]},o($Vk,[2,138]),o($Vk,[2,139]),{21:[2,132]},{21:[2,133]},{21:[2,134]},{21:[2,135]},{21:[2,136]},{1:[2,1]},o($Vk,[2,2]),o($Vk,[2,4]),o($Vk,[2,5]),o($Vk,[2,6]),o($Vk,[2,7]),o($Vk,[2,10]),o($Vk,[2,13]),o($Vk,[2,14]),o($Vk,[2,15]),o($Vk,[2,16]),{8:[1,108]},{8:[1,109]},{20:79,21:$Vn,31:$Vo,32:[2,34],41:110,42:111,43:112,44:113,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:114,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},o($Vk,[2,19]),{20:79,21:$Vn,31:$Vo,44:116,68:115,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:116,68:117,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{8:[2,52],38:[1,118]},o($VO,$VP,{31:[1,120],55:$VQ}),o($VO,[2,54]),{33:[1,121]},{20:79,21:$Vn,31:$Vo,44:122,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{2:$V0,4:123,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{10:125,21:[1,128],24:126,29:$VR,35:127,48:124,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi},{50:[1,130]},{8:[2,46]},{8:[2,49],22:$VS,23:$VT,80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},o($V91,[2,75]),o($V91,[2,76]),o($V91,[2,77]),o($V91,[2,78]),o($V91,[2,79]),o($V91,[2,80]),o($V91,[2,81]),o($V91,[2,82],{31:$Vl}),o($V91,[2,83]),o($V91,[2,115]),o($V91,[2,116]),o($V91,[2,117]),o($V91,[2,118]),o($V91,[2,119]),o($V91,[2,120]),o($V91,[2,121]),{20:79,21:$Vn,31:$Vo,44:150,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:151,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:152,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{31:[1,153]},{31:[1,154]},{31:[1,155]},{31:[1,156]},{31:[1,157]},{31:[1,158]},{20:79,21:$Vn,31:$Vo,44:159,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{82:[1,160]},{82:[1,161]},{82:[1,162]},{31:[1,163]},{31:[1,164]},{31:[1,165]},{31:[1,166]},{31:[1,167]},{20:79,21:$Vn,31:$Vo,44:168,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:169,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{31:[1,170]},o($Vk,[2,17]),o($Vk,[2,18]),{32:[1,171]},{32:[2,33],38:[1,172]},o($Va1,[2,36]),o($Va1,[2,37],{22:$VS,23:$VT,80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81}),{8:[2,56],22:$VS,23:$VT,80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{32:[1,173],38:$Vb1},o($Va1,[2,70],{22:$VS,23:$VT,80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81}),{32:[1,175],38:$Vb1},{21:[1,177],57:176},{20:79,21:$Vn,31:$Vo,44:178,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{29:$VR,32:[2,27],35:183,36:179,37:180,39:181,40:182,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi},{29:$VR,35:186,71:184,72:185,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi},{22:$VS,23:$VT,32:[1,187],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{2:$V0,6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,34:[1,188],35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{8:[1,189]},{8:[2,41]},{8:[2,42]},{21:[1,190]},{55:$Vm},{21:$VN},{20:79,21:$Vn,31:$Vo,44:191,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:192,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:193,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:194,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:195,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:196,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},o($V91,[2,106]),o($V91,[2,107]),{20:79,21:$Vn,31:$Vo,44:197,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:198,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:199,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:200,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:201,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:202,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:203,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:204,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:205,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:206,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:207,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{83:[1,208],84:[1,209],85:[1,210],86:[1,211],87:[1,212]},{22:$VS,23:$VT,32:[1,213],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},o([8,32,33,38,65,108],[2,123],{22:$VS,23:$VT,80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),o($V91,[2,105]),{20:79,21:$Vn,31:$Vo,44:214,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:215,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:216,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:217,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:218,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:219,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},o($Vc1,[2,91],{22:$VS,23:$VT}),{118:[1,220]},{118:[1,221]},{118:[1,222]},{20:79,21:$Vn,31:$Vo,44:223,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:224,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:225,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:226,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:227,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{22:$VS,23:$VT,32:[1,228],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,229],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{32:[1,230]},o($V91,[2,32]),{20:79,21:$Vn,31:$Vo,43:231,44:113,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{8:[2,67]},{20:79,21:$Vn,31:$Vo,44:232,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{8:[2,68]},o($VO,[2,53]),o($VO,$VP),{8:[2,51],22:$VS,23:$VT,80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{32:[1,233]},{32:[2,26],38:[1,234]},o($Va1,[2,29]),o($Va1,[2,30]),{21:[1,235]},{34:[1,236],38:[1,237]},o($Vd1,[2,73]),{21:[1,238]},{33:[1,239]},{45:[1,240]},{20:79,21:$Vn,31:$Vo,44:241,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{55:$VQ},{22:$VS,23:$VT,33:[1,242],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},o($Ve1,[2,100],{22:$VS,23:$VT,99:$V51,100:$V61,101:$V71}),o($Ve1,[2,101],{22:$VS,23:$VT,99:$V51,100:$V61,101:$V71}),o($Vc1,[2,102],{22:$VS,23:$VT}),o($Vc1,[2,103],{22:$VS,23:$VT}),o($Vc1,[2,104],{22:$VS,23:$VT}),o($Vf1,[2,94],{22:$VS,23:$VT,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),o($Vf1,[2,95],{22:$VS,23:$VT,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),o($Vf1,[2,96],{22:$VS,23:$VT,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),o($Vf1,[2,97],{22:$VS,23:$VT,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),o($Vf1,[2,98],{22:$VS,23:$VT,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),o($Vf1,[2,99],{22:$VS,23:$VT,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),o($Vg1,[2,92],{22:$VS,23:$VT,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),o([8,32,33,38,65,81,82,90,108],[2,93],{22:$VS,23:$VT,80:$VU,89:$VX,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),{22:$VS,23:$VT,65:[1,243],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},o($Vg1,[2,84],{22:$VS,23:$VT,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),o([8,32,33,38,65,81,82,108],[2,85],{22:$VS,23:$VT,80:$VU,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71}),{31:[1,244]},{31:[1,245]},{31:[1,246]},{31:[1,247]},{31:[1,248]},o($V91,[2,122]),{22:$VS,23:$VT,38:[1,249],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,250],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,251],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,252],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,253],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,254],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{31:[1,255]},{31:[1,256]},{31:[1,257]},{22:$VS,23:$VT,32:[1,258],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,259],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,260],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,261],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,262],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{33:[1,263]},{33:[1,264]},{33:[1,265]},o($Va1,[2,35]),o($Va1,[2,69],{22:$VS,23:$VT,80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81}),{33:[1,266]},{29:$VR,35:183,39:267,40:182,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi},o($Va1,[2,31]),{8:[2,71]},{29:$VR,35:186,72:268,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi},o($Vd1,[2,74]),{2:$V0,4:269,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{31:[1,270]},{8:[1,271],22:$VS,23:$VT,80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{2:$V0,4:272,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{20:79,21:$Vn,31:$Vo,44:273,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:274,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:275,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{32:[1,276]},{32:[1,277]},{32:[1,278]},{20:79,21:$Vn,31:$Vo,44:279,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},o($V91,[2,109]),o($V91,[2,110]),o($V91,[2,111]),o($V91,[2,112]),o($V91,[2,113]),{20:79,21:$Vn,31:$Vo,44:280,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:281,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{20:79,21:$Vn,31:$Vo,44:282,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},o($V91,[2,127]),o($V91,[2,128]),o($V91,[2,129]),o($V91,[2,130]),o($V91,[2,131]),{2:$V0,4:283,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{61:284,62:285,63:286,64:$Vh1,66:$Vi1},{2:$V0,4:289,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{2:$V0,4:290,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},o($Va1,[2,28]),o($Vd1,[2,72]),{2:$V0,6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,34:[1,291],35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{20:79,21:$Vn,31:$Vo,44:292,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{21:[1,294],49:293},{2:$V0,6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,34:[1,295],35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},o([8,32,33,38,65],[2,114],{22:$VS,23:$VT,80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81}),{22:$VS,23:$VT,32:[1,296],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,38:[1,297],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},o($V91,[2,88]),o($V91,[2,89]),o($V91,[2,90]),{22:$VS,23:$VT,32:[1,298],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,299],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,300],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{22:$VS,23:$VT,32:[1,301],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{2:$V0,6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,34:[1,302],35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{34:[1,303],62:304,63:305,64:$Vh1,66:$Vi1},{34:[1,306]},o($Vj1,[2,64]),{65:[1,307]},{20:79,21:$Vn,31:$Vo,44:308,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},{2:$V0,6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,34:[1,309],35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{2:$V0,6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,34:[1,310],35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},o($Vk,[2,38]),{22:$VS,23:$VT,32:[1,311],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{32:[1,312]},{22:[1,313],23:[1,314]},o($Vk,[2,45]),o($V91,[2,86]),{20:79,21:$Vn,31:$Vo,44:315,73:71,74:72,75:73,76:74,77:75,78:76,79:77,88:$Vp,98:$Vq,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,110:$Vy,111:$Vz,112:$VA,113:$VB,114:$VC,115:$VD,116:$VE,117:$VF,119:$VG,120:$VH,121:$VI,122:$VJ,123:$VK,124:$VL,125:$VM},o($V91,[2,108]),o($V91,[2,124]),o($V91,[2,125]),o($V91,[2,126]),o($Vk,[2,57],{59:[1,316]}),o($Vk,[2,60]),{34:[1,317]},o($Vj1,[2,63]),o($Vk,[2,62]),{2:$V0,4:318,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{22:$VS,23:$VT,65:[1,319],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},o($Vk,[2,24]),o($Vk,[2,25]),{8:[2,39]},{33:[1,320]},{32:[2,43]},{32:[2,44]},{22:$VS,23:$VT,32:[1,321],80:$VU,81:$VV,82:$VW,89:$VX,90:$VY,91:$VZ,92:$V_,93:$V$,94:$V01,95:$V11,96:$V21,97:$V31,98:$V41,99:$V51,100:$V61,101:$V71,108:$V81},{25:323,33:[1,322],58:$V9},o($Vk,[2,61]),{2:$V0,6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,34:[2,66],35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{2:$V0,4:324,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{2:$V0,4:325,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},o($V91,[2,87]),{2:$V0,4:326,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},o($Vk,[2,59]),o($Vj1,[2,65],{7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,24:18,25:19,26:20,27:21,28:22,35:25,6:44,2:$V0,21:$V1,29:$V2,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj}),{2:$V0,6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,34:[1,327],35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},{2:$V0,6:44,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V1,24:18,25:19,26:20,27:21,28:22,29:$V2,34:[1,328],35:25,45:$V3,46:$V4,47:$V5,51:$V6,53:$V7,54:$V8,58:$V9,60:$Va,67:$Vb,69:$Vc,70:$Vd,112:$Ve,117:$Vf,119:$Vg,120:$Vh,126:$Vi,127:$Vj},o($Vk,[2,40]),o($Vk,[2,58])],
defaultActions: {31:[2,47],32:[2,48],38:[2,132],39:[2,133],40:[2,134],41:[2,135],42:[2,136],43:[2,1],69:[2,46],125:[2,41],126:[2,42],129:[2,137],173:[2,67],175:[2,68],236:[2,71],311:[2,39],313:[2,43],314:[2,44]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    let producciones = [];
    let gramaticaDDS = [];

    const {Print} = require("../Instrucciones/Print.js");
    const {Primitivo} = require("../Expresiones/Primitivo.js");
    const {Operacion} = require("../Expresiones/Operacion.js");
    const {Operador} = require("../AST/Operador.js");

    const {Relacional} = require("../Expresiones/Relacional.js");
    const {Logica} = require("../Expresiones/Logica.js");
    const {Identificador} = require("../Expresiones/Identificador.js");
    const {Ternario} = require("../Expresiones/Ternario.js");
    const {CharOfPosition} = require("../Expresiones/NativasString/CharOfPosition.js");
    const {SubString} = require("../Expresiones/NativasString/SubString.js");
    //const {LengthString} = require("../Expresiones/NativasString/LengthString.js");
    const {Length} = require("../Expresiones/NativasString/Length.js");
    const {ToUpper} = require("../Expresiones/NativasString/ToUpper.js");
    const {ToLower} = require("../Expresiones/NativasString/ToLower.js");
    const {Incremento} = require("../Expresiones/Incremento.js");
    const {Decremento} = require("../Expresiones/Decremento.js");
    const {TipoParse} = require("../Expresiones/Nativas/TipoParse.js");
    const {ToInt} = require("../Expresiones/Nativas/ToInt.js");
    const {ToDouble} = require("../Expresiones/Nativas/ToDouble.js");
    const {ToString} = require("../Expresiones/Nativas/ToString.js");
    const {Typeof} = require("../Expresiones/Nativas/Typeof.js");
    const {If} = require("../Instrucciones/If.js");
    const {Switch} = require("../Instrucciones/Switch.js");
    const {Case} = require("../Instrucciones/Case.js");

    const {Tipo} = require("../AST/Tipo.js");
    const {Declaracion} = require("../Instrucciones/Declaracion.js");
    const {Asignacion} = require("../Instrucciones/Asignacion.js");
    const {Funcion} = require("../Instrucciones/Funcion.js");
    const {Llamada} = require("../Instrucciones/Llamada.js");
    const {Return} = require("../Instrucciones/Return.js");

    const {Main} = require("../Instrucciones/Main.js");
    const {While} = require("../Instrucciones/While.js");
    const {DoWhile} = require("../Instrucciones/DoWhile.js");
    const {For} = require("../Instrucciones/For.js");
    const {ForIn} = require("../Instrucciones/ForIn.js");

    const {Break} = require("../Instrucciones/Break.js");
    const {Continue} = require("../Instrucciones/Continue.js");

    const {Struct} = require("../Instrucciones/Struct.js");
    const {Atributo} = require("../Instrucciones/Atributo.js");
    
    //const {ReporteGramatical} = require("../Reportes/ReporteGramatical.js");
    //REPORTE GRAMATICAL
    //const producciones = [];
    //const gramaticaDDS = [];
    
    const {Excepcion} = require("../AST/Excepcion.js");

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* IGNORE */
break;
case 1:/* IGNORE */
break;
case 2:/* IGNORE */
break;
case 3:return 113;
break;
case 4:return 117;
break;
case 5:return 119;
break;
case 6:return 120;
break;
case 7:return 112;
break;
case 8:return 126;
break;
case 9:return 29;
break;
case 10:return 114;
break;
case 11:return 115;
break;
case 12:return 67;
break;
case 13:return 69;
break;
case 14:return 51;
break;
case 15:return 53;
break;
case 16:return 54;
break;
case 17:return 30;
break;
case 18:return 45;
break;
case 19:return 46;
break;
case 20:return 47;
break;
case 21:return 50;
break;
case 22:return 53;
break;
case 23:return 54;
break;
case 24:return 60;
break;
case 25:return 64;
break;
case 26:return 66;
break;
case 27:return 58;
break;
case 28:return 59;
break;
case 29:return 30;
break;
case 30:return 70;
break;
case 31:return 102;
break;
case 32:return 103;
break;
case 33:return 104;
break;
case 34:return 105;
break;
case 35:return 106;
break;
case 36:return 107;
break;
case 37:return 83;
break;
case 38:return 84;
break;
case 39:return 85;
break;
case 40:return 86;
break;
case 41:return 87;
break;
case 42:return 118;
break;
case 43:return 121;
break;
case 44:return 122;
break;
case 45:return 123;
break;
case 46:return 124;
break;
case 47:return 125;
break;
case 48:return 22;
break;
case 49:return 23;
break;
case 50:return 97;
break;
case 51:return 98;
break;
case 52:return 99;
break;
case 53:return 100;
break;
case 54:return 101;
break;
case 55:return 91;
break;
case 56:return 92;
break;
case 57:return 93;
break;
case 58:return 94;
break;
case 59:return 95;
break;
case 60:return 96;
break;
case 61:return 55;
break;
case 62:return 89;
break;
case 63:return 90;
break;
case 64:return 88;
break;
case 65:return 80;
break;
case 66:return 81;
break;
case 67:return 116;
break;
case 68:return 8;
break;
case 69:return 65;
break;
case 70:return 31;
break;
case 71:return 32;
break;
case 72:return 108;
break;
case 73:return 33;
break;
case 74:return 34;
break;
case 75:return 'corcheteA';
break;
case 76:return 'corcheteC';
break;
case 77:return 38;
break;
case 78:return 82;
break;
case 79:return 110;
break;
case 80:return 109;
break;
case 81:return 21;
break;
case 82:return 111;
break;
case 83:return 112;
break;
case 84:return;
break;
case 85:
                                        console.error('Este es un error lexico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                                        return 127;
                                    
break;
case 86:return 5
break;
}
},
rules: [/^(?:\/\/.*)/,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/,/^(?:\s+)/,/^(?:null\b)/,/^(?:int\b)/,/^(?:double\b)/,/^(?:boolean\b)/,/^(?:char\b)/,/^(?:String\b)/,/^(?:void\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:print\b)/,/^(?:println\b)/,/^(?:return\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:main\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:in\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:main\b)/,/^(?:struct\b)/,/^(?:pow\b)/,/^(?:sqrt\b)/,/^(?:log\b)/,/^(?:sin\b)/,/^(?:cos\b)/,/^(?:tan\b)/,/^(?:caracterOfPosition\b)/,/^(?:subString\b)/,/^(?:length\b)/,/^(?:toUpperCase\b)/,/^(?:toLowerCase\b)/,/^(?:parse\b)/,/^(?:toInt\b)/,/^(?:toDouble\b)/,/^(?:toString\b)/,/^(?:string\b)/,/^(?:typeof\b)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:==)/,/^(?:<=)/,/^(?:>=)/,/^(?:!=)/,/^(?:<)/,/^(?:>)/,/^(?:=)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:&)/,/^(?:\^)/,/^(?:\$)/,/^(?:;)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\?)/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:\.)/,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/,/^(?:[0-9]+)/,/^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ]*)/,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/,/^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/,/^(?:{Comment})/,/^(?:.)/,/^(?:$)/],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammar;
exports.Parser = grammar.Parser;
exports.parse = function () { return grammar.parse.apply(grammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this)}).call(this,require('_process'))
},{"../AST/Excepcion.js":3,"../AST/Operador.js":4,"../AST/Tipo.js":6,"../Expresiones/Decremento.js":7,"../Expresiones/Identificador.js":8,"../Expresiones/Incremento.js":9,"../Expresiones/Logica.js":10,"../Expresiones/Nativas/TipoParse.js":11,"../Expresiones/Nativas/ToDouble.js":12,"../Expresiones/Nativas/ToInt.js":13,"../Expresiones/Nativas/ToString.js":14,"../Expresiones/Nativas/Typeof.js":15,"../Expresiones/NativasString/CharOfPosition.js":16,"../Expresiones/NativasString/Length.js":17,"../Expresiones/NativasString/SubString.js":18,"../Expresiones/NativasString/ToLower.js":19,"../Expresiones/NativasString/ToUpper.js":20,"../Expresiones/Operacion.js":21,"../Expresiones/Primitivo.js":22,"../Expresiones/Relacional.js":23,"../Expresiones/Ternario.js":24,"../Instrucciones/Asignacion.js":26,"../Instrucciones/Atributo.js":27,"../Instrucciones/Break.js":28,"../Instrucciones/Case.js":29,"../Instrucciones/Continue.js":30,"../Instrucciones/Declaracion.js":31,"../Instrucciones/DoWhile.js":32,"../Instrucciones/For.js":33,"../Instrucciones/ForIn.js":34,"../Instrucciones/Funcion.js":35,"../Instrucciones/If.js":36,"../Instrucciones/Llamada.js":37,"../Instrucciones/Main.js":38,"../Instrucciones/Print.js":39,"../Instrucciones/Return.js":40,"../Instrucciones/Struct.js":41,"../Instrucciones/Switch.js":42,"../Instrucciones/While.js":43,"_process":50,"fs":48,"path":49}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_js_1 = require("../AST/Tipo.js");
const Quadrupla_1 = require("../Traductor/Quadrupla");
const Operador_1 = require("../AST/Operador");
class Asignacion {
    constructor(identificador, exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
    }
    traducir(controlador) {
        const variable = controlador.actual.getSimbolo(this.identificador);
        let simboloValor = variable.getTipo(controlador.actual, controlador.arbol);
        let valor = this.expresion.getValorImplicito(controlador.actual, controlador.arbol);
        console.log(simboloValor);
        if (simboloValor == Tipo_js_1.Tipo.STRING) {
            const tmp = controlador.getTemp();
            const tmp2 = controlador.getTemp();
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `H`, ``, `${tmp}`));
            for (let i = 0; i < valor.length; i++) {
                controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[(int)H]`));
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA, `H`, `1`, `H`));
            }
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `-1`, ``, `${controlador.arbol.heap}[(int)H]`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `H`, `1`, `H`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${variable.posicion.toString()}`, `${tmp2}`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${tmp}`, ``, `${controlador.arbol.stack}[(int)${tmp2}]`));
            console.log(controlador);
        }
        else if (simboloValor == Tipo_js_1.Tipo.INT || simboloValor == Tipo_js_1.Tipo.DOUBLE || simboloValor == Tipo_js_1.Tipo.BOOL) {
            const tmp = controlador.getTemp();
            controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp));
            const quad_expr = this.expresion.traducir(controlador);
            const res = (quad_expr) ? quad_expr.resultado : "";
            controlador.addQuad(new Quadrupla_1.Quadrupla("ASSIGN", res, "", controlador.arbol.stack + "[(int)" + tmp + "]"));
        }
        return;
    }
    ejecutar(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (!(valor instanceof Excepcion_1.Excepcion)) {
            if (ent.existe(this.identificador)) {
                let simbolo = ent.getSimbolo(this.identificador);
                let simboloValor = simbolo.getTipo(ent, arbol);
                if (simboloValor == tipoValor || (tipoValor == Tipo_js_1.Tipo.NULL && simboloValor == Tipo_js_1.Tipo.STRING) || (tipoValor == Tipo_js_1.Tipo.INT && simboloValor == Tipo_js_1.Tipo.DOUBLE) || (tipoValor == Tipo_js_1.Tipo.CHAR && simboloValor == Tipo_js_1.Tipo.STRING)) {
                    simbolo.setValor(valor);
                    ent.reemplazar(this.identificador, simbolo);
                    return simbolo;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Los tipos no coinciden", ent.getEntorno());
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable no esta definida", ent.getEntorno());
            }
        }
        else {
            return valor;
        }
    }
    isDouble(tipoValor, simboloValor) {
        return tipoValor == Tipo_js_1.Tipo.INT && simboloValor == Tipo_js_1.Tipo.DOUBLE;
    }
}
exports.Asignacion = Asignacion;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Tipo.js":6,"../Traductor/Quadrupla":46}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
class Atributo {
    constructor(identificador, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.valor = null;
        this.tipo = tipo;
    }
    getTipo(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    getValorImplicito(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.Atributo = Atributo;

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
class Break {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, arbol) {
        return this;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.Break = Break;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class Case {
    constructor(expresion, instrucciones, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, arbol) {
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        nuevoEntorno.setEntorno("Case");
        for (let i in this.instrucciones) {
            let result = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
            if (result instanceof Excepcion_1.Excepcion || result instanceof Break_1.Break || result instanceof Return_1.Return)
                return result;
            else if (result instanceof Continue_1.Continue)
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Continue fuera de loop", nuevoEntorno.getEntorno());
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    getExpresion() {
        return this.expresion;
    }
}
exports.Case = Case;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"./Break":28,"./Continue":30,"./Return":40}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
class Continue {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, arbol) {
        return this;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.Continue = Continue;

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Operador_1 = require("../AST/Operador");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Quadrupla_1 = require("../Traductor/Quadrupla");
const Llamada_1 = require("./Llamada");
class Declaracion {
    constructor(identificador, expresion, tipo, identificadores, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.tipo = tipo;
        this.identificadores = identificadores;
    }
    traducir(controlador) {
        if (this.expresion == null) {
            return;
        }
        const variable = controlador.actual.getSimbolo(this.identificador);
        let simboloValor = variable.getTipo(controlador.actual, controlador.arbol);
        let valor = this.expresion.getValorImplicito(controlador.actual, controlador.arbol);
        if (simboloValor == Tipo_1.Tipo.STRING) {
            const tmp = controlador.getTemp();
            const tmp2 = controlador.getTemp();
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `H`, ``, `${tmp}`));
            for (let i = 0; i < valor.length; i++) {
                controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[(int)H]`));
                controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA, `H`, `1`, `H`));
            }
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `-1`, ``, `${controlador.arbol.heap}[(int)H]`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `H`, `1`, `H`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${variable.posicion.toString()}`, `${tmp2}`));
            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${tmp}`, ``, `${controlador.arbol.stack}[(int)${tmp2}]`));
            console.log(controlador);
        }
        else if (simboloValor == Tipo_1.Tipo.INT || simboloValor == Tipo_1.Tipo.DOUBLE || simboloValor == Tipo_1.Tipo.BOOL) {
            const tmp = controlador.getTemp();
            controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA.toString(), "P", variable.posicion.toString(), tmp));
            const quad_expr = this.expresion.traducir(controlador);
            const res = (quad_expr) ? quad_expr.resultado : "";
            controlador.addQuad(new Quadrupla_1.Quadrupla("ASSIGN", res, "", controlador.arbol.stack + "[(int)" + tmp + "]"));
        }
        return;
    }
    ejecutar(ent, arbol) {
        let valor;
        let tipoValor;
        if (this.expresion != null) { //INT A = suma(a,b);
            if (this.expresion instanceof Llamada_1.Llamada) {
                valor = this.expresion.ejecutar(ent, arbol);
                if (valor instanceof Excepcion_1.Excepcion)
                    return valor;
                tipoValor = this.expresion.getTipo(ent, arbol);
            }
            else {
                valor = this.expresion.getValorImplicito(ent, arbol);
                if (valor instanceof Excepcion_1.Excepcion)
                    return valor;
                tipoValor = this.expresion.getTipo(ent, arbol);
            } //ARREGLAR PARA UN STRING Y CHAR
            if (tipoValor == this.tipo || (tipoValor == Tipo_1.Tipo.NULL && this.tipo == Tipo_1.Tipo.STRING) || this.isDouble(tipoValor) || (tipoValor == Tipo_1.Tipo.CHAR && this.tipo == Tipo_1.Tipo.STRING)) {
                if (!ent.existeEnActual(this.identificador)) {
                    let simbolo = new Simbolo_1.Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                    simbolo.posicion = arbol.posiciones++;
                    ent.agregar(this.identificador, simbolo);
                    return simbolo;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable ya existe", ent.getEntorno());
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "El tipo asignado a la variable no es correcto", ent.getEntorno());
            }
        }
        else {
            if (this.identificadores.length > 0) {
                for (let i in this.identificadores) {
                    let identificador = this.identificadores[i];
                    if (!ent.existe(identificador)) {
                        let simbolo = new Simbolo_1.Simbolo(this.tipo, identificador, this.linea, this.columna, null);
                        simbolo.posicion = arbol.posiciones++;
                        ent.agregar(identificador, simbolo);
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable ya existe", ent.getEntorno());
                    }
                }
            }
        }
    }
    getTipo() {
        if (this.tipo === Tipo_1.Tipo.BOOL) {
            return 'boolean';
        }
        else if (this.tipo === Tipo_1.Tipo.STRING) {
            return 'string';
        }
        else if (this.tipo === Tipo_1.Tipo.INT) {
            return 'int';
        }
        else if (this.tipo === Tipo_1.Tipo.DOUBLE) {
            return 'double';
        }
        else if (this.tipo === Tipo_1.Tipo.CHAR) {
            return 'char';
        }
        return '';
    }
    getTipoEnum() {
        return this.tipo;
    }
    getIdentificador() {
        return this.identificador;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isDouble(tipoValor) {
        return tipoValor == Tipo_1.Tipo.INT && this.tipo == Tipo_1.Tipo.DOUBLE;
    }
}
exports.Declaracion = Declaracion;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../Traductor/Quadrupla":46,"./Llamada":37}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoWhile = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class DoWhile {
    constructor(instrucciones, condicion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }
    ejecutar(ent, arbol) {
        let condicion = this.condicion.getValorImplicito(ent, arbol);
        if (condicion instanceof Excepcion_1.Excepcion)
            return condicion;
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        nuevoEntorno.setEntorno("DoWhile");
        if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
            arbol.tablas.push(nuevoEntorno); //GUARDANDO LAS TABLAS PARA EL RECORRIDO EN 3D
            do {
                for (let i in this.instrucciones) {
                    let instruccion = this.instrucciones[i];
                    let result = instruccion.ejecutar(nuevoEntorno, arbol);
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    else if (result instanceof Return_1.Return)
                        return result;
                    else if (result instanceof Break_1.Break)
                        return;
                    else if (result instanceof Continue_1.Continue)
                        break;
                }
                condicion = this.condicion.getValorImplicito(ent, arbol);
            } while (condicion);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "El tipo de dato en condicion debe ser booleano", nuevoEntorno.getEntorno());
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.DoWhile = DoWhile;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":6,"./Break":28,"./Continue":30,"./Return":40}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Declaracion_1 = require("./Declaracion");
const Return_1 = require("./Return");
class For {
    constructor(instrucciones, valorInicial, condicion, asignacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.condicion = condicion;
        this.asignacion = asignacion;
        this.valorInicial = valorInicial;
    }
    ejecutar(ent, arbol) {
        let valorInicial;
        let isDeclaracion = false;
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        if (this.valorInicial instanceof Declaracion_1.Declaracion) {
            nuevoEntorno.setEntorno("For");
            valorInicial = this.valorInicial.ejecutar(nuevoEntorno, arbol);
            isDeclaracion = true;
        }
        else {
            valorInicial = this.valorInicial.ejecutar(ent, arbol);
        }
        if (valorInicial instanceof Excepcion_1.Excepcion)
            return valorInicial;
        console.log(valorInicial);
        while (true) {
            let condicion;
            if (isDeclaracion) {
                condicion = this.condicion.getValorImplicito(nuevoEntorno, arbol);
            }
            else {
                condicion = this.condicion.getValorImplicito(ent, arbol);
            }
            console.log("condicion", condicion);
            if (condicion instanceof Excepcion_1.Excepcion)
                return condicion;
            if (condicion == true || condicion == false) {
                if (condicion) {
                    let nuevoEntornoAux;
                    if (isDeclaracion) {
                        nuevoEntornoAux = new Entorno_1.Entorno(nuevoEntorno);
                    }
                    else {
                        nuevoEntornoAux = new Entorno_1.Entorno(ent);
                    }
                    console.log(this.instrucciones);
                    for (let i in this.instrucciones) {
                        let result = this.instrucciones[i].ejecutar(nuevoEntornoAux, arbol);
                        if (result instanceof Excepcion_1.Excepcion)
                            return result;
                        else if (result instanceof Return_1.Return)
                            return result;
                        else if (result instanceof Break_1.Break)
                            return;
                        else if (result instanceof Continue_1.Continue)
                            break;
                    }
                    console.log(this.asignacion);
                    this.asignacion.ejecutar(nuevoEntornoAux, arbol);
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La condicion del For no es de tipo Booleano", nuevoEntorno.getEntorno());
            }
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.For = For;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"./Break":28,"./Continue":30,"./Declaracion":31,"./Return":40}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForIn = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class ForIn {
    constructor(instrucciones, variable, expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.variable = variable;
        this.expresion = expresion;
    }
    ejecutar(ent, arbol) {
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        let valueExpresion = this.expresion.getValorImplicito(nuevoEntorno, arbol);
        if (valueExpresion instanceof Excepcion_1.Excepcion)
            return valueExpresion;
        else if (typeof (valueExpresion) === "string") {
            let simbolo = new Simbolo_1.Simbolo(Tipo_1.Tipo.STRING, this.variable, this.linea, this.columna, null);
            ;
            for (let i = 0; i < valueExpresion.length; i++) {
                if (!nuevoEntorno.existeEnActual(this.variable)) {
                    simbolo.setValor(valueExpresion[i]);
                    ent.agregar(this.variable, simbolo);
                }
                else {
                    simbolo.setValor(valueExpresion[i]);
                    ent.reemplazar(this.variable, simbolo);
                }
                for (let j in this.instrucciones) {
                    let result = this.instrucciones[j].ejecutar(nuevoEntorno, arbol);
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    else if (result instanceof Return_1.Return)
                        return result;
                    else if (result instanceof Break_1.Break)
                        return;
                    else if (result instanceof Continue_1.Continue)
                        break;
                }
            }
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Valor en For in debe ser String", nuevoEntorno.getEntorno());
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.ForIn = ForIn;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Simbolo":5,"../AST/Tipo":6,"./Break":28,"./Continue":30,"./Return":40}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Tipo_1 = require("../AST/Tipo");
const Excepcion_1 = require("../AST/Excepcion");
const Return_1 = require("./Return");
class Funcion {
    constructor(nombre, parametros, instrucciones, tipo, linea, columna) {
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        ent.setEntorno("Funcion " + this.nombre);
        for (let i in this.instrucciones) {
            let value = this.instrucciones[i].ejecutar(ent, arbol);
            if (value instanceof Excepcion_1.Excepcion) {
                return value;
            }
            else if (value instanceof Return_1.Return) {
                if (this.tipo == value.getTipo()) {
                    if (this.tipo != Tipo_1.Tipo.VOID)
                        return value.getValue();
                    else
                        return this;
                }
                else
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "El valor de retorno no coincide con el tipo de la funcion.", ent.getEntorno());
            }
        }
        if (this.tipo != Tipo_1.Tipo.VOID) {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La funcion debe retornar un valor", ent.getEntorno());
        }
    }
    getNombre() {
        return this.nombre;
    }
    getParametros() {
        return this.parametros;
    }
    getTipo() {
        return this.tipo;
    }
}
exports.Funcion = Funcion;

},{"../AST/Excepcion":3,"../AST/Tipo":6,"./Return":40}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class If {
    constructor(condicion, instruccionesIf, instruccionesElse, elseIf, linea, columna) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.instruccionesElse = instruccionesElse;
        this.elseIf = elseIf;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let condicion = this.condicion.getValorImplicito(ent, arbol);
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        nuevoEntorno.setEntorno("If");
        if (condicion instanceof Excepcion_1.Excepcion)
            return condicion;
        if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
            if (condicion) { //SI EL VALOR DE LA CONDICION SE CUMPLE
                arbol.tablas.push(nuevoEntorno); //GUARDANDO EL NUEVO ENTORNO PARA RECORRIDO EN 3D
                for (let i in this.instruccionesIf) {
                    let instruccion = this.instruccionesIf[i];
                    let result = instruccion.ejecutar(nuevoEntorno, arbol);
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    else if (result instanceof Return_1.Return)
                        return result;
                    else if (result instanceof Break_1.Break)
                        return result;
                    else if (result instanceof Continue_1.Continue)
                        return result;
                }
            }
            else {
                if (this.instruccionesElse != null) {
                    let nuevoEntorno = new Entorno_1.Entorno(ent);
                    nuevoEntorno.setEntorno("Else");
                    arbol.tablas.push(nuevoEntorno); //GUARDANDO EL NUEVO ENTORNO PARA RECORRIDO EN 3D
                    for (let i in this.instruccionesElse) {
                        let instruccion = this.instruccionesElse[i];
                        let result = instruccion.ejecutar(nuevoEntorno, arbol);
                        if (result instanceof Excepcion_1.Excepcion)
                            return result;
                        else if (result instanceof Return_1.Return)
                            return result;
                        else if (result instanceof Break_1.Break)
                            return result;
                        else if (result instanceof Continue_1.Continue)
                            return result;
                    }
                }
                else if (this.elseIf != null) {
                    let result = this.elseIf.ejecutar(ent, arbol);
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    else if (result instanceof Return_1.Return)
                        return result;
                    else if (result instanceof Break_1.Break)
                        return result;
                    else if (result instanceof Continue_1.Continue)
                        return result;
                }
            }
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La condicion en If debe ser booleana", nuevoEntorno.getEntorno());
        }
    }
    getTipo(ent, arbol) {
        let type_Condicional = this.condicion.getTipo(ent, arbol);
        if (type_Condicional == Tipo_1.Tipo.BOOL) {
            return type_Condicional;
        }
        else {
            return Tipo_1.Tipo.VOID;
        }
    }
}
exports.If = If;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":6,"./Break":28,"./Continue":30,"./Return":40}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
const Entorno_1 = require("../AST/Entorno");
const Tipo_1 = require("../AST/Tipo");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
class Llamada {
    constructor(nombre, parametros, linea, columna) {
        this.nombre = nombre;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, arbol) {
        let funcion = arbol.getFuncion(this.nombre);
        if (funcion === null) {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La funcion llamada no existe", ent.getEntorno());
        }
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        //nuevoEntorno.setEntorno("Llamada a Funcion");
        arbol.tablas.push(nuevoEntorno); //REVISAR POR QUE SE CREA UN NUEVO ENTORNO
        //console.log(nuevoEntorno);
        let parametrosFuncion = funcion.getParametros();
        if (this.parametros.length == parametrosFuncion.length) {
            for (let i in this.parametros) {
                let expresion = this.parametros[i];
                let expresionValue = expresion.getValorImplicito(ent, arbol);
                if (expresionValue instanceof Excepcion_1.Excepcion) {
                    return expresionValue;
                }
                let expresionTipo = expresion.getTipo(ent, arbol);
                let parametroTipo = parametrosFuncion[i].getTipoEnum();
                if (expresionTipo == parametroTipo || (expresionTipo == Tipo_1.Tipo.INT && parametroTipo == Tipo_1.Tipo.DOUBLE)) {
                    let simbolo = new Simbolo_1.Simbolo(parametroTipo, parametrosFuncion[i].getIdentificador(), this.linea, this.columna, expresionValue);
                    nuevoEntorno.agregar(simbolo.getIdentificador(), simbolo);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La tipos en la llamada no coinciden", nuevoEntorno.getEntorno());
                }
            }
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La cantidad de parametros no es correcta", nuevoEntorno.getEntorno());
        }
        let result = funcion.ejecutar(nuevoEntorno, arbol);
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        return result;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    getTipo(ent, arbol) {
        let funcion = arbol.getFuncion(this.nombre);
        return funcion.getTipo();
    }
    getValorImplicito(ent, arbol) {
        return this.ejecutar(ent, arbol);
    }
}
exports.Llamada = Llamada;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Simbolo":5,"../AST/Tipo":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Return_1 = require("./Return");
class Main {
    constructor(instrucciones, linea, columna) {
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, arbol) {
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        nuevoEntorno.setEntorno("Main");
        arbol.tablas.push(nuevoEntorno); //GUARDANDO LAS TS PARA EL RECORRIDO EN 3D
        for (let i in this.instrucciones) {
            if (!(this.instrucciones[i] instanceof Excepcion_1.Excepcion)) {
                let value = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
                console.log(nuevoEntorno.getTabla());
                if (value instanceof Excepcion_1.Excepcion) {
                    arbol.addExcepcion(value);
                    arbol.updateConsola("\n" + value.toString());
                }
                else if (value instanceof Return_1.Return) {
                    if (value.getTipo() == Tipo_1.Tipo.VOID)
                        return this;
                    else
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "Main no puede retornar un valor", nuevoEntorno.getEntorno());
                }
            }
            else {
                arbol.addExcepcion(this.instrucciones[i]);
                arbol.updateConsola("\n" + this.instrucciones[i].toString());
            }
        }
    }
    traducir(controlador) {
        var _a;
        controlador.actual = (_a = controlador.arbol.tablas.shift()) !== null && _a !== void 0 ? _a : new Entorno_1.Entorno(null); //VERIFICA QUE EL ENTORNO NO SE UNDEFINED
        this.instrucciones.forEach(instruccion => {
            instruccion.traducir(controlador);
        });
    }
}
exports.Main = Main;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":6,"./Return":40}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Operador_1 = require("../AST/Operador");
const Tipo_1 = require("../AST/Tipo");
const Identificador_1 = require("../Expresiones/Identificador");
const Primitivo_1 = require("../Expresiones/Primitivo");
const Excepcion_1 = require("../AST/Excepcion");
const Quadrupla_1 = require("../Traductor/Quadrupla");
// print("hola mundo");
class Print {
    constructor(expresiones, linea, columna, salto) {
        this.expresiones = expresiones;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }
    traducir(controlador) {
        this.expresiones.forEach(element => {
            const tmpQ = element.traducir(controlador);
            let valor = element.getValorImplicito(controlador.actual, controlador.arbol);
            let tipoValor = element.getTipo(controlador.actual, controlador.arbol);
            if (tmpQ) {
                if (tipoValor == Tipo_1.Tipo.INT || tipoValor == Tipo_1.Tipo.DOUBLE || tipoValor == Tipo_1.Tipo.BOOL) {
                    controlador.addQuad(new Quadrupla_1.Quadrupla("PRINTF", "%f", "(double)" + tmpQ.resultado, ""));
                }
                else if (tipoValor == Tipo_1.Tipo.STRING) {
                    if (element instanceof Primitivo_1.Primitivo) {
                        const tmp = controlador.getTemp();
                        const tmp2 = controlador.getTemp();
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `H`, ``, `${tmp}`));
                        for (let i = 0; i < valor.length; i++) {
                            controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${valor.charCodeAt(i)}`, ``, `${controlador.arbol.heap}[(int)H]`));
                            controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA, `H`, `1`, `H`));
                        }
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `-1`, ``, `${controlador.arbol.heap}[(int)H]`));
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `H`, `1`, `H`));
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${controlador.arbol.posiciones}`, `${tmp2}`));
                        controlador.addQuad(new Quadrupla_1.Quadrupla(`ASSIGN`, `${tmp}`, ``, `${controlador.arbol.stack}[(int)${tmp2}]`));
                        controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA, "P", `${controlador.arbol.posiciones}`, "P"));
                        let existe = false;
                        controlador.quads.forEach(element => {
                            if (element.arg1 == "imprimir_cadena") {
                                existe = true;
                            }
                        });
                        if (!existe) {
                            controlador.addQuad(new Quadrupla_1.Quadrupla("CALL", "imprimir_cadena", `${controlador.temps}`, ""));
                            controlador.temps += 2;
                        }
                        else {
                            controlador.addQuad(new Quadrupla_1.Quadrupla("CALL", "imprimir_cadena", `-`, ""));
                        }
                        controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.RESTA, "P", `${controlador.arbol.posiciones}`, "P"));
                    }
                    else if (element instanceof Identificador_1.Identificador) {
                        const simbolo = controlador.actual.getSimbolo(element.identificador);
                        controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.SUMA, "P", `${simbolo.posicion}`, "P"));
                        let existe = false;
                        controlador.quads.forEach(element => {
                            if (element.arg1 == "imprimir_cadena") {
                                existe = true;
                            }
                        });
                        controlador.addQuad(new Quadrupla_1.Quadrupla("CALL", "imprimir_cadena", `${controlador.temps}`, ""));
                        if (!existe) {
                            controlador.temps += 2;
                        }
                        controlador.addQuad(new Quadrupla_1.Quadrupla(Operador_1.Operador.RESTA, "P", `${simbolo.posicion}`, "P"));
                    }
                }
            }
        });
        if (this.salto) {
            controlador.addQuad(new Quadrupla_1.Quadrupla("PRINTF", '%c', "((char)10)", ""));
        }
    }
    ejecutar(ent, arbol) {
        for (let i in this.expresiones) {
            let valor = this.expresiones[i].getValorImplicito(ent, arbol);
            if (valor instanceof Excepcion_1.Excepcion) {
                return valor;
            }
            arbol.updateConsola(valor);
        }
        if (this.salto) {
            arbol.updateConsola("\n");
        }
    }
    addSalto(valor) {
        return this.salto ? valor + "\n" : valor;
    }
}
exports.Print = Print;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Tipo":6,"../Expresiones/Identificador":8,"../Expresiones/Primitivo":22,"../Traductor/Quadrupla":46}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Return {
    constructor(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = null;
        this.value = null;
    }
    ejecutar(ent, arbol) {
        if (this.expresion == null) {
            this.tipo = Tipo_1.Tipo.VOID;
            return this;
        }
        let value = this.expresion.getValorImplicito(ent, arbol);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        this.tipo = this.expresion.getTipo(ent, arbol);
        this.value = value;
        return this;
    }
    traducir(controlador) {
        if (this.expresion == null) {
            return;
        }
        //AQUI DEBE IR EL CODIGO EN 3D PARA EL RETURN DE EXPRESIONES
    }
    getTipo() {
        return this.tipo;
    }
    getValue() {
        return this.value;
    }
}
exports.Return = Return;

},{"../AST/Excepcion":3,"../AST/Tipo":6}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = void 0;
class Struct {
    constructor(identificador, atributos, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.atributos = atributos;
    }
    ejecutar(ent, arbol) {
        return;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    getIdentificador() {
        return this.identificador;
    }
}
exports.Struct = Struct;

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Break_1 = require("./Break");
const Return_1 = require("./Return");
class Switch {
    constructor(expresion, cases, default_s, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.cases = cases;
        this.default_s = default_s;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        if (this.cases.length == 0) {
            if (this.default_s != null) {
                let result = this.default_s.ejecutar(ent, arbol);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
        }
        else {
            let match = false;
            let existingBreak = false;
            for (let i in this.cases) {
                let caseObj = this.cases[i];
                let expresionCase = this.cases[i].getExpresion().getValorImplicito(ent, arbol);
                if (expresionCase instanceof Excepcion_1.Excepcion)
                    return expresionCase;
                let expresionSwitch = this.expresion.getValorImplicito(ent, arbol);
                if (expresionSwitch == expresionCase || match) {
                    let result = caseObj.ejecutar(ent, arbol);
                    match = true;
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    else if (result instanceof Break_1.Break) {
                        existingBreak = true;
                        break;
                    }
                    else if (result instanceof Return_1.Return)
                        return result;
                }
            }
            if (!existingBreak && this.default_s != null) {
                let result = this.default_s.ejecutar(ent, arbol);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
                else if (result instanceof Return_1.Return)
                    return result;
            }
        }
    }
}
exports.Switch = Switch;

},{"../AST/Excepcion":3,"./Break":28,"./Return":40}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class While {
    constructor(instrucciones, condicion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }
    ejecutar(ent, arbol) {
        while (true) {
            let condicion = this.condicion.getValorImplicito(ent, arbol);
            if (condicion instanceof Excepcion_1.Excepcion)
                return condicion;
            let nuevoEntorno = new Entorno_1.Entorno(ent);
            nuevoEntorno.setEntorno("While");
            if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
                if (condicion) {
                    arbol.tablas.push(nuevoEntorno);
                    for (let i in this.instrucciones) {
                        let instruccion = this.instrucciones[i];
                        let result = instruccion.ejecutar(nuevoEntorno, arbol);
                        if (result instanceof Excepcion_1.Excepcion)
                            return result;
                        else if (result instanceof Return_1.Return)
                            return result;
                        else if (result instanceof Break_1.Break)
                            return;
                        else if (result instanceof Continue_1.Continue)
                            break;
                    }
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "El tipo de dato en condicion debe ser booleano", nuevoEntorno.getEntorno());
            }
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.While = While;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":6,"./Break":28,"./Continue":30,"./Return":40}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadControlador = void 0;
const Entorno_1 = require("../AST/Entorno");
class QuadControlador {
    constructor(arbol) {
        this.quads = [];
        this.labels = 0;
        this.temps = 0;
        this.codigo3D = [];
        this.arbol = arbol;
        this.actual = new Entorno_1.Entorno(null);
    }
    getTemp() {
        return `t${this.temps++}`;
    }
    getLabel() {
        return `L${this.labels++}`;
    }
    addQuad(quad) {
        this.quads.push(quad);
    }
}
exports.QuadControlador = QuadControlador;

},{"../AST/Entorno":2}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quadrupla = void 0;
class Quadrupla {
    constructor(operacion, arg1, arg2, resultado) {
        this.operacion = operacion;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.resultado = resultado;
    }
    toString() {
        return `operacion: ${this.operacion}, arg1: ${this.arg1}, arg2 ${this.arg2}, resultado: ${this.resultado}`;
    }
}
exports.Quadrupla = Quadrupla;

},{}],47:[function(require,module,exports){
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
const { Operador } = require("./AST/Operador.js");

const { QuadControlador } = require("./Traductor/QuadControlador.js");
const tablaSimbolos = [];

if (typeof window !== 'undefined') {
    window.parseExternal = function (input) {
        const instrucciones = grammar.parse(input);
        const ast = new AST.AST(instrucciones);
        const entornoGlobal = new Entorno.Entorno(null);
        entornoGlobal.setEntorno("Global");
        const controlador = new QuadControlador(ast);
        ast.tablas.push(entornoGlobal); //GUARDO EL ENTORNO/TABLA PARA EL CODIGO EN 3D
        //console.log(ast.tablas);
        ast.instrucciones.forEach(function (element) {
            let value;
            if (element instanceof Funcion.Funcion) {
                let value = ast.addFuncion(element);
                if (value instanceof Excepcion.Excepcion) {
                    ast.addExcepcion(value);
                    ast.updateConsola("\n" + value);
                }

            } else if (element instanceof Struct.Struct) {
                let value = ast.addStruct(element);
                if (value instanceof Excepcion.Excepcion) {
                    ast.addExcepcion(value);
                    ast.updateConsola("\n" + value);
                }
            } else if (element instanceof Declaracion.Declaracion) {
                value = element.ejecutar(entornoGlobal, ast);
                if (value instanceof Excepcion.Excepcion) {
                    ast.addExcepcion(value);
                    ast.updateConsola("\n" + value);
                }
            }

            if (element instanceof Excepcion.Excepcion) {
                ast.addExcepcion(element);
                ast.updateConsola("\n" + element);
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
                        ast.updateConsola("\n" + value);
                    }
                    main1 = element;
                } else {
                    let excepcion = new Excepcion.Excepcion(value.linea, value.columna, "Error Semantico", "Existe mas de una funcion Main")
                    ast.addExcepcion(excepcion);
                    ast.updateConsola("\n" + excepcion);
                    return;
                }
            }

        });

        ast.instrucciones.forEach(function (element) {
            if (!(element instanceof Main.Main || element instanceof Declaracion.Declaracion || element instanceof Funcion.Funcion || element instanceof Struct.Struct || element instanceof Excepcion.Excepcion)) {
                let excepcion = new Excepcion.Excepcion(element.linea, element.columna, "Error Semantico", "Sentencias fuera de Main")
                ast.addExcepcion(excepcion);
                ast.updateConsola("\n" + excepcion)
            }

        });

        console.log(entornoGlobal);
        return [ast.getConsola(), ast.getExcepciones()];
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
                if (value instanceof Excepcion.Excepcion) {
                    ast.addExcepcion(value);
                    ast.updateConsola(value);
                }
            }else if(element instanceof Excepcion.Excepcion) {
                ast.addExcepcion(element);
                ast.updateConsola(element.toString());
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

                    let excepcion = new Excepcion.Excepcion(value.linea, value.columna, "Error Semantico", "Existe mas de una funcion Main")

                    ast.addExcepcion(excepcion);
                    ast.updateConsola(excepcion);
                    return;
                }
            }

        });

        ast.instrucciones.forEach(function (element) {

            console.log(element);
            if (!(element instanceof Main.Main || element instanceof Declaracion.Declaracion || element instanceof Funcion.Funcion || element instanceof Struct.Struct || element instanceof Excepcion.Excepcion)) {
                let excepcion = new Excepcion.Excepcion(element.linea, element.columna, "Error Semantico", "Sentencias fuera de Main")

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





},{"./AST/AST.js":1,"./AST/Entorno.js":2,"./AST/Excepcion.js":3,"./AST/Operador.js":4,"./Gramatica/grammar.js":25,"./Instrucciones/Declaracion.js":31,"./Instrucciones/Funcion.js":35,"./Instrucciones/Main.js":38,"./Instrucciones/Return.js":40,"./Instrucciones/Struct.js":41,"./Interfaces/Instruccion.js":44,"./Traductor/QuadControlador.js":45}],48:[function(require,module,exports){

},{}],49:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":50}],50:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[47]);
