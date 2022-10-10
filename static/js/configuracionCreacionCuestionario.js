var contadorModalRellenarEspaciosCreacion = 0;

/* 
  ######################################################
  MODAL 1: OPCION MULTIPLE
  ######################################################
*/
//Opcion para agregar opccion a la opción multiple (En el modal)
$(document).ready(function () {
  $("#btnAgregarModalOpcionMultipleCreacion").click(function () {
    $("#contenedorOpccionesOpccionMultipleModalCreacion .hide")
      .first()
      .removeClass("hide");
    M.toast({ html: 'Opción agregada' });
  });
});

//Opcion para eliminar preguntas del opcion multiples (en el modal)
function eliminarElementosDelModalOptMultiple() {
  const btnEliminarModalOpcionMultipleCreacion = document.getElementById('btnEliminarModalOpcionMultipleCreacion');
  const textAreaPreguntaOpccionMultipleCreacion = document.getElementById('textAreaPreguntaOpccionMultipleCreacion');
  const opcionContainerModal = document.getElementsByClassName('opcionContainerModal');
  const opcionContainerModalContent = document.getElementsByClassName('opcionContainerModalContent');

  btnEliminarModalOpcionMultipleCreacion.addEventListener('click', ocultarElementos);

  function ocultarElementos() {
    //Se borra la pregunta del modal
    textAreaPreguntaOpccionMultipleCreacion.value = ''

    //Se ocultan la opcion de la B a la D
    opcionContainerModal[1].classList.add('hide');
    opcionContainerModal[2].classList.add('hide');
    opcionContainerModal[3].classList.add('hide');

    //Se borran los valores de los cuatro inputs de los modals
    for (var i = 0; i < 4; i++) {
      opcionContainerModalContent[i].value = '';
    }

    M.toast({ html: 'Casillas limpiadas' });
  }
}
eliminarElementosDelModalOptMultiple();

