import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3001/api",
});

http.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("JWT");
    if (accessToken) {
      request.headers = { Authorization: `Bearer ${accessToken}` };
    }
    console.log("inside request interceptor", request);
    return request;
  }
  //   ,
  //   (error) => {
  //     console.log("inside interceptor");
  //     return Promise.reject(error);
  //   }
);
