from flask import flash, render_template,request,redirect,url_for
from . import routes
from operacionesBD import Op_estudiante
import bcrypt

##
## Links para la parte del panel central
##

##Ruta para la vista de comunidad del estudiante
@routes.route('/comunidad_estudiante')
def comunidad_estudiante():
    return render_template('profesor/b_comunidad_estudiante.html')

##Ruta para la vista de gestion de cuestionarios
@routes.route('/gestionar_cuestionarios_estudiante')
def gestionar_cuestionarios_estudiante():
    return render_template('profesor/b_gestionar_cuestionarios.html')

##Ruta para la vista de gestion de estadisticas
@routes.route('/gestionar_estadisticas_estudiante')
def gestionar_estadisticas_estudiante():
    return render_template('profesor/b_gestionar_estadisticas.html')

##Ruta para la vista de gestion de grupos
@routes.route('/gestionar_grupos_estudiante')
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
def bienvenidaEstudiante():
    return render_template('estudiante/bienvenidaEstudiante.html')

@routes.route('/nuevo_estudiante',methods=["POST"])
def nuevo_estudiante():
    if request.method=="POST":
        nombre=request.form["nombre"]
        alias=request.form["alias"]
        foto=request.files["foto"]
        correo=request.form["correo"]
        password=str(request.form["password"])

        # encriptamos la contraseña
        password = password.encode('utf-8')
        hashed = bcrypt.hashpw(password, bcrypt.gensalt()) 


        es_proc=request.form["es_proc"]
        grupo=request.form["grupo"]
        desc_alum=request.form["desc_alum"]
        area_esp_a=request.form["area_esp_a"]
        correoA=request.form["correoA"]
        linkedinA=request.form["linkedinA"]
        facebookA=request.form["facebookA"]
        instagramA=request.form["instagramA"]
        vkA=request.form["vkA"]
        telefonoA=request.form["telefonoA"]
        Op_estudiante.insertar_estudiante(nombre,alias,foto,correo,hashed,es_proc,grupo,desc_alum,area_esp_a,correoA,linkedinA,facebookA,instagramA,vkA,telefonoA)
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
                return render_template('estudiante/bienvenidaEstudiante.html')  
            else:
                return redirect(url_for('routes.login_general'))   
        else:
            return redirect(url_for('routes.login_general'))       
