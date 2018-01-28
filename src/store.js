/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import firebase from '@/firebase';

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

    firebaseProps: {
      userId: "admin",
    },

    dataStores: {
      newest: {
        data: [],
      },
      favorites: {},
      bookmarks: {},
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
    getFavorites(state) {
      const faves = [];
      const favorites = state.dataStores.favorites;
      const allItems = state.dataStores.all;

      const faveKeys = Object.keys(favorites);
      faveKeys.forEach((id) => {
        faves.push(allItems[id]);
      });

      return faves;
    },
    getNumFavorites(state) {
      const faveKeys = Object.keys(state.dataStores.favorites);
      return faveKeys.length;
    },
    getBookmarks(state) {
      const bookmarkItems = [];
      const bookmarkIds = state.dataStores.bookmarks;
      const allItems = state.dataStores.all;

      const bmIds = Object.keys(bookmarkIds);
      bmIds.forEach((id) => {
        bookmarkItems.push(allItems[id]);
      });

      return bookmarkItems;
    },
    getNumBookmarks(state) {
      const objKeys = Object.keys(state.dataStores.bookmarks);
      return objKeys.length;
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
      const userId = state.firebaseProps.userId;
      const USERDATA = `/userData/${userId}`;
      const ALLITEMS = `${USERDATA}/allItems`;
      const dbAllItemsRef = firebase.database.ref(ALLITEMS);
      const updateItems = {};

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
          return;
        }

        newsItem.favorited = false;
        newsItem.bookmarked = false;
        newItems.data.push(newsItem);
        updateItems[newsItem.sourceId] = newsItem;
        allItems[newsItem.sourceId] = newsItem;
      });

      dbAllItemsRef.update(updateItems);
    },
    updateFavorites(state, payload) {
      const id = payload.id;
      const favorites = state.dataStores.favorites;
      const allItems = state.dataStores.all;

      const newsItem = allItems[id];

      // add/remove id to/from 'favorites' datastore
      if (favorites[id]) {
        // -- rm 'favorited' property on the newsItem in the 'allNews' collection
        // -- delete the property, in 'favorites', then return
        newsItem.favorited = false;
        Vue.delete(favorites, id);

        return;
      }

      // -- else add the ID to favorites
      // -- and, toggle 'favorited' property on the newsItem in the 'allNews' collection
      Vue.set(favorites, id, newsItem.fetchDate);
      allItems[id].favorited = true;
    },
    updateBookmarks(state, payload) {
      // 0 - SETUP
      const id = payload.id;
      const userId = state.firebaseProps.userId;
      const bmarks = state.dataStores.bookmarks;
      // const firebaseRefs = state.firebaseRefs;

      console.log(`userId ==> ${userId}`);
      const bookmarksRef = firebase.database.ref(`/userData/${userId}/bookmarks`);
      // --- const favoritesRef = firebase.database.ref(`/userData/${userId}/favorites`);
      const allItemsRef = firebase.database.ref(`/userData/${userId}/allItems`);
      // --- const sourcesRef = firebase.database.ref(`/userData/${userId}/newsSources`);
      // --- const collectionsRef = firebase.database.ref(`/userData/${userId}/sourceCollections`);
      // --- const userDataRef = firebase.database.ref(`/userData/${userId}`);

      // 1 - IF already in local-bmarks, set removal from remote-bmarks
      // 1a - set nextAllItemsBookmarked = false
      if (bmarks[id]) {
        console.log(`Unsetting bookmark -- ${id}`);
        bookmarksRef.child(id).set(null);
        allItemsRef.child(id).child('bookmarked').set('false');
        return;
      }
      // 2 - IF not in local-bmarks, add to remote-bmarks
      // 2a - set nextAllItemsBookmarked = true
      // const newBookmarkRef = dbBookmarksRef.set({`${id}`: true});
      bookmarksRef.child(id).set(true);
      allItemsRef.child(id).child('bookmarked').set('true');
      console.log(`Setting bookmark -- ${id}`);
    },
    updateLocalBookmarks(state, payload) {
      // TODO:
      console.log(payload);
      console.log("Gotta update local bookmarks!!");

      state.dataStores.bookmarks = payload;
    },
    updateLocalFavorites(state, payload) {
      // TODO:
      console.log(payload);
    },
    updateLocalAllItems(state, payload) {
      // TODO:
      console.log(payload);
    },
    createdRemoteBookmarks(state, payload) {
      // TODO:
      console.log(payload);
    },
    createdRemoteFavorites(state, payload) {
      // TODO:
      console.log(payload);
    },
    createdRemoteAllItems(state, payload) {
      // TODO:
      console.log(payload);
    },
  },

  actions: {
    fetchFirebase(context, id) {
      const USERDATA = `/userData/${id}`;
      const FAVORITES = `${USERDATA}/favorites`;
      const BOOKMARKS = `${USERDATA}/bookmarks`;
      const ALLITEMS = `${USERDATA}/allItems`;

      const dbUserDataRef = firebase.database.ref(USERDATA);
      const dbBookmarksRef = firebase.database.ref(BOOKMARKS);
      const dbFavoritesRef = firebase.database.ref(FAVORITES);
      const dbAllItemsRef = firebase.database.ref(ALLITEMS);
      // --- const dbSourcesRef = firebaseRefs.sources(id);
      // --- const dbCollectionsRef = firebaseRefs.collections(id);

      console.log(`Initial Firebase Sync for user: ${id}`);
      dbBookmarksRef.once('value')
        .then((snapshot) => {
          if (snapshot.val() !== null) {
            // TODO: write updateLocalBookmarks mutation
            context.commit('updateLocalBookmarks', snapshot.val());
            return;
          }

          // TODO: write createdRemoteBookmarks mutation
          dbBookmarksRef.set(context.state.dataStores.bookmarks);
          context.commit('createdRemoteBookmarks', 'Remote bookmarks: CREATED.');
        });

      dbFavoritesRef.once('value')
        .then((snapshot) => {
          if (snapshot.val() !== null) {
            // TODO: write updateLocalFavorites mutation
            context.commit('updateLocalFavorites', 'Remote favorites: FOUND.');
            return;
          }

          // TODO: write createdRemoteFavorites mutation
          // dbFavoritesRef.set({ favorites: context.state.dataStores.favorites });
          dbUserDataRef.child('favorites').set({ favorites: context.state.dataStores.favorites });
          context.commit('createdRemoteFavorites', 'Remote favorites: CREATED.');
        });

      dbAllItemsRef.once('value')
        .then((snapshot) => {
          if (snapshot.val() !== null) {
            // TODO: write updateLocalAllItems mutation
            context.commit('updateLocalAllItems', 'Remote all-items: FOUND.');
            return;
          }

          // TODO: write createdRemoteAllItems mutation
          dbAllItemsRef.set(context.state.dataStores.all);
          context.commit('createdRemoteAllItems', 'Remote all-items: CREATED.');
        });

      dbBookmarksRef.on('value', (snapshot) => {
        // TODO: write updateLocalBookmarks mutation
        context.commit('updateLocalBookmarks', snapshot.val());
      });

      dbFavoritesRef.on('value', (snapshot) => {
        // TODO: write updateLocalFavorites mutation
        context.commit('updateLocalFavorites', snapshot.val());
      });

      dbAllItemsRef.on('value', (snapshot) => {
        // TODO: write updateLocalFavorites mutation
        context.commit('updateLocalAllItems', snapshot.val());
      });
    },
    fetchNewsSite(context, sourceId) {
      const state = context.state;
      const newsUrl = state.newsSources[sourceId].endpoint;

      const server = axios.create({
        baseURL: state.baseServerUrl,
        responseType: 'json',
      });

      server.get(newsUrl)
        .then((resp) => {
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

      const server = axios.create({
        baseURL: state.baseServerUrl,
        responseType: 'json',
      });

      server.get(newsUrl)
        .then((resp) => {
          context.commit('getNews', { data: resp.data, id: listName });
        })
        .catch((err) => {
          // TODO: error ACTION to display error banner
          console.log(`AXIOS ERR: ${err}`);
        });
    },
    toggleFavorite(context, id) {
      context.commit('updateFavorites', { id });
    },
    toggleBookmark(context, id) {
      context.commit('updateBookmarks', { id });
    },
  },
});
