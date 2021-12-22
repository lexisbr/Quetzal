(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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
},{"_process":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Excepcion_1 = require("./Excepcion");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = [];
        this.consola = [];
        this.excepciones = [];
        this.tablas = [];
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
            return new Excepcion_1.Excepcion(funcion.linea, funcion.columna, "Semantico", "La funcion ya existe");
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
            return new Excepcion_1.Excepcion(struct.linea, struct.columna, "Semantico", "El struct ya existe");
        }
    }
    addExcepcion(excepcion) {
        this.excepciones.push(excepcion);
    }
}
exports.AST = AST;

},{"./Excepcion":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"../AST/Excepcion":6}],11:[function(require,module,exports){
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
        return;
    }
}
exports.Identificador = Identificador;

},{"../AST/Excepcion":6}],12:[function(require,module,exports){
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

},{"../AST/Excepcion":6}],13:[function(require,module,exports){
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

},{"../AST/Excepcion":6,"../AST/Operador":7,"../AST/Tipo":9}],14:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],15:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],16:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],17:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],18:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],19:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],20:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],21:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],22:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],23:[function(require,module,exports){
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

},{"../../AST/Excepcion":6,"../../AST/Tipo":9}],24:[function(require,module,exports){
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
    }
    traducir(controlador) {
        switch (this.operador) {
            case Operador_1.Operador.SUMA:
            case Operador_1.Operador.RESTA:
            case Operador_1.Operador.MULTIPLICACION:
            case Operador_1.Operador.DIVISION:
            case Operador_1.Operador.MODULO:
                const izq = this.op_izquierda.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const der = this.op_derecha.traducir(controlador); //SE LLAMA DE FORMA RECURSIVA Y TRADUCE EL VALOR DE SUS HIJOS
                const resultado = controlador.getTemp();
                if (izq && der) {
                    const quad = new Quadrupla_1.Quadrupla(`${this.operador}`, `${izq.resultado}`, `${der.resultado}`, `${resultado}`);
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
            //multiplicaci├│n
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
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Pow (xÔü┐)");
                }
            }
            else if (this.operador == Operador_1.Operador.SQRT) {
                if (typeof (op1 === "number")) {
                    return Math.sqrt(op1);
                }
                else {
                    return new Excepcion_1.Excepcion(this.linea, this.columna, "Semantico", "Tipo de Dato Erroneo para Operacion Sqrt (ÔêÜ)");
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

},{"../AST/Excepcion":6,"../AST/Operador":7,"../AST/Simbolo":8,"../AST/Tipo":9,"../Traductor/Quadrupla":49,"./Identificador":11}],25:[function(require,module,exports){
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

},{"../AST/Tipo":9,"../Traductor/Quadrupla":49}],26:[function(require,module,exports){
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

},{"../AST/Excepcion":6,"../AST/Operador":7,"../AST/Tipo":9}],27:[function(require,module,exports){
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

},{"../AST/Excepcion":6,"../AST/Tipo":9}],28:[function(require,module,exports){
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,17],$V1=[1,34],$V2=[1,26],$V3=[1,27],$V4=[1,28],$V5=[1,29],$V6=[1,30],$V7=[1,31],$V8=[1,32],$V9=[1,33],$Va=[1,22],$Vb=[1,23],$Vc=[1,25],$Vd=[1,39],$Ve=[1,35],$Vf=[1,36],$Vg=[1,38],$Vh=[1,37],$Vi=[5,21,28,33,44,45,46,50,52,53,57,59,63,65,66,68,69,111,116,118,119,125],$Vj=[1,53],$Vk=[1,54],$Vl=[1,75],$Vm=[1,84],$Vn=[1,93],$Vo=[1,86],$Vp=[1,87],$Vq=[1,88],$Vr=[1,89],$Vs=[1,90],$Vt=[1,91],$Vu=[1,92],$Vv=[1,77],$Vw=[1,78],$Vx=[1,79],$Vy=[1,80],$Vz=[1,81],$VA=[1,82],$VB=[1,83],$VC=[1,85],$VD=[1,94],$VE=[1,95],$VF=[1,96],$VG=[1,97],$VH=[1,98],$VI=[1,99],$VJ=[1,100],$VK=[1,101],$VL=[2,136],$VM=[8,37],$VN=[2,54],$VO=[1,116],$VP=[1,126],$VQ=[1,133],$VR=[1,134],$VS=[1,144],$VT=[1,145],$VU=[1,146],$VV=[1,141],$VW=[1,142],$VX=[1,135],$VY=[1,136],$VZ=[1,137],$V_=[1,138],$V$=[1,139],$V01=[1,140],$V11=[1,128],$V21=[1,129],$V31=[1,130],$V41=[1,131],$V51=[1,132],$V61=[1,143],$V71=[8,22,23,31,32,37,64,79,80,81,88,89,90,91,92,93,94,95,96,97,98,99,100,107],$V81=[31,37],$V91=[1,171],$Va1=[8,31,32,37,64,79,80,81,88,89,90,91,92,93,94,95,96,97,98,99,100,107],$Vb1=[33,37],$Vc1=[8,31,32,37,64,79,80,81,88,89,90,91,92,93,94,95,96,97,107],$Vd1=[8,31,32,37,64,79,80,81,88,89,90,91,92,93,94,95,107],$Ve1=[8,31,32,37,64,79,80,81,88,89,107],$Vf1=[1,285],$Vg1=[1,284],$Vh1=[33,63,65];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"RAICES":4,"EOF":5,"RAIZ":6,"PRINT":7,"semicolon":8,"DECLARACION_NULA":9,"DECLARACION":10,"STRUCT":11,"FUNCION":12,"WHILE":13,"DO_WHILE":14,"FOR":15,"FOR_IN":16,"RETURN":17,"BREAK":18,"CONTINUE":19,"LLAMADA":20,"identifier":21,"incremento":22,"decremento":23,"ASIGNACION":24,"IF":25,"SWITCH":26,"MAIN":27,"void":28,"main":29,"lparen":30,"rparen":31,"allave":32,"cllave":33,"TIPO":34,"LIST_PARAMETROS":35,"PARAMETROS":36,"coma":37,"PARAMETRO":38,"DECLARACION_PARAMETROS":39,"LIST_ARGUMENTOS":40,"ARGUMENTOS":41,"ARGUMENTO":42,"EXPR":43,"while":44,"do":45,"for":46,"FOR_VARIABLE":47,"FOR_INSTRUCCION":48,"in":49,"return":50,"RETURN_OP":51,"break":52,"continue":53,"asig":54,"LIST_IDENTIFIERS":55,"IDENTIFIER":56,"if":57,"else":58,"switch":59,"CASES":60,"DEFAULT":61,"CASE":62,"case":63,"colon":64,"default":65,"print":66,"PRINT_EXPR":67,"println":68,"struct":69,"STRUCT_ATRIBUTOS":70,"STRUCT_ATRIBUTO":71,"PRIMITIVA":72,"OP_ARITMETICAS":73,"OP_RELACIONALES":74,"OP_LOGICAS":75,"OP_TERNARIA":76,"NATIVAS_STRING":77,"NATIVA":78,"concat":79,"repeat":80,"dot":81,"charOfPos":82,"subString":83,"length":84,"toUpper":85,"toLower":86,"not":87,"and":88,"or":89,"equal":90,"lte":91,"gte":92,"nequal":93,"lt":94,"gt":95,"plus":96,"minus":97,"times":98,"div":99,"mod":100,"pow":101,"sqrt":102,"log":103,"sin":104,"cos":105,"tan":106,"question":107,"integer":108,"decimal":109,"string":110,"char":111,"null":112,"true":113,"false":114,"dollar":115,"int":116,"parse":117,"double":118,"boolean":119,"toInt":120,"toDouble":121,"toSTRING":122,"stringNative":123,"typeof":124,"String":125,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"semicolon",21:"identifier",22:"incremento",23:"decremento",28:"void",29:"main",30:"lparen",31:"rparen",32:"allave",33:"cllave",37:"coma",44:"while",45:"do",46:"for",49:"in",50:"return",52:"break",53:"continue",54:"asig",57:"if",58:"else",59:"switch",63:"case",64:"colon",65:"default",66:"print",68:"println",69:"struct",79:"concat",80:"repeat",81:"dot",82:"charOfPos",83:"subString",84:"length",85:"toUpper",86:"toLower",87:"not",88:"and",89:"or",90:"equal",91:"lte",92:"gte",93:"nequal",94:"lt",95:"gt",96:"plus",97:"minus",98:"times",99:"div",100:"mod",101:"pow",102:"sqrt",103:"log",104:"sin",105:"cos",106:"tan",107:"question",108:"integer",109:"decimal",110:"string",111:"char",112:"null",113:"true",114:"false",115:"dollar",116:"int",117:"parse",118:"double",119:"boolean",120:"toInt",121:"toDouble",122:"toSTRING",123:"stringNative",124:"typeof",125:"String"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[6,2],[6,1],[6,1],[6,2],[6,1],[6,1],[6,2],[6,2],[6,2],[6,2],[6,3],[6,3],[6,2],[6,1],[6,1],[6,1],[27,7],[12,8],[35,1],[35,0],[36,3],[36,1],[38,1],[39,2],[20,4],[40,1],[40,0],[41,3],[41,1],[42,1],[13,7],[14,8],[15,11],[47,1],[47,1],[48,2],[48,2],[16,7],[17,2],[18,1],[19,1],[51,1],[51,0],[10,4],[9,2],[55,3],[55,1],[56,1],[24,3],[25,7],[25,11],[25,9],[26,7],[26,8],[26,7],[60,2],[60,1],[62,4],[61,3],[7,4],[7,4],[67,3],[67,1],[11,5],[70,3],[70,1],[71,2],[43,1],[43,1],[43,1],[43,1],[43,1],[43,1],[43,1],[43,1],[43,1],[77,3],[77,3],[77,6],[77,8],[77,5],[77,5],[77,5],[75,2],[75,3],[75,3],[74,3],[74,3],[74,3],[74,3],[74,3],[74,3],[73,3],[73,3],[73,3],[73,3],[73,3],[73,2],[73,2],[73,2],[73,6],[73,4],[73,4],[73,4],[73,4],[73,4],[76,5],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,3],[72,2],[78,6],[78,6],[78,6],[78,4],[78,4],[78,4],[78,4],[78,4],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; return this.$; 
break;
case 2: case 62:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3: case 28: case 35: case 53: case 69: case 72:
 this.$ = [$$[$0]]; 
break;
case 4: case 5: case 6: case 7: case 10: case 13: case 14: case 15: case 16: case 19:
 this.$ = $$[$0-1]; 
break;
case 8: case 9: case 11: case 12: case 20: case 21: case 22: case 25: case 29: case 32: case 36: case 54:
 this.$ = $$[$0]; 
break;
case 17:
 this.$ = new Incremento(new Operacion(new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),Operador.INCREMENTO, _$[$0-2].first_line, _$[$0-2].first_column),_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 18:
 this.$ = new Decremento(new Operacion(new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),new Identificador($$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column),Operador.DECREMENTO, _$[$0-2].first_line, _$[$0-2].first_column),_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 23:
this.$ = new Main($$[$0-1],_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 24:
 this.$ = new Funcion($$[$0-6],$$[$0-4],$$[$0-1],$$[$0-7],_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 26: case 33:
 this.$ = []; 
break;
case 27: case 34: case 52: case 68: case 71:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2];
break;
case 30:
 this.$ = new Declaracion($$[$0],null,$$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 31:
 this.$ = new Llamada($$[$0-3],$$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 37:
 this.$ = new While($$[$0-1],$$[$0-4],_$[$0-6].first_line,_$[$0-6].first_column); 
break;
case 38:
 this.$ = new DoWhile($$[$0-5],$$[$0-1],_$[$0-7].first_line,_$[$0-7].first_column); 
break;
case 39:
this.$ = new For($$[$0-1],$$[$0-8],$$[$0-6],$$[$0-4],_$[$0-10].first_line,_$[$0-10]); 
break;
case 40: case 41:
this.$ = $$[$0]
break;
case 42:
 this.$ = new Incremento(new Operacion(new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),Operador.INCREMENTO, _$[$0-1].first_line, _$[$0-1].first_column),_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 43:
 this.$ = new Decremento(new Operacion(new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),new Identificador($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column),Operador.DECREMENTO, _$[$0-1].first_line, _$[$0-1].first_column),_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 44:
this.$ = new ForIn($$[$0-1],$$[$0-5],$$[$0-3],_$[$0-6].first_line,_$[$0-6].first_column); 
break;
case 45:
 this.$ = new Return($$[$0],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 46:
this.$ = new Break(_$[$0].first_line, _$[$0].first_column); 
break;
case 47:
this.$ = new Continue(_$[$0].first_line, _$[$0].first_column);
break;
case 48:
this.$ = $$[$0]; 
break;
case 49:
this.$ = null; 
break;
case 50:
 this.$ = new Declaracion($$[$0-2],$$[$0],$$[$0-3],[],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 51:
 this.$ = new Declaracion(null,null,$$[$0-1],$$[$0],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 55:
 this.$ =  new Asignacion($$[$0-2],$$[$0],_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 56:
 this.$ = new If($$[$0-4],$$[$0-1],null,null,_$[$0-6].first_line, _$[$0-6].first_column);
break;
case 57:
 this.$ = new If($$[$0-8],$$[$0-5],$$[$0-1],null,_$[$0-10].first_line, _$[$0-10].first_column);
break;
case 58:
 this.$ = new If($$[$0-6],$$[$0-3],null,$$[$0],_$[$0-8].first_line, _$[$0-8].first_column);
break;
case 59:
 this.$ = new Switch($$[$0-4],$$[$0-1],null,_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 60:
 this.$ = new Switch($$[$0-5],$$[$0-2],$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 61:
 this.$ = new Switch($$[$0-4],null,$$[$0],_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 63:
this.$ = [$$[$0]]; 
break;
case 64:
 this.$ = new Case($$[$0-2],$$[$0],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 65:
 this.$ = new Case($$[$0-2],$$[$0],_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 66:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,false); 
break;
case 67:
 this.$ = new Print($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column,true); 
break;
case 70:
 this.$ = new Struct($$[$0-3],$$[$0-1],_$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 73:
 this.$ = new Atributo($$[$0],$$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 74: case 75: case 76: case 77: case 78: case 79: case 80: case 82: case 122:
 this.$ = $$[$0] 
break;
case 81:
 this.$ = new Identificador($$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 83:
this.$ = new Operacion($$[$0-2],$$[$0],Operador.CONCAT, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 84:
this.$ = new Operacion($$[$0-2],$$[$0],Operador.REPEAT, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 85:
this.$ = new CharOfPosition($$[$0-5],$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 86:
this.$ = new SubString($$[$0-7],$$[$0-3],$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column);
break;
case 87:
this.$ = new Length($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 88:
this.$ = new ToUpper($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 89:
this.$ = new ToLower($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column);
break;
case 90:
 this.$ = new Logica($$[$0],$$[$0],Operador.NOT, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 91:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.AND, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 92:
 this.$ = new Logica($$[$0-2],$$[$0],Operador.OR, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 93:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.IGUAL_IGUAL, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 94:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 95:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_IGUAL_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 96:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.DIFERENTE_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 97:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MENOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 98:
 this.$ = new Relacional($$[$0-2],$$[$0],Operador.MAYOR_QUE, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 99:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.SUMA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 100:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.RESTA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 101:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MULTIPLICACION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 102:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.DIVISION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 103:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MODULO, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 104:
 this.$ = new Operacion($$[$0],$$[$0],Operador.MENOS_UNARIO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 105:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.INCREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 106:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.DECREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 107:
 this.$ = new Operacion($$[$0-3],$$[$0-1],Operador.POW, _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 108:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.SQRT, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 109:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.LOG, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 110:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.SENO, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 111:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.COSENO, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 112:
 this.$ = new Operacion($$[$0-1],$$[$0-1],Operador.TAN, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 113:
 this.$ = new Ternario($$[$0-4],$$[$0-2],$$[$0],_$[$0-4].first_line,_$[$0-4].first_column); 
break;
case 114: case 115:
 this.$ = new Primitivo(Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 116: case 117:
 this.$ = new Primitivo($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 118:
 this.$ = new Primitivo(null, _$[$0].first_line, _$[$0].first_column); 
break;
case 119:
 this.$ = new Primitivo(true, _$[$0].first_line, _$[$0].first_column); 
break;
case 120:
 this.$ = new Primitivo(false, _$[$0].first_line, _$[$0].first_column); 
break;
case 121:
 this.$ = $$[$0-1] 
break;
case 123:
this.$ = new TipoParse(Tipo.INT,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 124:
this.$ = new TipoParse(Tipo.DOUBLE,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 125:
this.$ = new TipoParse(Tipo.BOOL,$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 126:
this.$ = new ToInt($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 127:
this.$ = new ToDouble($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 128: case 129:
this.$ = new ToString($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 130:
this.$ = new Typeof($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 131:
this.$ = Tipo.INT; 
break;
case 132:
this.$ = Tipo.DOUBLE; 
break;
case 133:
this.$ = Tipo.STRING; 
break;
case 134:
this.$ = Tipo.BOOL; 
break;
case 135:
this.$ = Tipo.CHAR; 
break;
case 136:
this.$ = Tipo.VOID; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{1:[3]},{5:[1,40],6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},o($Vi,[2,3]),{8:[1,42]},{8:[1,43]},{8:[1,44]},{8:[1,45]},o($Vi,[2,8]),o($Vi,[2,9]),{8:[1,46]},o($Vi,[2,11]),o($Vi,[2,12]),{8:[1,47]},{8:[1,48]},{8:[1,49]},{8:[1,50]},{22:[1,51],23:[1,52],30:$Vj,54:$Vk},{8:[1,55]},o($Vi,[2,20]),o($Vi,[2,21]),o($Vi,[2,22]),{30:[1,56]},{30:[1,57]},{21:[1,59],55:58,56:60},{21:[1,61]},{30:[1,62]},{32:[1,63]},{21:[1,65],30:[1,64]},{8:[2,49],20:76,21:$Vl,30:$Vm,43:67,51:66,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{8:[2,46]},{8:[2,47]},{30:[1,102]},{30:[1,103]},{21:$VL,29:[1,104]},{21:[2,131]},{21:[2,132]},{21:[2,133]},{21:[2,134]},{21:[2,135]},{1:[2,1]},o($Vi,[2,2]),o($Vi,[2,4]),o($Vi,[2,5]),o($Vi,[2,6]),o($Vi,[2,7]),o($Vi,[2,10]),o($Vi,[2,13]),o($Vi,[2,14]),o($Vi,[2,15]),o($Vi,[2,16]),{8:[1,105]},{8:[1,106]},{20:76,21:$Vl,30:$Vm,31:[2,33],40:107,41:108,42:109,43:110,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:111,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},o($Vi,[2,19]),{20:76,21:$Vl,30:$Vm,43:113,67:112,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:113,67:114,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{8:[2,51],37:[1,115]},o($VM,$VN,{30:[1,117],54:$VO}),o($VM,[2,53]),{32:[1,118]},{20:76,21:$Vl,30:$Vm,43:119,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{4:120,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{10:122,21:[1,125],24:123,28:$VP,34:124,47:121,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{49:[1,127]},{8:[2,45]},{8:[2,48],22:$VQ,23:$VR,79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},o($V71,[2,74]),o($V71,[2,75]),o($V71,[2,76]),o($V71,[2,77]),o($V71,[2,78]),o($V71,[2,79]),o($V71,[2,80]),o($V71,[2,81],{30:$Vj}),o($V71,[2,82]),o($V71,[2,114]),o($V71,[2,115]),o($V71,[2,116]),o($V71,[2,117]),o($V71,[2,118]),o($V71,[2,119]),o($V71,[2,120]),{20:76,21:$Vl,30:$Vm,43:147,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:148,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:149,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{30:[1,150]},{30:[1,151]},{30:[1,152]},{30:[1,153]},{30:[1,154]},{30:[1,155]},{20:76,21:$Vl,30:$Vm,43:156,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{81:[1,157]},{81:[1,158]},{81:[1,159]},{30:[1,160]},{30:[1,161]},{30:[1,162]},{30:[1,163]},{30:[1,164]},{20:76,21:$Vl,30:$Vm,43:165,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:166,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{30:[1,167]},o($Vi,[2,17]),o($Vi,[2,18]),{31:[1,168]},{31:[2,32],37:[1,169]},o($V81,[2,35]),o($V81,[2,36],{22:$VQ,23:$VR,79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61}),{8:[2,55],22:$VQ,23:$VR,79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{31:[1,170],37:$V91},o($V81,[2,69],{22:$VQ,23:$VR,79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61}),{31:[1,172],37:$V91},{21:[1,174],56:173},{20:76,21:$Vl,30:$Vm,43:175,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{28:$VP,31:[2,26],34:180,35:176,36:177,38:178,39:179,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{28:$VP,34:183,70:181,71:182,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{22:$VQ,23:$VR,31:[1,184],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,33:[1,185],34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{8:[1,186]},{8:[2,40]},{8:[2,41]},{21:[1,187]},{54:$Vk},{21:$VL},{20:76,21:$Vl,30:$Vm,43:188,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:189,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:190,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:191,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:192,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:193,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},o($V71,[2,105]),o($V71,[2,106]),{20:76,21:$Vl,30:$Vm,43:194,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:195,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:196,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:197,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:198,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:199,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:200,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:201,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:202,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:203,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:204,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{82:[1,205],83:[1,206],84:[1,207],85:[1,208],86:[1,209]},{22:$VQ,23:$VR,31:[1,210],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},o([8,31,32,37,64,107],[2,122],{22:$VQ,23:$VR,79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),o($V71,[2,104]),{20:76,21:$Vl,30:$Vm,43:211,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:212,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:213,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:214,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:215,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:216,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},o($Va1,[2,90],{22:$VQ,23:$VR}),{117:[1,217]},{117:[1,218]},{117:[1,219]},{20:76,21:$Vl,30:$Vm,43:220,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:221,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:222,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:223,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:224,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{22:$VQ,23:$VR,31:[1,225],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,226],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{31:[1,227]},o($V71,[2,31]),{20:76,21:$Vl,30:$Vm,42:228,43:110,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{8:[2,66]},{20:76,21:$Vl,30:$Vm,43:229,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{8:[2,67]},o($VM,[2,52]),o($VM,$VN),{8:[2,50],22:$VQ,23:$VR,79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{31:[1,230]},{31:[2,25],37:[1,231]},o($V81,[2,28]),o($V81,[2,29]),{21:[1,232]},{33:[1,233],37:[1,234]},o($Vb1,[2,72]),{21:[1,235]},{32:[1,236]},{44:[1,237]},{20:76,21:$Vl,30:$Vm,43:238,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{54:$VO},{22:$VQ,23:$VR,32:[1,239],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},o($Vc1,[2,99],{22:$VQ,23:$VR,98:$V31,99:$V41,100:$V51}),o($Vc1,[2,100],{22:$VQ,23:$VR,98:$V31,99:$V41,100:$V51}),o($Va1,[2,101],{22:$VQ,23:$VR}),o($Va1,[2,102],{22:$VQ,23:$VR}),o($Va1,[2,103],{22:$VQ,23:$VR}),o($Vd1,[2,93],{22:$VQ,23:$VR,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),o($Vd1,[2,94],{22:$VQ,23:$VR,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),o($Vd1,[2,95],{22:$VQ,23:$VR,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),o($Vd1,[2,96],{22:$VQ,23:$VR,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),o($Vd1,[2,97],{22:$VQ,23:$VR,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),o($Vd1,[2,98],{22:$VQ,23:$VR,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),o($Ve1,[2,91],{22:$VQ,23:$VR,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),o([8,31,32,37,64,80,81,89,107],[2,92],{22:$VQ,23:$VR,79:$VS,88:$VV,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),{22:$VQ,23:$VR,64:[1,240],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},o($Ve1,[2,83],{22:$VQ,23:$VR,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),o([8,31,32,37,64,80,81,107],[2,84],{22:$VQ,23:$VR,79:$VS,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51}),{30:[1,241]},{30:[1,242]},{30:[1,243]},{30:[1,244]},{30:[1,245]},o($V71,[2,121]),{22:$VQ,23:$VR,37:[1,246],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,247],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,248],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,249],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,250],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,251],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{30:[1,252]},{30:[1,253]},{30:[1,254]},{22:$VQ,23:$VR,31:[1,255],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,256],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,257],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,258],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,259],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{32:[1,260]},{32:[1,261]},{32:[1,262]},o($V81,[2,34]),o($V81,[2,68],{22:$VQ,23:$VR,79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61}),{32:[1,263]},{28:$VP,34:180,38:264,39:179,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},o($V81,[2,30]),{8:[2,70]},{28:$VP,34:183,71:265,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},o($Vb1,[2,73]),{4:266,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{30:[1,267]},{8:[1,268],22:$VQ,23:$VR,79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{4:269,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{20:76,21:$Vl,30:$Vm,43:270,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:271,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:272,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{31:[1,273]},{31:[1,274]},{31:[1,275]},{20:76,21:$Vl,30:$Vm,43:276,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},o($V71,[2,108]),o($V71,[2,109]),o($V71,[2,110]),o($V71,[2,111]),o($V71,[2,112]),{20:76,21:$Vl,30:$Vm,43:277,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:278,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{20:76,21:$Vl,30:$Vm,43:279,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},o($V71,[2,126]),o($V71,[2,127]),o($V71,[2,128]),o($V71,[2,129]),o($V71,[2,130]),{4:280,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{60:281,61:282,62:283,63:$Vf1,65:$Vg1},{4:286,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{4:287,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},o($V81,[2,27]),o($Vb1,[2,71]),{6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,33:[1,288],34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{20:76,21:$Vl,30:$Vm,43:289,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{21:[1,291],48:290},{6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,33:[1,292],34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},o([8,31,32,37,64],[2,113],{22:$VQ,23:$VR,79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61}),{22:$VQ,23:$VR,31:[1,293],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,37:[1,294],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},o($V71,[2,87]),o($V71,[2,88]),o($V71,[2,89]),{22:$VQ,23:$VR,31:[1,295],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,296],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,297],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{22:$VQ,23:$VR,31:[1,298],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,33:[1,299],34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{33:[1,300],61:301,62:302,63:$Vf1,65:$Vg1},{33:[1,303]},o($Vh1,[2,63]),{64:[1,304]},{20:76,21:$Vl,30:$Vm,43:305,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},{6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,33:[1,306],34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,33:[1,307],34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},o($Vi,[2,37]),{22:$VQ,23:$VR,31:[1,308],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{31:[1,309]},{22:[1,310],23:[1,311]},o($Vi,[2,44]),o($V71,[2,85]),{20:76,21:$Vl,30:$Vm,43:312,72:68,73:69,74:70,75:71,76:72,77:73,78:74,87:$Vn,97:$Vo,101:$Vp,102:$Vq,103:$Vr,104:$Vs,105:$Vt,106:$Vu,108:$Vv,109:$Vw,110:$Vx,111:$Vy,112:$Vz,113:$VA,114:$VB,115:$VC,116:$VD,118:$VE,119:$VF,120:$VG,121:$VH,122:$VI,123:$VJ,124:$VK},o($V71,[2,107]),o($V71,[2,123]),o($V71,[2,124]),o($V71,[2,125]),o($Vi,[2,56],{58:[1,313]}),o($Vi,[2,59]),{33:[1,314]},o($Vh1,[2,62]),o($Vi,[2,61]),{4:315,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{22:$VQ,23:$VR,64:[1,316],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},o($Vi,[2,23]),o($Vi,[2,24]),{8:[2,38]},{32:[1,317]},{31:[2,42]},{31:[2,43]},{22:$VQ,23:$VR,31:[1,318],79:$VS,80:$VT,81:$VU,88:$VV,89:$VW,90:$VX,91:$VY,92:$VZ,93:$V_,94:$V$,95:$V01,96:$V11,97:$V21,98:$V31,99:$V41,100:$V51,107:$V61},{25:320,32:[1,319],57:$V8},o($Vi,[2,60]),{6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,33:[2,65],34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{4:321,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{4:322,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},o($V71,[2,86]),{4:323,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},o($Vi,[2,58]),o($Vh1,[2,64],{7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,24:18,25:19,26:20,27:21,34:24,6:41,21:$V0,28:$V1,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh}),{6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,33:[1,324],34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},{6:41,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:$V0,24:18,25:19,26:20,27:21,28:$V1,33:[1,325],34:24,44:$V2,45:$V3,46:$V4,50:$V5,52:$V6,53:$V7,57:$V8,59:$V9,66:$Va,68:$Vb,69:$Vc,111:$Vd,116:$Ve,118:$Vf,119:$Vg,125:$Vh},o($Vi,[2,39]),o($Vi,[2,57])],
defaultActions: {30:[2,46],31:[2,47],35:[2,131],36:[2,132],37:[2,133],38:[2,134],39:[2,135],40:[2,1],66:[2,45],122:[2,40],123:[2,41],126:[2,136],170:[2,66],172:[2,67],233:[2,70],308:[2,38],310:[2,42],311:[2,43]},
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

    //reporte = new ReporteGramatical();

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
case 3:return 112;
break;
case 4:return 116;
break;
case 5:return 118;
break;
case 6:return 119;
break;
case 7:return 111;
break;
case 8:return 125;
break;
case 9:return 28;
break;
case 10:return 113;
break;
case 11:return 114;
break;
case 12:return 66;
break;
case 13:return 68;
break;
case 14:return 50;
break;
case 15:return 52;
break;
case 16:return 53;
break;
case 17:return 29;
break;
case 18:return 44;
break;
case 19:return 45;
break;
case 20:return 46;
break;
case 21:return 49;
break;
case 22:return 52;
break;
case 23:return 53;
break;
case 24:return 59;
break;
case 25:return 63;
break;
case 26:return 65;
break;
case 27:return 57;
break;
case 28:return 58;
break;
case 29:return 29;
break;
case 30:return 69;
break;
case 31:return 101;
break;
case 32:return 102;
break;
case 33:return 103;
break;
case 34:return 104;
break;
case 35:return 105;
break;
case 36:return 106;
break;
case 37:return 82;
break;
case 38:return 83;
break;
case 39:return 84;
break;
case 40:return 85;
break;
case 41:return 86;
break;
case 42:return 117;
break;
case 43:return 120;
break;
case 44:return 121;
break;
case 45:return 122;
break;
case 46:return 123;
break;
case 47:return 124;
break;
case 48:return 22;
break;
case 49:return 23;
break;
case 50:return 96;
break;
case 51:return 97;
break;
case 52:return 98;
break;
case 53:return 99;
break;
case 54:return 100;
break;
case 55:return 90;
break;
case 56:return 91;
break;
case 57:return 92;
break;
case 58:return 93;
break;
case 59:return 94;
break;
case 60:return 95;
break;
case 61:return 54;
break;
case 62:return 88;
break;
case 63:return 89;
break;
case 64:return 87;
break;
case 65:return 79;
break;
case 66:return 80;
break;
case 67:return 115;
break;
case 68:return 8;
break;
case 69:return 64;
break;
case 70:return 30;
break;
case 71:return 31;
break;
case 72:return 107;
break;
case 73:return 32;
break;
case 74:return 33;
break;
case 75:return 'corcheteA';
break;
case 76:return 'corcheteC';
break;
case 77:return 37;
break;
case 78:return 81;
break;
case 79:return 109;
break;
case 80:return 108;
break;
case 81:return 21;
break;
case 82:return 110;
break;
case 83:return 111;
break;
case 84:return;
break;
case 85:
                                        console.error('Este es un error l├®xico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                                    
break;
case 86:return 5
break;
}
},
rules: [/^(?:\/\/.*)/,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/,/^(?:\s+)/,/^(?:null\b)/,/^(?:int\b)/,/^(?:double\b)/,/^(?:boolean\b)/,/^(?:char\b)/,/^(?:String\b)/,/^(?:void\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:print\b)/,/^(?:println\b)/,/^(?:return\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:main\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:in\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:main\b)/,/^(?:struct\b)/,/^(?:pow\b)/,/^(?:sqrt\b)/,/^(?:log\b)/,/^(?:sin\b)/,/^(?:cos\b)/,/^(?:tan\b)/,/^(?:caracterOfPosition\b)/,/^(?:subString\b)/,/^(?:length\b)/,/^(?:toUpperCase\b)/,/^(?:toLowerCase\b)/,/^(?:parse\b)/,/^(?:toInt\b)/,/^(?:toDouble\b)/,/^(?:toString\b)/,/^(?:string\b)/,/^(?:typeof\b)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:==)/,/^(?:<=)/,/^(?:>=)/,/^(?:!=)/,/^(?:<)/,/^(?:>)/,/^(?:=)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:&)/,/^(?:\^)/,/^(?:\$)/,/^(?:;)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\?)/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:\.)/,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/,/^(?:[0-9]+)/,/^(?:[a-zA-Z_][a-zA-Z0-9_├▒├æ]*)/,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/,/^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/,/^(?:{Comment})/,/^(?:.)/,/^(?:$)/],
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
},{"../AST/Operador.js":7,"../AST/Tipo.js":9,"../Expresiones/Decremento.js":10,"../Expresiones/Identificador.js":11,"../Expresiones/Incremento.js":12,"../Expresiones/Logica.js":13,"../Expresiones/Nativas/TipoParse.js":19,"../Expresiones/Nativas/ToDouble.js":20,"../Expresiones/Nativas/ToInt.js":21,"../Expresiones/Nativas/ToString.js":22,"../Expresiones/Nativas/Typeof.js":23,"../Expresiones/NativasString/CharOfPosition.js":14,"../Expresiones/NativasString/Length.js":15,"../Expresiones/NativasString/SubString.js":16,"../Expresiones/NativasString/ToLower.js":17,"../Expresiones/NativasString/ToUpper.js":18,"../Expresiones/Operacion.js":24,"../Expresiones/Primitivo.js":25,"../Expresiones/Relacional.js":26,"../Expresiones/Ternario.js":27,"../Instrucciones/Asignacion.js":29,"../Instrucciones/Atributo.js":30,"../Instrucciones/Break.js":31,"../Instrucciones/Case.js":32,"../Instrucciones/Continue.js":33,"../Instrucciones/Declaracion.js":34,"../Instrucciones/DoWhile.js":35,"../Instrucciones/For.js":36,"../Instrucciones/ForIn.js":37,"../Instrucciones/Funcion.js":38,"../Instrucciones/If.js":39,"../Instrucciones/Llamada.js":40,"../Instrucciones/Main.js":41,"../Instrucciones/Print.js":42,"../Instrucciones/Return.js":43,"../Instrucciones/Struct.js":44,"../Instrucciones/Switch.js":45,"../Instrucciones/While.js":46,"../Reportes/ReporteGramatical.js":48,"_process":3,"fs":1,"path":2}],29:[function(require,module,exports){
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

},{"../AST/Excepcion":6,"../AST/Tipo.js":9}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{"../AST/Entorno":5,"../AST/Excepcion":6,"./Break":31,"./Continue":33,"./Return":43}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
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
                    ent.agregar(this.identificador, simbolo);
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

},{"../AST/Excepcion":6,"../AST/Simbolo":8,"../AST/Tipo":9,"./Llamada":40}],35:[function(require,module,exports){
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

},{"../AST/Entorno":5,"../AST/Excepcion":6,"../AST/Tipo":9,"./Break":31,"./Continue":33,"./Return":43}],36:[function(require,module,exports){
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

},{"../AST/Entorno":5,"../AST/Excepcion":6,"./Break":31,"./Continue":33,"./Declaracion":34,"./Return":43}],37:[function(require,module,exports){
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

},{"../AST/Entorno":5,"../AST/Excepcion":6,"../AST/Simbolo":8,"../AST/Tipo":9,"./Break":31,"./Continue":33,"./Return":43}],38:[function(require,module,exports){
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

},{"../AST/Excepcion":6,"../AST/Tipo":9,"./Return":43}],39:[function(require,module,exports){
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

},{"../AST/Entorno":5,"../AST/Excepcion":6,"../AST/Tipo":9,"./Break":31,"./Continue":33,"./Return":43}],40:[function(require,module,exports){
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

},{"../AST/Entorno":5,"../AST/Excepcion":6,"../AST/Simbolo":8,"../AST/Tipo":9}],41:[function(require,module,exports){
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

},{"../AST/Entorno":5,"../AST/Excepcion":6,"../AST/Tipo":9,"./Return":43}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
// print("hola mundo");
class Print {
    constructor(expresiones, linea, columna, salto) {
        this.expresiones = expresiones;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }
    traducir(controlador) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        for (let i in this.expresiones) {
            let valor = this.expresiones[i].getValorImplicito(ent, arbol);
            arbol.updateConsola(valor);
        }
        if (this.salto) {
            arbol.updateConsola('\n');
        }
    }
    addSalto(valor) {
        return this.salto ? valor + "\n" : valor;
    }
}
exports.Print = Print;

},{}],43:[function(require,module,exports){
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

},{"../AST/Excepcion":6,"../AST/Tipo":9}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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

},{"../AST/Excepcion":6,"./Break":31,"./Return":43}],46:[function(require,module,exports){
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

},{"../AST/Entorno":5,"../AST/Excepcion":6,"../AST/Tipo":9,"./Break":31,"./Continue":33,"./Return":43}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
const AST = require("./AST/AST.js");
const Entorno = require("./AST/Entorno.js");
const Instruccion = require("./Interfaces/Instruccion.js");
const Excepcion = require("./AST/Excepcion.js");
const Funcion = require("./Instrucciones/Funcion.js");
const Struct = require("./Instrucciones/Struct.js");
const Declaracion = require("./Instrucciones/Declaracion.js");
const Main = require("./Instrucciones/Main.js");
const Return = require("./Instrucciones/Return.js");

const grammar = require("./Gramatica/grammar.js")


if (typeof window !== 'undefined') {
    window.parseExternal = function (input) {
        const instrucciones = grammar.parse(input);
        const ast = new AST.AST(instrucciones);
        const entornoGlobal = new Entorno.Entorno(null);
        ast.tablas.push(entornoGlobal); //GUARDO EL ENTORNO/TABLA PARA EL CODIGO EN 3D
        ast.instrucciones.forEach(function (element) {
            let value;
            if (element instanceof Funcion.Funcion) {
                let value = ast.addFuncion(element);
                if (value instanceof Excepcion.Excepcion) ast.updateConsola(value);

            } else if (element instanceof Struct.Struct) {
                console.log(element);
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
            if (!(element instanceof Main.Main || element instanceof Declaracion.Declaracion || element instanceof Funcion.Funcion || element instanceof Struct.Struct)) {
                let excepcion = new Excepcion.Excepcion(element.linea, element.columna, "\nSemantico", "Sentencias fuera de Main")
                ast.addExcepcion(excepcion);
                ast.updateConsola(excepcion)
            }

        });
        return ast.getConsola();
    }
}


},{"./AST/AST.js":4,"./AST/Entorno.js":5,"./AST/Excepcion.js":6,"./Gramatica/grammar.js":28,"./Instrucciones/Declaracion.js":34,"./Instrucciones/Funcion.js":38,"./Instrucciones/Main.js":41,"./Instrucciones/Return.js":43,"./Instrucciones/Struct.js":44,"./Interfaces/Instruccion.js":47}]},{},[50]);
