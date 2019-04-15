# Banka
Andela Development challenge

[![Build Status](https://travis-ci.org/manzif/Banka.svg?branch=develop)](https://travis-ci.org/manzif/Banka) [![Coverage Status](https://coveralls.io/repos/github/manzif/Banka/badge.svg?branch=develop)](https://coveralls.io/github/manzif/Banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/ac136a7dbfdd7bce1962/maintainability)](https://codeclimate.com/github/manzif/banka/maintainability)



## Tools
   Git
   Express
   Nodejs

## Installation
git clone https://github.com/manzif/Banka.git
npm install

## Start the server
npm install

### Run test
npm run test

## API Endpoints
POST /api/v1/auth/signup singup of a User
POST /api/v1/auth/signin To signin
GET /api/v1/accounts To see all the accounts
POST /api/v1/accounts To create an account
PATCH /api/v1/accounts/:account_number/activate To activate an account
PATCH /api/v1/accounts/:account_number/deactivate To deactivate an account
delete /api/v1/accounts/:account_number To delete an account
GET /api/v1/transactions To see all transactions
POST /api/v1/transactions/:account_number/debit To make a debit
POST /api/v1/transactions/:account_number/credit To make a credit;

## Developer
MANZI Fabrice