//Insertar preguntas de opción multiples
/*
* FUNCION DE INSERCIÓN EN LA PREVIEW DE CUESTIONARIO
*/
$(document).ready(function () {
  //Es un contador para el atributo name de los input radio
  let contadorPreguntaOptMultiple = 0;

  $("#btnGuardarModalOpcionMultipleCreacion").click(function () {
    //Obtenemos el valor de la pregunta
    var pregunta = $("#textAreaPreguntaOpccionMultipleCreacion").val();

    //Obtenemos la opción con checked
    var opccionSel = $(
      "input:radio[name ='grupoOpcionesModalOpcionMuliple']:checked"
    ).val();

    //Evaluamos la que esta como checked
    var checkA = "";
    var checkB = "";
    var checkC = "";
    var checkD = "";

    switch (opccionSel) {
      case "A":
        checkA = "checked";
        break;
      case "B":
        checkB = "checked";
        break;
      case "C":
        checkC = "checked";
        break;
      case "D":
        checkD = "checked";
        break;
    }

    function agregarContenidoVistaPrevia() {
      contadorPreguntaOptMultiple = contadorPreguntaOptMultiple + 1;
      //Guardamos lo que vamos a imprimir
      var opcionA =
        `<div class='row colorGreyWhiter bordered1 opcionContainer'> 
        <div class='col s12 m3 labelContainer'> 
          <label> 
            <input  type='radio' name='group` + contadorPreguntaOptMultiple + `' ` + checkA + `/> 
            <span>Correcta</span> 
          </label> 
        </div> 
        <div class='col s12 m9'> 
          <h6><b>Opción A</b></h6> 
          <textarea id='opcionACreacion' class='materialize-textarea'>`
        + $("#opcionACreacion").val() +
        `</textarea> 
        </div> 
      </div>`;

      //Validamos en caso de que este vacio (No se muestran)
      var opcionBOculto = "";
      if ($("#opcionBCreacion").val().length === 0) {
        opcionBOculto = "hide";
      }

      var opcionCOculto = "";
      if ($("#opcionCCreacion").val().length === 0) {
        opcionCOculto = "hide";
      }

      var opcionDOculto = "";
      if ($("#opcionDCreacion").val().length === 0) {
        opcionDOculto = "hide";
      }

      //En caso de que tengan contenido imprimimos
      var opcionB =
        `<div class='row colorGreyWhiter bordered1 opcionContainer ` + opcionBOculto + `'>` +
        `<div class='col s12 m3 labelContainer'>
            <label>
              <input  type='radio' name='group` + contadorPreguntaOptMultiple + `' ` + checkB + `/>
              <span>Correcta</span>
            </label>
        </div>
        <div class='col s12 m9'>
            <h6><b>Opción B</b></h6>
            <textarea class='materialize-textarea'>`
        + $("#opcionBCreacion").val() +
        `</textarea>
        </div>
      </div>`;

      var opcionC =
        `<div class='row colorGreyWhiter bordered1 opcionContainer ` + opcionCOculto + `'>` +
        `<div class='col s12 m3 labelContainer'>
          <label>
            <input  type='radio' name='group` + contadorPreguntaOptMultiple + `' ` + checkC + ` />
            <span>Correcta</span>
          </label>
        </div>
        <div class='col s12 m9'>
          <h6><b>Opción C</b></h6>
          <textarea class='materialize-textarea'>`
        + $("#opcionCCreacion").val() +
        `</textarea>
        </div>
      </div>`;

      var opcionD =
        `<div class='row colorGreyWhiter bordered1 opcionContainer ` + opcionDOculto + `'>` +
        `<div class='col s12 m3 labelContainer'>
          <label>
            <input  type='radio' name='group` + contadorPreguntaOptMultiple + `' ` + checkD + ` />
            <span>Correcta</span>
          </label>
        </div>
        <div class='col s12 m9'>
          <h6><b>Opción D</b></h6>
          <textarea class='materialize-textarea'>`
        + $("#opcionDCreacion").val() +
        `</textarea>
        </div>
      </div>`;

      var contenedor =
        `<div class='row preguntaOpccionMultiple'>
        <div class='col s12'>
          <div class='card colorWhite bordered2'>
            <div class='card-content '>
              <h5>Pregunta de opción múltiple.</h5>
            <div class='row'>
              <div class='input-field col s12'>
                <textarea class='materialize-textarea textoPregunta' placeholder='Escriba la pregunta'>`
        + pregunta +
        `</textarea>
              </div>
            </div>` +
        opcionA +
        opcionB +
        opcionC +
        opcionD +
        `<div class='containerButtonsView'>
                  <div>
                    <a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnAgregarOpcionMultiple'><i class='material-icons left'>add</i>Agregar 1</a>
                  </div>
                  <div>
                    <a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnEliminarUltimaPreguntaOpcionMultiple'><i class='material-icons left'>remove</i>Eliminar 1</a>
                  </div>
                  <div>
                    <a class='waves-effect waves-light btn bordered5 color1 shadow-2e btnEliminarPreguntaOpcionMultiple'><i class='material-icons left'>delete_sweep</i>Eliminar pregunta</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      $("#contenedorCuestionarioPreguntas").append(contenedor);
      M.toast({ html: 'Pregunta agregada a la vista previa' });
    }

    agregarContenidoVistaPrevia();

  });
});

// Agregar opciones a las preguntas de opcion multiple (En la vista previa)
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnAgregarOpcionMultiple",
    function () {
      var preguntaOpccionMultiple = $(this).closest(".preguntaOpccionMultiple");
      preguntaOpccionMultiple.find(".hide").first().removeClass("hide").addClass("nohide");
      M.toast({ html: 'Opción agregada' });
    }
  );
});

// Agregar opcciones a las preguntas de opccion multiple
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnEliminarUltimaPreguntaOpcionMultiple",
    function () {
      var preguntaOpccionMultiple = $(this).closest(".preguntaOpccionMultiple");
      console.log(preguntaOpccionMultiple.find(".nohide").last());
      preguntaOpccionMultiple.find(".nohide").last().addClass("hide").removeClass("nohide");
      M.toast({ html: 'Opción borrada' });
    }
  );
});

// Eliminar pregunta de opcion multiple (En la vista previa)
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnEliminarPreguntaOpcionMultiple",
    function () {
      $(this).closest(".preguntaOpccionMultiple").remove();
      M.toast({ html: 'Pregunta eliminada' });
    }
  );
});


/*
  ######################################################
  MODAL 2: RELLENADO DE ESPACIOS
  ######################################################
*/

//Agregar 1 espacio en el modal de acompletar (En el modal)
$(document).ready(function () {
  $("#btnAgregarModalRellenarEspaciosCreacion").click(function () {
    var textoInput = $("#texAreaModalRellenarEspaciosCreacion").val();
    contadorModalRellenarEspaciosCreacion++;
    $("#texAreaModalRellenarEspaciosCreacion").val(
      textoInput + " [Blank " + contadorModalRellenarEspaciosCreacion + "]"
    );
    $("#contenedorOpccionEspaciosCreacion").append(
      `<div class='row containerTextBlank containerTextBlankModal'>
        <div class='col s12 m6 containerTextBlankSon1'> Blank `
      + contadorModalRellenarEspaciosCreacion +
      `</div>
        <div class='col s12 m6 containerTextBlankSon2'>
          <input type='text' class='browser-default blankContadorEspaciosCreacion'>
        </div>
      </div>`
    );
    M.toast({ html: 'Espacio agregado' });
  });
});

//Funcion para remover espacio (en el modal)
function eliminarEspacioModal() {
  //Boton de elimnado
  const btnEliminarModalRellenarEspaciosCreacion = document.getElementById('btnEliminarModalRellenarEspaciosCreacion');
  //Contenedor de los espacios en el modal
  const containerTextBlankModal = document.getElementsByClassName('containerTextBlankModal');
  //Input de la pregunta
  const texAreaModalRellenarEspaciosCreacion = document.getElementById('texAreaModalRellenarEspaciosCreacion');

  //Cuando hacemos click en el boton se activa la funcion
  btnEliminarModalRellenarEspaciosCreacion.addEventListener('click', eliminarEspacio);

  //Funcion de elinar elemento
  function eliminarEspacio() {
    //Trabajamos con los textos del input
    let textoInput = texAreaModalRellenarEspaciosCreacion.value;
    console.log("1 " + textoInput);
    let textoReemplazado = '[Blank ' + contadorModalRellenarEspaciosCreacion + ']';
    console.log("2 " + textoReemplazado);
    let nuevoTextoInput = textoInput.replace(textoReemplazado, '');
    console.log("3 " + nuevoTextoInput);
    texAreaModalRellenarEspaciosCreacion.value = nuevoTextoInput;
    console.log(texAreaModalRellenarEspaciosCreacion);

    //Elimina el último elemento de los espacio
    containerTextBlankModal[containerTextBlankModal.length - 1].remove();

    //Hace que el contador disminuya 1
    contadorModalRellenarEspaciosCreacion--;

    M.toast({ html: 'Espacio eliminado' });
  }
}

eliminarEspacioModal();


//Insertar preguntas de rellenar espacio
/*
* Agregar pregunta de completar espacio (En el modal)
*/
$(document).ready(function () {
  $("#btnGuardarModalRellenarEspaciosCreacion").click(function () {
    var contadorInicial = 1;
    var textoOpcciones = "";
    $("#contenedorOpccionEspaciosCreacion .blankContadorEspaciosCreacion").each(
      function (index, obj) {
        textoOpcciones =
          textoOpcciones +
          `<div class='row containerTextBlank'>
            <div class='col s12 m6 containerTextBlankSon1 '>Blank`
          + contadorInicial +
          `</div>
            <div class='col s12 m6 containerTextBlankSon2 '>
              <input type='text' value='` + $(this).val() + `' class='browser-default blankContadorEspaciosCreacion'>
            </div>
          </div>`;
        contadorInicial++;
      }
    );

    var pregunta = $("#texAreaModalRellenarEspaciosCreacion").val();

    var contenedor =
      `<div class='row preguntaRellenarEspacios'>
        <div class='col s12 ''>
          <div class='card colorWhite bordered2'>
            <div class='card-content '>
              <h5>Rellenar espacios</h5>
              <div class='row'>
                <div class='input-field col s12'>
                  <textarea  class='materialize-textarea textoPregunta textoPreguntaVistaPrevia' placeholder='Pregunta'>`
      + pregunta +
      `</textarea>
                </div>
              </div>
              <div class='row containerTextBlank'>
                <div class='col s12 espaciosBlancos containerTextBlankVistaPrevia'>` + textoOpcciones + `</div>
              </div>
              <div class='containerButtonsView'>
                <div>
                  <a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnAgregarEspacioBlanco'><i class='material-icons left'>add</i>1 espacio</a>
                </div>
                <div>
                  <a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnEliminarEspacioBlanco'><i class='material-icons left'>remove</i>1 espacio</a>
                </div>
                <div>
                  <a class='waves-effect waves-light btn bordered5 color1 shadow-2e btnEliminarPreguntaEspacioBlanco'><i class='material-icons left'>delete_sweep</i>Eliminar pregunta</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    $("#contenedorCuestionarioPreguntas").append(contenedor);
    M.toast({ html: 'Pregunta agregada' });
  });
});

// Agregar espacios en blanco (En la vista previa)
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnAgregarEspacioBlanco",
    function () {
      var preguntaRellenarEspacios = $(this).closest(
        ".preguntaRellenarEspacios"
      );

      var lugarDeEspacios = preguntaRellenarEspacios.find(".espaciosBlancos");
      var numeroEspacios =
        lugarDeEspacios.find(".blankContadorEspaciosCreacion").length + 1;
      lugarDeEspacios.append(
        `<div class='row containerTextBlank'>
          <div class='col s12 m6 containerTextBlankSon1'> Blank ` + numeroEspacios + `</div>
          <div class='col s12 m6 containerTextBlankSon2'>
            <input type='text' class='browser-default blankContadorEspaciosCreacion '>
          </div>
        </div>`);

      var preguntaAgregar =
        preguntaRellenarEspacios.find(".textoPregunta").val() +
        "[Blank " +
        numeroEspacios +
        "]";
      preguntaRellenarEspacios.find(".textoPregunta").val(preguntaAgregar);
      M.toast({ html: 'Espacio agregado' });
    }
  );
});


