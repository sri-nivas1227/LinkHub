from flask import request, Blueprint, make_response
from db import db
from bcrypt import hashpw, gensalt, checkpw
import jwt
from dotenv import load_dotenv
import os

load_dotenv()
auth_router = Blueprint('auth', __name__)
userCollection = db.get_collection('users')

@auth_router.route('/signup', methods=['POST'])
def signup():
    # Handle signup logic here
    print(request.get_json())
    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')

    user = {
        "full_name": full_name,
        "email": email,
        "password": hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')
    }

    userCollection.insert_one(user)
    return {"message": "User registered successfully"}, 201

@auth_router.route('/login', methods=['POST'])
def login():
    # Handle login logic here
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = userCollection.find_one({"email": email})

    if user and checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        jwt_secret = os.getenv("JWT_SECRET")
        jwt_token = jwt.encode({"user_id":str(user["_id"]), "full_name":user["full_name"]}, jwt_secret)
        # write jwt token to the cookies

        response = make_response({"message": "Login successful", "user_id": str(user['_id']), "token": jwt_token}, 200)
        # response.set_cookie('token', jwt_token)
        return response
    return {"message": "Invalid email or password"}, 401
