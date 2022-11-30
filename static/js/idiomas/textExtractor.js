//Hice el siguiente programa para obtener los textos de las páginas.
var res = $('body  *:not(.material-icons)').contents().map(function () {
    if (this.nodeType == 3 && this.textContent.trim() != "")
        return "'" + this.textContent + "'";
}).get();

res = res.join(",");

console.log(res);