// Eliminar pregunta de espacios en blanco (En la vista previa)
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnEliminarPreguntaEspacioBlanco",
    function () {
      $(this).closest(".preguntaRellenarEspacios").remove();
      M.toast({ html: 'Pregunta eliminada' });
    }
  );
});

/*
  ######################################################
  MODAL 3: EJERCICIOS PLANTEADOS POR EL PROFESOR
  ######################################################
*/

/*
*  Función para mostrar el contenido de los ejercicios escritos a mano
*/

function agregarEjercicio() {
  const descripcionProblema = document.getElementById('descripcionProblema');
  const codigoResultado = document.getElementById('codigoResultado');
  const codigoMuestra = document.getElementById('codigoMuestra');
  const carpetaOnline = document.getElementById('carpetaOnline');

  //Boton de limpiar
  const limpiarCasillasEjercicioButton = document.getElementById('limpiarCasillasEjercicioButton');

  //Mostrar el código antes de agregarlo
  codigoResultado.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      mostrarCódigoMuestra();
      M.toast({ html: 'Código agregado' });
    }
  });

  function mostrarCódigoMuestra() {
    codigoMuestra.innerText = codigoResultado.value;
  }

  //Limpiar todas las casilla
  limpiarCasillasEjercicioButton.addEventListener('click', limpiarCasillas);
  function limpiarCasillas() {
    descripcionProblema.value = "";
    codigoResultado.value = "";
    carpetaOnline.value = "";
    codigoMuestra.innerText = "";
    M.toast({ html: 'Casillas limpias' });
  }
}
agregarEjercicio();

