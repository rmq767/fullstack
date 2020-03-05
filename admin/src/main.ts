import Vue from "vue";
import App from "./App.vue";
import "./plugins/element";
import "./plugins/avue";
import router from "./router";
import axios from "axios";
// import EleFrom from "vue-ele-form";

Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000"
});
// Vue.use(EleFrom);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
