# User Authentication Service


### Execution
* Download the dependencies of package.json: `npm install`
* Run with: `npm run dev`


## Usage

All responses will have the form

```json
{
    "data": "Mixed type holding the content of the response",
    "message": "Description of what happened"
}
```

Subsequent response definitions will only detail the expected value of the `data field`

### Login

**Definition**

`POST /api/login`

**Arguments**

- `"email":string` a globally unique identifier for this user
- `"password":string` password of the user

**Response**

- `200 OK` on success

```json
[
    {
        "token": "Token gerado com JWT"
    }
]
```

### Regiter users

**Definition**

`POST /api/register`

**Arguments**

- `"first_name":string` first name of the user
- `"last_name":string` last name of the user
- `"email":string` a globally unique identifier for this user
- `"password":string` password that will be hashed and stored to the database

**Response**

- `200 OK` on success

```json
[
    {
        "Message": "User {email} registered"
    }
]
```

### Get authenticated user data

**Definition**

`GET /api/auth`

**Arguments**

- Heders: `"Authorization": "Berear {token}` the JWT token needs to be passed as headers

**Response**

- `200 OK` on success

```json
[
    {
        "first_name": "first_name",
        "last_name": "last_name",
        "email": "email",
        "password": "password",
        "created_at": "date",
        "updated_at": "updated_at"
    }
]
```