let allContentNoti = document.getElementById('allContentNotification');
let notificacionesData = document.getElementById('notificacionesData').value;
//Data limpia
let dataClean = limpiarDatos(notificacionesData);
console.log(dataClean)
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

//Accedemos al contenedor de las notificaciones
let boxShowNotificaciones = document.getElementById('boxShowNotificaciones');

//Accedemos a todos los botones
let newStd = document.getElementById('newStd');
let newAnswer = document.getElementById('newAnswer');
let newAbandon = document.getElementById('newAbandon');
let newComent = document.getElementById('newComent');
let newApel = document.getElementById('newApel');
let newGeral = document.getElementById('newGeral');
let newImportante = document.getElementById('newImportante');
let newTodas = document.getElementById('newTodas');

//Funcionalidad para los botones
newTodas.addEventListener('click', () => imprimirTodas());
newStd.addEventListener('click', () => imprimirNewStd());
newAnswer.addEventListener('click', () => imprimirNewAnswer());
newAbandon.addEventListener('click', () => imprimirNewAbandon());
newComent.addEventListener('click', () => imprimirNewFeedback());
newApel.addEventListener('click', () => imprimirNewApel());
newGeral.addEventListener('click', () => imprimirNewApel());
newImportante.addEventListener('click', () => imprimirNewImportant());
newGeral.addEventListener('click', () => imprimirNewGeral());

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//Imprimimos todas las notificaciones
function imprimirTodas() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.map(element => {
        return `<div class="notiUpdated colorGrey colorTextReverse">
            ${element[2]}
        </div>`
    });
    let contentString = contentNoti.join('');
    boxShowNotificaciones.innerHTML = contentString;
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewStd() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[4] == "new_std") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated colorGrey colorTextReverse">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    boxShowNotificaciones.innerHTML = contentString;
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewAnswer() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[4] == "new_resolve") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated colorGrey colorTextReverse">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    boxShowNotificaciones.innerHTML = contentString;
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewTest() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[4] == "new_test") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated colorGrey colorTextReverse">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    boxShowNotificaciones.innerHTML = contentString;
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewAbandon() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[4] == "new_abandon") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated colorGrey colorTextReverse">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    boxShowNotificaciones.innerHTML = contentString;
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewFeedback() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[4] == "new_feedback") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated colorGrey colorTextReverse">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    boxShowNotificaciones.innerHTML = contentString;
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewApel() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[4] == "new_apel") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated colorGrey colorTextReverse">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    boxShowNotificaciones.innerHTML = contentString;
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewImportant() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[2] == "important") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated colorGrey colorTextReverse">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    boxShowNotificaciones.innerHTML = contentString;
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewGeral() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[2] == "general") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated colorGrey colorTextReverse">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    boxShowNotificaciones.innerHTML = contentString;
}