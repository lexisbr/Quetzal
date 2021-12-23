# MANUAL DE USUARIO  
##### UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
##### FACULTAD DE INGENIERIA 
##### LABORATORIO DE ORGANIZACION DE LENGUAJES Y COMPILADORES 2 SECCION "A"
##### ING. LUIS ESPINO 
##### AUX. HECTOR HAROLDO ARIAS 
##### ERIKSSON JOSE HERNANDEZ LOPEZ - 2927 19159 1415 - 201830459
##### JOSE ALEJANDRO BARRIOS RODAS - 3149 67567 0901 - 201831234
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
---
## REPORTE GRAMATICAL
### OPCIONES
%options case-sensitive

### PRECEDENCIA

%right 'question'
%left 'dollar'
%right 'dot' 'coma'
%left 'repeat'
%left 'or'
%left 'concat' 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'pow', 'sqrt'
%left 'not'
%right 'incremento''decremento'//duda 
%left UMINUS
%left 'lparen' 'rparen'


### INICIO DE LA GRAMATICA
%start START    




### GRAMATICA
START : RAICES EOF    
;

RAICES:
    RAICES RAIZ           
	| RAIZ                
;

RAIZ:
    PRINT semicolon                        
    | DECLARACION_NULA semicolon           
    | DECLARACION semicolon               
    | STRUCT semicolon                     
    | WHILE                                  
    | DO_WHILE semicolon                    
    | FOR                                    
    | FOR_IN                              
    | RETURN semicolon                    
    | BREAK semicolon                       
    | CONTINUE semicolon                   
    | LLAMADA semicolon                     
    | identifier incremento semicolon        
    | identifier decremento semicolon        
    | ASIGNACION semicolon                  
    | IF                                    
    | SWITCH                               
    | MAIN                                 
    | INVALID                                                         

MAIN:
    void main lparen rparen allave RAICES cllave 

FUNCION:
    TIPO identifier lparen LIST_PARAMETROS rparen allave RAICES cllave  
    
LIST_PARAMETROS:
    PARAMETROS 
    | 
PARAMETROS:
    PARAMETROS coma PARAMETRO  
    | 
PARAMETRO:
    DECLARACION_PARAMETROS 

DECLARACION_PARAMETROS:
    TIPO identifier                  

LLAMADA:
    identifier lparen LIST_ARGUMENTOS rparen 

LIST_ARGUMENTOS:
    ARGUMENTOS 
    | 

ARGUMENTOS:
    ARGUMENTOS coma ARGUMENTO   
    | ARGUMENTO    

ARGUMENTO:
    EXPR  

WHILE:
    while lparen EXPR rparen allave RAICES cllave 
;
DO_WHILE:
    do allave RAICES cllave while lparen EXPR rparen  
;

FOR:
    for lparen FOR_VARIABLE semicolon EXPR semicolon FOR_INSTRUCCION rparen allave RAICES cllave
;

FOR_VARIABLE:
    DECLARACION 
    | ASIGNACION 
;

FOR_INSTRUCCION:
    identifier incremento        
    | identifier decremento          
;

FOR_IN:
;

RETURN:
;

BREAK:
;

CONTINUE:
;

RETURN_OP:
    | 
;

DECLARACION:
    TIPO identifier asig EXPR   
;

DECLARACION_NULA:
    TIPO LIST_IDENTIFIERS 
;

LIST_IDENTIFIERS:
    LIST_IDENTIFIERS coma IDENTIFIER 
    | IDENTIFIER 
;

IDENTIFIER:
    identifier  
;

ASIGNACION:
    identifier asig EXPR              
;

IF:
    if lparen EXPR rparen allave RAICES cllave                              
    | if lparen EXPR rparen allave RAICES cllave else allave RAICES cllave  
    | if lparen EXPR rparen allave RAICES cllave else IF                    
;

SWITCH:
    switch lparen EXPR rparen allave CASES cllave 
    | switch lparen EXPR rparen allave CASES DEFAULT cllave 
    | switch lparen EXPR rparen allave DEFAULT cllave  
;

CASES:
    CASES CASE 
    | CASE 
;
CASE: 
    case EXPR colon RAICES 
;
DEFAULT:
    default colon RAICES 
;
PRINT:
    print lparen PRINT_EXPR rparen                
    | println lparen PRINT_EXPR rparen            
;
PRINT_EXPR:
    PRINT_EXPR coma EXPR     
    | EXPR                 
;
STRUCT:
    struct identifier allave STRUCT_ATRIBUTOS cllave 
;
STRUCT_ATRIBUTOS:
    STRUCT_ATRIBUTOS coma STRUCT_ATRIBUTO   
    |  STRUCT_ATRIBUTO                      
;
STRUCT_ATRIBUTO:
    TIPO identifier 
;
EXPR:
    PRIMITIVA                           
    | OP_ARITMETICAS                    
    | OP_RELACIONALES                   
    | OP_LOGICAS                        
    | OP_TERNARIA                       
    | NATIVAS_STRING                    
    | NATIVA                            
    | identifier                        
    | LLAMADA                           
;
NATIVAS_STRING:
    EXPR concat EXPR                                  
    | EXPR repeat EXPR                                
    | EXPR dot charOfPos lparen EXPR rparen           
    | EXPR dot subString lparen EXPR coma EXPR rparen 
    | EXPR dot length lparen rparen                   
    | EXPR dot toUpper lparen rparen                  
    | EXPR dot toLower lparen rparen                     
;
OP_LOGICAS:
    not EXPR                            
    | EXPR and EXPR                     
    | EXPR or EXPR                      ;

OP_RELACIONALES:
    EXPR equal EXPR                      
    | EXPR lte EXPR                     
    | EXPR gte EXPR                     
    | EXPR nequal EXPR                  
    | EXPR gt EXPR                      
    | EXPR lt EXPR                      
;
OP_ARITMETICAS:
    EXPR plus EXPR                      
    | EXPR minus EXPR                   
    | EXPR times EXPR                   
    | EXPR div EXPR                      
    | EXPR mod EXPR                     
    | minus EXPR %prec UMINUS          
    | EXPR incremento                   
    | EXPR decremento                   
    | pow lparen EXPR coma EXPR rparen  
    | sqrt lparen EXPR rparen           
    | log lparen EXPR rparen            
    | sin lparen EXPR rparen            
    | cos lparen EXPR rparen            
    | tan lparen EXPR rparen            
;
OP_TERNARIA:
    EXPR question EXPR colon EXPR      
;
PRIMITIVA:
    integer                   
    | decimal                  
    | string                     
    | char                       
    | null                      
    | true                       
    | false                      
    | lparen EXPR rparen         
    | dollar EXPR                
;
NATIVA:
    int dot parse lparen EXPR rparen    
    | double dot parse lparen EXPR rparen 
    | boolean dot parse lparen EXPR rparen 
    | toInt lparen EXPR rparen          
    | toDouble lparen EXPR rparen       
    | toSTRING lparen EXPR rparen       
    | stringNative lparen EXPR rparen   
    | typeof lparen EXPR rparen         
;
TIPO:
    int                          
    | double                     
    | String                     
    | boolean                    
    | char                       
    | void                       

INVALID: 
    error_lexico 
    | error 
