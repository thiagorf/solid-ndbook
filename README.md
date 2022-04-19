# NdBook 

A simple book rent node.js application, build with clean architecture and tdd practices.



<!--link todo items with they specific class -->

## Todo Use cases
- [x] RegisterBookUseCase
- [X] RenturnAllBooksUseCase

- [X] RegisterUserUseCase
- [X] AuthenticateUserUseCase

- [x] RentBookUseCase
- [X] FinishRentUseCase

- [ ] SearchBookUseCase (with filter and pagination)


## How to run the project


```console
    git clone "repository url"
    cd folder_name
    npm install or yarn install
    npx prisma generate dev or yarn prisma generate dev
    npm run dev or yarn dev

```

Now you can send requests to http://localhost:8000

# Request and responses

## API Resources

* POST /books
* GET /books
* POST /users
* POST /users/authenticate
* POST /rents
* PUT /rents/:id/finish

## POST /books

Example: POST http://example/api/books

Request Body:

```
[
  {
    "name": "Sample Book",
    "description": "lorem ipsum",
    "amount": 6,
    "publish_date": "20/04/1990"
  }
]
```

Successful request will retun the created resource

```
[
  { 
    "id": "62363361-f628-4aa5-ae18-996c5027bb36",
    "name": "Clean Architecture",
    "description": "It's a good book",
    "publish_date": "2022-04-13T13:18:44.028Z",
    "created_at": "2022-04-13T13:18:44.231Z",
    "stock_id": "1e226515-cda1-476f-81ef-b74314c3c28f"
  }
]
```

## GET /books

Example: GET http://example/api/books

```
[
  { 
    "id": "62363361-f628-4aa5-ae18-996c5027bb36",
    "name": "Clean Architecture",
    "description": "It's a good book",
    "publish_date": "2022-04-13T13:18:44.028Z",
    "created_at": "2022-04-13T13:18:44.231Z",
    "stock_id": "1e226515-cda1-476f-81ef-b74314c3c28f"
  }
]
```

## POST /users

Example: POST http://example/api/users


Request body:

```
[
  { 
    "name": "John Doe",
    "email": "johndow@gmail.com",
    "password": "randompassword"
  }
]
```

Successful request will retun the created resource

```
[
  { 
	  "id": "d062f171-f159-42a5-b397-615b0a9c27b6",
	  "role": "USER",
	  "name": "John Dow",
	  "email": "johndow@gmail.com",
	  "password": "$2b$08$AxuqIK7wd6UbJv.3egoCCONIiZvzkTohuOYL6KGwYmzXEdPOeFWDu"
  }
]
```

## POST /users/authenticate

Example: POST http://example/api/users/authenticate


Request body:

```
[
  {
    "email": "johndow@gmail.com",
    "password": "randompassword"
  }
]
```

Successful request will retun a jwt token

```
[
  { 
	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2FkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY1MDMxMjcyMSwiZXhwIjoxNjUwMzE2MzIxfQ.jf1rrY9ol74DlIvCYd1DETww0sFgk1CK7VLRrZ5hNEU"
  }
]
```

## POST /rents

Example: POST http://example/api/rents


Request body:

```
[
  {
	"user_id": "de31a2af-c5c5-4585-86bf-36a544d47d7f",
	"book_id": "62363361-f628-4aa5-ae18-996c5027bb36",
	"end_date": "2022-04-19T15:05:37.579Z",
	"rent_date": "2022-04-10T15:05:37.579Z"
  }
]
```

Successful request will retun the created resource

```
[
  {
	  "id": "9ce5cd05-a7fa-4fb8-823d-178100f7dd97",
	  "user_id": "e31a2af-c5c5-4585-86bf-36a544d47d7f",
	  "book_id": "62363361-f628-4aa5-ae18-996c5027bb36",
	  "rent_date": "2022-04-19T20:18:45.060Z",
	  "end_date": "2022-04-19T15:05:37.579Z",
	  "receive_date": null,
	  "inProgress": true
  }
]
```


## PUT /rents/:id/finish

Example: PUT http://example/api/rents/:id/finish

Successful request will retun the created resource

```
[
  {
    "id": "901df54c-a78c-42fe-8063-2444e8971384",
    "user_id": "de31a2af-c5c5-4585-86bf-36a544d47d7f",
    "book_id": "62363361-f628-4aa5-ae18-996c5027bb36",
    "rent_date": "2022-04-13T15:06:43.749Z",
    "end_date": "2022-04-19T15:05:37.579Z",
    "receive_date": "2022-04-13T15:13:07.542Z",
    "inProgress": false
  }
]
```
