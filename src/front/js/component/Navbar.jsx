import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Navbar = () => {
  const history = useHistory();
  const { store, actions } = useContext(Context);

  const handleClick = () => {
    if (localStorage.token) {
      localStorage.removeItem("token");
      actions.setLogged(false);
    }
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">JWT Authentication</span>
        </Link>
        <div className="ml-auto">
          <Link to="/signup">
            <button className="btn btn-primary me-3">Sign up</button>
          </Link>
          {store.logged ? (
            <button className="btn btn-primary" onClick={handleClick}>
              Logout
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleClick}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
