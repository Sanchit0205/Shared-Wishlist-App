# 🛍️ Shared Wishlist App

A **collaborative wishlist web application** that allows users to create and manage shared shopping wishlists with friends, family, or teams. Users can add, edit, and delete products, invite others (mocked), and see who contributed each item.

---

## ✨ Features

* 🔐 **Mock Login** (localStorage-based email login)
* 📅 Create and manage multiple wishlists
* 📦 Add, edit, and delete products
* 👤 Attribution: Show who added each item
* 📩 Mock invite system with visual feedback
* 🌈 Clean, responsive UI using Tailwind CSS
* ❤️ Optional: Emoji reactions (can be extended)

---

## 🔧 Tech Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | React, TailwindCSS    |
| Backend  | Node.js, Express      |
| Database | MongoDB Atlas         |
| Auth     | Mocked (localStorage) |

---

## 🔹 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Sanchit0205/Shared-Wishlist-App.git
cd shared-wishlist-app
```

### 2. Setup Server

```bash
cd wishlist-server
npm install
cp .env.example .env
# Add your MongoDB URI to .env
npm run dev
```

### 3. Setup Client

```bash
cd wishlist-client
npm install
npm start
```

---

## 📑 Folder Structure

```
shared-wishlist-app/
├── wishlist-client/     # React frontend
├── wishlist-server/     # Express backend
```

---

## 📊 Sample User Flow

1. Log in using email (mocked)
2. Create a wishlist (e.g., "Birthday Gifts")
3. Add products with name, price, image URL
4. Mock invite others to view/edit
5. See who added each item
6. Edit or delete items as needed

---

## 🚀 Future Improvements

* Firebase authentication
* Real-time sync via Socket.IO
* Role-based access for wishlists
* Product suggestions/comments
* Public wishlist sharing

---

## 📷 Screenshots

> Add images of: login, homepage, wishlist page with products

---

## 💡 Purpose

This project simulates a real-world collaborative shopping experience and demonstrates:

* Full-stack development skills
* REST API architecture
* UI/UX design with Tailwind
* Component reuse and state handling

---

## ✅ Completed Requirements

* [x] Signup/Login (mocked)
* [x] Create wishlist
* [x] Add/Edit/Delete products
* [x] Show who added each item
* [x] Mock invite UI
* [x] Responsive UI (Tailwind)

---

## 👤 Author

**Sanchit Chavan**

