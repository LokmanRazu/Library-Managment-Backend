# Library Backend

This is the backend for a simple library management system, built with NestJS.

## Features

*   **User Authentication:** JWT-based authentication with login and registration.
*   **User Management:** CRUD operations for users.
*   **Book Management:** CRUD operations for books.
*   **File Uploads:** Supports book cover image uploads.
*   **API Documentation:** Swagger UI for easy API testing and exploration.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/libary-backend.git
    cd libary-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the App

1.  **Create a `.env` file** in the root directory and add the following environment variables (see the Environment Variables section).

2.  **Start the development server:**
    ```bash
    npm run start:dev
    ```
    The application will be running at `http://localhost:3000`.

## API Documentation

Once the application is running, you can access the Swagger API documentation at `http://localhost:3000/api`.

## Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

## Scripts

*   `npm run build`: Build the application for production.
*   `npm run format`: Format the code using Prettier.
*   `npm run start`: Start the application.
*   `npm run start:dev`: Start the application in development mode with watch.
*   `npm run start:prod`: Start the application in production mode.
*   `npm run lint`: Lint the code using ESLint.
*   `npm run test`: Run unit tests.
*   `npm run test:watch`: Run unit tests in watch mode.
*   `npm run test:cov`: Run unit tests with coverage.
*   `npm run test:e2e`: Run end-to-end tests.

## License

This project is licensed under the UNLICENSED License.