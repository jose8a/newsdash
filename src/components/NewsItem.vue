<template>
  <div :id="newsbit.sourceId" class="postItem" :class="newsbit.source">
    <p class="post-url"><a :href="newsbit.url">{{ newsbit.title }}</a></p>
    <p class="post-host"> {{ postHost(newsbit.url) }}</p>
    <p class="post-date"> {{ newsbit.fetchDate }}</p>
    <!-- p class="post-category"> {{ postType }}</p -->
    <p class="post-actions">
      <span @click="toggleFavorite"><i class="fa" :class="isFavorite"></i></span>
      <span @click="toggleBookmark"><i class="fa" :class="isBookmark"></i></span>
    </p>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

export default {
  name: 'newsItem',
  props: ['newsbit'],
  mounted() {
  },
  computed: {
    isFavorite() {
      if (this.newsbit.favorited) {
        return 'fa-star';
      }
      return 'fa-star-o';
    },
    isBookmark() {
      if (this.newsbit.bookmarked) {
        return 'fa-bookmark';
      }
      return 'fa-bookmark-o';
    },
  },
  methods: {
    postHost(url) {
      return url.split('/')[2];
    },
    toggleFavorite() {
      const id = this.newsbit.sourceId;
      this.$store.dispatch('toggleFavorite', id);
    },
    toggleBookmark() {
      const id = this.newsbit.sourceId;
      this.$store.dispatch('toggleBookmark', id);
    },
  },
};
</script>

<style>
</style>
