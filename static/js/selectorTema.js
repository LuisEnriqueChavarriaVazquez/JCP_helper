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
    /*
        Temas claros
    */
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
    
    /*
    Temas claros
    */
   
    function coloresModoOscuro(){
        localStorage.setItem("tema", "../static/css/temas/coloresModoOscuro.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function dark_aqua(){
        localStorage.setItem("tema", "../static/css/temas/dark_aqua.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function dark_blue(){
        localStorage.setItem("tema", "../static/css/temas/dark_blue.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function dark_green(){
        localStorage.setItem("tema", "../static/css/temas/dark_green.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function dark_orange(){
        localStorage.setItem("tema", "../static/css/temas/dark_orange.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function dark_pink(){
        localStorage.setItem("tema", "../static/css/temas/dark_pink.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function dark_pink(){
        localStorage.setItem("tema", "../static/css/temas/dark_pink.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function dark_purple(){
        localStorage.setItem("tema", "../static/css/temas/dark_purple.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function dark_red(){
        localStorage.setItem("tema", "../static/css/temas/dark_red.css"); 
        temaGuardado = localStorage.getItem("tema");
    }

    function dark_yellow(){
        localStorage.setItem("tema", "../static/css/temas/dark_yellow.css"); 
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

    document.getElementById('dark_aqua').addEventListener('click', function () {
        dark_aqua();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('dark_blue').addEventListener('click', function () {
        dark_blue();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('dark_green').addEventListener('click', function () {
        dark_green();
        tema.attr("href", temaGuardado);
    })
    
    document.getElementById('dark_orange').addEventListener('click', function () {
        dark_orange();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('dark_pink').addEventListener('click', function () {
        dark_pink();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('dark_purple').addEventListener('click', function () {
        dark_purple();
        tema.attr("href", temaGuardado);
    })

    document.getElementById('dark_red').addEventListener('click', function () {
        dark_red();
        tema.attr("href", temaGuardado);
    })
    
    document.getElementById('dark_yellow').addEventListener('click', function () {
        dark_yellow();
        tema.attr("href", temaGuardado);
    })

});