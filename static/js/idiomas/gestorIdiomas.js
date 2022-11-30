//Guardamos todas las rutas en un array
let rutas = {
    "configuraciones_docente": {
        "textEspanol": {
            texts: [
                "Configuraciones",
                "Configuraciones",
                "volver",
                "Cuenta de usuario",
                "Cuenta de usuario",
                "Opciones de la cuenta.",
                "Modificar cuenta",
                "Acceso a informes",
                "Vistazo perfil",
                "Eliminar cuenta",
                "Colores",
                "Colores",
                "Selector de temas",
                "Paleta actual",
                "Accesibilidad",
                "Accesibilidad",
                "Selector de temas adaptados",
                "Paleta actual",
                "Idioma",
                "Idioma",
                "Idiomas disponibles",
                "Español",
                "Inglés",
                "Portugués",
                "Mandarín",
                "¿Desea eliminar su cuenta?",
                "Esta acción es irreversible, deseas continuar",
                "Cancelar",
                "Continuar",
            ]
        },
        "textIngles": {
            texts: [
                "Settings",
                "Settings",
                "return",
                "User account",
                "User account",
                "Account Options.",
                "Modify account",
                "Access to reports",
                "profile look",
                "Delete account",
                "Colors",
                "Colors",
                "Theme selector",
                "Current Palette",
                "Accessibility",
                "Accessibility",
                "Custom theme selector",
                "Current Palette",
                "Idiom",
                "Idiom",
                "Available languages",
                "Spanish",
                "English",
                "Portuguese",
                "Mandarin",
                "Do you want to delete your account?",
                "This action is irreversible, you wish to continue",
                "Cancel",
                "Continue",
            ]
        },
        "textPortugues": {
            texts: [
                "Definições",
                 "Definições",
                 "Retorna",
                 "Conta de usuario",
                 "Conta de usuario",
                 "Opções de conta.",
                 "Modificar conta",
                 "Acesso a relatórios",
                 "look de perfil",
                 "Eliminar conta",
                 "Cores",
                 "Cores",
                 "Seletor de tema",
                 "Paleta atual",
                 "Acessibilidade",
                 "Acessibilidade",
                 "Seletor de tema personalizado",
                 "Paleta atual",
                 "Idioma",
                 "Idioma",
                 "Idiomas disponíveis",
                 "Espanhol",
                 "Inglês",
                 "Português",
                 "Mandarim",
                "Deseja deletar sua conta?",
                "Esta ação é irreversível, você deseja continuar",
                "Cancelar",
                "Continuar",
            ]
        },
        "textChino": {
            texts: [
                "设置",
                "设置",
                "返回",
                "用户帐号",
                "用户帐号",
                "账户选项。",
                 "修改账户",
                "访问报告",
                "个人资料外观",
                "删除帐户",
                "颜色",
                "颜色",
                "主题选择器",
                "当前调色板",
                "辅助功能",
                "辅助功能",
                "自定义主题选择器",
                "当前调色板",
                "成语",
                "成语",
                "可用语言",
                "西班牙语",
                "英语",
                "葡萄牙语",
                "普通话",
                "你想删除你的帐户吗？",
                "此操作不可逆，您希望继续",
                "取消",
                "继续",
            ]
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
    stringUrl = stringUrl.split("");
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
function asignarIdioma(valorIdiomaLocalStorage) {
    //Nos ayuda a elegir elemento del objeto.
    let rutaPage = rutaValidation(location.href);

    if (valorIdiomaLocalStorage === 'esp') {
        for (i = 0; i < TDI.length; i++) {
            TDI[i].textContent = rutas[rutaPage].textEspanol.texts[i];
        }
    } else if (valorIdiomaLocalStorage === 'en') {
        for (i = 0; i < TDI.length; i++) {
            TDI[i].textContent = rutas[rutaPage].textIngles.texts[i];
        }
    } else if (valorIdiomaLocalStorage === 'pt') {
        for (i = 0; i < TDI.length; i++) {
            TDI[i].textContent = rutas[rutaPage].textPortugues.texts[i];
        }
    } else if (valorIdiomaLocalStorage === 'chn') {
        for (i = 0; i < TDI.length; i++) {
            TDI[i].textContent = rutas[rutaPage].textChino.texts[i];
        }
    }
}