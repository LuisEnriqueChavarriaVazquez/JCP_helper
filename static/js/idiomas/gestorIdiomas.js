import rutas from "./textos.mjs";

//Botones para elegir los idiomas
const seleccionarEspanol = document.querySelector('#seleccionarEspanol');
const seleccionarIngles = document.querySelector('#seleccionarIngles');
const seleccionarPortugues = document.querySelector('#seleccionarPortugues');
const seleccionarChino = document.querySelector('#seleccionarChino');

//Accedemos a todos los elementos que funcionen con clase de texto dinámico
let TDI = document.getElementsByClassName('TDI');

//Variable para el idioma elegido
let idiomaElegido = '';
validarPorDefecto();

//Eventos del boton de idioma
seleccionarEspanol.addEventListener('click', elegirEspanol);
seleccionarIngles.addEventListener('click', elegirIngles);
seleccionarPortugues.addEventListener('click', elegirPortugues);
seleccionarChino.addEventListener('click', elegirChino);

//Asignación de los idiomas
function elegirEspanol() {
    idiomaElegido = 'esp';
    guardarIdioma(idiomaElegido);
    asignarIdioma(localStorage.getItem('idioma'));
}

function elegirIngles() {
    idiomaElegido = 'en';
    guardarIdioma(idiomaElegido);
    asignarIdioma(localStorage.getItem('idioma'));
}

function elegirPortugues() {
    idiomaElegido = 'pt';
    guardarIdioma(idiomaElegido);
    asignarIdioma(localStorage.getItem('idioma'));
}

function elegirChino() {
    idiomaElegido = 'chn';
    guardarIdioma(idiomaElegido);
    asignarIdioma(localStorage.getItem('idioma'));
}

//Guardar el idioma
function guardarIdioma(idioma) {
    localStorage.setItem('idioma', idioma);
}

//Validar idioma si no existe el valor en local storage
/* Asigna por default el español*/
function validarPorDefecto() {
    if (localStorage.getItem('idioma') === null) {
        localStorage.setItem('idioma', 'esp');
        asignarIdioma(localStorage.getItem('idioma'));
    } else {
        asignarIdioma(localStorage.getItem('idioma'));
    }
}

//Funcion que nos ayuda a obtener solo la ruta
function rutaValidation(stringUrl) {
    //Debemos validar aquellos casos en los que la URL tiene un ID
    if (stringUrl.includes("editGroup")) {
        return "editGroup"
    } else if (stringUrl.includes("viewGroup")) {
        return "viewGroup"
    } else if (stringUrl.includes("viewGroupEstudiante")) {
        return "viewGroupEstudiante"
    } else if (stringUrl.includes("viewCuestionario")) {
        console.log('stringUrl', stringUrl)
        if (stringUrl.search(/viewCuestionarioInfo/) != -1) {
            console.log(stringUrl.search(/viewCuestionarioInfo/))
            return "viewCuestionarioInfo"
        } else if (stringUrl.search(/viewCuestionario/) != -1) {
            console.log(stringUrl.search(/viewCuestionario/) != -1)
            return "viewCuestionario"
        }
    } else if (stringUrl.includes("previewVerComoALumnoCuestionario")) {
        return "previewVerComoALumnoCuestionario"
    } else if (stringUrl.includes("simularRevision")) {
        return "simularRevision"
    } else if (stringUrl.includes("perfil_general_view")) {
        return "perfil_general_view"
    } else if (stringUrl.includes("editarPerfilProfesor")) {
        return "editarPerfilProfesor"
    } else if (stringUrl.includes("editarPerfilAlumno")) {
        return "editarPerfilAlumno"
    } else if (stringUrl.includes("mis_grupos")) {
        return "mis_grupos"
    } else if (stringUrl.includes("viewTeacherProfile")) {
        return "viewTeacherProfile"
    } else if (stringUrl.includes("answerCuestionarioAlumno")) {
        return "answerCuestionarioAlumno"
    } else if (stringUrl.includes("revisarAlumno")) {
        return "revisarAlumno"
    } else if (stringUrl.includes("resultadoAlumno")) {
        return "resultadoAlumno"
    } else if (stringUrl.includes("cuestionarioPendiente")) {
        return "cuestionarioPendiente"
    } else if (stringUrl.includes("cuestionarioListo")) {
        return "cuestionarioListo"
    } else if (stringUrl.includes("noIntentosDisponibles")) {
        return "noIntentosDisponibles"
    } else if (stringUrl.includes("gestionar_resultados_alumno")) {
        return "gestionar_resultados_alumno"
    }

    //En caso de que la URL no tenga IDs
    stringUrl = stringUrl.split("");
    stringUrl = stringUrl.reverse();
    stringUrl = stringUrl.join("");
    stringUrl = stringUrl.substring(0, stringUrl.indexOf("/"));
    stringUrl = stringUrl.replaceAll("!", "");
    stringUrl = stringUrl.replaceAll("#", "");
    stringUrl = stringUrl.split("");
    stringUrl = stringUrl.reverse();
    stringUrl = stringUrl.join("");
    if (stringUrl == "") {
        return "index";
    } else {
        return stringUrl;
    }
}


