
export class ReporteGramatical {
     listaGramatica : Array<string> ;

    /* constructor(listaGramatica: Array<string>){
         this.listaGramatica = listaGramatica;
     }
     */
     constructor(){
         this.listaGramatica = [];
     }
    
     getGramatica(){

        return this.listaGramatica;
     }

    setGramatica(gramatica: string){

        this.listaGramatica.push(gramatica);
    }
}