//Se carga el texto de los archivos de texto
function agregarEjercicioArchivo() {
  document.getElementById('inputfile')
    .addEventListener('change', function () {

      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById('codigoMuestra')
          .textContent = fr.result;
      }

      fr.readAsText(this.files[0]);
      M.toast({ html: 'Archivo leído.' });
    })
}
agregarEjercicioArchivo();

//Guardar nuevo ejercicio
var contadorEjerciciosEnContenedor = 0;
function agregarEjercicioContenedor() {
  //Descripcion
  const descripcionProblema = document.getElementById('descripcionProblema');
  //Codigo escrito a mano
  const codigoResultado = document.getElementById('codigoResultado');
  //Codigo de muestra
  const codigoMuestra = document.getElementById('codigoMuestra');
  //Carpeta online
  const carpetaOnline = document.getElementById('carpetaOnline');

  //Buton para agregar nuevo ejercicio
  const crearEjercicioButton = document.getElementById('crearEjercicioButton');

  //Contenedor de preguntas general
  const contenedorCuestionarioPreguntas = document.getElementById('contenedorCuestionarioPreguntas');

  crearEjercicioButton.addEventListener('click', agregarNuevaPregunta);
  function agregarNuevaPregunta() {
    contadorEjerciciosEnContenedor++;
    var codigoMuestraContenido = codigoMuestra.innerHTML;
    let ejercicio =
      `<div class='row preguntasEjercicios'>
          <div class='col s12'>
            <div class='card colorWhite bordered2'>
            <div class='card-content '>
              <h5>Pregunta de ejercicio.</h5>
              <br>
              <div class='row'>
                <div class="input-field col s12">
                    <i class="material-icons prefix">description</i>
                    <textarea id="descripcionProblema` + contadorEjerciciosEnContenedor + `" class="materialize-textarea">` + descripcionProblema.value + `</textarea>
                    <label class="active" for="descripcionProblema` + contadorEjerciciosEnContenedor + `">Descripción del problema</label>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">play_arrow</i>
                    <textarea id="mediaProblema` + contadorEjerciciosEnContenedor + `" class="materialize-textarea"></textarea>
                    <label for="mediaProblema` + contadorEjerciciosEnContenedor + `">Imagen o video para el problema (url)</label>
                </div>
              </div>
              <div class="row colorGreyWhiter bordered2 contenedorOpcionesCodigo">
                <div class="col s12">
                    <h6><b>Código de archivo</b></h6>
                </div>
                <div class="input-field col s12">
                    <input type="file" id="inputfile` + contadorEjerciciosEnContenedor + `" class="hidden"/>
                    <a class="waves-effect waves-light btn bordered5 color2 shadow-2e" href="#"
                    id="leerArchivoEjercicio` + contadorEjerciciosEnContenedor + `" style="width: 100%;"><i
                    class="material-icons left">upload_file</i>
                    <label 
                    onclick="agregarContenidoIndividualArchivo('codigoMuestra` + contadorEjerciciosEnContenedor + `', 'inputfile` + contadorEjerciciosEnContenedor + `')"
                    for="inputfile` + contadorEjerciciosEnContenedor + `" class="colorText">Elegir archivo</label></a>
                </div>  
                <div class="col s12">
                    <h6><b>Adjuntar enlace a carpeta online (múltiples archivos)</b></h6>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">cloud_circle</i>
                    <input type="text" id="carpetaOnline` + contadorEjerciciosEnContenedor + `" value="` + carpetaOnline.value + `"></input>
                    <label class="active" for="carpetaOnline` + contadorEjerciciosEnContenedor + `">Enlace de carpeta</label>
                </div>                        
                <div class="col s12">
                    <h6><b>Código escrito manualmente</b></h6>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">history_edu</i>
                    <textarea 
                    onchange="agregarContenidoIndividual('codigoMuestra` + contadorEjerciciosEnContenedor + `', 'codigoResultado` + contadorEjerciciosEnContenedor + `')" 
                    id="codigoResultado` + contadorEjerciciosEnContenedor + `" class="materialize-textarea">` + codigoResultado.value + `</textarea>
                    <label class="active" for="codigoResultado` + contadorEjerciciosEnContenedor + `">Código a mano</label>
                </div>
            </div>
            <h5><b>Vista previa del código</b></h5>
            <div class="previewCodeContainerNoModal bordered2">
                <code class="colorText">
                    <pre id="codigoMuestra` + contadorEjerciciosEnContenedor + `">`
      + codigoMuestraContenido +
      `</pre>
                </code>
            </div>
              <div class='containerButtonsView'>
                <div>
                  <a class='waves-effect waves-light btn bordered5 color1 shadow-2e btnEliminarEjercicios'><i class='material-icons left'>delete_sweep</i>Eliminar pregunta</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    $("#contenedorCuestionarioPreguntas").append(ejercicio);
    M.toast({ html: 'Ejercicio agregado' });
  }
}

agregarEjercicioContenedor();

//Para de manera individual (Por ejercicio agregar preview de codigo)
//La invocacion es un onchange que se encuentra en el HTML
function agregarContenidoIndividual(idMuestra, idResultado) {
  const muestraContenedor = document.getElementById(idMuestra);
  const inputResultado = document.getElementById(idResultado);
  muestraContenedor.innerText = inputResultado.value;
}

function agregarContenidoIndividualArchivo(idMuestra, idInputFile) {
  document.getElementById(idInputFile)
    .addEventListener('change', function () {

      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById(idMuestra).innerText = fr.result;
      }

      fr.readAsText(this.files[0]);
      M.toast({ html: 'Archivo leído.' });
    })
}

// Eliminar pregunta de ejercicio (En la vista previa)
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnEliminarEjercicios",
    function () {
      $(this).closest(".preguntasEjercicios").remove();
      M.toast({ html: 'Pregunta eliminada' });
    }
  );
});

/*
  ######################################################
  MODAL 4: PARA ARRASTRAR
  ######################################################
*/

//Agregar elemento para arrastrar (en el modal) 
$(document).ready(function () {
  $("#btnAgregarsModalArrastrarCreacion").click(function () {
    $("#opccionesArrastarModalCreacion").append(
      `<div class='row opccionLinea opcionLineaModal'>
        <div class="col s12 m6">
          <input placeholder='(a) Escriba el concepto' type='text' class='textoArrastrarCreacion browser-default conceptoDefinicion'>
        </div>
        <div class='col s12 m6'>
          <input placeholder='(b) Escriba la definición' type="text" class='textoOpccionCreacion browser-default conceptoDefinicion'>
        </div>
      </div>`);
    M.toast({ html: 'Elemento agregrado' });
  });
});

//Opcion para guardar preguntas de Arrastrar (En la vista previa)
//Guardar nuevo ejercicio
var contadorArrastrarPreguntas = 0;
var contadorContenedorArrastraPreguntas = 0;
$(document).ready(function () {
  $("#btnGuardarModalArrastrarCreacion").click(function () {
    var textoElementos = "";

    var pregunta = $("#texAreaModalArrastrarCreacion").val();

    $("#opccionesArrastarModalCreacion .opccionLinea").each(function (
      index,
      obj
    ) {
      var texto = $(this).find(".textoArrastrarCreacion").val();
      var opccion = $(this).find(".textoOpccionCreacion").val();

      contadorArrastrarPreguntas++;

      textoElementos =
        textoElementos +
        `<div class='row opccionLinea' id="conceptoArrastrarContainer` + contadorContenedorArrastraPreguntas + `">
          <div class="col s12 m6">
            <input id="conceptoArrastrarView` + contadorArrastrarPreguntas + `" value="` + texto + `" placeholder='(a) Escriba el concepto' type='text' class='textoArrastrarCreacion browser-default conceptoDefinicion'>
          </div>
          <div class='col s12 m6'>
            <input id="definicionArrastrarView` + contadorArrastrarPreguntas + `" value="` + opccion + `" placeholder='(b) Escriba la definición' type="text" class='textoOpccionCreacion browser-default conceptoDefinicion'>
          </div>
        </div>`;
    });

    var contenedor =
      `<div class='row preguntasArrastrado'>
      <div class='col s12'>
        <div class='card colorWhite bordered2'>
          <div class='card-content'>
            <h5>Arrastrar y ordenar</h5>
            <div class='row'>
              <div class='row col s12'>
                <div class='input-field col s12'>
                  <i class="material-icons prefix">description</i>
                  <textarea id="tituloArrastrar` + contadorContenedorArrastraPreguntas + `" class='materialize-textarea textoPregunta'>` + pregunta + `</textarea>
                  <label for="tituloArrastrar` + contadorContenedorArrastraPreguntas + `" class="active">Descripción del ejercicio</label>
                </div>
              </div>
            </div>
            <div class='row'>
              <div class="col s12 m6">
                <h6 class="tituloColumnaModal"><b>Conceptos (A)</b></h6>
              </div>
              <div class='col s12 m6'>
                <h6 class="tituloColumnaModal"><b>Definiciones (B)</b></h6>
              </div>
              <div id="conceptoArrastrarContainerParent` + contadorContenedorArrastraPreguntas + `" class='col s12'>` + textoElementos + `</div>
            </div>
            <div class='containerButtonsView'>
                <div>
                  <a 
                  onclick="agregarContenidoArrastrarPreview('conceptoArrastrarContainerParent` + contadorContenedorArrastraPreguntas + `')"
                  class='waves-effect waves-light btn bordered5 color2 shadow-2e btnAgregarConceptoArrastrable'><i class='material-icons left'>add</i>Agregar</a>
                </div>
                <div>
                  <a 
                  onclick="eliminarContenidoArrastrarPreview('conceptoArrastrarContainerParent` + contadorContenedorArrastraPreguntas + `')"
                  class='waves-effect waves-light btn bordered5 color2 shadow-2e btnEliminarConceptoArrastrable'><i class='material-icons left'>remove</i>Eliminar</a>
                </div>
                <div>
                  <a class='waves-effect waves-light btn bordered5 color1 shadow-2e btnEliminarPreguntaConceptoArrastrable'><i class='material-icons left'>delete_sweep</i>Eliminar pregunta</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    $("#contenedorCuestionarioPreguntas").append(contenedor);
    contadorContenedorArrastraPreguntas++;
    M.toast({ html: 'Pregunta guardada' });
  });
});

