# Adder

A simple project for adding and calculating expressions of the form `Axᵃ + Bxᵇ + ...`. Written in TypeScript, linted with ESLint. Express.js server. Mocha tests.

## Getting started

Clone or download this repository and `cd` into its directory. Run `npm install` to install all dependencies. After that's done, you can use the following commands:
* `npm run compile` to compile TypeScript into usable JavaScript
* `npm start` to start server
* `npm test` to compile TS and then run all tests
* `npm run develop` to compile TS, run all tests and start server – all in one

You can get debug information printed by setting shell variable `DEBUG` like this:
* `export DEBUG="*"` to see all debug information
* `export DEBUG="adder:*"` to only see information specific to this project

Or you can change server port from the default 3000 to e.g. 999 by setting shell variable `PORT` like this `export PORT="999"`.
