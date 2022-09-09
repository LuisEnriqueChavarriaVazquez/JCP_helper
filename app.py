from flask import Flask
from flask import render_template
from routes import *

app=Flask(__name__)
app.register_blueprint(routes)
app.secret_key="jcp_helper"


@app.route('/')
def index():
    return render_template('bienvenida.html')

if __name__=='__main__':
    app.run(debug=True)