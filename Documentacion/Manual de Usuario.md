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
### "QUETZAL EDITOR"
## Introducción
El  proyecto  presentado,  muestra  un  intérprete y traductor de codigo en tres direcciones  el cual  ejecuta  instrucciones  de  alto  nivel definidas en el nuevo lenguaje exclusivo para la USAC, el cual se llama "Quetzal Editor" el cual tiene una sintaxis parecida al lenguaje de programación Java.

## OBJETIVOS 
#### OBJETIVO GENERAL 
-  Aplicar los conocimientos sobre la fase de análisis  léxico, sintáctico  y  semántico de un compilador  para  la  realización  de  un  intérprete  completo y traductor de código en tres direcciones,  con  las  herramientas primordiales para que sea funcional.  

#### OBJETIVOS ESPECIFICOS 
- Reforzar los conocimientos de análisis léxico, sintáctico y semántico para la creación de un lenguaje de programación. 
- Aplicar  los  conceptos  de  compiladores  para  implementar  el proceso de interpretación de código de alto nivel.
- Aplicar  los  conceptos  de  compiladores  para  analizar  un  lenguaje  de programación y producir las salidas esperadas.
- Aplicar la teoría de compiladores para la creación de soluciones de software. 

#### 1. ENTORNO DE TRABAJO
         1.1 EDITOR 
-   El editor será parte del entorno de trabajo, cuya finalidad será     proporcionar ciertas funcionalidades, características y herramientas que    serán de utilidad al usuario. La  función  principal  del  editor  será     el ingreso  del  código por medio de la opcion "Abrir Archivo" fuente  que  será analizado. En este se podrán abrir archivos .jpr y deberá mostrar la línea actual. Se recomienda  que el  editor  de  texto  se  realice  con  la  herramienta  Tkinter  de Python para mayor compatibilidad. Queda a discreción del estudiante el diseño y la comunicación de este.

        1.2 FUNCIONALIDADES 
- Abrir archivos: El editor deberá abrir archivos de cualquier extension pero sintaxis de Quetzal 
- Guardar: El editor deberá guardar el estado del archivo en el que se estará
trabajando.

        1.3 HERRAMIENTAS. 
*   1.3.1. Interpretar: hará el llamado al intérprete, el cual se hará cargo de realizar los análisis léxico, sintáctico y semántico, además de ejecutar todas las sentencias.
- 1.3.2. Traducir:  Esta opción nos va a permitir traducir una entrada. El programa recibe un archivo de entrada de código de alto nivel y traduce a código intermedio en la sintaxis de tres direcciones.

        1.4 REPORTES
Tabla de símbolos
Este reporte mostrará la tabla de símbolos durante y después de la ejecución del archivo. Se deberán de mostrar todas las variables, funciones y procedimientos que fueron declarados, así como su tipo y toda la información que el estudiante considere necesaria.AST

Este reporte mostrara el árbol de análisis sintáctico que se produjo al analizar el archivo de entrada. Este debe de representarse como un grafo, se recomienda se utilizar Graphviz. El Estudiante deberá mostrar los nodos que considere necesarios y se realizarán preguntas al momento de la calificación para que explique su funcionamiento.
##### Reporte de errores

El traductor e intérprete deberá ser capaz de detectar todos los errores que se encuentren durante el proceso de traducción. Todos los errores se deberán de recolectar y se mostrará un reporte de errores en el que, como mínimo, debe mostrarse el tipo de error, su ubicación y una breve descripción de por qué se produjo. Los tipos de errores se deberán de manejar son los siguientes:

    Errores léxicos.
    Errores sintácticos.
    Errores semánticos

La tabla de errores contiene la siguiente información:

    Línea: Número de línea donde se encuentra el error.
    Columna: Número de columna donde se encuentra el error.
    Tipo de error: Identifica el tipo de error encontrado. Este puede ser léxico, sintáctico o semántico.
    Descripción del error: Dar una explicación concisa de por qué se generó el error.
    Ámbito: Si fue en una función(decir en cual fue) o en el ámbito global.

##### Reporte gramatical
Se creo un reporte con la sintaxis BNF. Y la definicion dirigida por las sintaxis.

        1.5 CARACTERISTICAS 
- 1.6.1. Contador de Líneas: El editor deberá poder visualizar las líneas en donde se encuentra el código, para mejorar la búsqueda de errores.
- 1.5.2. Posición del Cursor: El editor deberá poder visualizar el cursor en donde se encuentre activo en la entrada de código, para mejorar la búsqueda de errores.
- 1.5.3 El editor de texto cuenta con una paleta de colores para su mejor identificación de las palabras reservadas. 

#### 2. DESCRIPCION DEL LENGUAJE 
La sintaxis del lenguaje Quetzal está definido por enunciado del proyecto, dado en el siguiente enlace: https://github.com/harias25/olc2-diciembre-2021/tree/main/Proyecto%201#sintaxis-de-quetzal-