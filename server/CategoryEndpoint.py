from flask import Blueprint, jsonify, request
from bson import ObjectId
from models.Category import Category
from helpers.utilities import validate_and_get_token_payload

# Create a Blueprint for Category endpoints
categoryRouter = Blueprint('category', __name__)

@categoryRouter.route('/categories', methods=['GET'])
def get_categories():
    # get token from cookies
    token = request.cookies.get('token')
    is_valid_token, payload = validate_and_get_token_payload(token) if token else False
    if is_valid_token:
        user_id = payload.get('user_id')
    else:
        return jsonify({
            "success": False,
            "message": "Invalid or missing token"
        }), 401
    print(f"User ID from token: {user_id}")
    categories = Category.get_categories_by_user_id(user_id) if user_id else Category.get_all()
    print(f"Categories fetched: {categories}")
    return jsonify({
        "success": True,
        "message": "List of categories",
        "data": categories
    }), 200