//Agregar espacios arrastrar (en la vista previa)
//Se ejecuta con onclick
function agregarContenidoArrastrarPreview(conceptoArrastrarContainerParent) {
  contadorArrastrarPreguntas++;
  //Es en donde estan contenido los conceptos y definiciones
  var IDContendorPadre = conceptoArrastrarContainerParent;
  $('#' + IDContendorPadre).append(
    `<div class='row opccionLinea' id="conceptoArrastrarContainer` + contadorArrastrarPreguntas + `">
    <div class="col s12 m6">
      <input id="conceptoArrastrarView` + contadorArrastrarPreguntas + `" value="" placeholder='(a) Escriba el concepto' type='text' class='textoArrastrarCreacion browser-default conceptoDefinicion'>
    </div>
    <div class='col s12 m6'>
      <input id="definicionArrastrarView` + contadorArrastrarPreguntas + `" value="" placeholder='(b) Escriba la definición' type="text" class='textoOpccionCreacion browser-default conceptoDefinicion'>
    </div>
  </div>`);
  M.toast({ html: 'Elemento agregado' });
}

//Eliminar concepto y elemento (en la vista previa)
function eliminarContenidoArrastrarPreview(conceptoArrastrarContainerParent) {
  //Es en donde estan contenidos los conceptos y las definiciones
  var IDContendorPadre = conceptoArrastrarContainerParent;
  //Accedemos al elemento
  var contendorPadre = document.getElementById(IDContendorPadre);
  //Eliminamos el último elemento
  contendorPadre.removeChild(contendorPadre.lastChild);
  M.toast({ html: 'Elemento eliminado' });
}

