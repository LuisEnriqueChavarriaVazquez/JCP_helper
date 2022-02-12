from googletrans import Translator
import googletrans

palabras_traducidas = []
#Pagina para elegir si es maestro o alumno
palabras_1 = ['Bienvenido de nuevo',
    '¿Qué tipo de usuario es usted?',
    'Estudiante', 
    'Docente', 
    '¿Ya tiene una cuenta?', ]


trans = Translator()

##Traducir muchos caracteres del español al ingles
def traducir_spanish_to_english(conjunto_sin_traducir):
    for palabra in conjunto_sin_traducir:
        resultado = trans.translate(palabra)

        print(f'{resultado.origin} -> {resultado.text}')

traducir_spanish_to_english(palabras_1)

##Traducir caracteres del español al portuguese
def traducir_spanish_to_portuguese(conjunto_sin_traducir):
    for palabra in conjunto_sin_traducir:
        resultado = trans.translate(palabra, dest='portuguese')

        print(f'{resultado.origin} -> {resultado.text}')

traducir_spanish_to_portuguese(palabras_1)

##Traducir caracteres del español al chino simplificado
def traducir_spanish_to_chinese(conjunto_sin_traducir):
    for palabra in conjunto_sin_traducir:
        resultado = trans.translate(palabra, dest='chinese (simplified)')

        print(f'{resultado.origin} -> {resultado.text}')

traducir_spanish_to_chinese(palabras_1)

##Traducir caracteres del español al ruso
def traducir_spanish_to_chinese(conjunto_sin_traducir):
    for palabra in conjunto_sin_traducir:
        resultado = trans.translate(palabra, dest='russian')

        print(f'{resultado.origin} -> {resultado.text}')

traducir_spanish_to_chinese(palabras_1)

##Traducir caracteres del español al frances
def traducir_spanish_to_chinese(conjunto_sin_traducir):
    for palabra in conjunto_sin_traducir:
        resultado = trans.translate(palabra, dest='french')

        print(f'{resultado.origin} -> {resultado.text}')

traducir_spanish_to_chinese(palabras_1)

##Listado de lenguages soportodos
##print(googletrans.LANGUAGES)