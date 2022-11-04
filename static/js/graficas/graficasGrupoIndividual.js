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
        for(var j = 0; j < 6; j++){
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


//Imprime la gráfica lineal
function graficaPuntosPorGrupo(idContainer) {
    let contenedorPadre = document.getElementById(idContainer);
    contenedorPadre.innerHTML = "Hola"
}

//Insertamos en el primer contenedor de cada grupo una gráfica lineal.
function insertarCajasHijasEnCadaGrupo(numero_grupos, numero_ids){
    for(var i = 0; i < numero_grupos; i++){
        for(var j = 0; j < numero_ids; j++){
            if(j == 0){
                //Llamamos a la funcion de
                document.getElementById(ids_indivual_groups[i][j]).classList.add('first_child_container');
                graficaPuntosPorGrupo(ids_indivual_groups[i][j]);
            }
        }
    }
}
insertarCajasHijasEnCadaGrupo(numeroContenedorDeGrupo, numeroIdsContenedorDeGrupo);

