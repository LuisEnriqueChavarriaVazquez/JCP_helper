//Obtenemos los datos del usuario
let dataUserToShow = document.getElementById('datos_cuestionario_hechos_alumno').value;
//Data limpia
let dataClean = limpiarDatos(dataUserToShow);
/////////////////////////////////////////////////
//Limpiamos los datos del usuario
function limpiarDatos(string) {

    if (string == "noData") {
        return "noData"
    }

    //Como en python eran tuplas, necesitamos convertir todo en array
    string = string.replaceAll('(', '[');
    string = string.replaceAll(')', ']');
    string = string.replace('],]', ']]');
    string = string.replace(']]]]', ']]');
    string = string.replace('[[[[', '[[');
    string = string.replaceAll("\'", "\"");
    string = string.replaceAll("None", "0");
    //Son los datos de los cuestionarios evaluados. (en estado ready)
    string = JSON.parse(string);
    return string
}

correrLogicaGraficas(dataClean)

function correrLogicaGraficas(dataClean) {
    if (dataClean != "noData") {

        //Obtenemos los puntos de cada una de las preguntas
        function obtenerPuntos() {
            //Obtener solo los puntos en crudo
            let puntosCrudos = dataClean.map(element => {
                return element[8]
            })
            //console.log('puntosCrudos', puntosCrudos)

            //Obtener solo los que no dicen pending
            let puntosFiltadros = puntosCrudos.filter(element => {
                if (element != "pending") {
                    return element[8];
                }
            })
            console.log('puntosFiltadros', puntosFiltadros)

            //Debemos dividir cada string segun el tipo de pregunta.
            let opt1 = [];
            let opt2 = [];
            let opt3 = [];
            let opt4 = [];
            let opt5 = [];
            let opt6 = [];

            //Separamos los puntos por tipos de pregunta
            puntosFiltadros.forEach(element => {
                let dividido = element.split(',');
                opt1.push(dividido[0]);
                opt2.push(dividido[1]);
                opt3.push(dividido[2]);
                opt4.push(dividido[3]);
                opt5.push(dividido[4]);
                opt6.push(dividido[5]);
            });

            //Recorremos cada array y separamos cada elementos en dos
            let total_opt1 = [];
            let total_opt2 = [];
            let total_opt3 = [];
            let total_opt4 = [];
            let total_opt5 = [];
            let total_opt6 = [];
            let obtenido_opt1 = [];
            let obtenido_opt2 = [];
            let obtenido_opt3 = [];
            let obtenido_opt4 = [];
            let obtenido_opt5 = [];
            let obtenido_opt6 = [];

            //Hacemos la division de cada uno de los tipos de preguntas
            opt1.forEach(element => {
                let dividido = element.split('/');
                total_opt1.push(parseFloat(dividido[0]));
                obtenido_opt1.push(parseFloat(dividido[1]));
            })

            opt2.forEach(element => {
                let dividido = element.split('/');
                total_opt2.push(parseFloat(dividido[0]));
                obtenido_opt2.push(parseFloat(dividido[1]));
            })

            opt3.forEach(element => {
                let dividido = element.split('/');
                total_opt3.push(parseFloat(dividido[0]));
                obtenido_opt3.push(parseFloat(dividido[1]));
            })

            opt4.forEach(element => {
                let dividido = element.split('/');
                total_opt4.push(parseFloat(dividido[0]));
                obtenido_opt4.push(parseFloat(dividido[1]));
            })

            opt5.forEach(element => {
                let dividido = element.split('/');
                total_opt5.push(parseFloat(dividido[0]));
                obtenido_opt5.push(parseFloat(dividido[1]));
            })

            opt6.forEach(element => {
                let dividido = element.split('/');
                total_opt6.push(parseFloat(dividido[0]));
                obtenido_opt6.push(parseFloat(dividido[1]));
            })

            // console.log(total_opt1,total_opt2,total_opt3,total_opt4,total_opt5,total_opt6);
            // console.log(obtenido_opt1,obtenido_opt2,obtenido_opt3,obtenido_opt4,obtenido_opt5,obtenido_opt6)

            // 2/1 Las primeras son las totales
            let puntosObtenidos = [total_opt1, total_opt2, total_opt3, total_opt4, total_opt5, total_opt6];
            let puntosTotales = [obtenido_opt1, obtenido_opt2, obtenido_opt3, obtenido_opt4, obtenido_opt5, obtenido_opt6];
            let puntosTotalFinal = [[...puntosObtenidos], [...puntosTotales]];
            return puntosTotalFinal;
        }

        //Debemos trabajr con los datos que tenemos aquí
        let puntosTotalesFinal = obtenerPuntos();

        //Funcion para hacer la suma de todos los puntos
        function totalPuntosSuma() {
            //Datos con los que trabajr
            let puntosSumaCopia = [...puntosTotalesFinal];
            let puntosSumaCopia_total = puntosTotalesFinal[0];
            let puntosSumaCopia_obtenida = puntosTotalesFinal[1];
            //Valores de la suma para su retorno
            let valorFinalTotal = 0;
            let valorTotal_mio = 0;
            let valorObtenido_mio = 0;
            //Suma de todo
            puntosSumaCopia.forEach(element => {
                element.forEach((element_dos, i = 1) => {
                    let valorParcial = element_dos.reduce((sum, val) => {
                        return sum + val;
                    });
                    valorFinalTotal += valorParcial;
                })
            })

            //Suma de los totales
            puntosSumaCopia_total.forEach(element => {
                let sumaParcial = element.reduce((sum, val) => {
                    return sum + val;
                });
                valorTotal_mio += sumaParcial;
            })

            //Suma de los obtenidos
            puntosSumaCopia_obtenida.forEach(element => {
                let sumaParcial = element.reduce((sum, val) => {
                    return sum + val;
                });
                valorObtenido_mio += sumaParcial;
            })

            //Debemos obtener los procentages para el width de una vez
            let hundred = valorFinalTotal;
            let first_per = parseFloat(((valorTotal_mio * 100) / hundred).toFixed(1)) + '%';
            let second_per = parseFloat(((valorObtenido_mio * 100) / hundred).toFixed(1)) + '%';

            //Asignamos los anchos y los puntos
            let goodElement = document.getElementById('good_1');
            let badElement = document.getElementById('bad_1');

            goodElement.textContent = valorFinalTotal + ' total pts.';
            badElement.textContent = valorObtenido_mio + ''
            goodElement.setAttribute('style', 'width:' + first_per);
            badElement.setAttribute('style', 'width:' + second_per);

            console.log(valorTotal_mio, valorObtenido_mio, first_per, second_per);

        }
        totalPuntosSuma()

        //Hacemos la funcio para el calculo de los puntos de las preguntas de tipo OPT1
        function puntosOpt1_grafica() {
            //Datos con los que trabajar
            let puntosSumaCopia = [...puntosTotalesFinal];
            let puntosSumaCopia_total = puntosSumaCopia[0][0];
            let puntosSumaCopia_obtenida = puntosSumaCopia[1][0];
            //Accedemos a los elementos en las graficas
            let goodElement = document.getElementById('good_2');
            let badElement = document.getElementById('bad_2');

            let valorTotal = 0;
            let valorParcial = 0;
            //Suma de los totales
            let sumaParcial_1 = puntosSumaCopia_total.reduce((sum, val) => {
                return sum + val;
            });
            valorTotal += sumaParcial_1;

            //Suma de los obtenidos
            let sumaParcial_2 = puntosSumaCopia_obtenida.reduce((sum, val) => {
                return sum + val;
            });
            valorParcial += sumaParcial_2;

            //Debemos obtener los procentages para el width de una vez
            let hundred = valorTotal + valorParcial;
            let first_per = parseFloat(((valorTotal * 100) / hundred).toFixed(1)) + '%';
            let second_per = parseFloat(((valorParcial * 100) / hundred).toFixed(1)) + '%';

            goodElement.textContent = valorTotal + ' total pts.';
            badElement.textContent = valorParcial + ''
            goodElement.setAttribute('style', 'width:' + first_per);
            badElement.setAttribute('style', 'width:' + second_per);

            console.log(valorTotal, valorParcial, first_per, second_per)
        }
        puntosOpt1_grafica();

        //Hacemos la funcio para el calculo de los puntos de las preguntas de tipo OPT2
        function puntosOpt2_grafica() {
            //Datos con los que trabajar
            let puntosSumaCopia = [...puntosTotalesFinal];
            let puntosSumaCopia_total = puntosSumaCopia[0][1];
            let puntosSumaCopia_obtenida = puntosSumaCopia[1][1];
            //Accedemos a los elementos en las graficas
            let goodElement = document.getElementById('good_3');
            let badElement = document.getElementById('bad_3');

            let valorTotal = 0;
            let valorParcial = 0;
            //Suma de los totales
            let sumaParcial_1 = puntosSumaCopia_total.reduce((sum, val) => {
                return sum + val;
            });
            valorTotal += sumaParcial_1;

            //Suma de los obtenidos
            let sumaParcial_2 = puntosSumaCopia_obtenida.reduce((sum, val) => {
                return sum + val;
            });
            valorParcial += sumaParcial_2;

            //Debemos obtener los procentages para el width de una vez
            let hundred = valorTotal + valorParcial;
            let first_per = parseFloat(((valorTotal * 100) / hundred).toFixed(1)) + '%';
            let second_per = parseFloat(((valorParcial * 100) / hundred).toFixed(1)) + '%';

            goodElement.textContent = valorTotal + ' total pts.';
            badElement.textContent = valorParcial + ''
            goodElement.setAttribute('style', 'width:' + first_per);
            badElement.setAttribute('style', 'width:' + second_per);

            console.log(valorTotal, valorParcial, first_per, second_per)
        }
        puntosOpt2_grafica();

        //Hacemos la funcio para el calculo de los puntos de las preguntas de tipo OPT3
        function puntosOpt3_grafica() {
            //Datos con los que trabajar
            let puntosSumaCopia = [...puntosTotalesFinal];
            let puntosSumaCopia_total = puntosSumaCopia[0][2];
            let puntosSumaCopia_obtenida = puntosSumaCopia[1][2];
            //Accedemos a los elementos en las graficas
            let goodElement = document.getElementById('good_4');
            let badElement = document.getElementById('bad_4');

            let valorTotal = 0;
            let valorParcial = 0;
            //Suma de los totales
            let sumaParcial_1 = puntosSumaCopia_total.reduce((sum, val) => {
                return sum + val;
            });
            valorTotal += sumaParcial_1;

            //Suma de los obtenidos
            let sumaParcial_2 = puntosSumaCopia_obtenida.reduce((sum, val) => {
                return sum + val;
            });
            valorParcial += sumaParcial_2;

            //Debemos obtener los procentages para el width de una vez
            let hundred = valorTotal + valorParcial;
            let first_per = parseFloat(((valorTotal * 100) / hundred).toFixed(1)) + '%';
            let second_per = parseFloat(((valorParcial * 100) / hundred).toFixed(1)) + '%';

            goodElement.textContent = valorTotal + ' total pts.';
            badElement.textContent = valorParcial + ''
            goodElement.setAttribute('style', 'width:' + first_per);
            badElement.setAttribute('style', 'width:' + second_per);

            console.log(valorTotal, valorParcial, first_per, second_per)
        }
        puntosOpt3_grafica();

        //Hacemos la funcio para el calculo de los puntos de las preguntas de tipo OPT4
        function puntosOpt4_grafica() {
            //Datos con los que trabajar
            let puntosSumaCopia = [...puntosTotalesFinal];
            let puntosSumaCopia_total = puntosSumaCopia[0][3];
            let puntosSumaCopia_obtenida = puntosSumaCopia[1][3];
            //Accedemos a los elementos en las graficas
            let goodElement = document.getElementById('good_5');
            let badElement = document.getElementById('bad_5');

            let valorTotal = 0;
            let valorParcial = 0;
            //Suma de los totales
            let sumaParcial_1 = puntosSumaCopia_total.reduce((sum, val) => {
                return sum + val;
            });
            valorTotal += sumaParcial_1;

            //Suma de los obtenidos
            let sumaParcial_2 = puntosSumaCopia_obtenida.reduce((sum, val) => {
                return sum + val;
            });
            valorParcial += sumaParcial_2;

            //Debemos obtener los procentages para el width de una vez
            let hundred = valorTotal + valorParcial;
            let first_per = parseFloat(((valorTotal * 100) / hundred).toFixed(1)) + '%';
            let second_per = parseFloat(((valorParcial * 100) / hundred).toFixed(1)) + '%';

            goodElement.textContent = valorTotal + ' total pts.';
            badElement.textContent = valorParcial + ''
            goodElement.setAttribute('style', 'width:' + first_per);
            badElement.setAttribute('style', 'width:' + second_per);

            console.log(valorTotal, valorParcial, first_per, second_per)
        }
        puntosOpt4_grafica();

        //Hacemos la funcio para el calculo de los puntos de las preguntas de tipo OPT5
        function puntosOpt5_grafica() {
            //Datos con los que trabajar
            let puntosSumaCopia = [...puntosTotalesFinal];
            let puntosSumaCopia_total = puntosSumaCopia[0][4];
            let puntosSumaCopia_obtenida = puntosSumaCopia[1][4];
            //Accedemos a los elementos en las graficas
            let goodElement = document.getElementById('good_6');
            let badElement = document.getElementById('bad_6');

            let valorTotal = 0;
            let valorParcial = 0;
            //Suma de los totales
            let sumaParcial_1 = puntosSumaCopia_total.reduce((sum, val) => {
                return sum + val;
            });
            valorTotal += sumaParcial_1;

            //Suma de los obtenidos
            let sumaParcial_2 = puntosSumaCopia_obtenida.reduce((sum, val) => {
                return sum + val;
            });
            valorParcial += sumaParcial_2;

            //Debemos obtener los procentages para el width de una vez
            let hundred = valorTotal + valorParcial;
            let first_per = parseFloat(((valorTotal * 100) / hundred).toFixed(1)) + '%';
            let second_per = parseFloat(((valorParcial * 100) / hundred).toFixed(1)) + '%';

            goodElement.textContent = valorTotal + ' total pts.';
            badElement.textContent = valorParcial + ''
            goodElement.setAttribute('style', 'width:' + first_per);
            badElement.setAttribute('style', 'width:' + second_per);

            console.log(valorTotal, valorParcial, first_per, second_per)
        }
        puntosOpt5_grafica();

        //Hacemos la funcio para el calculo de los puntos de las preguntas de tipo OPT6
        function puntosOpt6_grafica() {
            //Datos con los que trabajar
            let puntosSumaCopia = [...puntosTotalesFinal];
            let puntosSumaCopia_total = puntosSumaCopia[0][5];
            let puntosSumaCopia_obtenida = puntosSumaCopia[1][5];
            //Accedemos a los elementos en las graficas
            let goodElement = document.getElementById('good_7');
            let badElement = document.getElementById('bad_7');

            let valorTotal = 0;
            let valorParcial = 0;
            //Suma de los totales
            let sumaParcial_1 = puntosSumaCopia_total.reduce((sum, val) => {
                return sum + val;
            });
            valorTotal += sumaParcial_1;

            //Suma de los obtenidos
            let sumaParcial_2 = puntosSumaCopia_obtenida.reduce((sum, val) => {
                return sum + val;
            });
            valorParcial += sumaParcial_2;

            //Debemos obtener los procentages para el width de una vez
            let hundred = valorTotal + valorParcial;
            let first_per = parseFloat(((valorTotal * 100) / hundred).toFixed(1)) + '%';
            let second_per = parseFloat(((valorParcial * 100) / hundred).toFixed(1)) + '%';

            goodElement.textContent = valorTotal + ' total pts.';
            badElement.textContent = valorParcial + ''
            goodElement.setAttribute('style', 'width:' + first_per);
            badElement.setAttribute('style', 'width:' + second_per);

            console.log(valorTotal, valorParcial, first_per, second_per)
        }
        puntosOpt6_grafica();



        //Hacemos la funcion para que obtenga el promedio total
        function obtencionPromedio(mainArray) {
            //Obtenemos todos los promedios del array
            let promedios = mainArray.map(element => {
                if (element[6] != "pending") {
                    return parseFloat(element[6]);
                } else {
                    return undefined;
                }
            });

            //Filtramos todos los elementos que sean undefined
            let promediosFiltrados = promedios.filter(element => {
                if (element != undefined) {
                    return element;
                }
            })

            //Obtenemos la suma de todos los elementos
            let sumaPromedios = promediosFiltrados.reduce((element, value) => {
                return element + value;
            });

            //Obtenemos el promedio del estudiante.
            let promedio = parseFloat((sumaPromedios / (promedios.length)).toFixed(1));
            return promedio;
        }

        //Hacemos la funcion para obtener el mejor resultado de todos
        function bestResult(mainArray) {
            //Array para ser ordenado
            let arrayProof = [...mainArray];

            //Obtenemos todos los promedios del array
            let promedios = arrayProof.map(element => {
                if (element[6] != "pending") {
                    return parseFloat(element[6]);
                } else {
                    return undefined;
                }
            });

            //Filtramos todos los elementos que sean undefined
            let promediosFiltrados = promedios.filter(element => {
                if (element != undefined) {
                    return element;
                }
            })

            //Ordenamos el array de menor a mayor
            let arrayOrdenado = promediosFiltrados.sort((a, b) => {
                return a - b;
            })

            //Retornamos el valor más grande
            return arrayOrdenado.at(-1);
        }

        //Hacemos la funcion para calcular las calificaciones del alumno
        function calculadoraPromedios() {
            //Obtenemos todos los promedios del array
            let promedios = dataClean.map(element => {
                if (element[6] != "pending") {
                    return parseFloat(element[6]);
                } else {
                    return undefined;
                }
            });

            //Filtramos todos los elementos que sean undefined
            let promediosFiltrados = promedios.filter(element => {
                if (element != undefined) {
                    return element;
                }
            })

            //Obtenemos la suma de todos los elementos
            let sumaPromedios = promediosFiltrados.reduce((element, value) => {
                return element + value;
            });

            let percentage = (sumaPromedios * 10 / (100 * (promediosFiltrados.length))) * 100;
            percentage = percentage.toFixed(2)

            if (percentage <= 100 && percentage >= 80) {
                grades = "A";
            } else if (percentage <= 79 && percentage >= 60) {
                grades = "B";
            } else if (percentage <= 59 && percentage >= 40) {
                grades = "C";
            } else {
                grades = "F";
            }

            return `${(percentage / 10).toFixed(2)}/${grades}`;
        }

        //Hacemos el conteo de los elementos requeridos
        function contadorElementosTiempo() {
            let tiempos = dataClean.map((element) => {
                return element.at(-1);
            });

            let a_tiempo = [];
            let con_retraso = tiempos.filter(element => {
                if (element == 'a_tiempo') {
                    a_tiempo.push(element);
                } else if (element == 'retraso') {
                    return element;
                }
            });

            let longitud = [a_tiempo.length, con_retraso.length];
            return longitud;
        }

        //Hacemos el conteo de los elementos requeridos para los aprobados y reprobados
        function contadorAprobadoReprobados() {
            let tiempos = dataClean.map((element) => {
                return element[5];
            });

            let aprobado = [];
            let reprobado = tiempos.filter(element => {
                if (element == 'aprobado') {
                    aprobado.push(element);
                } else if (element == 'reprobado') {
                    return element;
                }
            });

            let longitud = [aprobado.length, reprobado.length];
            return longitud;
        }

        //Hacemos el conteo de los elementos ready y pending
        function contadorReadyPending() {
            let tiempos = dataClean.map((element) => {
                return element[4];
            });

            let ready = [];
            let started = [];
            let pending = tiempos.filter(element => {
                if (element == 'ready') {
                    ready.push(element);
                } else if (element == 'pending') {
                    return element;
                } else if (element == 'started') {
                    started.push(element);
                }
            });

            let longitud = [ready.length, pending.length, started.length];
            return longitud;
        }

        //Hacemos la funcion para convertir el tiempo en un formato que entendamos
        function convertirFormatoHora() {
            let horaConformatoNumerico = dataClean.map(hora => {
                if (hora != null) {
                    //Quitamos el texto
                    let horaTexto = hora[9];
                    if (isNaN(horaTexto)) {
                        let numeroHora = horaTexto.replaceAll('h', '').replaceAll('m', '').replaceAll('s', '');
                        //Convertimos en un array
                        numeroHora = numeroHora.split(':');
                        //Obtenemos las hora a minutos
                        numeroHora[0] = numeroHora[0] * 60;
                        //Obtenemos los segundo a minutos
                        numeroHora[2] = parseInt((numeroHora[2] * (1 / 60)).toFixed(0));
                        //Obtenemos los minutos totales
                        return numeroHora[0] + parseInt(numeroHora[1]) + numeroHora[2];
                    } else {
                        return 0
                    }
                } else {
                    return '0h:0m:0s'
                }
            })

            let totalMinutos = horaConformatoNumerico.reduce((element, value) => {
                return element + value;
            })

            let promediosMinutos = totalMinutos / (horaConformatoNumerico.length);
            promediosMinutos = parseFloat((promediosMinutos).toFixed(1))
            return promediosMinutos;
        }

        ///////////////////////////////////////////
        //Insercion de la tendencia de promedio
        let tendenciaPromedioElement = document.getElementById('number_4');
        //Nuestro valor de tendencia
        const tendenciaTotal = calculadoraPromedios();
        tendenciaPromedioElement.textContent = tendenciaTotal;

        //////////////////////////////////////////
        //Insercion de la longitud total de cuestionarios
        let longitudTotalElement = document.getElementById('number_1');
        //Nuestro mejor valor
        const longitudTotal = dataClean.length;
        longitudTotalElement.textContent = longitudTotal;

        //////////////////////////////////////////
        //Insercion de elementos en la interfaz
        let bestGradeElement = document.getElementById('number_3');
        //Nuestro mejor valor
        const mejorValor = bestResult(dataClean);
        bestGradeElement.textContent = mejorValor;


        //////////////////////////////////////////
        //Insercion de elementos en la interfaz
        let promedioElement = document.getElementById('number_2');
        //Nuestro promedio final
        const promedioFinal = obtencionPromedio(dataClean); //💯
        promedioElement.textContent = promedioFinal;

        //Accedemos a los valores con conteo de datos adicionales
        let aTiempo = document.getElementById('value_1_mini');
        let conRetraso = document.getElementById('value_2_mini');
        let aprobados = document.getElementById('value_5_mini');
        let reprobados = document.getElementById('value_6_mini');
        let ready = document.getElementById('value_4_mini');
        let pendiente = document.getElementById('value_3_mini');
        let started = document.getElementById('value_8_mini');
        let tiempoPromedio = document.getElementById('value_7_mini');

        //Insertamos los elementos a tiempo y con retraso
        let valoresTiempo = contadorElementosTiempo();
        aTiempo.textContent = valoresTiempo[0];
        conRetraso.textContent = valoresTiempo[1];

        //Insertamos los elementos de aprobados y reprobados
        let valoresAprobadosReprobados = contadorAprobadoReprobados();
        aprobados.textContent = valoresAprobadosReprobados[0] + "/" + longitudTotal;
        reprobados.textContent = valoresAprobadosReprobados[1] + "/" + longitudTotal;

        //Insertamos los elementos de ready y de pending
        let valorReadyPending = contadorReadyPending();
        ready.textContent = valorReadyPending[0];
        pendiente.textContent = valorReadyPending[1];
        started.textContent = valorReadyPending[2];

        //Insertamos los valores del promedio de los minutos
        let promedioMinutos = convertirFormatoHora();
        tiempoPromedio.textContent = promedioMinutos + "min";
    }else if(dataClean == "noData"){
        let contenedorPrincipal = document.getElementsByClassName('operationContainerPrincipalCuestionarios');
        contenedorPrincipal[0].classList.add('hiddenElement');
        
        let padreContainer = document.getElementsByClassName('padreContainer');
        let mensajeNoData = `
                <h5 class="nuevoContenedorPrincipal_no_content_text"><b>No content.</b></h5></div>
                <div class="nuevoContenedorPrincipal_no_content_img_cont"><img class="nuevoContenedorPrincipal_no_content_img" src="../../static/images/icons/icon_no_notification.svg"></div>
            
        `;
        let nuevoContenedorPrincipal = `<br><br><br><br><section class="nuevoContenedorPrincipal_no_content">
                                            ${mensajeNoData}
                                        </section>`;
        padreContainer[0].innerHTML = nuevoContenedorPrincipal;
        
    }
}