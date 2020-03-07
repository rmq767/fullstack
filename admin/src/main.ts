import Vue from "vue";
import App from "./App.vue";
import "./plugins/element";
import "./plugins/avue";
import router from "./router";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$httpajax = http;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
