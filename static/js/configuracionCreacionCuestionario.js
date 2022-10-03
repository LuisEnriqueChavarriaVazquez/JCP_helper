var contadorModalRellenarEspaciosCreacion = 0;

//Opccion para agregar opccion a la opcción multiple
$(document).ready(function () {
  $("#btnAgregarModalOpcionMultipleCreacion").click(function () {
    $("#contenedorOpccionesOpccionMultipleModalCreacion .hide")
      .first()
      .removeClass("hide");
  });
});


//Opccion para hacer que pongan los espacios en la de completar espacios
$(document).ready(function () {
  $("#btnAgregarModalRellenarEspaciosCreacion").click(function () {
    var textoInput = $("#texAreaModalRellenarEspaciosCreacion").val();
    contadorModalRellenarEspaciosCreacion++;
    $("#texAreaModalRellenarEspaciosCreacion").val(
      textoInput + " [Blank " + contadorModalRellenarEspaciosCreacion + "]"
    );
    $("#contenedorOpccionEspaciosCreacion").append(
      "<div class='row containerTextBlank'>" +
      "<div class='col s12 m6 containerTextBlankSon1'>" +
      "Blank " +
      contadorModalRellenarEspaciosCreacion +
      "</div>" +
      "<div class='col s12 m6 containerTextBlankSon2'>" +
      "<input type='text' class='browser-default blankContadorEspaciosCreacion '>" +
      "</div>" +
      "</div>"
    );
  });
});

// Eliminar pregunta de opccion multiple
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnEliminarPreguntaEspacioBlanco",
    function () {
      $(this).closest(".preguntaRellenarEspacios").remove();
    }
  );
});
//Opccion para hacer que pongan los espacios en las preguntas  de completar espacios
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
  });
});

//Opcion para guardar preguntas de opccion multiple
$(document).ready(function () {
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

    //Guardamos lo que vamos a imprimir
    var opcionA =
      "<div class='row colorGreyWhiter bordered1 opcionContainer'>" +
      "<div class='col s12 m3 labelContainer'>" +
      "<label>" +
      "<input  type='radio' " +
      checkA +
      "/>" +
      "<span>Correcta</span>" +
      "</label>" +
      "</div>" +
      "<div class='col s12 m9'>" +
      "<h6><b>Opción A</b></h6>" +
      "<textarea id='opcionACreacion' class='materialize-textarea'>" +
      $("#opcionACreacion").val() +
      "</textarea>" +
      "</div>" +
      "</div>";

    //Validamos en caso de que este vacio
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
      " <div class='row colorGreyWhiter bordered1 opcionContainer " +
      opcionBOculto +
      "'>" +
      "<div class='col s12 m3 labelContainer'>" +
      "<label>" +
      "<input  type='radio' " +
      checkB +
      "/>" +
      "<span>Correcta</span>" +
      "</label>" +
      "</div>" +
      "<div class='col s12 m9'>" +
      "<h6><b>Opción B</b></h6>" +
      "<textarea class='materialize-textarea'>" +
      $("#opcionBCreacion").val() +
      "</textarea>" +
      "</div>" +
      "</div>";

    var opcionC =
      "<div class='row colorGreyWhiter bordered1 opcionContainer " +
      opcionCOculto +
      "'>" +
      "<div class='col s12 m3 labelContainer'>" +
      "<label>" +
      "<input  type='radio' " +
      checkC +
      "/>" +
      "<span>Correcta</span>" +
      "</label>" +
      "</div>" +
      "<div class='col s12 m9'>" +
      "<h6><b>Opción C</b></h6>" +
      "<textarea class='materialize-textarea'>" +
      $("#opcionCCreacion").val() +
      "</textarea>" +
      "</div>" +
      "</div>";

    var opcionD =   
      "<div class='row colorGreyWhiter bordered1 opcionContainer " +
      opcionDOculto +
      "'>" +
      "<div class='col s12 m3 labelContainer'>" +
      "<label>" +
      "<input  type='radio' " +
      checkD +
      "/>" +
      "<span>Correcta</span>" +
      "</label>" +
      "</div>" +
      "<div class='col s12 m9'>" +
      "<h6><b>Opción D</b></h6>" +
      "<textarea class='materialize-textarea'>" +
      $("#opcionDCreacion").val() +
      "</textarea>" +
      "</div>" +
      "</div>";

    var contenedor =
      "<div class='row preguntaOpccionMultiple'>" +
        "<div class='col s12'>" +
          "<div class='card colorGrey bordered2'>" +
            "<div class='card-content '>" +
              "<h5>Opción múltiple</h5>" +
            "<div class='row'>" +
              "<div class='input-field col s12'>" +
                  "<textarea class='materialize-textarea textoPregunta' placeholder='Pregunta'>" +
                    pregunta +
                  "</textarea>" +
              "</div>" +
            "</div>" +
              opcionA +
              opcionB +
              opcionC +
              opcionD +
              "<div class='containerButtonsView'>" +
                "<div>" +
                "<a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnEliminarPreguntaOpcionMultiple'><i class='material-icons left'>delete_sweep</i>Eliminar todo</a>" +
                "</div>" +
                "<div>" +
                "<a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnEliminarUltimaPreguntaOpcionMultiple'><i class='material-icons left'>delete</i>Eliminar última</a>" +
                "</div>" +
                "<div>" +
                "<a class='waves-effect waves-light btn bordered5 color2 shadow-2e btnAgregarOpcionMultiple'><i class='material-icons left'>add</i>Agregar</a>" +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";
    $("#contenedorCuestionarioPreguntas").append(contenedor);
  });
});

