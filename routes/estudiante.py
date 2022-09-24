from functools import wraps
from flask import flash, render_template,request,redirect,url_for,session
from . import routes
from operacionesBD import Op_estudiante
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

##Pagina de bienvenida
@routes.route('/bienvenidaEstudiante')
#@login_required
def bienvenidaEstudiante():
    return render_template('estudiante/bienvenidaEstudiante.html')

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


##Ruta para que los estudiantes respondan los cuestionarios
@routes.route('/contestar_cuestionario_estudiante')
#@login_required
def  contestar_cuestionario_estudiante():
    return render_template('estudiante/contestar_cuestionario.html')