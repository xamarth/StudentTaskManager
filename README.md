<!-- xamarth -->

<h1 align='center'>📘 Student Task Manager</h1>

### <p align='center'>A modern full-stack task management web application built with React, Express, and MongoDB, showcasing end-to-end development, deployment, and real-world debugging skills.</p>

## 🌐 Live Demo

- **Frontend:** 👉 [task.samarth.site](https://task.samarth.site)
- **Backend API:** 👉 [api.task](https://api.tasks.samarth.site/api/tasks)

---

## ✨ Features

### ✅ Core Features

- Create tasks with **title, description, priority, and due date**
- Edit existing tasks
- Mark tasks as **completed / pending**
- Delete tasks
- Filter tasks by **All / Pending / Completed**
- Responsive UI (mobile & desktop)
- Persistent data storage with MongoDB

### 🎨 UI & UX Enhancements

- Clean empty-state UI with call-to-action
- Modal-based Add / Edit task flow
- Visual indicators for completed & overdue tasks
- Smooth hover and transition effects

### 🚀 Future Enhancements

- User authentication
- Search functionality
- Drag-and-drop task ordering
- Notifications for overdue tasks
- Dark mode

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Deployment & Infrastructure

- Frontend: **Vercel**
- Backend: **Render**
- DNS & Domains: **Cloudflare**

---

## 📂 Project Structure

```bash
student-task-manager/
│
├── frontend/                       # Frontend (React + Vite)
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── AddTaskModal.jsx
│   │   │   └── EditTaskModal.jsx
│   │   ├── services/
│   │   │   └── api.js              # Axios instance
│   │   ├── App.jsx                 # Root component
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Tailwind CSS entry
│   ├── .env                        # Frontend environment variables
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── backend/                        # Backend (Node + Express)
│   ├── src/
│   │   ├── models/
│   │   │   └── task.js             # Mongoose Task schema
│   │   ├── routes/
│   │   │   └── taskRoutes.js       # Task API routes
│   │   ├── controllers/
│   │   │   └── taskController.js   # Task logic
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection
│   │   ├── app.js                  # Express app setup
│   │   └── server.js               # Server entry point
│   ├── .env                        # Backend environment variables
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── README.md
└── screenshots/                    # Project screenshots
    ├── empty-state.png
    ├── task-list.png
    └── edit-modal.png
```

---

## 🗄️ Data Model

### Task Schema

```js
{
  _id: ObjectId,
  title: String,
  description: String,
  priority: "low" | "medium" | "high",
  dueDate: Date,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Documentation

**Base URL**

```
https://api.tasks.samarth.site/api
```

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| POST   | /tasks     | Create a new task |
| GET    | /tasks     | Get all tasks     |
| GET    | /tasks/:id | Get task by ID    |
| PUT    | /tasks/:id | Update a task     |
| DELETE | /tasks/:id | Delete a task     |

**Query Parameters**

- `?status=pending`
- `?status=completed`

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=https://api.tasks.samarth.site/api
```

---

## 🚀 Local Development Setup

### 1️⃣ Clone the repository

```bash
git clone --depth=1 https://github.com/your-username/student-task-manager.git stm
cd stm
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

### 3️⃣ Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🌍 Deployment Overview

- Frontend deployed on **Vercel** with a custom domain
- Backend deployed on **Render** with MongoDB Atlas
- DNS and HTTPS managed via **Cloudflare**

---

## 🧪 Testing & Validation

- Manual API testing using Postman
- Browser testing for all CRUD operations
- Responsive testing on mobile & desktop
- ESLint used for code quality and consistency

---

## 📈 Learning Outcomes

- Built RESTful APIs with Express
- Integrated MongoDB using Mongoose
- Managed state and side effects in React
- Debugged real-world deployment issues
- Configured custom domains and environment variables
- Gained hands-on experience with production deployment

---

<!-- xamarth -->
