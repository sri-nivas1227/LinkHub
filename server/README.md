# LinkHub Server

A Flask application with MongoDB integration for managing links and data.

## Setup

### Prerequisites

- Python 3.10+
- MongoDB

### Installation

1. Create Virtual Environment

```bash
python -m venv venv
./venv/Scripts/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set up environment variables:

   - Create `.env` file and update the MongoDB URI if needed
   - Default MongoDB Connection: `MONGO_URI=mongodb://localhost:27017/linkhub`
   - Allowed Host for CORS: `ALLOWED_HOSTS = ["http://localhost:3000"]`

4. Start MongoDB (if using local installation):

```bash
mongod
```

4. Run the Flask application:

```bash
flask run --debug
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check

## File Structure

```
server/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .env               # Environment variables
└── README.md          # This file
└── <name>Endpoint.py   # Endpoint files handling each route in their respective file
```
