# LeetCode Clone Frontend

Modern developer platform built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## Features

- **Authentication**: Connects to the Express backend JWT auth system (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`).
- **LeetCode Dark Theme**: Tailwind-based dark developer aesthetic with LeetCode brand colors (`#ffa116`, `#00b8a3`, `#ffc01e`, `#ff375f`).
- **Profile Dashboard**: Comprehensive problem-solving statistics (Easy, Medium, Hard breakdown), contest rating, and consistency streak tracker.
- **Routing**: `react-router-dom` with protected routes and auto-redirects.

## Getting Started

### 1. Install Dependencies

```bash
cd front-end
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The frontend will run at `http://localhost:3000` (or `http://localhost:5173`) and automatically proxy `/api` requests to the backend server at `http://localhost:5000`.

### 3. Production Build

```bash
npm run build
```
