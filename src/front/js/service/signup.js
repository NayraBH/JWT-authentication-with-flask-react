import { URL } from "./index.js";

export const signUp = (user) => {
  return fetch(`${URL}/api/signup`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
