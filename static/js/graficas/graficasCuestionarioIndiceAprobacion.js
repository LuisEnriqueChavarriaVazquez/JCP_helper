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

   //Fábrica....
   graficasTitle.forEach(claseAlumno => {
       objetoTrazos[contador] = {
           x: cuestionarioConRespuestas,
           y: aprobacionCuestionarioMultidimensionalCuenta[contador++], //listo
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

   Plotly.newPlot('graph4', data, layout, config);

   //Imprimimos la tendencia global en el encabezado
   let tendenciaGlobalAprobación = document.getElementById('trendGlobalAprobacion');
   tendenciaGlobalAprobación.innerText = arrayPorcentajeAprobacion[0];
}