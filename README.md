# DevFindr API

 https://devfindr-mongo-db.herokuapp.com

------
# Authentication Endpoints - 

## Create a new user 

POST /users

Request >

```javascript
{
	"name":STRING,
	"password": STRING,
	"email":STRING,
    "age": INTEGER (optional)
	"isDeveloper": BOOLEAN
}
```

Response (example) >

```javascript
{
    "user": {
        "age": 0,
        "_id": "5d4889187d6aca00171fc894",
        "name": "RubenF",
        "email": "1234567@1234.com",
        "isDeveloper": true,
        "createdAt": "2019-08-05T19:52:56.599Z",
        "updatedAt": "2019-08-05T19:52:56.682Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ4ODkxODdkNmFjYTAwMTcxZmM4OTQiLCJpYXQiOjE1NjUwMzQ3NzZ9.Q0VNC60_gg2FkcoFkbkykZjoTEsdEdUmmso5cw3A7uo"
}
```



## User login

POST /users/login

Request >

```javascript
{
	"email":STRING,
	"password":STRING
}
```

Response (example) > 

```javascript
{
    "user": {
        "age": 0,
        "_id": "5d4889187d6aca00171fc894",
        "name": "RubenF",
        "email": "1234567@1234.com",
        "isDeveloper": true,
        "createdAt": "2019-08-05T19:52:56.599Z",
        "updatedAt": "2019-08-05T20:05:09.767Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ4ODkxODdkNmFjYTAwMTcxZmM4OTQiLCJpYXQiOjE1NjUwMzU1MDl9.8ewyzI1kfu2FUE4voTMu49IwhWHyz_YUT2qbYvZxiu4"
}
```



## User logout

POST /users/logout

Request >

```javascript
// Send this in the Headers of the request

{
    "Authorization": `Bearer ${user.token}`
}
```

Response >

```javascript
{
    "success": "Logged out successfully"
}
```



## User logout of all devices 

POST /users/logoutall

Request > 

```javascript
// Send this in the Headers of the request

{
    "Authorization": `Bearer ${user.token}`
}
```

Response >

```javascript
{
    "success": "Successfully signed out of all devices."
}
```

------

# User Endpoints -

## Get a user's information (after being authenticated)

GET /users/me

Request > 

```javascript
// ** Send this in the Headers of the request **

{
    "Authorization": `Bearer ${user.token}`
}
```

Response (example) >

```javascript
{
    "age": 0,
    "_id": "5d488ee77d6aca00171fc89a",
    "name": "RubenF",
    "email": "1234567@1234.com",
    "isDeveloper": true,
    "createdAt": "2019-08-05T20:17:43.729Z",
    "updatedAt": "2019-08-05T20:38:44.753Z"
}
```



## Delete a user

DELETE /users/me

Request >

```javascript
// ** Send this in the Headers of the request **

{
    "Authorization": `Bearer ${user.token}`
}
```

Response >

```javascript
{
    "success": `User ${users.name} was successfully deleted.`
}
```



## Edit a user

PUT /users/me

Request >

```javascript
// ** Send this in the Headers of the request **

{
    "Authorization": `Bearer ${user.token}`
}

// ** In the request body, put the following. All fields are optional and not required**
{
    "age": INTEGER,
    "name": STRING,
    "email": STRING,
    "isDeveloper": BOOLEAN,
    "password": STRING
}
```

Response >

```javascript
{
    "age": 0,
    "_id": "5d4895c77d6aca00171fc8a1",
    "name": "Rub-in",
    "email": "1234567@1234.com",
    "isDeveloper": true,
    "createdAt": "2019-08-05T20:47:03.689Z",
    "updatedAt": "2019-08-05T20:47:08.908Z"
}
```

------

# Project Endpoints -

## Create a new Project

POST /projects

Request > 

```javascript
// ** Send this in the Headers of the request **

{
    "Authorization": `Bearer ${user.token}`
}

// ** In the request body, put the following. All fields are optional and not required**

{
    "name": STRING,
	"description":STRING
}
```

Response >

```javascript
{
    "_id": "5d4896a77d6aca00171fc8a4",
    "name": "GetJobs123",
    "description": "Link devs and businessmen together",
    "owner": "5d4895c77d6aca00171fc8a1",
    "createdAt": "2019-08-05T20:50:47.910Z",
    "updatedAt": "2019-08-05T20:50:47.910Z"
}
```



## Get all projects

GET /projects/all

Response >

```javascript
[
    {
        "_id": "5d4896a77d6aca00171fc8a4",
        "name": "GetJobs123",
        "description": "Link devs and businessmen together",
        "owner": "5d4895c77d6aca00171fc8a1",
        "createdAt": "2019-08-05T20:50:47.910Z",
        "updatedAt": "2019-08-05T20:50:47.910Z"
    },
    {
        "_id": "5d4896d77d6aca00171fc8a5",
        "name": "GetJobs1234",
        "description": "Link devs and businessmen together",
        "owner": "5d4895c77d6aca00171fc8a1",
        "createdAt": "2019-08-05T20:51:35.476Z",
        "updatedAt": "2019-08-05T20:51:35.476Z"
    },
    {
        "_id": "5d4896da7d6aca00171fc8a6",
        "name": "GetJobs12345",
        "description": "Link devs and businessmen together",
        "owner": "5d4895c77d6aca00171fc8a1",
        "createdAt": "2019-08-05T20:51:38.591Z",
        "updatedAt": "2019-08-05T20:51:38.591Z"
    }
]
```





