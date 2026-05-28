# Time to Read — Large Book Tracker Dashboard
A sleek, optimized, and high-performance React dashboard designed to manage and track large collections of books. Built with React, TypeScript, and Tailwind CSS, this frontend application features server-side readiness, dynamic statistical insights, and advanced client-side filtering and pagination.

## Tech Stack
Frontend Framework: React (with Hooks & TypeScript)

Styling: Tailwind CSS (with arbitrary variants & smooth transitions)

Icons: Lucide React

Routing: React Router (used in sidebar navigation)

Backend: Node.js and express with database in mysql


## Getting Started
### Prerequisites
Make sure you have Node.js and mysql installed on your machine. You will also need a local backend server running on port 8080 to handle the data storage endpoints.

### Installation
1. Install the required project dependencies for frontend folder and backend:
    npm install

2.Import database.sql to your database

3.Create .env file  and pass this properties
    HOST ="127.0.0.1 {if locally}"
    DB_USERNAME = "root"
    DB_PASS = "{your password}"
    DB_NAME = "library_db {for this database} "
    
4. Go to backend folder and run the server:
    npm run start 
    or 
    npm run dev

5. Go to frontend folder and start an applicatoin:
    npm run dev
