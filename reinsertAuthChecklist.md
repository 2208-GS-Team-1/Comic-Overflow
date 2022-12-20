## Code to insert:

```js
// JWT & authorization header to give for authorization check in the API
const token = window.localStorage.getItem("token");
const config = { headers: { authorization: "Bearer " + token } };

// WHEN THERE'S A BODY... insert the config as the 3rd arg.
axios.post("url", bodyToPostWith, config);
```

## /api/books

[x] FRONT END - all calls to this route has config passed in
[x] BACK END - all logic inside the routes uses `authenticateUser` and has logic around `req.user`

## /api/cart

[x] FRONT END - all calls to this route has config passed in
[x] BACK END - all logic inside the routes uses `authenticateUser` and has logic around `req.user`

## /api/orders

[x] FRONT END - all calls to this route has config passed in
[x] BACK END - all logic inside the routes uses `authenticateUser` and has logic around `req.user`

## /api/users

[] FRONT END - all calls to this route has config passed in
[] BACK END - all logic inside the routes uses `authenticateUser` and has logic around `req.user`
