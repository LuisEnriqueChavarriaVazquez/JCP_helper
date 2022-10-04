#from crypt import methods
from functools import wraps
from flask import render_template,flash,request, url_for, redirect, session
from . import routes
from operacionesBD import Op_profesor
import bcrypt
import pandas as pd
import json
import plotly
import plotly.express as px
from flask_uploads import IMAGES, UploadSet
import requests
import ast

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
        resultCuestionarios = Op_profesor.obtener_cuestionarios_datos_importantes(session["IDDocente"])
        return render_template('profesor/a_gestionar_cuestionarios.html',datos=result, datosCuestionarios = resultCuestionarios)
    except:
        return render_template('profesor/a_gestionar_cuestionarios.html')


##Ruta para la vista de gestion de estadisticas
@routes.route('/gestionar_estadisticas/<string:id_grupo>')
#@login_required
def gestionar_estadisticas(id_grupo):

    #Grafica de ejemplo 1
    df = pd.DataFrame({
        "Fruit": ["Apples", "Oranges", "Bananas", "Apples", "Oranges", "Bananas"],
        "Amount": [4, 1, 2, 2, 4, 5],
        "City": ["SF", "SF", "SF", "Montreal", "Montreal", "Montreal"]
    })

    fig = px.bar(df, x="Fruit", y="Amount", color="City", barmode="relative")

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

    #Obtenemos los datos del grupo
    datosGrupo = Op_profesor.obtener_grupos_datos_importantes(id_grupo)
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

    return render_template('profesor/a_gestionar_estadisticas.html', datosGrupo=datosGrupo, datosGlobalesAlumnos = datosGlobalesAlumnos, cantidadesDeAlumnos = cantidadesDeAlumnos, graphJSON=graphJSON, header=header,description=description, graphJSON2=graphJSON2, header2=header2,description2=description2)

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

        ##Esta sesscion es para poder hacer el conteo de alumnos en un grupo
        myGruposLista = []

        for grupoLista in myGrupos:
            myGruposLista.append(grupoLista)
        
        idsAlumnos = ()
        for idGrupo in myGruposLista:
            #Obtenemos y contamos los ids de los estudiantes dentro de un grupo para contarlos
            idsAlumnos += (Op_profesor.contar_IDAlumno_dentro_de_grupo(idGrupo[0]))

        #Datos del docente
        result=Op_profesor.datos_completos_docente_by_id(id_profesor)

        return render_template('profesor/a_gestionar_grupos.html', grupo = myGrupos, datos=result, idsAlumnos = idsAlumnos)
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

        ##Esta sesscion es para poder hacer el conteo de alumnos en un grupo
        myGruposLista = []

        for grupoLista in myGrupos:
            myGruposLista.append(grupoLista)
        
        idsAlumnos = ()
        for idGrupo in myGruposLista:
            #Contamos los ids de los estudiantes dentro de un grupo para contarlos
            idsAlumnos += (Op_profesor.contar_IDAlumno_dentro_de_grupo(idGrupo[0]))
        print(idsAlumnos)
        #Guardo los datos del docente (los de la sesion)
        result=Op_profesor.datos_completos_docente_by_id(id_profesor)

        #Retorno los grupos en la página para que puedan ser impresos
        return render_template('profesor/a_gestionar_grupos.html', grupo = myGrupos, datos=result, idsAlumnos=idsAlumnos)

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

    #Enviamos al usuario al formulario para ver datos del grupo.
    return render_template('profesor/b_verGrupo.html', groupInfo = pickedGroupData[0], datosAlumnos = datosAlumnos)

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
                ##Contador de alumnos y grupos
                contadorAlumnos = len(IDS_Alumnos)
                contadorGrupos = len(IDS_Grupos)
                return render_template('profesor/bienvenidaProfesor.html',datos=result, IDS_Alumnos = contadorAlumnos, IDS_Grupos = contadorGrupos)  
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
        ##Contador de alumnos y grupos
        contadorAlumnos = len(IDS_Alumnos)
        contadorGrupos = len(IDS_Grupos)
        return render_template('profesor/bienvenidaProfesor.html',datos=result, IDS_Alumnos = contadorAlumnos, IDS_Grupos = contadorGrupos)
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
        return render_template('general/perfil_general.html',datos=datos)
    except:
        #En caso de error
        return redirect(url_for('routes.gestionar_grupos'))


#Creación cuestionarios
@routes.route('/creacion_cuestionarios/<string:id_profesor>')
def creacion_cuestionarios(id_profesor):
    return render_template('profesor/cuestionarios_creacion.html', id_profesor = id_profesor)


#creacion del cuestionario del banco de pruebas
@routes.route('/crear_cuestionario_del_banco',methods=['GET',"POST"])
#@login_required
def crear_cuestionario_del_banco():
    return render_template("profesor/cuestionarios_del_banco.html")

@routes.route('/obtener_preguntas_por_lenguaje',methods=["POST"])
def obtener_preguntas_por_lenguaje():
    
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
    nombreCuestionario = request.form["nombreCuestionario"]
    nombreCuestionario = nombreCuestionario.replace(" ","_")

    #Creamos el documento JSON y lo guardamos
    with open('static/cuestionarios/'+ nombreCuestionario + '.json', 'w') as f:
        print("Archivo JSON creado")

    #Leemos el archivo
    return render_template('profesor/b_cuestionarios_creacion.html', id_profesor = id_profesor, nombreCuestionario = nombreCuestionario)

###Segundo guardamos la data del cuestionario
@routes.route('/saveCuestionario/<string:id_profesor>', methods=["POST"])
def saveCuestionario(id_profesor):
    #Guardamos datos del formualario
    tituloCuestionario = request.form["tituloCuestionario"]
    fechaCuestionario = request.form["fechaCuestionario"]
    autorCuestionario = request.form["autorCuestionario"]
    temasCuestionario = request.form["temasCuestionario"]
    tipoCuestionario = request.form["tipoCuestionario"]
    lenguajeCuestionario = request.form["lenguajeCuestionario"]
    grupoCuestionario = request.form["grupoCuestionario"]

    #Buscamos el grupo por su nombre
    id_grupo = Op_profesor.obtener_id_grupo_con_nombre_grupo(grupoCuestionario)
    print(id_grupo)

    #Guardamos el archivo en una variable (solo texto)
    #with open('static/cuestionarios/'+ tituloCuestionario + '.json', 'r') as file:
        #archivoCuestionario = file.read().replace('\n', '')
    
    rutaCuestionario = 'static/cuestionarios/'+ tituloCuestionario + '.json'

    result = Op_profesor.insertar_cuestionario_JSON(id_profesor, id_grupo, tituloCuestionario, fechaCuestionario, autorCuestionario, temasCuestionario, tipoCuestionario, lenguajeCuestionario, rutaCuestionario)
    return redirect(url_for('routes.gestionar_cuestionarios'))

# Formulario para que el docente haga una publicacion
@routes.route('/crear_publicacion')
#@login_required
def crear_publicacion_form():
    return render_template('profesor/crear_publicacion.html')

#Formulario para guardar fondos de perfil
@routes.route('/guardarFondo/<string:id_docente>',methods=['GET','POST'])
#@login_required
def guardarFondo(id_docente):
    if request.method=="POST":
        #Variables del formulario
        fondo = request.form["fondo"]
        Op_profesor.update_fondo_docente(fondo, id_docente)
        return redirect(url_for('routes.perfil_docente'))