# Express.js + MongoDB Authentication API

## Description
A simple authentication system using Express.js, MongoDB, and JWT authentication.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT token
- `GET /api/auth/search` - Search user (requires JWT token)

## Testing with Postman
1. Register a user.
2. Login to get a token.
3. Use the token in the `Authorization` header to search for a user.

## License
MIT