//Asignación de los array con los texto de idiomas
function asignarIdioma(valorIdiomaLocalStorage) {
    //Nos ayuda a elegir elemento del objeto.
    let rutaPage = rutaValidation(location.href);

    //Para el caso de páginas que tienen distintas vistas según el caso.
    if (rutaPage == "resultadoAlumno" || rutaPage == "answerCuestionarioAlumno") {
        if (casePageVariable == "First_case_page") {
            if (valorIdiomaLocalStorage === 'esp') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textEspanol.texts_1[i];
                }
            } else if (valorIdiomaLocalStorage === 'en') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textIngles.texts_1[i];
                }
            } else if (valorIdiomaLocalStorage === 'pt') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textPortugues.texts_1[i];
                }
            } else if (valorIdiomaLocalStorage === 'chn') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textChino.texts_1[i];
                }
            }
        }else if(casePageVariable == "Second_case_page"){
            if (valorIdiomaLocalStorage === 'esp') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textEspanol.texts_2[i];
                }
            } else if (valorIdiomaLocalStorage === 'en') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textIngles.texts_2[i];
                }
            } else if (valorIdiomaLocalStorage === 'pt') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textPortugues.texts_2[i];
                }
            } else if (valorIdiomaLocalStorage === 'chn') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textChino.texts_2[i];
                }
            }
        }else if(casePageVariable == "Third_case_page"){
            if (valorIdiomaLocalStorage === 'esp') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textEspanol.texts_3[i];
                }
            } else if (valorIdiomaLocalStorage === 'en') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textIngles.texts_3[i];
                }
            } else if (valorIdiomaLocalStorage === 'pt') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textPortugues.texts_3[i];
                }
            } else if (valorIdiomaLocalStorage === 'chn') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textChino.texts_3[i];
                }
            }
        }else if(casePageVariable == "Fourth_case_page"){
            if (valorIdiomaLocalStorage === 'esp') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textEspanol.texts_4[i];
                }
            } else if (valorIdiomaLocalStorage === 'en') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textIngles.texts_4[i];
                }
            } else if (valorIdiomaLocalStorage === 'pt') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textPortugues.texts_4[i];
                }
            } else if (valorIdiomaLocalStorage === 'chn') {
                for (var i = 0; i < TDI.length; i++) {
                    TDI[i].textContent = rutas[rutaPage].textChino.texts_4[i];
                }
            }
        }
    } else { //Para el caso de páginas standar
        if (valorIdiomaLocalStorage === 'esp') {
            for (var i = 0; i < TDI.length; i++) {
                TDI[i].textContent = rutas[rutaPage].textEspanol.texts[i];
            }
        } else if (valorIdiomaLocalStorage === 'en') {
            for (var i = 0; i < TDI.length; i++) {
                TDI[i].textContent = rutas[rutaPage].textIngles.texts[i];
            }
        } else if (valorIdiomaLocalStorage === 'pt') {
            for (var i = 0; i < TDI.length; i++) {
                TDI[i].textContent = rutas[rutaPage].textPortugues.texts[i];
            }
        } else if (valorIdiomaLocalStorage === 'chn') {
            for (var i = 0; i < TDI.length; i++) {
                TDI[i].textContent = rutas[rutaPage].textChino.texts[i];
            }
        }
    }

}