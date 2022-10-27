////////////////////////////////////////
//Evalaumos si el cuestionario tiene preguntas abiertas o ejercicios sin output
function estadoRevisionCuestionario(){
    //Obtenemos el valor de los inputs de las preguntas opt3
    let rightAnswerOpt3 = document.getElementsByClassName('rightAnswerOpt3');

    //Si existen elementos con esta clase se ejecuta
    if (rightAnswerOpt3.length > 0) {
        for (var i = 0; i < rightAnswerOpt3.length; i++) {
            if (rightAnswerOpt3[i].value == "pendiente") {
                return "pending";
            } else {
                return "ready";
            }
        }
    }

    //Si existen elemento de preguntas abiertas
    let rightAnswerOpt6 = document.getElementsByClassName('rightAnswerOpt6');
    //Si existen elementos con esta clase se ejecuta
    if (rightAnswerOpt6.length > 0) {
        for (var i = 0; i < rightAnswerOpt6.length; i++) {
            if (rightAnswerOpt6[i].value == "pendiente") {
                return "pending";
            } else {
                return "ready";
            }
        }
    }
}

////////////////////////////////////////
//Ocultamos o mostramos mensaje de acuerdo al estado del cuestinario
const estadoCuestionario = estadoRevisionCuestionario();
const validacionMensajes = (estadoCuestionario) => {
    if(estadoCuestionario == "pending"){
        document.getElementById('readyResultaAlert').classList.add('hiddenElement');
    }else if(estadoCuestionario == "ready"){
        document.getElementById('pendingResultaAlert').classList.add('hiddenElement');
    }

    console.log(estadoCuestionario)
}
validacionMensajes(estadoCuestionario);


////////////////////////////////////////
//Input de revisionEstado
function agregarInputEstadoRevisión(estado){
    let revisionEstado = document.getElementById('revisionEstado');
    revisionEstado.value = (estado);
}
agregarInputEstadoRevisión(estadoCuestionario);

/////////////////////////////////
//Debemos retornar un puntaje y promedio en
//caso de que el cuestionario este "ready"
//en caso contrario se regresa un valor pending
function evaluacionEstado(){
    let aprovacionEstado = document.getElementById('aprovacionEstado');
    let promedioGeneral = document.getElementById('promedioGeneral');
    let puntajeGeneral = document.getElementById('puntajeGeneral');
    let puntajeSegmentado = document.getElementById('puntajeSegmentado');
        
    if(estadoCuestionario == "ready"){
        //Accedemos a la calificacion
        let calificacion = document.getElementById('calificacionDataGet').innerText;
        promedioGeneral.value = calificacion;

        //Accedemos a el estado (aprovado o reprobado)
        if(parseFloat(calificacion) <= 5.9){
            aprovacionEstado.value = "reprobado";
        }else if(parseFloat(calificacion) >= 6.0){
            aprovacionEstado.value = "aprobado";
        }

        //Accedemos al puntaje
        let puntajeGral = document.getElementById('puntajeGeneralDataGet').innerText;
        puntajeGeneral.value = puntajeGral;

        //En el documento de JS que esta arriba en el html "operacionesCuestionariosResultados.js"
        //se crearon dos arrays con los puntajes segmentados por tipo de pregunta
        puntajeSegmentadoPorTipoPregunta; //Puntos totales por tipo pregunta
        puntajeSegmentadoPorTipoPreguntaAlumno; //Puntos totales obtenido por el alumno
        //puntajeTotal/puntajeAlumno ==> Es la estrcutura del array
        let puntajeTotalSegementado = [];
        //Juntamos los array
        for(var i = 0; i < puntajeSegmentadoPorTipoPregunta.length; i++){
            puntajeTotalSegementado.push(`${puntajeSegmentadoPorTipoPregunta[i]}/${puntajeSegmentadoPorTipoPreguntaAlumno[i]}`);
        }

        puntajeSegmentado.value = puntajeTotalSegementado;
    }else if(estadoCuestionario == "pending"){
        aprovacionEstado.value = "pending";
        promedioGeneral.value = "pending"; 
        puntajeGeneral.value = "pending"; 
        puntajeSegmentado.value = "pending"; 
    }
}
evaluacionEstado();