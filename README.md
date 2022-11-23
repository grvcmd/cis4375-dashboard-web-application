# Compliance Scout Application

## Getting Started
1. Download [Node.js](https://nodejs.org/en/download/)
2. We will use Node Package Manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install our dependencies.
    - Run the command below in the frontend folder AND in the backend folder.
    - You will run npm install TWICE
    ```
    npm install
    ```
3. Start the backend server. Run this command in the backend folder
    ```
    nodemon server.js
    ```
4. Start the frontend server. Run this command in the frontend folder
    - If successful, follow the link given in the terminal to open the application
    ```
    npm run dev
    ```
5. Download [Postman](https://www.postman.com/)

## Our Models and DB Tables
Each of these models reflect the DB Tables that we have. They also  have routes that mainly have to do with **GET, POST, PUT, DELETE requests**.
  - Company Model reflects Companies table
  - Company_Licenses Model reflects Company_Licenses table
  - Locations Model reflects Locations Table
  - Stakeholders Model reflects Stakeholders Table
---
## Usage
As of right now, the application's functions and operations lie within the **URL** and the **routes** that we have defined in each model's controller.

An API testing software we highly suggest using **Compliance Scout Application** on (especially if you want POST, PUT, and DELETE requests) is [Postman](https://www.postman.com/). <br>
Google Chrome will suffice if you want GET requests only.