<template>
    <div id='shelf' class="content">
      <div id="feed-info">
        <h2>
          <span>Favorites Feed: </span>
          <span>{{ numFaves }} Items</span>
        </h2>
      </div>

      <div v-if="nilFavoriteItems" class="postItem flash-warn">
        <p class="post-url">You have Zero Favorited items on your Shelf.</p>
      </div>

      <news-item v-for="item in sortedFavorites" :newsbit="item" :key="item.sourceId"></news-item>
    </div><!-- end:#newsfeed -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

import { mapGetters } from 'vuex';
import NewsItem from '@/components/NewsItem';

export default {
  name: 'shelf',
  components: {
    NewsItem,
  },
  computed: {
    ...mapGetters({
      favorites: 'getFavorites',
      numFaves: 'getNumFavorites',
    }),
    nilFavoriteItems() {
      return this.numFaves === 0;
    },
    sortedFavorites() {
      const entries = this.favorites;

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
