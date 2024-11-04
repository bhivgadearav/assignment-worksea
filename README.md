# Asset Management API

This API provides functionalities to upload, list, and delete assets. It also includes caching to improve performance.

## Features
- **Upload Assets**: Upload a file and store its metadata.
- **Retrieve Assets**: Get a list of all uploaded assets.
- **Delete Assets**: Remove a specific asset by ID.
- **Caching**: Cache the assets list to improve performance.

## Requirements
- Node.js (v14 or higher)
- Redis (for caching)
- SQLite (or Prisma with SQLite setup)

## Setup

1. **Clone the Repository**:
   `git clone <your-repository-url>`
   `cd asset-management-api`

2. **Install Dependencies**:
   `npm install`

3. **Set Up Redis**:
   Make sure Redis is installed and running on your machine. If Redis is not installed, download it from [Redis Download](https://redis.io/download) and start the server.

4. **Database Setup**:
   This project uses Prisma with SQLite. Initialize the database:
   `npx prisma migrate dev --name init`

5. **Run the Server**:
   Start the server with any of the following commands:
   `npm start`
   `npm run dev`

   The server should now be running on `http://localhost:3000`.

## Usage

### API Endpoints

1. **Upload an Asset**
   - **POST** `/api/upload`
   - Uploads a file and stores its metadata (filename, size, upload date) in the database.
   - **Please send requests like shown below.**
   - <img src="post.png" alt="instruction" width="650"/>

2. **Retrieve All Assets**
   - **GET** `/api/assets`
   - Retrieves a list of all uploaded assets with their metadata. This endpoint uses Redis for caching.
   - **Please send requests like shown below.**
   - <img src="get.png" alt="instruction" width="650"/>

3. **Delete an Asset**
   - **DELETE** `/api/asset/{id}`
   - Deletes a specific asset by its ID.
   - **Please send requests like shown below.**
   - <img src="delete.png" alt="instruction" width="650"/>

## Testing

To run the tests for this project, use the following command:

`npm test`

## Additional Notes

- **Clearing the Cache**: The cache for `/api/assets` is automatically set to expire every 5 minutes. You can adjust this in the Redis client configuration.
- **Error Handling**: Basic error handling is implemented for missing files, invalid IDs, and database errors.
- **File Storage**: Additionally the files sent are stored in src/uploads folder.

## Dependencies

- **Express**: Web framework for Node.js.
- **Prisma**: ORM for database access with SQLite.
- **Redis**: In-memory caching for improved response times.
- **Jest**: Testing framework for API endpoints.
- **Supertest**: HTTP assertions for testing API endpoints.
