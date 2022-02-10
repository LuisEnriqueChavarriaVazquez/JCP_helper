from flask import render_template,flash,request
from . import routes
from operacionesBD import Op_profesor


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
        correo_alt=request.form["correo_alt"]
        linkedinP=request.form["linkedinP"]
        facebookP=request.form["facebookP"]
        instagramP=request.form["instagramP"]
        vkP=request.form["vkP"]
        telefonoP=request.form["telefonoP"]
        unidad_ac=request.form["unidad_ac"]
        desc_perfil=request.form["desc_perfil"]
        Op_profesor.insertar_profesor(nombre,alias,foto,correo,password,correo_alt,linkedinP,facebookP,instagramP,vkP,telefonoP,unidad_ac,desc_perfil)
        flash(f"{nombre} te has registrado correctamente")
        return render_template('profesor/bienvenidaProfesor.html')

##Pagina de bienvenida
@routes.route('/bienvenidaProfesor')
def bienvenidaProfesor():
    return render_template('profesor/bienvenidaProfesor.html')