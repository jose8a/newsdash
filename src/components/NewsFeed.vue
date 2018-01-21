<template>
    <div id='newsfeed' class="content">
      <div id="feed-info">
        <h2>
          <span>{{ activeFeed }} Feed: </span>
          <span>{{ latestNews.length }} New Items</span>
        </h2>
      </div>

      <div v-if="nilNewItems" class="postItem flash-warn">
        <p class="post-url">Zero new items retrieved.</p>
      </div>

      <news-item v-for="item in latestNews" :newsbit="item" :key="item.sourceId"></news-item>
    </div><!-- end:#newsfeed -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

import { mapGetters } from 'vuex';
import NewsItem from '@/components/NewsItem';

export default {
  name: 'newsfeed',
  components: {
    NewsItem,
  },
  computed: {
    ...mapGetters({
      serverUrl: 'getBaseUrl',
      apiSources: 'getSources',
      sourceKeys: 'getSourceKeys',
      latestNews: 'getLatestFetchedNews',
    }),
    activeFeed() {
      return this.$store.state.activeNav.activeFeed;
    },
    nilNewItems() {
      return this.latestNews.length === 0;
    },
  },
};
</script>

<style>
</style>
