#from crypt import methods
from functools import wraps
##from turtle import width
from flask import render_template,flash,request, url_for, redirect, session
from . import routes
from operacionesBD import Op_profesor
from operacionesBD import Op_estudiante
import bcrypt
import pandas as pd
import json
import plotly.express as px
from flask_uploads import IMAGES, UploadSet
import requests
import ast
import shutil


import plotly.graph_objects as go
from fpdf import FPDF
from flask import make_response
import os

from random import randint

photos = UploadSet("photos", IMAGES)

##
## Links para la parte del panel central
##

## funciones para el manejo de las sesiones

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, *kwargs)
        else:
            return render_template('login_general.html')

    return wrap


def wrappers(func, *args, **kwargs):
    def wrapped():
        return func(*args, **kwargs)

    return wrapped


##Ruta para la vista de gestion de cuestionarios
@routes.route('/gestionar_cuestionarios')
#@login_required
def gestionar_cuestionarios():
    try:
        result=Op_profesor.datos_completos_docente_by_id(session["IDDocente"])
        resultCuestionarios = Op_profesor.obtener_cuestionarios_datos_importantes(session["IDDocente"])
        resultGrupos = []
        for cuestionarioIdGrupo in resultCuestionarios:
            resultGrupos.append(Op_profesor.obtener_grupos_Nombre(cuestionarioIdGrupo[1]))
            print(resultGrupos)
        datosGrupos = Op_profesor.obtener_grupos_datos_importantes(session["IDDocente"])
        print(datosGrupos)
        if(len(datosGrupos) == 0):
            return render_template('profesor/b_gestionar_cuestionarios_no_disponible.html')
        else:
            return render_template('profesor/a_gestionar_cuestionarios.html',datos=result, datosCuestionarios = resultCuestionarios, datosGrupos = resultGrupos)
    except:
        return render_template('profesor/a_gestionar_cuestionarios.html')

##Tura para ir a la vista de revision de cuestionarios pendientes
@routes.route('/revisionCuestionarios/<string:id_docente>')
def revisionCuestionarios(id_docente):
    # try:
        #Obtengo los datos de los cuestionarios del docente
        datosCuestionarios = Op_profesor.obtener_cuestionarios_datos_importantes(id_docente)
    
        #Obtengo solamente los IDS de el array
        idCuestionariosLista = []
        for element in datosCuestionarios:
            idCuestionariosLista += [element[0]]

        #Almacenamos solo los cuestionarios con pending
        datosCuestionariosPending = []
        for idCuestionario in idCuestionariosLista:
            datosCuestionariosPending += Op_profesor.obtener_cuestionarios_en_estado_pending(idCuestionario)
        print("Cuestionarios pendientes")
        print(datosCuestionariosPending)
            
        #Almacenamos las IDS de los cuestionarios pending
        idsPendingCuestionarios = []
        for idCuestionarioPending in datosCuestionariosPending:
            idsPendingCuestionarios.append(idCuestionarioPending[1])
        
        #Almacenamos los datos de lso cuestionarios pending
        datosCuestionariosPendingExtendidos = []
        for idCuestionario2 in idsPendingCuestionarios:
            print(idCuestionario2)
            datosCuestionariosPendingExtendidos += Op_profesor.obtener_cuestionario_datos_importantes_unitario(idCuestionario2)
        print("Cuestionarios data")
        print(datosCuestionariosPendingExtendidos)

        #Almacenamos los IDS de los alumno con pending
        idsAlumnos = []
        for idAlumno in datosCuestionariosPending:
            idsAlumnos += [idAlumno[2]]
        
        #Almacenamos la data de los alumnos en orden
        datosAlumnosEnOrden = []
        for idAlumno in idsAlumnos:
            datosAlumnosEnOrden += Op_profesor.datos_completos_alumno_by_id(idAlumno)
        print("Alumnos con cuestionarios pendientes")
        print(datosAlumnosEnOrden)
        
        return render_template('profesor/b_cuestionarios_revisiones_pendientes.html', datosCuestionariosPending = datosCuestionariosPending, datosCuestionariosPendingExtendidos = datosCuestionariosPendingExtendidos, datosAlumnosEnOrden = datosAlumnosEnOrden)
    # except:
    #     return render_template('profesor/b_cuestionarios_revisiones_pendientes.html')

##Tura para ir a la vista de revision de cuestionarios pendientes
@routes.route('/retroalimentarCuestionario/<string:id_cuestionario_pending>', methods=["POST"])
def retroalimentarCuestionario(id_cuestionario_pending):
    #Accedo a los valores de IDs
    idCuestionarioHecho = id_cuestionario_pending
    idCuestionario = request.form["idCuestionario"]
    idEstudiante = request.form["idEstudiante"]
    rutaResultados = request.form["rutaResultados"]

    #Obtenemos todos los datos del cuestionario
    datosCuestionario = Op_profesor.obtener_cuestionario_datos_importantes_unitario(idCuestionario)
    
    #Obtenemos los datos del cuestionario recienCreado
    datosCuestionarioHecho = Op_estudiante.obtener_hacer_cuestionario_idCuestionarioHecho(idCuestionarioHecho)

    # Abrimos el archivo para que cargue los datos de las respuestas
    f = open(rutaResultados)
    #Guardamos la data de la preview
    dataJSON = json.load(f)
    #Guardamos la data como string
    f.close()

    #Enviamos al usuario al formulario para ver datos del cuestionario.
    return render_template('profesor/d_retroalimentar_cuestionarios.html', datosCuestionario = datosCuestionario, dataJSON = dataJSON, idCuestionarioHecho = idCuestionarioHecho, idEstudiante = idEstudiante, datosCuestionarioHecho = datosCuestionarioHecho)

##Funcion para ir a la vista de revision de cuestionarios pendientes
@routes.route('/terminarRetroalimentacion/<string:id_cuestionario_pending>', methods=["POST"])
def terminarRetroalimentarCuestionarios(id_cuestionario_pending):
    #Accedo a los valores de IDs
    idCuestionarioHecho = request.form["idCuestionarioHecho"];
    idEstudiante = request.form["idEstudiante"]
    revisionEstado = request.form["revisionEstado"]
    aprovacionEstado = request.form["aprovacionEstado"]
    promedioGeneral = request.form["promedioGeneral"]
    puntajeGeneral = request.form["puntajeGeneral"]
    puntajeSegmentado = request.form["puntajeSegmentado"]

    print(id_cuestionario_pending,revisionEstado,aprovacionEstado,promedioGeneral,puntajeGeneral,puntajeSegmentado)

    #Obtenemos todos los datos del cuestionario
    try:
        datosCuestionario = Op_profesor.insertar_data_revision_apelacion(revisionEstado,aprovacionEstado,promedioGeneral,puntajeGeneral,puntajeSegmentado,id_cuestionario_pending)
    except:
        print("error")
    #Enviamos al usuario al formulario para ver datos del cuestionario.
    return redirect(url_for('routes.gestionar_cuestionarios'))

