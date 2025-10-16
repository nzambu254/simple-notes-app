# 📝 Simple Notes Application

A full-stack notes management application built with **React** (Frontend) and **Laravel** (Backend). Users can create, read, update, and delete notes with a clean and intuitive interface.

---

## 🚀 Features

- ✅ Create new notes with title and content
- ✅ View all notes in a list
- ✅ Edit existing notes
- ✅ Delete notes with confirmation
- ✅ Responsive design with Tailwind CSS
- ✅ RESTful API architecture
- ✅ Real-time error handling and validation

---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Axios** for API calls
- **Tailwind CSS** for styling

### Backend
- **Laravel 11**
- **MySQL** database
- **RESTful API**

---

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PHP** (v8.2 or higher)
- **Composer**
- **MySQL** 

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone
cd simple-notes-app/submissions/nzambu
```

---

### 2️⃣ Backend Setup (Laravel)

#### Navigate to the backend folder:
```bash
cd backend
```

#### Install dependencies:
```bash
composer install
```

#### Create environment file:
```bash
cp .env.example .env
```

#### Configure database in `.env`:

**For MySQL:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=notes_app
DB_USERNAME=root
DB_PASSWORD=your_password


#### Run migrations:
```bash
php artisan migrate
```

#### Start the Laravel server:
```bash
php artisan serve
```

The backend will run at **http://127.0.0.1:8000**

---

### 3️⃣ Frontend Setup (React)

#### Open a new terminal and navigate to frontend:
```bash
cd frontend
```

#### Install dependencies:
```bash
npm install
```

#### Start the development server:
```bash
npm run dev
```

The frontend will run at **http://localhost:5173**

---

## 🎯 How to Use

1. Open your browser and go to **http://localhost:5173**
2. **Create a note:** Fill in the title and content, then click "Add Note"
3. **Edit a note:** Click the "Edit" button on any note, modify it, and click "Update Note"
4. **Delete a note:** Click the "Delete" button and confirm the action
5. All changes are saved to the database in real-time

---

## 📁 Project Structure
```
nzambu/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   └── NoteController.php
│   │   └── Models/
│   │       └── Note.php
│   ├── database/
│   │   └── migrations/
│   │       └── xxxx_create_notes_table.php
│   ├── routes/
│   │   └── api.php
│   └── .env.example
│
└── frontend/                   # React Application
    ├── src/
    │   ├── components/
    │   │   ├── NoteForm.jsx
    │   │   ├── NoteList.jsx
    │   │   └── NoteItem.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes/{id}` | Get a single note |
| PUT | `/api/notes/{id}` | Update a note |
| DELETE | `/api/notes/{id}` | Delete a note |



## 🚀 Future Improvements

If I had more time, I would implement:

1. **Authentication & Authorization**
   - User registration and login
   - JWT token-based authentication
   - Users can only see/edit their own notes

2. **Enhanced Features**
   - Search and filter notes
   - Categories/tags for notes
   - Rich text editor for content
   - Dark mode toggle
   - Note pinning/favoriting

3. **Better UX**
   - Inline editing without form
   - Drag-and-drop reordering
   - Auto-save drafts
   - Toast notifications instead of alerts
   - Pagination for large note lists

4. **Performance Optimization**
   - Implement caching (Redis)
   - Lazy loading for notes
   - Debounced search
   - Optimistic UI updates
