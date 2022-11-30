//Guardamos todas las rutas en un array
let rutas = {
    "configuraciones_docente": {
        "textEspanol":{
            text1: 'Configuraciones',
            text2: 'Configuraciones',
            text3: 'volver'
        },
        "textIngles":{
            text1: 'Settings'
        },
        "textPortugues":{
            text1: 'Definições'
        },
        "textChino":{
            text1: '设置'
        }
    }
}

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
function elegirEspanol(){
    idiomaElegido = 'esp';
    guardarIdioma(idiomaElegido);
    asignarIdioma(localStorage.getItem('idioma'))
}

function elegirIngles(){
    idiomaElegido = 'en';
    guardarIdioma(idiomaElegido);
    asignarIdioma(localStorage.getItem('idioma'))
}

function elegirPortugues(){
    idiomaElegido = 'pt';
    guardarIdioma(idiomaElegido);
    asignarIdioma(localStorage.getItem('idioma'))
}

function elegirChino(){
    idiomaElegido = 'chn';
    guardarIdioma(idiomaElegido);
    asignarIdioma(localStorage.getItem('idioma'))
}

//Guardar el idioma
function guardarIdioma(idioma){
    localStorage.setItem('idioma', idioma);
}

//Validar idioma si no existe el valor en local storage
/* Asigna por default el español*/
function validarPorDefecto(){
    if (localStorage.getItem('idioma') === null){
        localStorage.setItem('idioma', 'esp');
    }
}

//Funcion que nos ayuda a obtener solo la ruta
function rutaValidation(stringUrl){
    stringUrl = stringUrl.reverse();
    stringUrl = stringUrl.join("");
    stringUrl = stringUrl.substring(0, stringUrl.indexOf("/"));
    stringUrl = stringUrl.replaceAll("!", "");
    stringUrl = stringUrl.replaceAll("#", "");
    stringUrl = stringUrl.split("");
    stringUrl = stringUrl.reverse();
    stringUrl = stringUrl.join("");
    return stringUrl;
}


//Asignación de los array con los texto de idiomas
function asignarIdioma(valorIdiomaLocalStorage){
    //Nos ayuda a elegir elemento del objeto.
    let rutaPage = (location.href).split("");
    rutaPage = rutaValidation(rutaPage);
   
    if(valorIdiomaLocalStorage === 'esp'){
        for(i = 0; i < TDI.length; i++){
            TDI[i].textContent = rutas[rutaPage].textEspanol.text1;
        }
    }else if(valorIdiomaLocalStorage === 'en'){
        for(i = 0; i < TDI.length; i++){
            TDI[i].textContent = rutas[rutaPage].textIngles.text1;
        }
    }else if(valorIdiomaLocalStorage === 'pt'){
        for(i = 0; i < TDI.length; i++){
            TDI[i].textContent = rutas[rutaPage].textPortugues.text1;
        }
    }else if(valorIdiomaLocalStorage === 'chn'){
        for(i = 0; i < TDI.length; i++){
            TDI[i].textContent = rutas[rutaPage].textChino.text1;
        }
    }
}