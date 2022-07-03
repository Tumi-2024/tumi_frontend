// Imports Section
import Vue from "vue";
import axios from "axios";
import qs from "qs";
import { Cookies } from "quasar";
// Main Section
const instance = axios.create({});

instance.defaults.baseURL = process.env.API;

// tumimap.com;
// instance.defaults.baseURL = "http://172.20.10.2:9000/api";
// instance.defaults.baseURL = 'http://127.0.0.1:9013/api/';
// instance.defaults.baseURL = 'http://admin.tumimap.com/api/';
instance.defaults.timeout = 10000;
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

instance.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {
    console.log(error.response);

    const { status } = error.response;
    if (status === 403) {
      Cookies.remove("tumi");
      Cookies.remove("tumi_i");
    }
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = instance;
Vue.prototype.$qs = qs;
