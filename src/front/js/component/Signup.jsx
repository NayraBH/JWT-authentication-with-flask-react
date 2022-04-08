import React, { useState } from "react";
import { signUp } from "../service/signup.js";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(newUser);
      history.push("/login");
    } catch (err) {
      console.log("Signup error: ", err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div className="signup col-4 mx-auto mt-3">
      <h1 className="mt-3 mb-3">Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 row justify-content-between">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              name="password"
              className="form-control"
              id="inputPassword"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
