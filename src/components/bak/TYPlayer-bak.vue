<template>
    <div id='favorites'>
      <div class="cardlist">
        <div class="subheading-4" id="filterMsg">{{ `Num Results: ${bookmarks.length}` }}</div>
        <div v-for="twit in bookmarks" class="card-bm">
          <a v-bind:href="twit.url" class="bmark" :id="twit.id">{{twit.title}}</a>
          <div class="content">{{twit.description}}</div>
        </div><!-- end:bookmarks -->
      </div><!-- end:cardlist -->
    </div><!-- end:#favorites -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

export default {
  name: 'timeline',
  data() {
    return {
      bookmarksKey: 'bookmarks',
      bookmarks: [],
    };
  },
  mounted() {
    // ensure there is at least an empty 'bookmarks' available
    if (!localStorage.getItem(this.bookmarksKey)) {
      localStorage.setItem(this.bookmarksKey, JSON.stringify([]));
    }

    // If there is a cached timeline for this route, display it's contents
    this.bookmarks = JSON.parse(localStorage.getItem(this.bookmarksKey));
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style>
</style>
