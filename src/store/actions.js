/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import firebase from '@/firebase';

export default {
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
};
