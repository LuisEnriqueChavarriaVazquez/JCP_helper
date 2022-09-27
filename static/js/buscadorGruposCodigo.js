function buscarGrupoPorCodigo(){
    //Accedemos al buscador
    const buscadorGruposCodigo = document.getElementById('buscadorGruposCodigo');
    let codigoBuscador;

    //Cuando damos enter se activa
    buscadorGruposCodigo.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            codigoBuscador = buscadorGruposCodigo.value;
            enviarCodigo(codigoBuscador);
        }
    });

    //Enviamos el codigo
    function enviarCodigo(codigo){
        if(codigo.length == 60){
            console.log("codigo enviado")
            window.location.href = "/searchGroup/" + codigo;
        }else{
            console.log("codigo no enviado")
            M.toast({ html: 'Formato inválido, son 60 caracteres.' });
        }
    }
}

function evaluarFondoCardBusqueda(){
    const cardBusqueda = document.getElementById('cardBusqueda');
    //Evalua si las cards tienen fondo por dafault
    function evaluarSiFondoDefault(){
        let estiloDeFondo;
        estiloDeFondo = cardBusqueda.getAttribute('style');
        if(estiloDeFondo.indexOf("default") != -1){
            cardBusqueda.removeAttribute('style');
            cardBusqueda.classList.add('fondoDinamico');
        }
    }
    evaluarSiFondoDefault();
}

//buscarGrupoPorCodigo();
evaluarFondoCardBusqueda();