# Trumpet Test

A full-stack application with a React frontend and Express.js backend for managing snippets.

## Project Structure

```
trumpet-test/
├── api/          # Express.js backend API
└── app/          # React frontend application
```

## Prerequisites

- Node.js (v16 or higher)
- npm

## Getting Started

### 1. Backend Setup

Navigate to the API directory and install dependencies:

```bash
cd api
npm install
```

Start the backend server:

```bash
npm start
```

The API will be running on `http://localhost:4000`

### 2. Frontend Setup

Open a new terminal and navigate to the app directory:

```bash
cd app
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## Running Tests

### Backend Tests

```bash
cd api
npm install
npm test
```

### Frontend Tests

```bash
cd app
npm install
npm test
```

## Technology Stack

### Backend

- Express.js
- Jest (testing)

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Vitest (testing)
- React Testing Library
