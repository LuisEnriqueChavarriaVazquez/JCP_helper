from flask import Flask, redirect, url_for, render_template,request,flash
from flask_mysqldb import MySQL
from routes import *


app=Flask(__name__)
app.register_blueprint(routes)
app.secret_key="jcp_helper"


@app.route('/')
def index():
    
    return render_template('index.html')



if __name__=='__main__':
    app.run(debug=True)