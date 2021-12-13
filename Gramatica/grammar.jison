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
"true"                              return 'true';
"false"                             return 'false';
"print"                             return 'print';
"println"                           return 'println';

"+"                                 return 'plus';
"-"                                 return 'minus';
"*"                                 return 'times';
"/"                                 return 'div';
"%"                                 return 'mod';

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

";"                                 return 'semicolon';
"("                                 return 'lparen';
")"                                 return 'rparen';
"{"                                 return 'allave';
"}"                                 return 'cllave';
","                                 return 'coma';

"&&"                                return 'and';
"||"                                return 'or';
"!"                                 return 'not';


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

    const {Tipo} = require("../AST/Tipo.js");
    const {Declaracion} = require("../Instrucciones/Declaracion.js");
    const {Asignacion} = require("../Instrucciones/Asignacion.js");
    const {Funcion} = require("../Instrucciones/Funcion.js");
    const {Identificador} = require("../Expresiones/Identificador.js");
%}

/* operator associations and precedence */
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'pow'
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
    | ASIGNACION semicolon                  { $$ = $1; }
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
    | PARAMETRO { $$ = $1; }
;

PARAMETRO:
    DECLARACION_NULA  { $$ = $1; }
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

PRINT:
    print lparen EXPR rparen                { $$ = new Print($3, @1.first_line, @1.first_column,false); } 
    | println lparen EXPR rparen            { $$ = new Print($3, @1.first_line, @1.first_column,true); }
;


EXPR:
    PRIMITIVA                           { $$ = $1 }
    | OP_ARITMETICAS                    { $$ = $1 }
    | OP_RELACIONALES                   { $$ = $1 }
    | OP_LOGICAS                        { $$ = $1 }
    | identifier                        { $$ = new Identificador($1,@1.first_line, @1.first_column);}
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
    | lparen EXPR rparen                { $$ = $2 }
;

PRIMITIVA:
    integer                      { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
    | double                     { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
    | string                     { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | char                       { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | null                       { $$ = new Primitivo(null, @1.first_line, @1.first_column); }
    | true                       { $$ = new Primitivo(true, @1.first_line, @1.first_column); }
    | false                      { $$ = new Primitivo(false, @1.first_line, @1.first_column); } ; 

TIPO:
    int                        {$$ = Tipo.INT }
    | double                     {$$ = Tipo.DOUBLE }
    | String                     {$$ = Tipo.STRING }
    | boolean                    {$$ = Tipo.BOOL }
    | char                       {$$ = Tipo.CHAR }
;