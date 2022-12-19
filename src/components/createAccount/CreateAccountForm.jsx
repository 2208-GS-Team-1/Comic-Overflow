import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Alert, Box, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/cartSlice";
import { setUser } from "../../store/userSlice";

// Validation schema using yup, to check is text field entries are valid.
const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(3, "Password should be a minimum 3 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string("Confirm password")
    // This is how you look at 'password' and make sure it is the same:
    .oneOf([yup.ref("password"), null], "Passwords should match"),
  firstName: yup
    .string("Enter your first name")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .required("Last name is required"),
});

const submitButtonStyle = {
  margin: "10px",
  width: "250px",
};
function CreateAccountForm() {
  // Redux and React stuff
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States used for error message display rendering if account creation was successful or not
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [creationFailure, setCreationFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    // Initializes our formik.values object to have these key-value pairs.
    initialValues: {
      email: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    // Give it our yup validationSchema
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      // Update Backend: axios post req to User
      try {
        // On backend, the req.body cannot contain confirmPassword because it breaks sequelize.
        // So limit what we went back, here.
        const bodyToSubmit = {
          email: values.email,
          username: values.username,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        };

        // createdUser from DB
        const createdUser = await axios.post("/api/users", bodyToSubmit);
        const userId = createdUser.data.id;

        //************************* AUTO LOGIN with new account info ********************************* */

        // Get/Create token for this login session
        const credentials = {
          username: values.username,
          password: values.password,
        };
        const response = await axios.post("/api/auth", credentials);
        const token = response.data;
        window.localStorage.setItem("token", token);

        //************************* ******************************** ********************************* */

        //***************** POSTing the guest cart to our DB with this newly created user *******************/

        // Create header config to give for the POST requests (and GET later) to cart API
        const config = { headers: { authorization: "Bearer " + token } };

        // If they had stuff in their cart before creating an account, we need to insert these items into the DB
        const cartString = localStorage.getItem("cart");
        const guestCart = JSON.parse(cartString);
        if (guestCart.length > 0) {
          // Loop through what was parsed from localStorage cart and submit it to the DB
          await Promise.all(
            guestCart.map(async (cartItem) => {
              let bookId = cartItem.book.id;
              let quantityToAdd = cartItem.quantity;
              let body = { userId, bookId, quantityToAdd };
              await axios.post("/api/cart/quantity", body, config);
            })
          );
        }

        // Refetch the newly created user's cart and give it to localstorage - this has fields we need.
        const fetchedCart = await axios.get(`/api/cart/user/${userId}`, config);

        // Overwrite the localStorage cart to this fetched one, which has stuff like userID on it!
        localStorage.setItem("cart", JSON.stringify(fetchedCart.data));

        // Give this fetched cart to redux, too
        dispatch(setCart(fetchedCart.data));

        // Update the state that is used to trigger the mui Alert Success component
        setCreationSuccess(true);
        // In case it failed before, set that state too, so the failure message disappears
        setCreationFailure(false);

        // Wait 3 seconds before redirecting the user to login page
        setTimeout(() => {
          // Finally - dispatch user to the one just made
          // This goes in here to prevent the current URL from prematurely showing '404 you are already logged in!'
          dispatch(setUser(createdUser.data));
          navigate("/");
        }, 3000);
      } catch (err) {
        // Change state - If account creation failed (eg, an acct with that username already exists)
        setCreationFailure(true);
        setErrorMessage(err.response.data); // Give the error message from our api's res.send to our mui alert's text body
      }
    },
  });

  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box margin={1}>
          <TextField
            name="username"
            type="username"
            label="Username*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.username || ""}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>

        <Box margin={1}>
          <TextField
            name="email"
            type="email"
            label="Email*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.email || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>

        <Box margin={1}>
          <TextField
            name="password"
            type="password"
            label="Password*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.password || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>

        <Box margin={1}>
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.confirmPassword || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Box>

        <Box margin={1}>
          <TextField
            name="firstName"
            type="firstName"
            label="First Name*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.firstName || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Box>

        <Box margin={1}>
          <TextField
            name="lastName"
            type="lastName"
            label="Last Name*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.lastName || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>

        {creationSuccess && (
          <Alert sx={{ marginTop: 2 }} severity="success">
            Account created! Redirecting to login page...
          </Alert>
        )}
        {creationFailure && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            {errorMessage}
          </Alert>
        )}

        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </Box>
    </div>
  );
}

export default CreateAccountForm;
