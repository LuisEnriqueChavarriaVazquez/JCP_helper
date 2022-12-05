//Creamos textos para identificar el idioma
let español_1 = ['Comparación de reprobados vs aprobados', 'Porcentaje de aprobados vs reprobados', 'Aprobado', 'Reprobado', 'Global.', 'aprueban.'];
let ingles_1 = ['Comparison fail vs pass', 'Percent pass vs fail', 'Pass', 'Fail', 'Global.', 'pass.'];
let portugues_1 = ['Comparação reprovado x aprovado', 'Porcentagem de aprovados vs reprovados', 'Aprovado', 'Reprovado', 'Global.', 'aprovado.'];
let chino_1 = ['比较失败与通过','通过与失败的百分比','通过','失败','全局','通过'];
let español_2 = ['Aprobado','Reprobado'];
let ingles_2 = ['Approved','Failed'];
let portugues_2 = ['Aprovado','Reprovado'];
let chino_2 = ['通过', '失败'];
let futureLanguage_1 = [];
let futureLanguage_2 = [];
let currentLenguage_1 = localStorage.getItem('idioma');
console.log('currentLenguage_1', currentLenguage_1)

if (currentLenguage_1 == 'esp') {
  futureLanguage_1 = [...español_1];
  futureLanguage_2 = [...español_2];
} else if (currentLenguage_1 == 'en') {
  futureLanguage_1 = [...ingles_1];
  futureLanguage_2 = [...ingles_2];
} else if (currentLenguage_1 == 'pt') {
  futureLanguage_1 = [...portugues_1];
  futureLanguage_2 = [...portugues_2];
} else if (currentLenguage_1 == 'chn') {
  futureLanguage_1 = [...chino_1];
  futureLanguage_2 = [...chino_2];
}

////////////////////////////////////////////////////////
//Imprime la gráfica de barras
function grafica_barras_indice_aprobacion() {
  //Vaciamos de manera manual contenido de la caja
  let container = document.getElementById("graph2");
  container.innerHTML = "";

  //Hacemos una fábrica de objetos
  let objetoTrazos = {};
  let contador = 0;

  //Array colores duales
  let arrayColoresDuales = [];
  arrayColoresDuales.push(arrayColores[1], arrayColores[4]);

  //Elementos de reporte
  let comparacionReprovadosAprovadosBarra = [];

  //Fábrica....
  graficasTitle.forEach((claseAlumno, i = 0) => {
    objetoTrazos[contador] = {
      x: gruposNameArray,
      y: aprobacionTotal[contador++], //listo
      name: claseAlumno,
      type: "bar",
      marker: { color: `${arrayColoresDuales[i++]}` },
    };
    elementoReprovadosAprovadosBarra = [
      claseAlumno,
      gruposNameArray,
      aprobacionTotal[contador - 1],
    ];
    comparacionReprovadosAprovadosBarra.push(elementoReprovadosAprovadosBarra);
  });

  let arrayTrazos = Object.values(objetoTrazos);
  console.log("arrayTrazos", arrayTrazos);

  //Creamos nuestros objetos con los nombres del trace
  contador = 0;
  var data = [];
  arrayTrazos.forEach((trazo) => {
    data.push(arrayTrazos[contador++]);
  });

  var layout = {
    //Titulo de la gráfica
    title: `${futureLanguage_1[0]}`,
    font: { size: 10 },
    barmode: "stack",
  };

  var config = { responsive: true }; //Ajuste responsivo

  Plotly.newPlot("graph2", data, layout, config);

  //Imprimimos la tendencia global en el encabezado
  let tendenciaGlobalAprobación = document.getElementById(
    "trendGlobalAprobacion"
  );
  tendenciaGlobalAprobación.innerText = arrayPorcentajeAprobacion[0];
  document.getElementById("comparacionReprovadosAprovadosBarra").value =
    JSON.stringify(comparacionReprovadosAprovadosBarra);
}
grafica_barras_indice_aprobacion(); //Esta ejecuta la gráfica por defecto


