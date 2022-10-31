/*
*   Puede parecer algo intimidante, pero en general el formato interno de los JSON se divide en 
*   8 arrays cada uno con objetos literales dentro
*   
*   array 1 = orden de preguntas (almacena las preguntas en orden de creacion)
*   array 2 = almacena el valor de cada una de las preguntas
*   array 3 - 8 = almacena las preguntas según su tipo
*       El modal1 = opcion multiple
*       el modal2 = acompletar conceptos con la frase
*       el modal3 = ejercicios de código
*       el modal4 = arrastrar y relacionar las palabras con su definicion
*       el modal5 = son las de true y false
*       el modal6 = son las preguntas abiertas
*/

//Nota: Algunos datos como el autor y cosas asi, directamente cuando se genere el cuestionario del banco
//      metelos a la DB, o en su defecto genera un nuevo array en los JSON para meter esa data
//      esto a fin de mantener sin modificaciones los 8 arrays ya existentes y evitar fallos en las lógicas
//      de evaluacion automática de cuestionarios.

{
    "ordenPreguntas": [ //Se almacenan identificaddores del orden de las preguntas (el orden de creación)
        {
            "0": "optFalsoVerdadero", //Primer pregunta creada
            "1": "optFalsoVerdadero",
            "2": "optFalsoVerdadero",
            "3": "optFalsoVerdadero",
            "4": "optFalsoVerdadero",
            "5": "optFalsoVerdadero",
            "6": "optAbierta",
            "7": "optAbierta",
            "8": "optAbierta",
            "9": "optAbierta",
            "10": "optAbierta",
            "11": "optAbierta",
            "12": "optAbierta",
            "13": "optArrastrar",
            "14": "optArrastrar",
            "15": "optArrastrar",
            "16": "optArrastrar",
            "17": "optArrastrar",
            "18": "optArrastrar",
            "19": "optMultiple",
            "20": "optMultiple",
            "21": "optMultiple",
            "22": "optMultiple",
            "23": "optMultiple",
            "24": "optMultiple",
            "25": "optMultiple",
            "26": "optAcompletar",
            "27": "optAcompletar",
            "28": "optAcompletar",
            "29": "optAcompletar",
            "30": "optEjercicios",
            "31": "optEjercicios",
            "32": "optEjercicios",
            "33": "optEjercicios" //Ultima pregunta creada
        }
    ],
    "ponderacionGlobal": [ //Aqui se guarda el valor de la ponderacion de cada pregunta (su valor en orden de creacion)
    {
    "0": "", //Todas las ponderaciones aqui no estan validadas (estas son validadas despues)
    "1": "4", //Todas siempre son del 1 al 5 (una vez que se validan en otra parte de la web)
    "2": "4", //Ntp, la validacion es automática y ya esta implementada
    "3": "1",
    "4": "3",
    "5": "4",
    "6": "5",
    "7": "3",
    "8": "00",
    "9": "4",
    "10": "4",
    "11": "4",
    "12": "3",
    "13": "2",
    "14": "3",
    "15": "5",
    "16": "5",
    "17": "3",
    "18": "3",
    "19": "2",
    "20": "5",
    "21": "4",
    "22": "3",
    "23": "2",
    "24": "2",
    "25": "3",
    "26": "5",
    "27": "",
    "28": "3",
    "29": "5",
    "30": "5",
    "31": "4",
    "32": "4",
    "33": "3"
    }
    ],
    "preguntasModal1": [ //Las preguntas modal1 son las de opcion multiple
    {   //Estrcutura general
    "0": "Pregunta 1 con un texto largo", //Texto de pregunta
    "1": "", //Imagen complementaria
    "2": "A",   //Respuesta correcta
    "3": "opt 1",   //Opcion a
    "4": "",    //Opcion b
    "5": "",    //Opcion c
    "6": ""     //Opcion d
    },
    {
    "0": "Pregunta 1 con un texto largo",
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
    "2": "B",
    "3": "opt 1",
    "4": "opt 2",
    "5": "",
    "6": ""
    },
    {
    "0": "Pregunta 1 con un texto largo",
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
    "2": "B",
    "3": "opt 1",
    "4": "opt 2",
    "5": "",
    "6": ""
    },
    {
    "0": "Pregunta 1 con un texto largo",
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
    "2": "C",
    "3": "opt 1",
    "4": "opt 2",
    "5": "",
    "6": ""
    },
    {
    "0": "Pregunta 1 con un texto largo",
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
    "2": "D",
    "3": "opt 1",
    "4": "opt 2",
    "5": "",
    "6": "opt 4"
    },
    {
    "0": "Pregunta 1 con un texto largo",
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
    "2": "C",
    "3": "opt 1",
    "4": "opt 2",
    "5": "opt 3",
    "6": "opt 4"
    },
    {
    "0": "Pregunta 1 con un texto largo",
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
    "2": "A",
    "3": "opt 1",
    "4": "opt 2",
    "5": "opt 3",
    "6": "opt 4"
    }
    ],
    "preguntasModal2": [ //Estas son las preguntas de acompletar conceptos
    {   //Estructura general (Como puede haber n conceptos, nombrar los atributos como números es buena idea)
    "0": "[Blank 1] el concepto  se relaciona con [Blank 2]", //Descripcion de la oración
    "1": "palabra 1",   //Concepto 1
    "2": "palabra 2"    //Concepto 2 ... Puede llegar a  n conceptos
    },
    {
    "0": "[Blank 1] el concepto  se relaciona con [Blank 2] en relacion con [Blank 3]",
    "1": "palabra 1",
    "2": "palabra 2",
    "3": "palabra 3"
    },
    {
    "0": "[Blank 1] el concepto  se relaciona con [Blank 2] en relacion con [Blank 3][Blank 4][Blank 5][Blank 6]",
    "1": "palabra 1",
    "2": "palabra 2",
    "3": "palabra 3",
    "4": "",
    "5": "",
    "6": "palabra 4"
    },
    {
    "0": "[Blank 1] el concepto  se relaciona con [Blank 2] en relacion con [Blank 3] y [Blank 4][Blank 5] y ademas con el termino de [Blank 6]",
    "1": "palabra 1",
    "2": "palabra 2",
    "3": "palabra 3",
    "4": "palabra 5",
    "5": "palabra 6",
    "6": "palabra 4"
    }
    ],
    "preguntasModal3": [ //Modal 3 es para las preguntas de problemas con código
    {
    "0": "problema 1 con texto corto", //Descripcion del problema
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png", //Imagen adicional (opcional)
    "2": "", //Link a algún video (opcional)
    //Codigo del problema abajo (opcional)
    "3": "public class Mi_Clase_1\n{\n    public static void main(String args[])\n    {\n        for(int i = 0; i <= 12; i++)\n        {\n            System.out.print(\"12 * \"+ i + \" = \" + 12 * i + \"\\n\");\n        }\n    }\n}",
    "4": "5"   //Output esperado (opcional)
    },
    {
    "0": "problema 2 con texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto corto",
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
    "2": "https://github.com/LuisEnriqueChavarriaVazquez/JCP_helper",
    "3": "import urllib2\nBUFFER_SIZE = 256*1024\nurl = 'http://downloads.sourceforge.net/project/pydev/pydev/PyDev%202.5.0/PyDev%202.5.0.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fpydev%2Ffiles%2F&ts=1338118912&use_mirror=nchc'\nres = urllib2.urlopen(url)\nwith open('PyDev.zip', 'wb') as f:\n\twhile True:\n\t\tchunk = res.read(BUFFER_SIZE)\n\t\tif(not chunk):\n\t\t\tbreak\t\t\n\t\tf.write(chunk)\n\t\tprint len(chunk)",
    "4": "hola mundo"
    },
    {
    "0": "problema 2 con texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto cortocon texto corto",
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
    "2": "",
    "3": "#include <stdio.h> /* Necesario para la funci\u00f3n printf() */\n\nint main(void) /* Funci\u00f3n principal del programa */\n{\n\tchar resultado; /* Variable de tipo car\u00e1cter donde se almacenar\u00e1 el resultado de las operaciones. */\n\n\tresultado=5+2; /*Realizamos una suma.*/\n\tprintf(\"Resultado de la suma: %i\\n\",resultado);\n\tresultado=5-2; /*Realizamos una resta.*/\n\tprintf(\"Resultado de la resta:%i\\n\",resultado);\n\tresultado=5*2; /*Realizamos una multiplicaci\u00f3n.*/\n\tprintf(\"Resultado de la multiplicaci\u00f3n: %i\\n\",resultado);\n\tresultado=5/2; /*Realizamos una divisi\u00f3n entera.*/\n\tprintf(\"Resultado de la divisi\u00f3n:%i\\n\",resultado);\n\t\n\treturn(0); /* Salimos del programa con el c\u00f3digo 0 porque no ha habido errores.\t*/\n\n}",
    "4": ""
    },
    {
    "0": "problema 2 con texto ",
    "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
    "2": "https://github.com/LuisEnriqueChavarriaVazquez/JCP_helper",
    "3": "#include <stdio.h> /* Necesario para la funci\u00f3n printf() */\n\nint main(void) /* Funci\u00f3n principal del programa */\n{\n\tchar resultado; /* Variable de tipo car\u00e1cter donde se almacenar\u00e1 el resultado de las operaciones. */\n\n\tresultado=5+2; /*Realizamos una suma.*/\n\tprintf(\"Resultado de la suma: %i\\n\",resultado);\n\tresultado=5-2; /*Realizamos una resta.*/\n\tprintf(\"Resultado de la resta:%i\\n\",resultado);\n\tresultado=5*2; /*Realizamos una multiplicaci\u00f3n.*/\n\tprintf(\"Resultado de la multiplicaci\u00f3n: %i\\n\",resultado);\n\tresultado=5/2; /*Realizamos una divisi\u00f3n entera.*/\n\tprintf(\"Resultado de la divisi\u00f3n:%i\\n\",resultado);\n\t\n\treturn(0); /* Salimos del programa con el c\u00f3digo 0 porque no ha habido errores.\t*/\n\n}",
    "4": ""
    }
    ],
    "preguntasModal4": [ //Estas son las preguntas de arrastrar
    {   //Aqui las palabras que se relacionan estan divididas por un asterisco
    //Tienen la estructura siguiente => palabra1*definicion1
    "0": "Relaciona los conceptos", //Descripcion del problema
    "1": "*" //Relacion de conceptos 
    },
    {
    "0": "Relaciona los conceptos",
    "1": "concepto 1*definicion 1", //Palabra y su concepto separado por *
    "2": "concepto 1 con texto mas largo que permite ver que es lo que ocurre*definicion 1 con texto mas largo que permite ver que es lo que ocurre",
    "3": "concepto 3*defincion 3",
    "4": "concepto 2*definicion 2",
    "5": "*"
    },
    {
    "0": "Relaciona los conceptos",
    "1": "concepto 1*definicion 1",
    "2": "concepto 1 con texto mas largo que permite ver que es lo que ocurre*definicion 1 con texto mas largo que permite ver que es lo que ocurre",
    "3": "concepto 3*defincion 3",
    "4": "concepto 2*definicion 2",
    "5": "concepto 2*"
    },
    {
    "0": "Relaciona los conceptos",
    "1": "concepto 1*definicion 1",
    "2": "concepto 1 con texto mas largo que permite ver que es lo que ocurre*definicion 1 con texto mas largo que permite ver que es lo que ocurre",
    "3": "concepto 3*defincion 3",
    "4": "concepto 2*definicion 2",
    "5": "concepto 2*",
    "6": "*definicion 2"
    },
    {
    "0": "Relaciona los conceptos",
    "1": "concepto 1*definicion 1",
    "2": "concepto 1 con texto mas largo que permite ver que es lo que ocurre*definicion 1 con texto mas largo que permite ver que es lo que ocurre",
    "3": "concepto 3*defincion 3",
    "4": "concepto 2*definicion 2",
    "5": "concepto 2*",
    "6": "*definicion 2",
    "7": "*",
    "8": "concepto 6*definicion 6"
    },
    {
    "0": "Relaciona los conceptos",
    "1": "concepto 1*definicion 1",
    "2": "concepto 1 con texto mas largo que permite ver que es lo que ocurre*definicion 1 con texto mas largo que permite ver que es lo que ocurre",
    "3": "concepto 3*defincion 3",
    "4": "concepto 2*definicion 2",
    "5": "concepto 2*",
    "6": "*definicion 2",
    "7": "*",
    "8": "concepto 6*definicion 6",
    "9": "*",
    "10": "*",
    "11": "final 1*final 2 con un texto m\u00e1s largo en esta parte"
    }
    ],
    "preguntasModal5": [ //Las modal 5 son aquellas con true y false
    {
        "0": "El concepto 1 es ...", //Aqui tenemos la descripcion del problema
        "1": "T" //La respuestas
    },
    {
        "0": "El concepto 2 es ...",
        "1": "f"
    },
    {
        "0": "El concepto 2 es ...",
        "1": "T"
    },
    {
        "0": "El concepto 4 es ...",
        "1": "T"
    },
    {
        "0": "El concepto 6 es ...",
        "1": "F"
    },
    {
        "0": "El concepto 6 es ... con un texto un poco m\u00e1s largo para poder ver que pasa en estos casos",
        "1": "F"
    }
    ],
    "preguntasModal6": [ //En modal 6 tenemos las preguntas abiertas
        {
            "0": "una pregunta pregunta abierto con texto corto", //Descripcion del problema
            "1": "", //Link a recurso externo
            "2": "" //Link a imagen adicional
        },
        {
            "0": "una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto",
            "1": "",
            "2": ""
        },
        {
            "0": "una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto",
            "1": "https://youtu.be/NLs3LqVgpT4",
            "2": ""
        },
        {
            "0": "una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto",
            "1": "https://youtu.be/NLs3LqVgpT4",
            "2": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png"
        },
        {
            "0": "una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto una pregunta pregunta abierto con texto corto",
            "1": "",
            "2": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png"
        },
        {
            "0": "una pregunta pregunta ao",
            "1": "",
            "2": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png"
        },
        {
            "0": "una pregunta pregunta ao",
            "1": "http://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release_0.png",
            "2": "https://youtu.be/NLs3LqVgpT4"
        }
    ]
}