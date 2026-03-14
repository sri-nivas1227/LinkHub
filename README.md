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

## Project Outline

### User Stories

As a user, I can:

-   **Sign up** for a new account with my email and password.
-   **Log in** to my account to access my saved links.
-   **View all my saved links** on a central dashboard.
-   **Search** for specific links by title or tags.
-   **Filter** my links by category.
-   **Add a new link** by providing a URL, title, and selecting a category.
-   **Create a new category** while adding a link if it doesn't exist.
-   **Edit** the title, and category of an existing link.
-   **Delete** a link that I no longer need.
-   **Copy a link's URL** to my clipboard with a single click.
-   **View my profile** information, including my name, email, and a short bio.
-   **Edit my profile** to update my personal details and social links.

### Technical Overview

LinkHub is a full-stack web application built with a modern tech stack, designed for performance and scalability.

**Frontend:**

-   **Framework:** [Next.js](https://nextjs.org/) (React framework)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** Custom-built components with animations using [Framer Motion](https://www.framer.com/motion/).
-   **State Management:** React hooks (`useState`, `useEffect`) and server-side data fetching with Next.js Server Actions.
-   **User Experience:** The frontend is designed to be a responsive and intuitive single-page application (SPA). It provides instant feedback for user actions with optimistic UI updates and toast notifications for success or error messages.

**Backend:**

-   **Framework:** [Flask](https://flask.palletsprojects.com/) (Python micro-framework)
-   **Language:** [Python](https://www.python.org/)
-   **Database:** [MongoDB](https://www.mongodb.com/) (NoSQL database)
-   **API:** A RESTful API is exposed with clear and organized endpoints for authentication, links, categories, and user profiles.
-   **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/) are used for secure authentication and to protect the API endpoints.
-   **Data Models:** The backend uses clear data models for Users, Links, and Categories, which are stored in the MongoDB database.

**Deployment:**

-   **Containerization:** The entire application is containerized using [Docker](https://www.docker.com/) and can be easily deployed with a single `docker-compose up` command. This ensures a consistent and reproducible environment for both development and production.

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
