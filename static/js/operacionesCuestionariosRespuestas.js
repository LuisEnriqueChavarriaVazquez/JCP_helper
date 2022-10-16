//Esta funcion se llama cuando hace la entrega de los resultados
//sirve para el procesamiento de los resultados del estudiante.

//EN EL PREVIEW DEL ESTUDIANTE ESTA EN EL BOTON DE "SIMULAR ENTREGA"
//EN LA PANTALLA CUANDO EL ALUMNO ESTE HACIENDO SU CUESTIONARIO ESTARA EN EL BOTON DE "ENTREGAR"
function procesamientoDeResultados(){
    //Se hace la lectura de las ponderaciones (en el orden que estan renderizados)
    function lecturaPonderaciones(){
        let ponderacionBoxes = document.getElementsByClassName('ponderacionBox');
        let cantidadPonderacion = ponderacionBoxes.length;
        let listaPonderaciones = [];
        let textoPonderacion; 

        for(var y = 0; y < cantidadPonderacion; y++){
            textoPonderacion = ponderacionBoxes[y].innerText;
            listaPonderaciones.push(textoPonderacion.substring(0,textoPonderacion.indexOf('pts.')));
        }

        console.log(listaPonderaciones);

    }
    lecturaPonderaciones();
    
    //Se hace la lectura de inputs hidden que contienen los resultado de las preguntas
    function lecturaDeOutputs(){

    }
}   