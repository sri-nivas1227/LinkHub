from flask import Blueprint, request, jsonify, make_response
from helpers.utilities import (
    validate_and_get_token_payload
)
from db import users_collection
from bson import ObjectId
from models.User import User

profile_router = Blueprint("profile", __name__)


@profile_router.route("/profile", methods=["POST"])
def update_profile():
    token = request.cookies.get("token")
    is_valid_token, payload = validate_and_get_token_payload(token) if token else False
    if not is_valid_token:
        return make_response({"success": False, "message": "Invalid or missing token"}, 401)
    data = request.get_json()
    print("Received profile update data:", data)
    name  = data.get("name")
    description = data.get("description")
    profile_links = data.get("links")
    email = data.get("email")
    if not name or not description or not profile_links or not email:
        return make_response({"success": False, "message": "Missing required fields"}, 400)
    
    user_id = payload.get("user_id")
    user = User.get_by_id(user_id)
    if not user:
        return make_response({"success": False, "message": "User not found"}, 404)
    user.full_name = name
    user.email = email
    user.profile['description'] = description
    user.profile['links'] = profile_links
    user.update(user.to_dict())
    print("updating profile")
    return make_response({"success":True, "message":"Profile Updated Successfully"}, 200)


@profile_router.route("/profile", methods=["GET"])
def getProfile():
    token = request.cookies.get("token")
    is_valid_token, payload = validate_and_get_token_payload(token) if token else False
    if not is_valid_token:
        return make_response({"success": False, "message": "Invalid or missing token"}, 401)

    user_id = payload.get("user_id")
    user = User.get_by_id(user_id)
    if not user:
        return make_response({"success":False, "message":"User does not exist"}, 401)

    profile_data = user.profile if user.profile else {}
    
    response_data = {
        "name": user.full_name,
        "email": user.email,
        "description": profile_data.get("description", ""),
        "links": profile_data.get("links", []),
    }
    return make_response(
            {
                "success": True,
                "message":"Profile fetched successfully", 
                "data":{"profile": response_data}
            },200
        )