##Ruta para la vista de gestion de estadisticas
@routes.route('/gestionar_estadisticas/<string:id_docente>')
#@login_required
def gestionar_estadisticas(id_docente):
    ##############################################################
    #Obtenemos los datos del grupo
    datosGrupo = Op_profesor.obtener_grupos_datos_importantes(id_docente)
    #print(datosGrupo) #Grupos del docente

    idGrupos = []
    for singleIDGrupo in datosGrupo:
        idGrupos.append(singleIDGrupo[0])
    #print(idGrupos) #[1,2] #ID de los grupos del docente

    #Con las IDS de lso grupos obtenemos los comentarios de retroalimentacion
    datosComentariosRetro = ()
    for singleIDGrupo2 in idGrupos:
        datosComentariosRetro += (Op_estudiante.obtieneComentarioRetroalimentacion(singleIDGrupo2))
    #print(datosComentariosRetro)

    #Obtenemos las IDS de los grupos que tienen algun comentario.
    idsGruposQueTienenComentarios = []
    for idGrupo in datosComentariosRetro:
        idsGruposQueTienenComentarios.append(idGrupo[1])
    #print(idsGruposQueTienenComentarios)

    #Obtenemos los datos de los grupo que tienen comentarios
    datosGruposConRetroalimentacion = ()
    for idGrupo2 in idsGruposQueTienenComentarios:
        datosGruposConRetroalimentacion += Op_profesor.obtener_grupo_datos_importantes_unitario(idGrupo2)
    #print(datosGruposConRetroalimentacion)

    #Obtenemos las IDS de los alumnos que han hecho algún comentario.
    idsAlumnosQueHicieronComentario = []
    for idAlumno in datosComentariosRetro:
        idsAlumnosQueHicieronComentario.append(idAlumno[2])
    #print(idsAlumnosQueHicieronComentario)

    #Obtenemos los datos de los alumnos que hicieron comentarios
    datosAlumnosRetroalimentacion = ()
    for idAlumno2 in idsAlumnosQueHicieronComentario:
        datosAlumnosRetroalimentacion += Op_profesor.datos_completos_alumno_by_id(idAlumno2)
    #print(datosAlumnosRetroalimentacion)

    #Guardamos todos los cuestionarios del docente
    datosCuestionariosProfe = ()
    for singleIDGrupo in idGrupos:
        datosCuestionariosProfe += (Op_profesor.obtener_cuestionarios_datos_importantes_con_grupo(singleIDGrupo));
    #print(datosCuestionariosProfe)


    #Guardamos solo las IDS de los cuestionarios del docente
    idsCuestionariosProfe = []
    for singleIDCuestionario in datosCuestionariosProfe:
        idsCuestionariosProfe.append(singleIDCuestionario[0])
    #print(idsCuestionariosProfe)

    #Accedemos a los alumnos_hacen_cuestionario con los IDS cuestionarios del profe.
    datosCuestionariosTerminados = ()
    for singleIDCuestionario in idsCuestionariosProfe:
        datosCuestionariosTerminados += (Op_profesor.obtener_cuestionarios_en_estado_ready(singleIDCuestionario))
    #print(datosCuestionariosTerminados)

    #Guardamos solo las IDS de los cuestionarios que han sido terminados
    idsCuestionariosProfeTerminados = []
    for singleIDCuestionarioTerminado in datosCuestionariosTerminados:
        idsCuestionariosProfeTerminados.append(int(singleIDCuestionarioTerminado[1]))
    idsCuestionariosProfeTerminados_sinRepetir = list(dict.fromkeys(idsCuestionariosProfeTerminados))
    listaOrdenada_cuestionarios_hechos_validados = sorted(idsCuestionariosProfeTerminados_sinRepetir)
    #print(listaOrdenada_cuestionarios_hechos_validados)

    #Debemos Buscar los datos de los cuestionarios con los IDS que tenemos
    cuestionarioHechosValidados = ()
    for singleIdCuestionarioHechoValido in listaOrdenada_cuestionarios_hechos_validados:
        cuestionarioHechosValidados += Op_profesor.obtener_cuestionarios_datos_importantes_id_cuestionario(singleIdCuestionarioHechoValido);
    #print(cuestionarioHechosValidados)

    datosGlobalesAlumnos = []
    alumnosDentroGrupo = []
    ########## INFORMACION ESTUDIANTES EN GRUPOS
    #Obtenemos los ids de los estudiantes dentro de un grupo
    for idGrupo in idGrupos:
        alumnosIdsDentroGrupo = Op_profesor.obtener_IDAlumno_dentro_de_grupo(idGrupo)
        #Una tupla con cada alumno inscrito por grupo
        #print(alumnosIdsDentroGrupo) # ((1, ), (2, ))

        idSeparada = []
        for singleID in alumnosIdsDentroGrupo:
            idSeparada.append(singleID[0])
        #Una array con los IDS de cada alumno inscrito en cada grupo
        #print(idSeparada) # [1,2]

        datosAlumnos = []
        for idAlumno in idSeparada:
            #print(str(idAlumno)) # 1,2
            #Obtenemos los datos de los alumnos con los ids Obtenido
            datosAlumnos.append(Op_profesor.datos_completos_alumno_by_id(str(idAlumno)))
        #Un array con los datos de cada alumno por cada grupo
        #print(datosAlumnos) #[((1,), (2,))]

        datosGlobalesAlumnos.append(datosAlumnos)
        alumnosDentroGrupo.append(idSeparada)
    #Todo lo de datos alumnos pero en otro array global
    #print(datosGlobalesAlumnos) #[[((1,), (2,))], [((1,), (2,))]]
    #Todas las IDS de los alumnos de cada grupo pero en un solo array
    #print(alumnosDentroGrupo) #[[1,2,3],[1,2,3],[1]]

    #Contador de alumnos por grupo
    cantidadesDeAlumnos = []
    k = 0
    for alumnoDentroGrupo in alumnosDentroGrupo:
        cantidadesDeAlumnos.append(str(len(alumnoDentroGrupo)))
        k += 1
    #Cantidad de alumnos por grupo
    #print(cantidadesDeAlumnos)

    #Contador de cuestionarios
    #Cuenta los elementos
    IDS_Cuestionarios = Op_profesor.obtener_cuestionarios_IDS(id_docente)
    ##Contador de alumnos y grupos y cuestionarios
    contadorCuestionarios = len(IDS_Cuestionarios)
    #Cuenta cuestionarios del docente.
    #print(contadorCuestionarios)

    #Validamos que existan cuestionarios contestados.
    print(len(listaOrdenada_cuestionarios_hechos_validados))
    if(len(listaOrdenada_cuestionarios_hechos_validados) >= 1):
        return render_template('profesor/a_gestionar_estadisticas.html',datosGruposConRetroalimentacion = datosGruposConRetroalimentacion, datosAlumnosRetroalimentacion = datosAlumnosRetroalimentacion, datosComentariosRetro = datosComentariosRetro,cuestionarioHechosValidados = cuestionarioHechosValidados, idGrupos=idGrupos,datosGrupo=datosGrupo, datosGlobalesAlumnos = datosGlobalesAlumnos, cantidadesDeAlumnos = cantidadesDeAlumnos,IDS_Cuestionarios = contadorCuestionarios,datosCuestionariosProfe = datosCuestionariosProfe, datosCuestionariosTerminados = datosCuestionariosTerminados)
    else:
        return render_template('profesor/b_gestionar_estadisticas_no_disponible.html')

##Ruta para la vista de gestion de grupos
##
##Bloque para render de la pagina de gestion de grupos
##
@routes.route('/gestionar_grupos',methods=['GET','POST'])
#@login_required
def gestionar_grupos():
    if request.method=="POST":
        #Variables del formulario
        nombreGrupo = request.form["nombreGrupo"]
        descGrupo = request.form["descGrupo"]
        fondoGrupo = request.form["fondoGrupo"]
        codigoGrupo = request.form["codigoGrupo"]
        lenguajesGrupo = request.form["lenguajesGrupo"]
        temasGrupo = request.form["temasGrupo"]

        id_profesor = ""
        myGrupos = ""

        #Mail de la session
        if 'correoS' in session:
            correoSession = session['correoS']
        
        #Se valida que haya contenido en su interior
        if(correoSession != ''):
            #Validación de los datos en el formulario
            if(nombreGrupo != '' and descGrupo != '' and codigoGrupo != '' and lenguajesGrupo != '' and temasGrupo != ''):
                id_profesor = Op_profesor.obtener_profesores_id(correoSession)
                #Se valida que nos retorne algo
                if(id_profesor != ""):
                    #Si retorna cero entonces la contraseña y el mail no coinciden, o no existen
                    if(id_profesor == '0'):
                        flash("¡Correo o contraseña incorrecta!")
                    else:
                        Op_profesor.insertar_grupo(id_profesor, nombreGrupo, descGrupo, fondoGrupo, codigoGrupo, temasGrupo, lenguajesGrupo)
            else:
                flash("¡Faltan datos en el formulario!")
        else:
            flash("¡No ingreso su correo o su contraseña!")
        
        #Guardo el id del profesor
        id_profesor = Op_profesor.obtener_profesores_id(correoSession)
        #Guardo los grupos de este profesor
        myGrupos = Op_profesor.obtener_grupos_datos_importantes(id_profesor)

        ####################
        ##Esta seccion es para poder hacer el conteo de alumnos en un grupo
        myGruposLista = []

        for grupoLista in myGrupos:
            myGruposLista.append(grupoLista)
        
        idsAlumnos = ()
        for idGrupo in myGruposLista:
            #Obtenemos y contamos los ids de los estudiantes dentro de un grupo para contarlos
            idsAlumnos += (Op_profesor.contar_IDAlumno_dentro_de_grupo(idGrupo[0]))
        
        ####################
        ##Esta sección es para poder hacer el conteo de los cuestionarios
        myCuestionarios = Op_profesor.obtener_grupos_datos_importantes(id_profesor)
        myCuestionariosLista = []

        for cuestionarioLista in myCuestionarios:
            myCuestionariosLista.append(cuestionarioLista)
        print("------------------------")
        print(myCuestionariosLista)
        
        idsCuestionarios = ()
        for idCuestionarioGrupo in myCuestionariosLista:
            #Contamos los ids de los estudiantes dentro de un grupo para contarlos
            idsCuestionarios += (Op_profesor.contar_IDCuestionario_dentro_de_grupo(idCuestionarioGrupo[0]))
        print(idsCuestionarios)

        #Datos del docente
        result=Op_profesor.datos_completos_docente_by_id(id_profesor)

        return render_template('profesor/a_gestionar_grupos.html', grupo = myGrupos, datos=result, idsAlumnos = idsAlumnos, idsCuestionarios = idsCuestionarios)
    else:
        #
        #   Esto es lo que hace cuando se carga la página la primera vez
        #   Busca los elementos en la base de datos con el correo de la sessión
        #

        id_profesor = ''

        #Mail de la session
        if 'correoS' in session:
            correoSession = session['correoS']
        
        #Guardo el id del profesor
        id_profesor = Op_profesor.obtener_profesores_id(correoSession)

        #Guardo los grupos de este profesor
        myGrupos = Op_profesor.obtener_grupos_datos_importantes(id_profesor)

        ###################
        ##Esta seccion es para poder hacer el conteo de alumnos en un grupo
        myGruposLista = []

        for grupoLista in myGrupos:
            myGruposLista.append(grupoLista)
        print(myGruposLista)
        
        idsAlumnos = ()
        for idGrupo in myGruposLista:
            #Contamos los ids de los estudiantes dentro de un grupo para contarlos
            idsAlumnos += (Op_profesor.contar_IDAlumno_dentro_de_grupo(idGrupo[0]))
        print(idsAlumnos)

        ####################
        ##Esta sección es para poder hacer el conteo de los cuestionarios
        myCuestionarios = Op_profesor.obtener_grupos_datos_importantes(id_profesor)
        myCuestionariosLista = []

        for cuestionarioLista in myCuestionarios:
            myCuestionariosLista.append(cuestionarioLista)
        print("------------------------")
        print(myCuestionariosLista)
        
        idsCuestionarios = ()
        for idCuestionarioGrupo in myCuestionariosLista:
            #Contamos los ids de los estudiantes dentro de un grupo para contarlos
            idsCuestionarios += (Op_profesor.contar_IDCuestionario_dentro_de_grupo(idCuestionarioGrupo[0]))
        print(idsCuestionarios)


        #Guardo los datos del docente (los de la sesion)
        result=Op_profesor.datos_completos_docente_by_id(id_profesor)

        #Retorno los grupos en la página para que puedan ser impresos
        return render_template('profesor/a_gestionar_grupos.html', grupo = myGrupos, datos=result, idsAlumnos=idsAlumnos, idsCuestionarios = idsCuestionarios)

