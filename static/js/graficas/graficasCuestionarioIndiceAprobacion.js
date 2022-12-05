//Creamos textos para identificar el idioma
let español_3 = ['Aciertos', 'Error', 'Opción multiple', 'Rellenar espacios', 'Ejercicios', 'Arrastrar', 'Falso/verdadero', 'Pregunta abierta', 'Tiempo promedio en horas respuestas cuestionario.', 'Comparación de reprobados vs aprobados'];
let ingles_3 = ['Good ones','Errors','Multiple choice','Fill in the blanks','Exercises','Drag and drop','True/False','Open question', 'Average time in hours to answer the questionnaire.', 'Comparison of failed vs. approved'];
let portugues_3 = ['Acertos','Erro','Múltipla escolha','Preencher os espaços em branco','Exercícios','Arrastar','Verdadeiro/Falso','Pergunta aberta', 'Tempo médio em horas para responder o questionário.', 'Comparativo de reprovado x aprovado'];
let chino_3 = ['命中', '错误', '多项选择', '填空', '习题', '拖动', '判断题', '开题', '回答问卷的平均时间（以小时为单位）。','失败与批准的比较'];
let futureLanguage_3 = [];
let currentLenguage_3 = localStorage.getItem('idioma');
console.log('currentLenguage_3', currentLenguage_3)

if (currentLenguage_3 == 'esp') {
  futureLanguage_3 = [...español_3];
} else if (currentLenguage_3 == 'en') {
  futureLanguage_3 = [...ingles_3];
} else if (currentLenguage_3 == 'pt') {
  futureLanguage_3 = [...portugues_3];
} else if (currentLenguage_3 == 'chn') {
  futureLanguage_3 = [...chino_3];
}

////////////////////////////////////////////////////////
//Imprime la gráfica de barras
function grafica_tiempo_general_respuesta_cuestinario() {
  //Vaciamos de manera manual contenido de la caja
  let container = document.getElementById('graph4');
  container.innerHTML = "";

  var trace1 = {
    type: 'bar',
    x: cuestionarioConRespuestas,
    y: promedioTiempoPorCuestionario, //Promedio de tiempo
    marker: {
      color: arrayColores
    }
  };

  var data = [trace1];

  var layout = { //Titulo de la gráfica
    title: `${futureLanguage_3.at(-1)}`,
    font: { size: 10 }
  };

  var config = { responsive: true } //Ajuste responsivo

  Plotly.newPlot('graph4', data, layout, config);
}
grafica_tiempo_general_respuesta_cuestinario(); //Esta ejecuta la gráfica por defecto


