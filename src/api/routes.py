"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from api.models import db, User
from api.utils import generate_sitemap, APIException
import bcrypt

api = Blueprint('api', __name__)

def encryp_pass(password):
    hash_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hash_pass.decode()

def compare_pass(password, hash_pass):
    return bcrypt.checkpw(password.encode('utf-8'), hash_pass.encode('utf-8'))

@api.route("/signup", methods=["POST"])
def register_user():
    body = request.get_json()
    hash_pass = encryp_pass(body['password'])
    new_user = User(email=body["email"], password=hash_pass, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    if new_user is None:
        return jsonify('Internal server error'), 500
    elif new_user == False:
        return jsonify('Bad Request'), 400
    else:
        return jsonify(new_user.serialize()), 201

@api.route("/login", methods=["POST"])
def login_user():
    body = request.get_json()

    if body['password'] is None:
        token = False

    if body['email'] is None:
        token = False

    user = db.session.query(User).filter(User.email == body['email']).first()
    if user is None:
        token = 'user not exist'

    validate_pass = compare_pass(body['password'], user.password)
    if validate_pass == False:
        token = 'pass not iqual'

    new_token = create_access_token(identity={'id': user.id})
    token = { 'token': new_token}

    if token == 'user not exist':
        return jsonify(token), 404
    elif token == 'pass not iqual':
        return jsonify('user or password incorrect'), 401
    elif token is None :
        return jsonify('Internal server error'), 500
    else:
        return jsonify(token), 200