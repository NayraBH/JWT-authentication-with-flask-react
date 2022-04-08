import { URL } from "./index.js";

export const loginUser = (userCredentials) => {
  return fetch(`${URL}/api/login`, {
    method: "POST",
    body: JSON.stringify(userCredentials),
    headers: {
      "Content-type": "application/json",
    },
  });
};
