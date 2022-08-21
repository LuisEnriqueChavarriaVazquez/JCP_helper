from flask import render_template,flash,request, url_for, redirect
from . import routes
from operacionesBD import Op_profesor
import bcrypt
import pandas as pd
import json
import plotly
import plotly.express as px

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

    #Grafica de ejemplo 1
    df = pd.DataFrame({
        "Fruit": ["Apples", "Oranges", "Bananas", "Apples", "Oranges", "Bananas"],
        "Amount": [4, 1, 2, 2, 4, 5],
        "City": ["SF", "SF", "SF", "Montreal", "Montreal", "Montreal"]
    })

    fig = px.bar(df, x="Fruit", y="Amount", color="City", barmode="group")

    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    header="Fruit in North America"
    description = """
    A academic study of the number of apples, oranges and bananas in the cities of
    San Francisco and Montreal would probably not come up with this chart.
    """
    
    #Grafico de ejemplo 2
    df2 = pd.DataFrame({
        "Vegetables": ["Lettuce", "Cauliflower", "Carrots", "Lettuce", "Cauliflower", "Carrots"],
        "Amount": [10, 15, 8, 5, 14, 25],
        "City": ["London", "London", "London", "Madrid", "Madrid", "Madrid"]
    })

    fig2 = px.bar(df2, x="Vegetables", y="Amount", color="City", barmode="stack")

    graphJSON2 = json.dumps(fig2, cls=plotly.utils.PlotlyJSONEncoder)
    header2="Vegetables in Europe"
    description2 = """
    The rumor that vegetarians are having a hard time in London and Madrid can probably not be
    explained by this chart.
    """
    return render_template('profesor/a_gestionar_estadisticas.html', graphJSON=graphJSON, header=header,description=description, graphJSON2=graphJSON2, header2=header2,description2=description2)

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
        alias=request.form["alias"]
        foto=request.files["foto"]
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



        Op_profesor.insertar_profesor(nombre,alias,foto,correo,hashed,unidad_academica,descripcion)
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
                return render_template('profesor/bienvenidaProfesor.html',datos=result)  
            else:
                flash("Usuario o contraseña incorrectos!")
                return redirect(url_for('routes.login_general'))   
        else:
            flash("Usuario o contraseña incorrectos!")
            return redirect(url_for('routes.login_general'))       


##Pagina de bienvenida
@routes.route('/bienvenidaProfesor')
def bienvenidaProfesor():
    return render_template('profesor/bienvenidaProfesor.html')

