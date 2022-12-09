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

//Accedemos a los botones pero de mobile
let dosnewStd = document.getElementById('2_newStd');
let dosnewAnswer = document.getElementById('2_newAnswer');
let dosnewAbandon = document.getElementById('2_newAbandon');
let dosnewComent = document.getElementById('2_newComent');
let dosnewApel = document.getElementById('2_newApel');
let dosnewGeral = document.getElementById('2_newGeral');
let dosnewImportante = document.getElementById('2_newImportante');
let dosnewTodas = document.getElementById('2_newTodas');

//Accedemos a los datos del docente en input para borrar todo
let idProfesorClass = document.getElementsByClassName('idProfesorClass');
idProfesorClass[0].value = dataClean[0][1];
idProfesorClass[1].value = dataClean[0][1];

//Data en caso de que no tengamos contenido
let noContent = `
<div class="nothingContainer">
    <h5 class="nothingTextNoti"><b>No content.</b></h5></div>
    <div class="nothingContentNoti"><img class="nothingContentNotiImg" src="../../static/images/icons/icon_no_notification.svg"></div>
</div>
`

//Al inicio mostramos todo
imprimirTodas();


//Funcionalidad para los botones
newTodas.addEventListener('click', () => imprimirTodas());
newStd.addEventListener('click', () => imprimirNewStd());
newAbandon.addEventListener('click', () => imprimirNewAbandon());
newComent.addEventListener('click', () => imprimirNewFeedback());
newApel.addEventListener('click', () => imprimirNewApel());
newGeral.addEventListener('click', () => imprimirNewApel());
newImportante.addEventListener('click', () => imprimirNewImportant());
newGeral.addEventListener('click', () => imprimirNewGeral());

