import 'babel-polyfill';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(VueAnalytics, {
  id: 'UA-131509990-1',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
