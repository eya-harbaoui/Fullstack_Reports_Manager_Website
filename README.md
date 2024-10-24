# Fullstack Reports Manager Website

This project is a full-stack application built using React with Vite and TypeScript for the frontend, and Node.js with PostgreSQL for the backend.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **PostgreSQL**

## Getting Started

### Frontend Setup

1. **Create a React + vite App with TypeScript**:
   in order to use shadcn with react we will use vite here are the steps to create the app : https://ui.shadcn.com/docs/installation/vite
2. **Change into the project directory:**
cd taho-ai-app
3. **Install Frontend Dependencies:**
npm install
4. **Run the Frontend App:**
npm run dev

### Backend Setup
1. **Create the Backend Project**
mkdir backend

cd backend

npm init -y

2. **Install TypeScript and Node.js Types:**
npm install typescript ts-node @types/node --save-dev

3. **Initialize TypeScript:**
npx tsc --init
4. **Install Backend Dependencies:**
npm install
5. **Configuration:**
Change the file .env based on your database config 

DB_HOST = "localhost"

DB_PORT = 5432

DB_USERNAME = "username"

DB_PASSWORD = "yourpassword"

DB_NAME = "Taho_AI_Report_Management"

6. **start the backend server** : 
nodemon index.ts
