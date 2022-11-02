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
import plotly
import plotly.express as px
from flask_uploads import IMAGES, UploadSet
import requests
import ast
import shutil

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


# def not_logged_in(f):
#     @wraps(f)
#     def wrap(*args, **kwargs):
#         if 'logged_in' in session:
#             return redirect(url_for('bienvenidaProfesor'))
#         else:
#             return f(*args, *kwargs)

#     return wrap


def wrappers(func, *args, **kwargs):
    def wrapped():
        return func(*args, **kwargs)

    return wrapped

##Ruta para la vista de comunidad del profesor
@routes.route('/comunidad_profesor')
#@login_required
def comunidad_profesor():
    return render_template('profesor/a_comunidad_profesor.html')

##Ruta para la vista de gestion de cuestionarios
@routes.route('/gestionar_cuestionarios')
#@login_required
def gestionar_cuestionarios():
    try:
        result=Op_profesor.datos_completos_docente_by_id(session["IDDocente"])
        try:
            resultCuestionarios = Op_profesor.obtener_cuestionarios_datos_importantes(session["IDDocente"])
            resultGrupos = []
            for cuestionarioIdGrupo in resultCuestionarios:
                resultGrupos.append(Op_profesor.obtener_grupos_Nombre(cuestionarioIdGrupo[1]))
                print(resultGrupos)
        except:
            return render_template('profesor/a_gestionar_cuestionarios.html',datos=result)
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
            idsPendingCuestionarios += str(idCuestionarioPending[1])
        
        #Almacenamos los datos de lso cuestionarios pending
        datosCuestionariosPendingExtendidos = []
        for idCuestionario2 in idsPendingCuestionarios:
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

##Tura para ir a la vista de revision de cuestionarios pendientes
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
    xgrupos=["3cm14","3cm15","2cv12"]
    ygrupos=[10,9.2,7]
    #Obtenemos los datos del grupo
    datosGrupo = Op_profesor.obtener_grupos_datos_importantes(id_docente)
    print(datosGrupo)

    idGrupos = []
    for singleIDGrupo in datosGrupo:
        idGrupos.append(singleIDGrupo[0])
    print(idGrupos) #[1,2]

    datosGlobalesAlumnos = []
    alumnosDentroGrupo = []

    ########## INFORMACION ESTUDIANTES EN GRUPOS
    #Obtenemos los ids de los estudiantes dentro de un grupo
    for idGrupo in idGrupos:
        alumnosIdsDentroGrupo = Op_profesor.obtener_IDAlumno_dentro_de_grupo(idGrupo)
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

        datosGlobalesAlumnos.append(datosAlumnos)
        alumnosDentroGrupo.append(alumnosIdsDentroGrupo)
    
    print(datosGlobalesAlumnos) #[[((1,), (2,))], [((1,), (2,))]]
    print(alumnosDentroGrupo)

    #Contador de alumnos por grupo
    cantidadesDeAlumnos = []
    k = 0
    for alumnoDentroGrupo in alumnosDentroGrupo:
        cantidadesDeAlumnos.append(str(len(alumnoDentroGrupo)))
        k += 1
    print(cantidadesDeAlumnos)

    #Contador de cuestionarios
    #Cuenta los elementos
    IDS_Cuestionarios = Op_profesor.obtener_cuestionarios_IDS(id_docente)
    ##Contador de alumnos y grupos y cuestionarios
    contadorCuestionarios = len(IDS_Cuestionarios)

    return render_template('profesor/a_gestionar_estadisticas.html', datosGrupo=datosGrupo, datosGlobalesAlumnos = datosGlobalesAlumnos, cantidadesDeAlumnos = cantidadesDeAlumnos,IDS_Cuestionarios = contadorCuestionarios,xgrupos=xgrupos,ygrupos=ygrupos)

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

                #Cuenta los elementos
                IDS_Alumnos = Op_profesor.obtener_alumnos_con_profesor_IDS(session['IDDocente'])
                IDS_Grupos = Op_profesor.obtener_grupos_IDS(session['IDDocente'])
                IDS_Cuestionarios = Op_profesor.obtener_cuestionarios_IDS(session['IDDocente'])
                ##Contador de alumnos y grupos y cuestionarios
                contadorAlumnos = len(IDS_Alumnos)
                contadorGrupos = len(IDS_Grupos)
                contadorCuestionarios = len(IDS_Cuestionarios)
                return render_template('profesor/bienvenidaProfesor.html',datos=result, IDS_Alumnos = contadorAlumnos, IDS_Grupos = contadorGrupos, IDS_Cuestionarios = contadorCuestionarios)  
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
        return render_template('profesor/bienvenidaProfesor.html',datos=result, IDS_Alumnos = contadorAlumnos, IDS_Grupos = contadorGrupos, IDS_Cuestionarios = contadorCuestionarios)
    except:
        return render_template('profesor/bienvenidaProfesor.html')


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
        url=f"https://banco-de-datos.herokuapp.com/preguntas?lenguaje={query}"
        response=requests.request("GET",url=url)
        preguntas=response.text
        preguntas=preguntas[1:-2]
        preguntas=preguntas.replace("\"preguntas\":","")
        preguntas = ast.literal_eval(preguntas)

        temas=[]
        tipo_pregunta=[]

        for i in preguntas:
            if i["tema"] not in temas:
                temas.append(i["tema"])
            
            if i["tipo_pregunta"] not in tipo_pregunta:
                tipo_pregunta.append(i["tipo_pregunta"])

        return render_template("profesor/cuestionarios_del_banco.html",temas=temas,preguntas=tipo_pregunta,lenguaje=query)
    
    return render_template("profesor/cuestionarios_del_banco.html")


