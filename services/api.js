import Axios from "axios";

let urls = {
  test: `http://localhost:3333/`,
  development: "http://localhost:3333/v1/",
  production: "http://localhost:3333/v1/",
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
