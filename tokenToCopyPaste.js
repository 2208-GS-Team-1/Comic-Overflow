await axios.get(`/api/cart/user/${user.id}/checkOut`, {
  headers: {
    authorization: "Bearer " + token,
  },
});


///----

// Get token to give for api authorization call
const token = window.localStorage.getItem("token");

{
  headers: {
    authorization: "Bearer " + token,
  },
}