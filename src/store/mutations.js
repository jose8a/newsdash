/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

// ---import Vue from 'vue';
import firebase from '@/firebase';

export default {
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
    const userId = state.firebaseProps.userId;
    const faves = state.dataStores.favorites;

    const favoritesRef = firebase.database.ref(`/userData/${userId}/favorites`);
    const allItemsRef = firebase.database.ref(`/userData/${userId}/allItems`);

    // 1 - IF local-faves NOT empty AND already in local-faves, remove from remote-faves
    // 1a - set nextAllItemsFavorited = false
    if (faves && faves[id]) {
      console.log(`Unsetting favorite -- ${id}`);
      favoritesRef.child(id).set(null);
      allItemsRef.child(id).child('favorited').set('false');
      return;
    }
    // 2 - IF not in local-faves, add to remote-faves
    // 2a - set nextAllItemsFavorited = true
    favoritesRef.child(id).set(true);
    allItemsRef.child(id).child('favorited').set('true');
    console.log(`Setting favorite -- ${id}`);
  },
  updateBookmarks(state, payload) {
    const id = payload.id;
    const userId = state.firebaseProps.userId;
    const bmarks = state.dataStores.bookmarks;

    const bookmarksRef = firebase.database.ref(`/userData/${userId}/bookmarks`);
    const allItemsRef = firebase.database.ref(`/userData/${userId}/allItems`);

    // 1 - IF already in local-bmarks, set removal from remote-bmarks
    // 1a - set nextAllItemsBookmarked = false
    if (bmarks && bmarks[id]) {
      console.log(`Unsetting bookmark -- ${id}`);
      bookmarksRef.child(id).set(null);
      allItemsRef.child(id).child('bookmarked').set('false');
      return;
    }
    // 2 - IF not in local-bmarks, add to remote-bmarks
    // 2a - set nextAllItemsBookmarked = true
    bookmarksRef.child(id).set(true);
    allItemsRef.child(id).child('bookmarked').set('true');
    console.log(`Setting bookmark -- ${id}`);
  },
  updateLocalBookmarks(state, payload) {
    state.dataStores.bookmarks = payload;
  },
  updateLocalFavorites(state, payload) {
    state.dataStores.favorites = payload;
  },
  updateLocalAllItems(state, payload) {
    // TODO:
    state.dataStores.all = payload;
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
};
