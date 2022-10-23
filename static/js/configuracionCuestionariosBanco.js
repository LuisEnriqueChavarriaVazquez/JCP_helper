var comillas_simples = new RegExp("\'", "g");
    
let preguntas=$('#preguntas').val()
preguntas = preguntas.replace(comillas_simples, "\"")
console.log(preguntas)
preguntas=JSON.parse(preguntas)
console.log(preguntas)
// console.log(typeof preguntas)