## Get a User's Projects

GET /projects

Request >

```javascript
// ** Send this in the Headers of the request **

{
    "Authorization": `Bearer ${user.token}`
}
```

Response > 

```javascript
[
    {
        "_id": "5d4896a77d6aca00171fc8a4",
        "name": "GetJobs123",
        "description": "Link devs and businessmen together",
        "owner": "5d4895c77d6aca00171fc8a1",
        "createdAt": "2019-08-05T20:50:47.910Z",
        "updatedAt": "2019-08-05T20:50:47.910Z"
    },
    {
        "_id": "5d4896d77d6aca00171fc8a5",
        "name": "GetJobs1234",
        "description": "Link devs and businessmen together",
        "owner": "5d4895c77d6aca00171fc8a1",
        "createdAt": "2019-08-05T20:51:35.476Z",
        "updatedAt": "2019-08-05T20:51:35.476Z"
    },
    {
        "_id": "5d4896da7d6aca00171fc8a6",
        "name": "GetJobs12345",
        "description": "Link devs and businessmen together",
        "owner": "5d4895c77d6aca00171fc8a1",
        "createdAt": "2019-08-05T20:51:38.591Z",
        "updatedAt": "2019-08-05T20:51:38.591Z"
    }
]
```





## Get a Project by ID

GET /projects/:id

Request >

```javascript
// ** Send this in the Headers of the request **

{
    "Authorization": `Bearer ${user.token}`
}
```

Response >

```javascript
{
    "project": {
        "_id": "5d4896a77d6aca00171fc8a4",
        "name": "GetJobs123",
        "description": "Link devs and businessmen together",
        "owner": "5d4895c77d6aca00171fc8a1",
        "createdAt": "2019-08-05T20:50:47.910Z",
        "updatedAt": "2019-08-05T20:50:47.910Z"
    }
}
```





## Edit a Project by ID

PUT /projects/:id

Request >

```javascript
// ** Send this in the Headers of the request **

{
    "Authorization": `Bearer ${user.token}`
}

// ** In the request body, put the following. All fields are optional and not required**

{
	"name": STRING,
	"description":STRING
}

```

Response >

```javascript
{
    "_id": "5d4896a77d6aca00171fc8a4",
    "name": "GetAJob",
    "description": "its easy",
    "owner": "5d4895c77d6aca00171fc8a1",
    "createdAt": "2019-08-05T20:50:47.910Z",
    "updatedAt": "2019-08-05T21:10:33.600Z"
}
```



## Delete a Project by ID

DELETE /projects/:id

Request >

```javascript
// ** Send this in the Headers of the request **

{
    "Authorization": `Bearer ${user.token}`
}
```

Response >

```javascript
// ** Responds with the Project you just deleted **

{
    "_id": "5d4896a77d6aca00171fc8a4",
    "name": "GetAJob",
    "description": "its easy",
    "owner": "5d4895c77d6aca00171fc8a1",
    "createdAt": "2019-08-05T20:50:47.910Z",
    "updatedAt": "2019-08-05T21:10:33.600Z"
}
```

# Developers Endpoints -

## Get all developers

GET /developers

Response >

```javascript

[ {
    "user": {
        "age": 0,
        "_id": "5d4889187d6aca00171fc976",
        "name": "JohnW",
        "email": "asdf@1234.com",
        "isDeveloper": true,
        "createdAt": "2019-08-05T19:58:56.599Z",
        "updatedAt": "2019-08-05T20:05:09.767Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ4ODkxODdkNmFjYTAwMTcxZmM4OTQiLCJpYXQiOjE1NjUwMzU1MDl9.8ewyzI1kfu2FUE4voTMu49IwhWHyz_YUT2qbYvZxiu4"
  },
  {
    "user": {
        "age": 0,
        "_id": "5d4889187d6aca00171fc894",
        "name": "RubenF",
        "email": "1234567@1234.com",
        "isDeveloper": true,
        "createdAt": "2019-08-05T19:52:56.599Z",
        "updatedAt": "2019-08-05T19:52:56.599Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ4ODkxODdkNmFjYTAwMTcxZmM4hytiLCJplkriOjE1NjUwMzU1MDl9.8ewyzI1kfu2FUE4voTMu49IwhWHyz_YUT2qbYvZxiu4"
  }]
```

## Get developers by id

GET /developers/:id

Request >

```javascript
// ** Send this in the Headers of the request **

{
    "Authorization": `Bearer ${user.token}`
}
```

Response >

```javascript

{
    "user": {
        "age": 0,
        "_id": "5d4889187d6aca00171fc976",
        "name": "JohnW",
        "email": "asdf@1234.com",
        "isDeveloper": true,
        "createdAt": "2019-08-05T19:58:56.599Z",
        "updatedAt": "2019-08-05T20:05:09.767Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ4ODkxODdkNmFjYTAwMTcxZmM4OTQiLCJpYXQiOjE1NjUwMzU1MDl9.8ewyzI1kfu2FUE4voTMu49IwhWHyz_YUT2qbYvZxiu4"
  }
  ```

