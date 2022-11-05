////////////////////////////////////////////////////////
//Imprime la gráfica de barras
function grafica_barras_indice_aprobacion() {
    //Vaciamos de manera manual contenido de la caja
    let container = document.getElementById('graph2');
    container.innerHTML = "";

    //Hacemos una fábrica de objetos
    let objetoTrazos = {};
    let contador = 0;

    //Fábrica....
    graficasTitle.forEach(claseAlumno => {
        objetoTrazos[contador] = {
            x: gruposNameArray,
            y: aprobacionTotal[contador++], //listo
            name: claseAlumno,
            type: 'bar',
        }
    });

    let arrayTrazos = Object.values(objetoTrazos);
    console.log('arrayTrazos', arrayTrazos);

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

    Plotly.newPlot('graph2', data, layout, config);

    //Imprimimos la tendencia global en el encabezado
    let tendenciaGlobalAprobación = document.getElementById('trendGlobalAprobacion');
    tendenciaGlobalAprobación.innerText = arrayPorcentajeAprobacion[0];
}
grafica_barras_indice_aprobacion(); //Esta ejecuta la gráfica por defecto


//Imprime la gráfica pastel
function grafica_pastel_indice_aprobacion() {
    //Vaciamos de manera manual contenido de la caja
    let container = document.getElementById('graph2');
    container.innerHTML = "";

    var data2 = [{
        values: arrayPorcentajeAprobacion,
        labels: graficasTitle,
        type: 'pie',
        marker: {
            colors: ['#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865']
        }
    }];

    var layout = { //Titulo de la gráfica
        title: 'Porcentaje de aprobados vs reprobados',
        font: { size: 10 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph2', data2, layout, config);
}

function barras_porcentage_por_grupo_aprobacion() {
    //Vaciamos de manera manual contenido de la caja
    let container = document.getElementById('graph2');
    container.innerHTML = "";

    //Insertamos contenedor para la informacion
    container.innerHTML = `
        <section class="contenedorAnalisisPorcentage">
            <section class="contenedorAnalisisPorcentage_son1 bordered1 colorGreyWhiter shadow-1e" id="resumenAnalisisAprobados">
                
            </section>
            <section class="contenedorAnalisisPorcentage_son2">
                <div class="significado_dato_son2">
                    <div class="color2 simbologiaBarra bordered1"> </div>
                    <div class="colorTextReverse textoSignificado">Aprobado</div>
                </div>
                <div class="significado_dato_son2">
                    <div class="color3 simbologiaBarra bordered1"> </div>
                    <div class="colorTextReverse textoSignificado">Reprobado</div>
                </div>
            </section>
            <section class="contenedorAnalisisPorcentage_son3" id="dataContainerBarHTML">

            </section>
        </section>
    `;

    //Debemos imprimir los datos de procentage de todos los grupos
    let contenedorAnalisisHtml = document.getElementById('dataContainerBarHTML');
    let contendorGlobalDataAnalisisBar = `
        <div class="containerInfoBarAnalisisAprobacion bordered1 colorGreyWhiter shadow-1e">
            <div class="titleInfoBarAnalisisAprobacion">Global.</div>
            <div class="barContainerInfoBarAnalisisAprobacion">
                <p class="color2 colorText aprobadosBar_analisis" style="width:${porcentageGlobal[0]}%;"> ${porcentageGlobal[0]}% </p>
                <p class="color3 colorText reprobadosBar_analisis" style="width:${porcentageGlobal[1]}%;"> ${porcentageGlobal[1]}% </p> 
            </div>
        </div>
    `;
    contenedorAnalisisHtml.innerHTML = contendorGlobalDataAnalisisBar;

    //Hacemos la impresión del análisis
    let containerAnalisiAprobados = document.getElementById('resumenAnalisisAprobados');
    let contenidoAnalisis = `
        <p class="dato_son1">
            <span class="dato_1_son1">${aprobadosFormatoDiez}</span> / <span class="dato_2_son1">10</span> aprueban.
        </p>
    `
    containerAnalisiAprobados.innerHTML = contenidoAnalisis;

    //Insertamos todos los procentajes de los grupos.
    nombreGrupos_unitario.forEach((nombre, i = 0) => {
        contendorGlobalDataAnalisisBar = `
            <div class="containerInfoBarAnalisisAprobacion bordered1 colorGreyWhiter shadow-1e">
                <div class="titleInfoBarAnalisisAprobacion">${nombre}</div>
                <div class="barContainerInfoBarAnalisisAprobacion">
                    <p class="color2 colorText aprobadosBar_analisis" style="width:${porcentagesDividosPorGrupo[i][0]}%;"> ${porcentagesDividosPorGrupo[i][0]}% </p>
                    <p class="color3 colorText reprobadosBar_analisis" style="width:${porcentagesDividosPorGrupo[i][1]}%;"> ${porcentagesDividosPorGrupo[i][1]}% </p> 
                </div>
            </div>
        `;
        contenedorAnalisisHtml.innerHTML += contendorGlobalDataAnalisisBar;
    });

}   