##
##Bloque para eliminar los grupos
##

@routes.route('/deleteGroup/<string:id>')
def delete_group(id):
    #Eliminamos el grupo con el ID dada
    resultDelete = Op_profesor.delete_grupos(id)

    return redirect(url_for('routes.gestionar_grupos')) 

##
##Bloque para editar los grupos
##

@routes.route('/editGroup/<string:id>')
def edit_group(id):
    #Obtenemos los datos del grupo
    pickedGroupData = Op_profesor.obtener_grupo_datos_importantes_unitario(id)

    #Enviamos al usuario al formulario para editar la data
    return render_template('profesor/b_editarGrupo.html', groupInfo = pickedGroupData[0])

##
##Bloque para update de los grupos
##

@routes.route('/updateGroup/<id>', methods=['POST'])
def update_group(id):
    if request.method == 'POST':
        #Variables del formulario
        id_grupo = id
        nombreGrupo = request.form["nombreGrupo"]
        descGrupo = request.form["descGrupo"]
        fondoGrupo = request.form["fondoGrupo"]
        lenguajesGrupo = request.form["lenguajesGrupo"]
        temasGrupo = request.form["temasGrupo"]
        Op_profesor.update_grupos(nombreGrupo, descGrupo, fondoGrupo, lenguajesGrupo, temasGrupo, id_grupo)
        
        return redirect(url_for('routes.gestionar_grupos')) 

##
##Bloque para ver datos de grupo
##

@routes.route('/viewGroup/<string:id>')
def view_group(id):
    #Obtenemos los datos del grupo
    pickedGroupData = Op_profesor.obtener_grupo_datos_importantes_unitario(id)

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
    return render_template('profesor/b_verGrupo.html', groupInfo = pickedGroupData[0], datosAlumnos = datosAlumnos, datosCuestionarios = datosCuestionarios)

##
## Parte del sign up del profesor
##

##Ruta para la pagina de sign up del profesor
@routes.route('/signup_prof')
def signup_Prof():
    return render_template('profesor/signup_prof.html')

@routes.route('/profesor_logout')
def profesor_logout():
    session['logged_in'] = False
    return redirect(url_for('routes.login_general'))

@routes.route('/nuevo_profesor',methods=["POST"])
def nuevo_profesor():
    if request.method=="POST":

        nombre=request.form["nombre"]
        alias=request.form["alias"]
        file=request.files['foto']
        category="docentes"
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
            return redirect(url_for("routes.signup_Prof"))
        
        unidad_academica=request.form["unidad_academica"]
        descripcion=request.form["descripcion"]
        fondo="default"

        Op_profesor.insertar_profesor(nombre,alias,foto,correo,hashed,unidad_academica,descripcion,fondo)
        #Nos manda al log in para poder guardar datos en la sesión
        return render_template('login_general.html')

@routes.route('/login_profesor',methods=["POST"])
def login_profesor():
    if request.method=="POST":
        correo=request.form["correoP"]
        password=request.form["passwordP"]
        password = password.encode('utf-8')
        result=Op_profesor.login_prof(correo)
        if result!=None:
            passBD=str(result[5])
            passBD=passBD.encode('utf-8')
            if bcrypt.checkpw(password,passBD):
                session['logged_in'] = True
                session['IDDocente']=result[0]
                session['correoS'] = result[4]
                return redirect(url_for("routes.bienvenidaProfesor"))
            else:
                flash("Usuario o contraseña incorrectos!")
                return redirect(url_for('routes.login_general'))   
        else:
            flash("Usuario o contraseña incorrectos!")
            return redirect(url_for('routes.login_general'))       


##Pagina de bienvenida
"""
de momento esta en try except para que no sea a fuerza estar logeado, y
para que no de error al momento de pasar el IDDocente que no existira sino
se esta logeado

cuando se descomente @login_required ya no sera necesario el try-except porque antes
de entrar a la funcion se darac cuenta que no se esta logeado y nos mandara a la pagina
de login, evitando asi que se lance la excepcion de que no existe el IDDocente
"""
@routes.route('/bienvenidaProfesor')
#@login_required
def bienvenidaProfesor():
    try:
        result = Op_profesor.datos_completos_docente_by_id(session['IDDocente'])
        IDS_Alumnos = Op_profesor.obtener_alumnos_con_profesor_IDS(session['IDDocente'])
        IDS_Grupos = Op_profesor.obtener_grupos_IDS(session['IDDocente'])
        IDS_Cuestionarios = Op_profesor.obtener_cuestionarios_IDS(session['IDDocente'])
        ##Contador de alumnos y grupos
        contadorAlumnos = len(IDS_Alumnos)
        contadorGrupos = len(IDS_Grupos)
        contadorCuestionarios = len(IDS_Cuestionarios)
        politica_existe=Op_profesor.estadoPolitica(session['IDDocente'])
        pol_lateral=False
        pol_superior=False
        if len(politica_existe)==0:
            pol_superior=True
            pol_lateral=True
        else:
            pol_lateral=True
        return render_template('profesor/bienvenidaProfesor.html',datos=result, IDS_Alumnos = contadorAlumnos, IDS_Grupos = contadorGrupos, IDS_Cuestionarios = contadorCuestionarios,pol_lateral=pol_lateral,pol_superior=pol_superior)
    except:
        return render_template('profesor/bienvenidaProfesor.html')

@routes.route('/bienvenidaProfesorP/<string:respuesta>')
def bienvenidaProfesorPolitica(respuesta):
    #comprobamos si ya se ha registrado repuesta
    estado=Op_profesor.estadoPolitica(session['IDDocente'])
    if len(estado)>0:
        Op_profesor.actualizarPolitica(session['IDDocente'],respuesta)
    else:
        Op_profesor.agregarResPolitica(session['IDDocente'],respuesta)
    return redirect(url_for("routes.bienvenidaProfesor"))

#Perfil del docente
"""
lo mismo para con esta funcion con el try except
"""
@routes.route('/perfil_docente')
#@login_required
def perfil_docente():
    try:
        result = Op_profesor.datos_completos_docente_by_id(session['IDDocente'])
        post = Op_profesor.obtenerPost(session['IDDocente'])
        return render_template('profesor/perfil_docente.html',datos=result, post = post)
    except:
        return render_template('profesor/perfil_docente.html')

##
##Bloque para editar el perfil del profesor
##
@routes.route('/editarPerfilProfesor/<string:id>')
def edit_perfil_profesor(id):
    #Obtenemos los datos del profesor
    result = Op_profesor.datos_completos_docente_by_id(id)

    #Enviamos al usuario al formulario para editar la data
    return render_template('profesor/b_editarPerfilProfesor.html', userInfo = result)

##
##Bloque para hacer el update del perfil
##
@routes.route('/updateProfesor/<id>', methods=['POST'])
def update_docente(id):
    if request.method == 'POST':
        #Variables del formulario
        id_docente = id
        nombreUsuario = request.form["nombreUsuario"]
        aliasUsuario = request.form["aliasUsuario"]
        descUser = request.form["descUser"]
        contraFirst = request.form["contraFirst"]
        contraSecond = request.form["contraSecond"]
        unidadAcademica = request.form["unidadAcademica"]
        if contraFirst == "":
            resultado = Op_profesor.update_docente_perfil(id_docente,nombreUsuario,aliasUsuario,unidadAcademica,descUser)
            return redirect(url_for('routes.perfil_docente'))
        else:
            if contraFirst == contraSecond:
                # encriptamos la contraseña
                contraFirst = contraFirst.encode('utf-8')
                hashed = bcrypt.hashpw(contraFirst, bcrypt.gensalt())
                resultado = Op_profesor.update_docente_perfil_con_password(id_docente,nombreUsuario,aliasUsuario,unidadAcademica,descUser, hashed)
                return redirect(url_for('routes.perfil_docente')) 
            else:
                flash("Las contraseña no coinciden o falta confirmación.")
                #Obtenemos los datos del profesor
                result = Op_profesor.datos_completos_docente_by_id(id_docente)
                return render_template('profesor/b_editarPerfilProfesor.html', userInfo = result)

