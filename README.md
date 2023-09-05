# HLD & LLD with FlowChat's


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





