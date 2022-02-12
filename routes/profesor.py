from flask import render_template,flash,request, url_for, redirect
from . import routes
from operacionesBD import Op_profesor
import bcrypt

##
## Links para la parte del panel central
##

##Ruta para la vista de comunidad del profesor
@routes.route('/comunidad_profesor')
def comunidad_profesor():
    return render_template('profesor/a_comunidad_profesor.html')

##Ruta para la vista de gestion de cuestionarios
@routes.route('/gestionar_cuestionarios')
def gestionar_cuestionarios():
    return render_template('profesor/a_gestionar_cuestionarios.html')

##Ruta para la vista de gestion de estadisticas
@routes.route('/gestionar_estadisticas')
def gestionar_estadisticas():
    return render_template('profesor/a_gestionar_estadisticas.html')

##Ruta para la vista de gestion de grupos
@routes.route('/gestionar_grupos')
def gestionar_grupos():
    return render_template('profesor/a_gestionar_grupos.html')

##
## Parte del sign up del profesor
##

##Ruta para la pagina de sign up del profesor
@routes.route('/signup_prof')
def signup_Prof():
    return render_template('profesor/signup_prof.html')

@routes.route('/nuevo_profesor',methods=["POST"])
def nuevo_profesor():
    if request.method=="POST":
        nombre=request.form["nombre"]
        alias=request.form["aliasP"]
        foto=request.files["foto"]
        correo=request.form["correo"]
        password=request.form["password"]

        # encriptamos la contraseña
        password = password.encode('utf-8')
        hashed = bcrypt.hashpw(password, bcrypt.gensalt()) 

        correo_alt=request.form["correo_alt"]
        linkedinP=request.form["linkedinP"]
        facebookP=request.form["facebookP"]
        instagramP=request.form["instagramP"]
        vkP=request.form["vkP"]
        telefonoP=request.form["telefonoP"]
        unidad_ac=request.form["unidad_ac"]
        desc_perfil=request.form["desc_perfil"]
        Op_profesor.insertar_profesor(nombre,alias,foto,correo,hashed,correo_alt,linkedinP,facebookP,instagramP,vkP,telefonoP,unidad_ac,desc_perfil)
        flash(f"{nombre} te has registrado correctamente")
        return render_template('profesor/bienvenidaProfesor.html')

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
                print(result[3])
                return render_template('profesor/bienvenidaProfesor.html',datos=result)  
            else:
                return redirect(url_for('routes.login_general'))   
        else:
            return redirect(url_for('routes.login_general'))       


##Pagina de bienvenida
@routes.route('/bienvenidaProfesor')
def bienvenidaProfesor():
    return render_template('profesor/bienvenidaProfesor.html')

