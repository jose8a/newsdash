<template>
    <div id='timeline'>
      <div class="data-actions">
        <button v-on:click="getTwits('def')">Default</button>
        <button v-on:click="getTwits('md')">5 Days</button>
        <button v-on:click="getTwits('mt')">600 Tweets</button>
        <!-- button v-on:click="getTwits('sid')">Since ID</button -->
        <button v-on:click="saveTwits">Save Tweets</button>
      </div>
      <div id="cached-list">
        <div class="subheading-4">Cached</div>
        <router-link  v-for="tl in cachedItems" :to="listPath(tl)" class="cached-item"
                      v-bind:class="{active: (tl === activeList)}" tag="div" :key="tl">
          {{ tl.replace(/-/g, ' ') }}
        </router-link>
        <div class="subheading-4">Tags</div>
        <div id="filters">
          <button v-for="filter in filterTags"
                  v-on:click="filterTwits(filter)"
                  v-bind:class="{active: (filter === filterType)}">{{ filter }}</button>
        </div>
        <div class="subheading-4" id="filterMsg">Misc Filters</div>
        <div v-on:click="urlOnly" v-bind:class="urlonly" id='url-only'>url-only</div>
        <div v-on:click="remTweets" v-bind:class="removetweets" id='rem-tweets'>non-twitter</div>
      </div> <!-- end:cached-list -->
      <div class="cardlist">
        <div class="subheading-4" id="filterMsg">{{ `Num Results: ${numFilteredTwits}` }}</div>
        <div v-for="twit in filteredTwits" class="card timeline-el">
          <a v-bind:href="twit.url" class="twit-el" :id="twit.id">
            <div class="content">{{twit.content}}</div>
          </a>
            <div class="content-sub">
              <div class="twit-date">{{getDate(twit)}}</div>
              <div class="twit-owner">{{twit.owner + ' -- @' + twit.ownerAlias}}</div>
              <div  v-on:click="bookit({id: twit.id, url: twit.url, content: twit.content})" class="bookit">&#9829;</div>
            </div>
        </div><!-- end:filteredTwits -->
      </div><!-- end:cardlist -->
    </div><!-- end:#timeline -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

import axios from 'axios';
// --- import cheerio from 'cheerio';

const http = axios.create({
  baseURL: 'http://localhost:5566/',
});

