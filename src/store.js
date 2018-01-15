/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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

    currentNews: {
      id: '',
      data: [],
    },

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
        title: 'Medium - Top',
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
        title: 'FE Front',
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
        title: 'DEV Comm',
        url: 'https://dev.to/',
        endpoint: '/tech/dev-to',
        data: [],
      },
      scotch: {
        title: 'Scotch Devs',
        url: 'https://scotch.io/',
        endpoint: '/tech/scotch',
        data: [],
      },
      perfRocks: {
        title: 'Perf Rocks',
        url: 'http://perf.rocks/articles/',
        endpoint: '/tech/perf-rocks',
        data: [],
      },
      vuedevs: {
        title: 'Vue Devs',
        url: 'https://vuejsdevelopers.com/',
        endpoint: '/vue/vuedevs',
        data: [],
      },
      gator: {
        title: 'Vue Gator',
        url: 'https://alligator.io/vuejs/',
        endpoint: '/vue/gator',
        data: [],
      },
      reddit: {
        title: 'Vue Reddit',
        url: 'https://www.reddit.com/r/vuejs/',
        endpoint: '/vue/reddit',
        data: [],
      },
    },
  },

  // define the getters for the store to be available to app components
  getters: {
    getBaseUrl(state) {
      return state.baseServerUrl;
    },
    getSourceCollections(state) {
      return state.sourceCollections;
    },
    getSources(state) {
      return state.newsSources;
    },
    getSourceKeys(state) {
      return Object.keys(state.newsSources);
    },
    getLatestFetchedNews(state) {
      return state.currentNews.data;
    },
  },

  // define the possible mutations that can be applied to our state
  mutations: {
    getNews(state, payload) {
      state.currentNews.data = payload.data;
      state.currentNews.id = payload.id;
    },
  },

  actions: {
    fetchNews(context, sourceId) {
      const state = context.state;
      const newsUrl = state.newsSources[sourceId].endpoint;

      const server = axios.create({
        baseURL: state.baseServerUrl,
        responseType: 'json',
      });

      server.get(newsUrl)
        .then((resp) => {
          console.log(`AXIOS RESP: ${resp.data}`);
          context.commit('getNews', { data: resp.data, id: sourceId });
        })
        .catch((err) => {
          // TODO: error ACTION to display error banner
          console.log(`AXIOS ERR: ${err}`);
        });
    },
  },
});
