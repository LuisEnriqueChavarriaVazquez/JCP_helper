function generadorCodigosCuestionario() {
    //Input para guardar el valor
    const valueCodigo = document.getElementById('idCuestionarioHecho');

    //Se asigna y genera el código
    function asignarCodigo() {
        //Guardamos la clave de grupo
        let claveDeCuestionario = makeid(10);
        //Asignamos la clave a la caja de muestra
        valueCodigo.value = claveDeCuestionario;

        //Generar el código
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }
    }
    asignarCodigo();
}

generadorCodigosCuestionario();