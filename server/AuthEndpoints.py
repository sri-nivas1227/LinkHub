@auth_router.route('/login', methods=['POST'])
def login():
    # Handle login logic here
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = userCollection.find_one({"email": email})

    if user and checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return {
            "message": "Login successful",
            "user_id": str(user['_id'])
        }, 200
    return {"message": "Invalid email or password"}, 401
