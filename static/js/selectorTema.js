$(document).ready(function () {
    //--------------------------------------------------------
    // Debido a que estamos trabajando con IDs y para evitar trabajar con un arreglo de una clase
    // se estara siempre escuchando el tamaño de la pantalla para poder meter
    // las tarjetas de selección de tema según el tamaño del dispositivo.

    var newWidth, newHeight;
    var contenedorColores = document.getElementById("container_colors");
    /*Escucha activa del tamaño de la pantalla*/
    window.addEventListener('resize', function (event) {
        newWidth = window.innerWidth;
        newHeight = window.innerHeight;

    });

    // Solo se ejecuta en la pantalla de configuraciones
    // Debe ser puesta la URL final
    if (window.location.href == "http://127.0.0.1:5000/configuraciones" || window.location.href == "http://127.0.0.1:5000/configuraciones#!" || window.location.href == "https://jcphelperdos.herokuapp.com/configuraciones#!" || window.location.href == "https://jcphelperdos.herokuapp.com/configuraciones") {
        function insertar_phone() {
            contenedorColores.innerHTML = `
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresAqua">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #125163;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Aqua
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresBlue">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #3e5b65;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Blue
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresBronce">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #9b4b00;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Bronce
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresCafe">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #775e57;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Cafe
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresDefault">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #377e5b;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Verde
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresGotico">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #75656a;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Gótico
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresNaranja">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #bc521c;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Naranja
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresPink">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #b0537a;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Pink
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresPurple">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #594668;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Purple
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresRed">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #9c3537;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Red
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresModoOscuro">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #000000;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Oscuro
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_aqua">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #00312f;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark aqua
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_blue">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #001846;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark blue
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_green">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #023600;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark green
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_orange">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #461c00;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark orange
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_pink">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #3d003a;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark pink
                                </div>
                            </div>
                        </a>
                    </div>
                     <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_purple">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #22004e;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark purple
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_red">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #470001;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark red
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_yellow">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #312a00;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark yellow
                                </div>
                            </div>
                        </a>
                    </div>`;
        }

        function insertar_tableta_compu() {
            contenedorColores.innerHTML = `
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresAqua">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Aqua</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #125163;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresBlue">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Blue</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #3e5b65;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresBronce">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Bronce</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #9b4b00;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresCafe">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Café</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #775e57;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresDefault">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Verde</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #377e5b;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresGotico">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Gótico</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #75656a;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresNaranja">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Naranja</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #bc521c;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresPink">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Pink</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #b0537a;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresPurple">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Purple</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #594668;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresRed">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Red</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #9c3537;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="coloresModoOscuro">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Oscuro</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #000000;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_aqua">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Dark aqua</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #00312f;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_blue">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Dark blue</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #001846;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_green">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Dark green</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #023600;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_orange">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Dark orange</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #461c00;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_pink">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Dark pink</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #3d003a;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_purple">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Dark purple</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #22004e;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_red">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Dark red</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #470001;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l3 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: 'Tema aplicado.'})" href="#!" id="dark_yellow">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Dark yellow</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #312a00;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>`;
        }
        //--------------------------------------------------------            
    }

    function logicaTemas() {
        var temaGuardado;
        var tema = $("#theme");
        var temaAutomatico;
        var w = window.innerWidth;

        // Solo aplica a la página de configuraciones.html
        if (window.location.href == "http://127.0.0.1:5000/configuraciones" || window.location.href == "http://127.0.0.1:5000/configuraciones#!" || window.location.href == "https://jcphelperdos.herokuapp.com/configuraciones#!" || window.location.href == "https://jcphelperdos.herokuapp.com/configuraciones") {
            if (w < 600) {
                insertar_phone();
            } else if (w > 600) {
                insertar_tableta_compu();
            }
        }

        //Definicion de color por defecto para el primer uso
        if (localStorage.getItem("tema") === null) {
            localStorage.setItem("tema", "../static/css/temas/coloresDefault.css");
            temaAutomatico = localStorage.getItem("tema");
            tema.attr("href", temaAutomatico);
        }

        //Craga automatica del tema anterior
        function automaticSetter() {
            temaAutomatico = localStorage.getItem("tema");
            tema.attr("href", temaAutomatico);
        }

        automaticSetter();

        //Definir los temas nuevos en el localStorage
        /*
            Temas claros
        */
        function normal() {
            localStorage.setItem("tema", "../static/css/temas/coloresDefault.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function coloresAqua() {
            localStorage.setItem("tema", "../static/css/temas/coloresAqua.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function coloresBlue() {
            localStorage.setItem("tema", "../static/css/temas/coloresBlue.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function coloresBronce() {
            localStorage.setItem("tema", "../static/css/temas/coloresBronce.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function coloresCafe() {
            localStorage.setItem("tema", "../static/css/temas/coloresCafe.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function coloresGotico() {
            localStorage.setItem("tema", "../static/css/temas/coloresGotico.css");
            temaGuardado = localStorage.getItem("tema");
        }


        function coloresNaranja() {
            localStorage.setItem("tema", "../static/css/temas/coloresNaranja.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function coloresPink() {
            localStorage.setItem("tema", "../static/css/temas/coloresPink.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function coloresPurple() {
            localStorage.setItem("tema", "../static/css/temas/coloresPurple.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function coloresRed() {
            localStorage.setItem("tema", "../static/css/temas/coloresRed.css");
            temaGuardado = localStorage.getItem("tema");
        }

        /*
        Temas oscuros
        */

        function coloresModoOscuro() {
            localStorage.setItem("tema", "../static/css/temas/coloresModoOscuro.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function dark_aqua() {
            localStorage.setItem("tema", "../static/css/temas/dark_aqua.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function dark_blue() {
            localStorage.setItem("tema", "../static/css/temas/dark_blue.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function dark_green() {
            localStorage.setItem("tema", "../static/css/temas/dark_green.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function dark_orange() {
            localStorage.setItem("tema", "../static/css/temas/dark_orange.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function dark_pink() {
            localStorage.setItem("tema", "../static/css/temas/dark_pink.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function dark_pink() {
            localStorage.setItem("tema", "../static/css/temas/dark_pink.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function dark_purple() {
            localStorage.setItem("tema", "../static/css/temas/dark_purple.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function dark_red() {
            localStorage.setItem("tema", "../static/css/temas/dark_red.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function dark_yellow() {
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
    }

    /*Esta funcion lo que hace es inicializar todas
    las funciones con los diferentes temas
    
    el mótivo por el que esta al inicio es porque por default lee
    en la memoria local storage el tema almacenado*/
    logicaTemas();

    /*Revisa los cambios en la pantalla*/
    $(window).resize(function () {
        /*Se revisa el tamaño de la pantalla y se resetea la logica de los temas
        para poder de nuevo reconocer cada cambio en la interfaz cada que hay un cambio
        en la pantalla.
        
        Esto no sobrecarga el procesador porque por lo regular el tamaño de la pantalla
        se mantiene estático*/
        if (window.location.href == "http://127.0.0.1:5000/configuraciones" || window.location.href == "http://127.0.0.1:5000/configuraciones#!" || window.location.href == "https://jcphelperdos.herokuapp.com/configuraciones#!" || window.location.href == "https://jcphelperdos.herokuapp.com/configuraciones") {
            if (newWidth < 600) {
                for (var i = 0; i < 1; i++) {
                    console.log("Menor");
                    insertar_phone();
                    logicaTemas();
                }
            } else if (newWidth > 600) {
                for (var j = 0; j < 1; j++) {
                    console.log("Mayor");
                    insertar_tableta_compu();
                    logicaTemas();
                }
            }
        }
    });

});