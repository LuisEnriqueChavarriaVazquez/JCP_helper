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
    }else if(stringUrl.includes("viewGroup")){
        return "viewGroup"
    }else if(stringUrl.includes("viewCuestionario")){
        return "viewCuestionario"
    }else if(stringUrl.includes("previewVerComoALumnoCuestionario")){
        return "previewVerComoALumnoCuestionario"
    }else if(stringUrl.includes("simularRevision")){
        return "simularRevision"
    }else if(stringUrl.includes("perfil_general_view")){
        return "perfil_general_view"
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