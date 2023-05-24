````
# TypeScript Node Express REST API

I have put together this basic TypeScript Node.js Express REST API project with JWT cookie authentication middleware and basic error handling middleware to get me started on projects with
this requirement faster, feel free to use this code in your own project - Brock Phillis.

## Getting Started

To start the project, follow these steps:

1. Clone the repository:

```bash
git clone <repository-url>
````

2. Navigate to the project directory:

```bash
cd <project-directory>
```

3. Create a `.env` file in the root directory with the following variables:

```
JWT_SECRET=<your-jwt-secret>
PORT=<port-number>
```

Replace `<your-jwt-secret>` with your own JWT secret key and `<port-number>` with the desired port number for the server.

4. Install the dependencies:

```bash
npm install
```

5. Build the project:

```bash
npx tsc
```

6. Start the server:

```bash
node build/index.js or nodemon
```

The server will start running on the specified port.

## Features

- JSON-based REST API endpoints
- JWT cookie authentication middleware for protecting routes
- Basic error handling middleware for handling server errors

## API Routes

The API provides the following basic routes:

- `/login` - User login route to authenticate and generate a JWT token.
- `/blogs` - Protected route that requires JWT authentication to access.

You can modify and extend the API routes as per your requirements in the respective route files.

## Dependencies

The project uses the following main dependencies:

- Express.js - Fast and minimalist web framework for Node.js
- jsonwebtoken - JWT token generation, signing, and verification
- cookie-parser - Parse cookies in Express middleware

For the complete list of dependencies, please refer to the `package.json` file.

```

```
