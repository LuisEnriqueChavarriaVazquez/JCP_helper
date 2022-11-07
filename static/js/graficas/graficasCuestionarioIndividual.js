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
        for (var j = 0; j < 6; j++) {
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

    porcentagesDividosPorGrupo.forEach((porcentage, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Número de respuestas</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Número de respuestas: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${contadorFrecuenciaRespuestasArray[i]}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    })
}

//Imprime el promedio de intentos por grupo
function promedio_general_por_cuestionario(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    arrayPromediosIntentosPorGrupo.forEach((promedioIntento, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Promedio general</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Promedio general: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${promediosPorCuestionario[i]}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    });
}

function promedio_max_min_por_grupo(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    promediosMultidimensionalOrdenado.forEach((grupo, i = 0) => {
        //Insertamos el análisis de 1 de cada 10 pasan
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Rango de promedios grupal</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Prom. min: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${grupo.at(0)}</span></p>
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Prom. max:<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${grupo.at(-1)}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    });
}

//1 de cada tantos estudiantes pasa en determinado curso
function analisis_pasar_por_grupo(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);
    //Al lado del título del grupo pone el porcentage de aprobacion
    let contadorIndependiente = document.getElementsByClassName('porcentajeAprobacionContadorIndividual');

    porcentagesDividosPorGrupo.forEach((porcentageGrupo, i = 0) => {
        //Insertamos el porcentage de aprobacion al inicio al lado del titulo
        contadorIndependiente[i].textContent = porcentageGrupo[0] + "%";

        //Insertamos el análisis de 1 de cada 10 pasan
        if (i == containerNumero) { //Valida que contenedor es...
            let formatoNumero = Math.ceil(porcentageGrupo[0] / 10);
            let contenido = `
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Índice de aprobación</div>
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario"><span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${formatoNumero}/10</span> aprueba</p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    });
}

//Muuestra el tiempo promedio para responder un examen a nivel grupal
function tiempo_promedio_respuesta_examen_por_grupo(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);
    promedioTiempoPorGrupo.forEach((tiempo, i = 0) => {
        //Insertamos el análisis de 1 de cada 10 pasan
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Promedio grupal tiempo respuestas</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Tiempo: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${tiempo}hrs.</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
    });
}

//Imprime el procentage de reprobados y aprobados de cada grupo
function distribucion_entregas_retraso_por_grupo(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    cantidadRetrasos.forEach((porcentage, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Porcentaje de retrasos</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">A tiempo:<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${cantidadATiempo[i]}%</span></p>
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Retraso: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${cantidadRetrasos[i]}%</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    })
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
                tiempo_promedio_respuesta_examen_por_grupo(ids_indivual_cuestionarios[i][j], i)
            } else if (j == 3) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('fourth_child_container');
                analisis_pasar_por_grupo(ids_indivual_cuestionarios[i][j], i);
            } else if (j == 4) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('fifth_child_container');
                promedio_max_min_por_grupo(ids_indivual_cuestionarios[i][j], i);
            }else if (j == 5) {
                document.getElementById(ids_indivual_cuestionarios[i][j]).classList.add('sixth_child_container');
                distribucion_entregas_retraso_por_grupo(ids_indivual_cuestionarios[i][j], i);
            }
        }
    }
}
insertarCajasHijasEnCadaGrupo(numeroContenedorDeCuestionario, numeroIdsContenedorDeCuestionario);

