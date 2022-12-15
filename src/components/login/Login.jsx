import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser, setUser } from "../../store/userSlice";
import axios from "axios";
import "./login.css";
import { clearCart, setCart } from "../../store/cartSlice";

const Login = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
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
  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    dispatch(clearCart());
    localStorage.setItem("cart", JSON.stringify([]));
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
  };

  const attemptLogin = async event => {
    event.preventDefault();
    const response = await axios.post("/api/auth", credentials);
    const token = response.data;
    window.localStorage.setItem("token", token);
    loginWithToken(token);
  };
  if (user.id)
    return (
      <div className="loginForm">
        Welcome {user.firstName} {user.lastName}
        <button onClick={logout}>Log out</button>
      </div>
    );
  return (
    <div className="loginForm">
      <h2>Login</h2>
      <form onSubmit={attemptLogin}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={credentials.password}
          onChange={onChange}
        />
        <label className="passwordInput">
          Show password
          <input type="checkbox" onChange={handleCheckboxChange} />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
