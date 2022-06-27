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
import { required, confirmed, email } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "Polje je obavezno",
});
extend("confirmed", {
  ...confirmed,
  message: "Lozinka i Potvrdjena lozinka nisu iste"
});
extend("email", {
  ...email,
  message: "Neispravan email"
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
