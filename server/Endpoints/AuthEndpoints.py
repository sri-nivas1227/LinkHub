from flask import request, Blueprint, make_response
from bcrypt import hashpw, gensalt, checkpw
import jwt
from dotenv import load_dotenv
import os
from datetime import datetime
from models.User import User

load_dotenv()
auth_router = Blueprint("auth", __name__)


@auth_router.route("/signup", methods=["POST"])
def signup():
    # Handle signup logic here
    data = request.get_json()
    full_name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    # Check if user already exists
    existing_user = User.get_by_email(email)
    if existing_user:
        return make_response({"success": False, "message": "User already exists"}, 400)
    if not full_name or not email or not password:
        return make_response(
            {"success": False, "message": "All fields are required"}, 400
        )
    user = User(
        email=email,
        full_name=full_name,
        password=hashpw(password.encode("utf-8"), gensalt()).decode("utf-8"),
    )
    print(user, "user data to db")
    user_id = user.create()
    if user_id:
        return make_response(
            {"success": True, "message": "User registered successfully"}, 201
        )


@auth_router.route("/login", methods=["POST"])
def login():
    # Handle login logic here
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.get_by_email(email)
    if not user:
        return make_response(
            {
                "success": False,
                "message": "User not found",
                "data": {"redirect": "/auth/signup"},
            },
            401,
        )
    if not user or not checkpw(
        password.encode("utf-8"), user.password.encode("utf-8")
    ):
        return make_response(
            {"success": False, "message": "Invalid email or password"}, 401
        )
    jwt_secret = os.getenv("JWT_SECRET")
    jwt_token = jwt.encode(
        {
            "user_id": str(user._id),
            "name": user.full_name,
            "datetime": str(datetime.now()),
        },
        jwt_secret,
        algorithm="HS256",
    )
    # write jwt token to the cookies

    return make_response(
        {
            "success": True,
            "message": "Login successful",
            "data": {"token": jwt_token},
        },
        200,
    )
