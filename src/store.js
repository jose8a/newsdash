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

    activeNav: {
      sideActive: '',
      activeFeed: '',
    },

    baseServerUrl: "http://localhost:3500",

    sourceCollections: {
      motley: {
        id: 'motley',
        title: 'Motley',
      },
      tech: {
        id: 'tech',
        title: 'Tech',
      },
      sports: {
        id: 'tech',
        title: 'Sports',
      },
      vue: {
        id: 'vue',
        title: 'Vue',
      },
    },

    dataStores: {
      newest: {
        data: [],
      },
      favorites: {},
      bydate: {},
      all: {},
    },

    newsSources: {
      hnews: {
        title: 'Hacker News',
        url: 'https://news.ycombinator.com/',
        endpoint: '/motley/hnews',
      },
      reuters: {
        title: 'Reuters',
        url: 'https://www.reuters.com/',
        endpoint: '/motley/reuters',
      },
      topMedium: {
        title: 'Medium - Top',
        url: 'https://medium.com/browse/top',
        endpoint: '/motley/top-medium',
      },
      theRinger: {
        title: 'The Ringer',
        url: 'https://www.theringer.com/',
        endpoint: '/sports/the-ringer',
      },
      siCom: {
        title: 'Sports Illustrated',
        url: 'https://www.si.com/',
        endpoint: '/sports/si-com',
      },
      sbnation: {
        title: 'SB Nation',
        url: 'https://www.sbnation.com/',
        endpoint: '/sports/sbnation',
      },
      fefront: {
        title: 'FE Front',
        url: 'https://frontendfront.com/',
        endpoint: '/tech/fefront',
      },
      echojs: {
        title: 'Echo JS',
        url: 'http://www.echojs.com/',
        endpoint: '/tech/echo',
      },
      cssTricks: {
        title: 'CSS Tricks',
        url: 'https://css-tricks.com/',
        endpoint: '/tech/css-tricks',
      },
      devTo: {
        title: 'DEV Comm',
        url: 'https://dev.to/',
        endpoint: '/tech/dev-to',
      },
      scotch: {
        title: 'Scotch Devs',
        url: 'https://scotch.io/',
        endpoint: '/tech/scotch',
      },
      perfRocks: {
        title: 'Perf Rocks',
        url: 'http://perf.rocks/articles/',
        endpoint: '/tech/perf-rocks',
      },
      vuedevs: {
        title: 'Vue Devs',
        url: 'https://vuejsdevelopers.com/',
        endpoint: '/vue/vuedevs',
      },
      gator: {
        title: 'Vue Gator',
        url: 'https://alligator.io/vuejs/',
        endpoint: '/vue/gator',
      },
      reddit: {
        title: 'Vue Reddit',
        url: 'https://www.reddit.com/r/vuejs/',
        endpoint: '/vue/reddit',
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
    getCollectionsKeys(state) {
      return Object.keys(state.sourceCollections);
    },
    getSources(state) {
      return state.newsSources;
    },
    getSourceKeys(state) {
      return Object.keys(state.newsSources);
    },
    getLatestFetchedNews(state) {
      return state.dataStores.newest.data;
    },
  },

  // define the possible mutations that can be applied to our state
  mutations: {
    initAppStore(state) {
      // this mutation initializes the store's state from localStorage only
      // IF a backup of the store exists in localStorage
      if (localStorage.getItem('appStore')) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('appStore'))));
      }
    },
    getNews(state, payload) {
      const tempData = payload.data;
      const allItems = state.dataStores.all;
      const newItems = state.dataStores.newest;
      // --- const bydateItems = state.dataStores.bydate;

      // clear the newItems dataStore on each news fetch
      newItems.data = [];

      // check each fetched item (by ID) if it has already been fetch
      // if not previously-fetched -- add to 'newItems',
      // if not previously-fetched -- add to 'allItems',
      // TODO: if not previously-fetched -- add to 'bydateItems'
      tempData.forEach((newsItem) => {
        if (newsItem.sourceId in allItems) {
          console.log(`EXISTS (DON'T SAVE): ${newsItem.sourceId}`);
          return;
        }

        newsItem.favorited = false;
        newsItem.bookmarked = false;
        newItems.data.push(newsItem);
        allItems[newsItem.sourceId] = newsItem;
      });
    },
    fakeGetNews(state, payload) {
      console.log(`FAKE GET: ${payload.id}`);
    },
  },

  actions: {
    fetchNewsSite(context, sourceId) {
      const state = context.state;
      const newsUrl = state.newsSources[sourceId].endpoint;
      console.log(`GETTING URL: ${newsUrl}`);

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
    fetchNewsCollection(context, listName) {
      const state = context.state;
      const newsUrl = `/${listName}`;
      console.log(`GETTING URL: /${listName}`);

      const server = axios.create({
        baseURL: state.baseServerUrl,
        responseType: 'json',
      });

      server.get(newsUrl)
        .then((resp) => {
          console.log(`AXIOS RESP: ${resp.data}`);
          context.commit('getNews', { data: resp.data, id: listName });
        })
        .catch((err) => {
          // TODO: error ACTION to display error banner
          console.log(`AXIOS ERR: ${err}`);
        });
    },
  },
});
