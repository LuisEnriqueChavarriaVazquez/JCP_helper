function aparecerSegundaCasillaContra(){
    const contraFirst = document.getElementById('contraFirst');
    const contraSecondContainer = document.getElementById('contraSecondContainer');
    const espacioExtra = document.getElementById('espacioExtra');

    contraFirst.addEventListener('focusout', validarContenidoPass);
    function validarContenidoPass(){
        if (contraFirst.value != ""){
            contraSecondContainer.classList.remove('hiddenElement');
            espacioExtra.classList.remove('hiddenElement');
            contraSecondContainer.classList.add('animate__bounceIn');
        }else{
            contraSecondContainer.classList.add('hiddenElement');
            espacioExtra.classList.add('hiddenElement');
            contraSecondContainer.classList.remove('animate__bounceIn');
        }
    }

    
}

aparecerSegundaCasillaContra()