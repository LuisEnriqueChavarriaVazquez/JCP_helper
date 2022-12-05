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
    M.toast({ html: '➕1️⃣' });
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

    M.toast({ html: '🧹👍😀' });
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

    //console.log(opccionSel);

    //Evaluamos la que esta como checked
    var checkA = "";
    var checkB = "";
    var checkC = "";
    var checkD = "";

    if (opccionSel == "A") {
      checkA = "checked";
    } else if (opccionSel == "B") {
      checkB = "checked";
    } else if (opccionSel == "C") {
      checkC = "checked";
    } else if (opccionSel == "D") {
      checkD = "checked";
    }

    function agregarContenidoVistaPrevia() {
      //Guardamos lo que vamos a imprimir
      var opcionA =
        `<div class='row colorGreyWhiter bordered1 opcionContainer'> 
        <div class='col s12 m3 labelContainer'> 
          <label> 
            <input  type='radio' class="colorTextReverse" value='A' name='group` + contadorPreguntaOptMultiple + `' ` + checkA + `/> 
            <span>✅</span> 
          </label> 
        </div> 
        <div class='col s12 m9'> 
          <h6><b class="colorTextReverse">Opt. A</b></h6> 
          <textarea id='opcionACreacion' class='materialize-textarea colorTextReverse' name='textArea` + contadorPreguntaOptMultiple + `'>`
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

      var mediaProblemaOpcionMultiple = document.getElementById('mediaProblemaOpcionMultiple').value;

      //En caso de que tengan contenido imprimimos
      var opcionB =
        `<div class='row colorGreyWhiter bordered1 opcionContainer ` + opcionBOculto + `'>` +
        `<div class='col s12 m3 labelContainer'>
            <label>
              <input  type='radio' class="colorTextReverse" value='B' name='group` + contadorPreguntaOptMultiple + `' ` + checkB + `/>
              <span>✅</span>
            </label>
        </div>
        <div class='col s12 m9'>
            <h6><b class="colorTextReverse">Opt. B</b></h6>
            <textarea class='materialize-textarea colorTextReverse' name='textArea` + contadorPreguntaOptMultiple + `'>`
        + $("#opcionBCreacion").val() +
        `</textarea>
        </div>
      </div>`;

      var opcionC =
        `<div class='row colorGreyWhiter bordered1 opcionContainer ` + opcionCOculto + `'>` +
        `<div class='col s12 m3 labelContainer'>
          <label>
            <input type='radio' class="colorTextReverse" value='C' name='group` + contadorPreguntaOptMultiple + `' ` + checkC + ` />
            <span>✅</span>
          </label>
        </div>
        <div class='col s12 m9'>
          <h6><b class="colorTextReverse">Opt. C</b></h6>
          <textarea class='materialize-textarea colorTextReverse' name='textArea` + contadorPreguntaOptMultiple + `'>`
        + $("#opcionCCreacion").val() +
        `</textarea>
        </div>
      </div>`;

      var opcionD =
        `<div class='row colorGreyWhiter bordered1 opcionContainer ` + opcionDOculto + `'>` +
        `<div class='col s12 m3 labelContainer'>
          <label>
            <input type='radio' class="colorTextReverse" value='D' name='group` + contadorPreguntaOptMultiple + `' ` + checkD + ` />
            <span>✅</span>
          </label>
        </div>
        <div class='col s12 m9'>
          <h6><b class="colorTextReverse">Opt. D</b></h6>
          <textarea class='materialize-textarea colorTextReverse' name='textArea` + contadorPreguntaOptMultiple + `'>`
        + $("#opcionDCreacion").val() +
        `</textarea>
        </div>
      </div>`;

      var contenedor =
        `<div class='row preguntaOpccionMultiple preguntaGlobal opt1'>
        <div class='col s12'>
          <div class='card colorWhite bordered2'>
            
            <div class="input-field col s12">
              <input maxlength="1" min="0" max="5" placeholder="Points 1-5" type="number" class="colorTextReverse ponderacionGlobal validate shadow-1e colorGrey ponderacionInput browser-default">
            </div>
            
            <div class='card-content '>
              <h5>Type: (Q/1)</h5>
            <div class='row'>
              <div class='input-field col s12'>
                <textarea id="tituloOpcionMultiple` + contadorPreguntaOptMultiple + `" class='materialize-textarea colorTextReverse textoPregunta'>`
        + pregunta +
        `</textarea>
              </div>
              <div class="input-field col s12">
                  <i class="material-icons prefix">image</i>
                  <textarea id="mediaProblemaOpcionMultiple` + contadorPreguntaOptMultiple + `" class="materialize-textarea colorTextReverse">`
        + mediaProblemaOpcionMultiple +
        `</textarea>
                  <label class="active colorTextReverse" for="mediaProblemaOpcionMultiple` + contadorPreguntaOptMultiple + `">Img. (url)</label>
              </div>
            </div>` +
        opcionA +
        opcionB +
        opcionC +
        opcionD +
        `<div class='containerButtonsView'>
                  <div>
                    <a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnAgregarOpcionMultiple'><i class='material-icons left'>add</i>1</a>
                  </div>
                  <div>
                    <a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnEliminarUltimaPreguntaOpcionMultiple'><i class='material-icons left'>remove</i>1</a>
                  </div>
                  <div>
                    <a class='waves-effect waves-light btn bordered5 color1 shadow-2e btnEliminarPreguntaOpcionMultiple'><i class='material-icons left'>delete_sweep</i>❓</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      $("#contenedorCuestionarioPreguntas").append(contenedor);
      M.toast({ html: '➕❓' });
      contadorPreguntaOptMultiple++;
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
      M.toast({ html: '➕1️⃣' });
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
      M.toast({ html: '➖1️⃣👍' });
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
      M.toast({ html: '➖1️⃣❓👍' });
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
      textoInput + "[Blank " + contadorModalRellenarEspaciosCreacion + "]"
    );
    $("#contenedorOpccionEspaciosCreacion").append(
      `<div class='row containerTextBlank containerTextBlankModal'>
        <div class='col s12 m6 containerTextBlankSon1 colorTextReverse'> Blank `
      + contadorModalRellenarEspaciosCreacion +
      `</div>
        <div class='col s12 m6 containerTextBlankSon2'>
          <input type='text' class='browser-default colorTextReverse blankContadorEspaciosCreacion'>
        </div>
      </div>`
    );
    M.toast({ html: '➕1️⃣👍' });
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
    //console.log("1 " + textoInput);
    let textoReemplazado = '[Blank ' + contadorModalRellenarEspaciosCreacion + ']';
    //console.log("2 " + textoReemplazado);
    let nuevoTextoInput = textoInput.replace(textoReemplazado, '');
    //console.log("3 " + nuevoTextoInput);
    texAreaModalRellenarEspaciosCreacion.value = nuevoTextoInput;
    //console.log(texAreaModalRellenarEspaciosCreacion);

    //Elimina el último elemento de los espacio
    containerTextBlankModal[containerTextBlankModal.length - 1].remove();

    //Hace que el contador disminuya 1
    contadorModalRellenarEspaciosCreacion--;

    M.toast({ html: '➖1️⃣👍' });
  }
}

eliminarEspacioModal();


//Insertar preguntas de rellenar espacio
/*
* Agregar pregunta de completar espacio (En el modal)
*/
var contadorPreguntaRellenar = 0;
var contadorInputRellenar = 0;
$(document).ready(function () {
  $("#btnGuardarModalRellenarEspaciosCreacion").click(function () {
    var contadorInicial = 1;
    var textoOpcciones = "";
    $("#contenedorOpccionEspaciosCreacion .blankContadorEspaciosCreacion").each(
      function (index, obj) {
        textoOpcciones =
          textoOpcciones +
          `<div class='row containerTextBlank'>
            <div class='col s12 m6 containerTextBlankSon1 colorTextReverse '>Blank`
          + contadorInicial +
          `</div>
            <div class='col s12 m6 containerTextBlankSon2 '>
              <input id="rellenarInputCValue` + contadorInputRellenar + `" type='text' value='` + $(this).val() + `' class='browser-default colorTextReverse blankContadorEspaciosCreacion'>
            </div>
          </div>`;
        contadorInputRellenar++;
        contadorInicial++;
      }
    );

    var pregunta = $("#texAreaModalRellenarEspaciosCreacion").val();

    var contenedor =
      `<div class='row preguntaRellenarEspacios preguntaGlobal opt2'>
        <div class='col s12 ''>
          <div class='card colorWhite bordered2'>
          <div class="input-field col s12">
              <input maxlength="1" min="0" max="5" placeholder="Points 1-5" type="number" class="ponderacionGlobal colorTextReverse validate shadow-1e colorGrey ponderacionInput browser-default">
            </div>
            <div class='card-content '>
              <h5>Type: (Q/2)</h5>
              <div class='row'>
                <div class='input-field col s12'>
                  <textarea id="rellenarInputTitulo` + contadorPreguntaRellenar + `" class='materialize-textarea colorTextReverse textoPregunta textoPreguntaVistaPrevia' placeholder='Pregunta'>`
      + pregunta +
      `</textarea>
                </div>
              </div>
              <div class='row containerTextBlank'>
                <div id="rellenarInputCContainer` + contadorPreguntaRellenar + `" class='col s12 espaciosBlancos containerTextBlankVistaPrevia'>` + textoOpcciones + `</div>
              </div>
              <div class='containerButtonsView'>
                <div>
                  <a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnAgregarEspacioBlanco'><i class='material-icons left'>add</i>1</a>
                </div>
                <div>
                  <a class='waves-effect waves-light btn bordered5 color1 shadow-2e btnEliminarPreguntaEspacioBlanco'><i class='material-icons left'>delete_sweep</i>➖❓</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    $("#contenedorCuestionarioPreguntas").append(contenedor);
    M.toast({ html: '➕1️⃣❓👍' });
    contadorPreguntaRellenar++;
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

      contadorInputRellenar++;
      var lugarDeEspacios = preguntaRellenarEspacios.find(".espaciosBlancos");
      var numeroEspacios =
        lugarDeEspacios.find(".blankContadorEspaciosCreacion").length + 1;
      lugarDeEspacios.append(
        `<div class='row containerTextBlank'>
          <div class='col s12 m6 containerTextBlankSon1 colorTextReverse'> Blank ` + numeroEspacios + `</div>
          <div class='col s12 m6 containerTextBlankSon2'>
            <input id="rellenarInputCValue` + contadorInputRellenar + `" type='text' class='browser-default blankContadorEspaciosCreacion '>
          </div>
        </div>`);

      var preguntaAgregar =
        preguntaRellenarEspacios.find(".textoPregunta").val() +
        "[Blank " +
        numeroEspacios +
        "]";
      preguntaRellenarEspacios.find(".textoPregunta").val(preguntaAgregar);
      M.toast({ html: '➕1️⃣👍' });
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
      M.toast({ html: '➖1️⃣❓👍' });
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
      M.toast({ html: '➕Code👍' });
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
    M.toast({ html: '🧹👍' });
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
      M.toast({ html: '👍📖' });
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
  //Imagen o video del problema
  const mediaProblema = document.getElementById('mediaProblema');
  //Output esperado
  const salidaProblema = document.getElementById('salidaProblema');
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
      `<div class='row preguntasEjercicios preguntaGlobal opt3'>
          <div class='col s12'>
            <div class='card colorWhite bordered2'>
            <div class="input-field col s12">
              <input maxlength="1" min="0" max="5" placeholder="Points 1-5" type="number" class="ponderacionGlobal colorTextReverse validate shadow-1e colorGrey ponderacionInput browser-default">
            </div>
            <div class='card-content '>
              <h5>Type: (Q/3)</h5>
              <br>
              <div class='row'>
                <div class="input-field col s12">
                    <i class="material-icons prefix">description</i>
                    <textarea id="descripcionProblema` + contadorEjerciciosEnContenedor + `" class="materialize-textarea colorTextReverse">` + descripcionProblema.value + `</textarea>
                    <label class="active" for="descripcionProblema` + contadorEjerciciosEnContenedor + `">Problem.</label>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">image</i>
                    <textarea id="mediaProblema` + contadorEjerciciosEnContenedor + `" class="materialize-textarea colorTextReverse">` + mediaProblema.value + `</textarea>
                    <label class="active" for="mediaProblema` + contadorEjerciciosEnContenedor + `">Img. (url)</label>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">task</i>
                    <textarea id="salidaProblema` + contadorEjerciciosEnContenedor + `" class="materialize-textarea colorTextReverse">` + salidaProblema.value + `</textarea>
                    <label class="active" for="salidaProblema` + contadorEjerciciosEnContenedor + `">Output (opc.)</label>
                </div>
              </div>
              <div class="row colorGreyWhiter bordered2 contenedorOpcionesCodigo">
                <div class="col s12">
                    <h6><b class="colorTextReverse">Code.</b></h6>
                </div>
                <div class="input-field col s12">
                    <input type="file" id="inputfile` + contadorEjerciciosEnContenedor + `" class="hidden"/>
                    <a class="waves-effect waves-light btn bordered5 color2 shadow-2e" href="#"
                    id="leerArchivoEjercicio` + contadorEjerciciosEnContenedor + `" style="width: 100%;"><i
                    class="material-icons left">upload_file</i>
                    <label 
                    onclick="agregarContenidoIndividualArchivo('codigoMuestra` + contadorEjerciciosEnContenedor + `', 'inputfile` + contadorEjerciciosEnContenedor + `')"
                    for="inputfile` + contadorEjerciciosEnContenedor + `" class="colorText colorTextReverse">File upload.</label></a>
                </div>
                <div class="col s12">
                    <h6><b class="colorTextReverse">Online file.</b></h6>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">cloud_circle</i>
                    <input class="colorTextReverse" type="text" id="carpetaOnline` + contadorEjerciciosEnContenedor + `" value="` + carpetaOnline.value + `"></input>
                    <label class="active" for="carpetaOnline` + contadorEjerciciosEnContenedor + `">Link to folder (URL)</label>
                </div>                        
                <div class="col s12">
                    <h6><b class="colorTextReverse">Manual code</b></h6>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">history_edu</i>
                    <textarea 
                    onchange="agregarContenidoIndividual('codigoMuestra` + contadorEjerciciosEnContenedor + `', 'codigoResultado` + contadorEjerciciosEnContenedor + `')" 
                    id="codigoResultado` + contadorEjerciciosEnContenedor + `" class="materialize-textarea colorTextReverse">` + codigoResultado.value + `</textarea>
                    <label class="active" for="codigoResultado` + contadorEjerciciosEnContenedor + `">Manual code</label>
                </div>
            </div>
            <h5><b>Code preview</b></h5>
            <div class="previewCodeContainerNoModal bordered2" style="width: 100%;">
                <code class="colorText">
                    <pre id="codigoMuestra` + contadorEjerciciosEnContenedor + `">`
      + codigoMuestraContenido +
      `</pre>
                </code>
            </div>
              <div class='containerButtonsView'>
                <div>
                  <a class='waves-effect waves-light btn bordered5 color1 shadow-2e btnEliminarEjercicios'><i class='material-icons left'>delete_sweep</i>➖❓</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    $("#contenedorCuestionarioPreguntas").append(ejercicio);
    M.toast({ html: '➕1️⃣🏋️‍♂️💻' });
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
      M.toast({ html: '👍📖' });
    })
}

// Eliminar pregunta de ejercicio (En la vista previa)
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnEliminarEjercicios",
    function () {
      $(this).closest(".preguntasEjercicios").remove();
      M.toast({ html: '➖1️⃣❓👍' });
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
          <input placeholder='(a) Column 1' type='text' class='textoArrastrarCreacion  browser-default conceptoDefinicion'>
        </div>
        <div class='col s12 m6'>
          <input placeholder='(b) Column 2' type="text" class='textoOpccionCreacion browser-default conceptoDefinicion'>
        </div>
      </div>`);
    M.toast({ html: '➕1️⃣👍' });
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
            <input id="conceptoArrastrarView` + contadorArrastrarPreguntas + `" value="` + texto + `" placeholder='(a) Column 1' type='text' class='textoArrastrarCreacion browser-default conceptoDefinicion'>
          </div>
          <div class='col s12 m6'>
            <input id="definicionArrastrarView` + contadorArrastrarPreguntas + `" value="` + opccion + `" placeholder='(b) Column 2' type="text" class='textoOpccionCreacion browser-default conceptoDefinicion'>
          </div>
        </div>`;
    });

    var contenedor =
      `<div class='row preguntasArrastrado preguntaGlobal opt4'>
      <div class='col s12'>
        <div class='card colorWhite bordered2'>
        <div class="input-field col s12">
              <input maxlength="1" min="0" max="5" placeholder="Points 1-5" type="number" class="ponderacionGlobal colorTextReverse validate shadow-1e colorGrey ponderacionInput browser-default">
            </div>
          <div class='card-content'>
            <h5>Type (Q/6)</h5>
            <div class='row'>
              <div class='row col s12'>
                <div class='input-field col s12'>
                  <i class="material-icons prefix">description</i>
                  <textarea id="tituloArrastrar` + contadorContenedorArrastraPreguntas + `" class='materialize-textarea colorTextReverse textoPregunta'>` + pregunta + `</textarea>
                  <label for="tituloArrastrar` + contadorContenedorArrastraPreguntas + `" class="active">Desc.</label>
                </div>
              </div>
            </div>
            <div class='row'>
              <div class="col s12 m6">
                <h6 class="tituloColumnaModal colorTextReverse"><b>Column (A)</b></h6>
              </div>
              <div class='col s12 m6'>
                <h6 class="tituloColumnaModal colorTextReverse"><b>Column (B)</b></h6>
              </div>
              <div id="conceptoArrastrarContainerParent` + contadorContenedorArrastraPreguntas + `" class='col s12'>` + textoElementos + `</div>
            </div>
            <div class='containerButtonsView'>
                <div>
                  <a 
                  onclick="agregarContenidoArrastrarPreview('conceptoArrastrarContainerParent` + contadorContenedorArrastraPreguntas + `')"
                  class='waves-effect waves-light btn bordered5 color2 shadow-2e btnAgregarConceptoArrastrable'><i class='material-icons left'>add</i>1</a>
                </div>
                <div>
                  <a 
                  onclick="eliminarContenidoArrastrarPreview('conceptoArrastrarContainerParent` + contadorContenedorArrastraPreguntas + `')"
                  class='waves-effect waves-light btn bordered5 color2 shadow-2e btnEliminarConceptoArrastrable'><i class='material-icons left'>remove</i>1</a>
                </div>
                <div>
                  <a class='waves-effect waves-light btn bordered5 color1 shadow-2e btnEliminarPreguntaConceptoArrastrable'><i class='material-icons left'>delete_sweep</i>➖❓</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    $("#contenedorCuestionarioPreguntas").append(contenedor);
    contadorContenedorArrastraPreguntas++;
    M.toast({ html: '➕1️⃣❓👍' });
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
      <input id="conceptoArrastrarView` + contadorArrastrarPreguntas + `" value="" placeholder='(a) Column 1' type='text' class='textoArrastrarCreacion browser-default conceptoDefinicion'>
    </div>
    <div class='col s12 m6'>
      <input id="definicionArrastrarView` + contadorArrastrarPreguntas + `" value="" placeholder='(b) Column 2' type="text" class='textoOpccionCreacion browser-default conceptoDefinicion'>
    </div>
  </div>`);
  M.toast({ html: '➕1️⃣👍' });
}

//Eliminar concepto y elemento (en la vista previa)
function eliminarContenidoArrastrarPreview(conceptoArrastrarContainerParent) {
  //Es en donde estan contenidos los conceptos y las definiciones
  var IDContendorPadre = conceptoArrastrarContainerParent;
  //Accedemos al elemento
  var contendorPadre = document.getElementById(IDContendorPadre);
  //Eliminamos el último elemento
  contendorPadre.removeChild(contendorPadre.lastChild);
  M.toast({ html: '➖1️⃣👍' });
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
      M.toast({ html: '➖1️⃣❓👍' });
    }
  );
});

//crearListasDragAndDrop();


/*
  ######################################################
  MODAL 5: PARA False True
  ######################################################
*/

//Guardar nuevo ejercicio
var contadorFalseTrue = 0;
function agregarFalseTrue() {
  //Descripcion
  const preguntaFalseVerdadero = document.getElementById('preguntaFalseVerdadero');
  //Respuesta
  const textFalseVerdadero = document.getElementById('textFalseVerdadero');
  //Button
  const saveFalseVerdadero = document.getElementById('saveFalseVerdadero');

  saveFalseVerdadero.addEventListener('click', agregarNuevaPregunta);
  function agregarNuevaPregunta() {
    contadorFalseTrue++;
    let ejercicio =
      `<div class='row preguntasTrueFalse preguntaGlobal opt5'>
          <div class='col s12'>
            <div class='card colorWhite bordered2'>
            <div class="input-field col s12">
              <input maxlength="1" min="0" max="5" placeholder="Points 1-5" type="number" class="ponderacionGlobal colorTextReverse validate shadow-1e colorGrey ponderacionInput browser-default">
            </div>
            <div class='card-content '>
            <h5>Type: (Q/4)</h5>
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">description</i>
                            <textarea id="preguntaFalseVerdadero` + contadorFalseTrue + `"  class="materialize-textarea colorTextReverse">` + preguntaFalseVerdadero.value + `</textarea>
                            <label class="active" for="preguntaFalseVerdadero` + contadorFalseTrue + `">Question</label>
                        </div>
                        <div class="input-field col s12">
                        <h6><b class="colorTextReverse">True or false</b></h6>
                        <br>
                            <input maxlength="1" value="` + textFalseVerdadero.value + `" class="colorTextReverse" placeholder="T/F" id="textFalseVerdadero` + contadorFalseTrue + `" type="text" class="validate shadow-1e colorGreyWhiter falsoVerdaderoInput browser-default">
                        </div>
                    </div>
                    <button
                    class="waves-effect deleteFalseVerdadero waves-light btn bordered5 color1 shadow-2e"
                    id="deleteFalseVerdadero` + contadorFalseTrue + `" style="width: 100%;">
                    <i class="material-icons left">delete_sweep</i>➖❓</button>
                    </div>
                </form>
            </div>`;
    $("#contenedorCuestionarioPreguntas").append(ejercicio);
    M.toast({ html: '➕1️⃣🏋️‍♂️💻' });
  }
}
agregarFalseTrue();

// Eliminar pregunta de arrastrado (En la vista previa)
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".deleteFalseVerdadero",
    function () {
      $(this).closest(".preguntasTrueFalse").remove();
      M.toast({ html: '➖1️⃣❓👍' });
    }
  );
});

/*
  ######################################################
  MODAL 6: PARA Preguntas abiertas
  ######################################################
*/

//Guardar nuevo ejercicio
var contadorAbiertaPregunta = 0;
function agregarAbierta() {
  //Descripcion
  const preguntaAbiertaDescripcion = document.getElementById('preguntaAbiertaDescripcion');
  //Video de la pregunta abierta
  const videoPreguntaAbierta = document.getElementById('videoPreguntaAbierta');
  //Imagen de la pregunta abierta
  const imagePreguntaAbierta = document.getElementById('imagePreguntaAbierta');
  //Button para guardar la pregunta abierta
  const saveAbierta = document.getElementById('saveAbierta');

  saveAbierta.addEventListener('click', agregarNuevaPregunta);
  function agregarNuevaPregunta() {
    contadorAbiertaPregunta++;
    let ejercicio =
      `<div class='row preguntasAbiertas preguntaGlobal opt6'>
          <div class='col s12'>
            <div class='card colorWhite bordered2'>
            <div class="input-field col s12">
              <input maxlength="1" min="0" max="5" placeholder="Points 1-5" type="number" class="ponderacionGlobal colorTextReverse validate shadow-1e colorGrey ponderacionInput browser-default">
            </div>
            <div class='card-content '>
            <h5>Type: (Q/5)</h5>
                <hr>
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">description</i>
                                <textarea id="preguntaAbiertaDescripcion` + contadorAbiertaPregunta + `"  class="materialize-textarea colorTextReverse">` + preguntaAbiertaDescripcion.value + `</textarea>
                                <label class="active" for="preguntaAbiertaDescripcion` + contadorAbiertaPregunta + `">Problem.</label>
                            </div>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">play_arrow</i>
                                <textarea id="videoPreguntaAbierta` + contadorAbiertaPregunta + `" class="materialize-textarea colorTextReverse">` + videoPreguntaAbierta.value + `</textarea>
                                <label class="active" for="videoPreguntaAbierta` + contadorAbiertaPregunta + `">Video</label>
                            </div>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">image</i>
                                <textarea id="imagePreguntaAbierta` + contadorAbiertaPregunta + `"  class="materialize-textarea colorTextReverse">` + imagePreguntaAbierta.value + `</textarea>
                                <label class="active" for="imagePreguntaAbierta` + contadorAbiertaPregunta + `">Img</label>
                            </div>
                        </div>
                        <button
                          class="waves-effect deleteAbierta deleteFalseVerdadero waves-light btn bordered5 color1 shadow-2e"
                          id="deleteAbierta` + contadorAbiertaPregunta + `" style="width: 100%;">
                          <i class="material-icons left">delete_sweep</i>Borrar pregunta</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>`;
    $("#contenedorCuestionarioPreguntas").append(ejercicio);
    M.toast({ html: '➕1️⃣🏋️‍♂️💻' });
  }
}
agregarAbierta();

// Eliminar pregunta de arrastrado (En la vista previa)
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".deleteAbierta",
    function () {
      $(this).closest(".preguntasAbiertas").remove();
      M.toast({ html: '➖1️⃣❓👍' });
    }
  );
});

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
  const nombreCuestionarioConClave = document.getElementById('nombreCuestionarioConClave');
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
        tituloCuestionario.innerText = nombreCuestionario.value;
        inputNombreCuestionario[0].classList.add('hiddenElement');
        contenedorTitulo[0].classList.remove('hiddenElement');
        nombreCuestionarioConClave.value = nombreCuestionario.value + " (" + clave + ")";
        codigoAgregado = true;
      } else {
        tituloCuestionario.innerText = nombreCuestionario.value;
        inputNombreCuestionario[0].classList.add('hiddenElement');
        contenedorTitulo[0].classList.remove('hiddenElement');
        nombreCuestionarioConClave.value = nombreCuestionario.value + " (" + clave + ")";
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

function getAllNames() {
  //Con esto podemos buscar IDS de elementos en concreto
  let NAMES_supreme_container = document.querySelectorAll('*[name]');

  //Lista para solo el atributo de ID
  let atributoName = []
  //Obtenemos solo el atributo de ID
  for (var j = 0; j < NAMES_supreme_container.length; j++) {
    atributoName[j] = NAMES_supreme_container[j].getAttribute('name');
  }
  return atributoName;
}

/*
* Obtener IDS/names y valores; preguntas de opcion multiples
*/
function getOpcionMultipleValues_one() {
  //Todas las IDS
  let ids_all = getAllIds();

  //Todos los names
  let names_all = getAllNames();

  //Contador de asignacion
  let contadorAsignacion1 = 0;
  let contadorAsignacion2 = 0;
  let contadorAsignacion3 = 0;
  let contadorAsignacion4 = 0;

  //Contenedores con valores importantes
  let inputTitulos = []; //Por ID
  let mediaProblemaOpcionMultiple = []; //Por ID
  let inputRadios = []; //Por name
  let inputOpciones = []; //Por name

  //Buscamos entre las IDS
  for (var i = 0; i < ids_all.length; i++) {
    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('tituloOpcionMultiple') != -1) {
      inputTitulos[contadorAsignacion1++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('mediaProblemaOpcionMultiple') != -1) {
      mediaProblemaOpcionMultiple[contadorAsignacion4++] = ids_all[i];
    }
  }

  //Buscamos entre los names
  for (var i = 0; i < names_all.length; i++) {
    //Buscamos coincidencias en lista 2
    if (names_all[i].indexOf('group') != -1) {
      inputRadios[contadorAsignacion2++] = names_all[i];
    }

    //Buscamos coincidencias en lista 3
    if (names_all[i].indexOf('textArea') != -1) {
      inputOpciones[contadorAsignacion3++] = names_all[i];
    }
  }

  /*
  * Valores de los inputs de pregunta
  */
  //Guardamos solo los valores de los titulos
  var inputTitulosValue = [];
  var mediaProblemaOpcionMultipleValue = [];
  for (var k = 0; k < inputTitulos.length; k++) {
    //Obtenemos valores del titulo
    inputTitulosValue[k] = document.getElementById(inputTitulos[k]).value;
    //Obtenemos valores del archivo de media
    mediaProblemaOpcionMultipleValue[k] = document.getElementById(mediaProblemaOpcionMultiple[k]).value;
  }

  /*
  * Valores de los textarea 
  */
  var elementOpcion = []; //Todos los elementos textarea (nodos)
  for (var i = 0; i < inputOpciones.length / 4; i++) {
    //Se guardan todos los inputs (nodos) de cada pregunta
    elementOpcion.push(document.querySelectorAll('[name="' + inputOpciones[i * 4] + '"]'));

  }

  //Buscamos valores de los elementos de opcion
  var elementOpcionValues = [];
  var elementOpcionValuesTotal = [];
  for (var j = 0; j < elementOpcion.length; j++) {
    elementOpcionValues = [];
    for (var h = 0; h < 4; h++) {
      //console.log(elementOpcion[j][h].value);
      elementOpcionValues.push(elementOpcion[j][h].value);
      if (h == 3) {
        elementOpcionValuesTotal.push(elementOpcionValues);
      }
    }
  }

  /*
  * Valores de los radio 
  */
  //Buscamos el parametro checked entre los radios
  var elementRadio = []; //Todos los elementos radio (nodos)
  var elementRadioCheckedValue = []; //Solo valores con checked (1 por pregunta)
  for (var i = 0; i < inputRadios.length / 4; i++) {
    //Se guardan todos los inputs radio (nodos) de cada pregunta
    elementRadio.push(document.querySelectorAll('[name="' + inputRadios[i * 4] + '"]'));
    //Buscamos coincidencias con el atributo checked
    for (var j = 0; j < 4; j++) {
      if (elementRadio[i][j].checked) {
        elementRadioCheckedValue.push(elementRadio[i][j].value);
      } else if (j == 3 && elementRadioCheckedValue[i] === undefined) {
        elementRadioCheckedValue.push("Empty");
      }
    }
  }

  //Mezclemos todo en un solo array (Titulo, media, respuesta correcta y opciones)
  for (var t = 0; t < elementOpcionValuesTotal.length; t++) {
    elementOpcionValuesTotal[t].unshift(elementRadioCheckedValue[t]);
    elementOpcionValuesTotal[t].unshift(mediaProblemaOpcionMultipleValue[t]);
    elementOpcionValuesTotal[t].unshift(inputTitulosValue[t]);
  }

  //Creamos el objeto final
  let arrayObjetosFinal = []
  for (var h = 0; h < elementOpcionValuesTotal.length; h++) {
    arrayObjetosFinal.push($.extend({}, elementOpcionValuesTotal[h]));
  }

  return arrayObjetosFinal;

  //Importante
  // console.log('Valores de titulos');
  // console.log(inputTitulosValue);
  // console.log('Valores de checked');
  // console.log(elementRadioCheckedValue);
  // console.log('Valores de opciones');
  // console.log(elementOpcionValuesTotal);

  //Prueba
  // console.log('IDs');
  // console.log(ids_all);
  // console.log('Titulos IDS');
  // console.log(inputTitulos);
  // //Importante
  // console.log(inputTitulosValue);
  // console.log('Inputs Names');
  // console.log(inputRadios);
  // console.log(inputOpciones);
  // console.log('Elementos de radio');
  // console.log(elementRadio);
}

/*
* Obtener IDS y valores; preguntas acompletar
*/
function getRellenarValues_two() {
  //Todas las IDS
  let ids_all = getAllIds();

  //Contador de asignacion
  let contadorAsignacion1 = 0;
  let contadorAsignacion2 = 0;
  let contadorAsignacion3 = 0;

  //Contenedores con valores importantes
  let rellenarInputTitulo = [];
  //Padre e hijo (caja y palabras) 
  let rellenarInputCContainer = [];
  //IDS inputs 
  let rellenarInputCValue = [];

  //Buscamos entre las IDS
  for (var i = 0; i < ids_all.length; i++) {
    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('rellenarInputTitulo') != -1) {
      rellenarInputTitulo[contadorAsignacion1++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 2
    if (ids_all[i].indexOf('rellenarInputC') != -1) {
      rellenarInputCContainer[contadorAsignacion2++] = ids_all[i];
    }

    //Valores de ID de los inputs de value
    if (ids_all[i].indexOf('rellenarInputCValue') != -1) {
      rellenarInputCValue[contadorAsignacion3++] = ids_all[i];
    }
  }

  let rellenarInputTituloValue = [];

  //Guardamos solo los valores de los titulos
  for (var k = 0; k < rellenarInputTitulo.length; k++) {
    //Obtenemos valores del titulo
    rellenarInputTituloValue[k] = document.getElementById(rellenarInputTitulo[k]).value;
  }

  //Contamos los hijos de cada padre
  var contadorHijos = 0;
  var cuentaDeHijos = [];
  for (var k = 0; k < rellenarInputCContainer.length; k++) {
    if (rellenarInputCContainer[k].indexOf('rellenarInputCContainer') == -1) {
      //console.log('Soy un hijo');
      contadorHijos++;
      //Para contar el ultimo
      if (rellenarInputCContainer.length - k == 1) {
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
  let rellenarInputCValuesTotal = [];
  for (var t = 0; t < cuentaDeHijos.length; t++) {
    for (var k = 0; k < cuentaDeHijos[t]; k++) {
      let valor = document.getElementById(rellenarInputCValue[contadorRecorrido]).value;
      rellenarInputCValuesTotal.push(valor);
      contadorRecorrido++;
    }
  }

  //Separamos los valores por grupo (por pregunta)
  let valoresAgrupados = [];
  let contadorRecorridoDos = 0;
  for (var t = 0; t < cuentaDeHijos.length; t++) {
    let grupoDeValores = [];
    for (var k = 0; k < cuentaDeHijos[t]; k++) {
      grupoDeValores.push(rellenarInputCValuesTotal[contadorRecorridoDos]);
      contadorRecorridoDos++;
    }
    valoresAgrupados.push(grupoDeValores);
  }

  //Juntamos los titulos con los valores agrupados
  for (var h = 0; h < rellenarInputTituloValue.length; h++) {
    valoresAgrupados[h].unshift(rellenarInputTituloValue[h]);
  }

  //Creamos el objeto final
  let arrayObjetosFinal = []
  for (var h = 0; h < valoresAgrupados.length; h++) {
    arrayObjetosFinal.push($.extend({}, valoresAgrupados[h]));
  }

  return arrayObjetosFinal;

  //Prueba
  // console.log('IDs titulos');
  // console.log(rellenarInputTitulo);
  // console.log('IDs padre e hijos');
  // console.log(rellenarInputCContainer);
  // console.log('IDs de hijos');
  // console.log(rellenarInputCValue);
  // console.log('Valores titulo');
  // console.log(rellenarInputTituloValue);
  // console.log('Contador de hijos en el contenedor');
  // console.log(cuentaDeHijos);
  // console.log('Valores de inputs');
  // console.log(rellenarInputCValuesTotal);
  // console.log('Valores de hijos agrupados');
  // console.log(valoresAgrupados);
  // console.log('Objeto final');
  // console.log(arrayObjetosFinal);

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
  let contadorAsignacion5 = 0;

  //Contenedores con valores importantes
  let descripcionProblema = [];
  let mediaProblema = [];
  let carpetaOnline = [];
  let codigoMuestra = [];
  let outputProblema = [];

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

    //Buscamos coincidencias en lista 5
    if (ids_all[i].indexOf('salidaProblema') != -1) {
      outputProblema[contadorAsignacion5++] = ids_all[i];
    }
  }

  //Contenedores con los valores de las listas
  let descripcionProblemaValues = [];
  let mediaProblemaValues = [];
  let carpetaOnlineValues = [];
  let codigoMuestraValues = [];
  let outputProblemaValues = [];

  //Guardamos solo los valores
  for (var k = 0; k < descripcionProblema.length - 1; k++) {
    descripcionProblemaValues[k] = document.getElementById(descripcionProblema[k]).value;
    mediaProblemaValues[k] = document.getElementById(mediaProblema[k]).value;
    carpetaOnlineValues[k] = document.getElementById(carpetaOnline[k]).value;
    outputProblemaValues[k] = document.getElementById(outputProblema[k]).value;
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
    valoresOrganizados.push(outputProblemaValues[h]);
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
    let individualValue = conceptoArrastrarViewValues[k] + "*" + definicionArrastrarViewValues[k];
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
* Obtener IDS de preguntas de TRUE Y FALSE
*/
function getOpcionFalseTrue_five() {
  //Todas las IDS
  let ids_all = getAllIds();

  //Contador de asignacion
  let contadorAsignacion1 = 0;
  let contadorAsignacion2 = 0;

  //Contenedores con valores importantes
  let inputPregunta = []; //Por ID
  let inputFalseTrue = []; //Por ID

  //Buscamos entre las IDS
  for (var i = 0; i < ids_all.length; i++) {
    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('preguntaFalseVerdadero') != -1) {
      inputPregunta[contadorAsignacion1++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('textFalseVerdadero') != -1) {
      inputFalseTrue[contadorAsignacion2++] = ids_all[i];
    }
  }

  /*
  * Valores de los inputs de pregunta
  */
  //Guardamos solo los valores de los titulos
  var inputPreguntaValue = [];
  var inputFalseTrueValue = [];
  for (var k = 0; k < inputPregunta.length; k++) {
    //Obtenemos valores del titulo
    inputPreguntaValue[k] = document.getElementById(inputPregunta[k]).value;
    //Obtenemos valores del archivo de media
    inputFalseTrueValue[k] = document.getElementById(inputFalseTrue[k]).value;
  }

  //Tenemos que mezclar los arrays y separalos por pregunta
  let valoresOrganizadosTotal = []
  for (var h = 0; h < inputPreguntaValue.length; h++) {
    let valoresOrganizados = []
    valoresOrganizados.push(inputPreguntaValue[h]);
    valoresOrganizados.push(inputFalseTrueValue[h]);
    valoresOrganizadosTotal.push(valoresOrganizados);
  }

  valoresOrganizadosTotal.pop();

  //Creamos el objeto final
  let arrayObjetosFinal = []
  for (var h = 0; h < valoresOrganizadosTotal.length; h++) {
    arrayObjetosFinal.push($.extend({}, valoresOrganizadosTotal[h]));
  }

  return arrayObjetosFinal;
}

/*
* Obtener IDS de preguntas de TRUE Y FALSE
*/
function getAbierta_six() {
  //Todas las IDS
  let ids_all = getAllIds();

  //Contador de asignacion
  let contadorAsignacion1 = 0;
  let contadorAsignacion2 = 0;
  let contadorAsignacion3 = 0;

  //Contenedores con valores importantes
  let preguntaAbiertaDescripcion = [];
  let videoPreguntaAbierta = [];
  let imagePreguntaAbierta = [];

  //Buscamos entre las IDS
  for (var i = 0; i < ids_all.length; i++) {
    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('preguntaAbiertaDescripcion') != -1) {
      preguntaAbiertaDescripcion[contadorAsignacion1++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('videoPreguntaAbierta') != -1) {
      videoPreguntaAbierta[contadorAsignacion2++] = ids_all[i];
    }

    //Buscamos coincidencias en lista 1
    if (ids_all[i].indexOf('imagePreguntaAbierta') != -1) {
      imagePreguntaAbierta[contadorAsignacion3++] = ids_all[i];
    }
  }

  /*
  * Valores de los inputs de pregunta
  */
  //Guardamos solo los valores de los titulos
  let preguntaAbiertaDescripcionValue = [];
  let videoPreguntaAbiertaValue = [];
  let imagePreguntaAbiertaValue = [];
  for (var k = 0; k < preguntaAbiertaDescripcion.length; k++) {
    //Obtenemos valores del titulo
    preguntaAbiertaDescripcionValue[k] = document.getElementById(preguntaAbiertaDescripcion[k]).value;
    //Obtenemos valores del archivo de media
    videoPreguntaAbiertaValue[k] = document.getElementById(videoPreguntaAbierta[k]).value;
    //Obtenemos valores del archivo de media
    imagePreguntaAbiertaValue[k] = document.getElementById(imagePreguntaAbierta[k]).value;
  }

  //Tenemos que mezclar los arrays y separalos por pregunta
  let valoresOrganizadosTotal = []
  for (var h = 0; h < preguntaAbiertaDescripcionValue.length; h++) {
    let valoresOrganizados = []
    valoresOrganizados.push(preguntaAbiertaDescripcionValue[h]);
    valoresOrganizados.push(videoPreguntaAbiertaValue[h]);
    valoresOrganizados.push(imagePreguntaAbiertaValue[h]);
    valoresOrganizadosTotal.push(valoresOrganizados);
  }

  valoresOrganizadosTotal.pop();
  console.log(valoresOrganizadosTotal);

  //Creamos el objeto final
  let arrayObjetosFinal = []
  for (var h = 0; h < valoresOrganizadosTotal.length; h++) {
    arrayObjetosFinal.push($.extend({}, valoresOrganizadosTotal[h]));
  }

  return arrayObjetosFinal;
}


/*
*   Funcion para identificar el orden de las preguntas
*/

function identificarOrden() {
  //Obtenemos todas las preguntas
  let preguntasEnOrden = document.getElementsByClassName('preguntaGlobal');
  //Lista con el orden
  let listaDeOrden = [];
  //Validamos de que tipo de pregunta se trata
  for (var j = 0; j < preguntasEnOrden.length; j++) {
    if (preguntasEnOrden[j].getAttribute('class').indexOf('opt1') != -1) {
      listaDeOrden.push('optMultiple');
    } else if (preguntasEnOrden[j].getAttribute('class').indexOf('opt2') != -1) {
      listaDeOrden.push('optAcompletar');
    } else if (preguntasEnOrden[j].getAttribute('class').indexOf('opt3') != -1) {
      listaDeOrden.push('optEjercicios');
    } else if (preguntasEnOrden[j].getAttribute('class').indexOf('opt4') != -1) {
      listaDeOrden.push('optArrastrar');
    } else if (preguntasEnOrden[j].getAttribute('class').indexOf('opt5') != -1) {
      listaDeOrden.push('optFalsoVerdadero');
    } else if (preguntasEnOrden[j].getAttribute('class').indexOf('opt6') != -1) {
      listaDeOrden.push('optAbierta');
    }
  }

  //Metiendo todo en un objeto
  listaOrdenFinal = [];
  listaOrdenFinal.push($.extend({}, listaDeOrden));

  return listaOrdenFinal;
}

/*
* Obtener ponderaciones del cuestionario 
*/

function ponderacionGlobalObtener(){
  //obtencion de las ponderaciones
  let ponderacionGlobal = document.getElementsByClassName('ponderacionGlobal');
  //Lista en orden de las ponderaciones
  let listaDePonderaciones = [];
  
  //Validamos de que tipo de pregunta se trata
  for (var j = 0; j < ponderacionGlobal.length; j++) {
    listaDePonderaciones.push(ponderacionGlobal[j].value);
  }

  //Metiendo todo en un objeto
  let listaDePonderacionesFinal = [];
  listaDePonderacionesFinal.push($.extend({}, listaDePonderaciones));

  //console.log(listaDePonderacionesFinal);

  return listaDePonderacionesFinal;
}


/*
*   Funcion para la extracción de los datos y conversión a JSON
*/


function anexarJsonViejo(idMuestra, idInputFile) {
  document.getElementById(idInputFile)
    .addEventListener('change', function () {

      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById(idMuestra).innerText = fr.result;
        //Convertimos el texto del documento en un objeto JSON
        let objetoJson = JSON.parse(fr.result);
        //Almacenamos el contenido del JSON en el input
        document.getElementById('jsonContentInput').value = JSON.stringify(objetoJson);
      }

      fr.readAsText(this.files[0]);
      M.toast({ html: '👍📖' });
    })
}

function convertToJSON() {
  let valoresOpcionesMultiple = getOpcionMultipleValues_one();
  let valoresRellenar = getRellenarValues_two();
  let valoresEjercicios = getEjerciciosValues_three();
  let valoresArrastrar = getArrastrarValues_four();
  let valoresFalseTrue = getOpcionFalseTrue_five();
  let valoresAbierto = getAbierta_six();
  let ordenPreguntas = identificarOrden();
  let ponderacionGlobal = ponderacionGlobalObtener();
  //console.log(ponderacionGlobal);

  //Se guarda en un JSON
  var jsonObject = {
    "ordenPreguntas": ordenPreguntas,
    "ponderacionGlobal": ponderacionGlobal,
    "preguntasModal1": valoresOpcionesMultiple,
    "preguntasModal2": valoresRellenar,
    "preguntasModal3": valoresEjercicios,
    "preguntasModal4": valoresArrastrar,
    "preguntasModal5": valoresFalseTrue,
    "preguntasModal6": valoresAbierto
  }

  console.log(typeof jsonObject);

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
  const nombreCuestionarioConClave = document.getElementById('nombreCuestionarioConClave');
  let nombreCuestionarioArchivo;

  //Validamos si el nombre del archivo esta vacio
  if (nombreCuestionarioConClave.value == '') {
    nombreCuestionarioArchivo = 'cuestionario_default.json';
  } else {
    nombreCuestionarioArchivo = nombreCuestionarioConClave.value + '.json';
  }

  //Modificamos el boton de descarga
  botonDescarga.download = nombreCuestionarioArchivo;
  botonDescarga.href = window.URL.createObjectURL(blob);
}

/*
  ######################################################
  EXTRA: Agregar archivos JSON viejos
  ######################################################
*/

/*
*   Función para eobtener la ruta del archivo y leerlo
*/

function leerArchivosCuestionariosAnteriores() {
  //Boton de cargar ruta
  const linkOculto = document.getElementById('linkOculto');
  const archivoExistenteButton = document.getElementById('archivoExistenteButton');
  //Menu de selección de ruta
  const archivoCuestionarioExistente = document.getElementById('archivoCuestionarioExistente');

  archivoExistenteButton.addEventListener('click', obtenerRuta);
  function obtenerRuta() {
    let IDcuestionario = archivoCuestionarioExistente.value;
    let rutaFinal = '/duplicarCuestionarios/' + IDcuestionario;
    //linkOculto.setAttribute('href', rutaFinal);
    window.location.href = rutaFinal;
    console.log('click');
  }
}

leerArchivosCuestionariosAnteriores();