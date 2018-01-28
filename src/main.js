// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import appStore from './store/index';

Vue.config.productionTip = false;

const store = appStore;

// save the store's state to localStorage on every
// store update
store.subscribe((mutation, state) => {
  localStorage.setItem('appStore', JSON.stringify(state));
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate() {
    this.$store.commit('initAppStore');
  },
});
