from flask import redirect, request, Blueprint, make_response
from db import db
from bcrypt import hashpw, gensalt, checkpw
import jwt
from dotenv import load_dotenv
import os
from datetime import datetime
load_dotenv()
auth_router = Blueprint('auth', __name__)
userCollection = db.get_collection('users')

@auth_router.route('/signup', methods=['POST'])
def signup():
    # Handle signup logic here
    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')
    # Check if user already exists
    existing_user = userCollection.find_one({"email": email})
    if existing_user:
        return {"success":False,"message": "User already exists"}, 400
    user = {
        "full_name": full_name,
        "email": email,
        "password": hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')
    }

    userCollection.insert_one(user)
    return {"success":True,"message": "User registered successfully"}, 201

@auth_router.route('/login', methods=['POST'])
def login():
    # Handle login logic here
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = userCollection.find_one({"email": email})
    if not user:
        return {"success":False,"message": "User not found", "data":{"redirect": "/auth/signup"}}, 401
    if user and checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        jwt_secret = os.getenv("JWT_SECRET")
        jwt_token = jwt.encode({"user_id":str(user["_id"]), "name":user["full_name"], "datetime":str(datetime.now())}, jwt_secret, algorithm="HS256")
        # write jwt token to the cookies

        response = make_response({"success":True, "message": "Login successful",  "data":{"token": jwt_token}}, 200)
        return response
    return {"success":False,"message": "Invalid email or password"}, 401
