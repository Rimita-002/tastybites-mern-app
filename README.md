# TastyBites SaaS - MERN Stack Restaurant Management System

**Web Skitters Academy - Internship Project**

TastyBites is a comprehensive MERN stack (MongoDB, Express.js, React.js, Node.js) SaaS restaurant management system featuring role-based access control, real-time menu management, public browsing, and a dedicated administrator portal.

---

## 🍽️ Key Features & Modules

### 1. Authentication & Authorization (Module 1)
- **User Registration**: Register with Full Name, Email, Password, Confirm Password (automatically assigned `User` role).
- **User Login**: Secure authentication with JWT and bcrypt password hashing.
- **Admin Login**: Dedicated admin login with 1-click Demo Credentials autofill (`admin@example.com` / `admin123`).
- **Protected Routes**: Navigation guards ensuring only verified administrators access management consoles.
- **Session Management**: Dual support for HTTP cookies and `Authorization: Bearer <token>` headers.

### 2. Admin Dashboard (Module 2)
- **Overview Metrics**:
  - **Total Menu Items** count
  - **Total Registered Users** count
  - **Total Orders** count
- **Quick Actions**: Add menu items, review live website, manage customer base.
- **Recent Activities**: Live previews of recently added dishes and new user registrations.

### 3. Menu Management (Module 3)
- **Add Menu Item**: Item Name, Description, Category (`Starter`, `Main Course`, `Dessert`, `Beverage`), Price, Availability (`In Stock` / `Out of Stock`), and Item Image (drag-and-drop file upload with preview + image URL support).
- **View Menu Items**: Search dishes by keywords, filter by category, monitor stock status.
- **Update Menu Item**: Modify description, price, category, availability status, or replace photo.
- **Delete Menu Item**: Remove dish with confirmation dialog.

### 4. User Management (Module 4)
- **View All Users**: Table listing Name, Email, Role (`Admin` vs `User`), and Registration Date.
- **Delete User**: Delete any registered user (with protection for primary admin account).

### 5. Public / Customer Panel (Module 5)
- **No Login Required**: Public guests can freely browse dishes and view details.
- **Home Page**:
  - Hero banner welcoming visitors to TastyBites.
  - Category filter tabs (`All`, `Starter`, `Main Course`, `Dessert`, `Beverage`).
  - Real-time search bar with instant debounced filtering.
  - Stock availability toggle (`In Stock Only`).
  - Responsive dish cards with image, price, category, short description, and **View** button.
- **Menu Item Details Page**:
  - High-resolution dish photography.
  - Comprehensive culinary description and kitchen prep notes.
  - Real-time stock status badge.
  - Quantity selector and customer order trigger.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React.js (v18) + Vite
  - Tailwind CSS (v3)
  - React Router DOM (v6)
  - Axios (with request/response interceptors)
  - Lucide React (modern icon suite)
- **Backend**:
  - Node.js & Express.js (v5)
  - MongoDB & Mongoose (v9)
  - JWT (jsonwebtoken) & Bcrypt.js
  - Multer (file upload storage) & Cloudinary
  - CORS, Cookie-Parser, Dotenv

---

## 🚀 Getting Started

### 1. Start Backend Server
```bash
cd backend
npm start
```
- Backend runs on `http://localhost:5000`
- Database connects to `mongodb://localhost:27017/tastybites-mern`
- Database is automatically bootstrapped with default admin credentials and 13 sample dishes across all 4 categories.

To run the automated backend test suite:
```bash
cd backend
npm test
```

### 2. Start Frontend Development Server
```bash
cd frontend
npm run dev
```
- Frontend runs on `http://localhost:5173`

To create a production build:
```bash
cd frontend
npm run build
```

---

## 🔑 Default Credentials

- **Admin Account**:
  - Email: `admin@example.com`
  - Password: `admin123`
- **Customer / User**:
  - Register freely via `/register` or login via `/login`

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` - Register customer account
- `POST /api/auth/login` - User and Admin login
- `POST /api/auth/admin/login` - Dedicated admin login
- `POST /api/auth/logout` - Clear user session
- `GET /api/auth/profile` - Get authenticated user profile

### Menu Items
- `GET /api/menu-items` - Public menu list (supports `?search=` and `?category=`)
- `GET /api/menu-items/:id` - Public menu item details
- `POST /api/menu-items` - Add menu item (Admin)
- `PUT /api/menu-items/:id` - Update menu item (Admin)
- `DELETE /api/menu-items/:id` - Delete menu item (Admin)

### Users (Admin)
- `GET /api/users` - View all registered users (Admin)
- `DELETE /api/users/:id` - Delete user account (Admin)

### Dashboard (Admin)
- `GET /api/dashboard/stats` - Total menu items, total users, total orders (Admin)
