import re
import jwt
from dotenv import load_dotenv
import os
from db import db
userCollection = db.get_collection('users')
from bson import ObjectId
load_dotenv()
def convert_to_slug(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]+', '', text)
    return text

def validate_and_get_token_payload(token: str) -> bool:
    jwt_secret = os.getenv("JWT_SECRET")
    try:
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])  
        print(f"Decoded JWT payload: {payload}")
        user = userCollection.find_one({"_id": ObjectId(payload["user_id"])})
        print(f"User found in DB: {user}")
        if not user:
            return False, None
        return True, payload
    except jwt.ExpiredSignatureError:
        return False, None
    except jwt.InvalidTokenError:
        return False, None

