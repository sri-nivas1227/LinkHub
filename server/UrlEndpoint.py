from flask import Blueprint, jsonify
from flask import request
from db import db

# Create a Blueprint for URL endpoints
urlRouter = Blueprint('url', __name__)
linksCollection = db.get_collection("links")
@urlRouter.route('/urls', methods=['GET'])
def get_urls():
    """Get all URLs"""
    all_links = linksCollection.find(projection={"user_id": False}).to_list()
    for link in all_links:
        link["_id"] = str(link["_id"])
    return jsonify({"message": "List of URLs", "data": all_links}), 200

@urlRouter.route('/urls/<url_id>', methods=['GET'])
def get_url(url_id):
    """Get a specific URL by ID"""
    url = linksCollection.find_one({"_id": url_id}, projection={"user_id": False})
    if url:
        return jsonify({"message": f"Details of URL {url_id}", "data": url}), 200
    return jsonify({"message": "URL not found"}), 404

@urlRouter.route('/urls', methods=['POST'])
def create_url():
    """Create a new URL"""
    print("add first link")
    data = request.get_json()
    # check if the url already exists in the database
    existingLink = linksCollection.count_documents(filter={"url":data.get("url")})
    if existingLink:
        return jsonify({"message": "URL already exists"}), 409
    result = linksCollection.insert_one(data)
    print(f"inserted link with this id: {result.inserted_id}")
    print(data)
    return jsonify({"message": "URL created", "_id": str(result.inserted_id)}), 201