////////////////////////////////////////////////////////
//Plotly.newPlot('graph2', data, layout, config);

//Creamos textos para identificar el idioma
let español = ['Comparación de promedios grupales', 'Indices porcentuales de promedios', 'Histórico de puntajes en cada evaluación de cada grupo'];
let ingles = ['Comparison of group averages', 'Percentage rates of averages', 'History of scores in each evaluation of each group'];
let portugues = ['Comparação das médias dos grupos', 'Taxas percentuais das médias', 'Histórico das notas em cada avaliação de cada grupo'];
let chino = ['组平均数比较','平均数百分比','每组每次评估的分数历史记录'];
let futureLanguage = [];
let currentLenguage = localStorage.getItem('idioma');
console.log('currentLenguage', currentLenguage)

if (currentLenguage == 'esp') {
  futureLanguage = [...español];
} else if (currentLenguage == 'en') {
  futureLanguage = [...ingles];
} else if (currentLenguage == 'pt') {
  futureLanguage = [...portugues];
} else if (currentLenguage == 'chn') {
  futureLanguage = [...chino];
}

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
        title: `${futureLanguage[0]}`,
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
        title: `${futureLanguage[1]}`,
        font: { size: 10 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph1', data2, layout, config);
}

//Imprime la gráfica lineal
//gruposNameArray
//promediosMultidimensional

//Variable para reporte de grafica 
let elementosGraficaScatter = [];

function grafica_lineal_promedio_general() {
  //Hacemos una fábrica de objetos
  let objetoTrazos = {};
  let contador = 0;
  //Cantidad de dezplazamientos en x
  let arraysWithASize = generadorArraysWithASize(contadorPosicionesIds);
  //Fábrica....
  gruposNameArray.forEach((grupo) => {
    objetoTrazos[contador] = {
      x: arraysWithASize[contador],
      y: promediosMultidimensional[contador++],
      name: grupo,
      type: "scatter",
    };

    //Porción código para datos reporte para historico de puntajes en cada evaluación de cada grupo
    datoGraficaScatter = [
      grupo,
      arraysWithASize[contador - 1],
      promediosMultidimensional[contador],
    ];

    elementosGraficaScatter.push(datoGraficaScatter);
  });

  let arrayTrazos = Object.values(objetoTrazos);
  console.log("arrayTrazos", arrayTrazos);
  console.log("promediosMultidimensional", promediosMultidimensional);

  //Creamos nuestros objetos con los nombres del trace
  contador = 0;
  var data = [];
  arrayTrazos.forEach((trazo) => {
    data.push(arrayTrazos[contador++]);
  });

  var layout = {
    //Titulo de la gráfica
    title: `${futureLanguage[2]}`,
    font: { size: 7 },
  };

  var config = { responsive: true }; //Ajuste responsivo

  Plotly.newPlot("graph1", data, layout, config);
  //Poner datos grafica scatter
  document.getElementById("HistoricoPuntajesEvaluacionGrupo").value =JSON.stringify(elementosGraficaScatter);
}
