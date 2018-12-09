import os
from flask import Flask
from flask_jwt import JWT
from auth.security import authenticate, identity

def create_application(config_filename):
    application = Flask(__name__)
    application.config .from_object('common.settings')
    
    from app import api_bp
    application.register_blueprint(api_bp, url_prefix='/api')

    return application

application = create_application("config")

if __name__ == "__main__":
    jwt = JWT(application, authenticate, identity)  # /auth
    if os.environ.get('FLASK_ENV') == 'production':
        application.run(host='0.0.0.0', port=5001, debug=False)
    else:
        application.run(host='0.0.0.0', port=5001, debug=True)
