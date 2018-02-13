<template>
    <div id='sidebar' class="nav-sources">
      <h2>Categories</h2>
      <div v-for="listId in listsKeys"
          @click="fetchNewsCollection(listId)"
          :id="listId"
          class="source-item" :class="activeClass(listId)">
        {{ listsInfo[listId].title }}
      </div>
      <h2>Sources</h2>
      <div v-for="sourceId in sourceKeys" @click="fetchNewsSite(sourceId)"
        :id="sourceId" class="source-item" :class="activeClass(sourceId)">
          {{ apiSources[sourceId].title }}
      </div>
    </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable quotes */

import { mapGetters } from 'vuex';

export default {
  name: 'sidebar',
  data() {
    return {
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
      listsKeys: 'getCollectionsKeys',
      listsInfo: 'getSourceCollections',
    }),
    endpoint() {
      return (src) => {
        const apiSource = this.apiSources[src];
        return `/sources${apiSource.endpoint}`;
      };
    },
  },
  methods: {
    fetchNewsSite(id) {
      this.$store.state.activeNav.activeFeed = this.apiSources[id].title;
      this.$store.state.activeNav.sideActive = id;
      this.$store.dispatch('fetchNewsSite', id);
      this.$store.dispatch('isFeedLoading', true);
    },
    fetchNewsCollection(listKey) {
      this.$store.state.activeNav.activeFeed = this.listsInfo[listKey].title;
      this.$store.state.activeNav.sideActive = listKey;
      this.$store.dispatch('fetchNewsCollection', listKey);
      this.$store.dispatch('isFeedLoading', true);
    },
    activeClass(id) {
      const activeItem = this.$store.state.activeNav.sideActive;
      if (id === activeItem) {
        return 'active';
      }
      return '';
    },
  },
};

</script>

<style>
</style>
