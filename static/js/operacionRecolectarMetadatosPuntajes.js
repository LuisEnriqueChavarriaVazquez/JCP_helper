////////////////////////////////////////
//Evalaumos si el cuestionario tiene preguntas abiertas o ejercicios sin output
function estadoRevisionCuestionario(){
    //Obtenemos el valor de los inputs de las preguntas opt3
    let rightAnswerOpt3 = document.getElementsByClassName('opt3Pendiente');
    console.log('rightAnswerOpt3', rightAnswerOpt3)

    //Variable indicador
    let indicador = "";

    //Si existen elementos con esta clase se ejecuta
    if (rightAnswerOpt3.length > 0) {
        for (var i = 0; i < rightAnswerOpt3.length; i++) {
            if (rightAnswerOpt3[i].value == "pendiente") {
                indicador = "pending";
            }
        }
    }

    //Si existen elemento de preguntas abiertas
    let rightAnswerOpt6 = document.getElementsByClassName('opt6Pendiente');
    console.log('rightAnswerOpt6', rightAnswerOpt6)
    //Si existen elementos con esta clase se ejecuta
    if (rightAnswerOpt6.length > 0) {
        for (var i = 0; i < rightAnswerOpt6.length; i++) {
            if (rightAnswerOpt6[i].value == "pendiente") {
                indicador = "pending";
            }
        }
    }

    //retorno de indicador
    if(indicador == ""){
        return "ready"
    }else if(rightAnswerOpt6.length == 0 && rightAnswerOpt3.length == 0){
        return "ready"
    }else if(indicador == "pending"){
        return indicador
    }
}

////////////////////////////////////////
//Ocultamos o mostramos mensaje de acuerdo al estado del cuestinario
const estadoCuestionario = estadoRevisionCuestionario();
const validacionMensajes = (estadoCuestionarioParam) => {
    if(estadoCuestionarioParam == "pending"){
        document.getElementById('pendingResultaAlert').classList.remove('hiddenElement');
        document.getElementById('readyResultaAlert').classList.add('hiddenElement');
    }else if(estadoCuestionarioParam == "ready"){
        document.getElementById('pendingResultaAlert').classList.add('hiddenElement');
        document.getElementById('readyResultaAlert').classList.remove('hiddenElement');
    }

    console.log(estadoCuestionarioParam)
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
function evaluacionEstado(estadoCuestionarioParam){
    let aprovacionEstado = document.getElementById('aprovacionEstado');
    let promedioGeneral = document.getElementById('promedioGeneral');
    let puntajeGeneral = document.getElementById('puntajeGeneral');
    let puntajeSegmentado = document.getElementById('puntajeSegmentado');
        
    if(estadoCuestionarioParam == "ready"){
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

        //Estado de la revision
        let revisionEstado = document.getElementById('revisionEstado');
        revisionEstado.value = "ready";

    }else if(estadoCuestionarioParam == "pending"){
        aprovacionEstado.value = "pending";
        promedioGeneral.value = "pending"; 
        puntajeGeneral.value = "pending"; 
        puntajeSegmentado.value = "pending";
    }
}
evaluacionEstado(estadoCuestionario);