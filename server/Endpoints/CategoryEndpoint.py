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
    categories = Category.get_categories_by_user_id(user_id) if user_id else Category.get_all()
    return jsonify({
        "success": True,
        "message": "List of categories",
        "data": categories
    }), 200

@categoryRouter.route('/categories', methods=['PUT'])
def update_category():
    data = request.get_json()
    category_id = data.get('category_id')
    new_name = data.get('new_name')
    new_slug = data.get('new_slug')
    is_public = data.get('is_public')

    if not category_id or not new_name or not new_slug:
        return jsonify({
            "success": False,
            "message": "category_id, new_name and new_slug are required"
        }), 400
    
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
    
    category = Category.update_category(category_id, user_id, new_name, new_slug, is_public)
    if category:
        return jsonify({
            "success": True,
            "message": "Category updated successfully",
            "data": category.to_json()
        }), 200
    else:
        return jsonify({
            "success": False,
            "message": "Category not found or you don't have permission to update it"
        }), 404

