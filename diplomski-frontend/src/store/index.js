import Vue from "vue";
import Vuex from 'vuex';
import users from './modules/users.js';
import categories from './modules/categories.js';
import products from './modules/products.js';


import axios from "axios";

Vue.use(Vuex)
const token = localStorage.getItem("token");
const authAxios = axios.create ({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers:{
        Authorization: token
    }
});

const baseAxios = axios.create ({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
  
});
export default new Vuex.Store({
  state: {
    authAxios:authAxios,
    baseAxios:baseAxios
  },
  mutations:
  {
    setAuthAxiosHeader: (state, header) => state.authAxios.defaults.headers["Authorization"] = header
  },
  modules: {
      users,
      categories,
      products
  }
})

