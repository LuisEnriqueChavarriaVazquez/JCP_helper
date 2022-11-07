////////////////////////////////////////////////////////
//Plotly.newPlot('graph2', data, layout, config);

//Imprime la gráfica de barras
function grafica_barras_promedio_general() {
    var trace1 = {
        type: 'bar',
        x: gruposNameArray,
        y: promedioFinalPorGrupo,
        marker: {
            color: arrayColores,
        }
    };

    var data = [trace1];

    var layout = { //Titulo de la gráfica
        title: 'Comparación de promedios grupales',
        font: { size: 10 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph1', data, layout, config);
}
grafica_barras_promedio_general(); //Esta ejecuta la gráfica por defecto

//Imprime la gráfica pastel
function grafica_pastel_promedio_general() {

    var data2 = [{
        values: porcentajePromedioEquivalente,
        labels: gruposNameArray,
        type: 'pie',
        marker: {
            colors: arrayColores
        }
    }];

    var layout = { //Titulo de la gráfica
        title: 'Indices porcentuales de promedios',
        font: { size: 10 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph1', data2, layout, config);
}

//Imprime la gráfica lineal
//gruposNameArray
//promediosMultidimensional
function grafica_lineal_promedio_general() {

    //Hacemos una fábrica de objetos
    let objetoTrazos = {};
    let contador = 0;
    //Cantidad de dezplazamientos en x
    let arraysWithASize = generadorArraysWithASize(contadorPosicionesIds);
    //Fábrica....
    gruposNameArray.forEach(grupo => {
        objetoTrazos[contador] = {
            x: arraysWithASize[contador],
            y: promediosMultidimensional[contador++],
            name: grupo,
            type: 'scatter'
        }
    });
    
    let arrayTrazos = Object.values(objetoTrazos);
    console.log('arrayTrazos', arrayTrazos);
    console.log('promediosMultidimensional', promediosMultidimensional)

    //Creamos nuestros objetos con los nombres del trace
    contador=0;
    var data = [];
    arrayTrazos.forEach(trazo => {
        data.push(arrayTrazos[contador++]);
    });

    var layout = { //Titulo de la gráfica
        title: 'Histórico de puntajes en cada evaluación de cada grupo',
        font: { size: 7 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph1', data, layout, config);
}
