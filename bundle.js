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
        return `${this.tipo} - ${this.descripcion} [${this.linea},${this.columna}]`;
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
    Operador[Operador["AND"] = 10] = "AND";
    Operador[Operador["OR"] = 11] = "OR";
    Operador[Operador["NOT"] = 12] = "NOT";
    Operador[Operador["MAYOR_IGUAL_QUE"] = 13] = "MAYOR_IGUAL_QUE";
    Operador[Operador["MENOR_IGUAL_QUE"] = 14] = "MENOR_IGUAL_QUE";
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
        throw new Error("Method not implemented.");
    }
    getValorImplicito(ent, arbol) {
        if (ent.existeEnActual(this.identificador)) {
            let simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getValorImplicito(ent, arbol);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable no existe");
        }
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.Identificador = Identificador;

},{"../AST/Excepcion":3}],8:[function(require,module,exports){
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
            //AND
            if (this.operador == Operador_1.Operador.AND) {
                if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                    return op1 && op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos para AND");
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para AND");
                }
            }
            //OR
            else if (this.operador == Operador_1.Operador.OR) {
                if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                    return op1 || op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos para OR");
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para OR");
                }
            }
        }
        else {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador_1.Operador.NOT) {
                if (typeof (op1 === "boolean")) {
                    return !op1;
                }
                else {
                    console.log("Error de tipos de datos no permitidos para NOT");
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

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Tipo":6}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operacion = void 0;
const Tipo_1 = require("../AST/Tipo");
const Operador_1 = require("../AST/Operador");
const Excepcion_1 = require("../AST/Excepcion");
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

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Tipo":6}],10:[function(require,module,exports){
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
        return this.valor;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isChar(cadena) {
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length - 1) === "'";
    }
}
exports.Primitivo = Primitivo;

},{"../AST/Tipo":6}],11:[function(require,module,exports){
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
            else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
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
            else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
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

},{"../AST/Excepcion":3,"../AST/Operador":4,"../AST/Tipo":6}],12:[function(require,module,exports){
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,37],$V1=[1,6],$V2=[1,7],$V3=[1,10],$V4=[1,13],$V5=[1,9],$V6=[1,11],$V7=[1,12],$V8=[5,11,14,17,37,39,43,44,45],$V9=[1,26],$Va=[1,35],$Vb=[1,36],$Vc=[1,34],$Vd=[1,27],$Ve=[1,28],$Vf=[1,29],$Vg=[1,30],$Vh=[1,31],$Vi=[1,32],$Vj=[1,33],$Vk=[1,51],$Vl=[1,52],$Vm=[1,45],$Vn=[1,46],$Vo=[1,47],$Vp=[1,48],$Vq=[1,49],$Vr=[1,50],$Vs=[1,40],$Vt=[1,41],$Vu=[1,42],$Vv=[1,43],$Vw=[1,44],$Vx=[8,16,23,24,25,26,27,28,29,30,31,32,33,34,35],$Vy=[8,16,23,24,25,26,27,28,29,30,31,32],$Vz=[8,16,23,24,25,26,27,28,29,30];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"RAICES":4,"EOF":5,"RAIZ":6,"PRINT":7,"semicolon":8,"DECLARACION":9,"TIPO":10,"identifier":11,"asig":12,"EXPR":13,"print":14,"lparen":15,"rparen":16,"println":17,"PRIMITIVA":18,"OP_ARITMETICAS":19,"OP_RELACIONALES":20,"OP_LOGICAS":21,"not":22,"and":23,"or":24,"equal":25,"lte":26,"gte":27,"nequal":28,"lt":29,"gt":30,"plus":31,"minus":32,"times":33,"div":34,"mod":35,"integer":36,"double":37,"string":38,"char":39,"null":40,"true":41,"false":42,"int":43,"String":44,"boolean":45,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"semicolon",11:"identifier",12:"asig",14:"print",15:"lparen",16:"rparen",17:"println",22:"not",23:"and",24:"or",25:"equal",26:"lte",27:"gte",28:"nequal",29:"lt",30:"gt",31:"plus",32:"minus",33:"times",34:"div",35:"mod",36:"integer",37:"double",38:"string",39:"char",40:"null",41:"true",42:"false",43:"int",44:"String",45:"boolean"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[9,4],[7,4],[7,4],[13,1],[13,1],[13,1],[13,1],[13,1],[21,2],[21,3],[21,3],[20,3],[20,3],[20,3],[20,3],[20,3],[20,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,2],[19,3],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[10,0],[10,1],[10,1],[10,1],[10,1],[10,1]],
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
case 3:
 this.$ = [$$[$0]]; 
