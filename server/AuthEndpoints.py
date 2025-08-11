from flask import Request, Blueprint
from db import db
from bcrypt import hashpw, gensalt, checkpw
auth_router = Blueprint('auth', __name__)
userCollection = db.get_collection('users')

@auth_router.route('/signup', methods=['POST'])
def signup():
    # Handle signup logic here
    full_name = Request.json.get('full_name')
    email = Request.json.get('email')
    password = Request.json.get('password')

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
    email = Request.json.get('email')
    password = Request.json.get('password')

    user = userCollection.find_one({"email": email})

    if user and checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return {"message": "Login successful"}, 200
    return {"message": "Invalid email or password"}, 401
