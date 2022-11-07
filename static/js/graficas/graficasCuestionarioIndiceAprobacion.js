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
        title: 'Tiempo promedio en horas respuestas cuestionario.',
        font: { size: 10 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph4', data, layout, config);
}
grafica_tiempo_general_respuesta_cuestinario(); //Esta ejecuta la gráfica por defecto


function grafica_aprobados_reprobados_por_cuestionario() {
    //Vaciamos de manera manual contenido de la caja
    let container = document.getElementById('graph4');
    container.innerHTML = "";

    //Hacemos una fábrica de objetos
    let objetoTrazos = {};
    let contador = 0;

    //Array colores duales
    let arrayColoresDuales = [];
    arrayColoresDuales.push(arrayColores[1],arrayColores[4]);

    //Fábrica....
    graficasTitle.forEach((claseAlumno, i = 0) => {
        objetoTrazos[contador] = {
            x: cuestionarioConRespuestas,
            y: aprobacionCuestionarioMultidimensionalCuenta[contador++], //listo
            name: claseAlumno,
            type: 'bar',
            marker: {color: `${arrayColoresDuales[i++]}`}
        }
    });

    let arrayTrazos = Object.values(objetoTrazos);
    console.log('aprobacionCuestionarioMultidimensionalCuenta', aprobacionCuestionarioMultidimensionalCuenta);

    //Creamos nuestros objetos con los nombres del trace
    contador = 0;
    var data = [];
    arrayTrazos.forEach(trazo => {
        data.push(arrayTrazos[contador++]);
    });

    var layout = { //Titulo de la gráfica
        title: 'Comparación de reprobados vs aprobados',
        font: { size: 10 },
        barmode: 'stack',
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph4', data, layout, config);

    //Imprimimos la tendencia global en el encabezado
    let tendenciaGlobalAprobación = document.getElementById('trendGlobalAprobacion');
    tendenciaGlobalAprobación.innerText = arrayPorcentajeAprobacion[0];
}

function porcentaje_aciertos_tipo_pregunta() {
    //Vaciamos de manera manual contenido de la caja
    let container = document.getElementById('graph4');
    container.innerHTML = "";

    //Insertamos contenedor para la informacion
    container.innerHTML = `
        <section class="contenedorAnalisisPorcentage">
            <section class="contenedorAnalisisPorcentage_son2">
                <div class="significado_dato_son2">
                    <div class="color2 simbologiaBarra bordered1"> </div>
                    <div class="colorTextReverse textoSignificado">Aciertos</div>
                </div>
                <div class="significado_dato_son2">
                    <div class="color3 simbologiaBarra bordered1"> </div>
                    <div class="colorTextReverse textoSignificado">Error</div>
                </div>
                <div class="significado_dato_son3">
                    <div class="containerSimbologiaTipoPregunta">
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>   
                        <div class="colorTextReverse textoTipoPregunta">Opt1 = <span class="tipoPreguntaSpan">Opción multiple</span></div>
                    </div>    
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt2 = <span class="tipoPreguntaSpan">Rellenar espacios</span></div>
                    </div>
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt3 = <span class="tipoPreguntaSpan">Ejercicios</span></div>
                    </div>
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt4 = <span class="tipoPreguntaSpan">Arrastrar</span></div>
                    </div>
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt5 = <span class="tipoPreguntaSpan">Falso/verdadero</span></div>
                    </div>
                    <div class="containerSimbologiaTipoPregunta">    
                        <div class="color5 simbologiaBarraPequeno bordered1"> </div>
                        <div class="colorTextReverse textoTipoPregunta">Opt6 = <span class="tipoPreguntaSpan">Pregunta abierta</span></div>
                    </div>
                </div>
            </section>
            <section class="contenedorAnalisisPorcentage_son3" id="dataContainerBarHTML2">

            </section>
        </section>
    `;

    //Debemos imprimir los datos de procentage de todos los grupos
    let contenedorAnalisisHtml = document.getElementById('dataContainerBarHTML2');
    //Insertamos todos los procentajes de los grupos.
    nombreTipoPregunta.forEach((nombre, i = 0) => {
        contendorGlobalDataAnalisisBar = `
            <div class="containerInfoBarAnalisisAprobacion bordered1 colorGreyWhiter shadow-1e">
                <div class="titleInfoBarAnalisisAprobacion">${nombre}</div>
                <div class="barContainerInfoBarAnalisisAprobacion">
                    <p class="color2 colorText aprobadosBar_analisis" style="width: ${optTotalTipoPregunta[i][1]}%;"> ${optTotalTipoPregunta[i][1]}% </p>
                    <p class="color3 colorText reprobadosBar_analisis" style="width: ${optTotalTipoPregunta[i][0]}%;"> ${optTotalTipoPregunta[i][0]}% </p> 
                </div>
            </div>
        `;
        contenedorAnalisisHtml.innerHTML += contendorGlobalDataAnalisisBar;
    });
}