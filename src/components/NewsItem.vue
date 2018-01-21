<template>
  <div :id="newsbit.sourceId" class="postItem" :class="newsbit.source">
    <p class="post-url"><a :href="newsbit.url">{{ newsbit.title }}</a></p>
    <p class="post-host"> {{ postHost(newsbit.url) }}</p>
    <p class="post-date"> {{ newsbit.fetchDate }}</p>
    <!-- p class="post-category"> {{ postType }}</p -->
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