//Imprime la gráfica pastel
function grafica_pastel_indice_aprobacion() {
    //Vaciamos de manera manual contenido de la caja
    let container = document.getElementById('graph2');
    container.innerHTML = "";

    var data2 = [{
        values: arrayPorcentajeAprobacion,
        labels: futureLanguage_2,
        type: 'pie',
        marker: {
            colors: arrayColores
        }
    }];

    var layout = { //Titulo de la gráfica
        title: `${futureLanguage_1[1]}`,
        font: { size: 10 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph2', data2, layout, config);
}

//Variables para los reportes Aprobación general de grupos.
var aprobadosFormatoDiezReporte = aprobadosFormatoDiez;
var porcentajeGlobalAprobadorReporte = porcentageGlobal[0];
var porcentajeGlobalReprobadorReporte = porcentageGlobal[1];
let gruposAprobadosReprobadosReporte = [];

function barras_porcentage_por_grupo_aprobacion() {
  //Vaciamos de manera manual contenido de la caja
  let container = document.getElementById("graph2");
  container.innerHTML = "";

  //Insertamos contenedor para la informacion
  container.innerHTML = `
        <section class="contenedorAnalisisPorcentage">
            <section class="contenedorAnalisisPorcentage_son1 bordered1 colorGreyWhiter shadow-1e" id="resumenAnalisisAprobados">
                
            </section>
            <section class="contenedorAnalisisPorcentage_son2">
                <div class="significado_dato_son2">
                    <div class="color2 simbologiaBarra bordered1"> </div>
                    <div class="colorTextReverse textoSignificado">${futureLanguage_1[2]}</div>
                </div>
                <div class="significado_dato_son2">
                    <div class="color3 simbologiaBarra bordered1"> </div>
                    <div class="colorTextReverse textoSignificado">${futureLanguage_1[3]}</div>
                </div>
            </section>
            <section class="contenedorAnalisisPorcentage_son3" id="dataContainerBarHTML">

            </section>
        </section>
    `;

  //Debemos imprimir los datos de procentage de todos los grupos
  let contenedorAnalisisHtml = document.getElementById("dataContainerBarHTML");
  let contendorGlobalDataAnalisisBar = `
        <div class="containerInfoBarAnalisisAprobacion bordered1 colorGreyWhiter shadow-1e">
            <div class="titleInfoBarAnalisisAprobacion colorTextReverse">${futureLanguage_1[4]}</div>
            <div class="barContainerInfoBarAnalisisAprobacion">
                <p class="color2 colorText aprobadosBar_analisis" style="width:${porcentageGlobal[0]}%;"> ${porcentageGlobal[0]}% </p>
                <p class="color3 colorText reprobadosBar_analisis" style="width:${porcentageGlobal[1]}%;"> ${porcentageGlobal[1]}% </p> 
            </div>
        </div>
    `;
  contenedorAnalisisHtml.innerHTML = contendorGlobalDataAnalisisBar;

  //Hacemos la impresión del análisis
  let containerAnalisiAprobados = document.getElementById(
    "resumenAnalisisAprobados"
  );
  let contenidoAnalisis = `
        <p class="dato_son1">
            <span class="dato_1_son1">${aprobadosFormatoDiez}</span> / <span class="dato_2_son1">10</span> ${futureLanguage_1[5]}
        </p>
    `;
  containerAnalisiAprobados.innerHTML = contenidoAnalisis;

  //Insertamos todos los procentajes de los grupos.
  nombreGrupos_unitario.forEach((nombre, i = 0) => {
    contendorGlobalDataAnalisisBar = `
            <div class="containerInfoBarAnalisisAprobacion bordered1 colorGreyWhiter shadow-1e">
                <div class="titleInfoBarAnalisisAprobacion colorTextReverse">${nombre}</div>
                <div class="barContainerInfoBarAnalisisAprobacion">
                    <p class="color2 colorText aprobadosBar_analisis" style="width:${porcentagesDividosPorGrupo[i][0]}%;"> ${porcentagesDividosPorGrupo[i][0]}% </p>
                    <p class="color3 colorText reprobadosBar_analisis" style="width:${porcentagesDividosPorGrupo[i][1]}%;"> ${porcentagesDividosPorGrupo[i][1]}% </p> 
                </div>
            </div>
        `;
    //Elementos para el reporte
    grupoReporte = [
      nombre,
      porcentagesDividosPorGrupo[i][0],
      porcentagesDividosPorGrupo[i][1],
    ];

    gruposAprobadosReprobadosReporte.push(grupoReporte);
    contenedorAnalisisHtml.innerHTML += contendorGlobalDataAnalisisBar;
  });
  //Elementos para los reportes
  document.getElementById("gruposAprobadosReprobadosReporte").value =
    JSON.stringify(gruposAprobadosReprobadosReporte);
}   