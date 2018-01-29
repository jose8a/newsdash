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

    let faveKeys = null;
    if (favorites !== null) {
      faveKeys = Object.keys(favorites);

      faveKeys.forEach((id) => {
        faves.push(allItems[id]);
      });
    }

    return faves;
  },
  getNumFavorites(state) {
    const favorites = state.dataStores.favorites;

    if (favorites !== null) {
      const faveKeys = Object.keys(state.dataStores.favorites);
      return faveKeys.length;
    }

    return 0;
  },
  getBookmarks(state) {
    console.log("I am GETBOOKMARKS getter!!");

    const bookmarkItems = [];
    const bookmarkIds = state.dataStores.bookmarks;
    const allItems = state.dataStores.all;

    let bmIds = null;
    if (bookmarkIds !== null) {
      bmIds = Object.keys(bookmarkIds);

      bmIds.forEach((id) => {
        bookmarkItems.push(allItems[id]);
      });
    }

    return bookmarkItems;
  },
  getNumBookmarks(state) {
    const bookmarkIds = state.dataStores.bookmarks;

    if (bookmarkIds !== null) {
      const objKeys = Object.keys(state.dataStores.bookmarks);
      return objKeys.length;
    }

    return 0;
  },
};