//Eliminar concepto y definición (en el modal)
function eliminarConceptoModal() {
  //Obtenemos los elementos del modal
  const opcionLineaModal = document.getElementsByClassName('opcionLineaModal');

  //Boton de borrado del último elemento
  const btnEliminarModalArrastrarCreacion = document.getElementById('btnEliminarModalArrastrarCreacion');

  //Activamos el evento
  btnEliminarModalArrastrarCreacion.addEventListener('click', eliminarUltimo);
  function eliminarUltimo() {
    opcionLineaModal[opcionLineaModal.length - 1].remove();
  }
}
eliminarConceptoModal();

// Eliminar pregunta de arrastrado (En la vista previa)
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnEliminarPreguntaConceptoArrastrable",
    function () {
      $(this).closest(".preguntasArrastrado").remove();
      M.toast({ html: 'Pregunta eliminada' });
    }
  );
});

//Para los elementos drag and drop
function crearListasDragAndDrop() {
  const sortableConceptos = new Sortable(
    document.querySelector('#conceptos'), {
    draggable: 'div',
    animation: 150,
    ghostClass: 'colorGreyWhiter'
  }
  )

  const sortableDefiniciones = new Sortable(
    document.querySelector('#definiciones'), {
    draggable: 'div',
    animation: 150,
    ghostClass: 'colorGreyWhiter'
  }
  )
}

//crearListasDragAndDrop();

/*
  ######################################################
  EXTRA: INTERACCIÓN EN GENERAL
  ######################################################
*/

/*
*   Función para el ingreso del titulo
*/
//bandera edición
let codigoAgregado = false;
function ingresarTitulo() {
  //Texto del titulo
  const tituloCuestionario = document.getElementById('tituloCuestionario');
  //Boton de guardado del titulo
  const guardarTitulo = document.getElementById('guardarTitulo');
  //Boton para editar el titulo
  const editTitulo = document.getElementById('editarTitulo');
  //Input del titulo
  const nombreCuestionario = document.getElementById('nombreCuestionario');
  //Contenedor principal del titulo del cuestionario
  const inputNombreCuestionario = document.getElementsByClassName('inputNombreCuestionario');
  //Contenedor principal del titulo texto
  const contenedorTitulo = document.getElementsByClassName('contenedorTitulo');


  //Generador de clave única
  function asignarCodigo() {
    //Guardamos la clave de grupo
    let claveDeGrupo = makeid(8);

    //Generar el código
    function makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      return result;
    }
    return claveDeGrupo;
  }
  let clave = asignarCodigo();

  guardarTitulo.addEventListener('click', agregarTitulo);
  inputNombreCuestionario[0].addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      agregarTitulo();
    }
  });

  function agregarTitulo() {
    if (nombreCuestionario.value == "") {
      nombreCuestionario.value = "Error";
    } else {
      if (codigoAgregado == false) {
        tituloCuestionario.innerText = nombreCuestionario.value + " (" + clave + ")";
        inputNombreCuestionario[0].classList.add('hiddenElement');
        contenedorTitulo[0].classList.remove('hiddenElement');
        codigoAgregado = true;
      } else {
        tituloCuestionario.innerText = nombreCuestionario.value;
        inputNombreCuestionario[0].classList.add('hiddenElement');
        contenedorTitulo[0].classList.remove('hiddenElement');
      }
    }
  }

  editTitulo.addEventListener('click', editarTitulo);
  function editarTitulo() {
    if (codigoAgregado == false) {
      nombreCuestionario.value = tituloCuestionario.innerText + " (" + clave + ")";
      inputNombreCuestionario[0].classList.remove('hiddenElement');
      contenedorTitulo[0].classList.add('hiddenElement');
      codigoAgregado = true;
    } else {
      nombreCuestionario.value = tituloCuestionario.innerText;
      inputNombreCuestionario[0].classList.remove('hiddenElement');
      contenedorTitulo[0].classList.add('hiddenElement');
    }
  }
}

//Funciones para el titulo
ingresarTitulo();

