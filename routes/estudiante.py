from functools import wraps
from queue import Empty
from unittest import result
from flask import flash, render_template,request,redirect,url_for,session
from . import routes
import json
from operacionesBD import Op_estudiante
from operacionesBD import Op_profesor
import bcrypt
from flask_uploads import IMAGES, UploadSet
from fpdf import FPDF
from flask import make_response

photos = UploadSet("photos", IMAGES)

from operacionesCorreo import token,email

##
## Links para la parte del panel central
##

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, *kwargs)
        else:
            return render_template('login_general.html')

    return wrap

@routes.route("/logoutEstudiante")
def logoutEstudiante():
    session['logged_in'] = False
    return redirect(url_for("routes.login_general"))
##Ruta para la vista de comunidad del estudiante
@routes.route('/comunidad_estudiante')
#@login_required
def comunidad_estudiante():
    return render_template('profesor/b_comunidad_estudiante.html')

##Ruta para la vista de gestion de cuestionarios
@routes.route('/gestionar_cuestionarios_estudiante')
#@login_required
def gestionar_cuestionarios_estudiante():
    return render_template('profesor/b_gestionar_cuestionarios.html')

##Ruta para la vista de gestion de estadisticas
@routes.route('/gestionar_estadisticas_estudiante')
#@login_required
def gestionar_estadisticas_estudiante():
    return render_template('profesor/b_gestionar_estadisticas.html')

##Ruta para la vista de gestion de grupos
@routes.route('/gestionar_grupos_estudiante')
#@login_required
def gestionar_grupos_estudiante():
    return render_template('profesor/b_gestionar_grupos.html')


##
## Parte del sign up del estudiante
##

##Ruta para la pagina de sign up del estudiante
@routes.route('/signup_est')
def signup_Est():
    return render_template('estudiante/signup_est.html')


##Pagina de bienvenida del alumno
"""
en este try except pasa lo mismo que con el del profesor, cuando se descomente el 
@login_required ya no sera necesario porque siempre va  existir el IDAlumno
"""
@routes.route('/bienvenidaEstudiante')
#@login_required
def bienvenidaEstudiante():
    try:
        result=Op_estudiante.datos_completos_alumno_by_id(session["IDAlumno"])
        notificaciones = Op_estudiante.obtenerNotificacion_de_alumno(session["IDAlumno"])
        print(notificaciones)
        return render_template('estudiante/bienvenidaEstudiante.html',datos=result,notificaciones=notificaciones)
    except:
        return render_template('estudiante/bienvenidaEstudiante.html')

##
##Bloque para en la pagina de bienvenida buscar un grupo
##

@routes.route('/search_group',methods=['GET','POST'])
def search_group():
    codigo=request.form["buscadorGruposCodigo"]
    idUsuario=request.form["idUsuario"]

    #Busca los datos del alumno con su ID
    result=Op_estudiante.datos_completos_alumno_by_id(idUsuario)

    #En caso de que el codigo venga vacio
    if (codigo == "" or len(codigo) < 60):
        flash("Código con formato incorrecto.")
        return render_template('estudiante/bienvenidaEstudiante.html', datos = result)

    #Busca los datos de un grupo con su código
    resultSearch = Op_estudiante.obtener_grupo_datos_importantes_unitario(codigo)

    #Evalua si la tupla de datos esta llena (encontro el grupo)
    if(resultSearch is not None):
        flash("Código correcto.")
        return render_template('estudiante/bienvenidaEstudiante.html', datosGrupo = resultSearch, datos = result)
    else:
        flash("Código no encontrado.")
        return render_template('estudiante/bienvenidaEstudiante.html', datos = result)

##
##Bloque para entrar al curso una vez que se buscó
##
@routes.route('/entrarGrupo/<string:id_grupo>/<string:id_docente>/<string:id_estudiante>')
def entrar_grupo(id_grupo, id_docente, id_estudiante):
    #Busca los datos del alumno con su ID
    result=Op_estudiante.datos_completos_alumno_by_id(id_estudiante)
    datosGrupo = Op_estudiante.obtener_grupo_datos_importantes_id(id_grupo)
    resultadoConsulta = Op_estudiante.insertar_estudiante_grupo(id_docente, id_grupo, id_estudiante)


    if(resultadoConsulta == 'listo'):
        ################################################################
        #Debemos avisar a los alumnos de la apelacion del cuestionario.
        ##Debemos definir los parametros del msg
        importancia = "general"
        categoria = "new_std"
        texto = "Un nuevo alumn@ llamad@ " + result[1] + " se ha registrado al grupo " + datosGrupo[2]
        print(texto)
        Op_estudiante.agregarNotificacion_para_profesor(id_docente, texto, importancia, categoria)
        return redirect(url_for("routes.bienvenidaEstudiante"))
    else:
        return redirect(url_for("routes.bienvenidaEstudiante"))

##
##Bloque para salir de algun grupo una vez que se entró
##
@routes.route('/salirGrupo/<string:id_docente>/<string:id_grupo>/<string:id_estudiante>')
def salir_grupo(id_docente, id_grupo ,id_estudiante):
    #Saca al alumno del grupo
    Op_estudiante.salir_de_grupo(id_docente, id_grupo ,id_estudiante)

    #Obtenemos los datos del grupo
    datosGrupo = Op_estudiante.obtener_grupo_datos_importantes_id(id_grupo)
    datosAlumno = Op_estudiante.datos_completos_alumno_by_id(id_estudiante)

    #Notificamos al docente la salida del grupo
    ################################################################
    ##Debemos definir los parametros del msg
    importancia = "info"
    categoria = "new_abandon"
    texto = "El alumn@ " + datosAlumno[1] + " abandonó el grupo " + datosGrupo[2]
    print(texto)
    Op_estudiante.agregarNotificacion_para_profesor(id_docente, texto, importancia, categoria)
    return redirect(url_for("routes.bienvenidaEstudiante"))

