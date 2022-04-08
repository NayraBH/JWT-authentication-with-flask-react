import React, { useState, useContext } from "react";
import { loginUser } from "../service/login.js";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext.js";

const Login = () => {
  const history = useHistory();
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = {
        email: email,
        password: password,
      };
      const response = await loginUser(userCredentials);
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        actions.setLogged(true);
        history.push("/private");
      }
    } catch (err) {
      console.log("Login error: ", err);
    }
  };

  return (
    <div className="login col-4 m-auto">
      <h1 className="mt-3 mb-3">Login</h1>
      <form className="row g-3 d-flex flex-column" onSubmit={userLogin}>
        <div className="col-auto">
          <label className="mb-3">Email</label>
          <input
            type="text"
            className="form-control"
            id="staticEmail2"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </div>
        <div className="col-auto">
          <label className="mb-3">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