##
##Bloque para hacer el update de la foto de perfil
##
@routes.route('/editarFotoPerfilDocente/<string:id_docente>', methods=['POST'])
def editarFotoPerfilDocente(id_docente):
    if request.method == 'POST':
        #Variables del formulario
        file=request.files['foto']
        category="docentes"
        pic=file.filename
        photo=pic.replace("'","")
        picture=photo.replace(" ","_")
        
        if picture.lower().endswith(('.png', '.jpg', '.jpeg')):
            save_photo = photos.save(file, folder=category)
            if save_photo:
                foto=picture
                
        if foto != "":
            resultado = Op_profesor.update_docente_perfil_foto(id_docente, foto)
            return redirect(url_for('routes.perfil_docente'))
        else:
            return redirect(url_for('routes.perfil_docente'))


@routes.route('/perfil_general_view/<string:id>')
#@login_required
def ver_perfil_alumno(id):
    try:
        datos = Op_profesor.datos_completos_alumno_by_id(id)
        post = Op_estudiante.obtenerPost(id)
        return render_template('general/perfil_general.html',datos=datos, post = post)
    except:
        #En caso de error
        return redirect(url_for('routes.gestionar_grupos'))


#Creación cuestionarios
@routes.route('/creacion_cuestionarios/<string:id_profesor>')
def creacion_cuestionarios(id_profesor):
    cuestionario_rutas = Op_profesor.obtener_cuestionarios_rutas(id_profesor)
    resultCuestionarios = Op_profesor.obtener_cuestionarios_datos_importantes(id_profesor)
    return render_template('profesor/cuestionarios_creacion.html', id_profesor = id_profesor, cuestionario_rutas = cuestionario_rutas, datosCuestionario = resultCuestionarios)


#creacion del cuestionario del banco de pruebas
@routes.route('/crear_cuestionario_del_banco',methods=['GET',"POST"])
#@login_required
def crear_cuestionario_del_banco():
    if request.method == 'POST':
        query=request.form["lenguaje"]
        url=f"https://jcp-banco-de-datos.up.railway.app/cuestionarios?lenguaje={query}"
        response=requests.request("GET",url=url)
        cuestionarios=response.text
        cuestionarios=cuestionarios[1:-2]
        cuestionarios=cuestionarios.replace("\"cuestionarios\":","")
        cuestionarios = ast.literal_eval(cuestionarios)
            
        return render_template("profesor/cuestionarios_del_banco.html",cuestionarios=cuestionarios,lenguaje=query)
    
    return render_template("profesor/cuestionarios_del_banco.html")


## creacion de cuestionario por id
@routes.route('/genera_cuestionarios_por_lenguaje',methods=["GET","POST"])
def genera_cuestionarios_por_lenguaje():

    if request.args.get("id"):
        idCuestionario=request.args.get("id")
    else:
        idCuestionario=request.form.get("idCuestionario")
    
    url=f"https://jcp-banco-de-datos.up.railway.app/cuestionario_id?id={idCuestionario}"
    response=requests.request("GET",url=url)
    cuestionarios=response.text
    cuestionarios=cuestionarios[1:-2]
    cuestionarios=cuestionarios.replace("\"cuestionario\":","")
    cuestionarios=ast.literal_eval(cuestionarios)

    for cuestionario in cuestionarios:
        datos_cuestionario=[cuestionario["autor"],cuestionario["fecha"],cuestionario["lenguaje"],cuestionario["temas"],cuestionario["tipo"],cuestionario["titulo"]]
        cuestionario=cuestionario["preguntas"]
    
    cuestionario=json.loads(cuestionario)

    id_profesor=session['IDDocente']
    return render_template('profesor/b_verCuestionarioBanco.html', datosCuestionario = datos_cuestionario, dataJSON = cuestionario,id_profesor=id_profesor)


##Ruta para la vista de comunidad del profesor
@routes.route('/comunidad_profesor')
#@login_required
def comunidad_profesor():

    #para mostrar preguntas de java
    url1=f"https://jcp-banco-de-datos.up.railway.app/cuestionarios?lenguaje=Java"
    response1=requests.request("GET",url=url1)
    cuestionario_java=response1.text
    cuestionario_java=cuestionario_java[1:-2]
    cuestionario_java=cuestionario_java.replace("\"cuestionarios\":","")
    cuestionario_java = ast.literal_eval(cuestionario_java)

    #para mostrar preguntas de c
    url2=f"https://jcp-banco-de-datos.up.railway.app/cuestionarios?lenguaje=C"
    response2=requests.request("GET",url=url2)
    cuestionario_c=response2.text
    cuestionario_c=cuestionario_c[1:-2]
    cuestionario_c=cuestionario_c.replace("\"cuestionarios\":","")
    cuestionario_c = ast.literal_eval(cuestionario_c)

    #para motrar preguntas de python
    url3=f"https://jcp-banco-de-datos.up.railway.app/cuestionarios?lenguaje=Python"
    response3=requests.request("GET",url=url3)
    cuestionario_python=response3.text
    cuestionario_python=cuestionario_python[1:-2]
    cuestionario_python=cuestionario_python.replace("\"cuestionarios\":","")
    cuestionario_python = ast.literal_eval(cuestionario_python)

    #para mostrar preguntas en general
    url4=f"https://jcp-banco-de-datos.up.railway.app/cuestionarios"
    response4=requests.request("GET",url=url4)
    cuestionario_general=response4.text
    cuestionario_general=cuestionario_general[1:-2]
    cuestionario_general=cuestionario_general.replace("\"cuestionarios\":","")
    cuestionario_general = ast.literal_eval(cuestionario_general)

    #para mostrar 6 cuestionarios aleatorios del total existente en la api
    cuestionarios_generales=[cuestionario_general[randint(0,len(cuestionario_general)-1)] for n in range(8)]

    #para mostrar 3 cuestionarios aleatorios de python
    cuestionarios_python=[cuestionario_python[randint(0,len(cuestionario_python)-1)] for n in range(3)]
    #para mostrar 2 cuestionarios aleatorios de c
    cuestionarios_c=[cuestionario_c[randint(0,len(cuestionario_c)-1)] for n in range(2)]
    #para mostrar 3 cuestionatios aleatorios de java
    cuestionarios_java=[cuestionario_java[randint(0,len(cuestionario_java)-1)] for n in range(3)]

    return render_template('profesor/a_comunidad_profesor.html',general=cuestionarios_generales,python=cuestionarios_python,lenguajec=cuestionarios_c,java=cuestionarios_java)

#Java coder runner
@routes.route("/java_runner")
def java_runner():
    return render_template('profesor/java_runner.html')


#Python coder runner
@routes.route('/python_runner')
def python_runner():
    return render_template("profesor/python_runner.html")


###
### Bloque para los cuestionarios de los docentes
###

###Primero guardamos el JSON
@routes.route('/guardarCuestionarioJSON/<string:id_profesor>', methods=["POST"])
def guardarCuestionarioJSON(id_profesor):
    #Obtenemos el nombre del cuestionario
    nombreCuestionarioConClave = request.form["nombreCuestionarioConClave"]
    nombreCuestionario = request.form["nombreCuestionario"]
    #Obtenemos el contenido del JSON en un string
    jsonContentInput = request.form["jsonContentInput"]

    #Eliminamos espacios del nombre del cuestionario
    nombreCuestionarioConClave = nombreCuestionarioConClave.replace(" ","_")
    nombreCuestionario = nombreCuestionario.replace(" ","_")


    #Creamos el documento JSON y lo guardamos
    rutaArchivo = 'static/cuestionarios/' + nombreCuestionarioConClave + '.json'
    with open(rutaArchivo , 'w') as f:
        print("Archivo JSON creado")

    ##Escribimos el contenido del JSON el en archivo creado
        #Abrimos archivo
    jsonFile = open(rutaArchivo, "w")
        #Guardamos string en objeto usable
    jsonObject = json.loads(jsonContentInput)
        #Formateamos nuevo objeto como string con identado
    jsonString = json.dumps(jsonObject, indent=1)
        #Guardamos string con formato
    jsonFile.write(jsonString)
    jsonFile.close()

    #Buscamos los datos del profesor y de grupos
    gruposNombres = Op_profesor.obtener_grupos_datos_importantes(id_profesor); 
    datosProfesor = Op_profesor.datos_completos_docente_by_id(id_profesor)

    #Hacemos el render
    return render_template('profesor/b_cuestionarios_creacion.html', id_profesor = id_profesor,datosProfesor = datosProfesor,nombreCuestionario = nombreCuestionario, nombreCuestionarioConClave = nombreCuestionarioConClave, gruposNombres = gruposNombres)

