from flask_jwt_extended import create_access_token, jwt_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint, request, make_response, Response
from marshmallow import ValidationError
import sqlalchemy.exc as sql_exception

from api.auth import user_api_authorize
from database.schemas import *
from api.schemas import UserCreation, UserInfo
from api.errors import BAD_REQUEST, NOT_AUTHORIZED, OK
import database.crud as db


user_api = Blueprint('user', 'user_api')


@user_api.route('/user', methods=['POST'])
def create_user():
    request_json = request.get_json()

    try:
        # Validate input.
        new_user = UserCreation().load(request_json)
        # Create a new DB record.
        user_record: UserSchema = db.create_user(
            username=new_user.get('username'),
            password=new_user.get('password'),
            first_name=new_user.get('first_name'),
            last_name=new_user.get('last_name'),
            email=new_user.get('email'),
            phone=new_user.get('phone'),
            drive_license=new_user.get('drive_license')
        )
    except (ValidationError, sql_exception.IntegrityError) as e:
        response = {
            "code": BAD_REQUEST,
            "message": f"Server crashed with following error: {e}"
        }
        return make_response(response, BAD_REQUEST)
    return make_response({"userId": user_record.user_id}, OK)


@user_api.route('/login', methods=['POST'])
def login_user():
    username = request.json['username']
    password = request.json['password']

    # Check if such user exists. If so, generate JWT token and send it back to user.
    user: UserSchema = db.get_user(query_id=username, by=UserSchema.username)
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.username)
        return make_response({"AccessToken": access_token}, OK)
    else:
        response = {
                "code": NOT_AUTHORIZED,
                "message": "Invalid login or password."
        }
        return make_response(response, BAD_REQUEST)


@user_api.route("/logout", methods=['DELETE'])
@jwt_required()
@user_api_authorize
def logout():
    return make_response({"msg": "Successfully logged out"}, OK)


@user_api.route("/me", methods=["GET"])
@jwt_required()
@user_api_authorize
def get_user() -> Response:

    user_record: UserSchema = current_user
    if not user_record:
        response = {
            "code": BAD_REQUEST,
            "message": "There is no such id in database"
        }
        return make_response(response, BAD_REQUEST)
    return make_response(UserInfo().dump(user_record), OK)


@user_api.route("/<user_id>", methods=["PUT"])
@jwt_required()
@user_api_authorize
def update_user(user_id) -> Response:
    request_json = request.get_json()

    user_record: UserSchema = db.get_user(user_id)
    if not user_record:
        response = {
            "code": BAD_REQUEST,
            "message": "There is no such user"
        }
        return make_response(response, BAD_REQUEST)

    try:
        user = request_json
        # Update database record.
        user_id = db.update_user(
            user_id=user_id,
            username=user.get('username'),
            first_name=user.get('name'),
            last_name=user.get('surname'),
            email=user.get('email'),
            password=user.get('password') and generate_password_hash(user.get('password')),
            phone=user.get('phone'),
            drive_license=user.get('drive_license')
        )
    except sql_exception.IntegrityError as e:
        response = {
            "code": BAD_REQUEST,
            "message": f"Server crashed with the following error: {str(e)}"
        }
        return make_response(response, BAD_REQUEST)
    return make_response({"userId": user_id}, OK)

@user_api.route("/deleteMe", methods=["DELETE"])
@jwt_required()
@user_api_authorize
def delete_user() -> Response:
    user_id: UserSchema = current_user.user_id

    if not user_id:
        response = {
            "code": BAD_REQUEST,
            "message": "There is no such user"
        }
        return make_response(response, BAD_REQUEST)

    user_id = db.delete_user(user_id)
    return make_response({"userId": user_id}, OK)

# @user_api.route("/<user_id>", methods=["DELETE"])
# @jwt_required()
# @user_api_authorize
# def delete_user(user_id) -> Response:
#     user_record: UserSchema = db.get_user(user_id)
#     if not user_record:
#         response = {
#             "code": BAD_REQUEST,
#             "message": "There is no such user"
#         }
#         return make_response(response, BAD_REQUEST)
#
#     user_id = db.delete_user(user_id)
#     return make_response({"userId": user_id}, OK)
