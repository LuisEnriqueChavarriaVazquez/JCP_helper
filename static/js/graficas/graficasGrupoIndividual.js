//Creamos textos para identificar el idioma
let español_7 = ['Porcentaje de aprobación','Aprobados:','Reprobados:','Intentos promedio.','Intentos: ','Rango de calificaciones:','Calificación min.:','Calificación max.:','Índice de aprobación','aprueba','Promedio tiempo respuestas:','Tiempo: ','Porcentaje de retrasos','A tiempo:','Retraso: ',];
let ingles_7 = ['Approval rate','Approved:','Failed:','Average attempts.','Attempts: ','Range of grades:','Min. grade:','Max rating:','Approval rating','approves','Average response time:','Time: ','Percentage of delays','On time:','Delay: ',];
let portugues_7 = ['Taxa de aprovação','Aprovado:','Fracassado:','Tentativas médias.','Tentativas: ','Faixa de notas:','Grau mínimo:','Classificação máxima:','Taxa de aprovação','aprova','Tempo médio de resposta:','Tempo: ','Porcentagem de atrasos','A tempo:','Atraso: ',];
let chino_7 = ['批准率','得到正式认可的：','失败的：','平均尝试次数。','尝试：','成绩范围：','最低等级：','最大评分：','认可度','批准','平均响应时间：','天气： ','延误百分比','准时：','延迟： ',];
let futureLanguage_7 = [];
let currentLenguage_7 = localStorage.getItem('idioma');
console.log('currentLenguage_7', currentLenguage_7)

if (currentLenguage_7 == 'esp') {
  futureLanguage_7 = [...español_7];
} else if (currentLenguage_7 == 'en') {
  futureLanguage_7 = [...ingles_7];
} else if (currentLenguage_7 == 'pt') {
  futureLanguage_7 = [...portugues_7];
} else if (currentLenguage_7 == 'chn') {
  futureLanguage_7 = [...chino_7];
}


//Se almacenan las IDS de los contenedores individuales.
//Nos servira para en el futuro saber donde meter los gráficos
let ids_indivual_groups = []
let contenedorDeGrupo = document.getElementsByClassName('contenedorGrupoIndividualInsights');
let numeroContenedorDeGrupo = contenedorDeGrupo.length;
let numeroIdsContenedorDeGrupo = 0;

//Variables para los reportes

let PorcentajeAprobacionAproReportes = [];
let PorcentajeAprobacionRepReportes = [];
let IntentosPromedioReportes = [];
let RangoCalMinReportes = [];
let RangoCalMaxReportes = [];
let IndiceAprobReportes = [];
let PromedioTiempoRespuestasReportes = [];
let GruposAtiempoReporte = [];
let GruposRetrasoReporte = [];


//Esta es la funcion para imprimir los contenedores de los insights de cada grupo
function impresionDeCasillasPorGrupo() {
    //Accedemos a contenedores globales de cada grupo
    let ids_individual_temporal = [];
    for (var i = 0; i < contenedorDeGrupo.length; i++) {
        ids_individual_temporal = [];
        for (var j = 0; j < 6; j++) {
            contenedorDeGrupo[i].innerHTML += `
            <div id="contenedorUnitario_${i}${j}" class="colorGreyWhiter colorTextReverse bordered1 containerDataIndividualGroup borderDecoration" >
                
            </div>`;
            ids_individual_temporal.push(`contenedorUnitario_${i}${j}`);
        }
        numeroIdsContenedorDeGrupo = j;
        ids_indivual_groups.push(ids_individual_temporal);
    }
}
impresionDeCasillasPorGrupo();


//Imprime el procentage de reprobados y aprobados de cada grupo
function porcentageAprobacion_card1(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    porcentagesDividosPorGrupo.forEach((porcentage, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_7[0]}</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_7[1]} <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${porcentage[0]}%</span></p>
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_7[2]}<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${porcentage[1]}%</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;

             //Info para los reportes
            PorcentajeAprobacionAproReportes.push(porcentage[0]);
            PorcentajeAprobacionRepReportes.push(porcentage[1]);

        }
        i++
    })
}

//Imprime el promedio de intentos por grupo
function promedio_intentos_por_grupo(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    arrayPromediosIntentosPorGrupo.forEach((promedioIntento, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_7[3]}</div>
            <div class="contenidoContenedorUnitarioEstadisticasModel2 bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_7[4]}<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${promedioIntento}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;



            //info para los reportes
            IntentosPromedioReportes.push(promedioIntento);
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
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_7[5]}</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_7[6]}<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${grupo.at(0)}</span></p>
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_7[7]}<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${grupo.at(-1)}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;


            //info reportes
           RangoCalMinReportes.push(grupo.at(0));
           RangoCalMaxReportes.push(grupo.at(-1));

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
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_7[8]}</div>
            <div class="contenidoContenedorUnitarioEstadisticasModel2 bordered2Down">
                <p class="colorTextReverse porcetageAprobacionParrafoUnitario"><span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${formatoNumero}/10 ${futureLanguage_7[9]}</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;



            //info reportes
            IndiceAprobReportes.push(formatoNumero );


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
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_7[10]}</div>
            <div class="contenidoContenedorUnitarioEstadisticasModel2 bordered2Down">
            <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_7[11]}<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${tiempo}hrs.</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;


           //info de reportes
           PromedioTiempoRespuestasReportes.push(tiempo);


        }
    });
}

