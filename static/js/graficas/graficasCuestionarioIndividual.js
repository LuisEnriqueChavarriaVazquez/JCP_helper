//Se almacenan las IDS de los contenedores individuales.
//Nos servira para en el futuro saber donde meter los gráficos
let ids_indivual_cuestionarios = []
let contenedorDeCuestionario = document.getElementsByClassName('contenedorCuestionariosIndividualInsights');
let numeroContenedorDeCuestionario = contenedorDeCuestionario.length;
let numeroIdsContenedorDeCuestionario = 0;

//Esta es la funcion para imprimir los contenedores de los insights de cada grupo
function impresionDeCasillasPorGrupo() {
    //Accedemos a contenedores globales de cada grupo
    let ids_individual_temporal = [];
    for (var i = 0; i < contenedorDeCuestionario.length; i++) {
        ids_individual_temporal = [];
        for (var j = 0; j < 7; j++) {
            contenedorDeCuestionario[i].innerHTML += `
            <div id="contenedorUnitarioCuestionarios_${i}${j}" class="colorGreyWhiter bordered1 containerDataIndividualGroup borderDecoration" >
                
            </div>`;
            ids_individual_temporal.push(`contenedorUnitarioCuestionarios_${i}${j}`);
        }
        numeroIdsContenedorDeCuestionario = j;
        ids_indivual_cuestionarios.push(ids_individual_temporal);
    }
}
impresionDeCasillasPorGrupo();


//Imprime el numero de respuestas por cada cuestionario
function numero_de_respuestas_por_cuestionario(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    contadorFrecuenciaRespuestasArray.forEach((respuestas, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Número de respuestas</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Número de respuestas: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${respuestas}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    })
}

//Promedios generales por cuestionario
function promedio_general_por_cuestionario(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    promediosPorCuestionario.forEach((promedio, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Promedio general</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Promedio general: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${promedio}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    });

    let promedio_por_cuestionario_container = document.querySelectorAll('.porcentajeAprobacionContadorIndividualCuestionario');
    promedio_por_cuestionario_container.forEach((element, i = 0) => {
        element.textContent = promediosPorCuestionario[i++];
    });
}

//Muestra el tiempo promedio para responder un examen a nivel de cuestionario
function promedio_tiempo_respuestas_por_cuestionario(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);
    promedioTiempoPorCuestionario.forEach((tiempo, i = 0) => {
        //Insertamos el análisis de 1 de cada 10 pasan
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Promedio tiempo respuestas por cuestionario</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Tiempo: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${tiempo}hrs.</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
    });
}
//Imprimimos el total de reprobados y aprobados
function comparacion_entre_reprobados_aprobados_por_cuestionario(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);
    //Al lado del título del grupo pone el porcentage de aprobacion
    aprobacionCuestionarios.forEach((aprobacion, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Cifraz de aprobación y reprobación.</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Aprobados:<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${aprobacionCuestionarios[i]}</span></p>
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Reprobados: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${reprobacionCuestionarios[i]}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    })
}

//Imprime la cantidad de retrasos y entregas a tiempo de cada cuestionario
function distribucion_entregas_retraso_por_cuestionario(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);
    a_tiempo_Cuestionarios.forEach((retraso, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Cantidad de retrasos</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Entrega a tiempo:<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${a_tiempo_Cuestionarios[i]}</span></p>
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Entrega con retraso: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${retraso_Cuestionarios[i]}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    })
}

function puntaje_promedio_de_error_y_aciertos_cuestionario(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    puntajesPorCuestionarioFinal.forEach((puntaje, i = 0) => {
        //Insertamos el análisis de 1 de cada 10 pasan
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Porcentaje de aciertos y error en cuestionario</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Puntaje promedio/total: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${puntaje[0]}/${puntaje[1]}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    });
}

function porcentaje_de_error_y_aciertos_cuestionario_por_tipo_pregunta(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    valoresTipoPreguntaFinal_porCuestionario.forEach((cuestionario, i = 0) => {
        //Insertamos el análisis de 1 de cada 10 pasan
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
        <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Porcentaje de aciertos por tipo de pregunta.</div>
        <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">`;
            cuestionario.forEach((tipoPregunta, j = 0) => {
                contenido += `
                    <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${nombreTipoPregunta[++j]}
                    <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">Aciertos: ${tipoPregunta[1]}%</span>
                    <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">Error: ${tipoPregunta[0]}%</span></p>
                    `;
            })
            contenido += "</div>";
            contenedorPadre.innerHTML += contenido;
        }
        i++
    });
}

//Insertamos en el primer contenedor de cada grupo una gráfica lineal.
function insertarCajasHijasEnCadaGrupo(numero_grupos, numero_ids) {
    for (var i = 0; i < numero_grupos; i++) {
        for (var j = 0; j < numero_ids; j++) {
            if (j == 0) {
                //Agregamos la clase para que se ajuste a CSS grid
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('first_child_container');
                //Ejecutamos la función para la impresión del dato o gráfica.
                numero_de_respuestas_por_cuestionario(ids_indivual_cuestionarios[i][j], i);
            } else if (j == 1) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('second_child_container');
                promedio_general_por_cuestionario(ids_indivual_cuestionarios[i][j], i);
            } else if (j == 2) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('third_child_container');
                promedio_tiempo_respuestas_por_cuestionario(ids_indivual_cuestionarios[i][j], i)
            } else if (j == 3) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('fourth_child_container');
                comparacion_entre_reprobados_aprobados_por_cuestionario(ids_indivual_cuestionarios[i][j], i);
            } else if (j == 4) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('fifth_child_container');
                distribucion_entregas_retraso_por_cuestionario(ids_indivual_cuestionarios[i][j], i);
            } else if (j == 5) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('sixth_child_container');
                porcentaje_de_error_y_aciertos_cuestionario_por_tipo_pregunta(ids_indivual_cuestionarios[i][j], i);
            } else if (j == 6) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('seventh_child_container');
                puntaje_promedio_de_error_y_aciertos_cuestionario(ids_indivual_cuestionarios[i][j], i);
            }
        }
    }
}
insertarCajasHijasEnCadaGrupo(numeroContenedorDeCuestionario, numeroIdsContenedorDeCuestionario);