/*
  ######################################################
  EXTRA: Guardado del JSON
  ***
  En esta sección se debe hacer una lectura de los elementos que estan en pantalla de modo
  que se pueda extraer su contenido y guardarlo en un JSON para su futura lectura.
  ***
  La estrcutura del JSON debe estar jerarquizada de modo que todo pueda se ingresado 
  con funciones que detecten el tipo de pregunta y actuen en consecuencia.
  ***
  Se recomiendo el uso de 5 funciones básicas.
  4 para los tipos de pregunta y 1 para datos adicionales.
  ######################################################
*/

/*
* Obtener todos los IDS de la página 
*/

function getAllIds() {
  //Con esto podemos buscar IDS de elementos en concreto
  let IDS_supreme_container = document.querySelectorAll('*[id]');

  //Lista para solo el atributo de ID
  let atributoId = []
  //Obtenemos solo el atributo de ID
  for (var j = 0; j < IDS_supreme_container.length; j++) {
    atributoId[j] = IDS_supreme_container[j].getAttribute('id');
  }
  return atributoId;
}

/*
* Obtener IDS y valores; preguntas de ejercicios. 
*/
function getEjerciciosValues_three() {
  //Todas las IDS
  let ids_all = getAllIds();

  //Contador de asignacion
  let contadorAsignacion1 = 0;
  let contadorAsignacion2 = 0;
  let contadorAsignacion3 = 0;
  let contadorAsignacion4 = 0;

  //Contenedores con valores importantes
  let descripcionProblema = [];
  let mediaProblema = [];
  let carpetaOnline = [];
  let codigoMuestra = [];

  //Buscamos entre las IDS
  for (var i = 0; i < ids_all.length; i++) {
    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('descripcionProblema') != -1) {
      descripcionProblema[contadorAsignacion1++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 2
    if (ids_all[i].indexOf('mediaProblema') != -1) {
      mediaProblema[contadorAsignacion2++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 3
    if (ids_all[i].indexOf('carpetaOnline') != -1) {
      carpetaOnline[contadorAsignacion3++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 4
    if (ids_all[i].indexOf('codigoMuestra') != -1) {
      codigoMuestra[contadorAsignacion4++] = ids_all[i];
    }
  }

  //Contenedores con los valores de las listas
  let descripcionProblemaValues = [];
  let mediaProblemaValues = [];
  let carpetaOnlineValues = [];
  let codigoMuestraValues = [];

  //Guardamos solo los valores
  for (var k = 0; k < descripcionProblema.length - 1; k++) {
    descripcionProblemaValues[k] = document.getElementById(descripcionProblema[k]).value;
    mediaProblemaValues[k] = document.getElementById(mediaProblema[k]).value;
    carpetaOnlineValues[k] = document.getElementById(carpetaOnline[k]).value;
    codigoMuestraValues[k] = document.getElementById(codigoMuestra[k]).innerText;
  }

  //Tenemos que mezclar los arrays y separalos por pregunta
  let valoresOrganizadosTotal = []
  for (var h = 0; h < descripcionProblemaValues.length; h++) {
    let valoresOrganizados = []
    valoresOrganizados.push(descripcionProblemaValues[h]);
    valoresOrganizados.push(mediaProblemaValues[h]);
    valoresOrganizados.push(carpetaOnlineValues[h]);
    valoresOrganizados.push(codigoMuestraValues[h]);
    valoresOrganizadosTotal.push(valoresOrganizados);
  }

  //console.log(valoresOrganizadosTotal);

  let arrayObjetosFinal = []
  for (var h = 0; h < valoresOrganizadosTotal.length; h++) {
    arrayObjetosFinal.push($.extend({}, valoresOrganizadosTotal[h]));
  }

  //console.log(arrayObjetosFinal);

  return arrayObjetosFinal;

  //Prueba
  // console.log(descripcionProblema);
  // console.log(mediaProblema);
  // console.log(carpetaOnline);
  // console.log(codigoMuestra);

  // console.log(descripcionProblemaValues);
  // console.log(mediaProblemaValues);
  // console.log(carpetaOnlineValues);
  // console.log(codigoMuestraValues);

}

/*
* Obtener IDS y valores; preguntas arrastrar
*/
function getArrastrarValues_four() {
  //Todas las IDS
  let ids_all = getAllIds();

  //Contador de asignacion
  let contadorAsignacion1 = 0;
  let contadorAsignacion2 = 0;
  let contadorAsignacion3 = 0;
  let contadorAsignacion4 = 0;

  //Contenedores con valores importantes
  let tituloArrastrar = [];
  //Padre e hijo almacenados en uno solo
  let conceptoArrastrarContainer = [];
  //Hijos del hijo
  let conceptoArrastrarView = [];
  let definicionArrastrarView = [];

  //Buscamos entre las IDS
  for (var i = 0; i < ids_all.length; i++) {
    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('tituloArrastrar') != -1) {
      tituloArrastrar[contadorAsignacion1++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 2
    if (ids_all[i].indexOf('conceptoArrastrarView') != -1) {
      conceptoArrastrarView[contadorAsignacion2++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 3
    if (ids_all[i].indexOf('definicionArrastrarView') != -1) {
      definicionArrastrarView[contadorAsignacion3++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 4
    if (ids_all[i].indexOf('conceptoArrastrarContainer') != -1) {
      conceptoArrastrarContainer[contadorAsignacion4++] = ids_all[i];
    }
  }

  //Contenedores con los valores de las listas
  let tituloArrastrarValues = [];
  var conceptoArrastrarViewValues = [];
  var definicionArrastrarViewValues = [];

  //Guardamos solo los valores
  for (var k = 0; k < tituloArrastrar.length; k++) {
    //Obtenemos valores del titulo
    tituloArrastrarValues[k] = document.getElementById(tituloArrastrar[k]).value;
  }

  //Contamos los hijos de cada padre
  var contadorHijos = 0;
  var cuentaDeHijos = [];
  for (var k = 0; k < conceptoArrastrarContainer.length; k++) {
    if (conceptoArrastrarContainer[k].indexOf('conceptoArrastrarContainerParent') == -1) {
      //console.log('Soy un hijo');
      contadorHijos++;
      //Para contar el ultimo
      if (conceptoArrastrarContainer.length - k == 1) {
        //console.log('Se agrego el último');
        cuentaDeHijos.push(contadorHijos);
      }
    } else {
      //Terminamos de contar lo hijos que tiene cada padre
      //console.log('No soy un hijo');
      cuentaDeHijos.push(contadorHijos);
      contadorHijos = 0;
    }
  }
  cuentaDeHijos.shift();

  //Accedemos a los values de los inputs mapeados
  let contadorRecorrido = 0;
  for (var t = 0; t < cuentaDeHijos.length; t++) {
    for (var k = 0; k < cuentaDeHijos[t]; k++) {
      let concepto = document.getElementById(conceptoArrastrarView[contadorRecorrido]).value;
      let definicion = document.getElementById(definicionArrastrarView[contadorRecorrido]).value;
      conceptoArrastrarViewValues.push(concepto);
      definicionArrastrarViewValues.push(definicion);
      contadorRecorrido++;
    }
  }
  
  //Juntamos los conceptos con las definiciones
  let valuesPadre = [];
  for (var k = 0; k < definicionArrastrarViewValues.length; k++) {
    let individualValue = conceptoArrastrarViewValues[k] + "**" + definicionArrastrarViewValues[k];
    valuesPadre.push(individualValue);
  }

  //Separamos los valores por grupo (por pregunta)
  let valoresAgrupados = [];
  let contadorRecorridoDos = 0;
  for (var t = 0; t < cuentaDeHijos.length; t++) {
    let grupoDeValores = [];
    for (var k = 0; k < cuentaDeHijos[t]; k++) {
      grupoDeValores.push(valuesPadre[contadorRecorridoDos]);
      contadorRecorridoDos++;
    }
    valoresAgrupados.push(grupoDeValores);
  }

  //Juntamos los titulos con los valores agrupados
  for (var h = 0; h < tituloArrastrarValues.length; h++) {
    valoresAgrupados[h].unshift(tituloArrastrarValues[h]);
  }

  //Creamos el objeto final
  let arrayObjetosFinal = []
  for (var h = 0; h < valoresAgrupados.length; h++) {
    arrayObjetosFinal.push($.extend({}, valoresAgrupados[h]));
  }


  return arrayObjetosFinal;

  //Prueba
  // console.log('Titulos');
  // console.log(tituloArrastrar);
  // console.log(tituloArrastrarValues);

  // console.log('Padre y sus hijos');
  // console.log(conceptoArrastrarContainer);

  // console.log('Cuenta de hijos por cada padre');
  // console.log(cuentaDeHijos);

  // console.log('IDS de los inputs');
  // console.log(conceptoArrastrarView);
  // console.log(definicionArrastrarView);

  // console.log('Valores de inputs concepto y definicion');
  // console.log(conceptoArrastrarViewValues);
  // console.log(definicionArrastrarViewValues);

  // console.log('Cadenas de valores de inputs juntas por parejas');
  // console.log(valuesPadre);

  // console.log('Valores agrupados');
  // console.log(valoresAgrupados);

}


/*
*   Funcion para la extracción de los datos y conversión a JSON
*/
function convertToJSON() {
  let valoresEjercicios = getEjerciciosValues_three();
  let valoresArrastrar = getArrastrarValues_four();

  //Se guarda en un JSON
  var jsonObject = {
    "preguntasModal3": valoresEjercicios,
    "preguntasModal4": valoresArrastrar
  }

  //Se imprime en la vista previa
  document.getElementById('output').innerText = JSON.stringify(jsonObject, null, 1);
  //Almacenamos el contenido del JSON en el input
  document.getElementById('jsonContentInput').value = JSON.stringify(jsonObject);
}

function downloadJson() {
  //Obtenemos el valor del preview del JSON
  var jsonObjectAsString = document.getElementById('output').innerText;

  //Hacemos la conversión
  var blob = new Blob([jsonObjectAsString], {
    //type: 'application/json'
    //octet es de tipo binario y es más eficiente
    type: 'octet/stream'
  });

  //Accedemos al boton de descarga
  let botonDescarga = document.getElementById('descargarJSON');

  //Accedemos al titulo del cuestionario
  const nombreCuestionario = document.getElementById('nombreCuestionario');
  let nombreCuestionarioArchivo;

  //Validamos si el nombre del archivo esta vacio
  if (nombreCuestionario.value == '') {
    nombreCuestionarioArchivo = 'cuestionario_default.json';
  } else {
    nombreCuestionarioArchivo = nombreCuestionario.value + '.json';
  }

  //Modificamos el boton de descarga
  botonDescarga.download = nombreCuestionarioArchivo;
  botonDescarga.href = window.URL.createObjectURL(blob);
}