##
##Bloque para ver datos de grupo
##
"""
@routes.route('/viewGroupEstudiante/<string:id>',methods=['POST'])
def view_group_alumno(id):
    #Obtenemos los datos del grupo
    pickedGroupData = Op_profesor.obtener_grupo_datos_importantes_unitario(id)
    #Obtenemos los datos del profesor
    pickedProfData = Op_profesor.datos_completos_docente_by_id(id);
    #Obtenemos el id del alumno 
    idEstudiante=request.form["idEstudiante"]
    print(idEstudiante)

    ########## INFORMACION ESTUDIANTES EN GRUPOS
    #Obtenemos los ids de los estudiantes dentro de un grupo
    alumnosIdsDentroGrupo = Op_profesor.obtener_IDAlumno_dentro_de_grupo(id)
    print(alumnosIdsDentroGrupo) # ((1, ), (2, ))

    idSeparada = []
    for singleID in alumnosIdsDentroGrupo:
        idSeparada.append(singleID[0])
    print(idSeparada) # [1,2]

    datosAlumnos = []
    for idAlumno in idSeparada:
        print(str(idAlumno)) # 1,2
        #Obtenemos los datos de los alumnos con los ids Obtenido
        datosAlumnos.append(Op_profesor.datos_completos_alumno_by_id(str(idAlumno)))
    print(datosAlumnos) #[((1,), (2,))]

    ######Obtención de información de los cuestionarios
    datosCuestionarios = Op_profesor.obtener_cuestionarios_datos_importantes(pickedGroupData[0][1])
    print(datosCuestionarios)

    #Enviamos al usuario al formulario para ver datos del grupo.
    return render_template('estudiante/b_verGrupo.html', groupInfo = pickedGroupData[0], datosAlumnos = datosAlumnos, datosCuestionarios = datosCuestionarios, profData = pickedProfData, idEstudiante = idEstudiante)
"""
@routes.route('/viewGroupEstudiante/<string:id_grupo>',methods=['POST'])
def view_group_alumno(id_grupo):
    #Obtenemos los datos del grupo
    pickedGroupData = Op_profesor.obtener_grupo_datos_importantes_unitario(id_grupo)
    #Obtenemos los datos del profesor
    pickedProfData = Op_profesor.datos_completos_docente_by_id(pickedGroupData[0][1])
    #Obtenemos el id del alumno 
    idEstudiante=request.form["idEstudiante"]

    ########## INFORMACION ESTUDIANTES EN GRUPOS
    #Obtenemos los ids de los estudiantes dentro de un grupo
    alumnosIdsDentroGrupo = Op_profesor.obtener_IDAlumno_dentro_de_grupo(id_grupo)
    print(alumnosIdsDentroGrupo)

    idSeparada = []
    for singleID in alumnosIdsDentroGrupo:
        idSeparada.append(singleID[0])
    print(idSeparada)

    datosAlumnos = []
    for idAlumno in idSeparada:
        print(str(idAlumno)) # 1,2
        #Obtenemos los datos de los alumnos con los ids Obtenido
        datosAlumnos.append(Op_profesor.datos_completos_alumno_by_id(str(idAlumno)))
    print(datosAlumnos)

    ######Obtención de información de los cuestionarios
    datosCuestionarios = Op_profesor.obtener_cuestionarios_datos_importantes(pickedGroupData[0][1])
    print(datosCuestionarios)

    return render_template('estudiante/b_verGrupo.html', groupInfo = pickedGroupData[0], datosAlumnos = datosAlumnos, datosCuestionarios = datosCuestionarios, profData = pickedProfData, idEstudiante = idEstudiante)

    

##
##Bloque para ver datos de grupo
##
@routes.route('/viewCuestionarioInfo/<string:id>',methods=['POST'])
def view_cuestionario_info(id):
    ######Obtención de información de los cuestionarios
    datosCuestionarios = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id)
    #Obtenemos el id del alumno 
    idEstudiante=request.form["idEstudiante"]
    print(idEstudiante)

    ##Con los datos del cuestionario extraemos
    #IDDocente
    #IDGrupo

    #Obtenemos los datos del grupo
    pickedGroupData = Op_profesor.obtener_grupo_datos_importantes_unitario(datosCuestionarios[0][1])
    #Obtenemos los datos del profesor
    pickedProfData = Op_profesor.datos_completos_docente_by_id(datosCuestionarios[0][2])

    #Dato para la vuelta a la pagina anterior
    idGrupo=pickedGroupData[0][0]

    #Enviamos al usuario al formulario para ver datos del grupo.
    return render_template('estudiante/c_viewCuestionarioInfo.html', datosCuestionarios = datosCuestionarios[0], datosGrupo = pickedGroupData[0], datosDocente = pickedProfData, idEstudiante = idEstudiante,idGrupo=idGrupo )

##
##Crear un comentario de retroalimentacion
##
@routes.route('/enviarRetroalimentacion',methods=['POST'])
def crear_comentario_retroalimentacion():
    #Obtenemos los datos del cuestionario y para el comentario de retroalimentacion
    feedbackContent=request.form["feedbackContent"]
    id_grupo=request.form["id_grupo"]
    id_cuestionario=request.form["id_cuestionario"]
    id_estudiante=request.form["id_estudiante"]

    ##Insertamos el comentario de feedback en la BD
    Op_estudiante.creaComentarioRetroalimentacion(id_grupo,id_estudiante,feedbackContent)

    ######Obtención de información de los cuestionarios
    datosCuestionarios = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)
    #Obtenemos los datos del grupo
    pickedGroupData = Op_profesor.obtener_grupo_datos_importantes_unitario(datosCuestionarios[0][1])
    #Obtenemos los datos del profesor
    pickedProfData = Op_profesor.datos_completos_docente_by_id(datosCuestionarios[0][2])

    #Obtenemos los datos del grupo
    datosGrupo = Op_estudiante.obtener_grupo_datos_importantes_id(id_grupo)
    datosAlumno = Op_estudiante.datos_completos_alumno_by_id(id_estudiante)

    #Notificamos al docente que le hemos mandado feedback
    ################################################################
    ##Debemos definir los parametros del msg
    importancia = "info"
    categoria = "new_feedback"
    texto = "El alumn@ " + datosAlumno[1] + " de " + datosGrupo[2] +  " ha dejado un comentario en la sección de estadísticas."
    print(texto)
    Op_estudiante.agregarNotificacion_para_profesor(datosGrupo[1], texto, importancia, categoria)

    #Enviamos al usuario al formulario para ver datos del grupo.
    return render_template('estudiante/c_viewCuestionarioInfo.html', datosCuestionarios = datosCuestionarios[0], datosGrupo = pickedGroupData[0], datosDocente = pickedProfData, idEstudiante = id_estudiante, estado = "Pending")

