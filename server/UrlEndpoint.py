from flask import Blueprint, jsonify, request
from bson import ObjectId
from models.Link import Link

# Create a Blueprint for URL endpoints
urlRouter = Blueprint('url', __name__)

@urlRouter.route('/urls', methods=['GET'])
def get_urls():
    """Get all URLs"""
    try:
        all_links = Link.get_all()
        # Convert to JSON-serializable format, excluding user_id for privacy
        links_data = []
        for link in all_links:
            link_json = link.to_json()
            # Remove user_id for privacy
            if 'user_id' in link_json:
                del link_json['user_id']
            links_data.append(link_json)
        
        return jsonify({"message": "List of URLs", "data": links_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@urlRouter.route('/urls/<url_id>', methods=['GET'])
def get_url(url_id):
    """Get a specific URL by ID"""
    try:
        link = Link.get_by_id(url_id)
        if link:
            link_json = link.to_json()
            # Remove user_id for privacy
            if 'user_id' in link_json:
                del link_json['user_id']
            return jsonify({"message": f"Details of URL {url_id}", "data": link_json}), 200
        return jsonify({"message": "URL not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@urlRouter.route('/urls', methods=['POST'])
def create_url():
    """Create a new URL"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not data.get('url'):
            return jsonify({"message": "URL is required"}), 400
        
        # Check if the URL already exists
        from db import db
        existing_link = db['links'].find_one({"url": data.get("url")})
        if existing_link:
            return jsonify({"message": "URL already exists"}), 409
        
        # Create new Link object
        link = Link(
            url=data.get('url'),
            title=data.get('title', ''),
            description=data.get('description', ''),
            tags=data.get('tags', []),
            category_id=data.get('category_id'),
            user_id=data.get('user_id')
        )
        
        # Save to database
        link_id = link.create()
        
        return jsonify({
            "message": "URL created successfully", 
            "_id": link_id,
            "data": link.to_json()
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@urlRouter.route('/urls/<url_id>', methods=['PUT'])
def update_url(url_id):
    """Update a specific URL by ID"""
    try:
        link = Link.get_by_id(url_id)
        if not link:
            return jsonify({"message": "URL not found"}), 404
        
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400
        
        # Update the link
        success = link.update(data)
        if success:
            return jsonify({
                "message": "URL updated successfully",
                "data": link.to_json()
            }), 200
        else:
            return jsonify({"message": "Update failed"}), 400
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@urlRouter.route('/urls/<url_id>', methods=['DELETE'])
def delete_url(url_id):
    """Delete a specific URL by ID"""
    try:
        link = Link.get_by_id(url_id)
        if not link:
            return jsonify({"message": "URL not found"}), 404
        
        success = link.delete()
        if success:
            return jsonify({"message": "URL deleted successfully"}), 200
        else:
            return jsonify({"message": "Delete failed"}), 400
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@urlRouter.route('/urls/user/<user_id>', methods=['GET'])
def get_urls_by_user(user_id):
    """Get all URLs for a specific user"""
    try:
        links = Link.get_by_user_id(user_id)
        links_data = [link.to_json() for link in links]
        return jsonify({
            "message": f"URLs for user {user_id}",
            "data": links_data
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@urlRouter.route('/urls/category/<category_id>', methods=['GET'])
def get_urls_by_category(category_id):
    """Get all URLs for a specific category"""
    try:
        links = Link.get_by_category(category_id)
        # Remove user_id for privacy
        links_data = []
        for link in links:
            link_json = link.to_json()
            if 'user_id' in link_json:
                del link_json['user_id']
            links_data.append(link_json)
        
        return jsonify({
            "message": f"URLs for category {category_id}",
            "data": links_data
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@urlRouter.route('/urls/search', methods=['GET'])
def search_urls_by_tags():
    """Search URLs by tags"""
    try:
        tags = request.args.get('tags')
        if not tags:
            return jsonify({"message": "Tags parameter is required"}), 400
        
        # Convert comma-separated tags to list
        tags_list = [tag.strip() for tag in tags.split(',')]
        
        links = Link.search_by_tags(tags_list)
        # Remove user_id for privacy
        links_data = []
        for link in links:
            link_json = link.to_json()
            if 'user_id' in link_json:
                del link_json['user_id']
            links_data.append(link_json)
        
        return jsonify({
            "message": f"URLs matching tags: {tags}",
            "data": links_data
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500