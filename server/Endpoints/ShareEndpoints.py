from flask import request, Blueprint, make_response
from db import categories_collection, links_collection
from bson import ObjectId


share_router = Blueprint("share", __name__)

@share_router.route("/share/categories/<category_id>", methods=["GET"])
def get_public_view_category(category_id):
    category = categories_collection.find_one({"_id": ObjectId(category_id), "is_public": True})
    if not category:
        return make_response({"success": False, "message": "Category not found"}, 404)
    # Get links under this category
    links = list(links_collection.find({"category_id": category_id}))
    links = clean_links_for_public_view(links)
    # category["links"] = links
    # Convert ObjectId to string for JSON serialization
    category["_id"] = str(category["_id"])
    print(f"Fetched category: {category}, with links: {links}")
    return make_response(
        {"success": True, 
         "message":"Public Category links fetched successfully",
        "data": {"category":category.get("category"), "category_id":category_id, "links":links}
        },
        200)


def clean_links_for_public_view(links):
    cleaned_links = []
    for link in links:
        cleaned_link = {
            "title": link["title"],
            "url": link["url"],
            "description": link.get("description", ""),
            "created_at": link["created_at"].isoformat(),
        }
        cleaned_links.append(cleaned_link)
    return cleaned_links