##
##  Aqui damos inicio a que el alumno conteste el cuestionario
##

@routes.route('/answerCuestionarioAlumno/<string:id_cuestionario>',methods=['POST'])
def answer_cuestionario_alumno(id_cuestionario):
    #Permite leer el JSON con preguntas
    def accesoDatosPreguntas():
        ##Accedemos al contenido del JSON
        rutaArchivo = datosCuestionario[0][9]
        # Abrimos el archivo
        f = open(rutaArchivo)
        #Guardamos la data
        dataJSON = json.load(f)
        f.close()
        return dataJSON

    #Obtenemos todos los datos del cuestionario
    datosCuestionario = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)

    #Obtenemos el id del alumno y la caducidad del cuestionario
    #idEstudiante=request.form["idEstudiante"]
    idEstudiante=session['IDAlumno']
    caducidadCuestionario=request.form["caducidadCuestionario"]
    idCuestionarioHecho=request.form["idCuestionarioHecho"]
    revision_estado = "started"
    intentos = 1

    #Obtenemos los datos del cuestionario en caso de que exista
    datosCuestionarioHecho = Op_estudiante.obtener_hacer_cuestionario(id_cuestionario, idEstudiante, caducidadCuestionario)
    #Agregamos por primera vez un registro del acceso al cuestionario (Si no existe)
    if(datosCuestionarioHecho == "noData"):
        #Metemos la data a la BD
        Op_estudiante.insertar_primera_vez_cuestionario(idCuestionarioHecho, id_cuestionario, idEstudiante, caducidadCuestionario, revision_estado, intentos)
        #Obtenemos los datos del cuestionario recienCreado
        datosCuestionarioHecho = Op_estudiante.obtener_hacer_cuestionario(id_cuestionario, idEstudiante, caducidadCuestionario)
        
        #Creamos el JSON de respuestas (Aqui se almacenan las respuestas)
        rutaArchivoRespuestas = 'static/cuestionariosRespuestas/' + idCuestionarioHecho + '.json'
        with open(rutaArchivoRespuestas , 'w') as f:
            print("Archivo JSON creado")

        jsonContentInput = {
            "clave": [{
                "id_cuestionario_hecho": idCuestionarioHecho,
                "id_cuestionario": id_cuestionario,
                "id_alumno": idEstudiante
            }]
        }
        jsonContentInput = json.dumps(jsonContentInput, indent=1)
        
        ##Escribimos el contenido del JSON el en archivo creado
            #Abrimos archivo
        jsonFile = open(rutaArchivoRespuestas, "w")
            #Guardamos string con formato
        jsonFile.write(jsonContentInput)
        jsonFile.close()

        #Carga las preguntas del cuestionario
        dataJSON = accesoDatosPreguntas()
    else: #En caso de que ya exista accedemos al cuestionario sin crear uno nuevo
        #Sumamos intentos
        iDCuestionarioHacer_value = datosCuestionarioHecho[0][0]
        intentos_value_actual = datosCuestionarioHecho[0][11]
        intentos_value_actual = int(intentos_value_actual) + 1
        #Accedemos al número máximo de intentos
        intentosMaximos = datosCuestionario[0][15]

        #Cuando los intentos se agotan nos manda a esta pagina
        if(int(intentosMaximos) < int(intentos_value_actual)):
            return render_template('estudiante/d_noMasIntentos.html', datosCuestionario = datosCuestionario, idEstudiante = idEstudiante)
        else:
            #Si ya esta hecho el cuestionario nos dice que ya esta terminado
            if(datosCuestionarioHecho[0][4] == "ready"):
                 return render_template('estudiante/d_cuestionarioReady.html', datosCuestionario = datosCuestionario, idEstudiante = idEstudiante, idCuestionarioHecho = iDCuestionarioHacer_value)
            ##Si esta pendiente la revisión nos indica eso
            elif(datosCuestionarioHecho[0][4] == "pending"):
                 return render_template('estudiante/d_cuestionarioPending.html', datosCuestionario = datosCuestionario, idEstudiante = idEstudiante)
            ##Si no esta ready ni pendiente entonces nos envia a contestarlo
            else:
                Op_estudiante.update_intentos_hacer_cuestionario(intentos_value_actual, iDCuestionarioHacer_value);
                #Carga las preguntas del cuestionario
                dataJSON = accesoDatosPreguntas()

    #Enviamos al usuario al formulario para ver datos del cuestionario.
    return render_template('estudiante/d_answerCuestionario.html', datosCuestionario = datosCuestionario, dataJSON = dataJSON, idEstudiante = idEstudiante, datosCuestionarioHecho = datosCuestionarioHecho)

##Cuando hay no hay mas intentos esta nos permite regresar a la vista general
@routes.route('/noIntentosDisponibles/<string:id_cuestionario>', methods=['POST'])
def redireccionar_a_vista_grupos(id_cuestionario):
    ######Obtención de información de los cuestionarios
    datosCuestionarios = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)
    #Obtenemos el id del alumno 
    idEstudiante=request.form["idEstudiante"]

    #Obtenemos los datos del grupo
    pickedGroupData = Op_profesor.obtener_grupo_datos_importantes_unitario(datosCuestionarios[0][1])
    #Obtenemos los datos del profesor
    pickedProfData = Op_profesor.datos_completos_docente_by_id(datosCuestionarios[0][2])
    #Enviamos al usuario al formulario para ver datos del grupo.
    return render_template('estudiante/c_viewCuestionarioInfo.html', datosCuestionarios = datosCuestionarios[0], datosGrupo = pickedGroupData[0], datosDocente = pickedProfData, idEstudiante = idEstudiante)

