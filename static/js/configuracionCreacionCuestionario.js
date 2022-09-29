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
      "<div class='row'>" +
        "<div class='col s12 '>" +
        "Blank " +
        contadorModalRellenarEspaciosCreacion +
        "</div>" +
        "</div>" +
        "  <div class='row'>" +
        "<div class='col s12 '>" +
        "<input type='type' class='blankContadorEspaciosCreacion '>" +
        "</div>" +
        "</div>"
    );
  });
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
    var pregunta = $("#textAreaPreguntaOpccionMultipleCreacion").val();

    var opccionSel = $(
      "input:radio[name ='grupoOpcionesModalOpcionMuliple']:checked"
    ).val();

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
    var opcionA =
      " <div class='row'>" +
      "<div class='col s4'>" +
      " <p>" +
      "<label>" +
      "<input  type='radio' " +
      checkA +
      " />" +
      "<span>Correcta</span>" +
      "</label>" +
      "</p>" +
      "</div>" +
      "<div class='col s8'>" +
      " <a>Opcion A</a>" +
      "<a class='waves-effect waves-light btn ' style='width: 100%; height:50px;'>" +
      "<textarea  class='materialize-textarea' style='height: 600px;'>" +
      $("#opcionACreacion").val() +
      "</textarea>" +
      "</a>" +
      "</div>" +
      "</div>";
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

    var opcionB =
      " <div class='row " +
      opcionBOculto +
      " '>" +
      "<div class='col s4'>" +
      " <p>" +
      "<label>" +
      "<input  type='radio' " +
      checkB +
      " />" +
      "<span>Correcta</span>" +
      "</label>" +
      "</p>" +
      "</div>" +
      "<div class='col s8'>" +
      " <a>Opcion B</a>" +
      "<a class='waves-effect waves-light btn ' style='width: 100%; height:50px;'>" +
      "<textarea  class='materialize-textarea' style='height: 600px;'>" +
      $("#opcionBCreacion").val() +
      "</textarea>" +
      "</a>" +
      "</div>" +
      "</div>";

    var opcionC =
      " <div class='row " +
      opcionCOculto +
      " '>" +
      "<div class='col s4'>" +
      " <p>" +
      "<label>" +
      "<input  type='radio' " +
      checkC +
      " />" +
      "<span>Correcta</span>" +
      "</label>" +
      "</p>" +
      "</div>" +
      "<div class='col s8'>" +
      " <a>Opcion C</a>" +
      "<a class='waves-effect waves-light btn ' style='width: 100%; height:50px;'>" +
      "<textarea  class='materialize-textarea' style='height: 600px;'>" +
      $("#opcionCCreacion").val() +
      "</textarea>" +
      "</a>" +
      "</div>" +
      "</div>";

    var opcionD =
      " <div class='row " +
      opcionDOculto +
      " '>" +
      "<div class='col s4'>" +
      " <p>" +
      "<label>" +
      "<input  type='radio' " +
      checkD +
      " />" +
      "<span>Correcta</span>" +
      "</label>" +
      "</p>" +
      "</div>" +
      "<div class='col s8'>" +
      " <a>Opcion D</a>" +
      "<a class='waves-effect waves-light btn ' style='width: 100%; height:50px;'>" +
      "<textarea  class='materialize-textarea' style='height: 600px;'>" +
      $("#opcionDCreacion").val() +
      "</textarea>" +
      "</a>" +
      "</div>" +
      "</div>";

    var contenedor =
      "<div class='row preguntaOpccionMultiple'>" +
      " <div class='col s12 ''>" +
      "  <div class='card '>" +
      " <div class='card-content '>" +
      "<h4>Opccion multiple</h4>" +
      " <div class='row'>" +
      "<div class='input-field col s12'>" +
      "<textarea  class='materialize-textarea textoPregunta'>" +
      pregunta +
      "</textarea>" +
      "</div>" +
      "</div>" +
      opcionA +
      opcionB +
      opcionC +
      opcionD +
      " <div class='row'>" +
      "<div class='col s6'>" +
      "<a class='waves-effect waves-light btn btnEliminarPreguntaOpcionMultiple'>" +
      "Eliminar" +
      "</a>" +
      "</div>" +
      "<div class='col s6'>" +
      "<a class='waves-effect waves-light btn btnAgregarOpcionMultiple '>" +
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