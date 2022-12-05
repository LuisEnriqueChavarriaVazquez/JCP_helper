//Creamos textos para identificar el idioma
let español_4 = ['Número de respuestas','Número de respuestas:','Promedio general','Promedio general:','Promedio tiempo respuestas por cuestionario','Cifras de aprobación y reprobación.','Cantidad de retrasos','${futureLanguage_4[7]}','Entrega con retraso:','Porcentaje de aciertos y error en cuestionario','Puntaje promedio/total: ','Porcentaje de aciertos por tipo de pregunta.','Tiempo'];
let ingles_4 = ['Number of responses','Number of responses:','General average','General average:','Average response time per test','Pass and fail figures.','Number of delays','Give on time:','Delivery good answers and wrong answers in the test','Average/total score: ','Percentage of hits by question type.','Time'];
let portugues_4 = ['Número de respostas','Número de respostas:','Promédio geral','Promédio geral:','Tempo médio de resposta por questionário','Números de aprovação e reprovação.','Número de atrasos','Dar na hora:','Entrega atrasada:','Porcentagem de acertos e erros no questionário','Pontuação média/total: ','Porcentagem de acertos por tipo de pergunta.','Tempo'];
let chino_4 = ['回复数','回复数：','共同海损','共同海损：','每份问卷的平均回复时间','通过和失败的数字。','延误次数','按时交：','交货延迟：','调查问卷中的命中率和未命中率','平均/总分：','按问题类型划分的命中百分比。','时间'];
let español_5 = ['Aprobado','Reprobado'];
let ingles_5 = ['Approved','Failed'];
let portugues_5 = ['Aprovado','Reprovado'];
let chino_5 = ['通过', '失败'];
let futureLanguage_4 = [];
let futureLanguage_5 = [];
let currentLenguage_4 = localStorage.getItem('idioma');
console.log('currentLenguage_4', currentLenguage_4)

if (currentLenguage_4 == 'esp') {
  futureLanguage_4 = [...español_4];
  futureLanguage_5 = [...español_5];
} else if (currentLenguage_4 == 'en') {
  futureLanguage_4 = [...ingles_4];
  futureLanguage_5 = [...ingles_5];
} else if (currentLenguage_4 == 'pt') {
  futureLanguage_4 = [...portugues_4];
  futureLanguage_5 = [...portugues_5];
} else if (currentLenguage_4 == 'chn') {
  futureLanguage_4 = [...chino_4];
  futureLanguage_5 = [...chino_5];
}

//Se almacenan las IDS de los contenedores individuales.
//Nos servira para en el futuro saber donde meter los gráficos
let ids_indivual_cuestionarios = []
let contenedorDeCuestionario = document.getElementsByClassName('contenedorCuestionariosIndividualInsights');
let numeroContenedorDeCuestionario = contenedorDeCuestionario.length;
let numeroIdsContenedorDeCuestionario = 0;

//Variables para los reportes

let numeroRespuestas = [];
let promediosGenerales = [];
let tiempoPromedioRespuestas = [];
let PorcentajeAcierto = [];
let cantidadRetrasosAtiempo = [];
let cantidadRetrasosTarde = [];
let cifrasAprobados = [];
let cifasReprobados = [];
let porcentajespreguntas = [];


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
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_4[0]}</div>
            <div class="contenidoContenedorUnitarioEstadisticasModel2 bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_4[1]} <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${respuestas}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
            numeroRespuestas.push(respuestas);
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
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_4[2]}</div>
            <div class="contenidoContenedorUnitarioEstadisticasModel2 bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_4[3]}: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${promedio}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
            promediosGenerales.push(promedio);
        }
        i++
    });

    let promedio_por_cuestionario_container = document.querySelectorAll('.porcentajeAprobacionContadorIndividualCuestionario');
    promedio_por_cuestionario_container.forEach((element, i = 0) => {
        element.innerHTML = promediosPorCuestionario[i++];
    });
}

