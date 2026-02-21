# LinkHub

> A personal bookmarking app to save, organize, and access links seamlessly across devices.

## 🚀 Tech Stack

**Frontend**: Next.js

**Backend**: Flask

**Database**: MongoDB

**Authentication**: JWT

## ✨ Features

📂 Create categories to organize your bookmarks

🔖 Save links with titles and tags for better context and easy retrieval

🤝 Share collections with friends to collaborate or recommend resources

### 🔮 Future Plans

- A Profile page
- Shareable collections
- A chrome extension to save links
- An app to easily access the links and also might send reminders to view those recently saved links

## 🛠️ Getting Started
**Prerequisites**

- Node.js & npm/yarn

- Python 3.x

- MongoDB

### Installation

**Clone the repository**:

- `git clone https://github.com/sri-nivas1227/LinkHub.git`
- `cd linkhub`


**Setup and run backend (Flask)**:

- `cd server`
- `python -m venv venv`
- `venv/Scripts/activate` or `source ./venv/bin/activate` (for linux or mac)
- `pip install -r requirements.txt`
- `python app.py`


**Setup and run frontend (Next.js)**:

- `cd app`
- `npm install`
- `npm run dev`


Visit the app at http://localhost:3000
### Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the `server` directory.

`MONGO_USERNAME`: Your MongoDB username
`MONGO_PASSWORD`: Your MongoDB password
`MONGO_CLUSTER_URL`: Your MongoDB cluster URL
`MONGO_DATABASE_NAME`: Your MongoDB database name
`JWT_SECRET`: Your secret for JWT
`ALLOWED_HOSTS`: The hosts that are allowed to make requests to the server
`FLASK_ENV`: The environment for the flask app. It can be either `development` or `production`

For production, you should use a `.env.production` file.
## � Deployment

This application can be easily deployed using Docker.

- `docker-compose up --build`

This will build the Docker images for the frontend and backend and run the containers.

## �📌 Roadmap

 - Malicious URL scanning

 - ML-powered search and recommendations

 - Mobile-friendly UI

- Browser extension for one-click saving

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a pull request.

### 📄 License

This project is licensed under the MIT License.
