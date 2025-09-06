# TaskFlow-AI: Your AI-Powered To-Do Manager

**TaskFlow-AI** is a full-stack web application for efficient task and project management. Built as a technical test submission, this app helps users organize their workflow with an integrated AI assistant.

---

## ✨ Features

* **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).  
* **Project & Task Management**: Create and manage projects and add tasks with details like status, priority, and due date.  
* **AI Chatbot**: An intelligent assistant powered by the **Google Gemini API** to help with task-related queries.  

---

## 📸 Screenshots

To get a quick overview of the application, here are some screenshots of the key features:




<img width="1918" height="1012" alt="Image" src="https://github.com/user-attachments/assets/859bcbf9-a845-4fef-952c-ff0ca9e3362f" />

<img width="1917" height="1078" alt="Image" src="https://github.com/user-attachments/assets/0341ac13-feee-43d7-9be7-222cd3831857" />

<img width="1918" height="1078" alt="Image" src="https://github.com/user-attachments/assets/43f9e063-33ef-4e51-85a3-3e29c53fc5e9" />

<img width="1918" height="1078" alt="Image" src="https://github.com/user-attachments/assets/276fe7c5-5a53-453b-a559-5c391868234d" />

<img width="1918" height="1078" alt="Image" src="https://github.com/user-attachments/assets/636bd430-6530-414d-b440-ca69122ded93" />

<img width="1918" height="1078" alt="Image" src="https://github.com/user-attachments/assets/807247db-d0b6-41c3-bf31-7e3a142102eb" />



<img width="1918" height="1078" alt="Image" src="https://github.com/user-attachments/assets/956f7456-a307-4371-bf49-13c037915f2f" />

<img width="1918" height="1078" alt="Image" src="https://github.com/user-attachments/assets/b15ada5f-32d0-4c9e-bb8e-f42ff24fc8a8" />

<img width="1637" height="957" alt="Image" src="https://github.com/user-attachments/assets/b4074b2b-41d5-412e-8934-c6754643bce2" />

<img width="1642" height="952" alt="Image" src="https://github.com/user-attachments/assets/0603cd14-3b8e-4a7c-b889-fdb35ad1b1e2" />

<img width="1637" height="957" alt="Image" src="https://github.com/user-attachments/assets/62355e91-08c3-495c-be82-2255d65a5542" />

---

## 🚀 Technologies Used

| Category   | Technology                                           |
| ---------- | --------------------------------------------------- |
| **Frontend** | React, Tailwind CSS, Framer Motion, Axios, React Router       |
| **Backend**  | Node.js, Express.js, JWT, MySQL, Google Gemini API, bcrypt, cors |
| **Development**  | Nodemon, Concurrently, dotenv |

---
## 🤖 AI Integration
**The application integrates with Google's Gemini API to provide an intelligent chatbot that can:**

-Answer questions about your tasks and projects

-Provide productivity tips and suggestions

-Help with task prioritization based on due dates and priority levels

-Suggest time management strategies

-Explain productivity concepts

**To use this feature, you'll need to:**

-Obtain a Gemini API key from Google AI Studio

-Add it to your backend .env file as GEMINI_API_KEY=your_key_here

-The chatbot will then be available in the application interface

##  🎨 UI/UX Features

**Responsive Design:** Adapts to desktop, tablet, and mobile screens

**Smooth Animations:** Using Framer Motion for engaging transitions

**Modern Styling:** Clean Tailwind CSS design with consistent color scheme

**Intuitive Navigation:** Easy-to-use sidebar navigation for all features

**Interactive Elements:** Hover effects and visual feedback for user actions

##  🔒 Security Features

-JWT-based authentication with secure HTTP-only cookies

-Password hashing using bcrypt algorithm

-SQL injection prevention with parameterized queries

-CORS configuration for controlled API access

-Environment variables for sensitive configuration


## ⚙️ Getting Started

Node.js (v14 or higher)

MySQL (v5.7 or higher)

npm or yarn package manager

Follow these steps to set up and run the project locally.

##  2.  Backend Setup
cd Backend
npm install
### 1. Clone the Repository
git clone https://github.com/Achref47/TaskFlow-AI.git
cd TaskFlow-AI

##  2.  Backend Setup
cd Backend
npm install


###  ENV
JWT_SECRET=your_secret_key_for_jwt
GEMINI_API_KEY=your_google_gemini_api_key
DB_HOST=127.0.0.1
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
ACCESS_TOKEN_SECRET=same_code_as_your_secret_key_for_jwt

### 3.Database Setup
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    description TEXT NOT NULL,
    status ENUM('To Do', 'In Progress', 'Done') DEFAULT 'To Do',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Low',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create chatbot_history table
CREATE TABLE chatbot_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_message TEXT NOT NULL,
    chatbot_response TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

### 4.Run the Backend Server
npm start

### 5.Run the Front end Server
cd ../Frontend

npm install

npm start

**The app will now be running on http://localhost:3000**
