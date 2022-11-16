

function reporte_grupos_promedio_general() {

var datosGrupo = document.getElementById("datosDeLosGrupos").value;
var s = {
  //Datos grafica de barras
  xComparacionPromedioGrupales: gruposNameArray,
  yComparacionPromedioGrupales: promedioFinalPorGrupo,
  //Datos grafica de pastel
  valoresPastel: porcentajePromedioEquivalente,
  labelsPastel: gruposNameArray,

  //Valores de los grupos
  datosGrupo: datosGrupo
};



 $.ajax({
   url: "/reporte_grupos_docente",
   type: "POST",
   contentType: "application/json",
   data: JSON.stringify(s),
 });



}