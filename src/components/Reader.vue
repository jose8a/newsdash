<template>
    <div id='readlist' class="content">
      <div id="feed-info">
        <h2>
          <span>Bookmarks Feed: </span>
          <span>{{ numBookmarks }} Items</span>
        </h2>
      </div>

      <div v-if="nilBookmarkItems" class="postItem flash-warn">
        <p class="post-url">You have Zero Bookmarked items on your Shelf.</p>
      </div>

      <news-item v-for="item in sortedBookmarks" :newsbit="item" :key="item.sourceId"></news-item>
    </div><!-- end:#newsfeed -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

import { mapGetters } from 'vuex';
import NewsItem from '@/components/NewsItem';

export default {
  name: 'readlist',
  components: {
    NewsItem,
  },
  computed: {
    ...mapGetters({
      bookmarks: 'getBookmarks',
      numBookmarks: 'getNumBookmarks',
    }),
    nilBookmarkItems() {
      return this.numBookmarks === 0;
    },
    sortedBookmarks() {
      const entries = this.bookmarks;

      return entries.sort((entry1, entry2) => {
        if (entry1.fetchDate > entry2.fetchDate) {
          return -1;
        }

        if (entry2.fetchDate > entry1.fetchDate) {
          return 1;
        }

        return 0;
      });
    },
  },
};
</script>

<style>
</style>
