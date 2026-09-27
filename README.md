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

# Challenges Encountered

1. Most of my previous projects used MongoDB and PostgreSQL, so working with MSSQL and SSMS was a new experience for me.
2. This was my first time working with Microsoft SQL Server in a Node.js/Express application, so configuring the connection and working with SQL queries required some troubleshooting.
3. I used AI building this project as a coding assistant. I still reviewed the code, and tested the functionality.

Author

Levin Justin Don Salamat