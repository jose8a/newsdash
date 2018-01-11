/* eslint-disable quotes */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
// the root, initial state object
  state: {

    baseServerUrl: "http://localhost:3500",

    sourceCollections: [
      'motley',
      'tech',
      'vue',
      'sports',
    ],

    newsSources: {
      hnews: {
        title: 'Hacker News',
        url: 'https://news.ycombinator.com/',
        endpoint: '/motley/hnews',
        data: [],
      },
      reuters: {
        title: 'Reuters',
        url: 'https://www.reuters.com/',
        endpoint: '/motley/reuters',
        data: [],
      },
      topMedium: {
        title: 'Medium - Top Stories',
        url: 'https://medium.com/browse/top',
        endpoint: '/motley/top-medium',
        data: [],
      },
      theRinger: {
        title: 'The Ringer',
        url: 'https://www.theringer.com/',
        endpoint: '/sports/the-ringer',
        data: [],
      },
      siCom: {
        title: 'Sports Illustrated',
        url: 'https://www.si.com/',
        endpoint: '/sports/si-com',
        data: [],
      },
      sbnation: {
        title: 'SB Nation',
        url: 'https://www.sbnation.com/',
        endpoint: '/sports/sbnation',
        data: [],
      },
      fefront: {
        title: 'Front End Front',
        url: 'https://frontendfront.com/',
        endpoint: '/tech/fefront',
        data: [],
      },
      echojs: {
        title: 'Echo JS',
        url: 'http://www.echojs.com/',
        endpoint: '/tech/echo',
        data: [],
      },
      cssTricks: {
        title: 'CSS Tricks',
        url: 'https://css-tricks.com/',
        endpoint: '/tech/css-tricks',
        data: [],
      },
      devTo: {
        title: 'The DEV Community',
        url: 'https://dev.to/',
        endpoint: '/tech/dev-to',
        data: [],
      },
      scotch: {
        title: 'Scotch IO - Web Dev community',
        url: 'https://scotch.io/',
        endpoint: '/tech/scotch',
        data: [],
      },
      perfRocks: {
        title: 'Perf Rocks - Articles',
        url: 'http://perf.rocks/articles/',
        endpoint: '/tech/perf-rocks',
        data: [],
      },
      vuedevs: {
        title: 'Vue JS Developers',
        url: 'https://vuejsdevelopers.com/',
        endpoint: '/vue/vuedevs',
        data: [],
      },
      gator: {
        title: 'Vue Articles - Alligator IO',
        url: 'https://alligator.io/vuejs/',
        endpoint: '/vue/gator',
        data: [],
      },
      reddit: {
        title: 'Vue Reddit Community',
        url: 'https://www.reddit.com/r/vuejs/',
        endpoint: '/vue/reddit',
        data: [],
      },
    },
  },

  // define the getters for the store to be available to app components
  getters: {
    getBaseUrl(state) {
      return () => state.baseServerUrl;
    },
    getSourceCollections(state) {
      return () => state.sourceCollections;
    },
    getSources(state) {
      return () => state.newsSources;
    },
    getSourceKeys(state) {
      return () => Object.keys(state.newsSources);
    },
  },

  // define the possible mutations that can be applied to our state
  mutations: {
  },
});
