import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Private = () => {
  return localStorage.token ? (
    <div className="container col-8 bg-danger d-flex justify-content-center mt-3 mb-3">
      <div className="text-light mt-3">
        <h2>Private content</h2>
        <p>This page is only for logged users</p>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Private;
