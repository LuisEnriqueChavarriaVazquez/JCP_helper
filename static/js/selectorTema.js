$(document).ready(function () {

    var temaGuardado;
    var tema = $("#theme");
    var temaAutomatico;

    //Definicion de color por defecto para el primer uso
    if(localStorage.getItem("tema") === null){
        localStorage.setItem("tema", "../static/css/temas/coloresDefault.css"); 
        temaAutomatico = localStorage.getItem("tema");
        tema.attr("href", temaAutomatico);
    }

    //Craga automatica del tema anterior
    function automaticSetter(){
        temaAutomatico = localStorage.getItem("tema");
        tema.attr("href", temaAutomatico);
    }

    automaticSetter();

    //Definir los temas nuevos en el localStorage
    function normal(){
        localStorage.setItem("tema", "../static/css/temas/coloresDefault.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function coloresAqua(){
        localStorage.setItem("tema", "../static/css/temas/coloresAqua.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function coloresBlue(){
        localStorage.setItem("tema", "../static/css/temas/coloresBlue.css");
        temaGuardado = localStorage.getItem("tema"); 
    }

    function coloresBronce(){
        localStorage.setItem("tema", "../static/css/temas/coloresBronce.css");
        temaGuardado = localStorage.getItem("tema"); 
    }

    function coloresCafe(){
        localStorage.setItem("tema", "../static/css/temas/coloresCafe.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function coloresGotico(){
        localStorage.setItem("tema", "../static/css/temas/coloresGotico.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function coloresModoOscuro(){
        localStorage.setItem("tema", "../static/css/temas/coloresModoOscuro.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function coloresNaranja(){
        localStorage.setItem("tema", "../static/css/temas/coloresNaranja.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function coloresPink(){
        localStorage.setItem("tema", "../static/css/temas/coloresPink.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function coloresPurple(){
        localStorage.setItem("tema", "../static/css/temas/coloresPurple.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function coloresRed(){
        localStorage.setItem("tema", "../static/css/temas/coloresRed.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    //Funciones de click en cada uno de los temas
    document.getElementById('coloresDefault').addEventListener('click', function () {
        normal();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresAqua').addEventListener('click', function () {
        coloresAqua();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresBlue').addEventListener('click', function () {
        coloresBlue();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresBronce').addEventListener('click', function () {
        coloresBronce();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresCafe').addEventListener('click', function () {
        coloresCafe();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresGotico').addEventListener('click', function () {
        coloresGotico();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresModoOscuro').addEventListener('click', function () {
        coloresModoOscuro();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresNaranja').addEventListener('click', function () {
        coloresNaranja();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresPink').addEventListener('click', function () {
        coloresPink();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresPurple').addEventListener('click', function () {
        coloresPurple();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('coloresRed').addEventListener('click', function () {
        coloresRed();
        tema.attr("href", temaGuardado);
    })

});