////////////////////////////////////////////////////////
//Plotly.newPlot('graph2', data, layout, config);

//Imprime la gráfica de barras
function grafica_barras_numero_cuestionarios_por_grupo() {
    var trace1 = {
        type: 'bar',
        x: cuestionarioConRespuestas,
        y: contadorFrecuenciaRespuestasArray,
        marker: {
            color: ['#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865','#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865','#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865'],
            line: {
                width: 1
            }
        }
    };

    var data = [trace1];

    var layout = { //Titulo de la gráfica
        title: 'Número de respuestas por grupo.',
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
            color: ['#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865'],
            line: {
                width: 1
            }
        }
    };

    var data = [trace1];

    var layout = { //Titulo de la gráfica
        title: 'Promedio general por cuestionario.',
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
        fill: 'toself'
      }]
      
      layout = {
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 10]
          }
        },
        showlegend: false,
        title: "Radar de los promedios generales por cuestionario."
      }
      
      Plotly.newPlot("graph3", data, layout)
}
