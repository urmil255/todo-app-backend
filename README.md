# **Todo App Setup Guide**

This document provides **step-by-step instructions** for cloning, setting up, and running the **backend** of the Todo App locally. Once set up, the application will be accessible at **http://localhost:3001** (backend).

## **Prerequisites**
Ensure the following tools are installed on your system:
- **Node.js** (version 16 or later recommended)
- **npm**
- **MySQL** (required for the backend)
- **Git**

## **Backend Setup**
1. Clone the Backend Repository:  
   Run the following commands to clone and navigate to the backend repository:  
   `git clone https://github.com/urmil255/todo-app-backend.git`  
   `cd todo-app-backend`  

2. Install Backend Dependencies:  
   Install the necessary Node.js dependencies using the command:  
   `npm install`  

3. Configure MySQL Database:  
   Start your MySQL server, then create a new database named `todo_app` with the following SQL command:  
   `CREATE DATABASE todo_app;`  
   Update the database credentials in the `.env` file:  
   `DATABASE_URL="mysql://<username>:<password>@localhost:3306/todo_app"`  
   Replace `<username>` and `<password>` with your MySQL **username** and **password**.

4. Run Database Migrations:  
   Use Prisma to generate the database tables by running:  
   `npx prisma migrate dev --name init`  

5. Start the Backend Server:  
   Start the backend server using the command:  
   `npm run dev`  
   The backend server will start at **http://localhost:3001**.

## **Testing API Endpoints**
After setting up the **frontend** and **backend**, verify API calls at:  
**http://localhost:3001/api/tasks**
