(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = [];
        this.consola = [];
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
}
exports.AST = AST;

},{}],2:[function(require,module,exports){
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
        id = id.toLowerCase();
        simbolo.identificador = simbolo.identificador.toLowerCase();
        this.tabla[id] = simbolo;
    }
    eliminar(id) {
        id = id.toLowerCase();
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
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                return true;
            }
        }
        return false;
    }
    existeEnActual(id) {
        id = id.toLowerCase();
        if (this.tabla[id] !== undefined) {
            return true;
        }
        return false;
    }
    getSimbolo(id) {
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            if (e.tabla[id] !== undefined) {
                return e.tabla[id];
            }
        }
        return null;
    }
    reemplazar(id, nuevoValor) {
        id = id.toLowerCase();
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
    Operador[Operador["SUMA"] = 0] = "SUMA";
    Operador[Operador["RESTA"] = 1] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 3] = "DIVISION";
    Operador[Operador["MODULO"] = 4] = "MODULO";
    Operador[Operador["MENOS_UNARIO"] = 5] = "MENOS_UNARIO";
    Operador[Operador["MAYOR_QUE"] = 6] = "MAYOR_QUE";
    Operador[Operador["MENOR_QUE"] = 7] = "MENOR_QUE";
    Operador[Operador["IGUAL_IGUAL"] = 8] = "IGUAL_IGUAL";
    Operador[Operador["DIFERENTE_QUE"] = 9] = "DIFERENTE_QUE";
    Operador[Operador["INCREMENTO"] = 10] = "INCREMENTO";
    Operador[Operador["DECREMENTO"] = 11] = "DECREMENTO";
    Operador[Operador["AND"] = 12] = "AND";
    Operador[Operador["OR"] = 13] = "OR";
    Operador[Operador["NOT"] = 14] = "NOT";
    Operador[Operador["MAYOR_IGUAL_QUE"] = 15] = "MAYOR_IGUAL_QUE";
    Operador[Operador["MENOR_IGUAL_QUE"] = 16] = "MENOR_IGUAL_QUE";
    Operador[Operador["POW"] = 17] = "POW";
    Operador[Operador["SQRT"] = 18] = "SQRT";
    Operador[Operador["LOG"] = 19] = "LOG";
    Operador[Operador["SENO"] = 20] = "SENO";
    Operador[Operador["COSENO"] = 21] = "COSENO";
    Operador[Operador["TAN"] = 22] = "TAN";
    Operador[Operador["CONCAT"] = 23] = "CONCAT";
    Operador[Operador["REPEAT"] = 24] = "REPEAT";
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
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.Decremento = Decremento;

},{"../AST/Excepcion":3}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
const Excepcion_1 = require("../AST/Excepcion");
class Identificador {
    constructor(identificador, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = null;
        this.identificador = identificador;
    }
    getTipo(ent, arbol) {
        if (ent.existeEnActual(this.identificador)) {
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
        if (ent.existeEnActual(this.identificador)) {
            let simbolo = ent.getSimbolo(this.identificador);
            this.tipo = simbolo.getTipo(ent, arbol);
            return simbolo.getValorImplicito(ent, arbol);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La variable no existe");
        }
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.Identificador = Identificador;

},{"../AST/Excepcion":3}],9:[function(require,module,exports){
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
    traducir(ent, arbol) {
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
class Operacion {
    constructor(op_izquierda, op_derecha, operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
        if (this.operador !== Operador_1.Operador.MENOS_UNARIO) {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);
            let typeOp1 = this.op_izquierda.getTipo(ent, arbol);
            let typeOp2 = this.op_derecha.getTipo(ent, arbol);
            //suma
            if (this.operador == Operador_1.Operador.SUMA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 + op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Suma (+)");
                }
            }
            //resta
            else if (this.operador == Operador_1.Operador.RESTA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 - op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Resta (-)");
                }
            }
            //multiplicación
            else if (this.operador == Operador_1.Operador.MULTIPLICACION) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
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
                    return op1 % op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Modular (%)");
                }
            }
            else if (this.operador == Operador_1.Operador.POW) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
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
                    return op1 + op2;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Concatenacion (&)");
                }
            }
            else if (this.operador == Operador_1.Operador.REPEAT) {
                if (typeof (op1 === "string") && (typeOp2 == Tipo_1.Tipo.INT || typeOp2 == Tipo_1.Tipo.DOUBLE)) {
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
                    if (ent.existeEnActual(this.op_izquierda.getId())) {
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
                    if (ent.existeEnActual(this.op_izquierda.getId())) {
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

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Simbolo":5,"../AST/Tipo":6,"./Identificador":8}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Tipo_1 = require("../AST/Tipo");
class Primitivo {
    constructor(valor, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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

},{"../AST/Tipo":6}],23:[function(require,module,exports){
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,9],$V1=[1,10],$V2=[1,12],$V3=[1,18],$V4=[1,19],$V5=[1,15],$V6=[1,16],$V7=[1,24],$V8=[1,20],$V9=[1,21],$Va=[1,23],$Vb=[1,22],$Vc=[1,25],$Vd=[5,13,14,16,26,34,36,38,39,80,85,87,88,93,94],$Ve=[1,37],$Vf=[1,51],$Vg=[1,60],$Vh=[1,69],$Vi=[1,62],$Vj=[1,63],$Vk=[1,64],$Vl=[1,65],$Vm=[1,66],$Vn=[1,67],$Vo=[1,68],$Vp=[1,53],$Vq=[1,54],$Vr=[1,55],$Vs=[1,56],$Vt=[1,57],$Vu=[1,58],$Vv=[1,59],$Vw=[1,61],$Vx=[1,70],$Vy=[1,71],$Vz=[1,72],$VA=[1,73],$VB=[1,74],$VC=[1,75],$VD=[1,76],$VE=[2,30],$VF=[1,94],$VG=[1,95],$VH=[1,105],$VI=[1,106],$VJ=[1,107],$VK=[1,102],$VL=[1,103],$VM=[1,96],$VN=[1,97],$VO=[1,98],$VP=[1,99],$VQ=[1,100],$VR=[1,101],$VS=[1,89],$VT=[1,90],$VU=[1,91],$VV=[1,92],$VW=[1,93],$VX=[1,104],$VY=[8,17,18,24,28,47,48,49,56,57,58,59,60,61,62,63,64,65,66,67,68,75,76],$VZ=[24,28],$V_=[8,24,28,47,48,49,56,57,58,59,60,61,62,63,64,65,66,67,68,75,76],$V$=[8,24,28,47,48,49,56,57,58,59,60,61,62,63,64,65,75,76],$V01=[8,24,28,47,48,49,56,57,58,59,60,61,62,63,75,76],$V11=[8,24,28,47,48,49,56,57,75,76];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"RAICES":4,"EOF":5,"RAIZ":6,"PRINT":7,"semicolon":8,"DECLARACION_NULA":9,"DECLARACION":10,"FUNCION":11,"RETURN":12,"break":13,"continue":14,"LLAMADA":15,"identifier":16,"incremento":17,"decremento":18,"ASIGNACION":19,"CONDICIONAL_IF":20,"TIPO":21,"lparen":22,"LIST_PARAMETROS":23,"rparen":24,"allave":25,"cllave":26,"PARAMETROS":27,"coma":28,"PARAMETRO":29,"LIST_ARGUMENTOS":30,"ARGUMENTOS":31,"ARGUMENTO":32,"EXPR":33,"return":34,"asig":35,"if":36,"else":37,"print":38,"println":39,"PRIMITIVA":40,"OP_ARITMETICAS":41,"OP_RELACIONALES":42,"OP_LOGICAS":43,"OP_TERNARIA":44,"NATIVAS_STRING":45,"NATIVA":46,"concat":47,"repeat":48,"dot":49,"charOfPos":50,"subString":51,"length":52,"toUpper":53,"toLower":54,"not":55,"and":56,"or":57,"equal":58,"lte":59,"gte":60,"nequal":61,"lt":62,"gt":63,"plus":64,"minus":65,"times":66,"div":67,"mod":68,"pow":69,"sqrt":70,"log":71,"sin":72,"cos":73,"tan":74,"question":75,"colon":76,"integer":77,"decimal":78,"string":79,"char":80,"null":81,"true":82,"false":83,"dollar":84,"int":85,"parse":86,"double":87,"boolean":88,"toInt":89,"toDouble":90,"toSTRING":91,"typeof":92,"String":93,"void":94,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"semicolon",13:"break",14:"continue",16:"identifier",17:"incremento",18:"decremento",22:"lparen",24:"rparen",25:"allave",26:"cllave",28:"coma",34:"return",35:"asig",36:"if",37:"else",38:"print",39:"println",47:"concat",48:"repeat",49:"dot",50:"charOfPos",51:"subString",52:"length",53:"toUpper",54:"toLower",55:"not",56:"and",57:"or",58:"equal",59:"lte",60:"gte",61:"nequal",62:"lt",63:"gt",64:"plus",65:"minus",66:"times",67:"div",68:"mod",69:"pow",70:"sqrt",71:"log",72:"sin",73:"cos",74:"tan",75:"question",76:"colon",77:"integer",78:"decimal",79:"string",80:"char",81:"null",82:"true",83:"false",84:"dollar",85:"int",86:"parse",87:"double",88:"boolean",89:"toInt",90:"toDouble",91:"toSTRING",92:"typeof",93:"String",94:"void"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[6,1],[6,2],[6,2],[6,2],[6,2],[6,3],[6,3],[6,2],[6,1],[11,8],[23,1],[23,0],[27,3],[27,1],[29,1],[15,4],[30,1],[30,0],[31,3],[31,1],[32,1],[12,2],[10,4],[9,2],[19,3],[20,7],[20,11],[20,9],[7,4],[7,4],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[45,3],[45,3],[45,6],[45,8],[45,5],[45,5],[45,5],[43,2],[43,3],[43,3],[42,3],[42,3],[42,3],[42,3],[42,3],[42,3],[41,3],[41,3],[41,3],[41,3],[41,3],[41,2],[41,2],[41,2],[41,6],[41,4],[41,4],[41,4],[41,4],[41,4],[44,5],[40,1],[40,1],[40,1],[40,1],[40,1],[40,1],[40,1],[40,3],[40,2],[46,6],[46,6],[46,6],[46,4],[46,4],[46,4],[46,4],[21,1],[21,1],[21,1],[21,1],[21,1],[21,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; return this.$; 
break;
case 2:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3: case 20: case 26:
 this.$ = [$$[$0]]; 
break;
case 4: case 5: case 6: case 8: case 11: case 14:
 this.$ = $$[$0-1]; 
break;
case 7: case 15: case 17: case 21: case 23: case 27:
 this.$ = $$[$0]; 
break;
case 9:
 this.$ = new Break(_$[$0-1].first_line, _$[$0-1].first_column);
break;
case 10:
 this.$ = new Continue(_$[$0-1].first_line, _$[$0-1].first_column);
break;
case 12:
 this.$ = new Incremento(new Operacion(new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),Operador.INCREMENTO, _$[$0-2].first_line, _$[$0-2].first_column),_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 13:
 this.$ = new Decremento(new Operacion(new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),Operador.DECREMENTO, _$[$0-2].first_line, _$[$0-2].first_column),_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 16:
 this.$ = new Funcion($$[$0-6],$$[$0-4],$$[$0-1],$$[$0-7],_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 18: case 24:
 this.$ = []; 
break;
case 19: case 25:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2];
break;
case 22:
 this.$ = new Llamada($$[$0-3],$$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 28:
 this.$ = new Return($$[$0],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 29:
 this.$ = new Declaracion($$[$0-2],$$[$0],$$[$0-3],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 30:
 this.$ = new Declaracion($$[$0],null,$$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 31:
 this.$ =  new Asignacion($$[$0-2],$$[$0],_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 32:
 this.$ = new If($$[$0-4],$$[$0-1],[],_$[$0-6].first_line, _$[$0-6].first_column);
break;
case 33:
 this.$ = new If($$[$0-8],$$[$0-5],$$[$0-1] ,_$[$0-10].first_line, _$[$0-10].first_column);
break;
case 34:
 this.$ = new If($$[$0-6],$$[$0-3],[$$[$0]],_$[$0-8].first_line, _$[$0-8].first_column);
break;
case 35:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,false); 
break;
case 36:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,true); 
break;
case 37: case 38: case 39: case 40: case 41: case 42: case 43: case 45: case 85:
 this.$ = $$[$0] 
break;
case 44:
 this.$ = new Identificador($$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 46:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.CONCAT, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 47:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.REPEAT, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 48:
this.$ = new CharOfPosition($$[$0-5],$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 49:
this.$ = new SubString($$[$0-7],$$[$0-3],$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column);
break;
case 50:
this.$ = new Length($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 51:
this.$ = new ToUpper($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 52:
this.$ = new ToLower($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 53:
 this.$ = new Logica($$[$0],$$[$0],Operador.NOT, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 54:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.AND, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 55:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.OR, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 56:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.IGUAL_IGUAL, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 57:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 58:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 59:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.DIFERENTE_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 60:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 61:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 62:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.SUMA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 63:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.RESTA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 64:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MULTIPLICACION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 65:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.DIVISION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 66:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MODULO, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 67:
 this.$ = new Operacion($$[$0],$$[$0],Operador.MENOS_UNARIO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 68:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.INCREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 69:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.DECREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 70:
 this.$ = new Operacion($$[$0-3],$$[$0-1],Operador.POW, _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 71:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.SQRT, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 72:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.LOG, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 73:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.SENO, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 74:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.COSENO, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 75:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.TAN, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 76:
 this.$ = new Ternario($$[$0-4],$$[$0-2],$$[$0],_$[$0-4].first_line,_$[$0-4].first_column); 
break;
case 77: case 78:
 this.$ = new Primitivo(Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 79: case 80:
 this.$ = new Primitivo($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 81:
 this.$ = new Primitivo(null, _$[$0].first_line, _$[$0].first_column); 
break;
case 82:
 this.$ = new Primitivo(true, _$[$0].first_line, _$[$0].first_column); 
break;
case 83:
 this.$ = new Primitivo(false, _$[$0].first_line, _$[$0].first_column); 
break;
case 84:
 this.$ = $$[$0-1] 
break;
case 86:
this.$ = new TipoParse(Tipo.INT,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 87:
this.$ = new TipoParse(Tipo.DOUBLE,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 88:
this.$ = new TipoParse(Tipo.BOOL,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 89:
this.$ = new ToInt($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 90:
this.$ = new ToDouble($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 91:
this.$ = new ToString($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 92:
this.$ = new Typeof($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 93:
this.$ = Tipo.INT; 
break;
case 94:
this.$ = Tipo.DOUBLE; 
break;
case 95:
this.$ = Tipo.STRING; 
break;
case 96:
this.$ = Tipo.BOOL; 
break;
case 97:
this.$ = Tipo.CHAR; 
break;
case 98:
this.$ = Tipo.VOID; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,10:6,11:7,12:8,13:$V0,14:$V1,15:11,16:$V2,19:13,20:14,21:17,34:$V3,36:$V4,38:$V5,39:$V6,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},{1:[3]},{5:[1,26],6:27,7:4,9:5,10:6,11:7,12:8,13:$V0,14:$V1,15:11,16:$V2,19:13,20:14,21:17,34:$V3,36:$V4,38:$V5,39:$V6,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},o($Vd,[2,3]),{8:[1,28]},{8:[1,29]},{8:[1,30]},o($Vd,[2,7]),{8:[1,31]},{8:[1,32]},{8:[1,33]},{8:[1,34]},{17:[1,35],18:[1,36],22:$Ve,35:[1,38]},{8:[1,39]},o($Vd,[2,15]),{22:[1,40]},{22:[1,41]},{16:[1,42]},{15:52,16:$Vf,22:$Vg,33:43,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{22:[1,77]},{16:[2,93]},{16:[2,94]},{16:[2,95]},{16:[2,96]},{16:[2,97]},{16:[2,98]},{1:[2,1]},o($Vd,[2,2]),o($Vd,[2,4]),o($Vd,[2,5]),o($Vd,[2,6]),o($Vd,[2,8]),o($Vd,[2,9]),o($Vd,[2,10]),o($Vd,[2,11]),{8:[1,78]},{8:[1,79]},{15:52,16:$Vf,22:$Vg,24:[2,24],30:80,31:81,32:82,33:83,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:84,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},o($Vd,[2,14]),{15:52,16:$Vf,22:$Vg,33:85,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:86,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{8:$VE,22:[1,88],35:[1,87]},{8:[2,28],17:$VF,18:$VG,47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},o($VY,[2,37]),o($VY,[2,38]),o($VY,[2,39]),o($VY,[2,40]),o($VY,[2,41]),o($VY,[2,42]),o($VY,[2,43]),o($VY,[2,44],{22:$Ve}),o($VY,[2,45]),o($VY,[2,77]),o($VY,[2,78]),o($VY,[2,79]),o($VY,[2,80]),o($VY,[2,81]),o($VY,[2,82]),o($VY,[2,83]),{15:52,16:$Vf,22:$Vg,33:108,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:109,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:110,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{22:[1,111]},{22:[1,112]},{22:[1,113]},{22:[1,114]},{22:[1,115]},{22:[1,116]},{15:52,16:$Vf,22:$Vg,33:117,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{49:[1,118]},{49:[1,119]},{49:[1,120]},{22:[1,121]},{22:[1,122]},{22:[1,123]},{22:[1,124]},{15:52,16:$Vf,22:$Vg,33:125,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},o($Vd,[2,12]),o($Vd,[2,13]),{24:[1,126]},{24:[2,23],28:[1,127]},o($VZ,[2,26]),o($VZ,[2,27],{17:$VF,18:$VG,47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX}),{8:[2,31],17:$VF,18:$VG,47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,128],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,129],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{15:52,16:$Vf,22:$Vg,33:130,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{9:134,21:135,23:131,24:[2,18],27:132,29:133,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},{15:52,16:$Vf,22:$Vg,33:136,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:137,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:138,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:139,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:140,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},o($VY,[2,68]),o($VY,[2,69]),{15:52,16:$Vf,22:$Vg,33:141,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:142,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:143,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:144,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:145,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:146,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:147,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:148,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:149,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:150,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:151,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{50:[1,152],51:[1,153],52:[1,154],53:[1,155],54:[1,156]},{17:$VF,18:$VG,24:[1,157],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},o([8,24,28,75,76],[2,85],{17:$VF,18:$VG,47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),o($VY,[2,67]),{15:52,16:$Vf,22:$Vg,33:158,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:159,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:160,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:161,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:162,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:163,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},o($V_,[2,53],{17:$VF,18:$VG}),{86:[1,164]},{86:[1,165]},{86:[1,166]},{15:52,16:$Vf,22:$Vg,33:167,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:168,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:169,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:170,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{17:$VF,18:$VG,24:[1,171],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},o($VY,[2,22]),{15:52,16:$Vf,22:$Vg,32:172,33:83,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{8:[2,35]},{8:[2,36]},{8:[2,29],17:$VF,18:$VG,47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{24:[1,173]},{24:[2,17],28:[1,174]},o($VZ,[2,20]),o($VZ,[2,21]),{16:[1,175]},o($V$,[2,62],{17:$VF,18:$VG,66:$VU,67:$VV,68:$VW}),o($V$,[2,63],{17:$VF,18:$VG,66:$VU,67:$VV,68:$VW}),o($V_,[2,64],{17:$VF,18:$VG}),o($V_,[2,65],{17:$VF,18:$VG}),o($V_,[2,66],{17:$VF,18:$VG}),o($V01,[2,56],{17:$VF,18:$VG,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),o($V01,[2,57],{17:$VF,18:$VG,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),o($V01,[2,58],{17:$VF,18:$VG,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),o($V01,[2,59],{17:$VF,18:$VG,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),o($V01,[2,60],{17:$VF,18:$VG,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),o($V01,[2,61],{17:$VF,18:$VG,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),o($V11,[2,54],{17:$VF,18:$VG,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),o([8,24,28,48,49,57,75,76],[2,55],{17:$VF,18:$VG,47:$VH,56:$VK,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),{17:$VF,18:$VG,47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX,76:[1,176]},o($V11,[2,46],{17:$VF,18:$VG,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),o([8,24,28,48,49,75,76],[2,47],{17:$VF,18:$VG,47:$VH,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW}),{22:[1,177]},{22:[1,178]},{22:[1,179]},{22:[1,180]},{22:[1,181]},o($VY,[2,84]),{17:$VF,18:$VG,28:[1,182],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,183],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,184],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,185],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,186],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,187],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{22:[1,188]},{22:[1,189]},{22:[1,190]},{17:$VF,18:$VG,24:[1,191],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,192],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,193],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,194],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{25:[1,195]},o($VZ,[2,25]),{25:[1,196]},{9:134,21:135,29:197,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},o($VZ,$VE),{15:52,16:$Vf,22:$Vg,33:198,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:199,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:200,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{24:[1,201]},{24:[1,202]},{24:[1,203]},{15:52,16:$Vf,22:$Vg,33:204,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},o($VY,[2,71]),o($VY,[2,72]),o($VY,[2,73]),o($VY,[2,74]),o($VY,[2,75]),{15:52,16:$Vf,22:$Vg,33:205,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:206,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},{15:52,16:$Vf,22:$Vg,33:207,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},o($VY,[2,89]),o($VY,[2,90]),o($VY,[2,91]),o($VY,[2,92]),{4:208,6:3,7:4,9:5,10:6,11:7,12:8,13:$V0,14:$V1,15:11,16:$V2,19:13,20:14,21:17,34:$V3,36:$V4,38:$V5,39:$V6,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},{4:209,6:3,7:4,9:5,10:6,11:7,12:8,13:$V0,14:$V1,15:11,16:$V2,19:13,20:14,21:17,34:$V3,36:$V4,38:$V5,39:$V6,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},o($VZ,[2,19]),o([8,24,28,76],[2,76],{17:$VF,18:$VG,47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX}),{17:$VF,18:$VG,24:[1,210],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,28:[1,211],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},o($VY,[2,50]),o($VY,[2,51]),o($VY,[2,52]),{17:$VF,18:$VG,24:[1,212],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,213],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,214],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{17:$VF,18:$VG,24:[1,215],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{6:27,7:4,9:5,10:6,11:7,12:8,13:$V0,14:$V1,15:11,16:$V2,19:13,20:14,21:17,26:[1,216],34:$V3,36:$V4,38:$V5,39:$V6,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},{6:27,7:4,9:5,10:6,11:7,12:8,13:$V0,14:$V1,15:11,16:$V2,19:13,20:14,21:17,26:[1,217],34:$V3,36:$V4,38:$V5,39:$V6,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},o($VY,[2,48]),{15:52,16:$Vf,22:$Vg,33:218,40:44,41:45,42:46,43:47,44:48,45:49,46:50,55:$Vh,65:$Vi,69:$Vj,70:$Vk,71:$Vl,72:$Vm,73:$Vn,74:$Vo,77:$Vp,78:$Vq,79:$Vr,80:$Vs,81:$Vt,82:$Vu,83:$Vv,84:$Vw,85:$Vx,87:$Vy,88:$Vz,89:$VA,90:$VB,91:$VC,92:$VD},o($VY,[2,70]),o($VY,[2,86]),o($VY,[2,87]),o($VY,[2,88]),o($Vd,[2,32],{37:[1,219]}),o($Vd,[2,16]),{17:$VF,18:$VG,24:[1,220],47:$VH,48:$VI,49:$VJ,56:$VK,57:$VL,58:$VM,59:$VN,60:$VO,61:$VP,62:$VQ,63:$VR,64:$VS,65:$VT,66:$VU,67:$VV,68:$VW,75:$VX},{20:222,25:[1,221],36:$V4},o($VY,[2,49]),{4:223,6:3,7:4,9:5,10:6,11:7,12:8,13:$V0,14:$V1,15:11,16:$V2,19:13,20:14,21:17,34:$V3,36:$V4,38:$V5,39:$V6,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},o($Vd,[2,34]),{6:27,7:4,9:5,10:6,11:7,12:8,13:$V0,14:$V1,15:11,16:$V2,19:13,20:14,21:17,26:[1,224],34:$V3,36:$V4,38:$V5,39:$V6,80:$V7,85:$V8,87:$V9,88:$Va,93:$Vb,94:$Vc},o($Vd,[2,33])],
defaultActions: {20:[2,93],21:[2,94],22:[2,95],23:[2,96],24:[2,97],25:[2,98],26:[2,1],128:[2,35],129:[2,36]},
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

    const {Tipo} = require("../AST/Tipo.js");
    const {Declaracion} = require("../Instrucciones/Declaracion.js");
    const {Asignacion} = require("../Instrucciones/Asignacion.js");
    const {Funcion} = require("../Instrucciones/Funcion.js");
    const {Llamada} = require("../Instrucciones/Llamada.js");
    const {Return} = require("../Instrucciones/Return.js");
    const {Break} = require("../Instrucciones/Break.js");
    const {Continue} = require("../Instrucciones/Continue.js");
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
case 3:return 81;
break;
case 4:return 85;
break;
case 5:return 87;
break;
case 6:return 88;
break;
case 7:return 80;
break;
case 8:return 93;
break;
case 9:return 94;
break;
case 10:return 82;
break;
case 11:return 83;
break;
case 12:return 38;
break;
case 13:return 39;
break;
case 14:return 34;
break;
case 15:return 13;
break;
case 16:return 14;
break;
case 17:return 36;
break;
case 18:return 37;
break;
case 19:return 69;
break;
case 20:return 70;
break;
case 21:return 71;
break;
case 22:return 72;
break;
case 23:return 73;
break;
case 24:return 74;
break;
case 25:return 50;
break;
case 26:return 51;
break;
case 27:return 52;
break;
case 28:return 53;
break;
case 29:return 54;
break;
case 30:return 86;
break;
case 31:return 89;
break;
case 32:return 90;
break;
case 33:return 91;
break;
case 34:return 92;
break;
case 35:return 17;
break;
case 36:return 18;
break;
case 37:return 64;
break;
case 38:return 65;
break;
case 39:return 66;
break;
case 40:return 67;
break;
case 41:return 68;
break;
case 42:return 58;
break;
case 43:return 59;
break;
case 44:return 60;
break;
case 45:return 61;
break;
case 46:return 62;
break;
case 47:return 63;
break;
case 48:return 35;
break;
case 49:return 56;
break;
case 50:return 57;
break;
case 51:return 55;
break;
case 52:return 47;
break;
case 53:return 48;
break;
case 54:return 84;
break;
case 55:return 8;
break;
case 56:return 76;
break;
case 57:return 22;
break;
case 58:return 24;
break;
case 59:return 75;
break;
case 60:return 25;
break;
case 61:return 26;
break;
case 62:return 28;
break;
case 63:return 49;
break;
case 64:return 78;
break;
case 65:return 77;
break;
case 66:return 16;
break;
case 67:return 79;
break;
case 68:return 80;
break;
case 69:return;
break;
case 70:
                                        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                                    
break;
case 71:return 5
break;
}
},
rules: [/^(?:\/\/.*)/,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/,/^(?:\s+)/,/^(?:null\b)/,/^(?:int\b)/,/^(?:double\b)/,/^(?:boolean\b)/,/^(?:char\b)/,/^(?:String\b)/,/^(?:void\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:print\b)/,/^(?:println\b)/,/^(?:return\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:pow\b)/,/^(?:sqrt\b)/,/^(?:log\b)/,/^(?:sin\b)/,/^(?:cos\b)/,/^(?:tan\b)/,/^(?:caracterOfPosition\b)/,/^(?:subString\b)/,/^(?:length\b)/,/^(?:toUpperCase\b)/,/^(?:toLowerCase\b)/,/^(?:parse\b)/,/^(?:toInt\b)/,/^(?:toDouble\b)/,/^(?:toString\b)/,/^(?:typeof\b)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:==)/,/^(?:<=)/,/^(?:>=)/,/^(?:!=)/,/^(?:<)/,/^(?:>)/,/^(?:=)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:&)/,/^(?:\^)/,/^(?:\$)/,/^(?:;)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\?)/,/^(?:\{)/,/^(?:\})/,/^(?:,)/,/^(?:\.)/,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/,/^(?:[0-9]+)/,/^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ]*)/,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/,/^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/,/^(?:{Comment})/,/^(?:.)/,/^(?:$)/],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71],"inclusive":true}}
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
},{"../AST/Operador.js":4,"../AST/Tipo.js":6,"../Expresiones/Decremento.js":7,"../Expresiones/Identificador.js":8,"../Expresiones/Incremento.js":9,"../Expresiones/Logica.js":10,"../Expresiones/Nativas/TipoParse.js":11,"../Expresiones/Nativas/ToDouble.js":12,"../Expresiones/Nativas/ToInt.js":13,"../Expresiones/Nativas/ToString.js":14,"../Expresiones/Nativas/Typeof.js":15,"../Expresiones/NativasString/CharOfPosition.js":16,"../Expresiones/NativasString/Length.js":17,"../Expresiones/NativasString/SubString.js":18,"../Expresiones/NativasString/ToLower.js":19,"../Expresiones/NativasString/ToUpper.js":20,"../Expresiones/Operacion.js":21,"../Expresiones/Primitivo.js":22,"../Expresiones/Relacional.js":23,"../Expresiones/Ternario.js":24,"../Instrucciones/Asignacion.js":26,"../Instrucciones/Break.js":27,"../Instrucciones/Continue.js":28,"../Instrucciones/Declaracion.js":29,"../Instrucciones/Funcion.js":30,"../Instrucciones/If.js":31,"../Instrucciones/Llamada.js":32,"../Instrucciones/Print.js":33,"../Instrucciones/Return.js":34,"_process":39,"fs":37,"path":38}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_js_1 = require("../AST/Tipo.js");
class Asignacion {
    constructor(identificador, exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (!(valor instanceof Excepcion_1.Excepcion)) {
            if (ent.existeEnActual(this.identificador)) {
                let simbolo = ent.getSimbolo(this.identificador);
                let simboloValor = simbolo.getTipo(ent, arbol);
                if (simboloValor == tipoValor || (tipoValor == Tipo_js_1.Tipo.NULL && simboloValor == Tipo_js_1.Tipo.STRING) || (tipoValor == Tipo_js_1.Tipo.INT && simboloValor == Tipo_js_1.Tipo.DOUBLE)) {
                    if (this.isDouble(tipoValor, simboloValor)) {
                        valor = valor.toFixed(2);
                    }
                    simbolo.setValor(valor);
                    ent.reemplazar(this.identificador, simbolo);
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

},{"../AST/Excepcion":3,"../AST/Tipo.js":6}],27:[function(require,module,exports){
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.Break = Break;

},{}],28:[function(require,module,exports){
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.Continue = Continue;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Llamada_1 = require("./Llamada");
class Declaracion {
    constructor(identificador, expresion, tipo, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.tipo = tipo;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let valor;
        let tipoValor;
        if (this.expresion != null) {
            if (this.expresion instanceof Llamada_1.Llamada) {
                valor = this.expresion.ejecutar(ent, arbol);
                if (valor instanceof Excepcion_1.Excepcion)
                    return valor;
                tipoValor = this.expresion.getTipo(arbol);
            }
            else {
                valor = this.expresion.getValorImplicito(ent, arbol);
                if (valor instanceof Excepcion_1.Excepcion)
                    return valor;
                tipoValor = this.expresion.getTipo(ent, arbol);
            }
            if (tipoValor == this.tipo || (tipoValor == Tipo_1.Tipo.NULL && this.tipo == Tipo_1.Tipo.STRING) || this.isDouble(tipoValor)) {
                if (!ent.existeEnActual(this.identificador)) {
                    let simbolo = new Simbolo_1.Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                    ent.agregar(this.identificador, simbolo);
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
            if (!ent.existe(this.identificador)) {
                let simbolo = new Simbolo_1.Simbolo(this.tipo, this.identificador, this.linea, this.columna, null);
                ent.agregar(this.identificador, simbolo);
            }
            else {
                return new Excepcion_1.Excepcion(this.linea, this.columna, "\nSemantico", "La variable ya existe");
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

},{"../AST/Excepcion":3,"../AST/Simbolo":5,"../AST/Tipo":6,"./Llamada":32}],30:[function(require,module,exports){
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        ent.setEntorno("Funcion " + this.nombre);
        console.log("Instruccion " + this.instrucciones);
        for (let i in this.instrucciones) {
            let value = this.instrucciones[i].ejecutar(ent, arbol);
            if (value instanceof Excepcion_1.Excepcion) {
                arbol.updateConsola(value.toString());
            }
            else if (value instanceof Return_1.Return) {
                if (this.tipo == value.getTipo()) {
                    return value.getValue();
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

},{"../AST/Excepcion":3,"../AST/Tipo":6,"./Return":34}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class If {
    constructor(condicion, instrucciones_If, instrucciones_Else, linea, columna) {
        this.condicion = condicion;
        this.instrucciones_If = instrucciones_If;
        this.instrucciones_Else = instrucciones_Else;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let entorno_Instrucciones = new Entorno_1.Entorno(ent);
        let valor_Condicional = this.condicion.getValorImplicito(ent, arbol);
        if (this.condicion.getTipo(ent, arbol) == Tipo_1.Tipo.BOOL) {
            if (valor_Condicional) { //SI EL VALOR DE LA CONDICION SE CUMPLE
                for (let instrucciones of this.instrucciones_If) {
                    entorno_Instrucciones.setEntorno("If");
                    let salidaInstrucciones = instrucciones.ejecutar(entorno_Instrucciones, arbol);
                    console.log(salidaInstrucciones);
                    //BREAK
                    if (salidaInstrucciones != null) {
                        return salidaInstrucciones;
                    }
                    else {
                        return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Error en la Sentencia If");
                    }
                }
            }
        }
        else {
            for (let instrucciones of this.instrucciones_Else) {
                entorno_Instrucciones.setEntorno("Else");
                let salidaInstrucciones = instrucciones.ejecutar(entorno_Instrucciones, arbol);
                if (salidaInstrucciones != null) {
                    return salidaInstrucciones;
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Error en la Sentencia Else");
                }
            }
        }
        /*
                if (this.expresion != null) {
                    let valor = this.expresion.getValorImplicito(ent, arbol);
                    const tipoValor = this.expresion.getTipo(ent, arbol);
                    if (tipoValor == this.tipo || (tipoValor == Tipo.NULL && this.tipo == Tipo.STRING) || this.isDouble(tipoValor)) {
                        if (!ent.existe(this.identificador)) {
                            let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                            ent.agregar(this.identificador, simbolo);
                        } else {
                            return new Excepcion(this.linea, this.columna, "Semantico", "La variable ya existe");
                        }
                    } else {
                        return new Excepcion(this.linea, this.columna, "Semantico", "El tipo asignado a la variable no es correcto");
                    }
                } else {
                    if (!ent.existe(this.identificador)) {
                        let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, null);
                        ent.agregar(this.identificador, simbolo);
                    } else {
                        return new Excepcion(this.linea, this.columna, "Semantico", "La variable ya existe");
                    }
                }
            }
        */
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

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":6}],32:[function(require,module,exports){
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
        console.log("Funcion", funcion);
        if (funcion === null) {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "La funcion llamada no existe");
        }
        let nuevoEntorno = new Entorno_1.Entorno(ent);
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    getTipo(arbol) {
        let funcion = arbol.getFuncion(this.nombre);
        return funcion.getTipo();
    }
    getValorImplicito(ent, arbol) {
        return this.ejecutar(ent, arbol);
    }
}
exports.Llamada = Llamada;

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Simbolo":5,"../AST/Tipo":6}],33:[function(require,module,exports){
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
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        let valor = this.expresion.getValorImplicito(ent, arbol);
        valor = this.addSalto(valor);
        arbol.updateConsola(valor);
    }
    addSalto(valor) {
        return this.salto ? valor + "\n" : valor;
    }
}
exports.Print = Print;

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Excepcion_1 = require("../AST/Excepcion");
class Return {
    constructor(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = null;
        this.value = null;
    }
    ejecutar(ent, arbol) {
        console.log("Expresion", this.expresion);
        let value = this.expresion.getValorImplicito(ent, arbol);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        this.tipo = this.expresion.getTipo(ent, arbol);
        this.value = value;
        return this;
    }
    traducir(ent, arbol) {
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

},{"../AST/Excepcion":3}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],36:[function(require,module,exports){
const AST = require("./AST/AST.js");
const Entorno = require("./AST/Entorno.js");
const Instruccion = require("./Interfaces/Instruccion.js");
const Excepcion = require("./AST/Excepcion.js");
const Funcion = require("./Instrucciones/Funcion.js");

const grammar = require("./Gramatica/grammar.js")


if (typeof window !== 'undefined') {
    window.parseExternal = function (input) {
        const instrucciones = grammar.parse(input);
        const ast = new AST.AST(instrucciones);
        const entornoGlobal = new Entorno.Entorno(null);
        ast.instrucciones.forEach(function (element) {
            let value;
            if (element instanceof Funcion.Funcion) {
                ast.addFuncion(element);
            } else {
                console.log(element);
                value = element.ejecutar(entornoGlobal, ast);
            }
            if (value instanceof Excepcion.Excepcion) {
                ast.updateConsola(value);
            }
        });
        //console.log("Entorno ",entornoGlobal.getTabla());
        console.log(ast);
        return ast.getConsola();
    }
}


},{"./AST/AST.js":1,"./AST/Entorno.js":2,"./AST/Excepcion.js":3,"./Gramatica/grammar.js":25,"./Instrucciones/Funcion.js":30,"./Interfaces/Instruccion.js":35}],37:[function(require,module,exports){

},{}],38:[function(require,module,exports){
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
},{"_process":39}],39:[function(require,module,exports){
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

},{}]},{},[36]);
