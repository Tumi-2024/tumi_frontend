// Imports Section
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

// Main Section
const instance = axios.create({})

// instance.defaults.baseURL = process.env.API
instance.defaults.baseURL = 'http://admin.tumi.sunwook.com/api/';
instance.defaults.timeout = 10000
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.$axios = instance
Vue.prototype.$qs = qs
