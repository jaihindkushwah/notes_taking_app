# 🔗 Note Taking Application

A simple and note taking service built with Node.js.  
It allows users to create notes, view notes, update notes and delete as well.

---

## Features

- Create new notes
- View your all personal notes
- Update your exitsing notes
- Rate limiting on Note creation

---

## Tech Stack

- Node.js
- Express.js
- Typescript

---

# How to Run the Project
### Clone the Repository
```
 git clone https://github.com/jaihindkushwah/notes_taking_app.git
 cd notes_taking_app
```
### Install Dependencies
```
npm install
```
### Run in Development Mode
```
npm run dev
````

### Server URL

After running, the server will be available at:

http://localhost:8000


##  API Endpoints

#### BASE_URL= http://localhost:8000/



## Register User

POST /register


cURL
```
curl --location 'http://localhost:8000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"admin@gmail.com",
    "password":"asdf@1234"
}'
```
Response:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc3MDcxNTIxOCwiZXhwIjoxNzcwODAxNjE4fQ.7di3brarfhoxgKpGOotkQxHRmnjz_vUZnlcYYfs6kq0",
    "email": "admin@gmail.com"
}
```

## Login User

Endpoint

POST /login


cURL
```
curl --location 'http://localhost:8000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"adminjai@gmail.com",
    "password":"asdf@1234"
}'
```
Response:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc3MDcxNTIxOCwiZXhwIjoxNzcwODAxNjE4fQ.7di3brarfhoxgKpGOotkQxHRmnjz_vUZnlcYYfs6kq0",
    "email": "admin@gmail.com"
}
```

# Notes APIs
## Create Note (Rate Limited: 10 requests / 10 minutes)

Endpoint

POST /notes


cURL
```
curl --location 'http://localhost:8000/notes' \
--header 'Authorization: Bearer <JWT_TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
    "title":"todo for what really121",
    "body":"should we go outside for breakfast?5"
}'
```

Response:
```http

{
    "title": "todo ",
    "body": "should we go outside for breakfast?",
    "id": "note_1770716133",
    "userId": "adminjai@gmail.com",
    "createdAt": "2026-02-10T09:35:33.437Z",
    "updatedAt": "2026-02-10T09:35:33.439Z"
}
```
## Get All Notes (User Specific)

Endpoint

GET /notes


cURL
```
curl --location 'http://localhost:8000/notes' \
--header 'Authorization: Bearer <JWT_TOKEN>'
```

Response :
```http

[{
    "title": "todo ",
    "body": "should we go outside for breakfast?",
    "id": "note_1770716133",
    "userId": "adminjai@gmail.com",
    "createdAt": "2026-02-10T09:35:33.437Z",
    "updatedAt": "2026-02-10T09:35:33.439Z"
}]
```
## Update Note

Endpoint

PUT /notes/:id


cURL
```
curl --location --request PUT 'http://localhost:8000/notes/note_1770715104' \
--header 'Authorization: Bearer <JWT_TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
    "title":"todaynotesd1212a",
    "body":"lets play cricket in the evening after 6:00 pm. i don''t think possibe"
}'
```
## Delete Note

Endpoint

DELETE /notes/:id


cURL
```
curl --location --request DELETE 'http://localhost:8000/notes/note_1770715104' \
--header 'Authorization: Bearer <JWT_TOKEN>' 
```
