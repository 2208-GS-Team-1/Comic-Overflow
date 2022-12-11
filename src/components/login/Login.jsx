import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser, setUser } from "../../store/userSlice";
import axios from "axios";
import "./login.css";

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
      <div>
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
