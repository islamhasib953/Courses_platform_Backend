# Course Management System

## Project Overview
The Course Management System is a comprehensive platform designed to manage courses, lessons, and user progress. Built using Node.js and MongoDB, the system includes robust features such as user authentication, course creation, lesson management, and progress tracking.

## Features
- User authentication and authorization (Admin, Instructor, Student roles).
- Create, update, and delete courses and lessons.
- Track user progress for each lesson.
- Secure endpoints with token-based authentication.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: Database for storing application data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT (jsonwebtoken)**: For secure user authentication.
- **bcryptjs**: For hashing and verifying passwords.
- **Multer**: For handling file uploads.
- **express-validator**: For validating incoming requests.
- **dotenv**: For managing environment variables.
- **cors**: For enabling cross-origin requests.
- **validator**: For additional data validation utilities.

## Installation and Usage

### Prerequisites
- Node.js (v20.x or higher)
- MongoDB Atlas or a local MongoDB instance

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

4. Start the server:
   ```bash
   npm start
   ```
   Use `npm run dev` to start in development mode with nodemon.

5. Access the application:
   - The server runs on `http://localhost:5000` by default.

## Endpoints

### User Endpoints
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Authenticate a user and return a token.
- `GET /api/users/`: Fetch the all users

### Course Endpoints
- `GET /api/courses`: Retrieve all courses.
- `POST /api/courses`: Create a new course (Admin or Instructor only).
- `GET /api/courses/:id`: get a single course
- `PATCH /api/courses/:id`: Update a course (Admin or Instructor only).
- `DELETE /api/courses/:id`: Delete a course (Admin or Instructor only).

### Lesson Endpoints
- `GET /api/courselessons/:id/lessons`: Fetch all lessons for a specific course.
- `POST /api/courselessons/:id/lessons`: Add a new lesson to a course (Admin or Instructor only).
- `GET /api/lessons/:lessonId`: get Lesson Details
- `PATCH /api/lessons/:lessonId`: Update a lesson (Admin or Instructor only).
- `DELETE /api/lessons/:lessonId`: Delete a lesson (Admin or Instructor only).


### Progress Endpoints
- `GET /api/progress`: get user progress for a lessons of a course.
- `POST /api/progress`: update user progress for a lessons of a course.
- `GET /api/progress/:lesson_id`: get progress for a specific lesson.
- `DELETE /api/progress/:lesson_id`: Delete progress for a specific lesson.
- `PATCH /api/progress/:lesson_id/complete`: Mark a specific lesson as completed

## Lessons Learned
- Using `mongoose` efficiently for schema design and database operations.
- Structuring a Node.js project for scalability and maintainability.
- Managing user roles and permissions effectively.
- Handling file uploads securely with Multer.
- Enhancing API validation using `express-validator`.

## Future Improvements
- Add a front-end interface using React or Angular.
- Implement more advanced analytics for user progress.
- Enhance error handling and logging.
- Add support for multiple languages.

## License
This project is open-source and available under the [MIT License](LICENSE).

---
Feel free to contribute or raise issues in the repository!

