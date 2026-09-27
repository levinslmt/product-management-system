Setup and Testing Guide

This guide explains how to set up and test the Product Management System locally.

Requirements

Install the following before starting:

Node.js

Microsoft SQL Server

SQL Server Management Studio (SSMS)

Git

1. Clone the Repository

Open a terminal and run:

git clone https://github.com/levinslmt/product-management-system.git
cd product-management-system

2. Set Up the Database

Open SQL Server Management Studio and connect to your SQL Server instance.

Run the following SQL:

CREATE DATABASE ExamDB;
GO

USE ExamDB;
GO

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL
);

CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255),
    Price DECIMAL(10,2) NOT NULL,
    Quantity INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);

Make sure the SQL Server service is running before starting the backend.

3. Set Up the Backend

Open a terminal in the project root and run:

cd server
npm install

Create a .env file inside the server folder:

PORT=3000
DB_SERVER=localhost
DB_NAME=ExamDB
JWT_SECRET=your_secret_key

Start the backend:

npm run dev

The backend should run on:

http://localhost:3000

4. Set Up the Frontend

Open another terminal and run:

cd client
npm install

Start the frontend:

npm run dev

Vite will display the local URL in the terminal. It is usually:

http://localhost:5173

Open that URL in a browser.

5. Test the Application

Registration

Open the application.

Go to the Register page.

Enter a username and password.

Submit the registration form.

Confirm that the registration succeeds.

You can verify the user was added in SQL Server:

USE ExamDB;

SELECT * FROM Users;

Login

Go to the Login page.

Enter the registered username and password.

Click Login.

Confirm that you are redirected to the Products page.

Product CRUD

Test the following:

Create a new product.

Confirm it appears in the product table.

Edit the product.

Confirm the changes appear.

Delete the product.

Confirm the product is removed.

Product Report

Open the Report page.

Confirm that the report displays:

Total Products

Total Quantity

Total Inventory Value

Logout and Protected Routes

Click Logout.

Try to open:

http://localhost:5173/products

Confirm that you are redirected to the Login page.

API Testing

The REST API can also be tested using Postman or another API client.

Register

POST http://localhost:3000/api/auth/register
Content-Type: application/json

Request body:

{
  "username": "testuser",
  "password": "password123"
}

Login

POST http://localhost:3000/api/auth/login
Content-Type: application/json

Request body:

{
  "username": "testuser",
  "password": "password123"
}

The login response contains a JWT token.

For protected product endpoints, send the token using:

Authorization: Bearer <token>

Get Products

GET http://localhost:3000/api/products

Get Report

GET http://localhost:3000/api/products/report

Create Product

POST http://localhost:3000/api/products
Content-Type: application/json
Authorization: Bearer <token>

Example body:

{
  "name": "Sample Product",
  "description": "Test product",
  "price": 100,
  "quantity": 10
}

Update Product

PUT http://localhost:3000/api/products/1
Content-Type: application/json
Authorization: Bearer <token>

Delete Product

DELETE http://localhost:3000/api/products/1
Authorization: Bearer <token>

Notes

The application is configured to run locally.

The .env file is not included in the repository for security reasons.

Create your own .env file using the example above.

Make sure SQL Server is running before starting the backend.

The frontend expects the backend API to run on http://localhost:3000.