##Cuando el cuestionario ha terminado
@routes.route('/cuestionarioListo/<string:id_cuestionario>', methods=['POST'])
def redireccionar_a_vista_grupos_listo(id_cuestionario):
    ######Obtención de información de los cuestionarios
    datosCuestionarios = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)
    listaDatos = []
    for dato in datosCuestionarios:
        listaDatos.append(dato[2])
    print(listaDatos)

    #Obtenemos el id del alumno 
    idEstudiante=request.form["idEstudiante"]
    pedirApelacion = request.form["pedirApelacion"]
    idCuestionarioHecho = request.form["idCuestionarioHecho"]

    print(idCuestionarioHecho)
    print(pedirApelacion)
    #En caso de que el estudiante quiera apelar su resultado
    if(pedirApelacion == "apelar"):
        datosAlumno = Op_estudiante.datos_completos_alumno_by_id(idEstudiante)
        Op_profesor.insertar_apelacion(idCuestionarioHecho)
        #Notificamos al docente que le hemos apelado
        ################################################################
        ##Debemos definir los parametros del msg
        importancia = "info"
        categoria = "new_apel"
        texto = "Tiene nuevas apelaciones de un estudiante llamad@ " + datosAlumno[1]
        Op_estudiante.agregarNotificacion_para_profesor(listaDatos, texto, importancia, categoria)
    else:
        print("Sin apelar")

    #Obtenemos los datos del grupo
    pickedGroupData = Op_profesor.obtener_grupo_datos_importantes_unitario(datosCuestionarios[0][1])
    #Obtenemos los datos del profesor
    pickedProfData = Op_profesor.datos_completos_docente_by_id(datosCuestionarios[0][2])
    #Enviamos al usuario al formulario para ver datos del grupo.
    return render_template('estudiante/c_viewCuestionarioInfo.html', datosCuestionarios = datosCuestionarios[0], datosGrupo = pickedGroupData[0], datosDocente = pickedProfData, idEstudiante = idEstudiante, estado = "Pending")

##Cuando el cuestionario esta pendiente
@routes.route('/cuestionarioPendiente/<string:id_cuestionario>', methods=['POST'])
def redireccionar_a_vista_grupos_pending(id_cuestionario):
    ######Obtención de información de los cuestionarios
    datosCuestionarios = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)
    #Obtenemos el id del alumno 
    idEstudiante=request.form["idEstudiante"]

    #Obtenemos los datos del grupo
    pickedGroupData = Op_profesor.obtener_grupo_datos_importantes_unitario(datosCuestionarios[0][1])
    #Obtenemos los datos del profesor
    pickedProfData = Op_profesor.datos_completos_docente_by_id(datosCuestionarios[0][2])
    #Enviamos al usuario al formulario para ver datos del grupo.
    return render_template('estudiante/c_viewCuestionarioInfo.html', datosCuestionarios = datosCuestionarios[0], datosGrupo = pickedGroupData[0], datosDocente = pickedProfData, idEstudiante = idEstudiante, estado = "ready")

##Se hace el guardado de las respuestas del alumno
@routes.route('/revisarAlumno/<string:id_cuestionario>', methods=['POST'])
def revisar_alumno(id_cuestionario):
    #Obtenemos todos los datos del cuestionario
    datosCuestionario = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)

    #Obtenemos los metadatos del formulario
    jsonContentInput=request.form["jsonContentInput"] #Contenido del JSON de respuestas
    rutaResultados=request.form["rutaResultados"]
    idCuestionarioHecho=request.form["idCuestionarioHecho"]
    tiempoRespuestas=request.form["tiempoRespuestas"]
    retraso_estado = request.form["Retraso_estado"]
    tiempoRespuestas = str(tiempoRespuestas)
    
    #Obtenemos los datos del cuestionario recienCreado
    datosCuestionarioHecho = Op_estudiante.obtener_hacer_cuestionario_idCuestionarioHecho(idCuestionarioHecho)
    idEstudiante = str(datosCuestionarioHecho[0][2])

    #Estos valores quedan en esta parte como pending
    aprovacionEstado=request.form["aprovacionEstado"]
    promedioGeneral=request.form["promedioGeneral"]
    puntajeGeneral=request.form["puntajeGeneral"]
    puntajeSegmentado=request.form["puntajeSegmentado"]

    ##Escribimos el contenido del JSON el en archivo creado
        #Abrimos archivo
    jsonFile = open(rutaResultados, "w")
        #Guardamos string en objeto usable
    jsonObject = json.loads(jsonContentInput)
        #Formateamos nuevo objeto como string con identado
    jsonString = json.dumps(jsonObject, indent=1)
        #Guardamos string con formato
    jsonFile.write(jsonString)
    jsonFile.close()

    ##Ingresamos la ruta y el tiempo que tardo a la base de datos
    Op_estudiante.insertar_data_cuestinario_respondido(idCuestionarioHecho, tiempoRespuestas, rutaResultados, retraso_estado)


    # Abrimos el archivo para que cargue los datos de las respuestas
    f = open(rutaResultados)
    #Guardamos la data de la preview
    dataJSON = json.load(f)
    #Guardamos la data como string
    f.close()

    #Enviamos al usuario al formulario para ver datos del cuestionario.
    return render_template('estudiante/d_verResultadosCuestionario.html', datosCuestionario = datosCuestionario, dataJSON = dataJSON, idCuestionarioHecho = idCuestionarioHecho, idEstudiante = idEstudiante)

##Se hace el guardado de las respuestas del alumno
@routes.route('/resultadoAlumno/<string:id_cuestionario>', methods=['POST'])
def resultado_alumno(id_cuestionario):
    #Lo que debemos hacer es insertar los datos del cuestionario en la BD
    idCuestionarioHecho=request.form['idCuestionarioHecho']
    revisionEstado=request.form["revisionEstado"]
    aprovacionEstado=request.form["aprovacionEstado"]
    promedioGeneral=request.form["promedioGeneral"]
    puntajeGeneral=request.form["puntajeGeneral"]
    puntajeSegmentado=request.form["puntajeSegmentado"]
    #Obtenemos el id del alumno 
    idEstudiante=request.form["idEstudiante"]
    print(idEstudiante)

    #Metemos los nuevos datos del cuestionario
    resultado = Op_estudiante.insertar_data_cuestinario_revisado(idCuestionarioHecho, revisionEstado, aprovacionEstado, promedioGeneral, puntajeGeneral, puntajeSegmentado)
    ##################################################################
    ######Obtención de información de los cuestionarios
    datosCuestionarios = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)

    #Dependiendo del estado del cuestionario se cargan distintos valores
    if(revisionEstado == "ready"):
        return render_template('estudiante/d_cuestionarioReady.html', datosCuestionario = datosCuestionarios, idEstudiante = idEstudiante)
    elif(revisionEstado == "pending"):
        return render_template('estudiante/d_cuestionarioPending.html', datosCuestionario = datosCuestionarios, idEstudiante = idEstudiante)
    
