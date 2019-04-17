# Banka

Andela Development challenge

[![Build Status](https://travis-ci.org/manzif/Banka.svg?branch=develop)](https://travis-ci.org/manzif/Banka) [![Coverage Status](https://coveralls.io/repos/github/manzif/Banka/badge.svg?branch=develop)](https://coveralls.io/github/manzif/Banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/ac136a7dbfdd7bce1962/maintainability)](https://codeclimate.com/github/manzif/banka/maintainability)

## Tools
-Git 

-Express

-Nodejs

## Installation
git clone https://github.com/manzif/Banka.git

// To install required node modules

npm init


// Run server in development mode

npm run server:start


// Run server in production mode

npm run start



## Run Tests

npm run test

## API Endpoints

To access endpoints please click => https://manzi-banka-andela.herokuapp.com/

`POST /api/v1/auth/signup` To signup

`POST /api/v1/auth/signin` To signin

`GET /api/v1/accounts` To see all accounts

`GET /api/v1/accounts/:id` To see one account

`POST /api/v1/accounts` To create account

`PATCH /api/v1/accounts/:account_number/activate` To activate an account


`PATCH /api/v1/accounts/:account_number/deactivate` To deactivate an account

`DELETE /api/v1/accounts/:account_number` To delete an account

`GET /api/v1/transactions`, To see all the transaction

`POST /api/v1/transactions/:account_number/debit` To debit

`POST /api/v1/transactions/:account_number/credit` To credit


## Developer

MANZI Fabrice