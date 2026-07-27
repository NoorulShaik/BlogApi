# 📝 BlogSphere

A full-stack blogging platform built with **Spring Boot** and **React.js**. BlogSphere allows users to create accounts, write and manage blog posts, explore content, search for blogs, interact through comments, and manage their profiles.

The project is divided into two parts:

* **Backend:** RESTful API built with Spring Boot
* **Frontend:** Modern single-page application built with React.js

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based authorization
* Protected routes for authenticated users

### 📝 Blog Management

* Create, read, update, and delete blog posts
* Rich-text blog editor
* Upload images for blog posts
* Organize blogs using categories
* View blogs by user or category
* Search blogs by title
* Pagination and sorting

### 💬 Comment System

* Add comments to blog posts
* View comments associated with a blog
* Delete comments

### 👤 User Profiles

* View user profiles
* Update profile information
* Upload profile images
* View blogs written by a specific user

### 🎨 Frontend Experience

* Responsive user interface
* Infinite scrolling blog feed
* Category-based filtering
* Real-time blog search
* Toast notifications
* Custom error and 404 pages

---

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot 3
* Spring Data JPA
* Spring Security
* JWT
* MySQL / MariaDB
* Maven
* Swagger / OpenAPI

### Frontend

* React.js
* React Router
* Axios
* Bootstrap 5
* Reactstrap
* Font Awesome
* Jodit React Editor
* Formik
* Yup
* React Toastify
* React Infinite Scroll Component

---

## 📂 Project Structure

```text
BlogApi/
│
├── nrl-blog-api/                 # Spring Boot REST API
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── onneshon/
│   │       │           └── blog/
│   │       │               ├── controllers/
│   │       │               ├── entities/
│   │       │               ├── repositories/
│   │       │               ├── services/
│   │       │               ├── servicesImple/
│   │       │               ├── payloads/
│   │       │               ├── exceptions/
│   │       │               ├── helpers/
│   │       │               └── configs/
│   │       └── resources/
│   │
│   ├── onneshon.sql
│   ├── pom.xml
│   └── README.md
│
└── nrl-react/                    # React Frontend
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── utils/
    │   ├── App.js
    │   └── index.js
    │
    ├── package.json
    └── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Java 17 or higher
* Maven
* Node.js 16 or higher
* npm
* MySQL or MariaDB

---

# ⚙️ Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/NoorulShaik/BlogApi.git
cd BlogApi/nrl-blog-api
```

### 2. Configure the Database

Create a MySQL database:

```sql
CREATE DATABASE onneshon;
```

You can also import the provided SQL file:

```bash
mysql -u root -p onneshon < onneshon.sql
```

### 3. Configure Database Credentials

Update your Spring Boot database configuration with your credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/onneshon
spring.datasource.username=root
spring.datasource.password=your_password
```

### 4. Build the Backend

```bash
mvn clean install
```

### 5. Run the Backend

```bash
mvn spring-boot:run
```

The backend API will be available at:

```text
http://localhost:1234
```

---

# 💻 Frontend Setup

Open a new terminal:

```bash
cd BlogApi/nrl-react
```

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure the API URL

Update the backend API URL in the frontend configuration:

```javascript
export const BASE_URL = "http://localhost:1234";
```

### 3. Start the React Application

```bash
npm start
```

The frontend will be available at:

```text
http://localhost:3000
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/v1/auth/register` | Register a new user   |
| POST   | `/api/v1/auth/login`    | Login and receive JWT |

### Users

| Method | Endpoint             | Description    |
| ------ | -------------------- | -------------- |
| GET    | `/api/user/{userId}` | Get user by ID |
| GET    | `/api/users/`        | Get all users  |
| POST   | `/api/user/`         | Create a user  |
| PUT    | `/api/user/{userId}` | Update user    |
| DELETE | `/api/user/{userId}` | Delete user    |

### Blogs

| Method | Endpoint                              | Description           |
| ------ | ------------------------------------- | --------------------- |
| POST   | `/api/blog`                           | Create a blog         |
| GET    | `/api/blog/{blogId}`                  | Get a blog            |
| GET    | `/api/blogs`                          | Get all blogs         |
| PUT    | `/api/blog/{blogId}`                  | Update a blog         |
| DELETE | `/api/blog/{blogId}`                  | Delete a blog         |
| GET    | `/api/user/{userId}/blogs`            | Get blogs by user     |
| GET    | `/api/category/{catId}/blogs`         | Get blogs by category |
| GET    | `/api/blogs/results?search_query=...` | Search blogs          |

### Categories

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/category/`        | Create category    |
| GET    | `/api/category/all`     | Get all categories |
| GET    | `/api/category/{catId}` | Get category       |
| PUT    | `/api/category/{catId}` | Update category    |
| DELETE | `/api/category/{catId}` | Delete category    |

### Comments

| Method | Endpoint                     | Description       |
| ------ | ---------------------------- | ----------------- |
| POST   | `/api/blog/{blogId}/comment` | Add comment       |
| GET    | `/api/comment/blog/{blogId}` | Get blog comments |
| DELETE | `/api/comment/{commentId}`   | Delete comment    |

---

## 📖 API Documentation

Once the backend is running, API documentation can be accessed through Swagger:

```text
http://localhost:1234/swagger-ui/index.html
```

---

## 🗄️ Database Schema

The application uses a relational database with entities such as:

* Users
* Roles
* Blogs
* Categories
* Comments

The main relationships include:

```text
User ────────< Blog
User ────────< Comment
Category ────< Blog
Blog ────────< Comment
User >───────< Role
```

---

## 🔄 Application Flow

```text
┌──────────────┐
│    React     │
│   Frontend   │
└──────┬───────┘
       │
       │ REST API + JWT
       ▼
┌──────────────┐
│ Spring Boot  │
│   Backend    │
└──────┬───────┘
       │
       │ Spring Data JPA
       ▼
┌──────────────┐
│    MySQL     │
│   Database   │
└──────────────┘
```

---

## 🔒 Security

* JWT-based authentication
* Password encryption
* Role-based access control
* Protected API endpoints
* Input validation
* Centralized exception handling

---

## 🧪 Testing the API

A Postman collection is included in the backend project:

```text
Onneshon-blog-api.postman_collection.json
```

You can import this collection into Postman to test the available API endpoints.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add your feature"
```

5. Push to your branch

```bash
git push origin feature/your-feature
```

6. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Noorul Hussain Shaik**

* GitHub: [NoorulShaik](https://github.com/NoorulShaik)
* LeetCode: [NoorulShaik](https://leetcode.com/u/NoorulShaik/)

---

⭐ If you found this project useful, consider giving it a star!