##
##Bloque para ver mis grupos (es como la gestion de grupos en la que estas)
##
@routes.route('/mis_grupos/<string:id_estudiante>')
def mis_grupos(id_estudiante):
    print(id_estudiante)
    #Busca los IDS de maestros, grupos y alumnos vinculados
    resultIds = Op_estudiante.obtener_IDs_dentro_de_grupo(id_estudiante)
    #print(resultIds)
    
    #Busca toda la data del grupo para mostrar
    resultGroup = ()
    for idGroup in resultIds:
        resultGroup += Op_profesor.obtener_grupo_datos_importantes_unitario(idGroup[1])
    print(resultGroup)
    
    #Busca toda la data del estudiante para extraer solo el id
    resultEstudiante = ()
    for idGroup in resultIds:
        resultEstudiante += Op_profesor.datos_completos_alumno_by_id(idGroup[2]);
    idEstudiante = resultEstudiante


    #Debemos contar el número de cuestionarios que hay dentro de cada grupo
    idsCuestionarios = ()
    for idGroup in resultIds:
        #Contamos los ids de los estudiantes dentro de un grupo para contarlos
        idsCuestionarios += (Op_profesor.contar_IDCuestionario_dentro_de_grupo(idGroup[1]))


    #En caso de que este vacio retornamos un empty.
    if(result is None):
        return render_template("estudiante/b_mis_grupos.html", datosIds = "empty", datosGroup = "empty")
    else:
        return render_template("estudiante/b_mis_grupos.html", datosIds = resultIds, datosGroup = resultGroup, idsCuestionarios = idsCuestionarios, idEstudiante = id_estudiante)

#Bloque para ver los resultados del alumno
@routes.route('/gestionar_resultados_alumno/<string:id_estudiante>')
def gestionar_resultados_alumno(id_estudiante):
    
    #Obtenemos los cuestionarios hechos por el estudiante.
    cuestionariosHechos = ()
    cuestionariosHechos = Op_estudiante.obtener_cuestionarios_alumnos(id_estudiante)
    #print(cuestionariosHechos)

    #Obtenemos toda la data de los cuestionarios hechos por un alumno en concreto
    cuestionariosHechos_allData = ()
    cuestionariosHechos_allData = Op_estudiante.obtener_cuestionarios_alumnos_all_data(id_estudiante)
    print(cuestionariosHechos_allData)
    
    
    return render_template("estudiante/resultados_alumno.html", cuestionariosDevuelta = cuestionariosHechos, cuestionariosHechos_allData = cuestionariosHechos_allData)


##Para ver el perfil de un docente
@routes.route('/viewTeacherProfile/<string:id>')
def ver_perfil_docente_desde_alumno(id):
    #try:
        datos = Op_profesor.datos_completos_docente_by_id(id)
        post = Op_profesor.obtenerPost(id)
        print(post)
        return render_template('general/perfil_general_docente.html', datos = datos, post = post)
    #except:
        #En caso de error
        #return redirect(url_for('routes.viewGroupEstudiante'))

@routes.route('/nuevo_estudiante',methods=["POST"])
def nuevo_estudiante():
    if request.method=="POST":
        nombre=request.form["nombre"]
        alias=request.form["alias"]
        file=request.files['foto']
        category="alumnos"
        pic=file.filename
        photo=pic.replace("'","")
        picture=photo.replace(" ","_")
        
        if picture.lower().endswith(('.png', '.jpg', '.jpeg')):
            save_photo = photos.save(file, folder=category)
            if save_photo:
                foto=picture
        correo=request.form["correo"]

        contra=request.form["contra"]
        contra2=request.form["contra2"]

        if contra==contra2:
            # encriptamos la contraseña
            contra = contra.encode('utf-8')
            hashed = bcrypt.hashpw(contra, bcrypt.gensalt())
        else:
            flash("Las contraseñas no coinciden.")
            return redirect(url_for("routes.signup_Est"))

        area=request.form["area"]
        escuela=request.form["escuela"]
        descripcion=request.form["descripcion"]
        fondo='default'
        
        Op_estudiante.insertar_estudiante(nombre,alias,foto,correo,hashed,area,escuela,descripcion,fondo)
        flash(f"{nombre} te has registrado correctamente!!")
        
          #Token para confirmar correo
        tokenUsuario = token.generate_confirmation_token(correo)

        #Datos correo para confirmar
        confirm_url = url_for('routes.confirmar_correo_alumno', token_entrada=tokenUsuario, _external=True)
        html = render_template('estudiante/confirmar_correo_alumno.html', confirm_url=confirm_url)
        #Datos para correo
        sender_email= "ricardocorreoejemplo@gmail.com"
        password_email = "cmapigtwmjpzktpr"
        subject_email = "confirmar correo"
        body_email=html
        email.enviar_correo(sender_email,password_email,subject_email, correo,body_email)
        
        
        
        return render_template("login_general.html")


#ruta para verificar cuenta por correo

@routes.route("/confirmar_correo_alumno/<string:token_entrada>")
def confirmar_correo_alumno(token_entrada):

    email=token.confirm_token(token_entrada)
    print("paso token:"+str(email))
    Op_estudiante.validar_correo_estudiante(email)
    return render_template('login_general.html')


@routes.route('/login_estudiante',methods=["POST"])
def login_estudiante():
    if request.method=="POST":
        correo=request.form["correoE"]
        password=request.form["passwordE"]
        password = password.encode('utf-8')
        result=Op_estudiante.login_est(correo)
        if result!=None:
            passBD=str(result[5])
            passBD=passBD.encode('utf-8')
            if bcrypt.checkpw(password,passBD):
                session['logged_in'] = True
                session['IDAlumno']=result[0]
                session['correoA'] = result[4]
                notificaciones = Op_estudiante.obtenerNotificacion_de_alumno(session["IDAlumno"])
                print(notificaciones)
                return render_template('estudiante/bienvenidaEstudiante.html',datos=result, notificaciones=notificaciones)  
            else:
                flash("Usuario o contraseña incorrectos!")
                return redirect(url_for('routes.login_general'))   
        else:
            flash("Usuario o contraseña incorrectos!")
            return redirect(url_for('routes.login_general'))       


