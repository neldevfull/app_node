# Basic study of Node.js

## Running the project ?
```npm install```

## How to test the API with Curl ?

### POST
* curl -H "Content-Type: application/json" -X POST -d '{"id":"3","email":"maria@hotmail.com","password":"123456"}' http://localhost:3000/api/user

### GET
* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/user/all

### DELETE
* curl -i -H "Accept: application/json" -X DELETE -d "id=3" http://localhost:3000/api/user

### PUT
* curl -i -H "Accept: application/json" -X PUT -d "id=3" -d "email=novo@email.com" http://localhost:3000/api/user
