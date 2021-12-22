(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
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
        this.funciones.push(funcion);
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
    addExcepcion(excepcion) {
        this.excepciones.push(excepcion);
    }
}
exports.AST = AST;

},{"../Traductor/QuadControlador":44}],2:[function(require,module,exports){
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
}
exports.Entorno = Entorno;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excepcion = void 0;
class Excepcion {
    constructor(linea, columna, tipo, descripcion) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.descripcion = descripcion;
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
const Excepcion_1 = require("../AST/Excepcion");
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
        throw new Error("Method not implemented.");
    }
}
exports.Decremento = Decremento;

},{"../AST/Excepcion":3}],8:[function(require,module,exports){
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La variable no existe");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La variable no existe");
        }
    }
    traducir(controlador) {
        const variable = controlador.actual.getSimbolo(this.identificador);
        const tmp = controlador.getTemp();
        const tmp2 = controlador.getTemp();
        controlador.addQuad(new Quadrupla_1.Quadrupla(`${Operador_1.Operador.SUMA}`, "P", variable.posicion.toString(), tmp));
        const quad = new Quadrupla_1.Quadrupla("ASSIG", `${controlador.arbol.stack}[${tmp}]`, "", tmp2);
        return quad;
    }
}
exports.Identificador = Identificador;

},{"../AST/Excepcion":3,"../AST/Operador":4,"../Traductor/Quadrupla":45}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incremento = void 0;
const Excepcion_1 = require("../AST/Excepcion");
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
        throw new Error("Method not implemented.");
    }
}
exports.Incremento = Incremento;

},{"../AST/Excepcion":3}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logica = void 0;
const Tipo_1 = require("../AST/Tipo");
const Excepcion_1 = require("../AST/Excepcion");
const Operador_1 = require("../AST/Operador");
class Logica {
    constructor(op_izquierda, op_derecha, operador, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operador;
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
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "Tipo de Dato Erroneo para AND");
                }
            }
            //OR
            else if (this.operador == Operador_1.Operador.OR) {
                if (op1Tipo === Tipo_1.Tipo.BOOL && op2Tipo === Tipo_1.Tipo.BOOL) {
                    return op1 || op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "Tipo de Dato Erroneo para OR");
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
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para NOT");
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

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Tipo":6}],11:[function(require,module,exports){
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
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "No es posible convertir a Boolean la cadena ingresada");
                    }
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La Funcion Parse no existe para este tipo de dato");
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Cadena Erronea para Funcion Parse, solo permite numeros");
            }
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Funcion Parse, la Expresion no es de Tipo String");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La Funcion toDouble solo permite Numeros Enteros para convertirlos a Decimales");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La Funcion toInt solo permite Numeros Decimales para convertirlos a Enteros");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La Funcion toString No Puede Convertir un tipo de Dato Null o Vacio a una Cadena");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Funcion Typeof");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Funcion CaracterOfPosition");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Funcion length");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Funcion SubString");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Funcion toLowerCase");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Funcion toUpperCase");
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
        /* switch(this.operador){
             case Operador.SUMA:
             case Operador.RESTA:
             case Operador.MULTIPLICACION:
             case Operador.DIVISION:
             case Operador.MODULO:
                 const izq = this.op_izquierda.traducir(controlador);   //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                 const der = this.op_derecha.traducir(controlador);   //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                 const resultado = controlador.getTemp();
                 if(izq && der){
                     const quad = new Quadrupla(`${this.operador}`,`${izq.resultado}`,`${der.resultado}`,`${resultado}`);
                     controlador.addQuad(quad);
                     return quad;
                 }
             break;
         }
         */
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
            if (this.operador == Operador_1.Operador.SUMA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    this.generateQuad2(arbol, new Quadrupla_1.Quadrupla(`${Operador_1.Operador.SUMA}`, `${op1}`, `${op2}`, ""));
                    return op1 + op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Suma (+)");
                }
            }
            //resta
            else if (this.operador == Operador_1.Operador.RESTA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    this.generateQuad2(arbol, new Quadrupla_1.Quadrupla(`${Operador_1.Operador.RESTA}`, `${op1}`, `${op2}`, ""));
                    return op1 - op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Resta (-)");
                }
            }
            //multiplicación
            else if (this.operador == Operador_1.Operador.MULTIPLICACION) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    this.generateQuad2(arbol, new Quadrupla_1.Quadrupla(`${Operador_1.Operador.MULTIPLICACION}`, `${op1}`, `${op2}`, ""));
                    return op1 * op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Multiplicacion (*)");
                }
            }
            //division
            else if (this.operador == Operador_1.Operador.DIVISION) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    if (op2 === 0) {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "No puede realizar una Operacion entre cero");
                    }
                    this.generateQuad2(arbol, new Quadrupla_1.Quadrupla(`${Operador_1.Operador.DIVISION}`, `${op1}`, `${op2}`, ""));
                    return op1 / op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Division (/)");
                }
            }
            //modulo
            else if (this.operador == Operador_1.Operador.MODULO) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    if (op2 === 0) {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "No puede realizar una Operacion entre cero");
                    }
                    this.generateQuad2(arbol, new Quadrupla_1.Quadrupla(`${Operador_1.Operador.MODULO}`, `${op1}`, `${op2}`, ""));
                    return op1 % op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Modular (%)");
                }
            }
            else if (this.operador == Operador_1.Operador.POW) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    this.generateQuad2(arbol, new Quadrupla_1.Quadrupla(`${Operador_1.Operador.MODULO}`, `${op1}`, `${op2}`, ""));
                    return Math.pow(op1, op2);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Pow (xⁿ)");
                }
            }
            else if (this.operador == Operador_1.Operador.SQRT) {
                if (typeof (op1 === "number")) {
                    return Math.sqrt(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Sqrt (√)");
                }
            }
            else if (this.operador == Operador_1.Operador.LOG) {
                if (typeof (op1 === "number")) {
                    return Math.log10(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Log (log(x))");
                }
            }
            else if (this.operador == Operador_1.Operador.SENO) {
                if (typeof (op1 === "number")) {
                    return Math.sin(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Sin (seno)");
                }
            }
            else if (this.operador == Operador_1.Operador.COSENO) {
                if (typeof (op1 === "number")) {
                    return Math.cos(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Cos (coseno)");
                }
            }
            else if (this.operador == Operador_1.Operador.TAN) {
                if (typeof (op1 === "number")) {
                    return Math.tan(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Tan (tangente)");
                }
            }
            else if (this.operador == Operador_1.Operador.CONCAT) {
                if (typeof (op1 === "string") && typeof (op2 === "string")) {
                    this.generateQuad2(arbol, new Quadrupla_1.Quadrupla(`${Operador_1.Operador.CONCAT}`, `${op1}`, `${op2}`, ""));
                    return op1 + op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Concatenacion (&)");
                }
            }
            else if (this.operador == Operador_1.Operador.REPEAT) {
                if (typeof (op1 === "string") && (typeOp2 == Tipo_1.Tipo.INT || typeOp2 == Tipo_1.Tipo.DOUBLE)) {
                    this.generateQuad2(arbol, new Quadrupla_1.Quadrupla(`${Operador_1.Operador.REPEAT}`, `${op1}`, `${op2}`, ""));
                    return op1.repeat(op2);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Concatenacion (&)");
                }
            }
            else if (this.operador == Operador_1.Operador.INCREMENTO) {
                if (!(this.op_izquierda instanceof Identificador_1.Identificador)) {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "No es un Identificador");
                }
                if (typeOp1 == Tipo_1.Tipo.INT || typeOp1 == Tipo_1.Tipo.DOUBLE) {
                    if (ent.existe(this.op_izquierda.getId())) {
                        let simbolo = new Simbolo_1.Simbolo(typeOp1, this.op_izquierda.getId(), this.linea, this.columna, op1 + 1);
                        ent.reemplazar(this.op_izquierda.getId(), simbolo);
                        return op1;
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Variable no Definida");
                    }
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Incremento (++)");
                }
            }
            else if (this.operador == Operador_1.Operador.DECREMENTO) {
                if (!(this.op_izquierda instanceof Identificador_1.Identificador)) {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "No es un Identificador");
                }
                if (typeOp1 == Tipo_1.Tipo.INT || typeOp1 == Tipo_1.Tipo.DOUBLE) {
                    if (ent.existe(this.op_izquierda.getId())) {
                        let simbolo = new Simbolo_1.Simbolo(typeOp1, this.op_izquierda.getId(), this.linea, this.columna, op1 - 1);
                        ent.reemplazar(this.op_izquierda.getId(), simbolo);
                        return op1;
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Variable no Definida");
                    }
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Decremento (--)");
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
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Unaria (-)");
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

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../Traductor/Quadrupla":45,"./Identificador":8}],22:[function(require,module,exports){
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
        return new Quadrupla_1.Quadrupla("op", "arg1", "arg2", `${this.valor}`); //AL SER UN VALOR PRIMITIVO, NO NECESITAMOS GUARDAR TEMP, PORQUE SE RETORNA EL VALOR 
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

},{"../AST/Tipo":6,"../Traductor/Quadrupla":45}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Tipo_1 = require("../AST/Tipo");
const Excepcion_1 = require("../AST/Excepcion");
const Operador_1 = require("../AST/Operador");
class Relacional {
    constructor(op_izquierda, op_derecha, relacional, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = relacional;
    }
    traducir(controlador) {
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
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Menor Que (<)");
            }
        }
        //MAYOR QUE
        else if (this.operador == Operador_1.Operador.MAYOR_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 > op2;
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Mayor Que (>)");
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
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Igual Igual (==)");
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
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Menor Igual (<=)");
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
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Mayor Igual (>=)");
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
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operador Diferente Que (!=)");
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

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Tipo":6}],24:[function(require,module,exports){
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Operacion Condicional Erronea para Operacion Ternaria (?)");
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,16],$V1=[1,32],$V2=[1,24],$V3=[1,25],$V4=[1,26],$V5=[1,27],$V6=[1,28],$V7=[1,29],$V8=[1,30],$V9=[1,31],$Va=[1,21],$Vb=[1,22],$Vc=[1,37],$Vd=[1,33],$Ve=[1,34],$Vf=[1,36],$Vg=[1,35],$Vh=[5,20,27,32,43,44,45,49,51,52,56,58,62,64,65,66,106,111,113,114,120],$Vi=[1,50],$Vj=[1,51],$Vk=[1,71],$Vl=[1,80],$Vm=[1,89],$Vn=[1,82],$Vo=[1,83],$Vp=[1,84],$Vq=[1,85],$Vr=[1,86],$Vs=[1,87],$Vt=[1,88],$Vu=[1,73],$Vv=[1,74],$Vw=[1,75],$Vx=[1,76],$Vy=[1,77],$Vz=[1,78],$VA=[1,79],$VB=[1,81],$VC=[1,90],$VD=[1,91],$VE=[1,92],$VF=[1,93],$VG=[1,94],$VH=[1,95],$VI=[1,96],$VJ=[1,97],$VK=[2,129],$VL=[8,36],$VM=[2,53],$VN=[1,111],$VO=[1,120],$VP=[1,127],$VQ=[1,128],$VR=[1,138],$VS=[1,139],$VT=[1,140],$VU=[1,135],$VV=[1,136],$VW=[1,129],$VX=[1,130],$VY=[1,131],$VZ=[1,132],$V_=[1,133],$V$=[1,134],$V01=[1,122],$V11=[1,123],$V21=[1,124],$V31=[1,125],$V41=[1,126],$V51=[1,137],$V61=[8,21,22,30,31,36,63,74,75,76,83,84,85,86,87,88,89,90,91,92,93,94,95,102],$V71=[1,163],$V81=[30,36],$V91=[8,30,31,36,63,74,75,76,83,84,85,86,87,88,89,90,91,92,93,94,95,102],$Va1=[8,30,31,36,63,74,75,76,83,84,85,86,87,88,89,90,91,92,102],$Vb1=[8,30,31,36,63,74,75,76,83,84,85,86,87,88,89,90,102],$Vc1=[8,30,31,36,63,74,75,76,83,84,102],$Vd1=[1,270],$Ve1=[1,269],$Vf1=[32,62,64];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"RAICES":4,"EOF":5,"RAIZ":6,"PRINT":7,"semicolon":8,"DECLARACION_NULA":9,"DECLARACION":10,"FUNCION":11,"WHILE":12,"DO_WHILE":13,"FOR":14,"FOR_IN":15,"RETURN":16,"BREAK":17,"CONTINUE":18,"LLAMADA":19,"identifier":20,"incremento":21,"decremento":22,"ASIGNACION":23,"IF":24,"SWITCH":25,"MAIN":26,"void":27,"main":28,"lparen":29,"rparen":30,"allave":31,"cllave":32,"TIPO":33,"LIST_PARAMETROS":34,"PARAMETROS":35,"coma":36,"PARAMETRO":37,"DECLARACION_PARAMETROS":38,"LIST_ARGUMENTOS":39,"ARGUMENTOS":40,"ARGUMENTO":41,"EXPR":42,"while":43,"do":44,"for":45,"FOR_VARIABLE":46,"FOR_INSTRUCCION":47,"in":48,"return":49,"RETURN_OP":50,"break":51,"continue":52,"asig":53,"LIST_IDENTIFIERS":54,"IDENTIFIER":55,"if":56,"else":57,"switch":58,"CASES":59,"DEFAULT":60,"CASE":61,"case":62,"colon":63,"default":64,"print":65,"println":66,"PRIMITIVA":67,"OP_ARITMETICAS":68,"OP_RELACIONALES":69,"OP_LOGICAS":70,"OP_TERNARIA":71,"NATIVAS_STRING":72,"NATIVA":73,"concat":74,"repeat":75,"dot":76,"charOfPos":77,"subString":78,"length":79,"toUpper":80,"toLower":81,"not":82,"and":83,"or":84,"equal":85,"lte":86,"gte":87,"nequal":88,"lt":89,"gt":90,"plus":91,"minus":92,"times":93,"div":94,"mod":95,"pow":96,"sqrt":97,"log":98,"sin":99,"cos":100,"tan":101,"question":102,"integer":103,"decimal":104,"string":105,"char":106,"null":107,"true":108,"false":109,"dollar":110,"int":111,"parse":112,"double":113,"boolean":114,"toInt":115,"toDouble":116,"toSTRING":117,"stringNative":118,"typeof":119,"String":120,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"semicolon",20:"identifier",21:"incremento",22:"decremento",27:"void",28:"main",29:"lparen",30:"rparen",31:"allave",32:"cllave",36:"coma",43:"while",44:"do",45:"for",48:"in",49:"return",51:"break",52:"continue",53:"asig",56:"if",57:"else",58:"switch",62:"case",63:"colon",64:"default",65:"print",66:"println",74:"concat",75:"repeat",76:"dot",77:"charOfPos",78:"subString",79:"length",80:"toUpper",81:"toLower",82:"not",83:"and",84:"or",85:"equal",86:"lte",87:"gte",88:"nequal",89:"lt",90:"gt",91:"plus",92:"minus",93:"times",94:"div",95:"mod",96:"pow",97:"sqrt",98:"log",99:"sin",100:"cos",101:"tan",102:"question",103:"integer",104:"decimal",105:"string",106:"char",107:"null",108:"true",109:"false",110:"dollar",111:"int",112:"parse",113:"double",114:"boolean",115:"toInt",116:"toDouble",117:"toSTRING",118:"stringNative",119:"typeof",120:"String"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[6,1],[6,1],[6,2],[6,1],[6,1],[6,2],[6,2],[6,2],[6,2],[6,3],[6,3],[6,2],[6,1],[6,1],[6,1],[26,7],[11,8],[34,1],[34,0],[35,3],[35,1],[37,1],[38,2],[19,4],[39,1],[39,0],[40,3],[40,1],[41,1],[12,7],[13,8],[14,11],[46,1],[46,1],[47,2],[47,2],[15,7],[16,2],[17,1],[18,1],[50,1],[50,0],[10,4],[9,2],[54,3],[54,1],[55,1],[23,3],[24,7],[24,11],[24,9],[25,7],[25,8],[25,7],[59,2],[59,1],[61,4],[60,3],[7,4],[7,4],[42,1],[42,1],[42,1],[42,1],[42,1],[42,1],[42,1],[42,1],[42,1],[72,3],[72,3],[72,6],[72,8],[72,5],[72,5],[72,5],[70,2],[70,3],[70,3],[69,3],[69,3],[69,3],[69,3],[69,3],[69,3],[68,3],[68,3],[68,3],[68,3],[68,3],[68,2],[68,2],[68,2],[68,6],[68,4],[68,4],[68,4],[68,4],[68,4],[71,5],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,3],[67,2],[73,6],[73,6],[73,6],[73,4],[73,4],[73,4],[73,4],[73,4],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; return this.$; 
break;
case 2: case 61:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3: case 27: case 34: case 52:
 this.$ = [$$[$0]]; 
break;
case 4: case 5: case 6: case 9: case 12: case 13: case 14: case 15: case 18:
 this.$ = $$[$0-1]; 
break;
case 7: case 8: case 10: case 11: case 19: case 20: case 21: case 24: case 28: case 31: case 35: case 53:
 this.$ = $$[$0]; 
break;
case 16:
 this.$ = new Incremento(new Operacion(new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),Operador.INCREMENTO, _$[$0-2].first_line, _$[$0-2].first_column),_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 17:
 this.$ = new Decremento(new Operacion(new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),Operador.DECREMENTO, _$[$0-2].first_line, _$[$0-2].first_column),_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 22:
this.$ = new Main($$[$0-1],_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 23:
 this.$ = new Funcion($$[$0-6],$$[$0-4],$$[$0-1],$$[$0-7],_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 25: case 32:
 this.$ = []; 
break;
case 26: case 33: case 51:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2];
break;
case 29:
 this.$ = new Declaracion($$[$0],null,$$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 30:
 this.$ = new Llamada($$[$0-3],$$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 36:
 this.$ = new While($$[$0-1],$$[$0-4],_$[$0-6].first_line,_$[$0-6].first_column); 
break;
case 37:
 this.$ = new DoWhile($$[$0-5],$$[$0-1],_$[$0-7].first_line,_$[$0-7].first_column); 
break;
case 38:
this.$ = new For($$[$0-1],$$[$0-8],$$[$0-6],$$[$0-4],_$[$0-10].first_line,_$[$0-10]); 
break;
case 39: case 40:
this.$ = $$[$0]
break;
case 41:
 this.$ = new Incremento(new Operacion(new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),Operador.INCREMENTO, _$[$0-1].first_line, _$[$0-1].first_column),_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 42:
 this.$ = new Decremento(new Operacion(new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),Operador.DECREMENTO, _$[$0-1].first_line, _$[$0-1].first_column),_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 43:
this.$ = new ForIn($$[$0-1],$$[$0-5],$$[$0-3],_$[$0-6].first_line,_$[$0-6].first_column); 
break;
case 44:
 this.$ = new Return($$[$0],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 45:
this.$ = new Break(_$[$0].first_line, _$[$0].first_column); 
break;
case 46:
this.$ = new Continue(_$[$0].first_line, _$[$0].first_column);
break;
case 47:
this.$ = $$[$0]; 
break;
case 48:
this.$ = null; 
break;
case 49:
 this.$ = new Declaracion($$[$0-2],$$[$0],$$[$0-3],[],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 50:
 this.$ = new Declaracion(null,null,$$[$0-1],$$[$0],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 54:
 this.$ =  new Asignacion($$[$0-2],$$[$0],_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 55:
 this.$ = new If($$[$0-4],$$[$0-1],null,null,_$[$0-6].first_line, _$[$0-6].first_column);
break;
case 56:
 this.$ = new If($$[$0-8],$$[$0-5],$$[$0-1],null,_$[$0-10].first_line, _$[$0-10].first_column);
break;
case 57:
 this.$ = new If($$[$0-6],$$[$0-3],null,$$[$0],_$[$0-8].first_line, _$[$0-8].first_column);
break;
case 58:
 this.$ = new Switch($$[$0-4],$$[$0-1],null,_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 59:
 this.$ = new Switch($$[$0-5],$$[$0-2],$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 60:
 this.$ = new Switch($$[$0-4],null,$$[$0],_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 62:
this.$ = [$$[$0]]; 
break;
case 63:
 this.$ = new Case($$[$0-2],$$[$0],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 64:
 this.$ = new Case($$[$0-2],$$[$0],_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 65:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,false); 
break;
case 66:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,true); 
break;
case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 75: case 115:
 this.$ = $$[$0] 
break;
case 74:
 this.$ = new Identificador($$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 76:
this.$ = new Operacion($$[$0-2],$$[$0],Operador.CONCAT, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 77:
this.$ = new Operacion($$[$0-2],$$[$0],Operador.REPEAT, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 78:
this.$ = new CharOfPosition($$[$0-5],$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 79:
this.$ = new SubString($$[$0-7],$$[$0-3],$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column);
break;
case 80:
this.$ = new Length($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 81:
this.$ = new ToUpper($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 82:
this.$ = new ToLower($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 83:
 this.$ = new Logica($$[$0],$$[$0],Operador.NOT, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 84:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.AND, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 85:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.OR, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 86:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.IGUAL_IGUAL, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 87:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 88:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 89:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.DIFERENTE_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 90:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 91:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 92:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.SUMA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 93:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.RESTA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 94:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MULTIPLICACION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 95:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.DIVISION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 96:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MODULO, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 97:
 this.$ = new Operacion($$[$0],$$[$0],Operador.MENOS_UNARIO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 98:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.INCREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 99:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.DECREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 100:
 this.$ = new Operacion($$[$0-3],$$[$0-1],Operador.POW, _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 101:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.SQRT, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 102:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.LOG, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 103:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.SENO, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 104:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.COSENO, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 105:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.TAN, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 106:
 this.$ = new Ternario($$[$0-4],$$[$0-2],$$[$0],_$[$0-4].first_line,_$[$0-4].first_column); 
break;
case 107: case 108:
 this.$ = new Primitivo(Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 109: case 110:
 this.$ = new Primitivo($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 111:
 this.$ = new Primitivo(null, _$[$0].first_line, _$[$0].first_column); 
break;
case 112:
 this.$ = new Primitivo(true, _$[$0].first_line, _$[$0].first_column); 
break;
case 113:
 this.$ = new Primitivo(false, _$[$0].first_line, _$[$0].first_column); 
break;
case 114:
 this.$ = $$[$0-1] 
break;
case 116:
this.$ = new TipoParse(Tipo.INT,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 117:
this.$ = new TipoParse(Tipo.DOUBLE,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 118:
this.$ = new TipoParse(Tipo.BOOL,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 119:
this.$ = new ToInt($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 120:
this.$ = new ToDouble($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 121: case 122:
this.$ = new ToString($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 123:
this.$ = new Typeof($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 124:
this.$ = Tipo.INT; 
break;
case 125:
this.$ = Tipo.DOUBLE; 
break;
case 126:
this.$ = Tipo.STRING; 
break;
case 127:
this.$ = Tipo.BOOL; 
break;
case 128:
this.$ = Tipo.CHAR; 
break;
case 129:
this.$ = Tipo.VOID; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{1:[3]},{5:[1,38],6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},o($Vh,[2,3]),{8:[1,40]},{8:[1,41]},{8:[1,42]},o($Vh,[2,7]),o($Vh,[2,8]),{8:[1,43]},o($Vh,[2,10]),o($Vh,[2,11]),{8:[1,44]},{8:[1,45]},{8:[1,46]},{8:[1,47]},{21:[1,48],22:[1,49],29:$Vi,53:$Vj},{8:[1,52]},o($Vh,[2,19]),o($Vh,[2,20]),o($Vh,[2,21]),{29:[1,53]},{29:[1,54]},{20:[1,56],54:55,55:57},{29:[1,58]},{31:[1,59]},{20:[1,61],29:[1,60]},{8:[2,48],19:72,20:$Vk,29:$Vl,42:63,50:62,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{8:[2,45]},{8:[2,46]},{29:[1,98]},{29:[1,99]},{20:$VK,28:[1,100]},{20:[2,124]},{20:[2,125]},{20:[2,126]},{20:[2,127]},{20:[2,128]},{1:[2,1]},o($Vh,[2,2]),o($Vh,[2,4]),o($Vh,[2,5]),o($Vh,[2,6]),o($Vh,[2,9]),o($Vh,[2,12]),o($Vh,[2,13]),o($Vh,[2,14]),o($Vh,[2,15]),{8:[1,101]},{8:[1,102]},{19:72,20:$Vk,29:$Vl,30:[2,32],39:103,40:104,41:105,42:106,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:107,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},o($Vh,[2,18]),{19:72,20:$Vk,29:$Vl,40:108,41:105,42:106,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,40:109,41:105,42:106,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{8:[2,50],36:[1,110]},o($VL,$VM,{29:[1,112],53:$VN}),o($VL,[2,52]),{19:72,20:$Vk,29:$Vl,42:113,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{4:114,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{10:116,20:[1,119],23:117,27:$VO,33:118,46:115,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{48:[1,121]},{8:[2,44]},{8:[2,47],21:$VP,22:$VQ,74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},o($V61,[2,67]),o($V61,[2,68]),o($V61,[2,69]),o($V61,[2,70]),o($V61,[2,71]),o($V61,[2,72]),o($V61,[2,73]),o($V61,[2,74],{29:$Vi}),o($V61,[2,75]),o($V61,[2,107]),o($V61,[2,108]),o($V61,[2,109]),o($V61,[2,110]),o($V61,[2,111]),o($V61,[2,112]),o($V61,[2,113]),{19:72,20:$Vk,29:$Vl,42:141,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:142,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:143,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{29:[1,144]},{29:[1,145]},{29:[1,146]},{29:[1,147]},{29:[1,148]},{29:[1,149]},{19:72,20:$Vk,29:$Vl,42:150,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{76:[1,151]},{76:[1,152]},{76:[1,153]},{29:[1,154]},{29:[1,155]},{29:[1,156]},{29:[1,157]},{29:[1,158]},{19:72,20:$Vk,29:$Vl,42:159,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:160,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{29:[1,161]},o($Vh,[2,16]),o($Vh,[2,17]),{30:[1,162]},{30:[2,31],36:$V71},o($V81,[2,34]),o($V81,[2,35],{21:$VP,22:$VQ,74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51}),{8:[2,54],21:$VP,22:$VQ,74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{30:[1,164],36:$V71},{30:[1,165],36:$V71},{20:[1,167],55:166},{19:72,20:$Vk,29:$Vl,42:168,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{27:$VO,30:[2,25],33:173,34:169,35:170,37:171,38:172,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{21:$VP,22:$VQ,30:[1,174],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,32:[1,175],33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{8:[1,176]},{8:[2,39]},{8:[2,40]},{20:[1,177]},{53:$Vj},{20:$VK},{19:72,20:$Vk,29:$Vl,42:178,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:179,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:180,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:181,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:182,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:183,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},o($V61,[2,98]),o($V61,[2,99]),{19:72,20:$Vk,29:$Vl,42:184,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:185,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:186,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:187,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:188,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:189,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:190,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:191,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:192,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:193,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:194,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{77:[1,195],78:[1,196],79:[1,197],80:[1,198],81:[1,199]},{21:$VP,22:$VQ,30:[1,200],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},o([8,30,31,36,63,102],[2,115],{21:$VP,22:$VQ,74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),o($V61,[2,97]),{19:72,20:$Vk,29:$Vl,42:201,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:202,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:203,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:204,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:205,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:206,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},o($V91,[2,83],{21:$VP,22:$VQ}),{112:[1,207]},{112:[1,208]},{112:[1,209]},{19:72,20:$Vk,29:$Vl,42:210,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:211,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:212,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:213,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:214,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{21:$VP,22:$VQ,30:[1,215],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,216],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{30:[1,217]},o($V61,[2,30]),{19:72,20:$Vk,29:$Vl,41:218,42:106,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{8:[2,65]},{8:[2,66]},o($VL,[2,51]),o($VL,$VM),{8:[2,49],21:$VP,22:$VQ,74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{30:[1,219]},{30:[2,24],36:[1,220]},o($V81,[2,27]),o($V81,[2,28]),{20:[1,221]},{31:[1,222]},{43:[1,223]},{19:72,20:$Vk,29:$Vl,42:224,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{53:$VN},{21:$VP,22:$VQ,31:[1,225],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},o($Va1,[2,92],{21:$VP,22:$VQ,93:$V21,94:$V31,95:$V41}),o($Va1,[2,93],{21:$VP,22:$VQ,93:$V21,94:$V31,95:$V41}),o($V91,[2,94],{21:$VP,22:$VQ}),o($V91,[2,95],{21:$VP,22:$VQ}),o($V91,[2,96],{21:$VP,22:$VQ}),o($Vb1,[2,86],{21:$VP,22:$VQ,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),o($Vb1,[2,87],{21:$VP,22:$VQ,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),o($Vb1,[2,88],{21:$VP,22:$VQ,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),o($Vb1,[2,89],{21:$VP,22:$VQ,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),o($Vb1,[2,90],{21:$VP,22:$VQ,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),o($Vb1,[2,91],{21:$VP,22:$VQ,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),o($Vc1,[2,84],{21:$VP,22:$VQ,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),o([8,30,31,36,63,75,76,84,102],[2,85],{21:$VP,22:$VQ,74:$VR,83:$VU,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),{21:$VP,22:$VQ,63:[1,226],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},o($Vc1,[2,76],{21:$VP,22:$VQ,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),o([8,30,31,36,63,75,76,102],[2,77],{21:$VP,22:$VQ,74:$VR,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41}),{29:[1,227]},{29:[1,228]},{29:[1,229]},{29:[1,230]},{29:[1,231]},o($V61,[2,114]),{21:$VP,22:$VQ,36:[1,232],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,233],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,234],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,235],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,236],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,237],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{29:[1,238]},{29:[1,239]},{29:[1,240]},{21:$VP,22:$VQ,30:[1,241],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,242],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,243],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,244],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,245],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{31:[1,246]},{31:[1,247]},{31:[1,248]},o($V81,[2,33]),{31:[1,249]},{27:$VO,33:173,37:250,38:172,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},o($V81,[2,29]),{4:251,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{29:[1,252]},{8:[1,253],21:$VP,22:$VQ,74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{4:254,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{19:72,20:$Vk,29:$Vl,42:255,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:256,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:257,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{30:[1,258]},{30:[1,259]},{30:[1,260]},{19:72,20:$Vk,29:$Vl,42:261,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},o($V61,[2,101]),o($V61,[2,102]),o($V61,[2,103]),o($V61,[2,104]),o($V61,[2,105]),{19:72,20:$Vk,29:$Vl,42:262,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:263,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{19:72,20:$Vk,29:$Vl,42:264,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},o($V61,[2,119]),o($V61,[2,120]),o($V61,[2,121]),o($V61,[2,122]),o($V61,[2,123]),{4:265,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{59:266,60:267,61:268,62:$Vd1,64:$Ve1},{4:271,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{4:272,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},o($V81,[2,26]),{6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,32:[1,273],33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{19:72,20:$Vk,29:$Vl,42:274,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{20:[1,276],47:275},{6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,32:[1,277],33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},o([8,30,31,36,63],[2,106],{21:$VP,22:$VQ,74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51}),{21:$VP,22:$VQ,30:[1,278],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,36:[1,279],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},o($V61,[2,80]),o($V61,[2,81]),o($V61,[2,82]),{21:$VP,22:$VQ,30:[1,280],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,281],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,282],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{21:$VP,22:$VQ,30:[1,283],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,32:[1,284],33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{32:[1,285],60:286,61:287,62:$Vd1,64:$Ve1},{32:[1,288]},o($Vf1,[2,62]),{63:[1,289]},{19:72,20:$Vk,29:$Vl,42:290,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},{6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,32:[1,291],33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,32:[1,292],33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},o($Vh,[2,36]),{21:$VP,22:$VQ,30:[1,293],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{30:[1,294]},{21:[1,295],22:[1,296]},o($Vh,[2,43]),o($V61,[2,78]),{19:72,20:$Vk,29:$Vl,42:297,67:64,68:65,69:66,70:67,71:68,72:69,73:70,82:$Vm,92:$Vn,96:$Vo,97:$Vp,98:$Vq,99:$Vr,100:$Vs,101:$Vt,103:$Vu,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:$Vz,109:$VA,110:$VB,111:$VC,113:$VD,114:$VE,115:$VF,116:$VG,117:$VH,118:$VI,119:$VJ},o($V61,[2,100]),o($V61,[2,116]),o($V61,[2,117]),o($V61,[2,118]),o($Vh,[2,55],{57:[1,298]}),o($Vh,[2,58]),{32:[1,299]},o($Vf1,[2,61]),o($Vh,[2,60]),{4:300,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{21:$VP,22:$VQ,63:[1,301],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},o($Vh,[2,22]),o($Vh,[2,23]),{8:[2,37]},{31:[1,302]},{30:[2,41]},{30:[2,42]},{21:$VP,22:$VQ,30:[1,303],74:$VR,75:$VS,76:$VT,83:$VU,84:$VV,85:$VW,86:$VX,87:$VY,88:$VZ,89:$V_,90:$V$,91:$V01,92:$V11,93:$V21,94:$V31,95:$V41,102:$V51},{24:305,31:[1,304],56:$V8},o($Vh,[2,59]),{6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,32:[2,64],33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{4:306,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{4:307,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},o($V61,[2,79]),{4:308,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},o($Vh,[2,57]),o($Vf1,[2,63],{7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,23:17,24:18,25:19,26:20,33:23,6:39,20:$V0,27:$V1,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg}),{6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,32:[1,309],33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},{6:39,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:$V0,23:17,24:18,25:19,26:20,27:$V1,32:[1,310],33:23,43:$V2,44:$V3,45:$V4,49:$V5,51:$V6,52:$V7,56:$V8,58:$V9,65:$Va,66:$Vb,106:$Vc,111:$Vd,113:$Ve,114:$Vf,120:$Vg},o($Vh,[2,38]),o($Vh,[2,56])],
defaultActions: {28:[2,45],29:[2,46],33:[2,124],34:[2,125],35:[2,126],36:[2,127],37:[2,128],38:[2,1],62:[2,44],116:[2,39],117:[2,40],120:[2,129],164:[2,65],165:[2,66],293:[2,37],295:[2,41],296:[2,42]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
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
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

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

    const {ReporteGramatical} = require("../Reportes/ReporteGramatical.js");
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
case 3:return 107;
break;
case 4:return 111;
break;
case 5:return 113;
break;
case 6:return 114;
break;
case 7:return 106;
break;
case 8:return 120;
break;
case 9:return 27;
break;
case 10:return 108;
break;
case 11:return 109;
break;
case 12:return 65;
break;
case 13:return 66;
break;
case 14:return 49;
break;
case 15:return 51;
break;
case 16:return 52;
break;
case 17:return 28;
break;
case 18:return 43;
break;
case 19:return 44;
break;
case 20:return 45;
break;
case 21:return 48;
break;
case 22:return 51;
break;
case 23:return 52;
break;
case 24:return 58;
break;
case 25:return 62;
break;
case 26:return 64;
break;
case 27:return 56;
break;
case 28:return 57;
break;
case 29:return 28;
break;
case 30:return 96;
break;
case 31:return 97;
break;
case 32:return 98;
break;
case 33:return 99;
break;
case 34:return 100;
break;
case 35:return 101;
break;
case 36:return 77;
break;
case 37:return 78;
break;
case 38:return 79;
break;
case 39:return 80;
break;
case 40:return 81;
break;
case 41:return 112;
break;
case 42:return 115;
break;
case 43:return 116;
break;
case 44:return 117;
break;
case 45:return 118;
break;
case 46:return 119;
break;
case 47:return 21;
break;
case 48:return 22;
break;
case 49:return 91;
break;
case 50:return 92;
break;
case 51:return 93;
break;
case 52:return 94;
break;
case 53:return 95;
break;
case 54:return 85;
break;
case 55:return 86;
break;
case 56:return 87;
break;
case 57:return 88;
break;
case 58:return 89;
break;
case 59:return 90;
break;
case 60:return 53;
break;
case 61:return 83;
break;
case 62:return 84;
break;
case 63:return 82;
break;
case 64:return 74;
break;
case 65:return 75;
break;
case 66:return 110;
break;
case 67:return 8;
break;
case 68:return 63;
break;
case 69:return 29;
break;
case 70:return 30;
break;
case 71:return 102;
break;
case 72:return 31;
break;
case 73:return 32;
break;
case 74:return 'corcheteA';
break;
case 75:return 'corcheteC';
break;
case 76:return 36;
break;
case 77:return 76;
break;
case 78:return 104;
break;
case 79:return 103;
break;
case 80:return 20;
break;
case 81:return 105;
break;
case 82:return 106;
break;
case 83:return;
break;
case 84:
                                        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                                    
break;
case 85:return 5
break;
}
},
rules: [/^(?:\/\/.*)/,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/,/^(?:\s+)/,/^(?:null\b)/,/^(?:int\b)/,/^(?:double\b)/,/^(?:boolean\b)/,/^(?:char\b)/,/^(?:String\b)/,/^(?:void\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:print\b)/,/^(?:println\b)/,/^(?:return\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:main\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:in\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:main\b)/,/^(?:pow\b)/,/^(?:sqrt\b)/,/^(?:log\b)/,/^(?:sin\b)/,/^(?:cos\b)/,/^(?:tan\b)/,/^(?:caracterOfPosition\b)/,/^(?:subString\b)/,/^(?:length\b)/,/^(?:toUpperCase\b)/,/^(?:toLowerCase\b)/,/^(?:parse\b)/,/^(?:toInt\b)/,/^(?:toDouble\b)/,/^(?:toString\b)/,/^(?:string\b)/,/^(?:typeof\b)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:==)/,/^(?:<=)/,/^(?:>=)/,/^(?:!=)/,/^(?:<)/,/^(?:>)/,/^(?:=)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:&)/,/^(?:\^)/,/^(?:\$)/,/^(?:;)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\?)/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:\.)/,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/,/^(?:[0-9]+)/,/^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ]*)/,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/,/^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/,/^(?:{Comment})/,/^(?:.)/,/^(?:$)/],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85],"inclusive":true}}
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
},{"../AST/Operador.js":4,"../AST/Tipo.js":6,"../Expresiones/Decremento.js":7,"../Expresiones/Identificador.js":8,"../Expresiones/Incremento.js":9,"../Expresiones/Logica.js":10,"../Expresiones/Nativas/TipoParse.js":11,"../Expresiones/Nativas/ToDouble.js":12,"../Expresiones/Nativas/ToInt.js":13,"../Expresiones/Nativas/ToString.js":14,"../Expresiones/Nativas/Typeof.js":15,"../Expresiones/NativasString/CharOfPosition.js":16,"../Expresiones/NativasString/Length.js":17,"../Expresiones/NativasString/SubString.js":18,"../Expresiones/NativasString/ToLower.js":19,"../Expresiones/NativasString/ToUpper.js":20,"../Expresiones/Operacion.js":21,"../Expresiones/Primitivo.js":22,"../Expresiones/Relacional.js":23,"../Expresiones/Ternario.js":24,"../Instrucciones/Asignacion.js":26,"../Instrucciones/Break.js":27,"../Instrucciones/Case.js":28,"../Instrucciones/Continue.js":29,"../Instrucciones/Declaracion.js":30,"../Instrucciones/DoWhile.js":31,"../Instrucciones/For.js":32,"../Instrucciones/ForIn.js":33,"../Instrucciones/Funcion.js":34,"../Instrucciones/If.js":35,"../Instrucciones/Llamada.js":36,"../Instrucciones/Main.js":37,"../Instrucciones/Print.js":38,"../Instrucciones/Return.js":39,"../Instrucciones/Switch.js":40,"../Instrucciones/While.js":41,"../Reportes/ReporteGramatical.js":43,"_process":49,"fs":47,"path":48}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_js_1 = require("../AST/Tipo.js");
const Quadrupla_1 = require("../Traductor/Quadrupla");
const Operacion_1 = require("../Expresiones/Operacion");
const Primitivo_1 = require("../Expresiones/Primitivo");
class Asignacion {
    constructor(identificador, exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (!(valor instanceof Excepcion_1.Excepcion)) {
            if (ent.existe(this.identificador)) {
                let simbolo = ent.getSimbolo(this.identificador);
                let simboloValor = simbolo.getTipo(ent, arbol);
                if (simboloValor == tipoValor || (tipoValor == Tipo_js_1.Tipo.NULL && simboloValor == Tipo_js_1.Tipo.STRING) || (tipoValor == Tipo_js_1.Tipo.INT && simboloValor == Tipo_js_1.Tipo.DOUBLE) || (tipoValor == Tipo_js_1.Tipo.CHAR && simboloValor == Tipo_js_1.Tipo.STRING)) {
                    if (this.isDouble(tipoValor, simboloValor)) {
                        valor = valor.toFixed(2);
                    }
                    simbolo.setValor(valor);
                    if (tipoValor == Tipo_js_1.Tipo.INT || tipoValor == Tipo_js_1.Tipo.DOUBLE) {
                        console.log("entra------");
                        if (this.expresion instanceof Operacion_1.Operacion || this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = P + ${simbolo.posicion} ;`);
                            let etiqueta = (this.expresion instanceof Operacion_1.Operacion) ? this.expresion.etiqueta : valor;
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${etiqueta}`, `${temp}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[${temp}] = ${etiqueta} ;`);
                        }
                    }
                    else if (tipoValor == Tipo_js_1.Tipo.STRING) {
                        if (this.expresion instanceof Operacion_1.Operacion || this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            for (let i = 0; i < valor.length; i++) {
                                arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor.charCodeAt(i)}`, `H`, `${arbol.heap}`));
                                arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(i)} ;`);
                                arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                                arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            }
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${simbolo.posicion} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }
                    else if (tipoValor == Tipo_js_1.Tipo.CHAR) {
                        if (this.expresion instanceof Operacion_1.Operacion) {
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${this.expresion.etiqueta}`, `${simbolo.posicion}`, `${arbol.stack}`));
                        }
                        else if (this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor.charCodeAt(0)}`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(0)} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${simbolo.posicion} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }
                    ent.reemplazar(this.identificador, simbolo);
                    return simbolo;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Los tipos no coinciden");
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La variable no esta definida");
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

},{"../AST/Excepcion":3,"../AST/Tipo.js":6,"../Expresiones/Operacion":21,"../Expresiones/Primitivo":22,"../Traductor/Quadrupla":45}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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
        for (let i in this.instrucciones) {
            let result = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
            if (result instanceof Excepcion_1.Excepcion || result instanceof Break_1.Break || result instanceof Return_1.Return)
                return result;
            else if (result instanceof Continue_1.Continue)
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "Continue fuera de loop");
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

},{"../AST/Entorno":2,"../AST/Excepcion":3,"./Break":27,"./Continue":29,"./Return":39}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Operacion_1 = require("../Expresiones/Operacion");
const Primitivo_1 = require("../Expresiones/Primitivo");
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
        throw new Error("Method not implemented.");
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
                    if (this.tipo == Tipo_1.Tipo.INT || this.tipo == Tipo_1.Tipo.DOUBLE) {
                        if (this.expresion instanceof Operacion_1.Operacion) {
                            let temp = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${this.expresion.etiqueta}`, `${arbol.posiciones}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[${temp}] = ${this.expresion.etiqueta} ;`);
                        }
                        else if (this.expresion instanceof Primitivo_1.Primitivo) {
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor}`, `${arbol.posiciones}`, `${arbol.stack}`));
                        }
                    }
                    else if (this.tipo == Tipo_1.Tipo.STRING) {
                        if (this.expresion instanceof Operacion_1.Operacion || this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            for (let i = 0; i < valor.length; i++) {
                                arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor.charCodeAt(i)}`, `H`, `${arbol.heap}`));
                                arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(i)} ;`);
                                arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                                arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            }
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }
                    else if (this.tipo == Tipo_1.Tipo.CHAR) {
                        if (this.expresion instanceof Operacion_1.Operacion) {
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${this.expresion.etiqueta}`, `${arbol.posiciones}`, `${arbol.stack}`));
                        }
                        else if (this.expresion instanceof Primitivo_1.Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${valor.charCodeAt(0)}`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(0)} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${arbol.posiciones} ;`);
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`+`, `P`, `${arbol.posiciones}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla_1.Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }
                    simbolo.posicion = arbol.posiciones++;
                    ent.agregar(this.identificador, simbolo);
                    console.log(arbol.controlador);
                    return simbolo;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La variable ya existe");
                }
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "El tipo asignado a la variable no es correcto");
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
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La variable ya existe");
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

},{"../AST/Excepcion":3,"../AST/Simbolo":5,"../AST/Tipo":6,"../Expresiones/Operacion":21,"../Expresiones/Primitivo":22,"../Traductor/Quadrupla":45,"./Llamada":36}],31:[function(require,module,exports){
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
        if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
            let nuevoEntorno = new Entorno_1.Entorno(ent);
            nuevoEntorno.setEntorno("DoWhile");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "El tipo de dato en condicion debe ser booleano");
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.DoWhile = DoWhile;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":6,"./Break":27,"./Continue":29,"./Return":39}],32:[function(require,module,exports){
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
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La condicion del For no es de tipo Booleano");
            }
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.For = For;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"./Break":27,"./Continue":29,"./Declaracion":30,"./Return":39}],33:[function(require,module,exports){
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "Valor en For in debe ser String");
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.ForIn = ForIn;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Simbolo":5,"../AST/Tipo":6,"./Break":27,"./Continue":29,"./Return":39}],34:[function(require,module,exports){
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
                arbol.updateConsola(value.toString());
            }
            else if (value instanceof Return_1.Return) {
                if (this.tipo == value.getTipo()) {
                    if (this.tipo != Tipo_1.Tipo.VOID)
                        return value.getValue();
                    else
                        return this;
                }
                else
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "El valor de retorno no coincide con el tipo de la funcion.");
            }
        }
        if (this.tipo != Tipo_1.Tipo.VOID) {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La funcion debe retornar un valor");
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

},{"../AST/Excepcion":3,"../AST/Tipo":6,"./Return":39}],35:[function(require,module,exports){
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
        if (condicion instanceof Excepcion_1.Excepcion)
            return condicion;
        if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
            if (condicion) { //SI EL VALOR DE LA CONDICION SE CUMPLE
                let nuevoEntorno = new Entorno_1.Entorno(ent);
                nuevoEntorno.setEntorno("If");
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La condicion en If debe ser booleana");
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

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":6,"./Break":27,"./Continue":29,"./Return":39}],36:[function(require,module,exports){
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
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La funcion llamada no existe");
        }
        let nuevoEntorno = new Entorno_1.Entorno(ent);
        arbol.tablas.push(nuevoEntorno); //REVISAR POR QUE SE CREA UN NUEVO ENTORNO
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
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La tipos en la llamada no coinciden");
                }
            }
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La cantidad de parametros no es correcta");
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

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Simbolo":5,"../AST/Tipo":6}],37:[function(require,module,exports){
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
            let value = this.instrucciones[i].ejecutar(nuevoEntorno, arbol);
            if (value instanceof Excepcion_1.Excepcion) {
                arbol.addExcepcion(value);
                arbol.updateConsola(value.toString());
            }
            else if (value instanceof Return_1.Return) {
                if (value.getTipo() == Tipo_1.Tipo.VOID)
                    return this;
                else
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "Main no puede retornar un valor");
            }
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.Main = Main;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":6,"./Return":39}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
// print("hola mundo");
class Print {
    constructor(exp, linea, columna, salto) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        this.expresion.forEach(element => {
            let valor = element.getValorImplicito(ent, arbol);
            valor = this.addSalto(valor);
            arbol.updateConsola(valor);
        });
    }
    addSalto(valor) {
        return this.salto ? valor + "\n" : valor;
    }
}
exports.Print = Print;

},{}],39:[function(require,module,exports){
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
        throw new Error("Method not implemented.");
    }
    getTipo() {
        return this.tipo;
    }
    getValue() {
        return this.value;
    }
}
exports.Return = Return;

},{"../AST/Excepcion":3,"../AST/Tipo":6}],40:[function(require,module,exports){
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

},{"../AST/Excepcion":3,"./Break":27,"./Return":39}],41:[function(require,module,exports){
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
            if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
                if (condicion) {
                    let nuevoEntorno = new Entorno_1.Entorno(ent);
                    nuevoEntorno.setEntorno("While");
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
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "El tipo de dato en condicion debe ser booleano");
            }
        }
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
}
exports.While = While;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":6,"./Break":27,"./Continue":29,"./Return":39}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReporteGramatical = void 0;
class ReporteGramatical {
    /* constructor(listaGramatica: Array<string>){
         this.listaGramatica = listaGramatica;
     }
     */
    constructor() {
        this.listaGramatica = [];
    }
    getGramatica() {
        return this.listaGramatica;
    }
    setGramatica(gramatica) {
        this.listaGramatica.push(gramatica);
    }
}
exports.ReporteGramatical = ReporteGramatical;

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadControlador = void 0;
const Entorno_1 = require("../AST/Entorno");
class QuadControlador {
    /*
        isTrue: Quadrupla[] //ARREGLO PARA IF/ELSE/SWITCH
        isFalse: Quadrupla[];
        breaks: Quadrupla[];
        continues: Quadrupla[];
    
        tables: SymbolTable[];
         stack: SymbolTable[];
    
        labelTrue: string | undefined;
        labelFalse: string | undefined;
    
         sm: SemanticHandler;
         blocks: CodeBlock[];
    
         quadReturn?: Quadrupla;
         returns: Quadrupla[];
    */
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

},{"../AST/Entorno":2}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
const AST = require("./AST/AST.js");
const Entorno = require("./AST/Entorno.js");
const Instruccion = require("./Interfaces/Instruccion.js");
const Excepcion = require("./AST/Excepcion.js");
const Funcion = require("./Instrucciones/Funcion.js");
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


},{"./AST/AST.js":1,"./AST/Entorno.js":2,"./AST/Excepcion.js":3,"./Gramatica/grammar.js":25,"./Instrucciones/Declaracion.js":30,"./Instrucciones/Funcion.js":34,"./Instrucciones/Main.js":37,"./Instrucciones/Return.js":39,"./Interfaces/Instruccion.js":42,"./Traductor/QuadControlador.js":44}],47:[function(require,module,exports){

},{}],48:[function(require,module,exports){
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
},{"_process":49}],49:[function(require,module,exports){
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

},{}]},{},[46]);
