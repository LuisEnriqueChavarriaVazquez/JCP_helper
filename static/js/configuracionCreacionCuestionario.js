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
function eliminarEspacioModal(){
  //Boton de elimnado
  const btnEliminarModalRellenarEspaciosCreacion = document.getElementById('btnEliminarModalRellenarEspaciosCreacion');
  //Contenedor de los espacios en el modal
  const containerTextBlankModal = document.getElementsByClassName('containerTextBlankModal');
  //Input de la pregunta
  const texAreaModalRellenarEspaciosCreacion = document.getElementById('texAreaModalRellenarEspaciosCreacion');

  //Cuando hacemos click en el boton se activa la funcion
  btnEliminarModalRellenarEspaciosCreacion.addEventListener('click', eliminarEspacio);

  //Funcion de elinar elemento
  function eliminarEspacio(){
    //Trabajamos con los textos del input
    let textoInput = texAreaModalRellenarEspaciosCreacion.value;
    console.log("1 "+ textoInput);
    let textoReemplazado = '[Blank '+ contadorModalRellenarEspaciosCreacion +']';
    console.log("2 "+ textoReemplazado);
    let nuevoTextoInput = textoInput.replace(textoReemplazado,'');
    console.log("3 "+ nuevoTextoInput);
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
                  <textarea  class='materialize-textarea textoPregunta' placeholder='Pregunta'>`
      + pregunta +
      `</textarea>
                </div>
              </div>
              <div class='row containerTextBlank'>
                <div class='col s12 espaciosBlancos' >` + textoOpcciones + `</div>
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
        "[Blank" +
        numeroEspacios +
        "]";
      preguntaRellenarEspacios.find(".textoPregunta").val(preguntaAgregar);
      M.toast({ html: 'Espacio agregado' });
    }
  );
});

// Eliminar pregunta de opccion multiple (En la vista previa)
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
*  Función para mostrar el contenido de los ejercicios
*/

function agregarEjercicio() {
  const descripcionProblema = document.getElementById('descripcionProblema');
  const codigoResultado = document.getElementById('codigoResultado');
  const codigoMuestra = document.getElementById('codigoMuestra');

  //Boton de limpiar
  const limpiarCasillasEjercicioButton = document.getElementById('limpiarCasillasEjercicioButton');

  //Mostrar el código antes de agregarlo
  codigoResultado.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      mostrarCódigoMuestra();
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
    codigoMuestra.innerText = "";
  }
}

/*
  ######################################################
  MODAL 4: PARA ARRASTRAR
  ######################################################
*/

//Agregar elemento para arrastrar (en la vista previa) 
$(document).ready(function () {
  $("#btnAgregarsModalArrastrarCreacion").click(function () {
    $("#opccionesArrastarModalCreacion").append(
      " <div class='row opccionLinea'>" +
      " <div class='input-field col s6'>" +
      "  <input placeholder='Placeholder'   type='text' class='textoArrastrarCreacion'>" +
      "</div>" +
      "<div class='col s6 '>" +
      "<a class='waves-effect waves-light btn '  style='width: 100 %; height: 100px;'>" +
      "<textarea placeholder='Opccion' id='opccion' class='materialize-textarea textoOpccionCreacion  '></textarea>" +
      "</a>" +
      "</div>" +
      "</div>"
    );
    M.toast({ html: 'agregar' });
  });
});

//Opcion para guardar preguntas de Arrastrar
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

      textoElementos =
        textoElementos +
        " <div class='row opccionLinea'>" +
        " <div class='input-field col s6'>" +
        "  <input placeholder='Placeholder'   type='text' class='textoArrastrarCreacion'  value='" +
        texto +
        "'>" +
        "</div>" +
        "<div class='col s6 '>" +
        "<a class='waves-effect waves-light btn '  style='width: 100 %; height: 100px;'>" +
        "<textarea placeholder='Opccion' id='opccion' class='materialize-textarea textoOpccionCreacion  '>" +
        opccion +
        "</textarea>" +
        "</a>" +
        "</div>" +
        "</div>";
    });

    var contenedor =
      "<div class='row'>" +
      " <div class='col s12 ''>" +
      "  <div class='card '>" +
      " <div class='card-content '>" +
      "<h4>Arrastrar</h4>" +
      " <div class='row'>" +
      " <div class='row'>" +
      "<div class='input-field col s12'>" +
      "<textarea  class='materialize-textarea textoPregunta'>" +
      pregunta +
      "</textarea>" +
      "<label >Pregunta</label>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "<div class='row'>" +
      "<div class='col s12' >" +
      textoElementos +
      "</div>" +
      "</div>" +
      " <div class='row'>" +
      "<div class='col s6'>" +
      "<a class='waves-effect waves-light btn '>" +
      "Eliminar" +
      "</a>" +
      "</div>" +
      "<div class='col s6'>" +
      "<a class='waves-effect waves-light btn '>" +
      "Agregar" +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("#contenedorCuestionarioPreguntas").append(contenedor);
  });
});




/*
  ######################################################
  EXTRA: INTERACCIÓN EN GENERAL
  ######################################################
*/

/*
*   Función para el ingreso del titulo
*/
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
      tituloCuestionario.innerText = nombreCuestionario.value;
      inputNombreCuestionario[0].classList.add('hiddenElement');
      contenedorTitulo[0].classList.remove('hiddenElement');
    }
  }

  editTitulo.addEventListener('click', editarTitulo);
  function editarTitulo() {
    nombreCuestionario.value = tituloCuestionario.innerText;
    inputNombreCuestionario[0].classList.remove('hiddenElement');
    contenedorTitulo[0].classList.add('hiddenElement');
  }
}



//Funciones para el titulo
ingresarTitulo();

//Funcion para que el ejercicios (codigo se visualize en preview de codigo)
agregarEjercicio();