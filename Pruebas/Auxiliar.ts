
//TROZO DE CODIGO EXTRAIDO DE ASIGNACION EN LA LINEA 68
/*if (tipoValor == Tipo.INT || tipoValor == Tipo.DOUBLE) {
                        console.log("entra------");
                        if (this.expresion instanceof Operacion || this.expresion instanceof Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = P + ${simbolo.posicion} ;`);
                            let etiqueta = (this.expresion instanceof Operacion)?this.expresion.etiqueta:valor;
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${etiqueta}`, `${temp}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[${temp}] = ${etiqueta} ;`);
                        } 
                    } else if (tipoValor == Tipo.STRING){
                        if (this.expresion instanceof Operacion || this.expresion instanceof Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            for (let i = 0; i < valor.length; i++){
                                arbol.controlador.addQuad(new Quadrupla(`=`, `${valor.charCodeAt(i)}`, `H`, `${arbol.heap}`));
                                arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(i)} ;`);
                                arbol.controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
                                arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            }
                            arbol.controlador.addQuad(new Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${simbolo.posicion} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    } else if (tipoValor == Tipo.CHAR){
                        if (this.expresion instanceof Operacion) {
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${this.expresion.etiqueta}`, `${simbolo.posicion}`, `${arbol.stack}`));
                        } else if (this.expresion instanceof Primitivo) {
                            let temp = arbol.controlador.getTemp();
                            let temp2 = arbol.controlador.getTemp();
                            arbol.controlador.addQuad(new Quadrupla(`=`, `H`, ``, `${temp}`));
                            arbol.controlador.codigo3D.push(`${temp} = H ;`);
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${valor.charCodeAt(0)}`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = ${valor.charCodeAt(0)} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`=`, `-1`, `H`, `${arbol.heap}`));
                            arbol.controlador.codigo3D.push(`${arbol.heap}[(int)H] = -1 ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `1`, `H`, `H`));
                            arbol.controlador.codigo3D.push(`H = H + 1 ;`);
                            arbol.controlador.codigo3D.push(`${temp2} = P + ${simbolo.posicion} ;`);
                            arbol.controlador.addQuad(new Quadrupla(`+`, `P`, `${simbolo.posicion}`, `${temp2}`));
                            arbol.controlador.addQuad(new Quadrupla(`=`, `${temp}`, `${temp2}`, `${arbol.stack}`));
                            arbol.controlador.codigo3D.push(`${arbol.stack}[(int)${temp2}] = ${temp} ;`);
                            console.log("Imprimiendo string--------");
                            console.log(arbol.controlador.codigo3D.join("\n"));
                            console.log("Saliendo de imprimir string");
                        }
                    }
                    */
/*

                    Operador.SUMA 
                    Operador.RESTA 
                    Operador.MULTIPLICACION   
                    Operador.DIVISION   
                    Operador.MODULO   
                    Operador.MENOS_UNARIO   
                    Operador.MAYOR_QUE   
                    Operador.MENOR_QUE   
                    Operador.IGUAL_IGUAL   
                    Operador.DIFERENTE_QUE   
                    Operador.INCREMENTO   
                    Operador.DECREMENTO   
                    Operador.AND   
                    Operador.OR   
                    Operador.NOT   
                    Operador.MAYOR_IGUAL_QUE   
                    Operador.MENOR_IGUAL_QUE  
                    Operador.POW   
                    Operador.SQRT   
                    Operador.LOG   
                    Operador.SENO   
                    Operador.COSENO   
                    Operador.TAN   
                    Operador.CONCAT   
                    Operador.REPEAT  
                    */