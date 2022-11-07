////////////////////////////////////////////////////////
//Imprime la gráfica de barras
function grafica_tiempo_general_respuesta_cuestinario() {
    var trace1 = {
        type: 'bar',
        x: cuestionarioConRespuestas,
        y: promedioTiempoPorCuestionario, //Promedio de tiempo
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

    Plotly.newPlot('graph4', data, layout, config);
}
grafica_tiempo_general_respuesta_cuestinario(); //Esta ejecuta la gráfica por defecto
