# Task Management Backend

This is the backend for the **Task Management Website**, providing API endpoints for user authentication and task management.

## Features

- **User Authentication**:
  - Register and log in securely with JWT-based authentication.
- **Task Management**:
  - Create, update, delete, and fetch tasks.
  - Tasks are categorized into statuses: Pending, Ongoing, and Completed.
- **CORS Support**:
  - Allows requests from the specified frontend origin.

## Technology Stack

- **Framework**: Node.js with Express
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **Environment Management**: dotenv

## Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud-hosted)

### Clone the Repository

```bash
git clone https://github.com/your-backend-repository-url.git
cd your-backend-repository
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and configure it with the following values:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
ALLOWED_ORIGIN=https://assessment-frontend-eta.vercel.app
```

### Run the Server

```bash
npm run dev
```

The backend server will be available at `http://localhost:3000`.

## API Documentation

### Authentication Endpoints

#### **Register User**

- **POST** `/api/v1/auth/register`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt-token"
  }
  ```

#### **Login User**

- **POST** `/api/v1/auth/login`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt-token"
  }
  ```

### Task Endpoints

#### **Get All Tasks**

- **GET** `/api/v1/tasks`
- **Headers**:
  - Authorization: `Bearer jwt-token`
- **Response**:
  ```json
  [
    {
      "_id": "task-id",
      "name": "Task Name",
      "description": "Task Description",
      "status": "Pending"
    }
  ]
  ```

#### **Create a Task**

- **POST** `/api/v1/tasks`
- **Headers**:
  - Authorization: `Bearer jwt-token`
- **Body**:
  ```json
  {
    "name": "New Task",
    "description": "Task Description",
    "status": "Pending"
  }
  ```
- **Response**:
  ```json
  {
    "task": {
      "_id": "task-id",
      "name": "New Task",
      "description": "Task Description",
      "status": "Pending"
    }
  }
  ```

#### **Update Task Status**

- **PATCH** `/api/v1/tasks/:id`
- **Headers**:
  - Authorization: `Bearer jwt-token`
- **Params**:
  ```
  {
    "status": "Ongoing"
  }
  ```
- **Response**:
  ```json
  {
    "task": {
      "_id": "task-id",
      "name": "Task Name",
      "description": "Task Description",
      "status": "Ongoing"
    }
  }
  ```

#### **Delete a Task**

- **DELETE** `/api/v1/tasks/:id`
- **Headers**:
  - Authorization: `Bearer jwt-token`
- **Params**
  ```
  {
  	"id": "task-id"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## CORS Configuration

The backend uses the `cors` package to handle Cross-Origin Resource Sharing. The allowed origin is defined in the `.env` file:

```env
ALLOWED_ORIGIN=https://assessment-frontend-eta.vercel.app
```

This ensures only requests from the specified frontend origin are permitted.