#Perfil del alumno
"""
lo mismo para con esta funcion con el try except
"""
@routes.route('/perfil_alumno')
#@login_required
def perfil_alumno():
    try:
        result = Op_estudiante.datos_completos_alumno_by_id(session['IDAlumno'])
        post = Op_estudiante.obtenerPost(session['IDAlumno'])
        return render_template('estudiante/perfil_alumno.html',datos=result, post = post)
    except:
        return render_template('estudiante/perfil_alumno.html')

##
##Bloque para editar el perfil del profesor
##
@routes.route('/editarPerfilAlumno/<string:id>')
def edit_perfil_alumno(id):
    #Obtenemos los datos del profesor
    result = Op_estudiante.datos_completos_alumno_by_id(id)

    #Enviamos al usuario al formulario para editar la data
    return render_template('estudiante/b_editarPerfilAlumno.html', userInfo = result)

##
##Bloque para hacer el update del perfil
##
@routes.route('/updateAlumno/<id>', methods=['POST'])
def update_alumno(id):
    if request.method == 'POST':
        #Variables del formulario
        id_alumno = id
        nombreUsuario = request.form["nombreUsuario"]
        aliasUsuario = request.form["aliasUsuario"]
        descUser = request.form["descUser"]
        contraFirst = request.form["contraFirst"]
        contraSecond = request.form["contraSecond"]
        area = request.form["area"]
        escuela = request.form["escuela"]
        if contraFirst == "":
            resultado = Op_estudiante.update_alumno_perfil(id_alumno,nombreUsuario,aliasUsuario, area, escuela, descUser)
            return redirect(url_for('routes.perfil_alumno'))
        else:
            if contraFirst == contraSecond:
                # encriptamos la contraseña
                contraFirst = contraFirst.encode('utf-8')
                hashed = bcrypt.hashpw(contraFirst, bcrypt.gensalt())
                resultado = Op_estudiante.update_alumno_perfil_con_password(id_alumno,nombreUsuario,aliasUsuario, area, escuela, descUser, hashed)
                return redirect(url_for('routes.perfil_alumno')) 
            else:
                flash("Las contraseña no coinciden o falta confirmación.")
                #Obtenemos los datos del alumno
                result = Op_estudiante.datos_completos_alumno_by_id(id_alumno)
                return render_template('estudiante/b_editarPerfilAlumno.html', userInfo = result)


##
##Bloque para hacer el update de la foto de perfil
##
@routes.route('/editarFotoPerfilAlumno/<string:id_alumno>', methods=['POST'])
def editarFotoPerfilAlumno(id_alumno):
    if request.method == 'POST':
        #Variables del formulario
        file=request.files['foto']
        category="alumnos"
        pic=file.filename
        photo=pic.replace("'","")
        picture=photo.replace(" ","_")
        
        if picture.lower().endswith(('.png', '.jpg', '.jpeg')):
            save_photo = photos.save(file, folder=category)
            if save_photo:
                foto=picture
                
        if foto != "":
            resultado = Op_estudiante.update_alumno_perfil_foto(id_alumno, foto)
            return redirect(url_for('routes.perfil_alumno'))
        else:
            return redirect(url_for('routes.perfil_alumno'))

##Ruta para que los estudiantes respondan los cuestionarios
@routes.route('/contestar_cuestionario_estudiante')
#@login_required
def  contestar_cuestionario_estudiante():
    return render_template('estudiante/contestar_cuestionario.html')

# Formulario para que el docente haga una publicacion
@routes.route('/crearPostAlumno/<string:id_alumno>', methods=["POST"])
def crear_post_alumno(id_alumno):
    #Obtenemos los datos del formulario
    tituloPost = request.form["tituloPost"]
    fondoPost = request.form["fondoPost"]
    descripcionPost = request.form["descripcionPost"]
    if(tituloPost == "" or fondoPost == "" or descripcionPost == ""):
        return redirect(url_for('routes.perfil_alumno'))
    else:
        Op_estudiante.crearPost(id_alumno, tituloPost, descripcionPost, fondoPost)
        return redirect(url_for('routes.perfil_alumno'))

# Formulario para borrar el post
@routes.route('/deletePostAlumno/<string:id_publicacion>')
def delete_post_alumno(id_publicacion):
    Op_estudiante.deletePost(id_publicacion)
    return redirect(url_for('routes.perfil_alumno'))

#Para editar un post
@routes.route('/editarPostAlumno/<string:id_publicacion>')
def edit_post_alumno(id_publicacion):
    #Obtenemos los datos del cuestionario
    pickedPostData = Op_estudiante.obtenerPostUnitario(id_publicacion)
    print(pickedPostData)
    #Enviamos al usuario al formulario para editar la data
    return render_template('estudiante/b_editarPost.html', post = pickedPostData)

# Formulario para update de el post
@routes.route('/updatePostAlumno/<string:id_publicacion>', methods=['POST'])
def update_post_alumno(id_publicacion):
    #Obtenemos los datos del formulario
    tituloPostTwo = request.form["tituloPostTwo"]
    fondoPostTwo = request.form["fondoPostTwo"]
    descripcionPostTwo = request.form["descripcionPostTwo"]
    if(tituloPostTwo == "" or fondoPostTwo == "" or descripcionPostTwo == ""):
        print("No se edito")
        return redirect(url_for('routes.perfil_alumno'))
    else:
        Op_estudiante.updatePost(id_publicacion,tituloPostTwo, descripcionPostTwo, fondoPostTwo)
        return redirect(url_for('routes.perfil_alumno'))

#Formulario para guardar fondos de perfil
@routes.route('/guardarFondoEst/<string:id_alumno>',methods=['GET','POST'])
#@login_required
def guardarFondoEst(id_alumno):
    if request.method=="POST":
        #Variables del formulario
        fondo = request.form["fondo"]
        Op_estudiante.update_fondo_alumno(fondo, id_alumno)
        return redirect(url_for('routes.perfil_alumno'))

