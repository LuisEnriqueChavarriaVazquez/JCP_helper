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
        return "pending";
    }

    //Situacion excepcional
    if(rightAnswerOpt3.length == 0 && rightAnswerOpt6.length > 0){
        return "pending";
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