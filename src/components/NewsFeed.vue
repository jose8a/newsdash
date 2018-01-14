<template>
    <div id='newsfeed' class="content">
      <h2>News Feed</h2>
      <ul>
        <li v-for="item in latestNews" :id="item.sourceId" class="postItem" :class="item.source">
          <p><a :href="item.url">{{ item.title }}</a></p>
          <p class=""> {{ postHost(item.url) }}</p>
        </li>
      </ul>
    </div><!-- end:#newsfeed -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

import { mapGetters } from 'vuex';

export default {
  name: 'newsfeed',
  data() {
    return {
      server: null,
      newsItems: [],
    };
  },
  mounted() {
  },
  computed: mapGetters({
    serverUrl: 'getBaseUrl',
    apiSources: 'getSources',
    sourceKeys: 'getSourceKeys',
    latestNews: 'getLatestFetchedNews',
  }),
  methods: {
    postHost(url) {
      return url.split('/')[2];
    },
    news() {
      return this.newsItems;
    },
  },
};
</script>

<style>
</style>
