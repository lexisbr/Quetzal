/* description: Quetzal is a programming language inspired by C & Java */

/* lexical grammar */
%lex
%%

/* regular expresions */
LineTerminator					\r|\n|\r\n
WhiteSpace						{LineTerminator}|[ \t\f]

/* comentarios */
LineComment						\/\/[^\r\n]*
CommentContent					([^*]|\*+[^/*])*
DocumentationComment			\/\*{CommentContent}\*+\/
Comment							{LineComment}|{DocumentationComment}

/* comillas dobles y simples */
d_quote							["]
s_quote							[']

/* Integer */
Integer							[1-9][0-9]+|[0-9]

/* Decimales */
Decimal							{Integer}\.[0-9]+

/* id */
Id								[a-zA-Z][a-zA-Z_0-9]*    /*[a-zA-Z_]\w*  */

/* reserved words */
boolean							"boolean"
break							"break"
case 							"case"
char							"char"
class							"class"
continue						"continue"
default							"default"
do								"do"
double							"double"
else							"else"
extends							"extends"
float							"float"
for								"for"
if								"if"
int								"int"
print							"print"
println							"println"
private							"private"
protected						"protected"
public							"public"
return							"return"
super							"super"
string							"String"
switch							"switch"
this							"this"
void							"void"
false							"false"
true							"true"
while							"while"

/* operators */
plus							"+"
minus							"-"
times							"*"
divide							"/"
pow								"^"
mod								"%"
equal							"="
lparen							"("
rparen							")"
lbrace							"{"
rbrace							"}"
colon							":"
semi							";"
comma							","
dot								"."

eqeq							"=="
neq								"!="
greater							">"
greater_eq						">="
smaller							"<"
smaller_eq						"<="

and								"&&"
or								"||"
not								"!"
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