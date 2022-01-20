# Building a Restful API for Vending Machine with (Create, Retrieve, Update, Delete) APIs for User and Product Models with Node.js, Express and MongoDB #

Mongoose is an ODM (Object Document Mapping) tool for Node.js and MongoDB. It helps you convert the objects in your code to documents in the database and vice versa.  

## Prerequisites:  
Please install MongoDB in your machine if you have not done already. Checkout the official MogngoDB installation manual for any help with the installation.


### Vending Machine ###
Build a simple Vending Machine application. We will build Rest APIs for creating, listing, editing and deleting product and user models Also, allowing users with a “seller” role to add, update or remove products, while users with a “buyer” role can deposit coins into the machine and make purchases. The vending machine should only accept 5, 10, 20, 50 and 100 cent coins .  

We’ll start by building a simple web server and then move on to configuring the database, building the Note model and different routes for handling all the CRUD operations.  

Finally, we’ll test our REST APIs using Postman.  

We’ll heavily use ES6 features like let, const, arrow functions, promises etc. It’s good to familiarize yourself with these features. I recommend this re-introduction to Javascript to brush up these concepts.  


## Quick Start

The quickest way to get started with express is to utilize the executable `express(1)` to generate an application as shown below:

Create the app:

```bash
$ express --view=hbs /tmp/foo && cd /tmp/foo
```

Install dependencies:

```bash
$ npm install
```

Start your Express.js app at `http://localhost:3000/`:

```bash
$ npm start
```