//Imprime el procentage de reprobados y aprobados de cada grupo
function distribucion_entregas_retraso_por_grupo(idContainer, containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    cantidadRetrasos.forEach((porcentage, i = 0) => {
        if (i == containerNumero) { //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas colorTextReverse bordered2Up">${futureLanguage_7[12]}</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_7[13]}<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${cantidadATiempo[i]}%</span></p>
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">${futureLanguage_7[14]}<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${cantidadRetrasos[i]}%</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;


            //info reportes

            GruposAtiempoReporte.push(cantidadATiempo[i]);
            GruposRetrasoReporte.push(cantidadRetrasos[i]);

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
                document.getElementById(ids_indivual_groups[i][j]).classList.add('first_child_container');
                //Ejecutamos la función para la impresión del dato o gráfica.
                porcentageAprobacion_card1(ids_indivual_groups[i][j], i);
            } else if (j == 1) {
                document.getElementById(ids_indivual_groups[i][j]).classList.add('second_child_container');
                promedio_intentos_por_grupo(ids_indivual_groups[i][j], i);
            } else if (j == 2) {
                document.getElementById(ids_indivual_groups[i][j]).classList.add('third_child_container');
                tiempo_promedio_respuesta_examen_por_grupo(ids_indivual_groups[i][j], i)
            } else if (j == 3) {
                document.getElementById(ids_indivual_groups[i][j]).classList.add('fourth_child_container');
                analisis_pasar_por_grupo(ids_indivual_groups[i][j], i);
            } else if (j == 4) {
                document.getElementById(ids_indivual_groups[i][j]).classList.add('fifth_child_container');
                promedio_max_min_por_grupo(ids_indivual_groups[i][j], i);
            }else if (j == 5) {
                document.getElementById(ids_indivual_groups[i][j]).classList.add('sixth_child_container');
                distribucion_entregas_retraso_por_grupo(ids_indivual_groups[i][j], i);
            }
        }
    }
}
insertarCajasHijasEnCadaGrupo(numeroContenedorDeGrupo, numeroIdsContenedorDeGrupo);

//Llenar datos de reportes para graficos

//Datos graficos promedio general de los grupos

//Comparación de promedios grupales

document.getElementById("xComparacionPromedioGrupales").value = JSON.stringify(gruposNameArray);
document.getElementById("yComparacionPromedioGrupales").value =JSON.stringify(promedioFinalPorGrupo);

//Datos Indice porcentuales promedio

document.getElementById("valoresPastel").value = JSON.stringify(porcentajePromedioEquivalente);
document.getElementById("labelsPastel").value = JSON.stringify(gruposNameArray);
document.getElementById("datosGrupo").value = JSON.stringify(datosGrupo);

//Datos graficos de Aprobación general de grupos


//Datos Porcentaje de aprobados vs reprobados

document.getElementById("arrayPorcentajeAprobacionPastel").value =JSON.stringify(arrayPorcentajeAprobacion);
document.getElementById("graficasTitlelabelsPastel").value =JSON.stringify(graficasTitle);


//Datos normales


document.getElementById("datosGrupo").value = JSON.stringify(datosGrupo);

document.getElementById("PorcentajeAprobacionAproReportes").value =JSON.stringify(PorcentajeAprobacionAproReportes);
document.getElementById("PorcentajeAprobacionRepReportes").value =JSON.stringify(PorcentajeAprobacionRepReportes);
document.getElementById("IntentosPromedioReportes").value = JSON.stringify(IntentosPromedioReportes);
document.getElementById("RangoCalMinReportes").value =JSON.stringify(RangoCalMinReportes);
document.getElementById("RangoCalMaxReportes").value =JSON.stringify(RangoCalMaxReportes);
document.getElementById("IndiceAprobReportes").value =JSON.stringify(IndiceAprobReportes);
document.getElementById("PromedioTiempoRespuestasReportes").value =JSON.stringify(PromedioTiempoRespuestasReportes);
document.getElementById("GruposAtiempoReporte").value =JSON.stringify(GruposAtiempoReporte);
document.getElementById("GruposRetrasoReporte").value = JSON.stringify(GruposRetrasoReporte);

//Variables reportes para graficas con valores multiple

document.getElementById("aprobadosFormatoDiezReporte").value =aprobadosFormatoDiezReporte;
document.getElementById("porcentajeGlobalAprobadorReporte").value =porcentajeGlobalAprobadorReporte;
document.getElementById("porcentajeGlobalReprobadorReporte").value =porcentajeGlobalReprobadorReporte;