//Muestra el tiempo promedio para responder un examen a nivel de cuestionario
function promedio_tiempo_respuestas_por_cuestionario(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);
    promedioTiempoPorCuestionario.forEach((tiempo, i = 0) => {
        //Insertamos el análisis de 1 de cada 10 pasan
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_4[4]}</div>
            <div class="contenidoContenedorUnitarioEstadisticasModel2 bordered2Down">
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_4.at(-1)} <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${tiempo}hrs.</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
            tiempoPromedioRespuestas.push(tiempo);
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
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_4[5]}</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_5[0]}<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${aprobacionCuestionarios[i]}</span></p>
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_5[1]} <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${reprobacionCuestionarios[i]}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
            cifrasAprobados.push(aprobacionCuestionarios[i]);
            cifasReprobados.push(reprobacionCuestionarios[i]);
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
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_4[6]}</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_4[7]}<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${a_tiempo_Cuestionarios[i]}</span></p>
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_4[8]} <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${retraso_Cuestionarios[i]}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
             cantidadRetrasosAtiempo.push(a_tiempo_Cuestionarios[i]);
             cantidadRetrasosTarde.push(retraso_Cuestionarios[i]);
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
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_4[9]}</div>
            <div class="contenidoContenedorUnitarioEstadisticasModel2 bordered2Down">
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_4[10]} <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${puntaje[0]}/${puntaje[1]}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
            PorcentajeAcierto.push(puntaje[0] + "/" + puntaje[1]);
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
        <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_4[11]}</div>
        <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">`;
        cuestionarioTurno = [];
            cuestionario.forEach((tipoPregunta, j = 0) => {
                contenido += `
                    <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${nombreTipoPregunta[++j]}
                    <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">✅: ${tipoPregunta[1]}%</span>
                    <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">❌: ${tipoPregunta[0]}%</span></p>
                    `;
                   porcentaje = [
                     nombreTipoPregunta[j],
                     tipoPregunta[1],
                     tipoPregunta[0],
                   ];
                   cuestionarioTurno.push(porcentaje);
            })
            contenido += "</div>";
            contenedorPadre.innerHTML += contenido;
            porcentajespreguntas.push(cuestionarioTurno);
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
                distribucion_entregas_retraso_por_cuestionario(ids_indivual_cuestionarios[i][j], i);
            } else if (j == 4) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('fifth_child_container');
                puntaje_promedio_de_error_y_aciertos_cuestionario(ids_indivual_cuestionarios[i][j], i);
            } else if (j == 5) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('sixth_child_container');
                porcentaje_de_error_y_aciertos_cuestionario_por_tipo_pregunta(ids_indivual_cuestionarios[i][j], i);
            } else if (j == 6) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('seventh_child_container');
                comparacion_entre_reprobados_aprobados_por_cuestionario(ids_indivual_cuestionarios[i][j], i);
            }
        }
    }
}
insertarCajasHijasEnCadaGrupo(numeroContenedorDeCuestionario, numeroIdsContenedorDeCuestionario);

//Datos graficos numero de respuestas por grupo

//Insights cuestionarios generales 

//cuestionarioConRespuestas;
document.getElementById("cuestionarioConRespuestas").value =JSON.stringify(cuestionarioConRespuestas);
document.getElementById("contadorFrecuenciaRespuestasArray").value =JSON.stringify(contadorFrecuenciaRespuestasArray);

//Datos graficos radar de los promedios generales por cuestionario
document.getElementById("promediosPorCuestionario").value = JSON.stringify(promediosPorCuestionario);
document.getElementById("cuestionarioConRespuestasRadio").value = JSON.stringify(cuestionarioConRespuestas);


//Datos graficos Promedio general por cuestionario
document.getElementById("cuestionarioConRespuestasPromGenCuest").value = JSON.stringify(cuestionarioConRespuestas);
document.getElementById("promediosPorCuestionarioPromGenCuest").value =JSON.stringify(promediosPorCuestionario);

//Insights cuestionarios generales 2

//Tiempo promedio en horas respuestas en cuestionarios
document.getElementById("cuestionarioConRespuestasTiemProHoras").value = JSON.stringify(cuestionarioConRespuestas);
document.getElementById("promedioTiempoPorCuestionarioTiemProHoras").value =JSON.stringify(promedioTiempoPorCuestionario);

//Cuestionarios data
document.getElementById("numeroRespuestas").value =JSON.stringify(numeroRespuestas);
document.getElementById("promediosGenerales").value =JSON.stringify(promediosGenerales);
document.getElementById("tiempoPromedioRespuestas").value = JSON.stringify(tiempoPromedioRespuestas);
document.getElementById("PorcentajeAcierto").value =JSON.stringify(PorcentajeAcierto);
document.getElementById("cantidadRetrasosAtiempo").value = JSON.stringify(cantidadRetrasosAtiempo);
document.getElementById("cantidadRetrasosTarde").value = JSON.stringify(cantidadRetrasosTarde);
document.getElementById("cifrasAprobados").value =JSON.stringify(cifrasAprobados);
document.getElementById("cifasReprobados").value =JSON.stringify(cifasReprobados);
document.getElementById("porcentajesPreguntas").value = JSON.stringify(porcentajespreguntas);