###Segundo guardamos la data del cuestionario
@routes.route('/saveCuestionario/<string:id_profesor>', methods=["POST"])
def saveCuestionario(id_profesor):
    #Guardamos datos del formualario
    tituloCuestionario = request.form["tituloCuestionario"]
    tituloCuestionarioConClave = request.form["tituloCuestionarioConClave"]
    fechaCuestionario = request.form["fechaCuestionario"]
    autorCuestionario = request.form["autorCuestionario"]
    temasCuestionario = request.form["temasCuestionario"]
    tipoCuestionario = request.form["tipoCuestionario"]
    lenguajeCuestionario = request.form["lenguajeCuestionario"]
    grupoCuestionario = request.form["grupoCuestionario"]
    ordenCuestionario = request.form["oneInputOrdenOne"]
    
    horaLimiteParaResolver = request.form["horaLimiteParaResolver"]
    fechaLimiteRespuesta = request.form["fechaLimiteRespuesta"]
    tiempoCuentaAtras = request.form["tiempoCuentaAtras"]
    numeroIntentosDisponibles = request.form["numeroIntentosDisponibles"]
    numeroIntentosDisponibles = int(numeroIntentosDisponibles)
    #Validamos en caso de ser negativo o nulo
    if numeroIntentosDisponibles < 0 or numeroIntentosDisponibles == 0 or numeroIntentosDisponibles == "":
        numeroIntentosDisponibles = 1

    #Buscamos el grupo por su nombre
    id_grupo = Op_profesor.obtener_id_grupo_con_nombre_grupo(grupoCuestionario)
    print(id_grupo)

    #Guardamos el archivo en una variable (solo texto)
    #with open('static/cuestionarios/'+ tituloCuestionario + '.json', 'r') as file:
        #archivoCuestionario = file.read().replace('\n', '')
    
    rutaCuestionario = 'static/cuestionarios/'+ tituloCuestionarioConClave + '.json'

    result = Op_profesor.insertar_cuestionario_JSON(id_grupo, id_profesor, tituloCuestionario, fechaCuestionario, autorCuestionario, temasCuestionario, tipoCuestionario, lenguajeCuestionario, rutaCuestionario, ordenCuestionario, tiempoCuentaAtras, fechaLimiteRespuesta, horaLimiteParaResolver, numeroIntentosDisponibles)
    return redirect(url_for('routes.gestionar_cuestionarios'))

##
##Bloque para editar los cuestionarios, solo los datos adicionales
##

@routes.route('/editCuestionario/<string:id_cuestionario>')
def edit_cuestionario(id_cuestionario):
    #Obtenemos los datos del cuestionario
    pickedCuestionarioData = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)

    #Obtenemos los datos del profesor
    print(pickedCuestionarioData)
    datosProfesor = Op_profesor.datos_completos_docente_by_id(pickedCuestionarioData[0][2])

    #Obtenemos el nombre del grupo actual
    nombreGrupo = Op_profesor.obtener_grupos_Nombre(pickedCuestionarioData[0][1])

    #Obtenemos los datos de los grupos
    gruposNombres = Op_profesor.obtener_grupos_datos_importantes(pickedCuestionarioData[0][2]); 

    #Enviamos al usuario al formulario para editar la data
    return render_template('profesor/b_cuestionarios_edición_datos_adicionales.html', cuestionarioInfo = pickedCuestionarioData[0], datosProfesor = datosProfesor, gruposNombres = gruposNombres, nombreGrupo = nombreGrupo)


##
##Update cuestionarios
##

@routes.route('/updateCuestionarios/<id_cuestionarios>', methods=['POST'])
def update_cuestionario(id_cuestionarios):
    if request.method == 'POST':
        #Variables del formulario
        id_cuestionario = id_cuestionarios
        tituloCuestionario = request.form["tituloCuestionario"]
        tituloCuestionario = tituloCuestionario.replace(" ","_")

        fechaCuestionario = request.form["fechaCuestionario"]
        autorCuestionario = request.form["autorCuestionario"]
        temasCuestionario = request.form["temasCuestionario"]
        tipoCuestionario = request.form["tipoCuestionario"]
        lenguajeCuestionario = request.form["lenguajeCuestionario"]
        grupoCuestionario = request.form["grupoCuestionario"]
        ordenCuestionario = request.form["twoInputOrdenTwo"]

        horaLimiteParaResolver = request.form["horaLimiteParaResolver"]
        fechaLimiteRespuesta = request.form["fechaLimiteRespuesta"]
        tiempoCuentaAtras = request.form["tiempoCuentaAtras"]
        numeroIntentosDisponibles = request.form["numeroIntentosDisponibles"]
        numeroIntentosDisponibles = int(numeroIntentosDisponibles)
        #Validamos en caso de ser negativo o nulo
        if numeroIntentosDisponibles < 0 or numeroIntentosDisponibles == 0 or numeroIntentosDisponibles == "":
            numeroIntentosDisponibles = 1
        

        #Obtenemos el grupo por su nombre
        id_grupo = Op_profesor.obtener_id_grupo_con_nombre_grupo(grupoCuestionario)

        Op_profesor.update_cuestionarios(id_grupo, tituloCuestionario, fechaCuestionario, autorCuestionario, temasCuestionario, tipoCuestionario, lenguajeCuestionario, ordenCuestionario,tiempoCuentaAtras,fechaLimiteRespuesta, horaLimiteParaResolver, numeroIntentosDisponibles,id_cuestionario)
        
        return redirect(url_for('routes.gestionar_cuestionarios')) 

@routes.route('/viewCuestionario/<string:id_cuestionario>')
def view_cuestionario(id_cuestionario):
    #Obtenemos todos los datos del cuestionario
    datosCuestionario = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)

    ##Accedemos al contenido del JSON
    rutaArchivo = datosCuestionario[0][9]
    # Abrimos el archivo
    f = open(rutaArchivo)
    #Guardamos la data
    dataJSON = json.load(f)
    #Guardamos la data como string
    #dataJSONstr = json.dumps(dataJSON, indent=2)
    f.close()
    print(type(datosCuestionario))
    print(datosCuestionario)
    #Enviamos al usuario al formulario para ver datos del cuestionario.
    return render_template('profesor/b_verCuestionario.html', datosCuestionario = datosCuestionario, dataJSON = dataJSON)

##
##  En esta funcion el docente puede hacer un preview de los 
##  cuestionarios como si el fuera el estudiante, de modo que comprueba 
## como se veria al momento de resolverlo.
##

@routes.route('/previewVerComoALumnoCuestionario/<string:id_cuestionario>')
def view_cuestionario_como_alumno(id_cuestionario):
    #Obtenemos todos los datos del cuestionario
    datosCuestionario = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)

    ##Accedemos al contenido del JSON
    rutaArchivo = datosCuestionario[0][9]
    # Abrimos el archivo
    f = open(rutaArchivo)
    #Guardamos la data
    dataJSON = json.load(f)
    #Guardamos la data como string
    #dataJSONstr = json.dumps(dataJSON, indent=2)
    f.close()

    #Enviamos al usuario al formulario para ver datos del cuestionario.
    return render_template('profesor/c_verComoAlumnoCuestionario.html', datosCuestionario = datosCuestionario, dataJSON = dataJSON)

@routes.route('/simularRevision/<string:id_cuestionario>', methods=['POST'])
def simular_revision(id_cuestionario):
    #Obtenemos todos los datos del cuestionario
    datosCuestionario = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)

    #Creamos la variable para la ruta de la preview
    rutaCuestionarioPreview = 'static/cuestionariosPreview/'+ str(datosCuestionario[0][3]) + str(datosCuestionario[0][0]) + str(datosCuestionario[0][1]) + str(datosCuestionario[0][2]) +'Preview.json'

    #Obtenemos el contenido del JSON en un string (Contenido del form)
    jsonContentInput = request.form["jsonContentInput"]

    #Creamos el documento JSON y lo guardamos
    rutaArchivo = 'static/cuestionariosPreview/'+ str(datosCuestionario[0][3]) + str(datosCuestionario[0][0]) + str(datosCuestionario[0][1]) + str(datosCuestionario[0][2]) +'Preview.json'
    with open(rutaArchivo , 'w') as f:
        print("Archivo JSON creado")

    ##Escribimos el contenido del JSON el en archivo creado
        #Abrimos archivo
    jsonFile = open(rutaArchivo, "w")
        #Guardamos string en objeto usable
    jsonObject = json.loads(jsonContentInput)
        #Formateamos nuevo objeto como string con identado
    jsonString = json.dumps(jsonObject, indent=1)
        #Guardamos string con formato
    jsonFile.write(jsonString)
    jsonFile.close()

    ##Ingresamos la ruta a la base de datos
    Op_profesor.insertar_ruta_preview_cuestionario(datosCuestionario[0][0], rutaCuestionarioPreview)

    # Abrimos el archivo
    f = open(rutaCuestionarioPreview)
    #Guardamos la data de la preview
    dataJSON = json.load(f)
    #Guardamos la data como string
    f.close()

    #Enviamos al usuario al formulario para ver datos del cuestionario.
    return render_template('profesor/c_verResultadosComoAlumnosCuestionario.html', datosCuestionario = datosCuestionario, dataJSON = dataJSON)

@routes.route('/duplicarCuestionarios/<string:id_cuestionario>')
def duplicar_cuestionario(id_cuestionario):
    #Obtenemos los datos del cuestionario
    pickedCuestionarioData = Op_profesor.obtener_cuestionario_datos_importantes_unitario(id_cuestionario)

    #Generamos la nueva ruta
    rutaVieja = str(pickedCuestionarioData[0][9])
    rutaCopia = ""
    nuevaRuta = rutaVieja.replace(".json","")
    rutaCopia = nuevaRuta + "(copia).json"

    #Agregamos (copia) al nuevo titulo
    tituloCuestionario = str(pickedCuestionarioData[0][3]) + "_(copia)"

    #Copiamos el JSON existente y escribimos uno nuevo
    shutil.copy(rutaVieja, rutaCopia)
    
    #Insertamos el nuevo cuestionario
    Op_profesor.insertar_cuestionario_JSON(pickedCuestionarioData[0][1], pickedCuestionarioData[0][2], tituloCuestionario, pickedCuestionarioData[0][4], pickedCuestionarioData[0][5], pickedCuestionarioData[0][6], pickedCuestionarioData[0][7], pickedCuestionarioData[0][8], rutaCopia, pickedCuestionarioData[0][10], pickedCuestionarioData[0][11], pickedCuestionarioData[0][12], pickedCuestionarioData[0][13],pickedCuestionarioData[0][14])
    
    return redirect(url_for('routes.gestionar_cuestionarios')) 

