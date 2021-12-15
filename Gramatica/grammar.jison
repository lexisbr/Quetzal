/* description: Quetzal is a programming language inspired by C & Java */

/* lexical grammar */
%lex

%options case-insensitive

escapechar                      [\'\"\\bfnrtv]
escape                          \\{escapechar}
acceptedcharsdouble             [^\"\\]+
stringdouble                    {escape}|{acceptedcharsdouble}
stringliteral                   \"{stringdouble}*\"

acceptedcharssingle             [^\'\\]
stringsingle                    {escape}|{acceptedcharssingle}
charliteral                     \'{stringsingle}\'

BSL                             "\\".
%s                              comment

%%

/* comentarios */
"//".*                                /* IGNORE */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* IGNORE */
\s+                                 /* IGNORE */


/* reserved words */

"null"						        return 'null';
"int" 						        return 'int';
"double"					        return 'double';
"boolean"					        return 'boolean';
"char"					            return 'char';
"String"				            return 'String';
"void"				                return 'void';
"true"                              return 'true';
"false"                             return 'false';
"print"                             return 'print';
"println"                           return 'println';
"return"                            return 'return';
"if"                                return 'if';
"else"                              return 'else';
/*Nativas Aritmeticas*/
"pow"                               return 'pow';
"sqrt"                              return 'sqrt';
"log"                               return 'log';
"sin"                               return 'sin';
"cos"                               return 'cos';
"tan"                               return 'tan';
/*Nativas de Cadenas*/
"caracterOfPosition"                return 'charOfPos';

/*Aritmeticas*/
"+"                                 return 'plus';
"-"                                 return 'minus';
"*"                                 return 'times';
"/"                                 return 'div';
"%"                                 return 'mod';


/*Relacionales*/
"=="                                return 'equal';
"<="                                return 'lte';
">="                                return 'gte';
"!="                                return 'nequal';
"<"                                 return 'lt';
">"                                 return 'gt';
"="                                 return 'asig';

"&&"                                return 'and';
"||"                                return 'or';
"!"                                 return 'not';

"&"                                 return 'concat';
"^"                                 return 'repeat';

";"                                 return 'semicolon';
":"                                 return 'colon';
"("                                 return 'lparen';
")"                                 return 'rparen';
"?"                                 return 'question';
"{"                                 return 'allave';
"}"                                 return 'cllave';
","                                 return 'coma';
"."                                 return 'dot';




/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'double';
[0-9]+                              return 'integer';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';

{stringliteral}                     return 'string';
{charliteral}                       return 'char';

{Comment}                           return;

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                             return 'EOF'



/lex

//SECCION DE IMPORTS
%{
    const {Print} = require("../Instrucciones/Print.js");
    const {Primitivo} = require("../Expresiones/Primitivo.js");
    const {Operacion} = require("../Expresiones/Operacion.js");
    const {Operador} = require("../AST/Operador.js");

    const {Relacional} = require("../Expresiones/Relacional.js");
    const {Logica} = require("../Expresiones/Logica.js");
    const {Identificador} = require("../Expresiones/Identificador.js");
    const {Ternario} = require("../Expresiones/Ternario.js");
    const {CharOfPosition} = require("../Expresiones/NativasString/CharOfPosition.js");
    const {If} = require("../Instrucciones/If.js");

    const {Tipo} = require("../AST/Tipo.js");
    const {Declaracion} = require("../Instrucciones/Declaracion.js");
    const {Asignacion} = require("../Instrucciones/Asignacion.js");
    const {Funcion} = require("../Instrucciones/Funcion.js");
    const {Llamada} = require("../Instrucciones/Llamada.js");
    const {Return} = require("../Instrucciones/Return.js");
%}

/* operator associations and precedence */
%right 'question'
%right 'dot'
%left 'repeat'
%left 'or'
%left 'concat' 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'pow', 'sqrt'
%left 'not'
%left UMINUS
%left 'lparen' 'rparen'


/* The start of the grammar */
%start START

%%


/* Definición de la gramática */
START : RAICES EOF         { $$ = $1; return $$; }
;

RAICES:
    RAICES RAIZ           { $1.push($2); $$ = $1;}
	| RAIZ                { $$ = [$1]; } 
;

RAIZ:
    PRINT semicolon                         { $$ = $1; }
    | DECLARACION_NULA semicolon            { $$ = $1; }
    | DECLARACION semicolon                 { $$ = $1; }
    | FUNCION                               { $$ = $1; }
    | RETURN semicolon                      { $$ = $1; }
    | LLAMADA semicolon                     { $$ = $1; }
    | ASIGNACION semicolon                  { $$ = $1; }
    | CONDICIONAL_IF                        { $$ = $1; }
;

FUNCION:
    TIPO identifier lparen LIST_PARAMETROS rparen allave RAICES cllave  { $$ = new Funcion($2,$4,$7,$1,@1.first_line, @1.first_column); }
;

LIST_PARAMETROS:
    PARAMETROS { $$ = $1; }
    | { $$ = []; }
;

PARAMETROS:
    PARAMETROS coma PARAMETRO  { $1.push($3); $$ = $1;}
    | PARAMETRO { $$ = [$1]; }
;

PARAMETRO:
    DECLARACION_NULA  { $$ = $1; }
;

LLAMADA:
    identifier lparen LIST_ARGUMENTOS rparen { $$ = new Llamada($1,$3,@1.first_line, @1.first_column);}
;

LIST_ARGUMENTOS:
    ARGUMENTOS { $$ = $1; }
    | { $$ = []; }
;

ARGUMENTOS:
    ARGUMENTOS coma ARGUMENTO  { $1.push($3); $$ = $1;}
    | ARGUMENTO { $$ = [$1]; }
;

ARGUMENTO:
    EXPR  { $$ = $1; }
;

RETURN:
    return EXPR { $$ = new Return($2,@1.first_line, @1.first_column); }
;

DECLARACION:
    TIPO identifier asig EXPR        { $$ = new Declaracion($2,$4,$1,@1.first_line, @1.first_column); }
;

DECLARACION_NULA:
    TIPO identifier                  { $$ = new Declaracion($2,null,$1,@1.first_line, @1.first_column); }
;

ASIGNACION:
    identifier asig EXPR              { $$ =  new Asignacion($1,$3,@1.first_line, @1.first_column); }
;

CONDICIONAL_IF:
    if lparen EXPR rparen allave RAICES cllave                              { $$ = new If($3,$6,[],@1.first_line, @1.first_column);}
    | if lparen EXPR rparen allave RAICES cllave else allave RAICES cllave  { $$ = new If($3,$6,$10 ,@1.first_line, @1.first_column);}
    | if lparen EXPR rparen allave RAICES cllave else CONDICIONAL_IF        { $$ = new If($3,$6,[$9],@1.first_line, @1.first_column);}
;

PRINT:
    print lparen EXPR rparen                { $$ = new Print($3, @1.first_line, @1.first_column,false); } 
    | println lparen EXPR rparen            { $$ = new Print($3, @1.first_line, @1.first_column,true); }
;


EXPR:
    PRIMITIVA                           { $$ = $1 }
    | OP_ARITMETICAS                    { $$ = $1 }
    | OP_RELACIONALES                   { $$ = $1 }
    | OP_LOGICAS                        { $$ = $1 }
    | OP_TERNARIA                       { $$ = $1 }
    | NATIVAS_STRING                    { $$ = $1 }
    | identifier                        { $$ = new Identificador($1,@1.first_line, @1.first_column);}
    | LLAMADA                           { $$ = $1 }
;

NATIVAS_STRING:
    EXPR concat EXPR                    { $$ = new Operacion($1,$3,Operador.CONCAT, @1.first_line, @1.first_column); }
    | EXPR repeat EXPR                  { $$ = new Operacion($1,$3,Operador.REPEAT, @1.first_line, @1.first_column); }
    | EXPR dot charOfPos lparen EXPR rparen {$$ = new CharOfPosition($1,$5,@1.first_line, @1.first_column);}   
;

OP_LOGICAS:
    not EXPR                            { $$ = new Logica($2,$2,Operador.NOT, @1.first_line, @1.first_column); }
    | EXPR and EXPR                     { $$ = new Logica($1,$3,Operador.AND, @1.first_line, @1.first_column); }
    | EXPR or EXPR                      { $$ = new Logica($1,$3,Operador.OR, @1.first_line, @1.first_column); }
;

OP_RELACIONALES:
    EXPR equal EXPR                     { $$ = new Relacional($1,$3,Operador.IGUAL_IGUAL, @1.first_line, @1.first_column); }
    | EXPR lte EXPR                     { $$ = new Relacional($1,$3,Operador.MENOR_IGUAL_QUE, @1.first_line, @1.first_column); }
    | EXPR gte EXPR                     { $$ = new Relacional($1,$3,Operador.MAYOR_IGUAL_QUE, @1.first_line, @1.first_column); }
    | EXPR nequal EXPR                  { $$ = new Relacional($1,$3,Operador.DIFERENTE_QUE, @1.first_line, @1.first_column); }
    | EXPR lt EXPR                      { $$ = new Relacional($1,$3,Operador.MENOR_QUE, @1.first_line, @1.first_column); }
    | EXPR gt EXPR                      { $$ = new Relacional($1,$3,Operador.MAYOR_QUE, @1.first_line, @1.first_column); }
;

OP_ARITMETICAS:
    EXPR plus EXPR                      { $$ = new Operacion($1,$3,Operador.SUMA, @1.first_line, @1.first_column); }
    | EXPR minus EXPR                   { $$ = new Operacion($1,$3,Operador.RESTA, @1.first_line, @1.first_column); }
    | EXPR times EXPR                   { $$ = new Operacion($1,$3,Operador.MULTIPLICACION, @1.first_line, @1.first_column); }
    | EXPR div EXPR                     { $$ = new Operacion($1,$3,Operador.DIVISION, @1.first_line, @1.first_column); }
    | EXPR mod EXPR                     { $$ = new Operacion($1,$3,Operador.MODULO, @1.first_line, @1.first_column); }
    | minus EXPR %prec UMINUS           { $$ = new Operacion($2,$2,Operador.MENOS_UNARIO, @1.first_line, @1.first_column); }
    | pow lparen EXPR coma EXPR rparen  { $$ = new Operacion($3,$5,Operador.POW, @1.first_line, @1.first_column); }
    | sqrt lparen EXPR rparen           { $$ = new Operacion($3,$3,Operador.SQRT, @1.first_line, @1.first_column); }
    | log lparen EXPR rparen            { $$ = new Operacion($3,$3,Operador.LOG, @1.first_line, @1.first_column); }
    | sin lparen EXPR rparen            { $$ = new Operacion($3,$3,Operador.SENO, @1.first_line, @1.first_column); }
    | cos lparen EXPR rparen            { $$ = new Operacion($3,$3,Operador.COSENO, @1.first_line, @1.first_column); }
    | tan lparen EXPR rparen            { $$ = new Operacion($3,$3,Operador.TAN, @1.first_line, @1.first_column); }
;

OP_TERNARIA:
    EXPR question EXPR colon EXPR       { $$ = new Ternario($1,$3,$5,@1.first_line,@1.first_column); } 
;

PRIMITIVA:
    integer                      { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
    | double                     { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
    | string                     { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | char                       { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | null                       { $$ = new Primitivo(null, @1.first_line, @1.first_column); }
    | true                       { $$ = new Primitivo(true, @1.first_line, @1.first_column); }
    | false                      { $$ = new Primitivo(false, @1.first_line, @1.first_column); } 
    | lparen EXPR rparen         { $$ = $2 }
;

TIPO:
    int                          {$$ = Tipo.INT; }
    | double                     {$$ = Tipo.DOUBLE; }
    | String                     {$$ = Tipo.STRING; }
    | boolean                    {$$ = Tipo.BOOL; }
    | char                       {$$ = Tipo.CHAR; }
    | void                       {$$ = Tipo.VOID; }
;
