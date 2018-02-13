<template>
    <div id='newsfeed' class="content">
      <div id="feed-info">
        <div v-if="isFeedLoading" class="feed-info" id="feed-spinner">
          <span><i class="fa fa-spinner fa-spin fa-3x"></i></span>
          <span>Loading ...</span>
        </div>

        <div class="feed-info" v-else>
          <span>{{ activeFeed }} Feed: </span>
          <span>{{ latestNews.length }} New Items</span>
        </div>
      </div>

      <div v-if="nilNewItems" class="postItem flash-warn">
        <p class="post-url">Zero new items retrieved.</p>
      </div>

      <news-item v-for="item in latestNews"
                  :newsbit="item" :key="item.sourceId"></news-item>
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
      latestNews: 'getLatestFetchedNews',
      isFeedLoading: 'getIsFeedLoading',
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
