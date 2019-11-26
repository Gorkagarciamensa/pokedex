import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import fb from "./fb";
import VueChatScroll from "vue-chat-scroll";

import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts), Vue.component("apexchart", VueApexCharts);
Vue.prototype.$eventBus = new Vue();

Vue.use(VueChatScroll);

Vue.config.productionTip = false;

fb.auth().onAuthStateChanged(user => {
  if (user) {
    var userAuth = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL
    };
    store.dispatch("set_user", userAuth);
  } else {
    store.dispatch("set_user", null);
  }
});

new Vue({
  router,
  store,
  vuetify,
  fb,

  render: h => h(App)
}).$mount("#app");
