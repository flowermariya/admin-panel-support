### ADMIN PANEL SYSTEM
## Project Overview
This project is an Admin Panel System designed to facilitate the management of sales, products, and customer data. The backend is built with Node.js and NestJS, leveraging TypeScript for strong typing and reliable code maintenance. The system uses MySQL for data persistence, with TypeORM serving as the ORM layer to interact with the database seamlessly.

## Features
Authentication: Secure login and signup processes to manage user access.
Sales Management: Interface to create, view, and manage sales records.
Product Management: Tools for adding new products, listing all products, and editing product details.
Customer Management: Functionality to create customer profiles and list customer information for easy access and management.

## Technologies Used
- Backend: Node.js with NestJS framework.
- Language: TypeScript.
- Database: MySQL.
- ORM: TypeORM.

## Getting Started
- These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
- Node.js
- MySQL Server
= npm or yarn

## Installation
- git clone https://github.com/flowermariya/admin-panel-support
- cd admin-panel-support
- npm install

# env files
- DATABASE_HOST=
- DATABASE_USER=
- DATABASE_PASSWORD=
- DATABASE_NAME=
- PORT=


# npm run start

- This command will start the NestJS server. By default, the server will run on `http://localhost:3000`.

## Usage
Once the server is up and running, you can begin using the Admin Panel System to perform various tasks:

- Detailed Documentation http://localhost:3000/api#/Login 

- **To log in**: Send a POST request to `/auth/login` with the user credentials.
- **To sign up**: Send a POST request to `/auth/create` with the required user information.
- **To create sales**: Send a POST request to `/sales` with the sale data.
- **To list sales**: Send a GET request to `/sales`.
- **To create a product**: Send a POST request to `/products` with product details.
- **To list products**: Send a GET request to `/products`.
- **To add a customer**: Send a POST request to `/customers` with customer information.
- **To list customers**: Send a GET request to `/customers`.

- You can use tools like Postman or any HTTP client in a browser to interact with the API.
