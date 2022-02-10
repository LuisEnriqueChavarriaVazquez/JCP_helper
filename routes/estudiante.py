from flask import flash, render_template,request
import base64
from . import routes
from operacionesBD import Op_estudiante

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
        password=request.form["password"]
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
        Op_estudiante.insertar_estudiante(nombre,alias,foto,correo,password,es_proc,grupo,desc_alum,area_esp_a,correoA,linkedinA,facebookA,instagramA,vkA,telefonoA)
        flash(f"{nombre} te has registrado correctamente!!")
        return render_template("estudiante/bienvenidaEstudiante.html")