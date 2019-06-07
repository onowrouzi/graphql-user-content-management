# graphql-user-content-management
A server for user content management, utilizing Apollo, GraphQL, Typescript, &amp; PostgreSQL.

Heroku instance can be found here: https://usercontentgraph.herokuapp.com

NOTE: This is a free instance, as such it may take a minute for the server to start up.

## GETTING STARTED

```
mutation {
  createUser(payload: {
    first_name: "First",
    last_name: "Last",
    email: "you@email.com"
  }, password: "P@ssw0rd!") {
    id
    first_name
    last_name
    email
  }
}
```

and then

```
mutation {
  loginUser(email: "you@email.com", password: "P@ssw0rd!") {
    token
    refreshToken
    expiresAt
  }
}
```

then make your requests with your token in this HTTP header: 
```
{
  "authorization": "your_token_here"
}
```

Example query 
```
query {
  user {
    id
    first_name
    last_name
    email
  }
}
```

Schemas/Requests can be found on the right by clicking the green SCHEMA tab.
