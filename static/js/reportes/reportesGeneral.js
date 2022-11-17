

function reporte_grupos() {

var datosGrupo = document.getElementById("datosDeLosGrupos").value;
var s = {

   //REPOTES DE GRUPO DOCENTE

  //Datos grafica de barras
  xComparacionPromedioGrupales: gruposNameArray,
  yComparacionPromedioGrupales: promedioFinalPorGrupo,
  //Datos grafica de pastel
  valoresPastel: porcentajePromedioEquivalente,
  labelsPastel: gruposNameArray,

  //Valores de los grupos
  datosGrupo: datosGrupo,

   PorcentajeAprobacionAproReportesPY :PorcentajeAprobacionAproReportes
};



 $.ajax({
   url: "/reporte_grupos_docente",
   type: "POST",
   contentType: "application/json",
   data: JSON.stringify(s),
 });



}
