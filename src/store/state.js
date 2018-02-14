/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

export default {
  activeNav: {
    sideActive: '',
    activeFeed: '',
  },

  baseServerUrl: "http://localhost:3500",
  newsFeedLoading: false,
  activeSidebar: 'MIXES',

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
};
