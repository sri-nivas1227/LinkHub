from flask import Blueprint, jsonify, request
from bson import ObjectId
from models.Category import Category

# Create a Blueprint for Category endpoints
categoryRouter = Blueprint('category', __name__)

@categoryRouter.route('/categories', methods=['GET'])
def get_categories():
    user_id = request.args.get('user_id')
    categories = Category.get_name_id_by_user_id(user_id) if user_id else Category.get_all()
    return jsonify({
        "message": "List of categories",
        "data": categories
    }), 200

