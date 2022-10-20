from functools import wraps
from queue import Empty
from unittest import result
from flask import flash, render_template,request,redirect,url_for,session
from . import routes
from operacionesBD import Op_estudiante
from operacionesBD import Op_profesor
import bcrypt
from flask_uploads import IMAGES, UploadSet

photos = UploadSet("photos", IMAGES)

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
        return render_template('estudiante/bienvenidaEstudiante.html',datos=result)
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
    resultadoConsulta = Op_estudiante.insertar_estudiante_grupo(id_docente, id_grupo, id_estudiante)

    if(resultadoConsulta == 'listo'):
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
    return redirect(url_for("routes.bienvenidaEstudiante"))

##
##Bloque para ver datos de grupo
##

@routes.route('/viewGroup/<string:id>')
def view_group_alumno(id):
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
    return render_template('estudiante/b_verGrupo.html', groupInfo = pickedGroupData[0], datosAlumnos = datosAlumnos, datosCuestionarios = datosCuestionarios)


##
##Bloque para ver mis grupos
##
@routes.route('/mis_grupos/<string:id_estudiante>')
def mis_grupos(id_estudiante):
    #Busca los IDS de maestros, grupos y alumnos vinculados
    resultIds = Op_estudiante.obtener_IDs_dentro_de_grupo(id_estudiante)
    
    #Busca toda la data del grupo para mostrar
    resultGroup = ()
    for idGroup in resultIds:
        resultGroup += Op_profesor.obtener_grupo_datos_importantes_unitario(idGroup[1])

    #En caso de que este vacio retornamos un empty.
    if(result is None):
        return render_template("estudiante/b_mis_grupos.html", datosIds = "empty", datosGroup = "empty")
    else:
        return render_template("estudiante/b_mis_grupos.html", datosIds = resultIds, datosGroup = resultGroup)

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
        return render_template("login_general.html")

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
                return render_template('estudiante/bienvenidaEstudiante.html',datos=result)  
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

@routes.route('/perfil_general_view_docente/<string:id>')
#@login_required
def ver_perfil_docente(id):
    try:
        datos = Op_profesor.datos_completos_docente_by_id(id)
        post = Op_profesor.obtenerPost(id)
        return render_template('general/perfil_general_docente.html',datos=datos, post = post)
    except:
        #En caso de error
        return redirect(url_for('routes.gestionar_grupos'))

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