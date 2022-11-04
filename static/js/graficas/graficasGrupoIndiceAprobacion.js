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
            type: 'bar',
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


//Imprime la gráfica pastel
function grafica_pastel_indice_aprobacion() {
    var data2 = [{
        values: arrayPorcentajeAprobacion,
        labels: graficasTitle,
        type: 'pie',
        marker: {
            colors: ['#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865']
        }
    }];

    var layout = { //Titulo de la gráfica
        title: 'Reprobados vs Aprobados',
        font: { size: 10 }
    };

    var config = { responsive: true } //Ajuste responsivo

    Plotly.newPlot('graph2', data2, layout, config);
}

function barras_porcentage_por_grupo_aprobacion(){
    //Vaciamos de manera manual contenido de la caja
    let container = document.getElementById('graph2');
    container.innerHTML = "";

    container.innerHTML = `
        <section class="contenedorAnalisisPorcentage">
            <section class="contenedorAnalisisPorcentage_son1 bordered1 colorGreyWhiter shadow-1e">
                <p class="dato_son1">
                    <span class="dato_1_son1">2</span> / <span class="dato_2_son1">10</span> aprueban.
                </p>
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
            <section class="contenedorAnalisisPorcentage_son3>

            </section>
        </section>
    `;
}