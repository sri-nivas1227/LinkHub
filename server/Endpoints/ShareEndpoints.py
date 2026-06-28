from flask import request, Blueprint, make_response
from models.Category import CategoriesCollection
from models.User import User
from models.Link import Link

share_router = Blueprint("share", __name__)

@share_router.route("/share/<username>/<slug>", methods=["GET"])
def get_public_collection(username: str, slug: str):
    search_query = request.args.get('search', '')

    user = User.get_by_username(username)
    if not user:
        return make_response({"success": False, "message": "User not found"}, 404)

    category = CategoriesCollection.find_one({
        "user_id": str(user._id),
        "category_slug": slug,
        "is_public": True
    })
    if not category:
        return make_response({"success": False, "message": "Collection not found or is not public"}, 404)

    category_id = str(category["_id"])

    if search_query:
        links = Link.find_by_searchTerm_in_category(search_query, category_id)
    else:
        links = Link.get_by_category(category_id=category_id)

    return make_response(
        {
            "success": True,
            "message": "Public collection links fetched successfully",
            "data": {
                "category": category.get("name"),
                "category_id": category_id,
                "links": clean_links_for_public_view(links)
            }
        },
        200
    )


def clean_links_for_public_view(links: list[Link]):
    return [
        {
            "title": link.title,
            "url": link.url,
            "created_at": link.created_at.isoformat(),
        }
        for link in links
    ]
