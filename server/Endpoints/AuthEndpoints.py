from flask import request, Blueprint, make_response
from bcrypt import hashpw, gensalt, checkpw
import jwt
from dotenv import load_dotenv
import os
from datetime import datetime
from helpers.utilities import validate_and_get_token_payload
from models.User import User
from models.OTP import OTP
from helpers.resend_emailer import send_onboarding_otp
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
    user_id = user.create()
    if user_id:
        # Trigger Verification Email with OTP
        email_verification_data = send_onboarding_otp(email,)
        otp_data = OTP.build_otp_object(otp=email_verification_data.get("otp"), user_id=user_id)
        otp_inserted_id = otp_data.create()
        return make_response(
            {"success": True, "message": "User registered and OTP sent successfully to the Email!", "otp_id":otp_inserted_id}, 201
        )

@auth_router.route("/auth/verify_otp", methods=["POST"])
def verify_OTP():
    data = request.get_json()
    user_OTP = data.get("otp")
    user_email = data.get("email")
    otp_id = data.get("otp_id")
    is_otp_verified = OTP.verify_otp(user_OTP, otp_id)

    if not is_otp_verified:
        return make_response(
            {
                "success": False,
                "message": "OTP not verified. Try again!",
            },
            400,
        )
    
    # update user with email verified
    verify_email_confirmation = User.verify_user_email(user_email)
    if verify_email_confirmation:
        user = User.get_by_email(user_email)
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
    else:
        return make_response(
            {
                "success": False,
                "message": "OTP not verified. Try again!"
            },400
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


@auth_router.route("/ping", methods=["GET"])
def ping():
    token = request.cookies.get("token")
    token = request.cookies.get('token')
    is_valid_token, payload = validate_and_get_token_payload(token) if token else False
    if is_valid_token:
        user_id = payload.get('user_id')
        user = User.get_by_id(user_id)
        if user:
            return make_response({"success":True, "message": f"pong, {user.full_name}"}, 200)
    return make_response({
            "success": False,
            "message": "Invalid or missing token"
        }, 401)
