# LinkHub Server

A Flask application with MongoDB integration for managing links and data.

## Setup

### Prerequisites

- Python 3.7+
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Set up environment variables:

   - Copy `.env` file and update the MongoDB URI if needed
   - Default MongoDB URI: `mongodb://localhost:27017/linkhub`

3. Start MongoDB (if using local installation):

```bash
mongod
```

4. Run the Flask application:

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check

- **GET** `/health` - Check server and database status

### Home

- **GET** `/` - Welcome message and status

### Test MongoDB

- **GET** `/api/test` - Test MongoDB connection with a sample operation

## Environment Variables

- `FLASK_ENV`: Set to `development` for debug mode
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string

## MongoDB Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use default URI: `mongodb://localhost:27017/linkhub`

### MongoDB Atlas (Cloud)

1. Create a free account at MongoDB Atlas
2. Create a cluster
3. Get the connection string
4. Update `MONGO_URI` in `.env` file

## Development

The app includes:

- Flask with PyMongo for MongoDB integration
- Environment variable support with python-dotenv
- Error handling
- Health check endpoint
- Test endpoint for MongoDB operations

## File Structure

```
server/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .env               # Environment variables
└── README.md          # This file
```
