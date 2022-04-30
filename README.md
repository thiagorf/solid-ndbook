# NdBook 

A simple book rent node.js application, build with clean architecture and tdd practices.



<!--link todo items with they specific class -->

## Todo Use cases
- [x] RegisterBookUseCase
- [X] RenturnAllBooksUseCase (with filter and pagination)

- [X] RegisterUserUseCase
- [X] AuthenticateUserUseCase

- [x] RentBookUseCase
- [X] FinishRentUseCase


## How to run the project



Clone the repository with ```git clone "repository url"``` or download the project,
move for the project folder  ```cd folder_name ```, change .example.env file for .env with your credentials.

> full text seach will only work with **postgres**

.env file
```
  JWT_SECRET= (a random secret string)
  DATABASE_URL="database://username:password@localhost:5432/dbname?schema=public"
```

Install projects dependecies and generate all necessary tables.

```
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

Most routes have a generic error responses like this

```
  {
	  "msg": "User email is already been used"
  }
```


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

All request from this routes are paginated, and they have three optional query strings.

  - ?limit= 
    - how many elements per page
  - ?q=
    - search for a text match in the title or in description in the book
  - ?cursor=
    - it's a opaque cursor, the direction should be handle by the client  
    - only after the first request that the cursor should be provided in the query string.
      - 1º request http://example/api/books
      - 2º request http://example/api/books?cursor=opaque-cursor


```
{
	"books": [
		{
			"id": "5740e795-1a93-4079-be77-f3b44e6dec33",
			"name": "Sample book 1",
			"description": "It's a good book",
			"publish_date": "2022-04-21T16:45:36.982+00:00",
			"created_at": "2022-04-21T16:45:37.010+00:00",
			"stock_id": "2da75a0d-73de-4198-b0ef-1fc2fda15887"
		},
		{
			"id": "8614a805-703c-456f-85a8-1aa5eef0d1a4",
			"name": "Sample book 2",
			"description": "It's a good book",
			"publish_date": "2022-04-21T16:45:39.305+00:00",
			"created_at": "2022-04-21T16:45:39.335+00:00",
			"stock_id": "51377e04-d9d5-4a55-a5b5-ad7f001636bf"
		}
	],
	"cursor": "ODYxNGE4MDUtNzAzYy00NTZmLTg1YTgtMWFhNWVlZjBkMWE0"
}
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