function grafica_aprobados_reprobados_por_cuestionario() {
  //Vaciamos de manera manual contenido de la caja
  let container = document.getElementById("graph4");
  container.innerHTML = "";

  //Hacemos una fábrica de objetos
  let objetoTrazos = {};
  let contador = 0;

  //Array colores duales
  let arrayColoresDuales = [];
  arrayColoresDuales.push(arrayColores[1], arrayColores[4]);

  //Elementos de reporte
  let reprobadosAprobadosCuestiBarra = [];

  //Fábrica....
  graficasTitle.forEach((claseAlumno, i = 0) => {
    objetoTrazos[contador] = {
      x: cuestionarioConRespuestas,
      y: aprobacionCuestionarioMultidimensionalCuenta[contador++], //listo
      name: claseAlumno,
      type: "bar",
      marker: { color: `${arrayColoresDuales[i++]}` },
    };
    elementoReprobadosAprobadosCuestiBarra = [
      claseAlumno,
      cuestionarioConRespuestas,
      aprobacionCuestionarioMultidimensionalCuenta[contador - 1],
    ];
    reprobadosAprobadosCuestiBarra.push(elementoReprobadosAprobadosCuestiBarra);

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
    title: `${futureLanguage_3.at(-2)}`,
    font: { size: 10 },
    barmode: "stack",
  };

  var config = { responsive: true }; //Ajuste responsivo

  Plotly.newPlot("graph4", data, layout, config);

  //Imprimimos la tendencia global en el encabezado
  let tendenciaGlobalAprobación = document.getElementById(
    "trendGlobalAprobacion"
  );
  tendenciaGlobalAprobación.innerText = arrayPorcentajeAprobacion[0];
  document.getElementById("aprobadosReprobadosCuestionarioBarra").value = JSON.stringify(reprobadosAprobadosCuestiBarra);
}

function porcentaje_aciertos_tipo_pregunta() {
  //Vaciamos de manera manual contenido de la caja
  let container = document.getElementById("graph4");
  container.innerHTML = "";

  //Insertamos contenedor para la informacion
  container.innerHTML = `
        <section class="contenedorAnalisisPorcentage">
            <section class="contenedorAnalisisPorcentage_son2">
                <div class="significado_dato_son2">
                    <div class="color2 simbologiaBarra bordered1"> </div>
                    <div class="colorTextReverse textoSignificado">${futureLanguage_3[0]}</div>
                </div>
                <div class="significado_dato_son2">
                    <div class="color3 simbologiaBarra bordered1"> </div>
                    <div class="colorTextReverse textoSignificado">${futureLanguage_3[1]}</div>
                </div>
                <div class="significado_dato_son3">
                    <div class="containerSimbologiaTipoPregunta">
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>   
                        <div class="colorTextReverse textoTipoPregunta">Opt1 = <span class="tipoPreguntaSpan">${futureLanguage_3[2]}</span></div>
                    </div>    
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt2 = <span class="tipoPreguntaSpan">${futureLanguage_3[3]}</span></div>
                    </div>
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt3 = <span class="tipoPreguntaSpan">${futureLanguage_3[4]}</span></div>
                    </div>
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt4 = <span class="tipoPreguntaSpan">${futureLanguage_3[5]}</span></div>
                    </div>
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt5 = <span class="tipoPreguntaSpan">${futureLanguage_3[6]}</span></div>
                    </div>
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt6 = <span class="tipoPreguntaSpan">${futureLanguage_3[7]}</span></div>
                    </div>
                </div>
            </section>
            <section class="contenedorAnalisisPorcentage_son3" id="dataContainerBarHTML2">

            </section>
        </section>
    `;

  //Variable para reporte de porcentaje de aciertos de tipo de pregunta
  let porcentajeAciertosTipoPregunta = [];

  //Debemos imprimir los datos de procentage de todos los grupos
  let contenedorAnalisisHtml = document.getElementById("dataContainerBarHTML2");
  //Insertamos todos los procentajes de los grupos.
  nombreTipoPregunta.forEach((nombre, i = 0) => {
    contendorGlobalDataAnalisisBar = `
            <div class="containerInfoBarAnalisisAprobacion bordered1 colorGreyWhiter shadow-1e">
                <div class="titleInfoBarAnalisisAprobacion colorTextReverse">${nombre}</div>
                <div class="barContainerInfoBarAnalisisAprobacion">
                    <p class="color2 colorText aprobadosBar_analisis" style="width: ${optTotalTipoPregunta[i][1]}%;"> ${optTotalTipoPregunta[i][1]}% </p>
                    <p class="color3 colorText reprobadosBar_analisis" style="width: ${optTotalTipoPregunta[i][0]}%;"> ${optTotalTipoPregunta[i][0]}% </p> 
                </div>
            </div>
        `;
    contenedorAnalisisHtml.innerHTML += contendorGlobalDataAnalisisBar;
    elementoTipoPregunta = [
      nombre,
      optTotalTipoPregunta[i][1],
      optTotalTipoPregunta[i][0],
    ];
    porcentajeAciertosTipoPregunta.push(elementoTipoPregunta);
  });
  document.getElementById("porcentajeAciertosTipoPregunta").value = JSON.stringify(porcentajeAciertosTipoPregunta);
}