##
##Bloque para eliminar los cuestionarios
##Solo es un borrado lógico, los JSON no se borran del almacenamiento
##

@routes.route('/deleteCuestionario/<string:id_cuestionario>')
def delete_cuestionario(id_cuestionario):
    #Eliminamos el grupo con el ID dada
    resultDelete = Op_profesor.delete_cuestionarios(id_cuestionario)

    return redirect(url_for('routes.gestionar_cuestionarios')) 

# Formulario para que el docente haga una publicacion
@routes.route('/crearPost/<string:id_docente>', methods=["POST"])
def crear_post(id_docente):
    #Obtenemos los datos del formulario
    tituloPost = request.form["tituloPost"]
    fondoPost = request.form["fondoPost"]
    descripcionPost = request.form["descripcionPost"]
    if(tituloPost == "" or fondoPost == "" or descripcionPost == ""):
        return redirect(url_for('routes.perfil_docente'))
    else:
        Op_profesor.crearPost(id_docente, tituloPost, descripcionPost, fondoPost)
        return redirect(url_for('routes.perfil_docente'))

# Formulario para borrar el post
@routes.route('/deletePost/<string:id_publicacion>')
def delete_post(id_publicacion):
    Op_profesor.deletePost(id_publicacion)
    return redirect(url_for('routes.perfil_docente'))

#Para editar un post
@routes.route('/editarPost/<string:id_publicacion>')
def edit_post(id_publicacion):
    #Obtenemos los datos del cuestionario
    pickedPostData = Op_profesor.obtenerPostUnitario(id_publicacion)
    print(pickedPostData)
    #Enviamos al usuario al formulario para editar la data
    return render_template('profesor/b_editarPost.html', post = pickedPostData)

# Formulario para update de el post
@routes.route('/updatePost/<string:id_publicacion>', methods=['POST'])
def update_post(id_publicacion):
    #Obtenemos los datos del formulario
    tituloPostTwo = request.form["tituloPostTwo"]
    fondoPostTwo = request.form["fondoPostTwo"]
    descripcionPostTwo = request.form["descripcionPostTwo"]
    if(tituloPostTwo == "" or fondoPostTwo == "" or descripcionPostTwo == ""):
        print("No se edito")
        return redirect(url_for('routes.perfil_docente'))
    else:
        Op_profesor.updatePost(id_publicacion,tituloPostTwo, descripcionPostTwo, fondoPostTwo)
        return redirect(url_for('routes.perfil_docente'))

#Formulario para guardar fondos de perfil
@routes.route('/guardarFondo/<string:id_docente>',methods=['GET','POST'])
#@login_required
def guardarFondo(id_docente):
    if request.method=="POST":
        #Variables del formulario
        fondo = request.form["fondo"]
        Op_profesor.update_fondo_docente(fondo, id_docente)
        return redirect(url_for('routes.perfil_docente'))


#########################################################################
####                                                                 ####
####                Configuraciones docente                          ####
####                                                                 ####
#########################################################################
@routes.route('/configuraciones_docente')
def configuraciones_docente():
    return render_template('configuraciones_docente.html',id_profesor=session["IDDocente"])

@routes.route('/eliminarCuentaDocente')
def eliminarCuentaDocente():
    Op_profesor.docenteEliminaCuenta(session["IDDocente"])
    return redirect(url_for("routes.profesor_logout"))



