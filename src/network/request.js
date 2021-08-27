import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  });

  instance.interceptors.request.use(
    config => {
      console.log("config", config);
      return config;
    },
    err => {
      console.log("request_err");
      return err;
    }
  );

  instance.interceptors.response.use(
    res => {
      console.log("response", res);
      return res.data;
    },
    err => {
      // console.log("response_err ", err);
      return Promise.reject("错误");
    }
  );

  return instance(config);
}
