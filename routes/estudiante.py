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
        
        Op_estudiante.insertar_estudiante(nombre,alias,foto,correo,hashed,area,escuela,descripcion)
        flash(f"{nombre} te has registrado correctamente!!")
        return render_template("estudiante/bienvenidaEstudiante.html")

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
        return render_template('estudiante/perfil_alumno.html',datos=result)
    except:
        return render_template('estudiante/perfil_alumno.html')

##Ruta para que los estudiantes respondan los cuestionarios
@routes.route('/contestar_cuestionario_estudiante')
#@login_required
def  contestar_cuestionario_estudiante():
    return render_template('estudiante/contestar_cuestionario.html')