#Creacion reportes de grupos docentes
@routes.route('/crear_reportes_grupos_docentes_PDF', methods=['POST'])
def crear_reportes_grupos_docentes_PDF():


    #Creacion imagenes estadisticas

    #Datos graficas comparacion de promedio grupales

    #Datos del header y footer del archivo de PDF
    class PDF(FPDF):
        def header(self):
            # Logo
            self.image('logo_pb.png', 10, 8, 33)
            # Arial bold 15
            self.set_font('Arial', 'B', 15)
            # Move to the right
            self.cell(80)
            # Title
            self.cell(30, 10, 'Title', 1, 0, 'C')
            # Line break
            self.ln(20)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-15)
            # Arial italic 8
            self.set_font('Arial', 'I', 8)
            # Page number
            self.cell(0, 10, 'Page ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')


    #Comparacion de promedio grupales
    xdata = request.form["xComparacionPromedioGrupales"]
    ydata = request.form["yComparacionPromedioGrupales"]

    #Comparacion de promedio grupales
    trace = go.Bar(x=json.loads(xdata), y=json.loads(ydata))
    parametrosGrafica1 = {'title': ' Comparación de promedio grupales'}
    fig1 = go.Figure(data=trace, layout=parametrosGrafica1)
    #fig.show()
    fig1.write_image("static/images/ComparacionPromedioGrupales.png")

    #Historico de puntajes en cada evaluacion de cada grupo
    HistoricoPuntajesEvaluacionGrupoPy = json.loads(request.form["HistoricoPuntajesEvaluacionGrupo"])
    figHistoricoPuntajeEvaluacionGrupo = go.Figure()
    for i in range(0,len(HistoricoPuntajesEvaluacionGrupoPy)):
        figHistoricoPuntajeEvaluacionGrupo.add_trace(go.Scatter(
            x=HistoricoPuntajesEvaluacionGrupoPy[i][1], 
            y=HistoricoPuntajesEvaluacionGrupoPy[i][2],
            name=HistoricoPuntajesEvaluacionGrupoPy[i][0],
            ))
    
    figHistoricoPuntajeEvaluacionGrupo.update_layout(title='Histórico de puntajes en cada evaluación de cada grupo')
    figHistoricoPuntajeEvaluacionGrupo.write_image("static/images/HistoricoPuntajeEvaluacionGrupos.png")


    #indice porcentuales de promedio
    valoresPastel = request.form["valoresPastel"]
    labelPastel = request.form["labelsPastel"]
    dataPie=[go.Pie(labels=json.loads(labelPastel), values=json.loads(valoresPastel))]

    parametrosGrafica2 = {'title': ' Índice porcentuales de promedio'}
    fig2 = go.Figure(data=dataPie, layout = parametrosGrafica2)

    fig2.write_image("static/images/IndicePorcentualesPromedio.png")

    
    #Datos graficas Aprobación general de grupos

    #Comparacion reprobados vs reprobados

    comparacionReprovadosAprovadosBarraLista = json.loads(request.form["comparacionReprovadosAprovadosBarra"])
    dataComparacionReprovadosAprovadosBarra = []
    for i in range(0,len(comparacionReprovadosAprovadosBarraLista)):
        dataComparacionReprovadosAprovadosBarra.append(go.Bar(name=comparacionReprovadosAprovadosBarraLista[i][0],
         x=comparacionReprovadosAprovadosBarraLista[i][1], 
         y=comparacionReprovadosAprovadosBarraLista[i][2]))
    
    parametrosComparacionReprovadosAprovadosBarra = {'title': ' Comparación reprobados vs reprobados'}

    figComparacionReprovadosAprovadosBarra = go.Figure(data = dataComparacionReprovadosAprovadosBarra,layout = parametrosComparacionReprovadosAprovadosBarra)
    figComparacionReprovadosAprovadosBarra.update_layout(barmode='stack')
    figComparacionReprovadosAprovadosBarra.write_image("static/images/ComparacionReprovadosAprovadosBarra.png")

    #Datos  aprovacion porcentaje
    aprobadosFormatoDiezReporte = request.form["aprobadosFormatoDiezReporte"]
    porcentajeGlobalAprobadorReporte = request.form["porcentajeGlobalAprobadorReporte"]
    porcentajeGlobalReprobadorReporte = request.form["porcentajeGlobalReprobadorReporte"]
    gruposAprobadosReprobadosReporte = json.loads(request.form["gruposAprobadosReprobadosReporte"])
    

    #Porcentaje de aprobados vs reprobados
    valoresPastelAvsR = request.form["arrayPorcentajeAprobacionPastel"]
    labelPastelAvsR = request.form["graficasTitlelabelsPastel"]
    dataPieAvsR=[go.Pie(labels=json.loads(labelPastelAvsR), values=json.loads(valoresPastelAvsR))]

    parametrosGraficaAvsR = {'title': 'Porcentaje de aprobados vs reprobados'}
    figAvsR = go.Figure(data=dataPieAvsR, layout = parametrosGraficaAvsR )

    figAvsR.write_image("static/images/PorcentajeAprobadosReprobados.png")

   
    #Creacion inicial del pdf
    pdf = FPDF()
    pdf.add_page()
   
    #Titulo del PDF
    pdf.set_font("Arial","B", size = 25)
    pdf.set_text_color(224, 9, 9)
    pdf.cell(w=200, h=45, txt = "Reporte grupos",
         ln = 1, align = 'C')
    #Titulo graficas Promedio general de grupos.
    pdf.set_font("Arial", "B",size = 15)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(w=0, h=25, txt = "Gráficas promedio general de grupos",
         ln = 1, align = 'L')
    #Imagenes graficas Promedio general de grupos.
    pdf.set_font("Arial","",size = 15)
    pdf.cell(w=0, h=15, txt = "Gráfica comparación de promedio grupales",
         ln = 1, align = 'L')
    pdf.image("static/images/ComparacionPromedioGrupales.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '')   
   
   #Historico de puntajes en cada evaluacion de cada grupo.
    pdf.cell(w=0, h=15, txt = "Histórico de puntajes en cada evaluacion de cada grupo",
         ln = 1, align = 'L')
    pdf.image("static/images/HistoricoPuntajeEvaluacionGrupos.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '')
    
    #indice porcentuales de promedio
    pdf.cell(w=0, h=15, txt = "Índice porcentuales de promedio",
         ln = 1, align = 'L')
    pdf.image("static/images/IndicePorcentualesPromedio.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '')

    #Titulo Aprobación general de grupos
    pdf.set_font("Arial", "B",size = 15)
    pdf.cell(w=0, h=25, txt = "Gráficas aprobación general de grupos",
         ln = 1, align = 'L')

    #Comparacion reprovados vs reprobados
    pdf.set_font("Arial", "",size = 15)
    pdf.cell(w=0, h=15, txt = "Gráfica comparación reprovados vs reprobados",
         ln = 1, align = 'L')
    
    pdf.image("static/images/ComparacionReprovadosAprovadosBarra.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '')

    #Parte del reporte con aprobacion porcentaje
    pdf.cell(w=0, h=15, txt = "Aprobación porcentaje",
         ln = 1, align = 'L')

    pdf.cell(w=0, h=15, txt = "Proporción:" +str(aprobadosFormatoDiezReporte)+"/10 aprueban",
         ln = 1, align = 'L')

    pdf.cell(w=0, h=15, txt = "Proporción global:" +str(porcentajeGlobalAprobadorReporte)+"% / " + 
    str(porcentajeGlobalReprobadorReporte) +"%",
         ln = 1, align = 'L')
    #print(gruposAprobadosReprobadosReporte)
    for i in range(0,len(gruposAprobadosReprobadosReporte)):
        pdf.cell(w=0, h=15, txt = "Nombre grupo:"+str(gruposAprobadosReprobadosReporte[i][0]),ln = 1, align = 'L')
        pdf.cell(w=0, h=15, txt = "Aprobados:"+str(gruposAprobadosReprobadosReporte[i][1])+"%",ln = 1, align = 'L')
        pdf.cell(w=0, h=15, txt = "Reprobados:"+str(gruposAprobadosReprobadosReporte[i][2])+"%",ln = 1, align = 'L')
    #Porcentaje de aprobación vs reprobados
    pdf.cell(w=0, h=15, txt = "Porcentaje de aprobación vs reprobados",
         ln = 1, align = 'L')
    pdf.image("static/images/PorcentajeAprobadosReprobados.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '')


    #Eliminación archivos de mas
    os.remove("static/images/ComparacionPromedioGrupales.png")
    os.remove("static/images/HistoricoPuntajeEvaluacionGrupos.png")
    os.remove("static/images/IndicePorcentualesPromedio.png")
    os.remove("static/images/PorcentajeAprobadosReprobados.png")
    

    #Obtencion datos grupos

    datosGrupo =  request.form["datosGrupo"]
    listDatosGrupo = json.loads(datosGrupo)
    PorcentajeAprobacionAprobados = json.loads(request.form["PorcentajeAprobacionAproReportes"])
    PorcentajeAprobacionReprobados = json.loads(request.form["PorcentajeAprobacionRepReportes"])
    IntentosPromedio = json.loads(request.form["IntentosPromedioReportes"])
    PromedioTiempoRespuesta = json.loads(request.form["PromedioTiempoRespuestasReportes"])
    RangoCalificacionesMin = json.loads(request.form["RangoCalMinReportes"])
    RangoCalificacionesMax= json.loads(request.form["RangoCalMaxReportes"])
    IndiceAprob= json.loads(request.form["IndiceAprobReportes"])
    PorcentajeAtiempo = json.loads(request.form["GruposAtiempoReporte"])
    PorcentajeRetraso = json.loads(request.form["GruposRetrasoReporte"])
    
    #Titulo datos particulares de grupos
    pdf.set_font("Arial", "B",size = 15)
    pdf.cell(w=0, h=25, txt = "Datos particulares de grupos",ln = 1, align = 'L')
    pdf.set_font("Arial", "",size = 15)


    if (len(listDatosGrupo)!=0):

        for i in range(0,len(listDatosGrupo)):

            if (len(Op_profesor.grupos_con_cuestionarios_resueltos(listDatosGrupo[i][0]))!=0):
                
                pdf.cell(w=0, h=15, txt ="Grupo:"+ str(listDatosGrupo[i][2]),ln = 1, align = 'L') 
                pdf.cell(w=0, h=15, txt = "Porcentaje de aprobación:",ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Aprobados:" +str(PorcentajeAprobacionAprobados[i])+"%",ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Reprobados:" +str(PorcentajeAprobacionReprobados[i])+"%",ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Intentos promedio:"+str(IntentosPromedio[i]),ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Promedio de tiempo de respuesta:"+str(PromedioTiempoRespuesta[i])+"hrs",ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Rango de calificaciones:",ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Calificaciones Min:"+str(RangoCalificacionesMin[i]),ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Calificaciones Max:"+str(RangoCalificacionesMax[i]),ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Indice aprobacion:"+str(IndiceAprob[i])+"/10 aprueba",ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Porcentaje de retrasos:",ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Porcentaje a tiempo:"+str(PorcentajeAtiempo[i]) +"%",ln = 1, align = 'L')
                pdf.cell(w=0, h=15, txt = "Porcentaje con retrasos:"+str(PorcentajeRetraso[i]) +"%",ln = 1, align = 'L')
            else:
                pdf.cell(w=0, h=15, txt ="Grupo:"+ str(listDatosGrupo[i][2])+ " no tiene cuestionarios resueltos",ln = 1, align = 'L') 
                

    else:
        pdf.cell(w=0, h=15, txt ="No hay datos disponible",ln = 1, align = 'L')
    
        

    response = make_response(pdf.output(dest='S').encode('latin-1'))
    response.headers.set('Content-Disposition', 'attachment', filename="Reporte_Grupos" + '.pdf')
    response.headers.set('Content-Type', 'application/pdf')
    return response


@routes.route('/crear_reportes_cuestionarios_docentes_PDF', methods=['POST'])
def crear_reportes_cuestionarios_docentes_PDF():
    #Creacion imagenes estadisticas

    #Datos graficas Insights cuestionarios generales.

    #Grafica Numero de respuestas por grupo

    cuestionarioConRespuestasPy = request.form["cuestionarioConRespuestas"]
    contadorFrecuenciaRespuestasArrayPy = request.form["contadorFrecuenciaRespuestasArray"]
    #print(str(cuestionarioConRespuestasPy)+"__:__"+contadorFrecuenciaRespuestasArrayPy)
    graficaBarraNumRespGrupo = go.Bar(x=json.loads(cuestionarioConRespuestasPy), y=json.loads(contadorFrecuenciaRespuestasArrayPy))
    parametrosGraficaBarraNumRespGrupo = {'title': ' Numero de respuestas por grupo'}
    figGraficaBarraNumRespGrupo  = go.Figure(data=graficaBarraNumRespGrupo, layout=parametrosGraficaBarraNumRespGrupo )
    #figGraficaBarraNumRespGrupo.show()
    figGraficaBarraNumRespGrupo.write_image("static/images/NumeroRespuestasPorGrupo.png")

    #Graficos Datos graficos radar de los promedios generales por cuestionario
    promediosPorCuestionarioPy = request.form["promediosPorCuestionario"]
    cuestionarioConRespuestasRadioPy = request.form["cuestionarioConRespuestasRadio"]
    
    graficaRadioPromCuestionario = go.Scatterpolar(r =json.loads(promediosPorCuestionarioPy),
    theta =json.loads(cuestionarioConRespuestasRadioPy) , mode = 'markers')
    parametrosGraficaRadioPromCuestionario = {'title': ' Radar de los promedios generales por cuestionario'}
    figGraficaRadioPromCuestionario =go.Figure(data=graficaRadioPromCuestionario, layout= parametrosGraficaRadioPromCuestionario)
    figGraficaRadioPromCuestionario.write_image("static/images/GraficoRadarPromedioCuestionarios.png")

    #Graficos Datos graficos Promedio general por cuestionarios
    cuestionarioConRespuestasPromGenCuestPy = request.form["cuestionarioConRespuestasPromGenCuest"]
    promediosPorCuestionarioPromGenCuestPy = request.form["promediosPorCuestionarioPromGenCuest"]
    
    graficaBarraPromGenCues =  go.Bar(x=json.loads(cuestionarioConRespuestasPromGenCuestPy), y=json.loads(promediosPorCuestionarioPromGenCuestPy))
    parametrosGraficaPromGenCues = {'title': ' Promedio general por cuestionarios'}
    figPromGenCues =  go.Figure(data=graficaBarraPromGenCues, layout=parametrosGraficaPromGenCues)
    figPromGenCues.write_image("static/images/GraficoBarraPromGenCuest.png")

    #Insights cuestionarios generales 2.
    
    #Tiempo promedio en horas respuestas en cuestionarios
    cuestionarioConRespuestasTiemProHorasPy = request.form["cuestionarioConRespuestasTiemProHoras"]
    promedioTiempoPorCuestionarioTiemProHorasPy = request.form["promedioTiempoPorCuestionarioTiemProHoras"]

    graficaTiemProHoras = go.Bar(x=json.loads(cuestionarioConRespuestasTiemProHorasPy ), y=json.loads(promedioTiempoPorCuestionarioTiemProHorasPy))
    parametrosGraficaTiemProHoras =  {'title': ' Tiempo promedio en horas respuestas en cuestionarios'}

    figTiemProHoras = go.Figure(data=graficaTiemProHoras, layout= parametrosGraficaTiemProHoras)
    figTiemProHoras.write_image("static/images/TiempoPromedioHorasRespCuestionario.png")

    #porcentaje Aciertos Tipo Pregunta
    
    porcentajeAciertosTipoPreguntaPy = json.loads(request.form["porcentajeAciertosTipoPregunta"])

    #aprobadosReprobadosCuestionarioBarra
    aprobadosReprobadosCuestionarioBarraPy =json.loads(request.form["aprobadosReprobadosCuestionarioBarra"])
    
    dataAprobadosReprobadosCuestionarioBarra = []
    for i in range(0,len(aprobadosReprobadosCuestionarioBarraPy)):
        dataAprobadosReprobadosCuestionarioBarra.append(go.Bar(name = aprobadosReprobadosCuestionarioBarraPy[i][0],
        x =  aprobadosReprobadosCuestionarioBarraPy[i][1],
        y = aprobadosReprobadosCuestionarioBarraPy[i][2]))

    figAprobadosReprobadosCuestionarioBarra = go.Figure(dataAprobadosReprobadosCuestionarioBarra)
    figAprobadosReprobadosCuestionarioBarra.update_layout(barmode='stack')
    figAprobadosReprobadosCuestionarioBarra.write_image("static/images/aprobadosReprobadosCuestionarioBarra.png")

    #Datos de cuestionarios
    numeroRespuestasPy=json.loads(request.form["numeroRespuestas"])
    promediosGeneralesPy=json.loads(request.form["promediosGenerales"])
    tiempoPromedioRespuestasPy=json.loads(request.form["tiempoPromedioRespuestas"])
    PorcentajeAciertoPy=json.loads(request.form["PorcentajeAcierto"])
    cantidadRetrasosAtiempoPy=json.loads(request.form["cantidadRetrasosAtiempo"])
    cantidadRetrasosTardePy=json.loads(request.form["cantidadRetrasosTarde"])
    cifrasAprobadosPy=json.loads(request.form["cifrasAprobados"])
    cifasReprobadosPy=json.loads(request.form["cifasReprobados"])
    porcentajePreguntasPy = json.loads(request.form["porcentajesPreguntas"])

    #Creacion inicial del pdf
    pdf = FPDF()
    pdf.add_page()

    #Titulo del PDF
    pdf.set_font("Arial","B", size = 25)
    pdf.set_text_color(224, 9, 9)
    pdf.cell(w=200, h=45, txt = "Reporte cuestionarios",
         ln = 1, align = 'C')
    
    #Seccion de Insights cuestionarios generales en el pdf
    pdf.set_font("Arial", "B",size = 15)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(w=0, h=25, txt = "Insights cuestionarios generales",
         ln = 1, align = 'L')
    
    pdf.set_font("Arial", "",size = 15)

    #Titulo Grafica Numero de respuestas por grupo en el pdf
    pdf.cell(w=0, h=15, txt = "Gráfica Numero de respuestas por grupo",
         ln = 1, align = 'L')

    #Agregar imagen Numero de respuestas por grupo
    pdf.image("static/images/NumeroRespuestasPorGrupo.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '')

    #Titulo Grafica Radar de los promedios generales por cuestionario en el pdf
    pdf.cell(w=0, h=15, txt = "Gráfica radar de los promedios generales por cuestionario",
         ln = 1, align = 'L')

    #Agregar imagen Radar de los promedios generales por cuestionario
    pdf.image("static/images/GraficoRadarPromedioCuestionarios.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '')

    #Titulo Grafica  Promedio general por cuestionarios
    pdf.cell(w=0, h=15, txt = "Gráfica  promedio general por cuestionarios",
         ln = 1, align = 'L')
    
    #Aregar grafica Promedio general por cuestionarios

    pdf.image("static/images/GraficoBarraPromGenCuest.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '')
    
    #Seccion de Insights cuestionarios generales 2en el pdf
    pdf.set_font("Arial", "B",size = 15)
    pdf.cell(w=0, h=15, txt = "Insights cuestionarios generales 2",
         ln = 1, align = 'L')
    pdf.set_font("Arial", "",size = 15)

    pdf.cell(w=0, h=15, txt = "Tiempo promedio en horas respuestas en cuestionarios",
         ln = 1, align = 'L')

    pdf.image("static/images/TiempoPromedioHorasRespCuestionario.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '')
    
    #porcentaje Aciertos Tipo Pregunta

    pdf.cell(w=0,h=15, txt = "Porcentaje Aciertos Tipo Pregunta",
         ln = 1, align = 'L')

    pdf.cell(w=0, h=15, txt = "Opt1 = Opción multiple",
         ln = 1, align = 'L')

    pdf.cell(w=0, h=15, txt = "Opt2 = Rellenar espacios",
         ln = 1, align = 'L')
    
    pdf.cell(w=0, h=15, txt = "Opt3 = Ejercicios",
         ln = 1, align = 'L')

    pdf.cell(w=0, h=15, txt = "Opt4 = Arrastrar",
         ln = 1, align = 'L')

    pdf.cell(w=0, h=15, txt = "Opt5 = Falso/verdadero",
         ln = 1, align = 'L')

    pdf.cell(w=0, h=15, txt = "Opt6 = Pregunta abierta",
         ln = 1, align = 'L')
    
    

    for i in range(0,len(porcentajeAciertosTipoPreguntaPy)):
        pdf.cell(w=0,h=15, txt = str(porcentajeAciertosTipoPreguntaPy[i][0])+":",
         ln = 1, align = 'L')
        pdf.cell(w=0, h=15, txt = "Aciertos:"+str(porcentajeAciertosTipoPreguntaPy[i][1])+"%",
         ln = 1, align = 'L')
        pdf.cell(w=0, h=15, txt = "Error:"+str(porcentajeAciertosTipoPreguntaPy[i][2])+"%",
         ln = 1, align = 'L') 

    #Aprobados vs Reprobados

    pdf.cell(w=0, h=15, txt = "Gráfica comparación reprobados vs reprobados",
         ln = 1, align = 'L')

    pdf.image("static/images/aprobadosReprobadosCuestionarioBarra.png", x = None, y = None, w = 100, h = 100, type = 'png', link = '') 

    
    pdf.set_font("Arial", "B",size = 15)

    pdf.cell(w=0, h=15, txt = "Datos cuestionarios ",
         ln = 1, align = 'L')
    
    pdf.set_font("Arial", "",size = 15)
    
    #Agregar info cuestionarios 
    for i in range(0, len(numeroRespuestasPy)):
        pdf.cell(w=0,h=15, txt = "Cuestionario " + str(i+1),
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Numero de respuestas:"+ str(numeroRespuestasPy[i]),
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Promedio general:"+ str(promediosGeneralesPy[i]),
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Promedio tiempo respuestas por cuestionario:"+ str(tiempoPromedioRespuestasPy[i])+"hrs",
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Porcentaje de aciertos y error en cuestionario:"+ str(PorcentajeAciertoPy[i]),
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Entrega a tiempo::"+ str(cantidadRetrasosAtiempoPy[i]),
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Entrega con retraso:"+ str( cantidadRetrasosTardePy[i]),
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Citas aprobación y reprobación:",
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Aprobación:" +str(cifrasAprobadosPy[i]),
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Reprobación:"+str(cifasReprobadosPy[i]),
         ln = 1, align = 'L')
        pdf.cell(w=0,h=15, txt = "Porcentaje de aciertos por tipo de pregunta.:",
         ln = 1, align = 'L')
        for j in range(0, len(porcentajePreguntasPy[i])):
            
            pdf.cell(w=0,h=15, txt = str(porcentajePreguntasPy[i][j][0]) + " Acierto:"+str(porcentajePreguntasPy[i][j][1])+"%"+
             "Error:"+ str(porcentajePreguntasPy[i][j][2]) +"%",
         ln = 1, align = 'L')
            
    


    #Eliminación archivos de mas
    os.remove("static/images/NumeroRespuestasPorGrupo.png")
    os.remove("static/images/GraficoRadarPromedioCuestionarios.png")
    os.remove("static/images/GraficoBarraPromGenCuest.png")
    os.remove("static/images/TiempoPromedioHorasRespCuestionario.png")
    os.remove("static/images/aprobadosReprobadosCuestionarioBarra.png")
      
    response = make_response(pdf.output(dest='S').encode('latin-1'))
    response.headers.set('Content-Disposition', 'attachment', filename="Reporte_Cuestionarios" + '.pdf')
    response.headers.set('Content-Type', 'application/pdf')
    return response