//Opcion para dar la opccionde rellenar espacioss
$(document).ready(function () {
  $("#btnGuardarModalRellenarEspaciosCreacion").click(function () {
    var contadorInicial = 1;
    var textoOpcciones = "";
    $("#contenedorOpccionEspaciosCreacion .blankContadorEspaciosCreacion").each(
      function (index, obj) {
        textoOpcciones =
          textoOpcciones +
          "<div class='row'>" +
          "<div class='col s12 '>" +
          "Blank " +
          contadorInicial +
          "</div>" +
          "</div>" +
          "  <div class='row'>" +
          "<div class='col s12 '>" +
          "<input type='type' value='" +
          $(this).val() +
          "' class='blankContadorEspaciosCreacion'>" +
          "</div>" +
          "</div>";
        contadorInicial++;
      }
    );

    var pregunta = $("#texAreaModalRellenarEspaciosCreacion").val();

    var contenedor =
      "<div class='row preguntaRellenarEspacios'>" +
      " <div class='col s12 ''>" +
      "  <div class='card '>" +
      " <div class='card-content '>" +
      "<h4>Rellenar espacios</h4>" +
      " <div class='row'>" +
      "<div class='input-field col s12'>" +
      "<textarea  class='materialize-textarea textoPregunta'>" +
      pregunta +
      "</textarea>" +
      "</div>" +
      "</div>" +
      "<div class='row' >" +
      "<div class='col 12 espaciosBlancos' >" +
      textoOpcciones +
      "</div >" +
      "</div >" +
      " <div class='row'>" +
      "<div class='col s6'>" +
      "<a class='waves-effect waves-light btn btnEliminarPreguntaEspacioBlanco '>" +
      "Eliminar" +
      "</a>" +
      "</div>" +
      "<div class='col s6'>" +
      "<a class='waves-effect waves-light btn btnAgregarEspacioBlanco '>" +
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

// Agregar opcciones a las preguntas de opccion multiple
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnAgregarOpcionMultiple",
    function () {
      var preguntaOpccionMultiple = $(this).closest(".preguntaOpccionMultiple");
      preguntaOpccionMultiple.find(".hide").first().removeClass("hide");
    }
  );
});

// Agregar opcciones a las preguntas de opccion multiple
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnAgregarOpcionMultiple",
    function () {
      var preguntaOpccionMultiple = $(this).closest(".preguntaOpccionMultiple");
      var elementoBorrar = preguntaOpccionMultiple.find(".hide").first();
      elementoBorrar.removeClass(".hide");
    }
  );
});

// Eliminar pregunta de opccion multiple
$(document).ready(function () {
  $("#contenedorCuestionarioPreguntas").on(
    "click",
    ".btnEliminarPreguntaOpcionMultiple",
    function () {
      $(this).closest(".preguntaOpccionMultiple").remove();
    }
  );
});

// Agregar espacios en blanco
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
        "<div class='row'>" +
        "<div class='col s12 '>" +
        "Blank " +
        numeroEspacios +
        "</div>" +
        "</div>" +
        "  <div class='row'>" +
        "<div class='col s12 '>" +
        "<input type='type' class='blankContadorEspaciosCreacion'>" +
        "</div>" +
        "</div>"
      );

      var preguntaAgregar =
        preguntaRellenarEspacios.find(".textoPregunta").val() +
        "[Blank" +
        numeroEspacios +
        "]";
      preguntaRellenarEspacios.find(".textoPregunta").val(preguntaAgregar);
    }
  );
});


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

ingresarTitulo();