break;
case 4: case 5: case 29:
 this.$ = $$[$0-1] 
break;
case 6:
 this.$ = new Declaracion($$[$0-2],$$[$0],$$[$0-3],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 7:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,false); 
break;
case 8:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,true); 
break;
case 9: case 10: case 11: case 12:
 this.$ = $$[$0] 
break;
case 13:
 this.$ = new Identificador($$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 14:
 this.$ = new Logica($$[$0],$$[$0],Operador.NOT, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 15:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.AND, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 16:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.OR, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 17:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.IGUAL_IGUAL, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 18:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 19:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 20:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.DIFERENTE_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 21:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 22:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 23:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.SUMA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 24:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.RESTA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 25:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MULTIPLICACION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 26:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.DIVISION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 27:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MODULO, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 28:
 this.$ = new Operacion($$[$0],$$[$0],Operador.MENOS_UNARIO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 30: case 31:
 this.$ = new Primitivo(Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 32: case 33:
 this.$ = new Primitivo($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 34:
 this.$ = new Primitivo(null, _$[$0].first_line, _$[$0].first_column); 
break;
case 35:
 this.$ = new Primitivo(true, _$[$0].first_line, _$[$0].first_column); 
break;
case 36:
 this.$ = new Primitivo(false, _$[$0].first_line, _$[$0].first_column); 
break;
case 38:
this.$ = Tipo.INT 
break;
case 39:
this.$ = Tipo.DOUBLE 
break;
case 40:
this.$ = Tipo.STRING 
break;
case 41:
this.$ = Tipo.BOOL 
break;
case 42:
this.$ = Tipo.CHAR 
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,10:8,11:$V0,14:$V1,17:$V2,37:$V3,39:$V4,43:$V5,44:$V6,45:$V7},{1:[3]},{5:[1,14],6:15,7:4,9:5,10:8,11:$V0,14:$V1,17:$V2,37:$V3,39:$V4,43:$V5,44:$V6,45:$V7},o($V8,[2,3]),{8:[1,16]},{8:[1,17]},{15:[1,18]},{15:[1,19]},{11:[1,20]},{11:[2,38]},{11:[2,39]},{11:[2,40]},{11:[2,41]},{11:[2,42]},{1:[2,1]},o($V8,[2,2]),o($V8,[2,4]),o($V8,[2,5]),{11:$V9,13:21,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:37,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{12:[1,38]},{16:[1,39],23:$Vk,24:$Vl,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw},o($Vx,[2,9]),o($Vx,[2,10]),o($Vx,[2,11]),o($Vx,[2,12]),o($Vx,[2,13]),o($Vx,[2,30]),o($Vx,[2,31]),o($Vx,[2,32]),o($Vx,[2,33]),o($Vx,[2,34]),o($Vx,[2,35]),o($Vx,[2,36]),{11:$V9,13:53,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:54,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:55,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{16:[1,56],23:$Vk,24:$Vl,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw},{11:$V9,13:57,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{8:[2,7]},{11:$V9,13:58,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:59,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:60,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:61,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:62,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:63,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:64,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:65,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:66,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:67,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:68,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:69,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},{11:$V9,13:70,15:$Va,18:22,19:23,20:24,21:25,22:$Vb,32:$Vc,36:$Vd,37:$Ve,38:$Vf,39:$Vg,40:$Vh,41:$Vi,42:$Vj},o($Vx,[2,28]),{16:[1,71],23:$Vk,24:$Vl,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw},o($Vx,[2,14]),{8:[2,8]},{8:[2,6],23:$Vk,24:$Vl,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw},o($Vy,[2,23],{33:$Vu,34:$Vv,35:$Vw}),o($Vy,[2,24],{33:$Vu,34:$Vv,35:$Vw}),o($Vx,[2,25]),o($Vx,[2,26]),o($Vx,[2,27]),o($Vz,[2,17],{31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw}),o($Vz,[2,18],{31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw}),o($Vz,[2,19],{31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw}),o($Vz,[2,20],{31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw}),o($Vz,[2,21],{31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw}),o($Vz,[2,22],{31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw}),o([8,16,23,24],[2,15],{25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw}),o([8,16,24],[2,16],{23:$Vk,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs,32:$Vt,33:$Vu,34:$Vv,35:$Vw}),o($Vx,[2,29])],
defaultActions: {9:[2,38],10:[2,39],11:[2,40],12:[2,41],13:[2,42],14:[2,1],39:[2,7],56:[2,8]},
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
    const {Tipo} = require("../AST/Tipo.js");
    const {Declaracion} = require("../Instrucciones/Declaracion.js");
    const {Identificador} = require("../Expresiones/Identificador.js");
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
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip comments */
break;
case 1:this.begin('comment');
break;
case 2:this.popState();
break;
case 3:/* skip comment content*/
break;
case 4:/* skip whitespace */
break;
case 5:return 40;
break;
case 6:return 43;
break;
case 7:return 37;
break;
case 8:return 45;
break;
case 9:return 39;
break;
case 10:return 44;
break;
case 11:return 41;
break;
case 12:return 42;
break;
case 13:return 14;
break;
case 14:return 17;
break;
case 15:return 31;
break;
case 16:return 32;
break;
case 17:return 33;
break;
case 18:return 34;
break;
case 19:return 35;
break;
case 20:return 25;
break;
case 21:return 26;
break;
case 22:return 27;
break;
case 23:return 28;
break;
case 24:return 29;
break;
case 25:return 30;
break;
case 26:return 12;
break;
case 27:return 23;
break;
case 28:return 24;
break;
case 29:return 22;
break;
case 30:return 8;
break;
case 31:return 15;
break;
case 32:return 16;
break;
case 33:return 23;
break;
case 34:return 24;
break;
case 35:return 22;
break;
case 36:return 37;
break;
case 37:return 36;
break;
case 38:return 11;
break;
case 39:return 38
break;
case 40:return 39
break;
case 41:
                                        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                                    
break;
case 42:return 5
break;
}
},
rules: [/^(?:\/\/.*)/i,/^(?:\/\*)/i,/^(?:\*\/)/i,/^(?:.)/i,/^(?:\s+)/i,/^(?:null\b)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:boolean\b)/i,/^(?:char\b)/i,/^(?:String\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:print\b)/i,/^(?:println\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:==)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:=)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:!)/i,/^(?:;)/i,/^(?:\()/i,/^(?:\))/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:!)/i,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/i,/^(?:[0-9]+)/i,/^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ]*)/i,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i,/^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/i,/^(?:.)/i,/^(?:$)/i],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42],"inclusive":true},"INITIAL":{"rules":[0,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42],"inclusive":true}}
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
},{"../AST/Operador.js":4,"../AST/Tipo.js":6,"../Expresiones/Identificador.js":7,"../Expresiones/Logica.js":8,"../Expresiones/Operacion.js":9,"../Expresiones/Primitivo.js":10,"../Expresiones/Relacional.js":11,"../Instrucciones/Declaracion.js":13,"../Instrucciones/Print.js":14,"_process":19,"fs":17,"path":18}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class Declaracion {
    constructor(identificador, exp, tipo, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.tipo = tipo;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        const valor = this.expresion.getValorImplicito(ent, arbol);
        const tipoValor = this.expresion.getTipo(ent, arbol);
        if (valor !== null) {
            if (tipoValor == this.tipo) {
                if (!ent.existe(this.identificador)) {
                    let simbolo = new Simbolo_1.Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                    ent.agregar(this.identificador, simbolo);
                }
                else {
                    console.log("Error Semantico: la variable ya existe ");
                }
            }
            else {
                console.log("Error Semantico: los tipos no coinciden");
            }
        }
        else {
            console.log('>> Error, no se pueden imprimir valores nulos');
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
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
}
exports.Declaracion = Declaracion;

},{"../AST/Simbolo":5,"../AST/Tipo":6}],14:[function(require,module,exports){
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
        if (valor !== null) {
            if (typeof valor === "string") {
                valor = valor.substring(1, valor.length - 1);
            }
            valor = this.addSalto(valor);
            arbol.updateConsola(valor);
        }
        else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }
    addSalto(valor) {
        return this.salto ? valor + "\n" : valor;
    }
}
exports.Print = Print;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],16:[function(require,module,exports){
const AST  = require("./AST/AST.js");
const Entorno = require("./AST/Entorno.js"); 
const Instruccion =  require("./Interfaces/Instruccion.js");

const grammar = require("./Gramatica/grammar.js")


if (typeof window !== 'undefined'){
    window.parseExternal = function(input){ 
        const instrucciones = grammar.parse(input);
        const ast = new AST.AST(instrucciones);
        const entornoGlobal = new Entorno.Entorno(null);
        ast.instrucciones.forEach(function (element) {
            element.ejecutar(entornoGlobal, ast);
        });
        //console.log("Entorno ",entornoGlobal.getTabla());
        console.log("Consola ",ast.getConsola());
        return ast.getConsola();
    }
}


},{"./AST/AST.js":1,"./AST/Entorno.js":2,"./Gramatica/grammar.js":12,"./Interfaces/Instruccion.js":15}],17:[function(require,module,exports){

},{}],18:[function(require,module,exports){
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
},{"_process":19}],19:[function(require,module,exports){
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

},{}]},{},[16]);
