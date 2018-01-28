/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
export default {
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
};
