let grammar = require("./Gramatica/grammar.js")

if (typeof window !== 'undefined'){
    window.parseExternal = function(input){ 
        return grammar.parse(input);
    }
}