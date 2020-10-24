# Deno REST API

This is a simple rest api with Deno, Mongodb and jwt tokens.

## Start up
Create a .env file - exemple: [env.exemple](.env.exemple)
```dotenv
DB_URI =
DB_NAME =
JWT_ACCESS_TOKEN_SECRET =
```
#### Start cmd
```
$ deno run --allow-env --allow-net --unstable --allow-read --allow-write --allow-plugin .\app.ts
```

#### Dependencies:
* [oak](https://deno.land/x/oak)
* [mongo@v0.12.1](https://deno.land/x/mongo@v0.12.1)
* [djwt](https://deno.land/x/djwt)
* [dotenv](https://deno.land/x/dotenv)

#### Routes

```
GET      /users
GET      /users/:id
POST     /users
PUT      /users/:id
DELETE   /users

POST     /login
```

### What you can do with this api: 
* You can secure a route by adding a middleware and pass a role array:
```typescript
router.get("/", requiredRole(['admin']), async (context: any) => {
        context.response.body = "This is a secure api endpoint."
    })
```

* With the RepositoryService and ControllerService you don't need to rewrite 
the CRUD operations each collection just extend the controller class.
```typescript
export class UserController extends ControllerService {

  constructor() {
      super(new UserRepository());
  }

}
```

#### Note: 
* This api is still in development.
