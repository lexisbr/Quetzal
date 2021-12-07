/* description: Quetzal is a programming language inspired by C & Java */

/* lexical grammar */
%lex
%options case-insensitive
%%

/* regular expresions */
LineTerminator					\r|\n|\r\n
WhiteSpace						{LineTerminator}|[ \t\f]

/* comentarios */
LineComment						\/\/[^\r\n]*
MultipleLineComment				([^*]|\*+[^/*])*


/* comillas dobles y simples */
d_quote							["]
s_quote							[']

/* Integer */
Integer							[1-9][0-9]+|[0-9]

/* Decimales */
Decimal							{Integer}\.[0-9]+

/* id */
Id								[a-zA-Z][a-zA-Z_0-9]*   

/* Cadena */
String                          ["][^"]*["] 

/* Cadena */
Char                            ['][^'][']

/* reserved words */
NULL							"null"
INT 							"int"
DOUBLE							"double"
BOOLEAN							"boolean"
CHAR							"char"
STRING							"String"
STRUCT                          "struct"
POW                             "pow"
SQRT                            "sqrt"
SIN                             "sin"      
COS                             "cos"
TAN                             "tan"
CARACTEROF                      "caracterOfPosition"
SUBSTRING                       "subString"
LENGTH                          "length"
TOUPPERCASE                     "toUpperCase"
TOLOWERCASE                     "toLowerCase"
PRINT                           "print"
PRINTLN                         "println"
PARSE                           "parse"
TOINT                           "toInt"
TODOUBLE                        "toDouble"
STRINGPARSE                     "string"
TYPEOF                          "typeof"
IF								"if"
ELSE							"else"
SWITCH							"switch"
CASE 							"case"
DEFAULT							"default"
BREAK							"break"
WHILE							"while"
DO								"do"
FOR								"for"
IN								"in"
BEGIN	                        "begin"
END	                            "end"
PUSH	                        "push"
POP	                            "pop"
LENGTH
CONTINUE						"continue"
RETURN							"return"
VOID							"void"
FALSE							"false"
TRUE							"true"

/* operators */
plus							"+"
minus							"-"
times							"*"
divide							"/"
mod								"%"
eqeq							"=="
neq								"!="
greater							">"
smaller							"<"
greater_eq						">="
smaller_eq						"<="
plusplus						"++"
minusminues						"--"

and								"&&"
or								"||"
not								"!"
concat							"&"
repeat							"^"

equal							"="
lparen							"("
rparen							")"
lbrace							"{"
rbrace							"}"
colon							":"
semi							";"
comma							","
dot								"."
mark						    "?"
numeral						    "#"



<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | e '!'
        {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
    | e '%'
        {$$ = $1/100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;