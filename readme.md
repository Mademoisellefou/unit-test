# TEST EXPLAINED

1. _Change the test will be avoid morgan logs_

2. _We require the dev depeendencies modules we exported as module.exports_

3. _Define SHOULD(should) by running chai.should() to style our test on the HTTP request result,then we told chai to use chai HTTP ._

## GET TEST

1. **Status 200**
2. **Result should be an Array**
3. **Accept if its empty**

## POST TEST

1. **Status 200**
2. **Not add an user with missing email field. we send a 206 status Partial Content instead**

3. **Accept if its a Object with all of fields**

## GET/:id TEST

1. **Status 200**
2. **We made sure the app return all fields**

3. **Independt blocks gives a clear output**

## PUT/:id TEST

1. **Status 200**
2. **We made sure comparing the exit message**

## DELETE/:id TEST

1. **Status 200**
2. **We made sure comparing the exit message**

> Note

- package.json scripts npm start
  **for linux** _ export NODE_ENV
  **for windows** _ SET NODE_ENV
