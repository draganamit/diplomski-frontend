import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { ValidationProvider, ValidationObserver } from "vee-validate";

import "@/assets/icons/style.css"

Vue.config.productionTip = false

Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required",
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
