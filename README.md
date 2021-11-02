# Problem 1 - Sales Taxes

Coding assignment for Itemis where is asked to develop an application that prints out the receipt of a shopping list with the corresponding taxes for each product, following a list of rules.

I have choose this exercise because it was the first one.

## Assumptions

The first thing to assume is that this is real-world software. Taking that in mind a database is needed to provide the corresponding products with their information. This database is written in a JSON file stored in **src/assets/products.json** With the database ready the next step is to create the application. 

The application has been developed using Angular because it is easier to test and build than with pure Javascript and HTML, also there is possible to continue adding more features easily.

This software does not have a "beautiful" stylesheet because it has not been asked in the exercise statement, but it would be easily added with Angular Material.

## Problem solution

All the followed steps have been described in the commits messages. 

### Page window

The resolution of the problem consists of a page with four sections. The first three sections show the three example inputs of the problem exercise. The fourth section is an extra tool to develop custom shopping lists easily with the existing products

## Run the application

### Dependencies

The application is built in Angular so to run it is necessary to have **NodeJS** installed

### Steps

To run the application it is necessary to open a PowerShell window in the root folder and run the following commands:

> `npm install`

This would install all the dependencies. After that run:

> `ng serve`

With this, the application will be served by default in  **localhost:4200**