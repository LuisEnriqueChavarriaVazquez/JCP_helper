var boxContainerPopUp = document.getElementById('popUpThemes');
var fondoDinamicoUsuario = document.getElementById('fondoDinamicoUsuario');

function insertarTemas() {
    for(j = 1; j <= 30; j++){
        boxContainerPopUp.innerHTML += "<div class='col s4 m3 l3'><div class='foto_fondo_picker bordered1 shadow-2' id='foto_"+ j +"'></div></div>";
    };
};

insertarTemas();

//Selector del tema de fondo.
/*
* Se hace la selecciones de los temas para el background del cliente.
*/

// Direcciones de la fotos

direccionesPhotos = ['../static/images/fondos/aqua/aqua_1.png'
                    ,'../static/images/fondos/aqua/aqua_2.png'
                    ,'../static/images/fondos/aqua/aqua_3.png'
                    ,'../static/images/fondos/aqua/aqua_4.png'
                    ,'../static/images/fondos/aqua/aqua_5.png'
                    ,'../static/images/fondos/aqua/aqua_6.png'
                    ,'../static/images/fondos/azul/azul_1.png'
                    ,'../static/images/fondos/azul/azul_2.png'
                    ,'../static/images/fondos/azul/azul_3.png'
                    ,'../static/images/fondos/azul/azul_4.png'
                    ,'../static/images/fondos/black/black_1.png'
                    ,'../static/images/fondos/black/black_2.png'
                    ,'../static/images/fondos/black/black_3.png'
                    ,'../static/images/fondos/black/black_4.png'
                    ,'../static/images/fondos/black/black_5.png'];

cardTheme = document.getElementsByClassName("foto_fondo_picker");
foto_1 = document.getElementById("foto_1");
foto_2 = document.getElementById("foto_2");
console.log(cardTheme);

for(var i = 0; i < cardTheme.length; i++){   
    cardTheme[i].onclick = function () {
        fondoDinamicoUsuario.classList.remove("fondoDinamico");

        foto_1.onclick = function(){
            fondoDinamicoUsuario.style.backgroundImage = "url('"+ direccionesPhotos[0] +"')";
        }

        foto_2.onclick = function(){
            fondoDinamicoUsuario.style.backgroundImage = "url('"+ direccionesPhotos[1] +"')";
        }
    };
};


