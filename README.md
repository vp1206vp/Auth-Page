# 🔐 Auth Page – Full Stack Authentication System

This project is a modern full-stack authentication system built with a React + TypeScript frontend and a Node.js + Express backend. It features user login and signup functionality, styled with Tailwind CSS and animated UI elements.

## ✨ Features

- 🔒 Secure user authentication
- 🌈 Animated background on auth pages
- 📦 Modular component structure
- ⚡ Fast development with Vite
- 🎨 Styled with Tailwind CSS
- 📁 Separate backend and frontend structure

## 🧱 Tech Stack

**Frontend:**
- React
- TypeScript
- Vite
- Tailwind CSS

**Backend:**
- Node.js
- Express
- MongoDB (assumed via `User.js` model)

## 📁 Project Structure

Auth-Page-main/
├── server/ # Backend (Express + MongoDB)
│ ├── index.js
│ ├── models/User.js
│ └── routes/auth.js
├── src/ # Frontend
│ ├── components/auth/ # Auth UI components
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json

## 🚀 Live Demo

Check out the live version here: [Live Demo](https://auth-page-git-main-vanditha-pradeeps-projects.vercel.app/)

## 🚀 Getting Started

To run this project locally:

1. Clone the repository.
    ```bash
   git clone https://github.com/your-username/Auth-Page-main.git
   cd Auth-Page-main
3. Install dependencies for the frontend and start the frontend.
   ```bash
   npm install
5. Make sure MongoDB is running and environment variables are set.
6.  Setup and Run the Backend
   ```bash
   cd server
   npm install
   node index.js



