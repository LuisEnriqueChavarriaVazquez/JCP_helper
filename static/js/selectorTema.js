$(document).ready(function () {
    //--------------------------------------------------------
    // Debido a que estamos trabajando con IDs y para evitar trabajar con un arreglo de una clase
    // se estara siempre escuchando el tamaño de la pantalla para poder meter
    // las tarjetas de selección de tema según el tamaño del dispositivo.

    var newWidth, newHeight;
    var contenedorColores = document.getElementById("container_colors");
    var contenedorColoresAdaptados = document.getElementById("container_colors_adapted");
    /*Escucha activa del tamaño de la pantalla*/
    window.addEventListener('resize', function (event) {
        newWidth = window.innerWidth;
        newHeight = window.innerHeight;

    });

    //Funcion que nos ayuda a obtener solo la ruta
    function rutaValidationTwo(stringUrl) {
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

    // Solo se ejecuta en la pantalla de configuraciones
    // Debe ser puesta la URL final
    let rutaPageColor = rutaValidationTwo(window.location.href);
    let rutaValidaUno = "configuraciones_docente";
    let rutaValidaDos = "configuraciones_alumno";
    if (rutaPageColor == rutaValidaUno || rutaPageColor == rutaValidaDos) {
        function insertar_phone() {
            contenedorColores.innerHTML = `
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresAqua">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresBlue">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresBronce">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #9b4b00;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Metal
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresCafe">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresDefault">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #377e5b;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Green jungle
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresGotico">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #75656a;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Sad mode
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresNaranja">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #bc521c;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Happy orange
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresPink">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #b0537a;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Pink panter
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresPurple">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #594668;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Purple mood
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresRed">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #9c3537;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Red color
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresModoOscuro">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #000000;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark mode
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_aqua">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_blue">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_green">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_orange">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_pink">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_purple">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_red">
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
                        <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_yellow">
                            <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                                <div class="colorSelectorMuestraPhone">
                                    <div class="shadow-2e" style="background-color: #312a00;"></div>
                                </div>
                                <div class="colorSelectorTextoPhone colorTextReverse">
                                    Dark yellow
                                </div>
                            </div>
                        </a>
                    </div>
                    `;

            contenedorColoresAdaptados.innerHTML = `
            <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                <a onclick="M.toast({html: '👍😀'})" href="#!" id="protanopia">
                    <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                        <div class="colorSelectorMuestraPhone">
                            <div class="shadow-2e" style="background-color: #787056;"></div>
                        </div>
                        <div class="colorSelectorTextoPhone colorTextReverse">
                            Protanopia
                        </div>
                    </div>
                </a>
            </div>
            <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                <a onclick="M.toast({html: '👍😀'})" href="#!" id="deuteranopia">
                    <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                        <div class="colorSelectorMuestraPhone">
                            <div class="shadow-2e" style="background-color: rgb(130, 108, 97);"></div>
                        </div>
                        <div class="colorSelectorTextoPhone colorTextReverse">
                            Deuteranopia
                        </div>
                    </div>
                </a>
            </div>
            <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                <a onclick="M.toast({html: '👍😀'})" href="#!" id="tritanopia">
                    <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                        <div class="colorSelectorMuestraPhone">
                            <div class="shadow-2e" style="background-color: rgb(71, 120, 129);"></div>
                        </div>
                        <div class="colorSelectorTextoPhone colorTextReverse">
                            Tritanopia
                        </div>
                    </div>
                </a>
            </div>
            <div class="col s12 hide-on-large-only hide-on-med-only colorSelectorMainPadre">
                <a onclick="M.toast({html: '👍😀'})" href="#!" id="deuteranomalia">
                    <div class="colorSelectorMainPhone shadow-2e colorGreyWhiter bordered1">
                        <div class="colorSelectorMuestraPhone">
                            <div class="shadow-2e" style="background-color: rgb(102, 115, 95);"></div>
                        </div>
                        <div class="colorSelectorTextoPhone colorTextReverse">
                            Deuteranomaly
                        </div>
                    </div>
                </a>
            </div>`;
        }

        function insertar_tableta_compu() {
            contenedorColores.innerHTML = `
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresAqua">
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
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresBlue">
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
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresBronce">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Metal</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #9b4b00;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresCafe">
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
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresDefault">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Green jungle</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #377e5b;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresGotico">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Sad mode</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #75656a;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresNaranja">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Happy orange</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #bc521c;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresPink">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Pink panter</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #b0537a;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresPurple">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Purple mood</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #594668;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyWhiter shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresRed">
                                <div class="card-stacked">
                                    <div class="card-content verticalAligner centerAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Red color</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #9c3537;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="coloresModoOscuro">
                                <div class="card-stacked">
                                    <div class="card-content centerAligner verticalAligner">
                                        <div>
                                            <p class="colorTextReverse muestraDeColorText">Dark</p>
                                        </div>
                                        <div class="bordered5 muestraDeColor"
                                            style="background-color: #000000;"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_aqua">
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
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_blue">
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
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_green">
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
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_orange">
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
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_pink">
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
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_purple">
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
                    <div class="col s12 m4 l4 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_red">
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
                    <div class="col s12 m12 l12 hide-on-small-only">
                        <div class="card bordered1 colorGreyDarker shadow-2">
                            <a onclick="M.toast({html: '👍😀'})" href="#!" id="dark_yellow">
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
                    </div>
                    `;

            contenedorColoresAdaptados.innerHTML = `
            <div class="col s12 m6 l3 hide-on-small-only">
                <div class="card bordered1 colorGrey shadow-2">
                    <a onclick="M.toast({html: '👍😀'})" href="#!" id="protanopia">
                        <div class="card-stacked">
                            <div class="card-content verticalAligner centerAligner">
                                <div>
                                    <p class="colorTextReverse muestraDeColorText">Protanopia</p>
                                </div>
                                <div class="bordered5 muestraDeColor shadow-1e"
                                    style="background-color: #787056;"></div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col s12 m6 l3 hide-on-small-only">
                <div class="card bordered1 colorGrey shadow-2">
                    <a onclick="M.toast({html: '👍😀'})" href="#!" id="deuteranopia">
                        <div class="card-stacked">
                            <div class="card-content verticalAligner centerAligner">
                                <div>
                                    <p class="colorTextReverse muestraDeColorText">Deuteranopia</p>
                                </div>
                                <div class="bordered5 muestraDeColor shadow-1e"
                                    style="background-color: rgb(130, 108, 97);"></div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col s12 m6 l3 hide-on-small-only">
                <div class="card bordered1 colorGrey shadow-2">
                    <a onclick="M.toast({html: '👍😀'})" href="#!" id="tritanopia">
                        <div class="card-stacked">
                            <div class="card-content verticalAligner centerAligner">
                                <div>
                                    <p class="colorTextReverse muestraDeColorText">Tritanopia</p>
                                </div>
                                <div class="bordered5 muestraDeColor shadow-1e"
                                    style="background-color: rgb(71, 120, 129);"></div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col s12 m6 l3 hide-on-small-only">
                <div class="card bordered1 colorGrey shadow-2">
                    <a onclick="M.toast({html: '👍😀'})" href="#!" id="deuteranomalia">
                        <div class="card-stacked">
                            <div class="card-content verticalAligner centerAligner">
                                <div>
                                    <p class="colorTextReverse muestraDeColorText">Deuteranomaly</p>
                                </div>
                                <div class="bordered5 muestraDeColor shadow-1e"
                                    style="background-color: rgb(102, 115, 95);"></div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            `;
        }
        //--------------------------------------------------------            
    }

    function logicaTemas() {
        var temaGuardado;
        var tema = $("#theme");
        var temaAutomatico;
        var w = window.innerWidth;

        // Solo aplica a la página de configuraciones.html
        /*
            Cuando se suba la app al dominio debe ser modificado
            el valor de la url.
        */
        if (rutaPageColor == rutaValidaUno || rutaPageColor == rutaValidaDos) {
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

        //Carga automatica del tema anterior
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

        /*
        Tema de los usuarios
        */

        /*function coloresUsuario() {
            localStorage.setItem("tema", "../static/css/temas/coloresUsuario.css");
            temaGuardado = localStorage.getItem("tema");
        }*/

        /*
            Temas accesibles para personas con debilidad visual.
        */

        function protanopia() {
            localStorage.setItem("tema", "../static/css/temas/accesibilidadColoresProtanopia.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function deuteranopia() {
            localStorage.setItem("tema", "../static/css/temas/accesibilidadColoresDeuteranopia.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function tritanopia() {
            localStorage.setItem("tema", "../static/css/temas/accesibilidadColoresTritanopia.css");
            temaGuardado = localStorage.getItem("tema");
        }

        function deuteranomalia() {
            localStorage.setItem("tema", "../static/css/temas/accesibilidadColoresDeuteranomalia.css");
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

        /*document.getElementById('coloresUsuario').addEventListener('click', function () {
            coloresUsuario();
            tema.attr("href", temaGuardado);
        })*/

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

        document.getElementById('protanopia').addEventListener('click', function () {
            protanopia();
            tema.attr("href", temaGuardado);
        })

        document.getElementById('deuteranopia').addEventListener('click', function () {
            deuteranopia();
            tema.attr("href", temaGuardado);
        })

        document.getElementById('tritanopia').addEventListener('click', function () {
            tritanopia();
            tema.attr("href", temaGuardado);
        })

        document.getElementById('deuteranomalia').addEventListener('click', function () {
            deuteranomalia();
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
        if (rutaPageColor == rutaValidaUno || rutaPageColor == rutaValidaDos) {
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