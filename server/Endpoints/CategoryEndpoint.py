from flask import Blueprint, jsonify, request
from bson import ObjectId
from models.Category import Category
import datetime
from helpers.utilities import validate_and_get_token_payload, convert_to_slug

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
    categories = Category.get_categories_by_user_id(user_id)
    return jsonify({
        "success": True,
        "message": "List of categories",
        "data": categories
    }), 200

@categoryRouter.route('/categories/<category_id>', methods=['PUT'])
def update_category(category_id):
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
    
    data = request.get_json()
    # category_id = data.get('category_id')
    new_name = data.get('name')
    # new_slug = data.get('new_slug')
    is_public = data.get('isPublic')
    print("Received data for update:", data)
    if not category_id and not new_name:
        return jsonify({
            "success": False,
            "message": "a name or is_public is required"
        }), 400
    
    category = Category.get_by_id(category_id=category_id, user_id=user_id)
    if new_name:
        new_slug = convert_to_slug(new_name)
        if category.category_slug != new_slug:
            category.category_slug= new_slug
            category.category = new_name
    if is_public is not None and category.is_public != is_public:
        print("Updating is_public from", category.is_public, "to", is_public)
        category.is_public = is_public
    category.update()
    print(type(category), category)
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

