const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      logged: false,
    },
    actions: {
      setLogged: (log) => {
        const store = getStore();
        setStore({ ...store, logged: log });
      },

      getMessage: () => {
        // fetching data from the backend
        // fetch(process.env.BACKEND_URL + "/api/hello")
        // 	.then(resp => resp.json())
        // 	.then(data => setStore({ message: data.message }))
        // 	.catch(error => console.log("Error loading message from backend", error));
      },
    },
  };
};

export default getState;
