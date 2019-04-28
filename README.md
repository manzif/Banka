# Banka

Andela Development challenge

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..


## Build Status

[![Build Status](https://travis-ci.org/manzif/Banka.svg?branch=develop)](https://travis-ci.org/manzif/Banka) [![Coverage Status](https://coveralls.io/repos/github/manzif/Banka/badge.svg?branch=develop)](https://coveralls.io/github/manzif/Banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/ac136a7dbfdd7bce1962/maintainability)](https://codeclimate.com/github/manzif/banka/maintainability)

## Tools
-Git 

-Express

-Nodejs

## Installation
git clone https://github.com/manzif/Banka.git

`// To install required node modules

npm init


// Run server in development mode

npm run server:start


// Run server in production mode

npm run start`



## Run Tests

npm run test

## API Endpoints Reference

To access endpoints please click => https://manzi-banka-andela.herokuapp.com/

`POST /api/v1/auth/signup` To signup

`POST /api/v1/auth/signin` To signin

`GET  /api/v1/users` To view all users

`GET /api/v1/users/:id` To view one user

`DELETE /api/v1/users/:id'` To delete a user

`GET /api/v1/accounts` To see all accounts

`GET /api/v1/accounts?status=active` To see active accounts

`GET /api/v1/accounts?status=dormant` To see active accounts

`GET /api/v1/accounts?status=draft` To see active accounts

`GET /api/v1/accounts/:id` To see one account

`GET /api/v1/accounts/:account_number` To get account details

`POST /api/v1/accounts` To create account

`GET /api/v1/user/:email/accounts` To view accounts of a one user

`PATCH /api/v1/accounts/:account_number/activate` To activate an account

`PATCH /api/v1/accounts/:account_number/deactivate` To deactivate an account

`DELETE /api/v1/accounts/:account_number` To delete an account

`GET /api/v1/transactions` To see all the transaction

`GET /api/v1/transactions/:id` To view one transaction

`/api/v1/accounts/:account_number/transactions` To view transactions of one account

`POST /api/v1/transactions/:account_number/debit` To debit

`POST /api/v1/transactions/:account_number/credit` To credit


## Developer

MANZI Fabrice