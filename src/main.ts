import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import qs from 'qs';
import wx from 'weixin-js-sdk';
import layer from 'vue-layer';
import 'vue-layer/lib/vue-layer.css';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.wx = wx;
Vue.prototype.$layer = layer(Vue);
Vue.prototype.qs = qs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
