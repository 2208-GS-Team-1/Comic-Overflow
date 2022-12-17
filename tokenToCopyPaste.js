// await axios.get(`/api/cart/user/${user.id}/checkOut`, {
//   headers: {
//     authorization: "Bearer " + token,
//   },
// });

///----

// JWT & authorization header to give for authorization check in the API
const token = window.localStorage.getItem("token");
const config = { headers: { authorization: "Bearer " + token } };

// WHEN THERE'S A BODY...
axios.post("url", bodyToPostWith, config);
