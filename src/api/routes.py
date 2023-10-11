"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/sign_up', methods=['POST'])
def sign_up():
    # Process the information coming from the client
    user_data = request.get_json()
    
    # We create an instance without being recorded in the database
    user = User()
    user.email = user_data["email"]
    user.password = user_data["password"]
    user.is_active = True

    # We tell the database we want to record this user
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "The user has been created successfully"}), 200

@api.route('/token', methods=['POST'])
def create_token():

    user_data = request.get_json()

    # We create an instance without being recorded in the database
    user = User.query.filter_by(email=user_data["email"]).first()

    if not user or not user.check_password(user_data["password"]):
        return jsonify( {"message": "Wrong username or password"}), 401
    
    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user.serialize())
    return jsonify(access_token=access_token), 200