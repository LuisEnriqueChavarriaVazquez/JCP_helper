from flask import Flask, render_template
from routes import *
from flask_uploads import IMAGES, UploadSet, configure_uploads
import os

app=Flask(__name__)
app.register_blueprint(routes)
app.secret_key="jcp_helper"

photos = UploadSet("photos", IMAGES)
app.config["UPLOADED_PHOTOS_DEST"] = "static/images"
app.config["SECRET_KEY"] = os.urandom(24)
configure_uploads(app, photos)




#La pagina de homePage es el inicio del todo el sistema para los usuarios.
@app.route('/')
def index():
    return render_template('homePage.html')

if __name__=='__main__':
    app.run(debug=True)