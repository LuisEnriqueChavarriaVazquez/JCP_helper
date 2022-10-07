function seleccionLenguajeForm() {

    //La caja div que los contiene
    const oneInputLenguaje = document.getElementById('oneInputLenguaje');
    const twoInputLenguaje = document.getElementById('twoInputLenguaje');

    //Select y el input en orden
    const lenguajeCuestionarioOne = document.getElementById('lenguajeCuestionarioOne');
    const lenguajeCuestionarioTwo = document.getElementById('lenguajeCuestionarioTwo');

    oneInputLenguaje.addEventListener('focusout', modificarInputs);

    function modificarInputs() {
        if (lenguajeCuestionarioOne.value == 'otro') {
            twoInputLenguaje.classList.add('animate__bounceIn');
            twoInputLenguaje.classList.remove('hiddenElement');
            lenguajeCuestionarioTwo.removeAttribute('disabled');
            oneInputLenguaje.classList.add('hiddenElement');
            lenguajeCuestionarioOne.setAttribute('disabled', '');
        }
    }
}

function seleccionTipoForm() {
    //La caja div que los contiene
    const oneInputTipo = document.getElementById('oneInputTipo');
    const twoInputTipo = document.getElementById('twoInputTipo');

    //Select y el input en orden
    const tipoCuestionarioOne = document.getElementById('tipoCuestionarioOne');
    const tipoCuestionarioTwo = document.getElementById('tipoCuestionarioTwo');

    oneInputTipo.addEventListener('focusout', modificarInputs);

    function modificarInputs() {
        if (tipoCuestionarioOne.value == 'otro') {
            twoInputTipo.classList.add('animate__bounceIn');
            twoInputTipo.classList.remove('hiddenElement');
            tipoCuestionarioTwo.removeAttribute('disabled');
            oneInputTipo.classList.add('hiddenElement');
            tipoCuestionarioOne.setAttribute('disabled', '');
        }
    }
}

function obtenerFechaAutomatica(){
    //Generamos la fecha
    const year = new Date();
    const day = new Date();
    const month = new Date();

    //Datos del mes
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    //Almacenamos la fecha
    let yearNow = year.getFullYear();
    let dayNow = day.getDate();
    let monthNow = months[month.getMonth()];

    fechaCuestionario = document.getElementById('fechaCuestionario');
    if(parseInt(dayNow) < 10){
        fechaCuestionario.value = monthNow + " 0" + dayNow + "," + yearNow;
    }else{
        fechaCuestionario.value = monthNow + " " + dayNow + "," + yearNow;
    }
}

seleccionLenguajeForm();
seleccionTipoForm();
obtenerFechaAutomatica();