"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/', methods=['GET'])
def home():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/sign_up', methods=['POST'])
def sign_up():
    # Process the information coming from the client
    user_data = request.get_json()
    
    user_exists = User.query.filter_by(email=user_data["email"]).first()

    if user_exists:
        return jsonify({"message": "The user already exists in the database."}), 403
    
    # We create an instance without being recorded in the database
    user = User(email=user_data["email"], password=user_data["password"])

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
        return jsonify( {"message": "Wrong email or password"}), 401
    
    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user.serialize())
    return jsonify(access_token=access_token), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def get_private():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email, "password": user.password }), 200