#########################################################################
####                                                                 ####
####                Configuraciones alumnos                          ####
####                                                                 ####
#########################################################################
@routes.route('/configuraciones_alumno')
def configuraciones_alumno():

    return render_template('configuraciones_alumno.html',id_alumno=session["IDAlumno"])

@routes.route('/eliminarCuentaAlumno')
def eliminarCuentaAlumno():
    Op_estudiante.alumnoEliminaCuenta(session["IDAlumno"])
    return redirect(url_for("routes.logoutEstudiante"))


#Sacar en pdf el reultado de los alumnos en sus cuestionarios
@routes.route('/descargar_resultados_cuestionario_pdf/<string:id_cuestionario_resuelto>',methods=['GET','POST'])
def descargarPdfCuestionarioResuelto(id_cuestionario_resuelto):
    #Obtener registro de la base de datos de las respuesta del cuestionario
    registro_cuestionario = Op_estudiante.ruta_archivo_respuesta_alumno(id_cuestionario_resuelto)
    #Obtener ruta del archivo 
    ruta_respuesta = registro_cuestionario[10]
    #Obtener archivo en formato de json
    f = open(ruta_respuesta)
    dataJSON = json.load(f)
    f.close()
    #Creacion inicial del pdf
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size = 15)
    numeroPreguntas = len(dataJSON["ordenPreguntas"][0])
    #Titulo del PDF
    pdf.cell(200, 18, txt = "Resultado cuestionario",
         ln = 1, align = 'C')  
    
    #Contadores de los tipos de preguntas
    contadoresTipoPreguntas=[0,0,0,0,0,0]
    #Recorrer el tipo de preguntas
    for i in range(0,numeroPreguntas):
        #El tipo de pregunta en turno
        tipoPregunta=dataJSON["ordenPreguntas"][0][str(i)] 
        #Preguntas de Falso y Verdadero
        if tipoPregunta == "optFalsoVerdadero":
            #Titulo de pregunta
            tituloPreguntaFV = dataJSON["preguntasModal5"][contadoresTipoPreguntas[4]]["0"]
            pdf.cell(200, 8, txt = str(i +1)+"."+tituloPreguntaFV,ln = 1, align = 'L') 
            #Puntos
            PuntoPreguntaFV = dataJSON["ponderacionGlobal"][0][str(i)]
            pdf.cell(200, 8, txt = "Puntos:" + str(PuntoPreguntaFV),ln = 1, align = 'L')
            #Respuestas alumno
            numeroPreguntasVF = len(dataJSON["preguntasModal5"])
            jsonRespuestasVF = dataJSON["preguntasModal5"] [numeroPreguntasVF - 1] ["respuestas"]
            respuestaVFjson = jsonRespuestasVF[contadoresTipoPreguntas[4]]
            respuestaVF=""
            if respuestaVFjson.find("true") != -1:
                respuestaVF= "T"
            else:
                respuestaVF ="F"
            pdf.cell(200, 8, txt = "Respuesta alumno:" + str(respuestaVF),ln = 1, align = 'L')
            #Respuesta verdadero
            respuestaVerdadera =  dataJSON["preguntasModal5"][contadoresTipoPreguntas[4]]["1"]           
            pdf.cell(200, 8, txt = "Respuesta verdadera:" + str(respuestaVerdadera),ln = 1, align = 'L')
            #Aumentar contador preguntas de verdadero y falso
            contadoresTipoPreguntas[4]+=1
        #Preguntas de opccion multiple
        elif tipoPregunta == "optMultiple":
            #Titulo de pregunta
            tituloPreguntaOpcMul = dataJSON["preguntasModal1"][contadoresTipoPreguntas[0]]["0"]
            pdf.cell(200, 8, txt = str(i +1)+"."+tituloPreguntaOpcMul,ln = 1, align = 'L') 
            #Puntos
            PuntoPreguntaOpcMul = dataJSON["ponderacionGlobal"][0][str(i)]
            pdf.cell(200, 8, txt = "puntos:" + str(PuntoPreguntaOpcMul),ln = 1, align = 'L')
            #Opcciones
            opcA = dataJSON["preguntasModal1"][contadoresTipoPreguntas[0]]["3"]
            opcB = dataJSON["preguntasModal1"][contadoresTipoPreguntas[0]]["4"]
            opcC = dataJSON["preguntasModal1"][contadoresTipoPreguntas[0]]["5"]
            opcD = dataJSON["preguntasModal1"][contadoresTipoPreguntas[0]]["6"]
            pdf.cell(200, 8, txt = "Opción A:" + str(opcA),ln = 1, align = 'L')
            pdf.cell(200, 8, txt = "Opción B:" + str(opcB),ln = 1, align = 'L')
            pdf.cell(200, 8, txt = "Opción C:" + str(opcC),ln = 1, align = 'L')
            pdf.cell(200, 8, txt = "Opción D:" + str(opcD),ln = 1, align = 'L')
            #Respuestas alumno
            numeroPreguntasOpcMul = len(dataJSON["preguntasModal1"])
            jsonDatoRespuestasMul = dataJSON["preguntasModal1"] [numeroPreguntasOpcMul - 1] ["respuestas"]
            respuestaEnJSON = jsonDatoRespuestasMul[contadoresTipoPreguntas[0]]
            respuestaAlumnoFinal=""
            if respuestaEnJSON.find("A") != -1:
                respuestaAlumnoFinal= "A"
            elif respuestaEnJSON.find("B") != -1:
                respuestaAlumnoFinal ="B"
            elif respuestaEnJSON.find("C") != -1:
                respuestaAlumnoFinal ="C"
            elif respuestaEnJSON.find("D") != -1:
                respuestaAlumnoFinal ="D"
            pdf.cell(200, 8, txt = "Respuesta alumno:" + str(respuestaAlumnoFinal),ln = 1, align = 'L')
            #Respuesta verdadera
            respuestaMulVerdadera = dataJSON["preguntasModal1"][contadoresTipoPreguntas[0]]["2"]
            pdf.cell(200, 8, txt = "Respuesta Verdadera:" + str(respuestaMulVerdadera),ln = 1, align = 'L')
            #Aumentar contador preguntas de opccion multiple
            contadoresTipoPreguntas[0]+=1
        #Preguntas de Arrastar  
        elif tipoPregunta == "optArrastrar":
            #Titulo de pregunta
            tituloPreguntaArrastrar = dataJSON["preguntasModal4"][contadoresTipoPreguntas[3]]["0"]
            pdf.cell(200, 8, txt = str(i +1)+"."+tituloPreguntaArrastrar,ln = 1, align = 'L') 
            #Puntos
            PuntoPreguntaArrastrar = dataJSON["ponderacionGlobal"][0][str(i)]
            pdf.cell(200, 8, txt = "puntos:" + str(PuntoPreguntaArrastrar),ln = 1, align = 'L')
            #Respuestas alumno
            numeroPreguntasArrastar = len(dataJSON["preguntasModal4"])
            jsonDatoRespuestasArrastrar = dataJSON["preguntasModal4"] [numeroPreguntasArrastar - 1] ["respuestas"]
            respuestaEnJSONArrastrar = jsonDatoRespuestasArrastrar[contadoresTipoPreguntas[3]]
            indicePrefijo = respuestaEnJSONArrastrar.find("/")
            subString1 = respuestaEnJSONArrastrar[indicePrefijo +2:]
            indiceSufijo = subString1.find("&")
            subString2 =  subString1[:indiceSufijo]
            respuestaFinalArrastrar = subString2.replace("/",",")
            pdf.cell(200, 8, txt ="Respuestas usuario:"+respuestaFinalArrastrar,ln = 1, align = 'L')
            #Respuestas verdderas
            numeroRespuestasArrastarVer = len(dataJSON["preguntasModal4"][contadoresTipoPreguntas[3]])
            respuestasVerdaderasArrastrar=""
            for i in range(1,numeroRespuestasArrastarVer):
                stringArrastarAux = dataJSON["preguntasModal4"][contadoresTipoPreguntas[3]][str(i)]
                respuestasVerdaderasArrastrar += stringArrastarAux.replace("*",":")
                if i != (numeroRespuestasArrastarVer - 1):
                    respuestasVerdaderasArrastrar += ","
            pdf.cell(200, 8, txt ="Respuestas verdaderas:"+respuestasVerdaderasArrastrar,ln = 1, align = 'L')       
        #Preguntas de Ejercicios
        elif tipoPregunta == "optEjercicios":
            pass
        #Preguntas de Acompletar
        elif tipoPregunta == "optAcompletar":
            #Titulo de pregunta
            tituloPreguntaOpcAcom= dataJSON["preguntasModal2"][contadoresTipoPreguntas[1]]["0"]
            pdf.cell(200, 8, txt = str(i +1)+"."+tituloPreguntaOpcAcom,ln = 1, align = 'L')
            #Puntos
            PuntoPreguntaOpcMul = dataJSON["ponderacionGlobal"][0][str(i)]
            pdf.cell(200, 8, txt = "puntos:" + str(PuntoPreguntaOpcMul),ln = 1, align = 'L')
            #Respuestas alumno            
            numeroPreguntasComp = len(dataJSON["preguntasModal2"])
            jsonDatoRespuestasComp = dataJSON["preguntasModal2"] [numeroPreguntasComp - 1] ["respuestas"]
            respuestaEnJSONComp = jsonDatoRespuestasComp[contadoresTipoPreguntas[1]]
            indicePrefijo = respuestaEnJSONComp.find("//")
            subString1 = respuestaEnJSONComp[indicePrefijo +2:]
            indiceSufijo = subString1.find("&")
            subString2 =  subString1[:indiceSufijo]
            respuestaFinalComp = subString2.replace("/",",")
            pdf.cell(200, 8, txt ="Respuestas usuario:"+respuestaFinalComp,ln = 1, align = 'L')
            #Verdaderas respuestas
            numeroRespuestasComp=len(dataJSON["preguntasModal2"][contadoresTipoPreguntas[1]])
            respuestasVerdaderasComp="" 
            for j in range(1, numeroRespuestasComp):
                respuestasVerdaderasComp+= dataJSON["preguntasModal2"][contadoresTipoPreguntas[1]][str(j)]+ ","
            respuestasVerdaderasComp = respuestasVerdaderasComp [:-1]
            pdf.cell(200, 8, txt ="Respuestas verdaderas:"+respuestasVerdaderasComp,ln = 1, align = 'L')
            #Aumentar contador preguntas de acompletar
            contadoresTipoPreguntas[1]+=1
        elif tipoPregunta == "optAbierta":
            #Titulo de pregunta
            tituloPreguntaAbierta= dataJSON["preguntasModal6"][contadoresTipoPreguntas[5]]["0"]
            pdf.cell(200, 8, txt = str(i +1)+"."+tituloPreguntaAbierta,ln = 1, align = 'L')
            #Puntos
            PuntoPreguntaArrastrar = dataJSON["ponderacionGlobal"][0][str(i)]
            pdf.cell(200, 8, txt = "puntos:" + str(PuntoPreguntaArrastrar),ln = 1, align = 'L')
            #Respuestas alumno
            numeroPreguntasAbiertas = len(dataJSON["preguntasModal6"])
            jsonDatoRespuestasAbiertas = dataJSON["preguntasModal6"] [numeroPreguntasAbiertas - 1] ["respuestas"]
            respuestaEnJSONAbiertas = jsonDatoRespuestasAbiertas[contadoresTipoPreguntas[5]]
            indicePrefijoAbierta = respuestaEnJSONAbiertas.find("/")
            subString1Abierta = respuestaEnJSONAbiertas[indicePrefijoAbierta +1:]
            indiceSufijoAbierta = subString1Abierta.find("&")
            subString2Abierta =  subString1Abierta[:indiceSufijoAbierta]
            respuestaFinalAbierta = subString2Abierta.replace("/",",")
            pdf.cell(200, 8, txt ="Respuesta usuario:"+respuestaFinalAbierta,ln = 1, align = 'L')


    response = make_response(pdf.output(dest='S').encode('latin-1'))
    response.headers.set('Content-Disposition', 'attachment', filename="Resultados" + '.pdf')
    response.headers.set('Content-Type', 'application/pdf')


    return response