export default {
  name: 'timeline',
  data() {
    return {
      storageKey: 'savedTimelines',
      storageFilter: 'activeFilter',
      twits: [],
      savedTwits: {},
      filterList: [
        'CLEAR',
        'design',
        'ux',
        'ui',
        'css',
        'svg',
        'js',
        'javascript',
        'frontend',
        'develop',
        'webdev',
        'vue',
        'd3',
        'responsive',
        'theme',
        'color',
        'anima',
        'icon',
        'logo',
        'code',
        'art',
      ],
      filterType: 'CLEAR',
      filterUrlOnly: true,
      filterRemTweets: true,
      urlonly: 'active',
      removetweets: 'active',
      numFilteredTwits: 0,
      bookmarksKey: 'bookmarks',
      bookmarks: null,
    };
  },
  // On a route update to
  beforeRouteUpdate(to, from, next) {
    // --- console.log(`ROUTE::UPDATE -- ${from} ----> ${to}`);
    // --- console.log(to);
    // --- const listname = this.$route.params.listname;

    const listname = to.params.listname;
    console.log(`LISTNAME: ${listname}`);

    // ensure there is at least an empty 'timelines cache' available
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
    }

    // If there is a cached timeline for this route, display it's contents
    const savedTimelines = JSON.parse(localStorage.getItem(this.storageKey));
    if (savedTimelines[listname] && savedTimelines[listname].length > 0) {
      this.savedTwits = { ...savedTimelines };
      this.twits = this.savedTwits[listname].slice();
    }
    next();
  },
  mounted() {
    const listname = this.$route.params.listname;

    // ensure there is at least an empty 'timelines cache' available
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
    }

    // ensure there is at least an empty 'activeFilter' available
    if (!localStorage.getItem(this.storageFilter)) {
      localStorage.setItem(this.storageFilter, 'CLEAR');
    }

    // ensure there is at least an empty 'bookmarks' available
    if (!localStorage.getItem(this.bookmarksKey)) {
      localStorage.setItem(this.bookmarksKey, JSON.stringify([]));
    }

    this.filterType = localStorage.getItem(this.storageFilter);
    this.bookmarks = JSON.parse(localStorage.getItem(this.bookmarksKey));

    // If there is a cached timeline for this route, display it's contents
    const savedTimelines = JSON.parse(localStorage.getItem(this.storageKey));
    if (savedTimelines[listname] && savedTimelines[listname].length > 0) {
      this.savedTwits = { ...savedTimelines };
      this.twits = this.savedTwits[listname].slice();
    }
  },
  computed: {
    activeList() {
      return this.$route.path.split('/').pop();
    },
    cachedItems() {
      return Object.keys(this.savedTwits);
    },
    filterTags() {
      return this.filterList;
    },
    filteredTwits() {
      let fTwits = [];

      // --- if (this.filterType === 'CLEAR') {
      // ---   console.log(this.twits);
      // ---   return this.twits;
      // --- }

      // --- const regex = /design/i;
      const regex = new RegExp(this.filterType, 'i');
      const invalidUrlRegex = new RegExp('#NONE', 'i');
      const isTwitterUrl = new RegExp('twitter.com', 'i');
      const removeEmptyUrl = url => invalidUrlRegex.test(url) && this.filterUrlOnly;
      const removeTwitterUrl = url => isTwitterUrl.test(url) && this.filterRemTweets;

      if (this.filterType === 'CLEAR') {
        console.log(this.twits);
        fTwits = this.twits;
      } else {
        this.twits.forEach((twit) => {
          if (removeEmptyUrl(twit.url) || removeTwitterUrl(twit.url)) {
            console.warn(`Removed: ${twit.id} -- ${twit.url}`);
          } else if (regex.test(twit.content)) {
            fTwits.push(twit);
          }
        });
      }

      console.log(fTwits);
      this.numFilteredTwits = fTwits.length;
      return fTwits;
    },
  },
  methods: {
    listPath(listname) {
      return { name: 'timeline', params: { listname: `${listname}` } };
    },
    filterTwits(filter) {
      console.log(`old filter: ${this.storageFilter} ===> ${filter}`);
      localStorage.setItem(this.storageFilter, filter);
      this.filterType = filter;
    },
    urlOnly() {
      this.filterUrlOnly = !this.filterUrlOnly;
      this.urlonly = this.urlonly === 'active' ? '' : 'active';
      this.filterType = 'url-only';
    },
    remTweets() {
      this.filterRemTweets = !this.filterRemTweets;
      this.removetweets = this.removetweets === 'active' ? '' : 'active';
      this.filterType = 'rem-tweets';
    },
    getDate(twit) {
      const [weekDay, month, numDay, rest] = [...twit.createdAt.split(' ')];
      return `${weekDay} ${month} ${numDay} ${rest}`;
    },
    bookit(twit) {
      // DEBUG --- console.log(`BOOKIT: ${twit.id} -- ${twit.url}`);
      // DEBUG --- console.log(localStorage.getItem(this.bookmarksKey));

      http({ method: 'post', url: 'meta', data: { url: twit.url, content: twit.content } })
        .then((response) => {
          console.log(response.data.meta);
          this.bookmarks.push(response.data.meta);
          localStorage.setItem(this.bookmarksKey, JSON.stringify(this.bookmarks));
        });
    },
    saveTwits() {
      const listname = this.$route.params.listname;

      const savedTimelines = JSON.parse(localStorage.getItem(this.storageKey));
      savedTimelines[listname] = this.twits.slice();
      this.savedTwits = { ...savedTimelines };

      const twits = JSON.stringify(this.savedTwits);
      console.log('Saving Twits ...');
      localStorage.setItem(this.storageKey, twits);

      Object.keys(this.savedTwits).forEach((item) => {
        console.log(`timeline: ${item}`);
      });
    },
    getTwits(type) {
      const listname = this.$route.params.listname;
      const base = `lists/${listname}`;
      let endpoint = base;

      if (type === 'mt') {
        endpoint = `${base}/mt/600`;
      }

      if (type === 'md') {
        endpoint = `${base}/md/5`;
      }

      console.log('SUCCESS: getting Timeline ...');
      // --- http.get(`lists/${listname}`)
      http.get(endpoint)
        .then((response) => {
          this.twits = response.data.data;
        })
        .catch((error) => {
          console.log('Error: getting timeline ...');
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>
