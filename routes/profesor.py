from functools import wraps
from unittest import result
from flask import render_template,flash,request, url_for, redirect, session
from . import routes
from operacionesBD import Op_profesor
import bcrypt
import pandas as pd
import json
import plotly
import plotly.express as px
from flask_uploads import IMAGES, UploadSet

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
        return render_template('profesor/a_gestionar_cuestionarios.html',datos=result)
    except:
        return render_template('profesor/a_gestionar_cuestionarios.html')


##Ruta para la vista de gestion de estadisticas
@routes.route('/gestionar_estadisticas')
#@login_required
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

        result=Op_profesor.datos_completos_docente_by_id(id_profesor)

        return render_template('profesor/a_gestionar_grupos.html', grupo = myGrupos, datos=result)
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

        #Guardo los datos del docente (los de la sesion)

        result=Op_profesor.datos_completos_docente_by_id(id_profesor)

        #Retorno los grupos en la página para que puedan ser impresos
        return render_template('profesor/a_gestionar_grupos.html', grupo = myGrupos, datos=result)

##
##Bloque para eliminar los grupos
##

@routes.route('/deleteGroup/<string:id>')
def delete_group(id):
    #Eliminamos el grupo con el ID dada
    resultDelete = Op_profesor.delete_grupos(id)

    return redirect(url_for('routes.gestionar_grupos')) 

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



        Op_profesor.insertar_profesor(nombre,alias,foto,correo,hashed,unidad_academica,descripcion)
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
                return render_template('profesor/bienvenidaProfesor.html',datos=result)  
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
        return render_template('profesor/bienvenidaProfesor.html',datos=result)
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
        return render_template('profesor/perfil_docente.html',datos=result)
    except:
        return render_template('profesor/perfil_docente.html')


#Creación cuestionarios
@routes.route('/creacion_cuestionarios')
#@login_required
def creacion_cuestionarios():
    return render_template('profesor/cuestionarios_creacion.html')


#Java coder runner
@routes.route("/java_runner")
def java_runner():
    return render_template('profesor/java_runner.html')


#Python coder runner
@routes.route('/python_runner')
def python_runner():
    return render_template("profesor/python_runner.html")


# Formulario para que el docente haga una publicacion
@routes.route('/crear_publicacion')
#@login_required
def crear_publicacion_form():
    return render_template('profesor/crear_publicacion.html')
