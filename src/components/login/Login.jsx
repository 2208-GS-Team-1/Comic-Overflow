import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import axios from "axios";
import "./login.css";
import { setCart } from "../../store/cartSlice";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
  Card,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleCheckboxChange = event => {
    setShowPassword(event.target.checked);
  };
  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const combineCarts = async (userId, bookId, quantity) => {
    //Get users cart
    const existingCart = await axios.get(`/api/cart/user/${userId}`);
    // Pulling data out of existingCart
    const usersExistingCart = existingCart.data;
    //Check if user already has this book in their cart
    const existingItem = usersExistingCart.find(
      cartItem => cartItem.book.id === bookId
    );
    if (!existingItem) {
      const quantityToAdd = quantity;
      const body = { userId, bookId, quantityToAdd };
      await axios.post("/api/cart/quantity", body);
    } else {
      const enoughStock = existingItem.quantity + quantity;
      if (existingItem && existingItem.book.stock >= enoughStock) {
        const quantityToAdd = enoughStock;
        await axios.put(`/api/cart/${existingItem.id}`, {
          quantity: quantityToAdd,
        });
      } else if (existingItem && existingItem.book.stock < enoughStock) {
        const quantityToAdd = existingItem.book.stock;
        await axios.put(`/api/cart/${existingItem.id}`, {
          quantity: quantityToAdd,
        });
      }
    }
    const combinedCart = await axios.get(`/api/cart/user/${userId}`);
    dispatch(setCart(combinedCart.data));
    localStorage.setItem("cart", JSON.stringify(combinedCart.data));
  };

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });

      dispatch(setUser(response.data));
      const usersCart = await axios.get(`/api/cart/user/${response.data.id}`);
      const localStorageCart = localStorage.getItem("cart");
      const cart = JSON.parse(localStorageCart);
      if (cart.length > 0) {
        await Promise.all(
          cart.map(async cartItem => {
            await combineCarts(
              response.data.id,
              cartItem.book.id,
              cartItem.quantity
            );
          })
        );
      } else {
        if (usersCart.data) {
          dispatch(setCart(usersCart.data));
          localStorage.setItem("cart", JSON.stringify(usersCart.data));
        } else {
          dispatch(setCart([]));
          localStorage.setItem("cart", JSON.stringify([]));
        }
      }
    }
    // now that they've logged in, bring them to home page
    navigate("/");
  };

  const attemptLogin = async event => {
    event.preventDefault();
    const response = await axios.post("/api/auth", credentials);
    const token = response.data;
    window.localStorage.setItem("token", token);
    loginWithToken(token);
  };

  // This would only be seen if a user manually went to this route,
  // or on a slow connection while logging in and waiting for useNavigate to fire.
  if (user.id)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>You are already logged in!</p>
      </div>
    );

  return (
    <div className="loginForm">
      <Card className="loginCard" sx={{ boxShadow: 4 }}>
        <h2>Login</h2>
        <FormControl onSubmit={attemptLogin} className="loginFields">
          <TextField
            label="username"
            value={credentials.username}
            name="username"
            onChange={onChange}
            sx={{ input: { fontFamily: "'Dogfish', sans-serif" } }}
          />
          <TextField
            name="password"
            label="password"
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            onChange={onChange}
            sx={{ input: { fontFamily: "'Dogfish', sans-serif" } }}
          />
          <FormControlLabel
            label="Show password"
            control={
              <Checkbox onChange={handleCheckboxChange} color="default" />
            }
          />
        </FormControl>
        <button onClick={attemptLogin}>Login</button>
        <h3>New customer?</h3>
        <Link
          style={{
            color: "black",
            fontFamily: "'Dogfish', sans-serif",
            cursor: "pointer",
          }}
          to={"/createaccount"}
        >
          <p style={{ cursor: "pointer" }}>Sign up now!</p>
        </Link>
      </Card>
    </div>
  );
};

export default Login;
