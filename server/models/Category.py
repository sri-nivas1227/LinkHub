from datetime import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from db import db

CategoriesCollection = db['categories']


class Category:
    def __init__(self, category, category_slug, user_id, created_at=None, updated_at=None, _id=None):
        self._id = ObjectId(_id) if _id else None
        self.category = category
        self.category_slug = category_slug
        self.user_id = user_id
        self.created_at = created_at
        self.updated_at = updated_at
    
    def to_dict(self):
        """Convert Category object to dictionary"""
        doc = {
            "category": self.category,
            "category_slug": self.category_slug,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
        if self._id:
            doc["_id"] = self._id
        return doc
    
    def to_json(self):
        """Convert Category object to JSON-serializable dictionary"""
        return {
            "_id": str(self._id) if self._id else None,
            "category": self.category,
            "category_slug": self.category_slug,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

    def from_dict( data):
        """Create a Category object from a dictionary"""
        return Category(
            category=data.get("category"),
            category_slug=data.get("category_slug"),
            user_id=data.get("user_id"),
            created_at=data.get("created_at"),
            updated_at=data.get("updated_at"),
            _id=data.get("_id")
        )

    def create(self):
        """Create a new category"""
        try:
            self.created_at = datetime.utcnow()
            self.updated_at = self.created_at
            category_data = self.to_dict()
            result = CategoriesCollection.insert_one(category_data)
            self._id = result.inserted_id
            return self
        except PyMongoError as e:
            raise Exception(f"Error creating category: {str(e)}")
    
    @classmethod
    def get_all(cls):
        """Get all categories"""
        try:
            categories = CategoriesCollection.find()
            return [cls.from_dict(cat) for cat in categories]
        except PyMongoError as e:
            raise Exception(f"Error fetching categories: {str(e)}")
    
    @classmethod
    def get_by_id(cls, category_id):
        """Get a category by ID"""
        try:
            category = CategoriesCollection.find_one({"_id": ObjectId(category_id)})
            if category:
                return cls.from_dict(category)
            return None
        except PyMongoError as e:
            raise Exception(f"Error fetching category by ID: {str(e)}")
    
    @classmethod
    def get_by_slug(cls, category_slug):
        """Get a category by slug"""
        try:
            category = CategoriesCollection.find_one({"category_slug": category_slug})
            if category:
                return cls.from_dict(category)
            return None
        except PyMongoError as e:
            raise Exception(f"Error fetching category by slug: {str(e)}")