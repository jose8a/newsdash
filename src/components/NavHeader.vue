<template>
    <div id='nav' class="nav-header">
      <div id="branding">
        <span href=""><i class="fa fa-newspaper-o fa-5x"></i></span>
        <h1>News Dash</h1>
      </div>
      <div id="nav-bar">
        <router-link to='/' tag="div" class="nav-bar-link">NewsRack</router-link>
        <router-link to='/reader' tag="div" class="nav-bar-link">
          <span class="feed-count"> {{ numBookmarks }} </span>
          <span class="nav-title">Reader</span>
        </router-link>
        <router-link to='/shelf' tag="div" class="nav-bar-link">
          <span class="feed-count"> {{ numFavorites }} </span>
          <span class="nav-title">Shelf</span>
        </router-link>
        <router-link to='/archives' tag="div" class="nav-bar-link">Archives</router-link>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'nav-header',
  computed: {
    ...mapGetters({
      favorites: 'getFavoritedIds',
      bookmarks: 'getBookmarkedIds',
    }),
    numFavorites() {
      return Object.keys(this.favorites).length;
    },
    numBookmarks() {
      return Object.keys(this.bookmarks).length;
    },
  },
};
</script>

<style>
  .feed-count {
    font-size: 1rem;

    /* Move the superscripted text up */
    bottom: .65rem;
    left: .55rem;
    border: 1px solid hsl(0, 40%, 60%);
    border-radius: 25%;
    background: rgba(200, 50, 50, 0.5);
    color: rgba(218, 229, 139, 1);
    padding: .15rem;
  }

  .nav-title {
    padding-left: .25rem;
  }
</style>
