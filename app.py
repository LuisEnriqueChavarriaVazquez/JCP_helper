from flask import Flask, render_template
from routes import *

app=Flask(__name__)
app.register_blueprint(routes)
app.secret_key="jcp_helper"


#La pagina de homePage es el inicio del todo el sistema para los usuarios.
@app.route('/')
def index():
    return render_template('homePage.html')

if __name__=='__main__':
    app.run(debug=True)