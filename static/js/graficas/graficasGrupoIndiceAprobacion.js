////////////////////////////////////////////////////////
//Imprime la gráfica de barras
function grafica_barras_indice_aprobacion() {

    //Hacemos una fábrica de objetos
    let objetoTrazos = {};
    let contador = 0;

    //Fábrica....
    graficasTitle.forEach(claseAlumno => {
        objetoTrazos[contador] = {
            x: gruposNameArray,
            y: aprobacionTotal[contador++], //listo
            name: claseAlumno,
            type: 'bar'
        }
    });

    let arrayTrazos = Object.values(objetoTrazos);
    console.log('arrayTrazos', arrayTrazos);

    //Creamos nuestros objetos con los nombres del trace
    contador=0;
    var data = [];
    arrayTrazos.forEach(trazo => {
        data.push(arrayTrazos[contador++]);
    });

    var layout = { //Titulo de la gráfica
        title: 'Comparison',
        font: { size: 10 },
        barmode: 'stack',
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph2', data, layout, config);
}
grafica_barras_indice_aprobacion(); //Esta ejecuta la gráfica por defecto
