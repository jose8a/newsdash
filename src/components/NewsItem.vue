<template>
  <div :id="newsbit.sourceId" class="postItem" :class="newsbit.source">
    <div v-if="hasNoUrl(newsbit.url)" class="flash-warn">NO URL</div>
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
      // TODO: FIXME! -- if url is undefined, still fails
      const splitUrl = url.split('/');

      if (splitUrl.length > 2) {
        return splitUrl[2];
      }
      return url;
    },
    hasNoUrl(url) {
      // TODO: FIXME! -- only needed for debugging -- remove??
      if (!url) return true;
      return false;
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
