/* eslint-disable quotes */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
// the root, initial state object
  state: {

    baseServerUrl: "http://localhost:7080",

    newsItems: {
      hnews: [],
      reuters: [],
      topMedium: [],
      theRinger: [],
      siCom: [],
      sbnation: [],
      fefront: [],
      echojs: [],
      cssTricks: [],
      devTo: [],
      scotch: [],
      perfRocks: [],
      vuedevs: [],
      gator: [],
      reddit: [],
    },
  },

  // define the getters for the store to be available to app components
  getters: {
    getBaseUrl(state) {
      return () => state.baseServerUrl;
    },
    getNewsItems(state) {
      return () => state.newsItems;
    },
  },

  // define the possible mutations that can be applied to our state
  mutations: {
  },
});
