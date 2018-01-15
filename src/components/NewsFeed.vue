<template>
    <div id='newsfeed' class="content">
      <h2>News Feed</h2>
        <div v-for="item in latestNews" :id="item.sourceId" class="postItem" :class="item.source">
          <p class="post-url"><a :href="item.url">{{ item.title }}</a></p>
          <p class="post-host"> {{ postHost(item.url) }}</p>
          <p class="post-date"> {{ item.fetchDate }}</p>
          <!-- p class="post-category"> {{ postType }}</p -->
        </div>
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
  computed: {
    ...mapGetters({
      serverUrl: 'getBaseUrl',
      apiSources: 'getSources',
      sourceKeys: 'getSourceKeys',
      latestNews: 'getLatestFetchedNews',
    }),
  },
  methods: {
    postHost(url) {
      return url.split('/')[2];
    },
  },
};
</script>

<style>
</style>
