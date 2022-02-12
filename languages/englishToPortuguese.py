from googletrans import Translator

from atext_english import *

trans = Translator()
##Traducir caracteres del español al portuguese
def traducir_english_to_portuguese(conjunto_sin_traducir):
    for palabra in conjunto_sin_traducir:
        resultado = trans.translate(palabra, dest='portuguese')

        print(f'{resultado.origin} -> {resultado.text}')

traducir_english_to_portuguese(palabras_1)