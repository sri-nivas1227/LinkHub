from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from UrlEndpoint import urlRouter
from CategoryEndpoint import categoryRouter
from AuthEndpoints import auth_router
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.register_blueprint(auth_router)
app.register_blueprint(urlRouter)
app.register_blueprint(categoryRouter)

# Helper function to serialize MongoDB documents
def serialize_doc(doc):
    """Convert MongoDB document to JSON serializable format"""
    if doc:
        doc['_id'] = str(doc['_id'])
    return doc

# Routes
@app.get('/')
def home():
    """Home route"""
    return jsonify({
        "message": "Welcome to LinkHub API",
        "status": "running",
        "database": "connected" if mongo.db is not None else "disconnected"
    })


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Run the app
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f"Starting LinkHub server on port {port}")    
    app.run(host='0.0.0.0', port=port, debug=debug)