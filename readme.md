# Routes

### POST /users
- Request body
```` json
{
    "email": "email4@gmail.com",
    "password": "123456",
    "confirmPassword": "123456"
}
````
- Response: status code 201
- -------

### POST /users/login
- Request body
```` json
{
    "email": "email4@gmail.com",
    "password": "123456"
}
````
- Response: status code 200 and a token object
```` json
{
  "token": "GENERATED_JWT_TOKEN_HERE"
}
````
------

**All the routes below expect to receive an authorization header containing a valid token received upon login:**

```` json
{
  "Authorization": "Bearer SOME_VALID_GENERATED_TOKEN"
}
````

### POST /tests
- Request body
```` json
{
  "name": "Prova",
  "pdfUrl": "https://google.com.br",
  "categoryId": 2,
  "teacherDisciplineId": 1
}
````
- Response: status code 201
------

### GET /tests/group-by/disciplines

- Response:
```` json
{
  "periodNumber": {
    "disciplineName": {
      "category": [
        {
          "name": "Prova",
          "teacherName": "Diego Pinho",
          "pdfUrl": "https://google.com.br",
          "id": 1
        }
      ]
    }
  }
}
````
This object is formatted so that the tests are grouped by categories, the categories are grouped by discipline, and the disciplines are grouped by period.

-----------

### GET /tests/group-by/teachers

- Response:
```` json
{
  "teacherName": {
    "category": [
      {
        "name": "Prova 01",
        "disciplineName": "HTML e CSS",
        "pdfUrl": "https://google.com.br",
        "id": 1
      }
    ]
  }
}
````
This object is formatted so that tests are grouped by categories, and categories are grouped by teachers.

-----------
