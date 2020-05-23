# Adder

A simple project for adding and calculating expressions of the form `Axᵃ + Bxᵇ + ...`. Written in TypeScript, linted with ESLint. Express.js server. Mocha tests.

## Getting up and running

Clone or download this repository and `cd` into its directory. Run `npm install` to install all dependencies. After that's done, you can use the following commands:

* `npm run compile` to compile TypeScript into usable JavaScript
* `npm start` to start server
* `npm test` to compile TS and then run all tests
* `npm run develop` to compile TS, run all tests and start server – all in one
* `npm run expression` to sum or calculate expressions from the command line, no server

You can get debug information printed by setting shell variable `DEBUG` like this:

* `export DEBUG="*"` to see all debug information
* `export DEBUG="adder:*"` to only see information specific to this project

Or you can change server port from the default 3000 to e.g. 999 by setting shell variable `PORT` like this `export PORT="999"`.

## Data format

The raw representation of an expression is an array of `[power, coefficient]` tuples (TS type `[number, number][]`), e.g.:

* `2137*x^2 + 1337` (`2137*x^2 + 1337*x^0`) is `[[2, 2137], [0, 1337]]`
* `x - 777*x^(-3)` (`1*x^1 + (-777)*x^(-3)`) is `[[1, 1], [-3, -777]]`

Internally that is stored as a `power => coefficient` map.

## API endpoints

### Sum Expressions
#### GET `/sum`

##### Request – `application/json`
field            | type                   | description                       | default
---------------- | ---------------------- | --------------------------------- | ----------
`expressionsRaw` | `[number, number][][]` | array of expressions to be summed | *required*

##### Response – `application/json`
field              | type                 | description
------------------ | -------------------- | ---------------------------------------
`expressionRaw`    | `[number, number][]` | expression that is the sum of all given
`expressionString` | `string`             | string representation of the sum

### Calculate Expression
#### GET `/calculate`

##### Request – `application/json`
field           | type                 | description                       | default
--------------- | -------------------- | --------------------------------- | ----------
`expressionRaw` | `[number, number][]` | expression to use for calculation | *required*
`variableValue` | `number`             | input value (x)                   | *required*

##### Response – `application/json`
field    | type     | description
-------- | -------- | -------------------------
`result` | `number` | result of the calculation