//Botones para mobile
dosnewTodas.addEventListener('click', () => imprimirTodas());
dosnewStd.addEventListener('click', () => imprimirNewStd());
dosnewAbandon.addEventListener('click', () => imprimirNewAbandon());
dosnewComent.addEventListener('click', () => imprimirNewFeedback());
dosnewApel.addEventListener('click', () => imprimirNewApel());
dosnewGeral.addEventListener('click', () => imprimirNewApel());
dosnewImportante.addEventListener('click', () => imprimirNewImportant());
dosnewGeral.addEventListener('click', () => imprimirNewGeral());

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//Imprimimos todas las notificaciones
function imprimirTodas() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.map(element => {
        return `<div class="notiUpdated bordered1 shadow-1e colorGreyDarker colorTextReverse">
                    ${element[2]}
                </div>
                <form method="post" action="/borrarComentarioParticularProfesor">
                    <input type="hidden" value="${element[0]}" name="idComentario" id="idComentario">
                    <input type="hidden" value="${element[1]}" name="idProfesor" id="idProfesor">
                    <button class="buttonDeleteNotificacion btn colorGreyDarker colorTextReverse bordered5" type="submit">
                        <i class="material-icons">clear</i>
                    </button>
                </form>`
    });
    let contentString = contentNoti.join('');
    if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        boxShowNotificaciones.innerHTML = contentString;
    }
    }
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
        return `<div class="notiUpdated bordered1 shadow-1e colorGreyDarker colorTextReverse">
                    ${element[2]}
                </div>
                <form method="post" action="/borrarComentarioParticularProfesor">
                    <input type="hidden" value="${element[0]}" name="idComentario" id="idComentario">
                    <input type="hidden" value="${element[1]}" name="idProfesor" id="idProfesor">
                    <button class="buttonDeleteNotificacion btn colorGreyDarker colorTextReverse bordered5" type="submit">
                        <i class="material-icons">clear</i>
                    </button>
                </form>`
    })
    let contentString = contentFiltered.join('');
    if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        boxShowNotificaciones.innerHTML = contentString;
    }
    }
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
        return `<div class="notiUpdated bordered1 shadow-1e colorGreyDarker colorTextReverse">
                    ${element[2]}
                </div>
                <form method="post" action="/borrarComentarioParticularProfesor">
                    <input type="hidden" value="${element[0]}" name="idComentario" id="idComentario">
                    <input type="hidden" value="${element[1]}" name="idProfesor" id="idProfesor">
                    <button class="buttonDeleteNotificacion btn colorGreyDarker colorTextReverse bordered5" type="submit">
                        <i class="material-icons">clear</i>
                    </button>
                </form>`
    })
    let contentString = contentFiltered.join('');
    if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        boxShowNotificaciones.innerHTML = contentString;
    }
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
        return `<div class="notiUpdated bordered1 shadow-1e colorGreyDarker colorTextReverse">
                    ${element[2]}
                </div>
                <form method="post" action="/borrarComentarioParticularProfesor">
                    <input type="hidden" value="${element[0]}" name="idComentario" id="idComentario">
                    <input type="hidden" value="${element[1]}" name="idProfesor" id="idProfesor">
                    <button class="buttonDeleteNotificacion btn colorGreyDarker colorTextReverse bordered5" type="submit">
                        <i class="material-icons">clear</i>
                    </button>
                </form>`
    })
    let contentString = contentFiltered.join('');
    if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        boxShowNotificaciones.innerHTML = contentString;
    }
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
        return `<div class="notiUpdated bordered1 shadow-1e colorGreyDarker colorTextReverse">
                    ${element[2]}
                </div>
                <form method="post" action="/borrarComentarioParticularProfesor">
                    <input type="hidden" value="${element[0]}" name="idComentario" id="idComentario">
                    <input type="hidden" value="${element[1]}" name="idProfesor" id="idProfesor">
                    <button class="buttonDeleteNotificacion btn colorGreyDarker colorTextReverse bordered5" type="submit">
                        <i class="material-icons">clear</i>
                    </button>
                </form>`
    })
    let contentString = contentFiltered.join('');
    if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        boxShowNotificaciones.innerHTML = contentString;
    }
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
        return `<div class="notiUpdated bordered1 shadow-1e colorGreyDarker colorTextReverse">
                    ${element[2]}
                </div>
                <form method="post" action="/borrarComentarioParticularProfesor">
                    <input type="hidden" value="${element[0]}" name="idComentario" id="idComentario">
                    <input type="hidden" value="${element[1]}" name="idProfesor" id="idProfesor">
                    <button class="buttonDeleteNotificacion btn colorGreyDarker colorTextReverse bordered5" type="submit">
                        <i class="material-icons">clear</i>
                    </button>
                </form>`
    })
    let contentString = contentFiltered.join('');
    if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        boxShowNotificaciones.innerHTML = contentString;
    }
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
        return `<div class="notiUpdated bordered1 shadow-1e colorGreyDarker colorTextReverse">
                    ${element[2]}
                </div>
                <form method="post" action="/borrarComentarioParticularProfesor">
                    <input type="hidden" value="${element[0]}" name="idComentario" id="idComentario">
                    <input type="hidden" value="${element[1]}" name="idProfesor" id="idProfesor">
                    <button class="buttonDeleteNotificacion btn colorGreyDarker colorTextReverse bordered5" type="submit">
                        <i class="material-icons">clear</i>
                    </button>
                </form>`
    })
    let contentString = contentFiltered.join('');
    if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        boxShowNotificaciones.innerHTML = contentString;
    }
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewImportant() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[3] == "important") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated bordered1 badColor shadow-1e">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        boxShowNotificaciones.innerHTML = contentString;
    }
}

//Imprimimos todas las notificaciones con la condicion
function imprimirNewGeral() {
    let dataWork = [...dataClean];
    let contentNoti = dataWork.filter(element => {
        if (element[3] == "general" || element[3] == "info") {
            return element;
        }
    });
    let contentFiltered = contentNoti.map(element => {
        return `<div class="notiUpdated bordered1 shadow-1e infoColor">
                    ${element[2]}
                </div>`
    })
    let contentString = contentFiltered.join('');
    if(contentString == ""){
        boxShowNotificaciones.innerHTML = noContent;
    }else{
        boxShowNotificaciones.innerHTML = contentString;
    }
}