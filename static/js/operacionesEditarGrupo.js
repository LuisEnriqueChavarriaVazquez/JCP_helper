function interaccionFormularioAgregarGrupos() {

    /*
        BLOQUE UNO
    */

    //Seleccionamos el picker para elegir un fondo por defecto
    const fondoDefaultPicker = document.getElementById('fondoDefaultPicker');
    const fondoGrupoInput = document.getElementById('fondoGrupo');

    //Funcion para validar el fondo por defecto
    fondoDefaultPicker.addEventListener('click', validarFondoDefault);
    function validarFondoDefault() {
        if (fondoDefaultPicker.checked != true) {
            fondoGrupoInput.value = '';
        } else {
            fondoGrupoInput.value = 'default';
        }
    }

    //Leer el valor del input de fondo
    fondoGrupoInput.addEventListener('focusout', cambiarFondoMuestra);
    function cambiarFondoMuestra(){
        if(fondoGrupoInput.value != ''){
            muestraFondoForm.setAttribute('style', "background-image: url(\'"+ fondoGrupoInput.value +"\');" + "background-size: cover; background-repeat: no-repeat; background-position: center;");
            muestraFondoForm.classList.remove('fondoDinamico');
        }else if(fondoGrupoInput.value == '' || fondoGrupoInput.value == 'default'){
            muestraFondoForm.classList.add('fondoDinamico');
        }
    }

    //Validamos el fondo para ponerlo en la card muestra sin click
    function validarFondoSinClick(){
        if(fondoGrupoInput.value == 'default'){
            muestraFondoForm.classList.add('fondoDinamico');
        }else{
            muestraFondoForm.setAttribute('style', "background-image: url(\'"+ fondoGrupoInput.value +"\');" + "background-size: cover; background-repeat: no-repeat; background-position: center;");
            muestraFondoForm.classList.remove('fondoDinamico');
        }
    }

    validarFondoSinClick();


    /*
        BLOQUE DOS
    */

    //Seleccionamos los picker para elegir un lenguage para el curso
    const lenguageJavaPicker = document.getElementById('lenguageJavaPicker');
    const lenguagePythonPicker = document.getElementById('lenguagePythonPicker');
    const lenguageCPicker = document.getElementById('lenguageCPicker');
    const lenguajesGrupoInput = document.getElementById('lenguajesGrupo');
    let resultadosLenguages = [];

    lenguageJavaPicker.addEventListener('click', validarLenguagesGrupo);
    lenguagePythonPicker.addEventListener('click', validarLenguagesGrupo);
    lenguageCPicker.addEventListener('click', validarLenguagesGrupo);
    function validarLenguagesGrupo() {
        if (lenguageJavaPicker.checked == true) {
            resultadosLenguages[0] = "Java";
        } else { resultadosLenguages[0] = ""; }

        if (lenguagePythonPicker.checked == true) {
            resultadosLenguages[1] = "Python";
        } else { resultadosLenguages[1] = ""; }

        if (lenguageCPicker.checked == true) {
            resultadosLenguages[2] = "C/C++";
        } else { resultadosLenguages[2] = ""; }

        for (var g = 0; g < resultadosLenguages.length; g++) {
            if (resultadosLenguages[g] == "") {
                resultadosLenguages[g].pop;
            }
        }

        lenguajesGrupoInput.value = "";

        for (var h = 0; h < resultadosLenguages.length; h++) {
            lenguajesGrupoInput.value += resultadosLenguages[h] + " ";
        }
    }

    /*
    * Bloque 3
    */

    //Accedemos al input de numeros
    const numeroTemasGrupo = document.getElementById('numeroTemasGrupo');
    const generarTemasButton = document.getElementById('generarTemasButton');
    const borrarTemasButton = document.getElementById('borrarTemasButton');
    const enlistarTemasButton = document.getElementById('enlistarTemasButton');
    const seccionInputsTemasContenedor = document.getElementById('seccionInputsTemasContenedor');
    //Accedemos al input de temas individuales
    let temaInputBoxElement = document.getElementsByClassName('temaInputBoxElement');
    //Accedemos al input del listado de temas.
    const temasGrupoInput = document.getElementById('temasGrupo');


    //Activamos la funcion cuando damos click en un input
    generarTemasButton.addEventListener('click', generarInputsTema);

    function generarInputsTema() {
        seccionInputsTemasContenedor.innerHTML = ''
        for (var x = 0; x < numeroTemasGrupo.value; x++) {
            let input = document.createElement('input');
            input.classList.add('temaInputBoxElement');
            input.classList.add('colorTextReverse');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Escriba el tema');
            seccionInputsTemasContenedor.append(input);
        }
    }

    //Activamos el button para enlistar los temas
    enlistarTemasButton.addEventListener('click', enlistarTemas);
    function enlistarTemas() {
        let listado = '';
        for (var m = 0; m < temaInputBoxElement.length; m++) {
            listado += temaInputBoxElement[m].value + " ";
        }

        temasGrupoInput.value = listado;
    }
}

interaccionFormularioAgregarGrupos();


