//Se almacenan las IDS de los contenedores individuales.
//Nos servira para en el futuro saber donde meter los gráficos
let ids_indivual_groups = []
let contenedorDeGrupo = document.getElementsByClassName('contenedorGrupoIndividualInsights');
let numeroContenedorDeGrupo = contenedorDeGrupo.length;
let numeroIdsContenedorDeGrupo = 0;

//Esta es la funcion para imprimir los contenedores de los insights de cada grupo
function impresionDeCasillasPorGrupo(){
    //Accedemos a contenedores globales de cada grupo
    let ids_individual_temporal = [];
    for(var i = 0; i < contenedorDeGrupo.length; i++){
        ids_individual_temporal = [];
        for(var j = 0; j < 5; j++){
            contenedorDeGrupo[i].innerHTML += `
            <div id="contenedorUnitario_${i}${j}" class="colorGreyWhiter bordered1 containerDataIndividualGroup borderDecoration" >
                
            </div>`;
            ids_individual_temporal.push(`contenedorUnitario_${i}${j}`);
        }
        numeroIdsContenedorDeGrupo = j;
        ids_indivual_groups.push(ids_individual_temporal);
    }
}
impresionDeCasillasPorGrupo();


//Imprime el procentage de reprobados y aprobados de cada grupo
function procentageAprobacion_card1(idContainer,  containerNumero) {
    let contenedorPadre = document.getElementById(idContainer);

    porcentagesDividosPorGrupo.forEach((porcentage, i = 0) =>{
        if(i == containerNumero){ //Valida que contenedor es...
            let contenido = `
            <div class="tituloContenedorUnitarioEstadisticas bordered2Up">Porcentaje de aprobación</div>
            <div class="contenidoContenedorUnitarioEstadisticas bordered2Down">
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Aprobados: <span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${porcentage[0]}%</span></p>
                <p class="colorGrey bordered1 colorTextReverse porcetageAprobacionParrafoUnitario">Reprobados:<span class="colorGreyDarker colorTextReverse porcentajeAprobacionSnippetUnitario">${porcentage[1]}%</span></p>
            </div>`;
            contenedorPadre.innerHTML += contenido;
        }
        i++
    })

}

//Insertamos en el primer contenedor de cada grupo una gráfica lineal.
function insertarCajasHijasEnCadaGrupo(numero_grupos, numero_ids){
    for(var i = 0; i < numero_grupos; i++){
        for(var j = 0; j < numero_ids; j++){
            if(j == 0){
                //Agregamos la clase para que se ajuste a CSS grid
                document.getElementById(ids_indivual_groups[i][j]).classList.add('first_child_container');
                //Ejecutamos la función para la impresión del dato o gráfica.
                procentageAprobacion_card1(ids_indivual_groups[i][j], i);
            }else if(j == 1){
                document.getElementById(ids_indivual_groups[i][j]).classList.add('second_child_container');
            }else if(j == 2){
                document.getElementById(ids_indivual_groups[i][j]).classList.add('third_child_container');
            }else if(j == 3){
                document.getElementById(ids_indivual_groups[i][j]).classList.add('fourth_child_container');
            }else if(j == 4){
                document.getElementById(ids_indivual_groups[i][j]).classList.add('fifth_child_container');
            }
        }
    }
}
insertarCajasHijasEnCadaGrupo(numeroContenedorDeGrupo, numeroIdsContenedorDeGrupo);

