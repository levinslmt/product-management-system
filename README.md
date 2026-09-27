Product Management System

A simple Product Management System built as a technical exam project.

Features

User registration and login

JWT authentication

Product CRUD

Create

Retrieve

Update

Delete

Product report

Protected routes

RESTful API

Microsoft SQL Server database

Technologies

Frontend

React

TypeScript

Ant Design

Axios

React Router

Backend

Node.js

Express.js

MSSQL

JWT

bcrypt

Project Structure

product-management-system/
├── client/       # React frontend
├── server/       # Express backend
├── README.md
├── SETUP.md
└── .gitignore

API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login

Products

GET    /api/products
GET    /api/products/report
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

Product endpoints require a valid JWT access token.

Setup and Testing

For installation, configuration, running, and testing instructions, see SETUP.md.

Challenges Encountered

Connecting Express.js to Microsoft SQL Server

Implementing JWT authentication

Connecting the React frontend to the Express REST API

Managing authentication state and protected routes

Implementing CRUD operations using MSSQL

Author

Levin Salamat