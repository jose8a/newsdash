<template>
    <div id='sidebar' class="nav-sources">
      <h2>Categories</h2>
      <div v-for="listname in sourceLists"
          @click="fetchNewsCollection(listname)"
          id="listname"
          class="source-item">
        {{ listname.toUpperCase() }}
      </div>
      <h2>Sources</h2>
      <div v-for="sourceId in sourceKeys" class="source-item">
        <div @click="fetchNewsSite(sourceId)" id="sourceId">
          {{ apiSources[sourceId].title }}
        </div>
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
    console.log(`${this.sourceKeys}`);
  },
  computed: {
    ...mapGetters({
      serverUrl: 'getBaseUrl',
      apiSources: 'getSources',
      sourceKeys: 'getSourceKeys',
      sourceLists: 'getSourceCollections',
      latestNews: 'getLatestFetchedNews',
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
      this.$store.dispatch('fetchNewsSite', id);
    },
    fetchNewsCollection(listname) {
      this.$store.dispatch('fetchNewsCollection', listname);
    },
  },
};

</script>

<style>
</style>