"""
esto le genera el cuestionario en base a sus criterios seleccionados
"""
@routes.route('/genera_preguntas_por_lenguaje',methods=["POST"])
def genera_preguntas_por_lenguaje():
    query=request.args.get("lenguaje")
    url=f"https://banco-de-datos.herokuapp.com/preguntas?lenguaje={query}"
    response=requests.request("GET",url=url)
    preguntas=response.text
    preguntas=preguntas[1:-2]
    preguntas=preguntas.replace("\"preguntas\":","")
    preguntas = ast.literal_eval(preguntas)

    temas=request.form.getlist("temas")
    tipo_preguntas=request.form.getlist("tipos")
    cuestionario_personalizado=[]
    for i in preguntas:
        if i["tema"] in temas and i["tipo_pregunta"] in tipo_preguntas:
            if i["tipo_pregunta"].startswith("Op"):
                valores= i["opciones"].split(",")
                i["opciones"]=valores
            elif i["tipo_pregunta"].startswith("Ver"):
                aux= i["respuesta"]
                i["respuesta"]=aux[0].upper()    
            cuestionario_personalizado.append(i)
    id_profesor=session['IDDocente']
    cuestionario_rutas = Op_profesor.obtener_cuestionarios_rutas(id_profesor)
    resultCuestionarios = Op_profesor.obtener_cuestionarios_datos_importantes(id_profesor)
    return render_template('profesor/cuestionario_del_banco_personalizado.html', id_profesor = id_profesor, cuestionario_rutas = cuestionario_rutas, datosCuestionario = resultCuestionarios,preguntas=cuestionario_personalizado)

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
    rutaCopia = nuevaRuta + "(copia).json";

    #Agregamos (copia) al nuevo titulo
    tituloCuestionario = str(pickedCuestionarioData[0][3]) + "_(copia)"

    #Copiamos el JSON existente y escribimos uno nuevo
    shutil.copy(rutaVieja, rutaCopia)
    
    #Insertamos el nuevo cuestionario
    Op_profesor.insertar_cuestionario_JSON(pickedCuestionarioData[0][1], pickedCuestionarioData[0][2], tituloCuestionario, pickedCuestionarioData[0][4], pickedCuestionarioData[0][5], pickedCuestionarioData[0][6], pickedCuestionarioData[0][7], pickedCuestionarioData[0][8], rutaCopia, pickedCuestionarioData[0][10], pickedCuestionarioData[0][11], pickedCuestionarioData[0][12], pickedCuestionarioData[0][13])
    
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