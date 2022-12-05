//Creamos textos para identificar el idioma
let español_6 = ['Número de respuestas por grupo.','Promedio general por cuestionario.', 'Radar de los promedios generales por cuestionario.'];
let ingles_6 = ['Number of responses per group. ','The total average of each test. ','Total average radar for each test.'];
let portugues_6 = ['Número de respostas por grupo. ','La media total de cada causeionario. ','Radar promedio total para cada causeionario.'];
let chino_6 = ['按组划分的答复数。','每份问卷的总平均数。','每份问卷的总平均数雷达。'];
let futureLanguage_6 = [];
let currentLenguage_6 = localStorage.getItem('idioma');
console.log('currentLenguage_6', currentLenguage_6)

if (currentLenguage_6 == 'esp') {
  futureLanguage_6 = [...español_6];
} else if (currentLenguage_6 == 'en') {
  futureLanguage_6 = [...ingles_6];
} else if (currentLenguage_6 == 'pt') {
  futureLanguage_6 = [...portugues_6];
} else if (currentLenguage_6 == 'chn') {
  futureLanguage_6 = [...chino_6];
}

////////////////////////////////////////////////////////
//Plotly.newPlot('graph2', data, layout, config);

//Imprime la gráfica de barras
function grafica_barras_numero_cuestionarios_por_grupo() {
    var trace1 = {
        type: 'bar',
        x: cuestionarioConRespuestas,
        y: contadorFrecuenciaRespuestasArray,
        marker: {
            color: arrayColores
        }
    };

    var data = [trace1];

    var layout = { //Titulo de la gráfica
        title: `${futureLanguage_6[0]}`,
        font: { size: 10 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph3', data, layout, config);
}
grafica_barras_numero_cuestionarios_por_grupo(); //Esta ejecuta la gráfica por defecto

//Imprime la gráfica pastel
function grafica_barras_promedio_general_por_cuestinario() {

    var trace1 = {
        type: 'bar',
        x: cuestionarioConRespuestas,
        y: promediosPorCuestionario, //Array con promedios generales
        marker: {
            color: arrayColores
        }
    };

    var data = [trace1];

    var layout = { //Titulo de la gráfica
        title: `${futureLanguage_6[1]}`,
        font: { size: 10 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph3', data, layout, config);
}

//Imprime la gráfica lineal
//gruposNameArray
//promediosMultidimensional
function grafica_radar_promedios_generales() {
    data = [{
        type: 'scatterpolar',
        r: promediosPorCuestionario,
        theta: cuestionarioConRespuestas,
        fill: 'toself',
        fillcolor: arrayColores[3],
        opacity: 0.8,
      }]
      
      layout = {
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 10]
          },
          bgcolor: arrayColores[4],
        },
        showlegend: false,
        title: `${futureLanguage_6[2]}`
      }
      
      Plotly.newPlot("graph3", data, layout)
}
