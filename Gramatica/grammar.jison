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

"//".*                              /* skip comments */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */


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

"+"                                 return 'plus';
"-"                                 return 'minus';
"*"                                 return 'times';
"/"                                 return 'div';
"%"                                 return 'mod';

"<="                                return 'lte';
">="                                return 'gte';
"<"                                 return 'lt';
">"                                 return 'gt';
"="                                 return 'asig';
"=="                                return 'equal';
"!="                                return 'nequal';

"&&"                                return 'and';
"||"                                return 'or';
"!"                                 return 'not';

";"                                 return 'semicolon';
"("                                 return 'lparen';
")"                                 return 'rparen';

"&&"                                return 'and';
"||"                                return 'or';
"!"                                 return 'not';


/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'double';
[0-9]+                              return 'integer';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';

{stringliteral}                     return 'string'
{charliteral}                       return 'char'

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
    const {Operacion, Operador} = require("../Expresiones/Operacion.js");
    const {Objeto} = require("../Expresiones/Objeto.js");
    const {Atributo} = require("../Expresiones/Atributo.js");
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
    PRINT semicolon       { $$ = $1 }
    | DECLARACION              { $$ = $1 }
;

DECLARACION:
      lt identifier LATRIBUTOS gt OBJETOS           lt div identifier gt       { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); }
    | lt identifier LATRIBUTOS gt LISTA_ID_OBJETO   lt div identifier gt       { $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]); }
    | lt identifier LATRIBUTOS div gt                                          { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]); }
;

LATRIBUTOS: ATRIBUTOS                               { $$ = $1; }
           |                                        { $$ = []; }
;

ATRIBUTOS:
    ATRIBUTOS ATRIBUTO                              { $1.push($2); $$ = $1;}
    | ATRIBUTO                                      { $$ = [$1]; } 
;

ATRIBUTO: 
    identifier asig string                   { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); }
;

LISTA_ID_OBJETO: LISTA_ID_OBJETO identifier          { $1=$1 + ' ' +$2 ; $$ = $1;}
        | identifier                                 { $$ = $1 }
;

OBJETOS:
      OBJETOS OBJETO        { $1.push($2); $$ = $1;}
	| OBJETO                { $$ = [$1]; } ;

PRINT:
    print lparen EXPR rparen            { $$ = new Print($3, @1.first_line, @1.first_column); } ;

EXPR:
    PRIMITIVA                           { $$ = $1 }
    | OP_ARITMETICAS                    { $$ = $1 };


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
    | null                              { $$ = new Primitivo(null, @1.first_line, @1.first_column); }
    | true                              { $$ = new Primitivo(true, @1.first_line, @1.first_column); }
    | false                             { $$ = new Primitivo(false, @1.first_line, @1.first_column); } ; 

