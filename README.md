# HLD & LLD with FlowChat's


## High-Level Design (HLD) for Noida Extension Ramleela Web Application.


## High-Level Flow:

A user sends an HTTP request to your application.

Nginx receives the request and forwards it to the appropriate backend service (Node.js/Express.js).

Node.js processes the request by using Express.js routes.

If the request requires authentication, JWT tokens are validated.

Node.js interacts with the PostgreSQL database to fetch or update data.

The response is sent back through Nginx to the user's browser.

React components render the data received from the server.

Why Nginx and PM2:

#### Nginx: 
Nginx is used as a reverse proxy server because it efficiently handles incoming requests, balances load, and provides security features. It acts as a gatekeeper for your application and directs traffic to the appropriate backend services. Additionally, it can serve static files and handle SSL termination.

#### PM2 (Process Manager): 
PM2 ensures high availability of your Node.js application. It manages multiple Node.js processes, monitors them, and automatically restarts them if they crash. This is crucial for maintaining the reliability and uptime of your application in a production environment.

##### This high-level design outlines the major components and technologies used in your application and how they interact to deliver the required functionality. It's a robust setup for deploying a scalable and reliable web application on AWS with a PERN stack.

### Explanation of every technology that used in the application.
#### (1) AWS (Amazon Web Services):

AWS is a cloud computing platform used to host your application.
It provides scalable, reliable, and cost-effective infrastructure for deploying web applications.

#### (2) EC2 (Elastic Compute Cloud):

EC2 instances are virtual servers hosted on AWS.
You've deployed your Linux server (Ubuntu) on an EC2 instance.

#### (3) Nginx:

Nginx is a high-performance web server and reverse proxy server.
It serves as a frontend to handle incoming HTTP requests.
Nginx routes requests to the appropriate backend service (Node.js server) based on the URL.

### (4) Node.js:

Node.js is a JavaScript runtime environment used for building scalable server-side applications.
You've developed your server using Node.js and Express.js.

### (5) Express.js:

Express.js is a web application framework for Node.js.
It simplifies the process of creating RESTful APIs and handling HTTP requests.
You've divided your routes into different categories (auth, admin, collector, common) to manage various API requests.

#### (6) PostgreSQL:

PostgreSQL is a powerful open-source relational database system.
It's used to store and manage your application's data.
You have five tables in the master schema (tbl_users, tbl_login_credentials, tbl_donors_details, tbl_collections_details, tbl_guest_donor_details) for data storage.
#### (7) React:

React is a JavaScript library for building user interfaces.
It's used for creating the frontend of your application.
You have 15 pages and 22 different components, which are used to render the user interface.

#### (8) JWT (JSON Web Tokens):

JWT is used for authentication.
When a user logs in, a JWT token is generated, and it's sent with subsequent API requests to authenticate the user.

#### (9)PM2 (Process Manager):

PM2 is a production process manager for Node.js applications.
It ensures that your Node.js server runs continuously and automatically restarts if it crashes or encounters an error.



### High Level Flowchart of GC Web App

![](https://raw.githubusercontent.com/Aryan7Sharma/gc_ramleela_wepapp/main/hld1.png)



## Low Level Flow:

### (1) User Authentication Component

#### admin/collector Authentication:

Responsibility: This component is responsible for admin/collector registration, login, and authentication.

Design:

Authentication Middleware: Middleware functions are used to verify JWT tokens for protected routes. If a route requires authentication, the middleware checks the token's validity.

Registration: When a admin registers collector, their data is validated and stored in the PostgreSQL database (tbl_users and tbl_login_credentials) and also validate that only admin can register new collector.

Login: admin/collector provide their credentials (username and password). These credentials are verified against stored data in tbl_login_credentials. If valid, a JWT token is generated.

JWT Generation: A JWT token is generated using the admin/collector's information and a secret key. This token is sent to the admin/collector browser for subsequent authenticated requests.

JWT Validation: When an authenticated request is received, the JWT token is validated using middleware. If valid, the request is allowed to proceed; otherwise, it's rejected.

#### Dependencies:

Express.js: Routing and middleware handling.

PostgreSQL: Storing admin/collector data.

JWT Library: Generating and validating tokens.

Express Middleware: Handling route-specific authentication.

#### Interfaces:

/auth/login: POST request to log in and receive a JWT token.

/admin/register: POST request to register a new collector.

#### Middleware: 
Used to protect specific routes that require authentication.

#### Database Schema:

tbl_users: Stores admin/collector information (e.g., name, email).

tbl_login_credentials: Stores login credentials (e.g., username, hashed password).

#### Sequence of Actions:

collector registers by sending a POST request to /admin/register with collector details.

The server validates the data and stores it in the database.

admin/collector logs in with a POST request to /auth/login, providing credentials.

The server validates the credentials, generates a JWT token, and sends it to the admin/collector.

The admin/collector includes the token in the headers of subsequent requests.

Middleware checks the token's validity for protected routes.

Valid requests are processed, while invalid requests are rejected.

#### Security Considerations:

Passwords are securely hashed before storage.

JWT tokens have a short expiration time for security.





