/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
function isEmpty(obj) {
  // CREDIT:
  // https://stackoverflow.com/questions/4994201/is-object-empty
  //
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

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
    if (!isEmpty(favorites)) {
      faveKeys = Object.keys(favorites);

      faveKeys.forEach((id) => {
        if (!allItems[id]) {
          console.log(`item with id:${id} in allItems is missing -- skip it!`);
          return;
        }
        faves.push(allItems[id]);
      });
    }

    return faves;
  },
  getNumFavorites(state) {
    const favorites = state.dataStores.favorites;

    if (!isEmpty(favorites)) {
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
    if (!isEmpty(bookmarkIds)) {
      bmIds = Object.keys(bookmarkIds);

      bmIds.forEach((id) => {
        if (!allItems[id]) {
          console.log(`item with id:${id} in allItems is missing -- skip it!`);
          return;
        }
        bookmarkItems.push(allItems[id]);
      });
    }

    return bookmarkItems;
  },
  getNumBookmarks(state) {
    const bookmarkIds = state.dataStores.bookmarks;

    if (!isEmpty(bookmarkIds)) {
      const objKeys = Object.keys(state.dataStores.bookmarks);
      return objKeys.length;
    }

    return 0;
  },
};
