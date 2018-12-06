import os
from flask import Flask
from flask_jwt import JWT
from auth.security import authenticate, identity

def create_app(config_filename):
    app = Flask(__name__)
    app.config .from_object('common.settings')
    
    from app import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app


if __name__ == "__main__":
    app = create_app("config")
    jwt = JWT(app, authenticate, identity)  # /auth
    if os.environ.get('FLASK_ENV') == 'production':
        app.run(host='0.0.0.0', port=5001, debug=False)
    else:
        app.run(host='0.0.0.0', port=5001, debug=True)
